"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const STRAPI_URL =
   process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// Fonction utilitaire pour les appels API Strapi
async function strapiRequest(endpoint, options = {}) {
   const url = `${STRAPI_URL}/api${endpoint}`;

   const config = {
      headers: {
         "Content-Type": "application/json",
         ...options.headers,
      },
      ...options,
   };

   try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
         throw new Error(data.error?.message || "Une erreur est survenue");
      }

      return data;
   } catch (error) {
      console.error("Erreur API Strapi:", error);
      throw error;
   }
}

// Fonction pour récupérer le token depuis les cookies
export async function getAuthToken() {
   const cookieStore = await cookies();
   // N'utiliser que le cookie sécurisé que nous gérons côté serveur
   return cookieStore.get("strapi_jwt")?.value || null;
}

// Fonction pour récupérer l'utilisateur actuel
export async function getCurrentUser() {
   try {
      const token = await getAuthToken();
      if (!token) return null;

      const data = await strapiRequest("/users/me?populate=avatar", {
         headers: { Authorization: `Bearer ${token}` },
      });

      return data;
   } catch (error) {
      const store = await cookies();
      store.delete("strapi_jwt");
      // Nettoyer aussi d'anciens cookies côté client si présents
      store.delete("jwtToken");
      store.delete("user");
      return null;
   }
}

// Action de connexion
export async function loginAction(prevState, formData) {
   const identifier = formData.get("identifier");
   const password = formData.get("password");

   if (!identifier || !password) {
      return {
         success: false,
         error: "Email/nom d'utilisateur et mot de passe requis",
      };
   }

   try {
      const data = await strapiRequest("/auth/local", {
         method: "POST",
         body: JSON.stringify({ identifier, password }),
      });

      // Stocker le JWT dans un cookie httpOnly sécurisé
      (await cookies()).set("strapi_jwt", data.jwt, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "lax",
         maxAge: 60 * 60 * 24 * 7, // 7 jours
      });

      revalidatePath("/");
      return { success: true, user: data.user };
   } catch (error) {
      return { success: false, error: error.message };
   }
}

// Action d'inscription
export async function registerAction(prevState, formData) {
   const username = formData.get("username");
   const email = formData.get("email");
   const password = formData.get("password");
   const passwordConfirmation = formData.get("passwordConfirmation");

   if (!username || !email || !password) {
      return { success: false, error: "Tous les champs sont requis" };
   }

   if (password !== passwordConfirmation) {
      return {
         success: false,
         error: "Les mots de passe ne correspondent pas",
      };
   }

   try {
      const data = await strapiRequest("/auth/local/register", {
         method: "POST",
         body: JSON.stringify({ username, email, password }),
      });

      (await cookies()).set("strapi_jwt", data.jwt, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "lax",
         maxAge: 60 * 60 * 24 * 7,
      });

      revalidatePath("/");
      return { success: true, user: data.user };
   } catch (error) {
      return { success: false, error: error.message };
   }
}

// Action de déconnexion
export async function logoutAction() {
   const store = await cookies();
   store.delete("strapi_jwt");
   // Supprimer aussi d'éventuels cookies hérités
   store.delete("jwtToken");
   store.delete("user");
   revalidatePath("/");
   redirect("/");
}

// Action pour mot de passe oublié
export async function forgotPasswordAction(prevState, formData) {
   const email = formData.get("email");

   if (!email) {
      return {
         success: false,
         error: "Email requis",
      };
   }

   try {
      await strapiRequest("/auth/forgot-password", {
         method: "POST",
         body: JSON.stringify({ email }),
      });

      return {
         success: true,
         message: "Email de réinitialisation envoyé",
      };
   } catch (error) {
      return {
         success: false,
         error: error.message,
      };
   }
}

// Action pour réinitialiser le mot de passe
export async function resetPasswordAction(prevState, formData) {
   const code = formData.get("code");
   const password = formData.get("password");
   const passwordConfirmation = formData.get("passwordConfirmation");

   if (!code || !password || !passwordConfirmation) {
      return {
         success: false,
         error: "Tous les champs sont requis",
      };
   }

   if (password !== passwordConfirmation) {
      return {
         success: false,
         error: "Les mots de passe ne correspondent pas",
      };
   }

   try {
      const data = await strapiRequest("/auth/reset-password", {
         method: "POST",
         body: JSON.stringify({
            code,
            password,
            passwordConfirmation,
         }),
      });

      (await cookies()).set("strapi_jwt", data.jwt, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "lax",
         maxAge: 60 * 60 * 24 * 7,
      });

      revalidatePath("/");
      return { success: true, user: data.user };
   } catch (error) {
      return { success: false, error: error.message };
   }
}

"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getAuthToken } from "./auth";

const STRAPI_URL =
   process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// Fonction utilitaire pour les appels API avec authentification
async function authenticatedRequest(endpoint, options = {}) {
   const token = await getAuthToken();

   if (!token) {
      redirect("/login");
   }

   const url = `${STRAPI_URL}/api${endpoint}`;

   const config = {
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
         ...options.headers,
      },
      ...options,
   };

   const response = await fetch(url, config);

   if (response.status === 401) {
      redirect("/login");
   }

   if (!response.ok) {
      let errorMessage = "Une erreur est survenue";
      try {
         const errorData = await response.json();
         errorMessage = errorData.error?.message || errorMessage;
      } catch {
         // Ignore JSON parse errors
      }
      throw new Error(errorMessage);
   }

   // Gérer les réponses vides (comme les DELETE)
   if (
      response.status === 204 ||
      response.headers.get("content-length") === "0"
   ) {
      return null;
   }

   const contentType = response.headers.get("content-type");
   if (contentType && contentType.includes("application/json")) {
      return await response.json();
   }

   return null;
}

// Récupérer tous les snippets (triés avec les favoris en premier)
export async function getSnippetsAction() {
   try {
      const data = await authenticatedRequest("/snippets?populate=category", {
         next: { tags: ["snippets"] },
      });
      const rawSnippets = data?.data || [];

      // Les données Strapi sont déjà plates, pas besoin de transformation
      const snippets = rawSnippets.map((snippet) => ({
         id: snippet.id,
         documentId: snippet.documentId,
         title: snippet.title,
         code: snippet.code,
         language: snippet.language,
         description: snippet.description,
         favorite: snippet.favorite || false,
         smallWidth: snippet.smallWidth || false,
         category: snippet.category
            ? {
                 id: snippet.category.id,
                 documentId: snippet.category.documentId,
                 name: snippet.category.name,
                 slug: snippet.category.slug,
                 color: snippet.category.color,
              }
            : null,
         createdAt: snippet.createdAt,
         updatedAt: snippet.updatedAt,
      }));

      // Trier les snippets : favoris en premier, puis par date de création
      return snippets.sort((a, b) => {
         if (a.favorite && !b.favorite) return -1;
         if (!a.favorite && b.favorite) return 1;
         return new Date(b.createdAt) - new Date(a.createdAt);
      });
   } catch (error) {
      console.error("Erreur lors de la récupération des snippets:", error);
      return [];
   }
}

// Récupérer un snippet par ID
export async function getSnippetAction(id) {
   try {
      const data = await authenticatedRequest(`/snippets/${id}`);
      return data?.data || null;
   } catch (error) {
      console.error("Erreur lors de la récupération du snippet:", error);
      return null;
   }
}

// Créer un nouveau snippet
export async function createSnippetAction(prevState, formData) {
   try {
      const title = formData.get("title");
      const code = formData.get("code");
      const language = formData.get("language");
      const description = formData.get("description");
      const favorite = formData.get("favorite") === "true";
      const smallWidth = formData.get("smallWidth") === "true";
      const categoryId = formData.get("categoryId");

      const data = await authenticatedRequest("/snippets", {
         method: "POST",
         body: JSON.stringify({
            data: {
               title,
               code,
               language,
               description,
               favorite,
               smallWidth,
               category: categoryId ? { connect: [categoryId] } : undefined,
            },
         }),
      });

      revalidatePath("/");
      return {
         success: true,
         message: "Snippet créé avec succès",
         data: data?.data,
      };
   } catch (error) {
      return { success: false, error: error.message };
   }
}

// Mettre à jour un snippet
export async function updateSnippetAction(prevState, formData) {
   try {
      const id = formData.get("id");
      const title = formData.get("title");
      const code = formData.get("code");
      const language = formData.get("language");
      const description = formData.get("description");
      const favorite = formData.get("favorite") === "true";
      const smallWidth = formData.get("smallWidth") === "true";
      const categoryId = formData.get("categoryId");

      const data = await authenticatedRequest(`/snippets/${id}`, {
         method: "PUT",
         body: JSON.stringify({
            data: {
               title,
               code,
               language,
               description,
               favorite,
               smallWidth,
               category: categoryId ? { connect: [categoryId] } : undefined,
            },
         }),
      });

      revalidatePath("/");
      revalidateTag("snippets");
      return {
         success: true,
         message: "Snippet mis à jour avec succès",
         data: data?.data,
      };
   } catch (error) {
      return { success: false, error: error.message };
   }
}

// Basculer le statut favori d'un snippet
export async function toggleFavoriteAction(prevState, formData) {
   const id = formData.get("id");
   const currentFavorite = formData.get("currentFavorite") === "true";

   try {
      const data = await authenticatedRequest(`/snippets/${id}`, {
         method: "PUT",
         body: JSON.stringify({
            data: { favorite: !currentFavorite },
         }),
      });

      revalidatePath("/");
      revalidateTag("snippets");
      return {
         success: true,
         message: `Snippet ${
            !currentFavorite ? "ajouté aux" : "retiré des"
         } favoris`,
         data: data?.data,
      };
   } catch (error) {
      return { success: false, error: error.message };
   }
}

// Supprimer un snippet
export async function deleteSnippetAction(id) {
   const timestamp = Date.now();
   console.log(`🗑️ [${timestamp}] DELETE Action DEBUT pour ID:`, id);

   if (!id) {
      return { success: false, error: "ID manquant" };
   }

   try {
      await authenticatedRequest(`/snippets/${id}`, {
         method: "DELETE",
      });

      revalidatePath("/");
      return {
         success: true,
         message: "Snippet supprimé avec succès",
         timestamp,
      };
   } catch (error) {
      return { success: false, error: error.message, timestamp };
   }
}

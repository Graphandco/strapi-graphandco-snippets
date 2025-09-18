"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getAuthToken } from "./auth";

const STRAPI_URL =
   process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

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

// Récupérer toutes les catégories
export async function getCategoriesAction() {
   try {
      const data = await authenticatedRequest("/categories", {
         next: { tags: ["categories"] },
      });
      const rawCategories = data?.data || [];

      const categories = rawCategories.map((category) => ({
         id: category.id,
         documentId: category.documentId,
         name: category.name,
         slug: category.slug,
         color: category.color,
         createdAt: category.createdAt,
         updatedAt: category.updatedAt,
      }));

      return categories;
   } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
      return [];
   }
}

"use client";

import { useState, useMemo } from "react";
import SnippetCard from "./SnippetCard";
import SearchSnippet from "./SearchSnippet";
import CategorySidebar from "./CategorySidebar";

export default function SnippetsList({ snippets = [], categories = [] }) {
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedCategory, setSelectedCategory] = useState(null);

   // Filtrer les snippets en temps réel (titre, description et catégorie)
   const filteredSnippets = useMemo(() => {
      let filtered = snippets;

      // Filtrage par catégorie ou favoris
      if (selectedCategory) {
         if (selectedCategory.id === "favorites") {
            // Filtrer les favoris
            filtered = filtered.filter((snippet) => snippet.favorite);
         } else {
            // Filtrer par catégorie normale
            filtered = filtered.filter(
               (snippet) => snippet.category?.id === selectedCategory.id
            );
         }
      }

      // Filtrage par terme de recherche
      if (searchTerm.trim()) {
         const term = searchTerm.toLowerCase();
         filtered = filtered.filter(
            (snippet) =>
               snippet.title?.toLowerCase().includes(term) ||
               snippet.description?.toLowerCase().includes(term) ||
               snippet.category?.name?.toLowerCase().includes(term)
         );
      }

      return filtered;
   }, [snippets, searchTerm, selectedCategory]);

   if (!snippets || snippets.length === 0) {
      return (
         <div className="text-center py-12">
            <svg
               className="mx-auto h-12 w-12 text-white/40"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
               />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-white">
               Aucun snippet
            </h3>
            <p className="mt-1 text-sm text-white/60">
               Commencez par créer votre premier snippet de code.
            </p>
         </div>
      );
   }

   return (
      <div className="space-y-8">
         <div className="text-center">
            <SearchSnippet
               onSearch={setSearchTerm}
               categories={categories}
               value={searchTerm}
            />
         </div>

         <div className="flex gap-8">
            {/* Sidebar des catégories */}
            <CategorySidebar
               categories={categories}
               selectedCategory={selectedCategory}
               onCategorySelect={setSelectedCategory}
               snippets={snippets}
            />

            {/* Contenu principal */}
            <div className="flex-1 space-y-6">
               <div className="flex items-center justify-between">
                  {/* <h2 className="text-2xl font-bold text-white">
                     Mes Snippets ({filteredSnippets.length}
                     {searchTerm || selectedCategory
                        ? ` sur ${snippets.length}`
                        : ""}
                     )
                  </h2> */}
               </div>

               {/* Affichage conditionnel du contenu */}
               {filteredSnippets.length === 0 && searchTerm ? (
                  <div className="text-center py-12">
                     <svg
                        className="mx-auto h-12 w-12 text-white/40"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                     </svg>
                     <h3 className="mt-2 text-sm font-medium text-white">
                        Aucun résultat trouvé
                     </h3>
                     <p className="mt-1 text-sm text-white/60">
                        Aucun snippet ne correspond à "{searchTerm}"
                     </p>
                  </div>
               ) : (
                  <div className="flex gap-5">
                     <div className="grid gap-4 w-full grid-cols-1 md:grid-cols-2 ">
                        {filteredSnippets.map((snippet) => (
                           <SnippetCard
                              key={snippet.id}
                              snippet={snippet}
                              categories={categories}
                              className={
                                 snippet.smallWidth
                                    ? "md:col-span-1"
                                    : "md:col-span-2 lg:col-span-2"
                              }
                           />
                        ))}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}

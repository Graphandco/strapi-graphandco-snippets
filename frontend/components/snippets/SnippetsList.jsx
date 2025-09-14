"use client";

import { useState, useMemo } from "react";
import SnippetCard from "./SnippetCard";
import SearchSnippet from "./SearchSnippet";

export default function SnippetsList({ snippets = [] }) {
   const [searchTerm, setSearchTerm] = useState("");

   // Filtrer les snippets en temps réel (titre et description uniquement)
   const filteredSnippets = useMemo(() => {
      if (!searchTerm.trim()) return snippets;

      const term = searchTerm.toLowerCase();
      return snippets.filter(
         (snippet) =>
            snippet.title?.toLowerCase().includes(term) ||
            snippet.description?.toLowerCase().includes(term)
      );
   }, [snippets, searchTerm]);

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

   if (filteredSnippets.length === 0 && searchTerm) {
      return (
         <div className="text-center">
            <div className="text-center pb-12">
               <SearchSnippet onSearch={setSearchTerm} />
            </div>
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
      );
   }

   return (
      <div className="space-y-8">
         <div className="text-center">
            <SearchSnippet onSearch={setSearchTerm} />
         </div>

         <div className="space-y-6">
            <div className="flex items-center justify-between">
               <h2 className="text-2xl font-bold text-white">
                  Mes Snippets ({filteredSnippets.length}
                  {searchTerm ? ` sur ${snippets.length}` : ""})
               </h2>
            </div>

            <div className="grid gap-4">
               {filteredSnippets.map((snippet) => (
                  <SnippetCard key={snippet.id} snippet={snippet} />
               ))}
            </div>
         </div>
      </div>
   );
}

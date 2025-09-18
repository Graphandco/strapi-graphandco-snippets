"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import AddSnippetModal from "./AddSnippetModal";
import { Plus } from "lucide-react";

export default function SearchSnippet({
   onSearch,
   categories = [],
   value = "",
}) {
   const [searchTerm, setSearchTerm] = useState(value);
   const [isModalOpen, setIsModalOpen] = useState(false);

   // Synchroniser l'état local avec la prop value quand elle change
   useEffect(() => {
      setSearchTerm(value);
   }, [value]);

   const handleSearch = (e) => {
      const newValue = e.target.value;
      setSearchTerm(newValue);
      onSearch(newValue);
   };

   return (
      <div className="relative w-full max-w-md mx-auto flex items-center gap-3">
         <div className="border-b border-white/50 flex items-center justify-between w-full pb-0">
            <div className="flex items-center gap-2 w-full">
               <Search />
               <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full outline-none bg-transparent text-lg italic"
               />
            </div>
         </div>
         <Plus
            size={32}
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer scale-100 hover:scale-110 transition-all duration-300 border border-white/50 p-1"
         />

         {/* Modal d'ajout */}
         <AddSnippetModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            categories={categories}
         />
      </div>
   );
}

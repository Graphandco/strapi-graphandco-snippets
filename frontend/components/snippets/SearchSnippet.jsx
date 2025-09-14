"use client";

import { useState } from "react";
import { Search, PlusCircleIcon } from "lucide-react";
import AddSnippetModal from "./AddSnippetModal";

export default function SearchSnippet({ onSearch }) {
   const [searchTerm, setSearchTerm] = useState("");
   const [isModalOpen, setIsModalOpen] = useState(false);

   const handleSearch = (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      onSearch(value);
   };

   return (
      <div className="relative w-full max-w-md mx-auto">
         <div className="border-b border-white/50 flex items-center justify-between w-full pb-2">
            <div className="flex items-center gap-2 w-full">
               <Search />
               <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full outline-none bg-transparent text-xl"
               />
            </div>
            <PlusCircleIcon
               size={32}
               onClick={() => setIsModalOpen(true)}
               className="cursor-pointer scale-100 hover:scale-110 transition-all duration-300"
            />
         </div>

         {/* Modal d'ajout */}
         <AddSnippetModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
         />
      </div>
   );
}

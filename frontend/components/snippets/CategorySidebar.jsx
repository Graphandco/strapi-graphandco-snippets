"use client";

import { X, HeartIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CategorySidebar({
   categories = [],
   selectedCategory,
   onCategorySelect,
   snippets = [],
}) {
   const [hoveredIndex, setHoveredIndex] = useState(null);
   const [itemHeights, setItemHeights] = useState([]);
   const containerRef = useRef(null);
   const itemRefs = useRef([]);

   // Calculer le nombre de snippets par catégorie
   const getSnippetCount = (categoryId) => {
      return snippets.filter((snippet) => snippet.category?.id === categoryId)
         .length;
   };

   const getTotalSnippetCount = () => {
      return snippets.length;
   };

   const getFavoritesCount = () => {
      return snippets.filter((snippet) => snippet.favorite).length;
   };

   const handleCategoryClick = (category) => {
      if (selectedCategory?.id === category.id) {
         onCategorySelect(null); // Désélectionner si déjà sélectionnée
      } else {
         onCategorySelect(category);
      }
   };

   // Mesurer la hauteur des éléments
   useEffect(() => {
      const measureHeights = () => {
         const heights = itemRefs.current.map((ref) => {
            if (ref) {
               const rect = ref.getBoundingClientRect();
               return rect.height;
            }
            return 40; // Valeur par défaut
         });
         setItemHeights(heights);
      };

      // Mesurer après le rendu initial
      const timeoutId = setTimeout(measureHeights, 100);

      // Re-mesurer si les catégories changent
      measureHeights();

      return () => clearTimeout(timeoutId);
   }, [categories.length]);

   // Calculer la position de la barre de sélection
   const getSelectionBarPosition = () => {
      if (itemHeights.length === 0) return { top: 0, height: 40 };

      let selectedIndex = 0;
      if (selectedCategory) {
         if (selectedCategory.id === "favorites") {
            selectedIndex = 1; // Favoris est à l'index 1
         } else {
            selectedIndex =
               categories.findIndex((cat) => cat.id === selectedCategory.id) +
               2; // +2 car on a ajouté "Favoris"
         }
      }

      let top = 0;
      for (let i = 0; i < selectedIndex; i++) {
         top += itemHeights[i] || 40;
      }

      const height = itemHeights[selectedIndex] || 40;

      return { top, height };
   };

   // Calculer la position de la barre de survol
   const getHoverBarPosition = () => {
      if (hoveredIndex === null || itemHeights.length === 0) return null;

      let top = 0;
      for (let i = 0; i < hoveredIndex; i++) {
         top += itemHeights[i] || 40;
      }

      const height = itemHeights[hoveredIndex] || 40;

      return { top, height };
   };

   const selectionPosition = getSelectionBarPosition();
   const hoverPosition = getHoverBarPosition();

   return (
      <div className="w-56 flex-shrink-0">
         <div className="pb-3 relative mt-4" ref={containerRef}>
            {/* Barre de sélection fixe avec Framer Motion */}
            <motion.div
               className="absolute left-0 w-0.5 bg-white z-10"
               initial={false}
               animate={{
                  top: selectionPosition.top,
                  height: selectionPosition.height,
               }}
               transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
               }}
            />

            {/* Barre de survol avec Framer Motion */}
            <AnimatePresence>
               {hoverPosition && (
                  <motion.div
                     className="absolute left-0 w-0.5 bg-white/60 z-5"
                     initial={{ opacity: 0 }}
                     animate={{
                        top: hoverPosition.top,
                        height: hoverPosition.height,
                        opacity: 1,
                     }}
                     exit={{ opacity: 0 }}
                     transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                     }}
                  />
               )}
            </AnimatePresence>

            <div className="">
               {/* Toutes les catégories */}
               <button
                  ref={(el) => (itemRefs.current[0] = el)}
                  onClick={() => onCategorySelect(null)}
                  onMouseEnter={() => setHoveredIndex(0)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors border-l border-white/20 cursor-pointer hover:text-white ${
                     !selectedCategory ? "text-white" : ""
                  }`}
               >
                  Tous ({getTotalSnippetCount()})
               </button>

               {/* Favoris */}
               <button
                  ref={(el) => (itemRefs.current[1] = el)}
                  onClick={() =>
                     onCategorySelect({ id: "favorites", name: "Favoris" })
                  }
                  onMouseEnter={() => setHoveredIndex(1)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`w-full text-left px-3 rounded-lg transition-colors border-l border-white/20 cursor-pointer flex items-center gap-2 hover:text-white ${
                     selectedCategory?.id === "favorites" ? "text-white" : ""
                  }`}
               >
                  <HeartIcon size={16} />
                  <span className="flex-1 py-2">Favoris</span>
                  <span className="text-xs text-slate-400">
                     {getFavoritesCount()}
                  </span>
               </button>

               {/* Liste des catégories */}
               {categories.map((category, index) => (
                  <button
                     key={category.id}
                     ref={(el) => (itemRefs.current[index + 2] = el)}
                     onClick={() => handleCategoryClick(category)}
                     onMouseEnter={() => setHoveredIndex(index + 2)}
                     onMouseLeave={() => setHoveredIndex(null)}
                     className={`w-full text-left px-3  transition-colors flex items-center gap-2 border-l border-white/20 cursor-pointer hover:text-white ${
                        selectedCategory?.id === category.id ? "text-white" : ""
                     }`}
                  >
                     <span className="flex-1 py-2">{category.name}</span>
                     <span className="text-xs ">
                        {getSnippetCount(category.id)}
                     </span>
                  </button>
               ))}
            </div>

            {categories.length === 0 && (
               <p className="text-sm text-slate-400 text-center py-4">
                  Aucune catégorie disponible
               </p>
            )}
         </div>
      </div>
   );
}

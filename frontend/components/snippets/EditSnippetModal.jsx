"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { updateSnippetAction } from "../../app/actions/snippets";
import { Switch } from "../ui/switch";
import { toast } from "sonner";

const initialState = { success: false, error: null };

export default function EditSnippetModal({
   isOpen,
   onClose,
   snippet,
   categories = [],
}) {
   const [isFavorite, setIsFavorite] = useState(false);
   const [isSmallWidth, setIsSmallWidth] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [selectedCategoryId, setSelectedCategoryId] = useState("");

   const handleSubmit = async (formData) => {
      setIsSubmitting(true);
      try {
         const result = await updateSnippetAction(null, formData);

         if (result.success) {
            toast.success("Snippet mis à jour avec succès");
            onClose();
         } else {
            toast.error(result.error || "Erreur lors de la mise à jour");
         }
      } catch (error) {
         toast.error("Erreur lors de la mise à jour");
      } finally {
         setIsSubmitting(false);
      }
   };

   // Empêcher le scroll du body quand la modal est ouverte
   useEffect(() => {
      if (isOpen) {
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = "unset";
      }

      // Cleanup
      return () => {
         document.body.style.overflow = "unset";
      };
   }, [isOpen]);

   // Réinitialiser les valeurs quand la modal s'ouvre
   useEffect(() => {
      if (isOpen && snippet) {
         setIsFavorite(snippet.favorite || false);
         setIsSmallWidth(snippet.smallWidth || false);
         setSelectedCategoryId(snippet.category?.id || "");
      }
   }, [isOpen, snippet]);

   if (!isOpen || !snippet) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
         {/* Overlay */}
         <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
         />

         {/* Modal */}
         <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950/90 to-slate-900/95 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-center border-b border-slate-700 p-6">
               <div>
                  <h2 className="text-xl font-bold text-white">
                     Modifier le snippet
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                     Modifiez les informations de votre snippet.
                  </p>
               </div>
               <button
                  onClick={onClose}
                  className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800"
               >
                  <svg
                     className="h-5 w-5"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                     />
                  </svg>
               </button>
            </div>

            {/* Contenu de la modal */}
            <div className="p-6 space-y-6">
               <form action={handleSubmit} className="space-y-6">
                  <input type="hidden" name="id" value={snippet.documentId} />

                  <div>
                     <label
                        htmlFor="title"
                        className="block text-sm font-medium text-slate-300 mb-2"
                     >
                        Titre *
                     </label>
                     <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        defaultValue={snippet.title}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Nom de votre snippet"
                     />
                  </div>

                  <div>
                     <label
                        htmlFor="language"
                        className="block text-sm font-medium text-slate-300 mb-2"
                     >
                        Langage
                     </label>
                     <select
                        id="language"
                        name="language"
                        defaultValue={snippet.language}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                     >
                        <option value="javascript" className="bg-slate-800">
                           JavaScript
                        </option>
                        <option value="css" className="bg-slate-800">
                           CSS
                        </option>
                        <option value="php" className="bg-slate-800">
                           PHP
                        </option>
                        <option value="smarty" className="bg-slate-800">
                           Smarty
                        </option>
                        <option value="bash" className="bg-slate-800">
                           Bash
                        </option>
                        <option value="text" className="bg-slate-800">
                           Texte
                        </option>
                        <option value="mysql" className="bg-slate-800">
                           Mysql
                        </option>
                     </select>
                  </div>

                  <div>
                     <label
                        htmlFor="categoryId"
                        className="block text-sm font-medium text-slate-300 mb-2"
                     >
                        Catégorie
                     </label>
                     <select
                        id="categoryId"
                        name="categoryId"
                        value={selectedCategoryId}
                        onChange={(e) => setSelectedCategoryId(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                     >
                        <option value="" className="bg-slate-800">
                           Aucune catégorie
                        </option>
                        {categories.map((category) => (
                           <option
                              key={category.id}
                              value={category.id}
                              className="bg-slate-800"
                           >
                              {category.name}
                           </option>
                        ))}
                     </select>
                  </div>

                  <div>
                     <div className="flex items-center justify-between">
                        <label
                           htmlFor="favorite"
                           className="block text-sm font-medium text-slate-300"
                        >
                           Marquer comme favori
                        </label>
                        <Switch
                           id="favorite"
                           checked={isFavorite}
                           onCheckedChange={setIsFavorite}
                        />
                     </div>
                     <input
                        type="hidden"
                        name="favorite"
                        value={isFavorite.toString()}
                     />
                  </div>

                  <div>
                     <div className="flex items-center justify-between">
                        <label
                           htmlFor="smallWidth"
                           className="block text-sm font-medium text-slate-300"
                        >
                           Largeur réduite
                        </label>
                        <Switch
                           id="smallWidth"
                           checked={isSmallWidth}
                           onCheckedChange={setIsSmallWidth}
                        />
                     </div>
                     <input
                        type="hidden"
                        name="smallWidth"
                        value={isSmallWidth.toString()}
                     />
                  </div>

                  <div>
                     <label
                        htmlFor="description"
                        className="block text-sm font-medium text-slate-300 mb-2"
                     >
                        Description
                     </label>
                     <textarea
                        id="description"
                        name="description"
                        rows={3}
                        defaultValue={snippet.description || ""}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors"
                        placeholder="Description du snippet..."
                     />
                  </div>

                  <div>
                     <label
                        htmlFor="code"
                        className="block text-sm font-medium text-slate-300 mb-2"
                     >
                        Code *
                     </label>
                     <textarea
                        id="code"
                        name="code"
                        rows={8}
                        required
                        defaultValue={snippet.code}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm resize-none transition-colors"
                        placeholder="// Votre code ici..."
                     />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
                     <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
                     >
                        Annuler
                     </button>
                     <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                     >
                        {isSubmitting ? "Mise à jour..." : "Mettre à jour"}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}

"use client";

import { useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import {
   deleteSnippetAction,
   toggleFavoriteAction,
} from "../../app/actions/snippets";
import CodeHighlight from "./CodeHighlight";
import EditSnippetModal from "./EditSnippetModal";
import { Heart, Copy, MoreVertical, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function SnippetCard({
   snippet,
   categories = [],
   className = "",
}) {
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const [modalKey, setModalKey] = useState(0);
   const [state, formAction] = useActionState(toggleFavoriteAction, {
      success: false,
      error: null,
   });

   const router = useRouter();

   // Refresh page on favorite toggle success
   if (state.success) {
      router.refresh();
   }

   const confirmOrCancel = (event) => {
      const ok = confirm("Êtes-vous sûr de vouloir supprimer ce snippet ?");
      if (!ok) event.preventDefault();
   };

   const handleCopyCode = async () => {
      try {
         await navigator.clipboard.writeText(snippet.code);
         toast.success("Code copié dans le presse-papiers !");
      } catch (error) {
         toast.error("Erreur lors de la copie");
      }
   };

   const getLanguageDisplay = (language) => {
      const languages = {
         javascript: "JS",
         css: "CSS",
         php: "PHP",
         smarty: "Smarty",
         bash: "Bash",
         mysql: "MySQL",
         text: "Texte",
      };
      return languages[language] || "Code";
   };

   return (
      <div className={className}>
         <div className="relative  overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950/50 to-slate-900/80 py-3 px-6">
            {/* Header avec titre et actions */}
            <div className="-mx-6 mb-3 flex items-center justify-between  px-6 pb-3">
               <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-white">
                     {snippet.title}
                  </h3>
               </div>

               <div className="flex items-center gap-1">
                  {snippet.category && (
                     <span
                        className="rounded px-2 py-1 text-xs font-medium text-white"
                        style={{ backgroundColor: snippet.category.color }}
                     >
                        {snippet.category.name}
                     </span>
                  )}

                  {/* Bouton Favori */}
                  <form action={formAction}>
                     <input
                        type="hidden"
                        name="id"
                        value={snippet.documentId}
                     />
                     <input
                        type="hidden"
                        name="currentFavorite"
                        value={!!snippet.favorite}
                     />
                     <button
                        type="submit"
                        className={`p-1 transition-colors rounded-lg hover:bg-slate-800 ${
                           snippet.favorite
                              ? "text-red-500 hover:text-red-400"
                              : "text-slate-400 hover:text-red-400"
                        }`}
                        title={
                           snippet.favorite
                              ? "Retirer des favoris"
                              : "Ajouter aux favoris"
                        }
                     >
                        <Heart
                           className="h-4 w-4"
                           fill={snippet.favorite ? "currentColor" : "none"}
                        />
                     </button>
                  </form>

                  {/* Menu contextuel */}
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <button
                           className="p-1 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800"
                           title="Actions"
                        >
                           <MoreVertical className="h-4 w-4" />
                        </button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                           onClick={() => {
                              setModalKey((prev) => prev + 1);
                              setIsEditModalOpen(true);
                           }}
                           className="cursor-pointer"
                        >
                           <Edit className="h-4 w-4 mr-2" />
                           Modifier
                        </DropdownMenuItem>
                        <form
                           action={deleteSnippetAction.bind(
                              null,
                              String(snippet.documentId || snippet.id)
                           )}
                           onSubmit={confirmOrCancel}
                        >
                           <DropdownMenuItem asChild>
                              <button
                                 type="submit"
                                 className="w-full text-left cursor-pointer text-red-400 hover:text-red-300"
                              >
                                 <Trash2 className="h-4 w-4 mr-2" />
                                 Supprimer
                              </button>
                           </DropdownMenuItem>
                        </form>
                     </DropdownMenuContent>
                  </DropdownMenu>
                  {/* Bouton Copier */}
                  <button
                     onClick={handleCopyCode}
                     className="p-1 text-slate-400 hover:text-green-400 transition-colors rounded-lg hover:bg-slate-800"
                     title="Copier le code"
                  >
                     <Copy className="h-4 w-4" />
                  </button>
               </div>
            </div>

            {/* Description si elle existe */}
            {snippet.description && (
               <div className="mb-3">
                  <p className="text-sm text-slate-400">
                     {snippet.description}
                  </p>
               </div>
            )}

            {/* Code avec coloration syntaxique */}
            <div className="-mx-6 overflow-x-auto px-6">
               <CodeHighlight code={snippet.code} language={snippet.language} />
            </div>

            {/* Footer avec date */}
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
               <div className="flex items-center gap-1">
                  <svg
                     className="h-3 w-3"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                     />
                  </svg>
                  Créé le{" "}
                  {new Date(snippet.createdAt).toLocaleDateString("fr-FR")}
               </div>
            </div>
         </div>

         {/* Modal d'édition */}
         <EditSnippetModal
            key={modalKey}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            snippet={snippet}
            categories={categories}
         />
      </div>
   );
}

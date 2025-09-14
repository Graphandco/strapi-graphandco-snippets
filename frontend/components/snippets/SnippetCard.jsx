"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import {
   deleteSnippetAction,
   toggleFavoriteAction,
} from "../../app/actions/snippets";
import CodeHighlight from "./CodeHighlight";
import { Heart } from "lucide-react";

export default function SnippetCard({ snippet }) {
   const router = useRouter();
   const [state, formAction] = useActionState(toggleFavoriteAction, {
      success: false,
      error: null,
   });

   const confirmOrCancel = (event) => {
      const ok = confirm("Êtes-vous sûr de vouloir supprimer ce snippet ?");
      if (!ok) event.preventDefault();
   };

   const handleToggleFavorite = async () => {
      try {
         const formData = new FormData();
         formData.append("id", snippet.documentId);
         formData.append("currentFavorite", !!snippet.favorite);

         await toggleFavoriteAction(null, formData);
      } catch (error) {
         console.error("Erreur lors du basculement du favori:", error);
      }
   };

   // Détermine le langage pour l'affichage
   const getLanguageDisplay = (language) => {
      const languages = {
         javascript: "JavaScript",
         css: "CSS",
         php: "PHP",
         smarty: "Smarty",
         bash: "Bash",
         text: "Texte",
      };
      return languages[language] || "Code";
   };

   return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950/50 to-slate-900/80 py-3 px-6">
         {/* Header avec titre et actions */}
         <div className="-mx-6 mb-6 flex items-center justify-between border-b border-slate-700 px-6 pb-3">
            <div className="flex items-center gap-3">
               <h3 className="text-lg font-bold text-white">{snippet.title}</h3>
            </div>

            <div className="flex items-center gap-2">
               {snippet.language && (
                  <span className="rounded px-1.5 py-0.5 text-sm font-medium bg-primary text-black">
                     {getLanguageDisplay(snippet.language)}
                  </span>
               )}
               {/* Bouton Voir */}
               <button
                  className="p-2 text-slate-400 hover:text-blue-400 transition-colors rounded-lg hover:bg-slate-800"
                  title="Voir le snippet"
               >
                  <svg
                     className="h-4 w-4"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                     />
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                     />
                  </svg>
               </button>

               {/* Bouton Favori */}
               <form action={formAction}>
                  <input type="hidden" name="id" value={snippet.documentId} />
                  <input
                     type="hidden"
                     name="currentFavorite"
                     value={!!snippet.favorite}
                  />
                  <button
                     type="submit"
                     className={`p-2 transition-colors rounded-lg hover:bg-slate-800 ${
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

               {/* Bouton Modifier */}
               <button
                  className="p-2 text-slate-400 hover:text-yellow-400 transition-colors rounded-lg hover:bg-slate-800"
                  title="Modifier le snippet"
               >
                  <svg
                     className="h-4 w-4"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                     />
                  </svg>
               </button>

               {/* Bouton Supprimer */}
               <form
                  action={deleteSnippetAction.bind(
                     null,
                     String(snippet.documentId || snippet.id)
                  )}
                  onSubmit={confirmOrCancel}
               >
                  <button
                     type="submit"
                     className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-lg hover:bg-slate-800"
                     title="Supprimer le snippet"
                  >
                     <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                     </svg>
                  </button>
               </form>
            </div>
         </div>

         {/* Description si elle existe */}
         {snippet.description && (
            <div className="mb-4">
               <p className="text-sm text-slate-400">{snippet.description}</p>
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
               Créé le {new Date(snippet.createdAt).toLocaleDateString("fr-FR")}
            </div>
         </div>

         {/* Ligne d'animation à gauche */}
         <span className="absolute left-0 top-1/2 h-48 w-[1px] -translate-y-1/2 animate-pulse bg-gradient-to-b from-indigo-500/0 via-indigo-800 to-indigo-500/0" />
      </div>
   );
}

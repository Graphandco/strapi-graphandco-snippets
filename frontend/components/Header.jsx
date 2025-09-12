"use client";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "./auth/AuthModal";
import UserProfile from "./auth/UserProfile";

export default function Header() {
   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
   const { isAuthenticated, isLoading } = useAuth();

   return (
      <>
         <header className="py-4 flex items-center justify-between gap-10 mb-10">
            <div className="text-3xl text-white font-poiret">snippets'n'co</div>

            <div className="flex items-center gap-4">
               <input
                  type="text"
                  placeholder="Rechercher..."
                  className="border-b border-white/60 focus:border-white/100 py-1 pl-1.5 pr-24 !outline-none placeholder-white bg-transparent"
               />

               {!isLoading && (
                  <>
                     {isAuthenticated ? (
                        <UserProfile />
                     ) : (
                        <button
                           onClick={() => setIsAuthModalOpen(true)}
                           className="px-4 py-2 text-white border border-white/60 rounded hover:bg-white/10 transition-colors"
                        >
                           Connexion
                        </button>
                     )}
                  </>
               )}
            </div>
         </header>

         <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
         />
      </>
   );
}

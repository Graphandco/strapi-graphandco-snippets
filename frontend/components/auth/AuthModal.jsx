"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthModal() {
   const [isOpen, setIsOpen] = useState(false);
   const [isLogin, setIsLogin] = useState(true);

   const handleSuccess = () => {
      setIsOpen(false);
      // Refresh the page to update the auth state
      window.location.reload();
   };

   const switchToRegister = () => {
      setIsLogin(false);
   };

   const switchToLogin = () => {
      setIsLogin(true);
   };

   return (
      <>
         <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 text-white border border-white/60 rounded hover:bg-white/10 transition-colors"
         >
            Connexion
         </button>

         {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
               {/* Overlay */}
               <div
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                  onClick={() => setIsOpen(false)}
               />

               {/* Modal */}
               <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950/90 to-slate-900/95 shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center justify-center border-b border-slate-700 p-6">
                     <div>
                        <h2 className="text-xl font-bold text-white">
                           {isLogin ? "Connexion" : "Inscription"}
                        </h2>
                        <p className="text-sm text-slate-400 mt-1">
                           {isLogin
                              ? "Connectez-vous à votre compte"
                              : "Créez votre compte pour commencer"}
                        </p>
                     </div>
                     <button
                        onClick={() => setIsOpen(false)}
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

                  {/* Contenu */}
                  <div className="p-6">
                     {isLogin ? (
                        <LoginForm
                           onSuccess={handleSuccess}
                           onSwitchToRegister={switchToRegister}
                        />
                     ) : (
                        <RegisterForm
                           onSuccess={handleSuccess}
                           onSwitchToLogin={switchToLogin}
                        />
                     )}
                  </div>
               </div>
            </div>
         )}
      </>
   );
}

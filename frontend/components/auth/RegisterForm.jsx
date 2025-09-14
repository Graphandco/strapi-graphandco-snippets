"use client";

import { useActionState, useEffect } from "react";
import { registerAction } from "../../app/actions/auth";

const initialState = { success: false, error: null };

export default function RegisterForm({ onSuccess, onSwitchToLogin }) {
   const [state, formAction] = useActionState(registerAction, initialState);

   useEffect(() => {
      if (state.success) {
         onSuccess?.();
      }
   }, [state.success, onSuccess]);

   return (
      <div className="space-y-6">
         {state.error && (
            <div className="p-4 bg-red-900/20 border border-red-500/30 text-red-300 rounded-lg">
               {state.error}
            </div>
         )}

         <form action={formAction} className="space-y-6">
            <div>
               <label
                  htmlFor="username"
                  className="block text-sm font-medium text-slate-300 mb-2"
               >
                  Nom d'utilisateur
               </label>
               <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Choisissez un nom d'utilisateur"
               />
            </div>

            <div>
               <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300 mb-2"
               >
                  Email
               </label>
               <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Votre adresse email"
               />
            </div>

            <div>
               <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-300 mb-2"
               >
                  Mot de passe
               </label>
               <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  minLength={6}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Minimum 6 caractères"
               />
            </div>

            <div>
               <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-slate-300 mb-2"
               >
                  Confirmer le mot de passe
               </label>
               <input
                  type="password"
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  required
                  minLength={6}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Confirmez votre mot de passe"
               />
            </div>

            <button
               type="submit"
               className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
               S'inscrire
            </button>
         </form>

         <div className="text-center pt-4 border-t border-slate-700">
            <button
               type="button"
               onClick={onSwitchToLogin}
               className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
               Déjà un compte ? Se connecter
            </button>
         </div>
      </div>
   );
}

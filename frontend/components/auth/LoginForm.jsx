"use client";

import { useActionState, useEffect } from "react";
import { loginAction } from "../../app/actions/auth";

const initialState = { success: false, error: null };

export default function LoginForm({ onSuccess, onSwitchToRegister }) {
   const [state, formAction] = useActionState(loginAction, initialState);

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
                  htmlFor="identifier"
                  className="block text-sm font-medium text-slate-300 mb-2"
               >
                  Email ou nom d'utilisateur
               </label>
               <input
                  type="text"
                  id="identifier"
                  name="identifier"
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Votre email ou nom d'utilisateur"
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
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Votre mot de passe"
               />
            </div>

            <button
               type="submit"
               className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
               Se connecter
            </button>
         </form>

         <div className="text-center pt-4 border-t border-slate-700">
            <button
               type="button"
               onClick={onSwitchToRegister}
               className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
               Pas de compte ? S'inscrire
            </button>
         </div>
      </div>
   );
}

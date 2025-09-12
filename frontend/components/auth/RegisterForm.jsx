"use client";

import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { register } from "../../lib/auth";

export default function RegisterForm({ onSuccess, onSwitchToLogin }) {
   const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
   });
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");

   const { login: loginUser } = useAuth();

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");

      // Validation côté client
      if (formData.password !== formData.confirmPassword) {
         setError("Les mots de passe ne correspondent pas");
         setIsLoading(false);
         return;
      }

      if (formData.password.length < 6) {
         setError("Le mot de passe doit contenir au moins 6 caractères");
         setIsLoading(false);
         return;
      }

      try {
         const result = await register({
            username: formData.username,
            email: formData.email,
            password: formData.password,
         });

         if (result.success) {
            loginUser(result.user, result.jwt);
            onSuccess?.();
         } else {
            setError(result.error);
         }
      } catch (error) {
         setError("Une erreur est survenue lors de l'inscription");
      } finally {
         setIsLoading(false);
      }
   };

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
         <h2 className="text-2xl font-bold mb-6 text-center">Inscription</h2>

         {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
               {error}
            </div>
         )}

         <form onSubmit={handleSubmit} className="space-y-4">
            <div>
               <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
               >
                  Nom d'utilisateur
               </label>
               <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
               />
            </div>

            <div>
               <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
               >
                  Email
               </label>
               <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
               />
            </div>

            <div>
               <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
               >
                  Mot de passe
               </label>
               <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
               />
            </div>

            <div>
               <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
               >
                  Confirmer le mot de passe
               </label>
               <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
               />
            </div>

            <button
               type="submit"
               disabled={isLoading}
               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
               {isLoading ? "Inscription..." : "S'inscrire"}
            </button>
         </form>

         <div className="mt-4 text-center">
            <button
               type="button"
               onClick={onSwitchToLogin}
               className="text-blue-600 hover:text-blue-500 text-sm"
            >
               Déjà un compte ? Se connecter
            </button>
         </div>
      </div>
   );
}

import LogoutButton from "@/components/auth/LogoutButton";
import ProtectedRoute from "../../components/auth/ProtectedRoute";
import { getCurrentUser } from "../actions/auth";

export default async function Dashboard() {
   const currentUser = await getCurrentUser();

   if (!currentUser) {
      return (
         <div className="min-h-screen flex items-center justify-center">
            <div className="text-white">Accès non autorisé</div>
         </div>
      );
   }

   return (
      <ProtectedRoute>
         <div className="min-h-screen p-8">
            <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
               <div className="flex items-center gap-4 mb-4">
                  {currentUser.avatar && (
                     <img
                        src={`http://localhost:1337${currentUser.avatar.url}`}
                        alt={`Avatar de ${currentUser.username}`}
                        className="w-16 h-16 rounded-full object-cover"
                     />
                  )}
                  <h2 className="text-xl font-semibold text-white">
                     Bienvenue, {currentUser.username || currentUser.email} !
                  </h2>
               </div>

               <div className="text-white/80 space-y-2">
                  <p>
                     <strong>Email:</strong> {currentUser.email}
                  </p>
                  <p>
                     <strong>Nom d'utilisateur:</strong> {currentUser.username}
                  </p>
                  <p>
                     <strong>ID:</strong> {currentUser.id}
                  </p>
                  <p>
                     <strong>Confirmé:</strong>{" "}
                     {currentUser.confirmed ? "Oui" : "Non"}
                  </p>
                  <p>
                     <strong>Bloqué:</strong>{" "}
                     {currentUser.blocked ? "Oui" : "Non"}
                  </p>
                  <LogoutButton />
               </div>
            </div>
         </div>
      </ProtectedRoute>
   );
}

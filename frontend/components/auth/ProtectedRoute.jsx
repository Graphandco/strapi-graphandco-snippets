export default function ProtectedRoute({ children }) {
   // La vérification d'authentification se fait côté serveur
   // Si on arrive ici, c'est que l'utilisateur est authentifié
   return children;
}

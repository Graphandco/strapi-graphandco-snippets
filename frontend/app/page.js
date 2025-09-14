import { getCurrentUser } from "@/app/actions/auth";
import { getSnippetsAction } from "@/app/actions/snippets";
import AuthModal from "@/components/auth/AuthModal";
import SnippetsList from "@/components/snippets/SnippetsList";

export default async function Home() {
   const user = await getCurrentUser();

   if (!user) {
      return (
         <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-white mb-3">
               Bienvenue sur Snippets Manager
            </h1>
            <p className="text-lg mb-5">
               Veuillez vous connecter pour accéder à vos snippets.
            </p>
            <AuthModal />
         </div>
      );
   }

   const snippets = await getSnippetsAction();

   return (
      <div className="space-y-8">
         <SnippetsList snippets={snippets} />
      </div>
   );
}

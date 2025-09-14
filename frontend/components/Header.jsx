import { getCurrentUser } from "../app/actions/auth";
import Link from "next/link";

export default async function Header() {
   const user = await getCurrentUser();

   return (
      <>
         <header className="py-4 flex items-center justify-between gap-10 mb-10">
            <Link
               href="/"
               className="text-4xl text-white font-poiret underline underline-offset-5"
            >
               snippets'n'co
            </Link>

            <Link href="/dashboard" className="flex items-center gap-1">
               {user && (
                  <>
                     {user.avatar && (
                        <img
                           src={`http://localhost:1337${user.avatar.url}`}
                           alt={`Avatar de ${user.username}`}
                           className="w-8 h-8 rounded-full object-cover"
                        />
                     )}
                     <span className="text-white">{user.username}</span>
                  </>
               )}
            </Link>
         </header>
      </>
   );
}

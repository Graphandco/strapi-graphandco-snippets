import { getCurrentUser } from "../app/actions/auth";
import Link from "next/link";

export default async function Header() {
   const user = await getCurrentUser();

   return (
      <>
         <header className="pt-4 pb-6 mb-10 bg-black/20">
            <div className="max-w-[1280px] mx-auto px-[5vw] flex items-center justify-between gap-10">
               <Link
                  href="/"
                  className="text-4xl text-white font-poiret font-bold underline underline-offset-5"
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
            </div>
         </header>
      </>
   );
}

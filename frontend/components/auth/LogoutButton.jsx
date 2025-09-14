"use client";

import { logoutAction } from "../../app/actions/auth";
import { Button } from "../ui/button";

export default function LogoutButton({ className = "" }) {
   return (
      <form action={logoutAction}>
         <Button
            type="submit"
            className={`text-red-600 hover:text-red-800 transition-colors ${className}`}
         >
            Se déconnecter
         </Button>
      </form>
   );
}

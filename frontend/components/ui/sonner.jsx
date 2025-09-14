"use client";

import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
   return (
      <Sonner
         theme="dark"
         className="toaster group"
         toastOptions={{
            style: {
               background: "rgb(30 41 59)",
               color: "white",
               border: "1px solid rgb(71 85 105)",
            },
         }}
         {...props}
      />
   );
};

export { Toaster };

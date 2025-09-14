import { Geist, Geist_Mono, Sigmar, Anton, Poiret_One } from "next/font/google";
import "./globals.css";
import { SquaresBackground } from "@/components/SquaresBackground";
import Header from "@/components/Header";
// Server Actions remplacent les contexts

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

const sigmar = Sigmar({
   variable: "--font-sigmar",
   subsets: ["latin"],
   weight: "400",
});

const anton = Anton({
   variable: "--font-anton",
   subsets: ["latin"],
   weight: "400",
});
const poiretOne = Poiret_One({
   variable: "--font-poiret",
   subsets: ["latin"],
   weight: "400",
});

export const metadata = {
   title: "Snippets Manager - Gérez vos snippets de code",
   description:
      "Application moderne pour organiser et gérer vos snippets de code avec Next.js et Strapi",
   keywords: "snippets, code, développement, javascript, react, nextjs",
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${geistMono.variable} ${sigmar.variable} ${anton.variable} ${poiretOne.variable} antialiased max-w-[1280px] mx-auto px-[5vw]`}
            suppressHydrationWarning={true}
         >
            <Header />
            <main>{children}</main>
            <SquaresBackground />
         </body>
      </html>
   );
}

"use client";

import { Highlight } from "prism-react-renderer";

// Mapping des langages pour Prism
const getLanguageForPrism = (language) => {
   const languageMap = {
      javascript: "javascript",
      js: "javascript", // Alias pour js
      css: "css",
      php: "php",
      smarty: "html", // Smarty ressemble plus à HTML avec des tags
      bash: "bash",
      text: "plaintext",
      mysql: "sql",
   };

   // Debug: afficher le langage utilisé
   // console.log(
   //    `Langage demandé: ${language}, Langage Prism: ${
   //       languageMap[language] || "plaintext"
   //    }`
   // );

   return languageMap[language] || "plaintext";
};

// Thème personnalisé inspiré de CodeBlock.js
const theme = {
   plain: {
      color: "#e2e8f0",
      backgroundColor: "transparent",
   },
   styles: [
      {
         types: ["comment"],
         style: {
            color: "#546e7a",
            fontStyle: "italic",
         },
      },
      {
         types: ["string", "inserted"],
         style: {
            color: "#c3e88d",
         },
      },
      {
         types: ["number"],
         style: {
            color: "#f78c6c",
         },
      },
      {
         types: ["builtin", "char", "constant", "function"],
         style: {
            color: "#82aaff",
         },
      },
      {
         types: ["punctuation", "selector"],
         style: {
            color: "#c792ea",
         },
      },
      {
         types: ["variable"],
         style: {
            color: "#eeffff",
         },
      },
      {
         types: ["class-name", "attr-name"],
         style: {
            color: "#ffcb6b",
         },
      },
      {
         types: ["tag", "deleted"],
         style: {
            color: "#f07178",
         },
      },
      {
         types: ["operator"],
         style: {
            color: "#89ddff",
         },
      },
      {
         types: ["boolean"],
         style: {
            color: "#ff5370",
         },
      },
      {
         types: ["keyword"],
         style: {
            color: "#c792ea",
            fontStyle: "italic",
         },
      },
      {
         types: ["doctype"],
         style: {
            color: "#c792ea",
            fontStyle: "italic",
         },
      },
      {
         types: ["namespace"],
         style: {
            color: "#b2ccd6",
         },
      },
      {
         types: ["url"],
         style: {
            color: "#dddddd",
         },
      },
      // Règles spécifiques pour PHP
      {
         types: ["php-tag"],
         style: {
            color: "#f07178",
            fontWeight: "bold",
         },
      },
      {
         types: ["variable"],
         style: {
            color: "#eeffff",
         },
      },
      {
         types: ["property-access"],
         style: {
            color: "#82aaff",
         },
      },
   ],
};

export default function CodeHighlight({ code, language }) {
   const prismLanguage = getLanguageForPrism(language);

   return (
      <div className="bg-slate-950/30 rounded-lg p-4">
         <Highlight
            theme={theme}
            code={code || "// Pas de code disponible"}
            language={prismLanguage}
         >
            {({ style, tokens, getLineProps, getTokenProps }) => (
               <pre
                  style={style}
                  className="text-sm overflow-x-auto code-light"
               >
                  {tokens.map((line, i) => (
                     <div key={i} {...getLineProps({ line })} className="flex">
                        <span className="inline-block w-[40px] select-none text-slate-500 text-right pr-4">
                           {i + 1}
                        </span>
                        <code>
                           {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token })} />
                           ))}
                        </code>
                     </div>
                  ))}
               </pre>
            )}
         </Highlight>
      </div>
   );
}

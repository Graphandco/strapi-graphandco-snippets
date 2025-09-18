"use client";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Mapping des langages
const getLanguageForHighlighter = (language) => {
   const languageMap = {
      javascript: "javascript",
      js: "javascript",
      css: "css",
      php: "php",
      smarty: "html",
      bash: "bash",
      text: "text",
      mysql: "sql",
   };

   return languageMap[language] || "text";
};

export default function CodeHighlight({ code, language }) {
   const highlighterLanguage = getLanguageForHighlighter(language);

   return (
      <div className="bg-slate-950/30 rounded-lg p-4">
         <SyntaxHighlighter
            language={highlighterLanguage}
            style={vscDarkPlus}
            customStyle={{
               background: 'transparent',
               margin: 0,
               padding: 0,
               fontSize: '0.875rem',
               fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Inconsolata, "Roboto Mono", Consolas, "Liberation Mono", Menlo, Courier, monospace',
            }}
            showLineNumbers={true}
            lineNumberStyle={{
               color: '#6b7280',
               marginRight: '1rem',
               userSelect: 'none',
               minWidth: '2.5rem',
               textAlign: 'right',
            }}
            wrapLines={true}
            wrapLongLines={true}
         >
            {code || "// Pas de code disponible"}
         </SyntaxHighlighter>
      </div>
   );
}

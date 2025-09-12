import React, { useEffect, useState } from "react";
import { FiZap } from "react-icons/fi";
import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { FiStar } from "react-icons/fi";
import { Highlight } from "prism-react-renderer";

export const CodeBlock = () => {
   const [selected, setSelected] = useState("js");

   return (
      <Card className="mx-auto pt-3">
         <div className="-mx-6 mb-6 flex items-center justify-between border-b border-slate-700 px-6 pb-3">
            <div className="flex items-center gap-3">
               <ToggleChip
                  onClick={() => setSelected("js")}
                  selected={selected === "js"}
               >
                  JavaScript
               </ToggleChip>
               <ToggleChip
                  onClick={() => setSelected("py")}
                  selected={selected === "py"}
               >
                  Python
               </ToggleChip>
            </div>
         </div>
         <div className="-mx-6 overflow-x-auto px-6">
            <Markup code={selected === "js" ? javascriptCode : pythonCode} />
         </div>
         <span className="absolute left-0 top-1/2 h-48 w-[1px] -translate-y-1/2 animate-pulse bg-gradient-to-b from-indigo-500/0 via-indigo-800 to-indigo-500/0" />
      </Card>
   );
};

const ToggleChip = ({ children, selected, onClick }) => {
   return (
      <button
         onClick={onClick}
         className={`rounded px-1.5 py-0.5 text-sm font-medium transition-colors ${
            selected
               ? "bg-indigo-600 text-slate-50"
               : "bg-slate-900 text-slate-50 hover:bg-slate-700"
         }`}
      >
         {children}
      </button>
   );
};

const Card = ({ className, children }) => {
   return (
      <motion.div
         initial={{
            filter: "blur(4px)",
         }}
         whileInView={{
            filter: "blur(0px)",
         }}
         transition={{
            duration: 0.5,
            ease: "easeInOut",
            delay: 0.25,
         }}
         className={`relative h-full w-full overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950/50 to-slate-900/80 p-6 ${className}`}
      >
         {children}
      </motion.div>
   );
};

const Markup = ({ code }) => {
   return (
      <Highlight theme={theme} code={code} language="javascript">
         {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre style={style}>
               {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                     <span className="inline-block w-[40px] select-none text-slate-400">
                        {i + 1}
                     </span>
                     {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                     ))}
                  </div>
               ))}
            </pre>
         )}
      </Highlight>
   );
};

const theme = {
   plain: {
      color: "#e2e8f0",
      backgroundColor: "transparent",
   },
   styles: [
      {
         types: ["comment"],
         style: {
            color: "#94a3b8)",
            fontStyle: "italic",
         },
      },
      {
         types: ["string", "inserted"],
         style: {
            color: "rgb(195, 232, 141)",
         },
      },
      {
         types: ["number"],
         style: {
            color: "rgb(247, 140, 108)",
         },
      },
      {
         types: ["builtin", "char", "constant", "function"],
         style: {
            color: "rgb(130, 170, 255)",
         },
      },
      {
         types: ["punctuation", "selector"],
         style: {
            color: "rgb(199, 146, 234)",
         },
      },
      {
         types: ["variable"],
         style: {
            color: "rgb(191, 199, 213)",
         },
      },
      {
         types: ["class-name", "attr-name"],
         style: {
            color: "rgb(255, 203, 107)",
         },
      },
      {
         types: ["tag", "deleted"],
         style: {
            color: "rgb(255, 85, 114)",
         },
      },
      {
         types: ["operator"],
         style: {
            color: "rgb(137, 221, 255)",
         },
      },
      {
         types: ["boolean"],
         style: {
            color: "rgb(255, 88, 116)",
         },
      },
      {
         types: ["keyword"],
         style: {
            fontStyle: "italic",
         },
      },
      {
         types: ["doctype"],
         style: {
            color: "rgb(199, 146, 234)",
            fontStyle: "italic",
         },
      },
      {
         types: ["namespace"],
         style: {
            color: "rgb(178, 204, 214)",
         },
      },
      {
         types: ["url"],
         style: {
            color: "rgb(221, 221, 221)",
         },
      },
      {
         types: ["keyword", "variable"],
         style: {
            color: "#c792e9",
            fontStyle: "normal",
         },
      },
   ],
};

const javascriptCode = `import { initializeSDK } from "your-package";
    
  const app = initializeSDK({
      apiKey: "sk_abc123"
  });
  
  app.doCoolThing();`;

const pythonCode = `import your_package
    
  app = your_package.init({
      "api_key": "sk_abc123"
  })
  
  app.do_cool_thing()`;

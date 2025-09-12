"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const SquaresBackground = ({ children }) => {
   return (
      <div className="fixed -z-1 inset-0 bg-zinc-950 overflow-hidden">
         <div className="relative z-20">{children}</div>
         <Beams />
         <GradientGrid />
      </div>
   );
};

const GlowingChip = ({ children }) => {
   return (
      <span className="relative z-10 mb-4 inline-block rounded-full border border-zinc-700 bg-zinc-900/20 px-3 py-1.5 text-xs text-zinc-50 md:mb-0">
         {children}
         <span className="absolute bottom-0 left-3 right-3 h-[1px] bg-gradient-to-r from-zinc-500/0 via-zinc-300 to-zinc-500/0" />
      </span>
   );
};

const Beams = () => {
   const { width } = useWindowSize();

   const numColumns = width ? Math.floor(width / GRID_BOX_SIZE) : 0;

   const placements = [
      {
         top: GRID_BOX_SIZE * 0,
         left: Math.floor(numColumns * 0.05) * GRID_BOX_SIZE,
         transition: {
            duration: 3.5,
            repeatDelay: 5,
            delay: 2,
         },
      },
      {
         top: GRID_BOX_SIZE * 12,
         left: Math.floor(numColumns * 0.15) * GRID_BOX_SIZE,
         transition: {
            duration: 3.5,
            repeatDelay: 10,
            delay: 4,
         },
      },
      {
         top: GRID_BOX_SIZE * 3,
         left: Math.floor(numColumns * 0.25) * GRID_BOX_SIZE,
      },
      {
         top: GRID_BOX_SIZE * 9,
         left: Math.floor(numColumns * 0.75) * GRID_BOX_SIZE,
         transition: {
            duration: 2,
            repeatDelay: 7.5,
            delay: 3.5,
         },
      },
      {
         top: 0,
         left: Math.floor(numColumns * 0.7) * GRID_BOX_SIZE,
         transition: {
            duration: 3,
            repeatDelay: 2,
            delay: 1,
         },
      },
      {
         top: GRID_BOX_SIZE * 2,
         left: Math.floor(numColumns * 1) * GRID_BOX_SIZE - GRID_BOX_SIZE,
         transition: {
            duration: 5,
            repeatDelay: 5,
            delay: 5,
         },
      },
   ];

   return (
      <>
         {placements.map((p, i) => (
            <Beam
               key={i}
               top={p.top}
               left={p.left - BEAM_WIDTH_OFFSET}
               transition={p.transition || {}}
            />
         ))}
      </>
   );
};

const useWindowSize = () => {
   const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
   });

   useEffect(() => {
      const handleResize = () =>
         setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
         });

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   return windowSize;
};

const Beam = ({ top, left, transition = {} }) => {
   return (
      <motion.div
         initial={{
            y: 0,
            opacity: 0,
         }}
         animate={{
            opacity: [0, 1, 0],
            y: 32 * 8,
         }}
         transition={{
            ease: "easeInOut",
            duration: 3,
            repeat: Infinity,
            repeatDelay: 1.5,
            ...transition,
         }}
         style={{
            top,
            left,
         }}
         className="absolute z-10 h-[64px] w-[1px] bg-gradient-to-b from-blue-500/0 to-blue-500"
      />
   );
};

const GradientGrid = () => {
   return (
      <motion.div
         initial={{
            opacity: 0,
         }}
         animate={{
            opacity: 0.5,
         }}
         transition={{
            duration: 2.5,
            ease: "easeInOut",
         }}
         className="fixed inset-0 z-0"
      >
         <div
            style={{
               backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(30 58 138 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
            }}
            className="absolute inset-0 z-0"
         />
         <div className="absolute inset-0 z-10 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
      </motion.div>
   );
};

const GRID_BOX_SIZE = 32;
const BEAM_WIDTH_OFFSET = 1;

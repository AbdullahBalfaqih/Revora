"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function TextAnimate({ 
  children, 
  animation = "blurInUp", 
  by = "character", 
  once = true,
  className = "",
  words = [] // Custom addition to allow rotating words
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words && words.length > 0) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % words.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [words]);

  const textToAnimate = words && words.length > 0 ? words[index] : (typeof children === "string" ? children : "");
  const characters = textToAnimate.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(15px)", scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14,
      },
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      filter: "blur(10px)",
      transition: { duration: 0.2 } 
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={textToAnimate}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once }}
        className={`inline-block ${className}`}
      >
        {characters.map((char, i) => (
          <motion.span
            key={i}
            variants={itemVariants}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

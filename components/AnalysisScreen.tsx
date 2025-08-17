import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LeafIcon } from './icons/LeafIcon';

const messages = [
  "Analyse de vos symptômes...",
  "Consultation de notre base de connaissances naturelles...",
  "Préparation de vos recommandations personnalisées...",
  "Un instant, l'IA réfléchit pour vous...",
];

export const AnalysisScreen: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2500); // Change message every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[65vh]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="relative flex justify-center items-center w-28 h-28"
      >
        <div className="absolute w-full h-full rounded-full border-4 border-amber-200 border-t-amber-500"></div>
        <LeafIcon className="h-14 w-14 text-amber-500" />
      </motion.div>
      <h2 className="mt-10 text-3xl font-bold text-slate-800">
        Analyse en cours
      </h2>
      <div className="mt-4 text-slate-600 max-w-md h-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};
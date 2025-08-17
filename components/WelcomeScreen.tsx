import React from 'react';
import { motion } from 'framer-motion';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[65vh]">
      <motion.div 
        className="max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
          Votre bilan de santé naturel, en quelques minutes.
        </h1>
        <p className="mt-6 text-lg text-slate-600">
          Identifiez vos déséquilibres et découvrez des solutions naturelles adaptées à vos besoins. Répondez à quelques questions pour commencer votre Bilan Express.
        </p>
      </motion.div>
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <button
          onClick={onStart}
          className="bg-amber-500 text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Commencer mon bilan
        </button>
      </motion.div>
      <motion.p 
        className="mt-8 text-sm text-slate-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        Cet outil ne remplace pas un diagnostic médical professionnel. En cas de doute, consultez un médecin.
      </motion.p>
    </div>
  );
};
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { symptomCategories } from '../data/medicalData';
import { Symptom } from '../types';

interface QuestionnaireProps {
  onComplete: (selectedSymptomIds: string[]) => void;
  onBack: () => void;
}

const categoryVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

export const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete, onBack }) => {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set());

  const totalSteps = symptomCategories.length;
  const currentStep = page;
  const currentCategory = symptomCategories[currentStep];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setPage(page + newDirection);
  };

  const handleToggleSymptom = (symptomId: string) => {
    const newSelection = new Set(selectedSymptoms);
    if (newSelection.has(symptomId)) {
      newSelection.delete(symptomId);
    } else {
      newSelection.add(symptomId);
    }
    setSelectedSymptoms(newSelection);
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      paginate(1);
    } else {
      onComplete(Array.from(selectedSymptoms));
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      paginate(-1);
    } else {
      onBack();
    }
  };
  
  const SymptomItem: React.FC<{ symptom: Symptom; isSelected: boolean; onToggle: () => void; }> = ({ symptom, isSelected, onToggle }) => (
    <motion.button
      onClick={onToggle}
      className={`group flex flex-col items-center justify-center p-3 text-center border-2 rounded-xl transition-all duration-200 w-full h-full ${
        isSelected
          ? 'bg-amber-100 border-amber-500'
          : 'bg-slate-100 border-slate-200 hover:border-amber-400 hover:bg-amber-50'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={`mb-2 transition-colors ${
          isSelected ? 'text-amber-600' : 'text-slate-500 group-hover:text-amber-600'
        }`}>
        {symptom.icon}
      </div>
      <span className={`font-medium text-slate-700 text-sm leading-tight transition-colors ${
          isSelected ? 'text-amber-800' : 'text-slate-700'
      }`}>
        {symptom.label}
      </span>
    </motion.button>
  );

  return (
    <div className="p-6 md:p-10 min-h-[65vh] flex flex-col">
      <div className="mb-8">
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <motion.div
            className="bg-amber-500 h-2.5 rounded-full"
            initial={{ width: `${(currentStep / totalSteps) * 100}%` }}
            animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          ></motion.div>
        </div>
        <p className="text-center text-sm text-slate-500 mt-2">
          Étape {currentStep + 1} sur {totalSteps}
        </p>
      </div>
      
      <div className="flex-grow overflow-hidden relative">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={categoryVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full"
          >
            <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">
              Catégorie : {currentCategory.name}
            </h2>
            <p className="text-center text-slate-600 mb-8">
              Sélectionnez les symptômes que vous ressentez.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {currentCategory.symptoms.map((symptom) => (
                <SymptomItem
                  key={symptom.id}
                  symptom={symptom}
                  isSelected={selectedSymptoms.has(symptom.id)}
                  onToggle={() => handleToggleSymptom(symptom.id)}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex justify-between items-center pt-4">
        <button
          onClick={handleBack}
          className="bg-slate-200 text-slate-700 font-bold py-3 px-8 rounded-full hover:bg-slate-300 transition-colors"
        >
          Précédent
        </button>
        <button
          onClick={handleNext}
          className="bg-amber-500 text-white font-bold py-3 px-8 rounded-full hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-colors"
        >
          {currentStep === totalSteps - 1 ? 'Voir mes résultats' : 'Suivant'}
        </button>
      </div>
    </div>
  );
};
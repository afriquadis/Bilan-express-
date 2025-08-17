
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserInfo } from '../types';

interface UserInfoScreenProps {
  onComplete: (userInfo: UserInfo) => void;
  onBack: () => void;
}

const formItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

// Moved InputField outside of UserInfoScreen to prevent re-renders from causing focus loss.
const InputField: React.FC<{
  label: string;
  name: string;
  value: string;
  placeholder: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, value, placeholder, type = 'text', onChange }) => (
  <motion.div variants={formItemVariants}>
    <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 transition-colors"
      required
    />
  </motion.div>
);

export const UserInfoScreen: React.FC<UserInfoScreenProps> = ({ onComplete, onBack }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '',
    lastName: '',
    age: '',
    gender: 'Homme',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo.firstName.trim() || !userInfo.lastName.trim() || !userInfo.age.trim()) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    if (isNaN(Number(userInfo.age)) || Number(userInfo.age) <= 0) {
        setError('Veuillez entrer un âge valide.');
        return;
    }
    setError('');
    onComplete(userInfo);
  };
  
  return (
    <motion.div 
      className="p-6 md:p-10 min-h-[65vh] flex flex-col justify-center"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1 }}
    >
      <div className="max-w-md mx-auto w-full">
        <motion.h2 variants={formItemVariants} className="text-2xl font-bold text-center text-slate-800 mb-2">
          Informations personnelles
        </motion.h2>
        <motion.p variants={formItemVariants} className="text-center text-slate-600 mb-8">
          Ces informations nous aideront à personnaliser votre bilan.
        </motion.p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Prénom" name="firstName" value={userInfo.firstName} placeholder="Votre prénom" onChange={handleChange} />
            <InputField label="Nom" name="lastName" value={userInfo.lastName} placeholder="Votre nom" onChange={handleChange} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <InputField label="Âge" name="age" value={userInfo.age} placeholder="Ex: 35" type="number" onChange={handleChange} />
            <motion.div variants={formItemVariants}>
                <label htmlFor="gender" className="block text-sm font-medium text-slate-700 mb-1">Sexe</label>
                <select 
                    id="gender"
                    name="gender"
                    value={userInfo.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 transition-colors bg-white"
                >
                    <option>Homme</option>
                    <option>Femme</option>
                    <option>Autre</option>
                </select>
            </motion.div>
          </div>

          {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
          
          <motion.div variants={formItemVariants} className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={onBack}
              className="bg-slate-200 text-slate-700 font-bold py-3 px-8 rounded-full hover:bg-slate-300 transition-colors"
            >
              Précédent
            </button>
            <button
              type="submit"
              className="bg-amber-500 text-white font-bold py-3 px-8 rounded-full hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-colors"
            >
              Continuer
            </button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

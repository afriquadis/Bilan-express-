
import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion, Transition } from 'framer-motion';
import { WelcomeScreen } from './components/WelcomeScreen';
import { UserInfoScreen } from './components/UserInfoScreen';
import { Questionnaire } from './components/Questionnaire';
import { AnalysisScreen } from './components/AnalysisScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { Header } from './components/Header';
import { useGeminiDiagnosis } from './hooks/useGeminiDiagnosis';
import { DiagnosisResult, UserInfo } from './types';
import { symptomCategories } from './data/medicalData';

type AppState = 'welcome' | 'userInfo' | 'questionnaire' | 'analyzing' | 'results';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition: Transition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult[] | null>(null);
  const { performDiagnosis, isLoading } = useGeminiDiagnosis();
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setAppState('userInfo');
    setDiagnosisResult(null);
    setError(null);
  };
  
  const handleBackToWelcome = () => {
    setAppState('welcome');
    setUserInfo(null);
  }

  const handleUserInfoComplete = (data: UserInfo) => {
    setUserInfo(data);
    setAppState('questionnaire');
  };

  const handleQuestionnaireComplete = useCallback(async (symptomLabels: string[]) => {
    if (!userInfo) {
      setError("Les informations de l'utilisateur sont manquantes. Veuillez recommencer.");
      setAppState('results');
      return;
    }
    setAppState('analyzing');
    setError(null);
    setDiagnosisResult(null);

    try {
      const results = await performDiagnosis(symptomLabels, userInfo);
      setDiagnosisResult(results);
    } catch (e) {
      console.error(e);
      setError("Désolé, une erreur s'est produite lors de l'analyse. Veuillez réessayer.");
    } finally {
      setAppState('results');
    }
  }, [performDiagnosis, userInfo]);
  
  const allSymptoms = symptomCategories.flatMap(cat => cat.symptoms);

  const handleQuestionnaireCompleteByIds = (symptomIds: string[]) => {
    const symptomLabels = symptomIds
      .map(id => allSymptoms.find(s => s.id === id)?.label)
      .filter((label): label is string => !!label);
    handleQuestionnaireComplete(symptomLabels);
  };


  const renderContent = () => {
    switch (appState) {
      case 'userInfo':
        return <UserInfoScreen onComplete={handleUserInfoComplete} onBack={handleBackToWelcome} />;
      case 'questionnaire':
        return <Questionnaire onComplete={handleQuestionnaireCompleteByIds} onBack={() => setAppState('userInfo')} />;
      case 'analyzing':
        return <AnalysisScreen />;
      case 'results':
        return <ResultsScreen results={diagnosisResult} error={error} onRestart={handleStart} userInfo={userInfo} />;
      case 'welcome':
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans">
      <Header />
      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={appState}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <footer className="text-center py-6 text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} AFRIQUADIS Bilan Express. All rights reserved.</p>
        <p className="mt-1 text-xs">Disclaimer: This tool provides AI-generated suggestions and is not a substitute for professional medical advice.</p>
      </footer>
    </div>
  );
};

export default App;

import { useCallback } from 'react';
import { DiagnosisResult } from '../types';

/**
 * @deprecated This hook uses static local data and is replaced by useGeminiDiagnosis.
 */
export const useDiagnosis = () => {
  const performDiagnosis = useCallback((_selectedSymptomIds: string[]): DiagnosisResult[] => {
    console.warn("useDiagnosis is deprecated. Please use useGeminiDiagnosis for AI-powered analysis.");
    // This hook is deprecated because the static `pathologies` data has been removed
    // in favor of dynamic analysis from the Gemini API.
    // Returning an empty array to prevent runtime errors if it's still called somewhere.
    return [];
  }, []);

  return performDiagnosis;
};

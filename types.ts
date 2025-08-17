export interface Symptom {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface SymptomCategory {
  id: string;
  name: string;
  symptoms: Symptom[];
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  age: string;
  gender: 'Homme' | 'Femme' | 'Autre';
}

export interface Product {
  name: string;
  description: string;
  price: number;
}

export interface LifestyleAdvice {
  category: string;
  advice: string;
}

// This interface is updated to match the AI's JSON schema response
export interface DiagnosisResult {
  pathologyName: string;
  description: string;
  confidence: 'Élevée' | 'Moyenne' | 'Faible';
  suggestedProducts: Product[];
  lifestyleAdvice: LifestyleAdvice[];
}
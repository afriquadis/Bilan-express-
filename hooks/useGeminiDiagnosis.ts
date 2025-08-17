

import { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { DiagnosisResult, UserInfo } from '../types';

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      pathologyName: {
        type: Type.STRING,
        description: 'Le nom du déséquilibre potentiel (ex: "Déséquilibre digestif"). Doit rester non-médical.'
      },
      description: {
        type: Type.STRING,
        description: 'Une brève explication simple de ce que ce déséquilibre signifie.'
      },
      confidence: {
        type: Type.STRING,
        description: 'Un score de confiance: "Élevée", "Moyenne", ou "Faible".'
      },
      suggestedProducts: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: 'Nom du produit AFRIQUADIS suggéré, exactement comme dans le catalogue.' },
            description: { type: Type.STRING, description: 'Description brève du but du produit.' },
            price: { type: Type.NUMBER, description: 'Le prix du produit en F CFA, basé sur la liste de prix.' }
          },
          required: ['name', 'description', 'price']
        }
      },
      lifestyleAdvice: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING, description: 'Catégorie du conseil (ex: "Alimentation", "Hydratation").' },
            advice: { type: Type.STRING, description: 'Le conseil spécifique.' },
          },
          required: ['category', 'advice']
        }
      }
    },
    required: ['pathologyName', 'description', 'confidence', 'suggestedProducts', 'lifestyleAdvice']
  }
};

const symptomKnowledgeBase = `
De plus, voici une base de connaissances des pathologies et de leurs symptômes associés que tu devrais utiliser comme référence principale pour ton analyse.

### **1. Hypertension artérielle**
*   Maux de tête fréquents, Vertiges, Fatigue, Vision floue, Palpitations, Saignements de nez (parfois)

### **2. Diabète**
*   Soif excessive, Urines fréquentes, Fatigue, Amaigrissement inexpliqué, Vision floue, Plaies qui cicatrisent mal

### **3. Anémie**
*   Fatigue, Pâleur, Essoufflement, Vertiges, Palpitations, Ongles cassants

### **4. Prostate (HBP)**
*   Difficulté à uriner, Besoin fréquent d’uriner (surtout la nuit), Jet d’urine faible ou interrompu, Douleur ou brûlure à la miction

### **5. Asthme**
*   Essoufflement, Sifflements respiratoires, Toux persistante, Oppression thoracique

### **6. Tumeur / Cancer**
*   Fatigue persistante, Perte de poids inexpliquée, Douleurs localisées, Boule ou masse anormale, Saignements inhabituels

### **7. Perte de poids (rapide et involontaire)**
*   Amaigrissement visible, Fatigue, Faiblesse musculaire, Perte d’appétit

### **8. Épilepsie**
*   Crises convulsives, Perte de conscience temporaire, Tremblements involontaires, Regard fixe ou absence

### **9. Hépatite**
*   Fatigue, Jaunisse (peau et yeux jaunes), Urines foncées, Douleur côté droit de l’abdomen, Nausées / vomissements

### **10. Ulcère**
*   Douleur à l’estomac, Brûlure gastrique, Nausées, Perte d’appétit, Ballonnements

### **11. Infertilité féminine**
*   Difficulté à concevoir, Cycles menstruels irréguliers, Douleurs pelviennes, Règles très abondantes ou très faibles

### **12. Problèmes de vision (yeux)**
*   Vision floue, Picotements, Sensibilité à la lumière, Rougeur ou démangeaisons oculaires

### **13. Troubles de l’orgasme féminin**
*   Difficulté à atteindre l’orgasme, Douleur pendant les rapports, Baisse de désir sexuel

### **14. Arthrose**
*   Douleur articulaire, Raideur, Gonflement des articulations, Diminution de la mobilité

### **15. Problème cardiaque**
*   Douleur à la poitrine, Essoufflement, Fatigue, Palpitations, Gonflement des pieds / chevilles

### **16. Problèmes sexuels masculins**
*   Dysfonction érectile, Éjaculation précoce, Baisse de libido

### **17. Sinusite**
*   Nez bouché, Douleur au visage, Écoulement nasal, Maux de tête frontaux

### **18. Diminution des globules rouges (Hématies)**
*   Fatigue, Essoufflement, Pâleur, Palpitations

### **19. Goitre**
*   Gonflement au cou, Difficulté à avaler, Sensation d’étouffement, Changements de voix

### **20. Goutte**
*   Douleur articulaire intense (souvent au gros orteil), Rougeur et chaleur de l’articulation, Gonflement

### **21. Paludisme sévère**
*   Forte fièvre, Frissons, Sueurs abondantes, Fatigue extrême, Douleur musculaire, Confusion (cas graves)

### **22. Fatigue chronique**
*   Fatigue persistante malgré le repos, Manque d’énergie, Difficulté de concentration

### **23. Baisse du système immunitaire**
*   Infections fréquentes, Cicatrisation lente, Fatigue

### **24. Fibrome / Kyste / Myome**
*   Douleurs pelviennes, Règles abondantes, Gonflement du bas-ventre, Douleur pendant les rapports

### **25. Hernie / Hydrocèle**
*   Grosseur au niveau de l’aine ou des testicules, Douleur ou gêne en position debout ou à l’effort

### **26. Maladies virales (SIDA, choléra, COVID, etc.)**
*   Fièvre, Douleurs musculaires, Fatigue, Symptômes spécifiques selon le virus (diarrhée, toux, etc.)

### **27. Épine calcanéenne**
*   Douleur au talon (surtout au réveil), Sensation de piqûre sous le pied
`;


const productCatalog = `
Voici le catalogue des maladies et des produits AFRIQUADIS associés que tu dois EXCLUSIVEMENT utiliser pour tes recommandations. Pour une maladie donnée, ne suggère que les produits listés pour cette maladie. Ne change pas les noms des produits.

MALADIE: Hypertension artérielle
PRODUITS:
- Cardiomaide
- REA
- Paludoxyne
- Thé Kadeaut
- Diabéthyzole
- Calciumynoze

MALADIE: Diabète
PRODUITS:
- Diabéthyzole
- HBP
- REA
- Thé Kadeaut
- Cardiomaide
- Paludoxyne

MALADIE: Anémie
PRODUITS:
- Hématodyne
- TGZ
- Thé Fertilia
- Polyvitaminole

MALADIE: Prostate
PRODUITS:
- Thé Cancéryzole
- REA
- DT6
- HBP
- Cardiomaide
- Thé Restfort

MALADIE: Asthme
PRODUITS:
- Cardiomaide
- TGZ
- Thé Kadeaut
- Mère des pommades

MALADIE: Tumeur / Cancer
PRODUITS:
- Thé Cancéryzole
- HBP
- TGZ
- REA
- Hématodyne
- Thé Juvéniqua
- Paludoxyne
- Déparazytomil
- Polyvitaminole

MALADIE: Perte de poids
PRODUITS:
- Curifera
- Diabéthyzole
- Thé Juvéniqua
- Déparazytomil
- Polyvitaminole

MALADIE: Épilepsie
PRODUITS:
- Cardiomaide
- REA
- TGZ
- Thé Quyérat

MALADIE: Hépatite
PRODUITS:
- Néphromédus
- REA
- TGZ
- Curifera
- Thé Juvéniqua
- Déparazytomil
- HBP
- Polyverode Air Plus

MALADIE: Ulcère
PRODUITS:
- HBP
- TGZ
- Déparazytomil
- Thé Restfort

MALADIE: Fécondité féminine
PRODUITS:
- Thé Fertilia
- Cardiomaide
- Déparazytomil
- TGZ
- HBP

MALADIE: Problèmes des yeux
PRODUITS:
- Paludoxyne
- Cardiomaide
- Polyvitaminole
- HBP

MALADIE: Orgasme féminin
PRODUITS:
- TOB
- HBP
- Thé Fertilia

MALADIE: Arthrose
PRODUITS:
- HBP
- Thé Kadeaut
- REA
- Cardiomaide
- Calciuminoze
- Mère des pommades

MALADIE: Problème cardiaque
PRODUITS:
- REA
- Cardiomaide
- Thé Kadeaut

MALADIE: Problème sexuel homme
PRODUITS:
- HBP
- DT6
- Calciuminoze
- Fertilia

MALADIE: Sinusite
PRODUITS:
- TGZ
- HBP
- Thé Restfort

MALADIE: Hématies faibles
PRODUITS:
- Hématodyne
- REA
- Calciumynoze
- Thé Kadeaut

MALADIE: Goitre
PRODUITS:
- Déparazytomil
- Polyvitaminole
- TGZ
- Thé Juvéniqua
- HBP

MALADIE: Goutte
PRODUITS:
- Néphromédus
- HBP
- Thé Juvéniqua
- Mère des pommades

MALADIE: Paludisme sévère
PRODUITS:
- Paludoxyne
- Hématodyne
- REA

MALADIE: Fatigue chronique
PRODUITS:
- Paludoxyne
- REA
- Thé Quyérat

MALADIE: Système immunitaire faible
PRODUITS:
- TGZ
- REA
- Thé Restfort

MALADIE: Fibrome / Kyste / Myome
PRODUITS:
- HBP
- TGZ
- Hématodyne
- Cardiomaide
- Thé Restfort

MALADIE: Hernie / Hydrocèle
PRODUITS:
- HBP
- TGZ
- DT6
- Cardiomaide
- Calciumynoze
- Thé Fertilia

MALADIE: Maladies virales (SIDA, choléra, COVID, etc.)
PRODUITS:
- Cancéryzol
- Polyverode Air Plus
- Déparazytomil
- Polyvitaminole
- REA
- HBP
- Hématodyne

MALADIE: Épine calcanéenne
PRODUITS:
- Polyverode Air Plus
- Polyvitaminole
- Déparazytomil
- REA
- Mère des pommades
`;

const fullProductListWithPrices = `
Voici la liste complète des produits et services disponibles avec leurs prix. Tu dois utiliser cette liste pour retourner le prix correct de chaque produit suggéré.

### Produits
- NEPHROMEDUS: 18000
- CARDIOMAIDE: 18000
- CALCIUMYNOZE: 12000
- HEMATODYNE: 6750
- PALUDOXYNE: 6750
- HBP (BIPROGESTHYLINE): 18000
- DT6 (PHORXYGEXE): 11250
- TGZ (TRIGLOBUPHAZIDE): 18000
- DIABETHYZOLE: 18000
- CURIFERA: 6750
- TOB (Trilybidinole Orgazmycine Bio): 9000
- REA (Renfordizyme Arthroliazyde): 18000
- POLYVITAMINOLE: 9000
- POLYVERODE - AIR PLUS: 12000
- DEPARASYTHOMIL: 6750

### Les Thés
- THE KADEAUT: 6750
- THE JUVENYQUA: 6750
- THE RESTFORT: 6750
- THE QUEYRAT: 6750
- THE FERTILIA: 6750
- THE CANCERYZOLE: 18000

### Les Miels
- MIEL DE PALAIS: 7500
- MIEL DE MERE: 6750
- MIEL DE MIRE: 6750

### Les Farines
- EQUIFARINA 500g: 3600
- CEREVYTA 500g: 3600
- MEDIFARINOZE 500g: 3600
- MEGAFERINE 500g: 3600
- VITAFARINOLE 500g: 3600
- FARINE à 250g: 1800

### Pommades
- MERE DES POMMADES: 1500
- BAUME DE THEIRE: 7500

### Services (ne pas suggérer comme produits dans le kit)
- BILAN: 10000
- REFLEXOLOGIE: 2000
- MASSAGE COMPLET: 7000
- MASSAGE DES PIEDS: 3000
- SAUNA RELAXANT: 7000
- DESINTOXIFICATION: 3000
`;


const systemInstruction = `Tu es un assistant naturopathe compétent pour AFRIQUADIS, une marque spécialisée dans les solutions de santé naturelles à base de plantes. Ton rôle est d'analyser les symptômes fournis par l'utilisateur ainsi que ses informations de base (âge, sexe) pour suggérer des déséquilibres sous-jacents potentiels d'une manière douce et non médicale. Tu ne dois pas fournir de diagnostic médical. Pour chaque déséquilibre potentiel, suggère un kit de produits AFRIQUADIS pertinent et fournis des conseils de vie pratiques. Ta réponse doit être en français et respecter strictement le schéma JSON fourni. Formule tes suggestions comme des possibilités (par exemple, 'pourrait indiquer', 'suggère') plutôt que des certitudes. Lorsque tu suggères un produit, tu dois aussi inclure son prix en te basant sur la liste de prix fournie. Le nom du produit doit correspondre exactement à celui du catalogue.${symptomKnowledgeBase}${productCatalog}${fullProductListWithPrices}`;

export const useGeminiDiagnosis = () => {
  const [isLoading, setIsLoading] = useState(false);

  const performDiagnosis = useCallback(async (symptomLabels: string[], userInfo: UserInfo): Promise<DiagnosisResult[]> => {
    if (symptomLabels.length === 0) {
      return [];
    }

    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      
      const prompt = `Un patient (${userInfo.gender}, ${userInfo.age} ans) rapporte les symptômes suivants : ${symptomLabels.join(', ')}. Veuillez fournir une analyse en vous basant sur la base de connaissances fournie.`;
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: "application/json",
          responseSchema: responseSchema,
        },
      });

      const jsonText = response.text.trim();
      const result = JSON.parse(jsonText) as DiagnosisResult[];
      
      // Return top 2 results or less
      return result.slice(0, 2);

    } catch (error) {
      console.error("Error performing Gemini diagnosis:", error);
      throw new Error("Failed to get diagnosis from AI.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { performDiagnosis, isLoading };
};
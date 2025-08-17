

import React from 'react';
import { motion, Variants } from 'framer-motion';
import jsPDF from 'jspdf';
import { DiagnosisResult, Product, LifestyleAdvice, UserInfo } from '../types';
import { LeafIcon } from './icons/LeafIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { DownloadIcon } from './icons/DownloadIcon';


// Inlined icon to avoid creating new files
const AlertTriangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);


interface ResultsScreenProps {
  results: DiagnosisResult[] | null;
  error: string | null;
  onRestart: () => void;
  userInfo: UserInfo | null;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const ConfidenceBadge: React.FC<{ confidence: DiagnosisResult['confidence'] }> = ({ confidence }) => {
  const confidenceStyles = {
    'Élevée': 'bg-green-100 text-green-800',
    'Moyenne': 'bg-yellow-100 text-yellow-800',
    'Faible': 'bg-slate-100 text-slate-800',
  };
  return (
    <span className={`px-3 py-1 text-sm font-medium rounded-full ${confidenceStyles[confidence] || confidenceStyles['Faible']}`}>
      Confiance {confidence.toLowerCase()}
    </span>
  );
};


const ResultCard: React.FC<{ result: DiagnosisResult; userInfo: UserInfo | null }> = ({ result, userInfo }) => {
  const handleOrder = () => {
    const total = result.suggestedProducts.reduce((acc, p) => acc + (p.price || 0), 0);
    const productList = result.suggestedProducts
      .map(p => `- ${p.name}` + (p.price ? ` (${p.price.toLocaleString('fr-FR')} F CFA)` : ''))
      .join('\n');

    const userInfoText = userInfo 
      ? `*Nom & Prénom:* ${userInfo.firstName} ${userInfo.lastName}\n*Âge:* ${userInfo.age} ans\n*Sexe:* ${userInfo.gender}` 
      : "Information utilisateur non disponible.";

    const message = encodeURIComponent(
`Bonjour AFRIQUADIS,
Je souhaite commander le kit suivant, suggéré par le Bilan Express.

---
*INFORMATIONS PERSONNELLES*
${userInfoText}
---
*BILAN*
*Déséquilibre identifié:* ${result.pathologyName}
---
*PRODUITS DU KIT*
${productList}
---
*TOTAL ESTIMÉ:* ${total.toLocaleString('fr-FR')} F CFA
---

Merci de m'indiquer la procédure à suivre pour finaliser ma commande.`
    );

    const whatsappUrl = `https://wa.me/22890486468?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const totalCost = result.suggestedProducts.reduce((acc, p) => acc + (p.price || 0), 0);

  return (
    <motion.div variants={itemVariants} className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-2xl font-bold text-amber-600">{result.pathologyName}</h3>
        <ConfidenceBadge confidence={result.confidence} />
      </div>
      <p className="text-slate-600 mb-6">{result.description}</p>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-lg font-semibold text-slate-700 flex items-center">
            <LeafIcon className="h-5 w-5 mr-2 text-amber-500" />
            Kit de produits suggéré
          </h4>
           <p className="font-bold text-slate-800 text-lg">
            Total: {totalCost.toLocaleString('fr-FR')} F CFA
          </p>
        </div>
        <div className="space-y-3">
          {result.suggestedProducts.map((product: Product, index) => (
             <div key={index} className="p-3 bg-white rounded-md border border-slate-200">
                <div className="flex justify-between items-start">
                    <p className="font-bold text-slate-800 pr-2">{product.name}</p>
                    {product.price && (
                    <p className="font-semibold text-amber-700 whitespace-nowrap">{product.price.toLocaleString('fr-FR')} F CFA</p>
                    )}
                </div>
                <p className="text-sm text-slate-600 mt-1">{product.description}</p>
            </div>
          ))}
        </div>
         <button
            onClick={handleOrder}
            className="mt-4 inline-flex items-center justify-center bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 text-sm"
          >
            <WhatsAppIcon className="h-5 w-5 mr-2" />
            Commander ce kit
          </button>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-slate-700 mb-3 flex items-center">
          <CheckCircleIcon className="h-5 w-5 mr-2 text-amber-500" />
          Conseils d'hygiène de vie
        </h4>
        <ul className="space-y-2 text-sm">
          {result.lifestyleAdvice.map((advice: LifestyleAdvice, index) => (
            <li key={index} className="flex items-start">
              <span className="font-semibold text-slate-800 w-32 shrink-0">{advice.category}:</span>
              <span className="text-slate-600">{advice.advice}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ results, error, onRestart, userInfo }) => {
  const hasResults = results && results.length > 0;
  
  const handleDownloadPDF = () => {
    if (!userInfo || !results) return;

    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    let y = 20;

    const normalizeText = (text: string | undefined | null): string => {
        if (!text) return '';
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const checkPageBreak = (spaceNeeded: number) => {
        if (y + spaceNeeded > pageHeight - 20) {
            doc.addPage();
            y = 20;
        }
    }
    
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text(normalizeText('Bilan Express AFRIQUADIS'), 105, y, { align: 'center' });
    y += 15;

    // Patient Info Box
    const patientInfoYStart = y;
    doc.setLineWidth(0.5);
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setFillColor(248, 250, 252); // slate-50
    doc.roundedRect(14, patientInfoYStart, 182, 26, 3, 3, 'FD'); // Fill and Draw

    y += 8;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(51, 65, 85); // slate-700
    doc.text(normalizeText('Informations Personnelles'), 20, y);
    
    y += 8;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105); // slate-600
    doc.text(normalizeText(`Nom & Prénom: ${userInfo.firstName} ${userInfo.lastName}`), 20, y);
    doc.text(normalizeText(`Âge: ${userInfo.age} ans`), 110, y);
    doc.text(normalizeText(`Sexe: ${userInfo.gender}`), 150, y);
    y = patientInfoYStart + 26 + 10; // set y to be after the box + margin
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(normalizeText("Résultats de l'analyse IA"), 14, y);
    y += 10;
    
    results.forEach((result, index) => {
        if (index > 0) {
            y += 5;
            doc.setDrawColor(220);
            doc.line(14, y, 195, y);
            y += 10;
        }

        checkPageBreak(80);

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(202, 138, 4); // amber-600
        doc.text(normalizeText(result.pathologyName), 14, y);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 116, 139); // slate-500
        doc.text(normalizeText(`(Confiance: ${result.confidence})`), 195, y, { align: 'right' });
        y += 7;
        
        doc.setTextColor(51, 65, 85); // slate-700
        doc.setFontSize(11);
        const descriptionLines = doc.splitTextToSize(normalizeText(result.description), 180);
        doc.text(descriptionLines, 14, y);
        y += descriptionLines.length * 5 + 5;
        
        const kitTotal = result.suggestedProducts.reduce((acc, p) => acc + (p.price || 0), 0);

        checkPageBreak(25 + result.suggestedProducts.length * 15);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(normalizeText('Kit de produits suggéré'), 14, y);
        y += 6;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        result.suggestedProducts.forEach(product => {
            checkPageBreak(15);
            const priceText = product.price ? ` (${product.price.toLocaleString('fr-FR')} F CFA)` : '';
            doc.text(normalizeText(`• ${product.name}${priceText}:`), 18, y);
            const productDescLines = doc.splitTextToSize(normalizeText(product.description), 150);
            doc.text(productDescLines, 22, y + 4);
            y += productDescLines.length * 4 + 5;
        });
        
        y += 5;
        checkPageBreak(10);
        doc.setFont('helvetica', 'bold');
        doc.text(normalizeText(`Total estimé du kit: ${kitTotal.toLocaleString('fr-FR')} F CFA`), 14, y);
        y+= 5;


        checkPageBreak(25 + result.lifestyleAdvice.length * 8);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(normalizeText("Conseils d'hygiène de vie"), 14, y);
        y += 6;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        result.lifestyleAdvice.forEach(advice => {
            checkPageBreak(10);
             const adviceLine = `${advice.category}: ${advice.advice}`;
             const adviceLines = doc.splitTextToSize(normalizeText(adviceLine), 180);
             doc.text("•", 18, y);
             doc.text(adviceLines, 22, y);
             y += adviceLines.length * 4 + 2;
        });
    });

    const pageCount = doc.internal.pages.length;
    for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(normalizeText(`Page ${i} sur ${pageCount}`), 195, pageHeight - 10, { align: 'right' });
        doc.text(normalizeText('Ce document est une suggestion générée par IA et ne remplace pas un avis médical.'), 14, pageHeight - 10);
    }
    
    doc.save(normalizeText(`Bilan Express - ${userInfo.firstName} ${userInfo.lastName}.pdf`));
  };


  const renderContent = () => {
    if (error) {
      return (
        <motion.div variants={itemVariants} className="text-center text-red-600 p-8 bg-red-50 border-2 border-dashed border-red-200 rounded-lg">
          <AlertTriangleIcon className="h-12 w-12 mx-auto text-red-500 mb-4" />
          <h3 className="text-xl font-bold text-red-800">Erreur d'analyse</h3>
          <p className="mt-2">{error}</p>
        </motion.div>
      );
    }

    if (!hasResults) {
      return (
        <motion.div variants={itemVariants} className="text-center text-slate-600 p-8 border-2 border-dashed border-slate-300 rounded-lg">
          <h3 className="text-xl font-bold text-slate-700">Aucune correspondance claire trouvée.</h3>
          <p className="mt-2">
            L'IA n'a pas pu identifier un déséquilibre clair basé sur vos symptômes. Pour une analyse plus approfondie, nous vous recommandons de parler à un conseiller.
          </p>
        </motion.div>
      );
    }

    return results.map((result, index) => (
      <ResultCard key={index} result={result} userInfo={userInfo} />
    ));
  };


  return (
    <div className="p-6 md:p-10">
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold text-slate-800 text-center mb-4">Votre Bilan Express IA</motion.h2>
        
        {hasResults && !error && (
          <motion.p variants={itemVariants} className="text-center text-slate-600 mb-8 max-w-2xl mx-auto">
            Basé sur les symptômes que vous avez sélectionnés, voici les correspondances les plus probables identifiées par notre intelligence artificielle.
          </motion.p>
        )}

        {hasResults && !error && userInfo && (
          <motion.div variants={itemVariants} className="flex flex-col items-center mb-8">
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center justify-center bg-amber-500 text-white font-bold py-2 px-5 rounded-full hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all duration-300"
            >
              <DownloadIcon className="h-5 w-5 mr-2" />
              Télécharger le PDF
            </button>
            <p className="text-xs text-slate-500 mt-2">
              Sauvegardez une copie de votre bilan pour vos archives personnelles.
            </p>
          </motion.div>
        )}
        
        {renderContent()}
        
        <motion.div variants={itemVariants} className="mt-10 p-6 bg-amber-50 rounded-lg text-center">
          <h3 className="text-xl font-bold text-slate-800">Besoin d'un conseil personnalisé ?</h3>
          <p className="mt-2 mb-4 text-slate-700">Nos experts sont là pour vous aider à affiner votre bilan et répondre à toutes vos questions.</p>
          <a 
            href="https://wa.me/22892543376"
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300"
          >
            <WhatsAppIcon className="h-6 w-6 mr-2" />
            Parler à un conseiller
          </a>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-10 text-center">
          <button
            onClick={onRestart}
            className="bg-slate-700 text-white font-bold py-3 px-8 rounded-full hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 transition-colors"
          >
            Refaire un bilan
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
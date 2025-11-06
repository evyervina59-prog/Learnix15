
import React, { useState } from 'react';
import type { Dataset } from '../types';
import { XMarkIcon } from './Icons';
import { playSound, QUIZ_QUESTIONS } from '../constants';
import Step6_Quiz from './Step6_Quiz';
import QuizResult from './QuizResult';

interface Step1Props {
  datasets: Dataset[];
  onSelect: (dataset: Dataset) => void;
}

const Step1_DataCollection: React.FC<Step1Props> = ({ datasets, onSelect }) => {
  const [infoModalData, setInfoModalData] = useState<Dataset | null>(null);
  const [modalView, setModalView] = useState<'info' | 'quiz' | 'result'>('info');
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const handleCardClick = (dataset: Dataset) => {
    if (dataset.data) {
      onSelect(dataset);
    } else {
      setInfoModalData(dataset);
      // Reset state when opening modal
      setModalView('info');
      setQuizScore(null);
      playSound('click');
    }
  };
  
  const handleCloseModal = () => {
      playSound('click');
      setInfoModalData(null);
  };

  const handleStartQuiz = () => {
    playSound('select');
    setModalView('quiz');
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    setModalView('result');
    playSound('success');
  };
  
  const handleRetryQuiz = () => {
      playSound('select');
      setQuizScore(null);
      setModalView('quiz');
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-slate-800">Langkah 1: Pengumpulan Data</h2>
      <p className="mt-2 text-slate-600">
        Analisis data dimulai dengan mengumpulkan data. Pilih salah satu dataset di bawah ini untuk kita analisis bersama.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {datasets.map((dataset) => {
          const isInfoCard = !!dataset.content;
          const buttonClasses = isInfoCard 
            ? "border-indigo-400 bg-indigo-50 hover:bg-indigo-100"
            : "border-slate-200 bg-slate-50 hover:border-teal-400 hover:bg-teal-50";
          const textClasses = isInfoCard 
            ? "text-indigo-900 group-hover:text-indigo-700" 
            : "text-slate-900 group-hover:text-teal-700";
          const ctaClasses = isInfoCard
            ? "text-indigo-700 bg-indigo-100"
            : "text-teal-700 bg-teal-100";

          return (
            <button
              key={dataset.id}
              onClick={() => handleCardClick(dataset)}
              className={`group relative flex flex-col justify-between text-left p-6 rounded-xl border ${buttonClasses} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
            >
              <div>
                <h3 className={`text-lg font-semibold ${textClasses}`}>{dataset.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{dataset.description}</p>
              </div>
              <span className={`mt-4 inline-block px-4 py-1.5 text-xs font-medium rounded-full ${ctaClasses}`}>
                {isInfoCard ? 'Baca & Uji Diri' : 'Pilih Dataset'}
              </span>
            </button>
          );
        })}
      </div>

      {infoModalData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 no-print" aria-modal="true" role="dialog">
          <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="p-6 sm:p-8 flex-grow">
                <button 
                  onClick={handleCloseModal} 
                  className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 transition-colors z-10"
                  aria-label="Tutup"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
                
                {modalView === 'info' && (
                    <div>
                        <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: infoModalData.content || '' }} />
                        <div className="mt-8 text-center">
                            <button onClick={handleStartQuiz} className="px-6 py-3 text-base font-semibold text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600 transition-all duration-300">
                                Mulai Uji Pemahaman
                            </button>
                        </div>
                    </div>
                )}

                {modalView === 'quiz' && (
                    <Step6_Quiz onQuizComplete={handleQuizComplete} />
                )}

                {modalView === 'result' && quizScore !== null && (
                    <div className="printable-area">
                        <QuizResult score={quizScore} totalQuestions={QUIZ_QUESTIONS.length} onRetry={handleRetryQuiz} />
                    </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step1_DataCollection;

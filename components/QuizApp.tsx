import React, { useState } from 'react';
import Step6_Quiz from './Step6_Quiz';
import QuizResult from './QuizResult';
import { SparklesIcon, ArrowLeftIcon } from './Icons';
import { QUIZ_QUESTIONS, playSound } from '../constants';

const QuizApp: React.FC = () => {
    const [score, setScore] = useState<number | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleQuizComplete = (finalScore: number) => {
        playSound('success');
        setScore(finalScore);
        setIsCompleted(true);
    };

    const handleResetQuiz = () => {
        playSound('select');
        setScore(null);
        setIsCompleted(false);
    };

    return (
        <div className="min-h-screen bg-sky-50 text-slate-800">
             <div className="relative isolate overflow-hidden bg-gradient-to-b from-teal-100/20 no-print">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <SparklesIcon className="w-8 h-8 text-teal-500" />
                      <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                          Uji Pemahaman
                      </h1>
                    </div>
                  <p className="mt-4 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
                    Ukur seberapa baik kamu memahami materi Analisis Data.
                  </p>
                </div>
                <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
                    <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#90fdf6] to-[#4ade80] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
                </div>
              </div>

              <main className="-mt-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mt-8 bg-white/80 backdrop-blur-sm p-6 sm:p-10 rounded-2xl shadow-lg border border-slate-200/50 min-h-[400px] flex flex-col justify-between transition-all duration-500">
                        <div className="printable-area">
                            {!isCompleted ? (
                                <Step6_Quiz onQuizComplete={handleQuizComplete} />
                            ) : score !== null ? (
                                // FIX: Added the missing onRetry prop to QuizResult
                                <QuizResult score={score} totalQuestions={QUIZ_QUESTIONS.length} onRetry={handleResetQuiz} />
                            ) : null}
                        </div>
                        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
                            <a
                                href="./index.html"
                                className="inline-flex items-center gap-2 justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-all duration-200 w-full sm:w-auto"
                            >
                                <ArrowLeftIcon className="w-4 h-4" />
                                Kembali ke Analisis Data
                            </a>
                            {isCompleted && (
                                <button
                                    onClick={handleResetQuiz}
                                    className="inline-flex items-center gap-2 justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 transition-all duration-200 w-full sm:w-auto"
                                >
                                    Ulangi Kuis
                                </button>
                            )}
                        </div>
                    </div>
                </div>
              </main>

            <footer className="text-center py-8 px-4 text-slate-500 text-sm no-print">
                <p>Dibangun dengan ❤️ untuk pendidikan Informatika Indonesia.</p>
            </footer>
        </div>
    );
};

export default QuizApp;
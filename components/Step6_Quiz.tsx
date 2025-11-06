import React, { useState } from 'react';
import type { Answers } from '../types';
import { QUIZ_QUESTIONS, playSound } from '../constants';

interface Step6Props {
  onQuizComplete: (score: number) => void;
}

const Step6_Quiz: React.FC<Step6Props> = ({ onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  
  const handleAnswerSelect = (optionIndex: number) => {
    playSound('click');
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const handleNextQuestion = () => {
    playSound('transition');
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateScore();
    }
  };

  const handlePrevQuestion = () => {
    playSound('transition');
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    QUIZ_QUESTIONS.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    const finalScore = Math.round((correctAnswers / totalQuestions) * 100);
    onQuizComplete(finalScore);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 text-center">Uji Pemahaman</h2>
      <p className="mt-2 text-slate-600 max-w-3xl mx-auto text-center">
        Sekarang, mari kita uji seberapa jauh pemahamanmu tentang Analisis Data!
      </p>

      <div className="mt-8 max-w-3xl mx-auto bg-white p-8 rounded-lg border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Soal {currentQuestionIndex + 1}</h3>
          <span className="text-sm font-medium text-slate-500">{currentQuestionIndex + 1} dari {totalQuestions}</span>
        </div>
        <p className="text-slate-700 mb-6 min-h-[50px]">{currentQuestion.question}</p>
        
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                answers[currentQuestion.id] === index
                  ? 'bg-teal-50 border-teal-500 shadow-md'
                  : 'bg-slate-50 border-slate-200 hover:border-teal-400'
              }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                checked={answers[currentQuestion.id] === index}
                onChange={() => handleAnswerSelect(index)}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300"
              />
              <span className="ml-3 text-sm font-medium text-slate-800">{option}</span>
            </label>
          ))}
        </div>
      </div>
      
       <div className="mt-6 flex justify-between max-w-3xl mx-auto">
          <button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0} className="px-5 py-2 text-sm font-semibold text-slate-700 bg-white rounded-md shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 disabled:opacity-50">
              Kembali
          </button>
          <button onClick={handleNextQuestion} disabled={answers[currentQuestion.id] === undefined} className="px-5 py-2 text-sm font-semibold text-white bg-teal-500 rounded-md shadow-sm hover:bg-teal-600 disabled:opacity-50">
              {currentQuestionIndex < totalQuestions - 1 ? 'Lanjut' : 'Selesai & Lihat Skor'}
          </button>
      </div>
       <div className="w-full bg-slate-200 rounded-full h-2.5 mt-8 max-w-3xl mx-auto">
          <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}></div>
       </div>

    </div>
  );
};

export default Step6_Quiz;
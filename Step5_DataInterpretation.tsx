import React from 'react';
import { SparklesIcon, HomeIcon } from './components/Icons';

interface Step5Props {
  interpretation: string;
  isLoading: boolean;
  error: string;
  onGenerate: () => void;
  isApiKeyAvailable: boolean;
  onResetToHome: () => void;
}

const Step5_DataInterpretation: React.FC<Step5Props> = ({ interpretation, isLoading, error, onGenerate, isApiKeyAvailable, onResetToHome }) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-slate-800">Langkah 5: Interpretasi Data</h2>
      <p className="mt-2 text-slate-600 max-w-3xl mx-auto">
        Langkah terakhir adalah mengambil kesimpulan dari data yang sudah divisualisasikan. Kita bisa minta bantuan AI untuk membuat interpretasi awal!
      </p>
      
      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
        {!isApiKeyAvailable ? (
             <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-left">
                <div className="flex">
                    <div className="py-1">
                        <p className="text-sm text-yellow-700">
                           Kunci API Gemini tidak ditemukan. Fitur interpretasi AI tidak akan berfungsi. Harap konfigurasikan <code className="font-mono text-xs bg-yellow-200 p-1 rounded">process.env.API_KEY</code>.
                        </p>
                    </div>
                </div>
            </div>
        ) : (
            <>
                <button
                    onClick={onResetToHome}
                    disabled={isLoading}
                    className="inline-flex items-center gap-3 px-6 py-3 text-base font-semibold text-slate-700 bg-white rounded-lg shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300"
                >
                    <HomeIcon className="w-5 h-5" />
                    Kembali ke Awal
                </button>
                <button
                    onClick={onGenerate}
                    disabled={isLoading}
                    className="inline-flex items-center gap-3 px-6 py-3 text-base font-semibold text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600 disabled:bg-slate-400 disabled:cursor-wait transition-all duration-300"
                >
                    <SparklesIcon className="w-5 h-5" />
                    {isLoading ? 'AI Sedang Berpikir...' : 'Buat Interpretasi dengan AI'}
                </button>
            </>
        )}
      </div>

      <div className="mt-6 min-h-[100px] text-left max-w-2xl mx-auto">
        {isLoading && (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse"></div>
          </div>
        )}
        {error && <p className="text-red-500 bg-red-50 p-4 rounded-lg">{error}</p>}
        {interpretation && (
          <div className="bg-teal-50/50 border border-teal-200 p-5 rounded-lg text-slate-700 leading-relaxed prose prose-sm">
            <h4 className="font-bold text-teal-800 flex items-center gap-2"><SparklesIcon className="w-4 h-4" /> Wawasan dari AI:</h4>
            <p>{interpretation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step5_DataInterpretation;
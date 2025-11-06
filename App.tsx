import React from 'react';
import InteractiveContent from './components/InteractiveContent';
import { SparklesIcon, CodeBracketIcon } from './components/Icons';
import { playSound } from './constants';

const App: React.FC = () => {

  return (
    <>
      <div className="min-h-screen bg-sky-50 text-slate-800">
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-teal-100/20 no-print">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 relative">
                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <div className="text-center sm:text-left">
                        <div className="flex justify-center sm:justify-start items-center gap-2">
                            <SparklesIcon className="w-8 h-8 text-teal-500" />
                            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                                Data Explorer Interaktif
                            </h1>
                        </div>
                        <p className="mt-4 text-lg leading-8 text-slate-600 max-w-2xl">
                            Belajar Analisis Data untuk Kelas 9 menjadi seru dan mudah dipahami!
                        </p>
                    </div>
                    <div className="flex-shrink-0 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                            href="./embed_code.html"
                            onClick={() => playSound('select')}
                            className="inline-flex items-center gap-2 w-full sm:w-auto justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-100 transition-all duration-200"
                        >
                            <CodeBracketIcon className="w-5 h-5" />
                            Sematkan di Situs
                        </a>
                    </div>
                </div>
            </div>
            <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
                <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#90fdf6] to-[#4ade80] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
            </div>
        </div>

        <main className='-mt-12'>
          <InteractiveContent />
        </main>

        <footer className="text-center py-8 px-4 text-slate-500 text-sm no-print">
            <p>Dibangun dengan ❤️ untuk pendidikan Informatika Indonesia.</p>
        </footer>
        
      </div>
    </>
  );
};

export default App;
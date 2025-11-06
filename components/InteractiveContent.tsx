import React, { useState, useMemo, useCallback, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { DUMMY_DATASETS, playSound } from '../constants';
import type { Dataset, ChartType, DataPoint } from '../types';
import StepTracker from './StepTracker';
import Step1_DataCollection from './Step1_DataCollection';
import Step2_DataCleaning from './Step2_DataCleaning';
import Step3_DataProcessing from './Step3_DataProcessing';
import Step4_DataVisualization from './Step4_DataVisualization';
import Step5_DataInterpretation from '../Step5_DataInterpretation';
import { ArrowLeftIcon, ArrowRightIcon, ArrowPathIcon, HomeIcon } from './Icons';

const STEPS = [
  'Pengumpulan Data',
  'Pembersihan Data',
  'Pengolahan Data',
  'Visualisasi Data',
  'Interpretasi Data',
];

const InteractiveContent: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
    const [cleanedData, setCleanedData] = useState<DataPoint[] | null>(null);
    const [chartType, setChartType] = useState<ChartType>('bar');
    const [interpretation, setInterpretation] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [animationClass, setAnimationClass] = useState('opacity-100 translate-y-0');
    const isTransitioning = useRef(false);

    const ai = useMemo(() => {
        if (process.env.API_KEY) {
        return new GoogleGenAI({ apiKey: process.env.API_KEY });
        }
        return null;
    }, []);

    const changeStep = useCallback((newStep: number) => {
        if (isTransitioning.current) return;
        isTransitioning.current = true;
        
        // Start fade out and move up
        setAnimationClass('opacity-0 -translate-y-4');

        setTimeout(() => {
            // Prepare for fade in by moving down while still invisible
            setAnimationClass('opacity-0 translate-y-4');
            setCurrentStep(newStep);
            playSound('transition');
            
            // After a very short delay (for react to update the DOM), start the fade in
            setTimeout(() => {
                setAnimationClass('opacity-100 translate-y-0');
                isTransitioning.current = false;
            }, 50);
        }, 300); // This duration should match the fade-out transition
    }, []);

    const handleSelectDataset = (dataset: Dataset) => {
        playSound('select');
        setSelectedDataset(dataset);
        setCleanedData(null);
        setInterpretation('');
        changeStep(2);
    };

    const handleDataCleaned = (data: DataPoint[]) => {
        playSound('success');
        setCleanedData(data);
        changeStep(3);
    };
    
    const handleNextStep = () => {
        playSound('click');
        if (currentStep < STEPS.length && !isNextDisabled()) {
            changeStep(currentStep + 1);
        }
    };

    const handlePrevStep = () => {
        playSound('click');
        if (currentStep > 1) {
            changeStep(currentStep - 1);
        }
    };
    
    const handleReset = () => {
        playSound('select');
        isTransitioning.current = true;
        setAnimationClass('opacity-0 -translate-y-4');

        setTimeout(() => {
            setAnimationClass('opacity-0 translate-y-4');
            setCurrentStep(1);
            setSelectedDataset(null);
            setCleanedData(null);
            setChartType('bar');
            setInterpretation('');
            setError('');

            setTimeout(() => {
                setAnimationClass('opacity-100 translate-y-0');
                isTransitioning.current = false;
            }, 50);
        }, 300);
    };

    const generateInterpretation = useCallback(async () => {
        if (!ai) {
            setError('Kunci API Gemini tidak dikonfigurasi.');
            playSound('error');
            return;
        }
        if (!cleanedData) {
            setError('Tidak ada data yang bersih untuk diinterpretasikan.');
            playSound('error');
            return;
        }
        
        playSound('generate');
        setIsLoading(true);
        setError('');
        setInterpretation('');

        const prompt = `Anda adalah seorang guru Informatika yang antusias untuk siswa kelas 9.
        Jelaskan kesimpulan sederhana dari data berikut dalam satu paragraf singkat.
        Fokus pada wawasan paling jelas yang bisa didapat.
        Dataset: "${selectedDataset?.name}"
        Jenis Grafik: "${chartType}"
        Data: ${JSON.stringify(cleanedData)}
        `;

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            setInterpretation(response.text);
            playSound('success');
        } catch (e) {
            console.error(e);
            setError('Gagal menghasilkan interpretasi. Silakan coba lagi.');
            playSound('error');
        } finally {
            setIsLoading(false);
        }
    }, [ai, cleanedData, chartType, selectedDataset]);
    
    const renderStepContent = () => {
        switch (currentStep) {
        case 1:
            // Custom handler for Step 1 to use changeStep
            return <Step1_DataCollection datasets={DUMMY_DATASETS} onSelect={handleSelectDataset} />;
        case 2:
             // Custom handler for Step 2 to use changeStep
            return selectedDataset && <Step2_DataCleaning dataset={selectedDataset} onClean={handleDataCleaned} />;
        case 3:
            return cleanedData && <Step3_DataProcessing data={cleanedData} />;
        case 4:
            return cleanedData && <Step4_DataVisualization data={cleanedData} chartType={chartType} setChartType={setChartType} />;
        case 5:
            return cleanedData && <Step5_DataInterpretation 
                interpretation={interpretation}
                isLoading={isLoading}
                error={error}
                onGenerate={generateInterpretation}
                isApiKeyAvailable={!!ai}
                onResetToHome={handleReset}
                />;
        default:
            return null;
        }
    };

    const isNextDisabled = () => {
        if (currentStep === 1 && !selectedDataset) return true;
        if (currentStep === 2 && !cleanedData) return true;
        return false;
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="no-print">
                <StepTracker steps={STEPS} currentStep={currentStep} />
            </div>
            
            <div className="mt-8 bg-white/80 backdrop-blur-sm p-6 sm:p-10 rounded-2xl shadow-lg border border-slate-200/50 min-h-[400px] flex flex-col justify-between overflow-hidden">
                <div className={`printable-area transition-all duration-300 ease-in-out ${animationClass}`}>
                    {renderStepContent()}
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
                <button 
                    onClick={handlePrevStep} 
                    disabled={currentStep === 1 || isTransitioning.current}
                    className={`inline-flex items-center gap-2 justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 w-full sm:w-auto ${currentStep === 1 ? 'invisible' : ''}`}
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Sebelumnya
                </button>
                
                <button 
                    onClick={handleReset} 
                    disabled={isTransitioning.current}
                    className="inline-flex items-center gap-2 justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-red-700 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-50 disabled:opacity-50 transition-all duration-200 w-full sm:w-auto order-first sm:order-none"
                >
                    <ArrowPathIcon className="w-4 h-4" />
                    Reset
                </button>

                <button 
                    onClick={handleNextStep} 
                    disabled={isNextDisabled() || currentStep === STEPS.length || isTransitioning.current}
                    className={`inline-flex items-center gap-2 justify-center rounded-md bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 w-full sm:w-auto ${currentStep === 1 ? 'invisible' : ''}`}
                >
                    Selanjutnya
                    <ArrowRightIcon className="w-4 h-4" />
                </button>
                </div>
            </div>
        </div>
    );
};

export default InteractiveContent;
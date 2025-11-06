
import React from 'react';
import { CheckCircleIcon } from './Icons';

interface StepTrackerProps {
  steps: string[];
  currentStep: number;
}

const StepTracker: React.FC<StepTrackerProps> = ({ steps, currentStep }) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} flex-1`}>
            {stepIdx < currentStep - 1 ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-teal-500" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center bg-teal-500 rounded-full">
                  <CheckCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
              </>
            ) : stepIdx === currentStep - 1 ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-slate-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center bg-white border-2 border-teal-500 rounded-full">
                  <span className="h-2.5 w-2.5 bg-teal-500 rounded-full" aria-hidden="true" />
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-slate-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center bg-white border-2 border-slate-300 rounded-full" />
              </>
            )}
             <div className="absolute -bottom-8 w-max text-center -left-1/2 right-[-50%]">
                 <span className={`text-xs sm:text-sm font-semibold ${stepIdx === currentStep - 1 ? 'text-teal-600' : 'text-slate-500'}`}>
                    {step}
                </span>
             </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default StepTracker;

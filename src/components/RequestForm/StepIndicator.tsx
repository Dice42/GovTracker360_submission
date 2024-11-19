import { useEffect, useState } from 'react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  const [animatedStep, setAnimatedStep] = useState(currentStep);

  useEffect(() => {
    setAnimatedStep(currentStep);
  }, [currentStep]);

  return (
    <div className="relative">
      {/* Progress Bar Background */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />
      
      {/* Animated Progress Bar */}
      <div 
        className="absolute top-1/2 left-0 h-0.5 bg-blue-600 -translate-y-1/2 transition-all duration-500 ease-in-out"
        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
      />

      {/* Step Indicators */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="relative">
              <div 
                className={`w-8 h-8 rounded-full border-2 transition-colors duration-500 ease-in-out flex items-center justify-center
                  ${index <= currentStep ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'}`}
              >
                <span 
                  className={`text-sm font-medium ${index <= currentStep ? 'text-white' : 'text-gray-500'}`}
                >
                  {index + 1}
                </span>
              </div>
            </div>
            <span className="mt-2 text-xs text-gray-500 absolute -bottom-6 transform -translate-x-1/2 whitespace-nowrap">
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
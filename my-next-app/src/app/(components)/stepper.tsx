// Stepper.tsx
'use client';
import React from 'react';
import { useStepperStore } from '../(utils)/store';

interface StepperProps {
  handleStepClick?: (index: number) => boolean;
}

export const Stepper: React.FC<StepperProps> = ({ handleStepClick }) => {
  const { activeStep, steps, setActiveStep } = useStepperStore();
  const onStepClick = (index: number) => {
    const canJump = handleStepClick?.(index) ?? true; // default to true if no handler provided
    if (canJump) {
      setActiveStep(index);
    }
  };

  return (
    <aside className="p-4 w-64">
      {steps.map((step, index) => {
        const isCompleted = steps[index].isCompleted;
        const isActive = index === activeStep;

        return (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              <button
                onClick={() => onStepClick(index)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${
                  isCompleted
                    ? 'bg-blue-600 text-white'
                    : isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-gray-300 text-gray-300'
                }`}
              >
                {isCompleted ? '✔' : isActive ? '•' : ''}
              </button>

              {/* Connector line */}
              {index !== steps.length - 1 && (
                <div
                  className={`w-px h-6 ${
                    isCompleted || isActive ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>

            <div className="pt-1">
              <p
                className={`text-sm font-medium ${
                  isCompleted
                    ? 'text-black'
                    : isActive
                    ? 'text-blue-600'
                    : 'text-gray-400'
                }`}
              >
                {step.title}
              </p>
            </div>
          </div>
        );
      })}
    </aside>
  );
};

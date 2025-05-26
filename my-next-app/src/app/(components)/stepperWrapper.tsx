// StepperWrapper.tsx
'use client';

import React from 'react';
import { Stepper } from './stepper';


export const StepperWrapper = () => {
  const handleStepClick = (): boolean => {
    // Add your custom logic here
    return false
  };

  return <Stepper handleStepClick={handleStepClick} />;
};

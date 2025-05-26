'use client';

import { useStepperStore } from '../(utils)/store';
import type { ReactNode } from 'react';
import { StepperWrapper } from '../(components)/stepperWrapper';

export default function RootLayout({ children }: { children: ReactNode }) {
  const { activeStep, steps } = useStepperStore();

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-300 shadow-sm h-screen sticky top-0">
          <StepperWrapper />
        </aside>

        {/* Content area */}
        <div className="flex-1 flex flex-col h-full">
          <main className="flex-1 p-6 overflow-hidden">{children}</main>
        </div>
      </div>
    </div>
  );
}

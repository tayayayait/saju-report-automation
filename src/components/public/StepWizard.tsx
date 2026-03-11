import React, { useState } from 'react';
import { SajuFormData } from './types';
import { CalendarTypeStep } from './steps/CalendarTypeStep';
import { BirthYearStep } from './steps/BirthYearStep';
import { BirthMonthStep } from './steps/BirthMonthStep';
import { BirthDayStep } from './steps/BirthDayStep';
import { BirthTimeStep } from './steps/BirthTimeStep';
import { BirthPlaceStep } from './steps/BirthPlaceStep';
import { GenderStep } from './steps/GenderStep';
import { ConfirmStep } from './steps/ConfirmStep';

interface StepWizardProps {
  onComplete: (data: SajuFormData) => void;
}

const TOTAL_STEPS = 8;

export function StepWizard({ onComplete }: StepWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SajuFormData>({
    calendar_type: null,
    birth_year: null,
    birth_month: null,
    birth_day: null,
    birth_time: null,
    birth_place: null,
    gender: null,
  });

  const updateData = (updates: Partial<SajuFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleEditStep = (stepIndex: number) => {
    if (stepIndex >= 1 && stepIndex <= TOTAL_STEPS) {
      setCurrentStep(stepIndex);
    }
  };

  const currentProgress = (currentStep / TOTAL_STEPS) * 100;

  const renderStep = () => {
    const props = {
      data: formData,
      updateData,
      onNext: handleNext,
      onPrev: handlePrev,
    };

    switch (currentStep) {
      case 1: return <CalendarTypeStep {...props} />;
      case 2: return <BirthYearStep {...props} />;
      case 3: return <BirthMonthStep {...props} />;
      case 4: return <BirthDayStep {...props} />;
      case 5: return <BirthTimeStep {...props} />;
      case 6: return <BirthPlaceStep {...props} />;
      case 7: return <GenderStep {...props} />;
      case 8: return <ConfirmStep {...props} onEditStep={handleEditStep} />;
      default: return null;
    }
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Stitch-style Progress Bar */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-6 justify-between items-center">
          <p className="text-slate-900 text-base font-semibold">Step {currentStep} of {TOTAL_STEPS}</p>
          <p className="text-slate-500 text-sm font-medium">{Math.round(currentProgress)}%</p>
        </div>
        <div className="rounded-full bg-slate-100 overflow-hidden">
          <div 
            className="h-2 rounded-full bg-[#e77e23] transition-all duration-500 ease-out" 
            style={{ width: `${currentProgress}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[360px] flex items-center justify-center">
        {renderStep()}
      </div>
    </div>
  );
}

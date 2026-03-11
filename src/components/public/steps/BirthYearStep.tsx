import React, { useState } from 'react';
import { StepProps } from '../types';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BirthYearStep({ data, updateData, onNext, onPrev }: StepProps) {
  const currentYear = new Date().getFullYear();
  const [decade, setDecade] = useState<number | null>(null);

  const decades = [1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];

  const handleYearSelect = (year: number) => {
    updateData({ birth_year: year });
    onNext();
  };

  const renderDecadeSelection = () => (
    <div className="grid grid-cols-3 gap-3">
      {decades.map((d) => (
        <button
          key={d}
          onClick={() => setDecade(d)}
          className="p-4 rounded-xl border border-gray-200 bg-white text-body-lg font-medium hover:border-[#E67E22]/50 hover:bg-slate-50 transition-all duration-200"
        >
          {d}년대
        </button>
      ))}
    </div>
  );

  const renderYearSelection = () => {
    if (!decade) return null;
    const years = Array.from({ length: 10 }, (_, i) => decade + i).filter(y => y <= currentYear);

    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-300">
        <Button variant="ghost" size="sm" onClick={() => setDecade(null)} className="mb-4 text-gray-500 -ml-2">
          <ChevronLeft className="w-4 h-4 mr-1" /> 연대 다시 선택
        </Button>
        <div className="grid grid-cols-4 gap-2">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => handleYearSelect(y)}
              className={cn(
                "py-3 rounded-lg border transition-all duration-200 font-medium text-body-md",
                data.birth_year === y 
                  ? "border-[#E67E22] bg-[#E67E22] text-[#E67E22]-foreground shadow-sm" 
                  : "border-gray-200 bg-white hover:border-[#E67E22]/40 hover:bg-slate-50"
              )}
            >
              {y}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8 relative">
        <Button variant="ghost" size="icon" onClick={onPrev} className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full hidden sm:flex">
          <ChevronLeft className="w-5 h-5 text-gray-500" />
        </Button>
        <h2 className="text-heading-lg font-bold font-display mb-2">출생연도를 선택해주세요</h2>
        <p className="text-gray-500 text-body-md">태어나신 해를 선택해주세요</p>
      </div>

      {!decade ? renderDecadeSelection() : renderYearSelection()}
      
      <div className="flex justify-center mt-6 sm:hidden">
         <Button variant="outline" onClick={onPrev} className="rounded-full">
            이전으로
         </Button>
      </div>
    </div>
  );
}

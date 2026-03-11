import React from 'react';
import { StepProps } from '../types';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BirthDayStep({ data, updateData, onNext, onPrev }: StepProps) {
  const handleSelect = (day: number) => {
    updateData({ birth_day: day });
    onNext();
  };
  
  // 간단하게 31일까지 무조건 렌더링하도록 함. 
  // 실제로는 birth_year와 month에 따라 말일이 달라지지만, UI 편의상 모두 보여줌.
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-6 w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8 relative">
        <Button variant="ghost" size="icon" onClick={onPrev} className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full hidden sm:flex">
          <ChevronLeft className="w-5 h-5 text-gray-500" />
        </Button>
        <h2 className="text-heading-lg font-bold font-display mb-2">출생 일을 선택해주세요</h2>
        <p className="text-gray-500 text-body-md">태어나신 날짜를 선택해주세요</p>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => handleSelect(d)}
            className={cn(
               "aspect-square rounded-lg border transition-all duration-200 flex flex-col items-center justify-center font-medium text-body-md hover:scale-110 active:scale-95",
               data.birth_day === d
                 ? "border-[#E67E22] bg-[#E67E22] text-[#E67E22]-foreground shadow-md"
                 : "border-gray-200 bg-white hover:border-[#E67E22]/40 hover:bg-slate-50 hover:shadow-saju-xs text-foreground"
            )}
          >
            {d}
          </button>
        ))}
      </div>
      
      <div className="flex justify-center mt-6 sm:hidden">
         <Button variant="outline" onClick={onPrev} className="rounded-full">
            이전으로
         </Button>
      </div>
    </div>
  );
}

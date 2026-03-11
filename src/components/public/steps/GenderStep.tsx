import React from 'react';
import { StepProps } from '../types';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export function GenderStep({ data, updateData, onNext, onPrev }: StepProps) {
  const handleSelect = (gender: 'male' | 'female') => {
    updateData({ gender });
    onNext();
  };

  return (
    <div className="space-y-6 w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10 relative">
        <Button variant="ghost" size="icon" onClick={onPrev} className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full hidden sm:flex">
          <ChevronLeft className="w-5 h-5 text-gray-500" />
        </Button>
        <h2 className="text-heading-lg font-bold font-display mb-2">마지막이에요!</h2>
        <p className="text-gray-500 text-body-md">성별을 선택하시면 분석이 시작됩니다</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleSelect('female')}
          className={cn(
             "aspect-[4/3] rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-3 hover:-translate-y-1 group",
             data.gender === 'female'
               ? "border-pink-500 bg-pink-50 shadow-md shadow-pink-100"
               : "border-gray-200 bg-white hover:border-pink-200 hover:bg-slate-50"
          )}
        >
          <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
            👩
          </div>
          <span className="font-semibold text-lg text-foreground">여성</span>
        </button>
        
        <button
          onClick={() => handleSelect('male')}
          className={cn(
             "aspect-[4/3] rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-3 hover:-translate-y-1 group",
             data.gender === 'male'
               ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-100"
               : "border-gray-200 bg-white hover:border-blue-200 hover:bg-slate-50"
          )}
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
            👨
          </div>
          <span className="font-semibold text-lg text-foreground">남성</span>
        </button>
      </div>
      
      <div className="flex justify-center mt-8 sm:hidden">
         <Button variant="outline" onClick={onPrev} className="rounded-full">
            이전으로
         </Button>
      </div>
    </div>
  );
}

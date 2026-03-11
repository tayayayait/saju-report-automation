import React, { useState } from 'react';
import { StepProps } from '../types';
import { Button } from '@/components/ui/button';
import { ChevronLeft, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export function BirthPlaceStep({ data, updateData, onNext, onPrev }: StepProps) {
  const [customPlace, setCustomPlace] = useState(data.birth_place || '');

  const handleSelect = (place: string) => {
    updateData({ birth_place: place });
    onNext();
  };

  const majorCities = [
    '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종',
    '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'
  ];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPlace.trim()) {
      handleSelect(customPlace.trim());
    }
  };

  return (
    <div className="space-y-6 w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8 relative">
        <Button variant="ghost" size="icon" onClick={onPrev} className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full hidden sm:flex">
          <ChevronLeft className="w-5 h-5 text-gray-500" />
        </Button>
        <h2 className="text-heading-lg font-bold font-display mb-2">어디서 태어나셨나요?</h2>
        <p className="text-gray-500 text-body-md">지역에 따른 시간 보정에 사용됩니다 (선택적)</p>
      </div>

      <form onSubmit={handleCustomSubmit} className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <Input 
            value={customPlace}
            onChange={(e) => setCustomPlace(e.target.value)}
            placeholder="직접 입력 (예: 서울특별시 서초구)"
            className="h-12 pl-10 rounded-xl bg-white border-gray-200 text-body-md"
          />
        </div>
        <Button type="submit" className="h-12 px-6 rounded-xl bg-[#E67E22] text-white font-semibold" disabled={!customPlace.trim()}>
          입력
        </Button>
      </form>

      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
        {majorCities.map((city) => (
          <button
            key={city}
            onClick={() => handleSelect(city)}
            className={cn(
               "py-2.5 rounded-lg border transition-all duration-200 text-body-sm font-medium hover:scale-105 active:scale-95",
               data.birth_place === city
                 ? "border-[#E67E22] bg-[#E67E22] text-[#E67E22]-foreground shadow-sm"
                 : "border-gray-200 bg-white hover:border-[#E67E22]/40 hover:bg-slate-50 text-foreground"
            )}
          >
            {city}
          </button>
        ))}
      </div>
      
      <button
        onClick={() => handleSelect('모름')}
        className="w-full mt-4 py-4 text-body-md font-medium text-gray-500 underline hover:text-foreground transition-colors"
      >
        건너뛰기
      </button>

      <div className="flex justify-center mt-6 sm:hidden">
         <Button variant="outline" onClick={onPrev} className="rounded-full">
            이전으로
         </Button>
      </div>
    </div>
  );
}

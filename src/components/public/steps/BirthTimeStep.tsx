import React from 'react';
import { StepProps } from '../types';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Clock, History } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SiganSelector } from '@/components/SiganSelector';

export function BirthTimeStep({ data, updateData, onNext, onPrev }: StepProps) {
  const handleSelectExactTime = (time: string, isNext: boolean = false) => {
    updateData({ birth_time: time });
    if(isNext) {
      onNext();
    }
  };

  const handleUnknownTime = () => {
    updateData({ birth_time: null });
    onNext();
  };

  return (
    <div className="space-y-6 w-full max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-6 relative">
        <Button variant="ghost" size="icon" onClick={onPrev} className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full hidden sm:flex hover:bg-slate-100">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </Button>
        <h2 className="text-heading-lg font-bold font-display mb-2 text-foreground">출생 시간을 알려주세요</h2>
        <p className="text-gray-500 text-body-md">정확한 사주 분석을 위해 필수적입니다</p>
      </div>

      <div className="space-y-5">
        
        {/* 방법 1: 정확한 시간 입력 */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-[#E67E22]/30 transition-colors group">
          <label className="flex items-center gap-2 text-body-lg font-bold mb-1 text-slate-800">
            <Clock className="w-5 h-5 text-[#E67E22]" />
            정확한 출생 분(Minute)을 아시나요?
          </label>
          <p className="text-caption text-slate-500 mb-4 ml-7">예: 오후 2시 30분이라면 14:30 입력</p>
          <div className="flex gap-3 ml-7">
            <input 
              type="time" 
              value={data.birth_time || ''}
              onChange={(e) => handleSelectExactTime(e.target.value)}
              className="flex-1 h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-body-lg font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#E67E22]/30 transition-all text-slate-700"
            />
            <Button 
              className="h-12 px-6 sm:px-8 rounded-xl bg-[#E67E22] hover:bg-[#E67E22]-hover text-[#E67E22]-foreground font-semibold shadow-sm transition-all"
              onClick={() => onNext()}
              disabled={!data.birth_time}
            >
              다음
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 py-1 px-4">
          <div className="h-px bg-slate-200 flex-1" />
          <span className="text-caption font-medium text-slate-400">또는</span>
          <div className="h-px bg-slate-200 flex-1" />
        </div>

        {/* 방법 2: 십이지신 선택 */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-[#E67E22]/30 transition-colors group">
          <label className="flex items-center gap-2 text-body-lg font-bold mb-1 text-slate-800">
            <History className="w-5 h-5 text-indigo-500" />
            대략적인 시간대만 아시나요?
          </label>
          <p className="text-caption text-slate-500 mb-5 ml-7">해당하는 시간을 클릭만 하세요. 자동으로 다음 단계로 이동합니다.</p>
          <div className="ml-1 sm:ml-7">
            <SiganSelector value={data.birth_time || ''} onChange={(time) => handleSelectExactTime(time, true)} />
          </div>
        </div>

        <div className="pt-4 text-center">
          <button
            onClick={handleUnknownTime}
            className="text-body-sm font-medium text-slate-400 hover:text-slate-600 underline underline-offset-4 transition-colors p-2"
          >
            정말 태어난 시간을 모르겠어요
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-2 sm:hidden">
         <Button variant="outline" onClick={onPrev} className="rounded-full px-6">
            이전으로 돌아가기
         </Button>
      </div>
    </div>
  );
}

import React from 'react';
import { StepProps } from '../types';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CalendarTypeStep({ data, updateData, onNext }: StepProps) {
  const handleSelect = (type: 'solar' | 'lunar' | 'lunar_leap') => {
    updateData({ calendar_type: type });
    onNext();
  };

  const options = [
    { id: 'solar', label: '양력 (Solar)', desc: '일반적으로 사용하는 달력입니다.', icon: Sun },
    { id: 'lunar', label: '음력 (Lunar)', desc: '전통적으로 사용하는 달력입니다.', icon: Moon },
    { id: 'lunar_leap', label: '윤달 (Lunar Leap)', desc: '음력 윤달에 태어나신 분들을 위한 달력입니다.', icon: Sparkles },
  ] as const;

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-3 mb-8">
        <h2 className="text-slate-900 text-2xl md:text-3xl font-bold leading-tight">달력 유형을 선택해주세요</h2>
        <p className="text-slate-600 text-base">정확한 사주 분석을 위해 태어난 달력 유형을 선택해주세요.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt.id)}
            className={cn(
              "group flex flex-col gap-4 rounded-2xl border-2 bg-white p-6 text-left transition-all hover:shadow-md cursor-pointer focus:outline-none",
              data.calendar_type === opt.id
                ? "border-[#e77e23] shadow-md"
                : "border-slate-100 hover:border-[#e77e23]"
            )}
          >
            <div className={cn(
              "transition-colors",
              data.calendar_type === opt.id ? "text-[#e77e23]" : "text-slate-400 group-hover:text-[#e77e23]"
            )}>
              <opt.icon className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className={cn(
                "text-lg font-bold leading-tight transition-colors",
                data.calendar_type === opt.id ? "text-[#e77e23]" : "text-slate-900 group-hover:text-[#e77e23]"
              )}>{opt.label}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{opt.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

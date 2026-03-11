import React from 'react';
import { StepProps } from '../types';
import { Button } from '@/components/ui/button';
import { ChevronLeft, CheckCircle2, ArrowRight } from 'lucide-react';

interface ConfirmStepProps extends StepProps {
  onEditStep?: (stepIndex: number) => void;
}

export function ConfirmStep({ data, updateData, onNext, onPrev, onEditStep }: ConfirmStepProps) {
  
  const getCalendarText = () => {
    switch(data.calendar_type) {
      case 'lunar': return '음력 (평달)';
      case 'lunar_leap': return '음력 (윤달)';
      default: return '양력';
    }
  };

  const getGenderText = () => {
    switch(data.gender) {
      case 'male': return '남성';
      case 'female': return '여성';
      default: return '-';
    }
  };

  const summaryItems = [
    { label: '성별', value: getGenderText(), step: 7 },
    { label: '출생일', value: `${data.birth_year}년 ${data.birth_month}월 ${data.birth_day}일 (${getCalendarText()})`, step: 1 },
    { label: '출생시간', value: data.birth_time ? `${data.birth_time}` : '모름', step: 5 },
    { label: '출생지역', value: data.birth_place || '선택 안함', step: 6 },
  ];

  return (
    <div className="space-y-8 w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-6 relative">
        <Button variant="ghost" size="icon" onClick={onPrev} className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full hidden sm:flex hover:bg-slate-100">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </Button>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#E67E22] text-[#E67E22] mb-4">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h2 className="text-heading-lg font-bold font-display mb-2 text-foreground">사주 정보를 확인해주세요</h2>
        <p className="text-gray-500 text-body-md">입력하신 정보가 맞는지 마지막으로 확인합니다.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <ul className="divide-y divide-border/60">
          {summaryItems.map((item, idx) => (
            <li key={idx} className="flex items-center justify-between p-4 sm:px-6 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col">
                <span className="text-caption font-medium text-slate-500 mb-0.5">{item.label}</span>
                <span className="text-body-md font-bold text-slate-800">{item.value}</span>
              </div>
              {onEditStep && (
                <button 
                  onClick={() => onEditStep(item.step)}
                  className="text-[#E67E22] text-body-sm font-semibold hover:underline"
                >
                  수정
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row gap-3">
        <Button 
          variant="outline" 
          onClick={onPrev} 
          className="h-14 sm:hidden flex-1 rounded-xl text-body-lg font-medium"
        >
          이전
        </Button>
        <Button 
          onClick={() => onNext()} 
          className="h-14 flex-1 rounded-xl bg-[#E67E22] hover:bg-[#E67E22]-hover text-white text-body-lg font-bold shadow-md hover:shadow-lg transition-all"
        >
          분석 리포트 생성하기
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}

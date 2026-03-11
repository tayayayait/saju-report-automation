import * as React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface InputSummaryBarProps {
  sajuResult: any;
  onReset: () => void;
}

export function InputSummaryBar({ sajuResult, onReset }: InputSummaryBarProps) {
  if (!sajuResult) return null;
  const { birth_year, birth_month, birth_day, birth_time, calendar_type, birth_place, gender } = sajuResult;
  const calText = calendar_type === 'solar' ? '양력' : calendar_type === 'lunar' ? '음력' : '윤달';
  const genderText = gender === 'male' ? '남성' : '여성';
  
  return (
    <div className="flex items-center justify-between p-3 sm:p-4 bg-white/80 backdrop-blur-md border border-border rounded-xl shadow-saju-xs">
      <div className="text-caption sm:text-body-sm font-medium text-text-secondary flex flex-wrap gap-x-2 gap-y-1">
        <span>{birth_year}년 {birth_month}월 {birth_day}일</span>
        <span className="text-border-strong hidden sm:inline">|</span>
        <span>{birth_time || '시간모름'}</span>
        <span className="text-border-strong hidden sm:inline">|</span>
        <span>{calText}</span>
        <span className="text-border-strong hidden sm:inline">|</span>
        <span>{genderText}</span>
        <span className="text-border-strong hidden sm:inline">|</span>
        <span>{birth_place || '출생지 모름'}</span>
      </div>
      <Button variant="outline" size="sm" onClick={onReset} className="shrink-0 h-8 md:h-9 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
        <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
        <span className="hidden sm:inline">다시 분석하기</span>
        <span className="sm:hidden">다시하기</span>
      </Button>
    </div>
  );
}

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LayoutGrid, Calendar, Heart, Coins, Briefcase, HeartPulse, History, Users } from 'lucide-react';

export type AnalysisCategory = 'overall' | 'yearly_2026' | 'love' | 'wealth' | 'career' | 'health' | 'daeun' | 'compatibility';

interface AnalysisCategoryGridProps {
  selectedCategory: AnalysisCategory | null;
  onSelect: (category: AnalysisCategory) => void;
  className?: string;
}

const CATEGORIES: { id: AnalysisCategory; label: string; icon: React.ReactNode; color: string }[] = [
  { id: 'overall', label: '종합 사주 분석', icon: <LayoutGrid />, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  { id: 'yearly_2026', label: '올해 운세 (2026년)', icon: <Calendar />, color: 'text-rose-600 bg-rose-50 border-rose-200' },
  { id: 'love', label: '연애/결혼운', icon: <Heart />, color: 'text-pink-600 bg-pink-50 border-pink-200' },
  { id: 'wealth', label: '재물/사업운', icon: <Coins />, color: 'text-amber-600 bg-amber-50 border-amber-200' },
  { id: 'career', label: '직업/적성', icon: <Briefcase />, color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { id: 'health', label: '건강운', icon: <HeartPulse />, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { id: 'daeun', label: '대운 흐름', icon: <History />, color: 'text-purple-600 bg-purple-50 border-purple-200' },
  { id: 'compatibility', label: '궁합 분석', icon: <Users />, color: 'text-orange-600 bg-orange-50 border-orange-200' },
];

export function AnalysisCategoryGrid({ selectedCategory, onSelect, className }: AnalysisCategoryGridProps) {
  return (
    <Card className={cn("p-4 sm:p-6 bg-slate-50 border-border rounded-xl shadow-saju-sm", className)}>
      <h3 className="text-body-md font-bold text-foreground mb-4 flex items-center gap-2 font-display">
        <LayoutGrid className="w-5 h-5 text-primary" />
        AI 사주 분석 카테고리
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {CATEGORIES.map(cat => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={cn(
                "flex flex-col items-center justify-center p-4 gap-3 rounded-xl transition-all border duration-200",
                isSelected 
                  ? "bg-white border-primary shadow-[0_0_0_2px_rgba(107,70,193,0.2)] md:translate-y-[-2px] ring-offset-0" 
                  : "bg-white border-border/60 hover:border-border-strong hover:bg-slate-50/80 hover:shadow-saju-xs"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border", 
                isSelected ? cat.color : "bg-slate-100 text-slate-500 border-slate-200"
              )}>
                {React.cloneElement(cat.icon as React.ReactElement, { className: 'w-5 h-5' })}
              </div>
              <span className={cn(
                "text-body-sm sm:text-caption font-semibold",
                isSelected ? "text-foreground" : "text-muted-foreground"
              )}>
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

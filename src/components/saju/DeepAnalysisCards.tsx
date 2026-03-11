import * as React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Heart, Briefcase, HeartPulse, Users, Coins, CalendarDays, Search } from 'lucide-react';

export type DeepAnalysisCategory = 'love' | 'career' | 'health' | 'family' | 'wealth' | 'daily' | 'specific_period';

interface DeepAnalysisCardsProps {
  selectedCategory: DeepAnalysisCategory | null;
  onSelect: (category: DeepAnalysisCategory) => void;
  className?: string;
}

const DEEP_CATEGORIES: { id: DeepAnalysisCategory; label: string; num: string; icon: React.ReactNode; color: string }[] = [
  { id: 'love', label: '올해 연애운', num: '1️⃣', icon: <Heart />, color: 'bg-pink-100 text-pink-700' },
  { id: 'career', label: '이직/창업 시기', num: '2️⃣', icon: <Briefcase />, color: 'bg-blue-100 text-blue-700' },
  { id: 'health', label: '건강 관리법', num: '3️⃣', icon: <HeartPulse />, color: 'bg-emerald-100 text-emerald-700' },
  { id: 'family', label: '가족 관계', num: '4️⃣', icon: <Users />, color: 'bg-orange-100 text-orange-700' },
  { id: 'wealth', label: '재물운 흐름', num: '5️⃣', icon: <Coins />, color: 'bg-amber-100 text-amber-700' },
  { id: 'daily', label: '일진 달력', num: '6️⃣', icon: <CalendarDays />, color: 'bg-indigo-100 text-indigo-700' },
  { id: 'specific_period', label: '특정 시기 분석', num: '7️⃣', icon: <Search />, color: 'bg-slate-200 text-slate-700' },
];

export function DeepAnalysisCards({ selectedCategory, onSelect, className }: DeepAnalysisCardsProps) {
  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", className)}>
      {DEEP_CATEGORIES.map(cat => {
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={cn(
              "flex items-center gap-3 p-4 rounded-xl transition-all border shadow-sm text-left group",
              isSelected 
                ? "bg-white border-primary shadow-[0_0_0_2px_rgba(107,70,193,0.2)]" 
                : "bg-white hover:bg-slate-50 border-border"
            )}
          >
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", cat.color)}>
              {React.cloneElement(cat.icon as React.ReactElement, { className: 'w-5 h-5' })}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground font-medium mb-0.5">{cat.num} 심화 분석</span>
              <span className={cn("text-body-sm font-bold", isSelected ? "text-foreground" : "text-slate-700")}>
                {cat.label}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

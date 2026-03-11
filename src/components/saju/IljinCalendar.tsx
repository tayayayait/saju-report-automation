import * as React from 'react';
import { Card } from '@/components/ui/card';
import { IljinDay } from '@/services/iljinCalendarService';
import { cn } from '@/lib/utils';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

interface IljinCalendarProps {
  year: number;
  month: number;
  days: IljinDay[];
  onPrevMonth: () => void;
  onNextMonth: () => void;
  isLoading?: boolean;
  className?: string;
}

const WEEKS = ['일', '월', '화', '수', '목', '금', '토'];

export function IljinCalendar({ year, month, days, onPrevMonth, onNextMonth, isLoading, className }: IljinCalendarProps) {
  // 1일의 요일 파악
  const firstDay = new Date(year, month - 1, 1).getDay();
  // 빈 칸 추가
  const blanks = Array.from({ length: firstDay }).map((_, i) => <div key={`blank-${i}`} className="p-2" />);

  return (
    <Card className={cn("p-4 sm:p-6 bg-white border-border rounded-xl shadow-saju-sm", className)}>
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-heading-sm font-bold text-slate-800 flex items-center gap-2 font-display">
          <CalendarDays className="w-5 h-5 text-indigo-500" />
          {year}년 {month}월 일진 달력
        </h4>
        <div className="flex gap-1">
          <button onClick={onPrevMonth} className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={onNextMonth} className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="h-64 flex items-center justify-center text-muted-foreground">달력을 불러오는 중...</div>
      ) : (
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {WEEKS.map(w => (
            <div key={w} className="text-center text-[11px] font-semibold text-muted-foreground py-2">
              {w}
            </div>
          ))}
          
          {blanks}
          
          {days.map((d) => {
             const isWeekend = new Date(d.date).getDay() === 0 || new Date(d.date).getDay() === 6;
             const ganji = (d.saju as any).toHanjaObject().day.korean;
             
             return (
               <div 
                 key={d.date} 
                 className={cn(
                   "flex flex-col p-1.5 sm:p-2 border rounded-lg aspect-square relative sm:aspect-auto sm:min-h-[80px]",
                   isWeekend ? "bg-slate-50 border-border/40" : "bg-white border-border/80",
                   d.isLucky === true ? "ring-1 ring-emerald-200 bg-emerald-50/30" : d.isLucky === false ? "ring-1 ring-rose-200 bg-rose-50/30" : ""
                 )}
               >
                 <div className="flex justify-between items-start mb-1">
                   <span className={cn("text-caption font-bold", isWeekend ? "text-slate-500" : "text-slate-700")}>{d.day}</span>
                   {d.isLucky === true && <div className="w-2 h-2 rounded-full bg-emerald-500" title="길운" />}
                   {d.isLucky === false && <div className="w-2 h-2 rounded-full bg-rose-500" title="주의" />}
                 </div>
                 <div className="flex-1 flex flex-col justify-center items-center">
                    <span className="text-body-sm font-bold font-display text-slate-800">{ganji}</span>
                    <span className="text-[10px] text-muted-foreground mt-0.5">{d.sipseong}</span>
                 </div>
               </div>
             );
          })}
        </div>
      )}
      <div className="mt-4 flex gap-4 text-[10px] text-muted-foreground justify-end">
         <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500" /> 순탄한 날 (길운)</span>
         <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-rose-500" /> 주의할 날 (흉운)</span>
      </div>
    </Card>
  );
}

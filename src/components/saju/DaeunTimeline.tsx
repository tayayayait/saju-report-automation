import * as React from 'react';
import { Card } from '@/components/ui/card';
import { getOhengColor } from '@/lib/ohengColors';
import { cn } from '@/lib/utils';
import { History } from 'lucide-react';

export function DaeunTimeline({ daeunList, className }: { daeunList: any[], className?: string }) {
  if (!daeunList || daeunList.length === 0) return null;

  return (
    <Card className={cn("p-4 sm:p-6 bg-slate-50/50 border-border rounded-xl shadow-saju-sm overflow-hidden", className)}>
      <h4 className="text-body-sm sm:text-body-md font-semibold text-muted-foreground mb-4 font-display flex items-center gap-1.5">
        <History className="w-4 h-4 text-purple-600" />
        대운 흐름 타임라인 <span className="text-caption font-normal ml-1">(10년 주기)</span>
      </h4>
      <div className="overflow-x-auto pb-4 custom-scrollbar">
        <div className="flex gap-2 w-max px-2">
          {daeunList.map((d, i) => {
            const style = getOhengColor(d.oheng as any);
            return (
              <div key={i} className="flex flex-col items-center w-16 sm:w-20 shrink-0 gap-2 relative group hover:-translate-y-1 transition-transform">
                <div className="text-caption font-semibold text-text-secondary mb-1">
                  {d.startAge}세
                </div>
                <div className={cn("flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border shadow-sm z-10", style.bg, style.border)}>
                  <span className={cn("text-heading-sm font-bold font-display leading-none drop-shadow-sm", style.text)}>
                    {d.hanja}
                  </span>
                </div>
                {/* Connecting line */}
                {i < daeunList.length - 1 && (
                  <div className="absolute top-[38px] sm:top-[44px] left-1/2 w-full h-[2px] bg-slate-200 -z-10 translate-x-3 sm:translate-x-4"></div>
                )}
                <div className="text-[10px] sm:text-caption text-text-tertiary font-medium bg-white/80 px-1.5 py-0.5 rounded-full border border-black/5 shadow-xs">
                  {d.ganJi} ({d.oheng})
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

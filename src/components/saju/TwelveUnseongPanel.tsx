import * as React from 'react';
import { Card } from '@/components/ui/card';
import { calculate12Unseong } from '@/lib/sajuAnalysis';
import { cn } from '@/lib/utils';
import { Layers } from 'lucide-react';

interface TwelveUnseongPanelProps {
  hanjaObj: any;
  className?: string;
}

export function TwelveUnseongPanel({ hanjaObj, className }: TwelveUnseongPanelProps) {
  if (!hanjaObj || !hanjaObj.year) return null;

  const dayGan = hanjaObj.day.korean[0];

  const pillars = [
    { label: '시지', branch: hanjaObj.hour.korean[1] },
    { label: '일지', branch: hanjaObj.day.korean[1] },
    { label: '월지', branch: hanjaObj.month.korean[1] },
    { label: '년지', branch: hanjaObj.year.korean[1] }
  ];

  return (
    <Card className={cn("p-4 sm:p-5 bg-slate-50/50 border-border rounded-xl shadow-saju-sm", className)}>
      <h4 className="text-body-sm font-semibold text-muted-foreground mb-3 font-display flex items-center gap-1.5">
        <Layers className="w-4 h-4" />
        12운성 (에너지의 흐름)
      </h4>
      <div className="grid grid-cols-4 gap-2">
        {pillars.map((p, i) => {
          const unseong = calculate12Unseong(dayGan, p.branch);
          return (
            <div key={i} className="flex flex-col items-center justify-center p-2 sm:p-3 bg-white rounded-lg border border-border/50 text-center">
              <span className="text-[10px] text-muted-foreground mb-1">{p.label}</span>
              <span className="text-body-sm font-bold text-slate-700">{unseong}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

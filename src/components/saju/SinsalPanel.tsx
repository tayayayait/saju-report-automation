import * as React from 'react';
import { Card } from '@/components/ui/card';
import { detectSinsal } from '@/lib/sajuAnalysis';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface SinsalPanelProps {
  hanjaObj: any;
  className?: string;
}

export function SinsalPanel({ hanjaObj, className }: SinsalPanelProps) {
  if (!hanjaObj || !hanjaObj.year) return null;

  const sinsalList = detectSinsal(hanjaObj);

  return (
    <Card className={cn("p-4 sm:p-5 bg-slate-50/50 border-border rounded-xl shadow-saju-sm", className)}>
      <h4 className="text-body-sm font-semibold text-muted-foreground mb-3 font-display flex items-center gap-1.5">
        <Sparkles className="w-4 h-4" />
        주요 신살 (특별한 기운)
      </h4>
      {sinsalList.length === 0 ? (
        <p className="text-caption text-text-tertiary p-3 bg-white rounded-lg border border-border/50 text-center">
          발견된 주요 신살이 없습니다.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {sinsalList.map((sinsal, i) => (
            <div key={i} className="flex flex-col gap-1 p-3 bg-white rounded-lg border border-border/50 flex-1 min-w-[140px]">
              <div className="flex justify-between items-center">
                <span className="text-body-sm font-bold text-slate-700">{sinsal.name}</span>
                <span className="text-[10px] text-muted-foreground bg-slate-100 px-1.5 py-0.5 rounded">{sinsal.pillar}</span>
              </div>
              <span className="text-[11px] text-text-secondary leading-tight mt-1">{sinsal.desc}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

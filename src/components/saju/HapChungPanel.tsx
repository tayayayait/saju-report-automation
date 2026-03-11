import * as React from 'react';
import { Card } from '@/components/ui/card';
import { analyzeHapChung } from '@/lib/sajuAnalysis';
import { cn } from '@/lib/utils';
import { Link2 } from 'lucide-react';

interface HapChungPanelProps {
  hanjaObj: any;
  className?: string;
}

export function HapChungPanel({ hanjaObj, className }: HapChungPanelProps) {
  if (!hanjaObj || !hanjaObj.year) return null;

  const results = analyzeHapChung(hanjaObj);

  return (
    <Card className={cn("p-4 sm:p-5 bg-slate-50/50 border-border rounded-xl shadow-saju-sm", className)}>
      <h4 className="text-body-sm font-semibold text-muted-foreground mb-3 font-display flex items-center gap-1.5">
        <Link2 className="w-4 h-4" />
        합·충 무늬 (관계성)
      </h4>
      {results.length === 0 ? (
        <p className="text-caption text-text-tertiary p-3 bg-white rounded-lg border border-border/50 text-center">
          눈에 띄는 합충 관계가 없습니다. 원만한 성향을 보입니다.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {results.map((res, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-border/50">
              <span className={cn(
                "px-2 py-0.5 rounded text-[10px] font-bold shrink-0 mt-0.5",
                res.type === '합' ? 'bg-indigo-100 text-indigo-700' : 'bg-rose-100 text-rose-700'
              )}>
                {res.type}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-body-sm font-medium">{res.desc.split(':')[0]}</span>
                <span className="text-caption text-text-secondary">{res.desc.split(':')[1]}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

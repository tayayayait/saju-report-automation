import * as React from 'react';
import { Card } from '@/components/ui/card';
import { getHeavenlyStemElement, getEarthlyBranchElement } from 'manseryeok';
import { getOhengColor } from '@/lib/ohengColors';
import { cn } from '@/lib/utils';
import { PieChart } from 'lucide-react';

interface OhengDistributionChartProps {
  hanjaObj: any;
  yongsinInfo?: { strength: string; yongsin: string; explanation: string };
  className?: string;
}

const ALL_OHENGS = ['목', '화', '토', '금', '수'];

export function OhengDistributionChart({ hanjaObj, yongsinInfo, className }: OhengDistributionChartProps) {
  if (!hanjaObj || !hanjaObj.year) return null;

  // 8글자의 오행 카운트
  const counts: Record<string, number> = { '목': 0, '화': 0, '토': 0, '금': 0, '수': 0 };
  let total = 0;

  ['year', 'month', 'day', 'hour'].forEach(key => {
    const pillar = hanjaObj[key];
    if (!pillar || !pillar.korean) return;

    try {
      const ganEl = getHeavenlyStemElement(pillar.korean[0] as any);
      const jiEl = getEarthlyBranchElement(pillar.korean[1] as any);
      if (counts[ganEl] !== undefined) counts[ganEl]++;
      if (counts[jiEl] !== undefined) counts[jiEl]++;
      total += 2;
    } catch(e) {}
  });

  return (
    <Card className={cn("p-4 sm:p-6 bg-slate-50/50 border-border rounded-xl shadow-saju-sm", className)}>
      <h4 className="text-body-sm font-semibold text-muted-foreground mb-4 font-display flex items-center gap-1.5">
        <PieChart className="w-4 h-4" />
        오행 분포 비율
      </h4>
      
      <div className="flex flex-col gap-3">
        {ALL_OHENGS.map(oheng => {
          const count = counts[oheng];
          const percent = total > 0 ? Math.round((count / total) * 100) : 0;
          const style = getOhengColor(oheng as any);
          
          return (
            <div key={oheng} className="flex items-center gap-3">
              <span className={cn("w-6 font-medium text-body-sm shrink-0", style.text)}>
                {oheng}
              </span>
              <div className="flex-1 h-2 sm:h-2.5 bg-slate-200/60 rounded-full overflow-hidden">
                <div 
                  className={cn("h-full transition-all duration-1000 ease-out rounded-full", style.bg)}
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="w-10 text-right text-caption font-medium text-text-secondary">
                {count}개
              </div>
            </div>
          );
        })}
      </div>
      
      {/* 분석결과 요약 코멘트 */}
      <div className="mt-5 space-y-3">
        <div className="p-3 sm:p-4 bg-white rounded-lg border border-border text-caption text-text-secondary leading-relaxed shadow-sm">
          {Object.entries(counts).filter(([_, count]) => count >= 3).map(([oheng]) => (
            <span key={oheng} className="block mb-1">
              • <strong className={getOhengColor(oheng as any).text}>{oheng} 기운</strong>이 발달하여 관련된 특성이 강하게 나타납니다.
            </span>
          ))}
          {Object.entries(counts).filter(([_, count]) => count === 0).map(([oheng]) => (
            <span key={oheng} className="block text-text-tertiary">
              • {oheng} 기운이 부족하여 이를 보완하는 노력이 필요할 수 있습니다.
            </span>
          ))}
        </div>
        
        {yongsinInfo && (
          <div className="p-3 sm:p-4 bg-primary/5 rounded-lg border border-primary/20 text-caption text-text-secondary leading-relaxed shadow-sm">
             <span className="block font-medium text-primary mb-1">🎯 오행 보완 조언 (용신)</span>
             {yongsinInfo.explanation}
          </div>
        )}
      </div>
    </Card>
  );
}

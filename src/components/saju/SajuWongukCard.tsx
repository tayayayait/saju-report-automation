import * as React from 'react';
import { Card } from '@/components/ui/card';
import { getHeavenlyStemElement, getEarthlyBranchElement } from 'manseryeok';
import { getOhengColor } from '@/lib/ohengColors';
import { cn } from '@/lib/utils';

interface SajuWongukCardProps {
  hanjaObj: any; 
  sipsungObj?: any;
  className?: string;
}

export function SajuWongukCard({ hanjaObj, sipsungObj, className }: SajuWongukCardProps) {
  if (!hanjaObj || !hanjaObj.year) return null;

  const getPillarData = (key: 'year' | 'month' | 'day' | 'hour', label: string) => {
    const pillar = hanjaObj[key];
    if (!pillar) return { label, gan: '-', ji: '-', kor: '-', ganBg: '', jiBg: '', ganSip: '', jiSip: '' };

    const korGan = pillar.korean[0];
    const korJi = pillar.korean[1];
    const hanGan = pillar.hanja[0];
    const hanJi = pillar.hanja[1];

    let ganSip = '';
    let jiSip = '';
    if (sipsungObj && sipsungObj[key]) {
      ganSip = sipsungObj[key].gan;
      jiSip = sipsungObj[key].ji;
    }

    try {
      const ganElement = getHeavenlyStemElement(korGan as any);
      const jiElement = getEarthlyBranchElement(korJi as any);

      return {
        label,
        gan: hanGan,
        ji: hanJi,
        kor: pillar.korean,
        ganStyle: getOhengColor(ganElement),
        jiStyle: getOhengColor(jiElement),
        ganSip,
        jiSip
      };
    } catch (e) {
      return { label, gan: hanGan, ji: hanJi, kor: pillar.korean, ganStyle: getOhengColor(null), jiStyle: getOhengColor(null), ganSip, jiSip };
    }
  };

  const pillars = [
    getPillarData('hour', '시주(時)'),
    getPillarData('day', '일주(日)'),
    getPillarData('month', '월주(月)'),
    getPillarData('year', '년주(年)'),
  ];

  return (
    <Card className={cn("p-4 sm:p-6 bg-slate-50/50 border-border rounded-xl shadow-saju-sm", className)}>
      <h4 className="text-body-sm font-semibold text-muted-foreground mb-4 font-display">
        사주 원국 <span className="text-caption font-normal ml-1">(四柱八字)</span>
      </h4>
      <div className="flex justify-between sm:justify-center gap-3 md:gap-6">
        {pillars.map((pillar, i) => (
          <div key={i} className="flex flex-col items-center flex-1 max-w-[80px]">
            <span className="text-caption sm:text-body-sm text-text-tertiary mb-3 font-medium">{pillar.label}</span>
            <div className="flex flex-col gap-1 w-full relative">
              
              {/* 천간 십성 */}
              {pillar.ganSip && (
                <div className="text-center text-[10px] sm:text-xs text-text-tertiary font-medium h-4">
                  <span className={pillar.ganSip === '본원' ? 'text-primary font-bold' : ''}>{pillar.ganSip}</span>
                </div>
              )}
              
              {/* 천간 (Gan) */}
              <div 
                className={cn(
                  "aspect-square flex flex-col items-center justify-center rounded-lg shadow-saju-xs border sm:py-2",
                  pillar.ganStyle.bg, pillar.ganStyle.border
                )}
              >
                <span className={cn("text-heading-xl sm:text-2xl font-display font-medium leading-none drop-shadow-sm", pillar.ganStyle.text)}>
                  {pillar.gan}
                </span>
                <span className="text-[10px] mt-1 text-white/90 font-medium opacity-80 mix-blend-overlay">
                  {pillar.kor[0]}
                </span>
              </div>
              
              {/* 지지 (Ji) */}
              <div 
                className={cn(
                  "aspect-square flex flex-col items-center justify-center rounded-lg shadow-saju-xs border sm:py-2 mt-1",
                  pillar.jiStyle.bg, pillar.jiStyle.border
                )}
              >
                <span className={cn("text-heading-xl sm:text-2xl font-display font-medium leading-none drop-shadow-sm", pillar.jiStyle.text)}>
                  {pillar.ji}
                </span>
                <span className="text-[10px] mt-1 text-white/90 font-medium opacity-80 mix-blend-overlay">
                  {pillar.kor[1]}
                </span>
              </div>
              
               {/* 지지 십성 */}
               {pillar.jiSip && (
                <div className="text-center text-[10px] sm:text-xs text-text-tertiary font-medium h-4 mt-0.5">
                  {pillar.jiSip}
                </div>
              )}
              
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

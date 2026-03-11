import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getHeavenlyStemElement } from 'manseryeok';
import { getOhengColor } from '@/lib/ohengColors';
import { cn } from '@/lib/utils';
import { Sparkles, Sun, Moon, Leaf, Flame, Mountain, Activity, Droplets } from 'lucide-react';

interface SajuHeroSectionProps {
  hanjaObj: any;
  yongsinInfo?: { strength: string; yongsin: string; explanation: string };
  className?: string;
}

const OHENG_ICONS: Record<string, React.ReactNode> = {
  '목': <Leaf className="w-5 h-5" />,
  '화': <Flame className="w-5 h-5" />,
  '토': <Mountain className="w-5 h-5" />,
  '금': <Activity className="w-5 h-5" />,
  '수': <Droplets className="w-5 h-5" />,
};

const OHENG_KEYWORDS: Record<string, string[]> = {
  '목': ['성장', '추진력', '어질 인(仁)'],
  '화': ['열정', '명예', '예도 예(禮)'],
  '토': '포용 단단함 믿을 신(信)'.split(' '),
  '금': '결단 원칙 옳을 의(義)'.split(' '),
  '수': '지혜 유연함 지혜 지(智)'.split(' '),
};

export function SajuHeroSection({ hanjaObj, yongsinInfo, className }: SajuHeroSectionProps) {
  if (!hanjaObj || !hanjaObj.day) return null;

  const dayKorGan = hanjaObj.day.korean[0];
  const dayHanGan = hanjaObj.day.hanja[0];
  
  let oheng: any = null;
  let style: any = getOhengColor(null);
  let keywords: string[] = [];
  
  try {
    oheng = getHeavenlyStemElement(dayKorGan as any);
    style = getOhengColor(oheng);
    keywords = OHENG_KEYWORDS[oheng] || [];
  } catch (e) {
    // ignore
  }

  return (
    <Card className={cn("overflow-hidden rounded-xl border-border shadow-saju-sm", className)}>
      <div className={cn("p-6 md:p-8 flex flex-col items-center justify-center text-center relative", style.gradient)}>
        {/* 장식용 배경 요소 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none mix-blend-overlay">
          <div className={cn("absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl", style.bg)} />
          <div className={cn("absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl", style.bg)} />
        </div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/60 backdrop-blur-md rounded-full text-caption font-medium mb-4 shadow-sm pb-1.5 border border-white/50">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-slate-700">고객님의 일간(나를 상징하는 기운)</span>
          </div>
          
          <div className={cn("w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center shadow-lg mb-4 border-2 outline outline-4 outline-white/40", style.bg, style.border)}>
            <span className={cn("text-4xl md:text-5xl font-display font-bold text-white drop-shadow-md", oheng === '금' || oheng === '수' ? 'text-white' : '')}>
              {dayHanGan}
            </span>
          </div>
          
          <h3 className="text-heading-lg font-bold mb-2 flex items-center gap-2">
            <span className={style.text}>{oheng && OHENG_ICONS[oheng]}</span>
            <span>{dayKorGan} ({oheng})</span>
          </h3>
          
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 cursor-default">
            {keywords.map((kw, i) => (
              <span key={i} className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-body-sm font-medium text-text-secondary border border-black/5 hover:bg-white transition-colors">
                #{kw}
              </span>
            ))}
          </div>

          {yongsinInfo && (
            <div className="mt-5 flex items-center justify-center gap-3 sm:gap-4 text-body-sm font-medium bg-white/60 backdrop-blur-md rounded-full px-5 py-2 border border-white/40 shadow-sm">
              <span className="text-text-secondary">강약: <strong className={cn(yongsinInfo.strength.includes('신강') ? 'text-rose-600' : 'text-blue-600')}>{yongsinInfo.strength}</strong></span>
              <span className="w-1 h-1 rounded-full bg-slate-400/50" />
              <span className="text-text-secondary">참고 용신: <strong className="text-primary">{yongsinInfo.yongsin}</strong></span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

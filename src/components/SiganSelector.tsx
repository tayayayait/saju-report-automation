import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

const TWELVE_SIGAN = [
  { hanja: '子', name: '자시', range: '23:30~01:29', defaultTime: '00:30', isNight: true },
  { hanja: '丑', name: '축시', range: '01:30~03:29', defaultTime: '02:30', isNight: true },
  { hanja: '寅', name: '인시', range: '03:30~05:29', defaultTime: '04:30', isNight: true },
  { hanja: '卯', name: '묘시', range: '05:30~07:29', defaultTime: '06:30', isNight: false },
  { hanja: '辰', name: '진시', range: '07:30~09:29', defaultTime: '08:30', isNight: false },
  { hanja: '巳', name: '사시', range: '09:30~11:29', defaultTime: '10:30', isNight: false },
  { hanja: '午', name: '오시', range: '11:30~13:29', defaultTime: '12:30', isNight: false },
  { hanja: '未', name: '미시', range: '13:30~15:29', defaultTime: '14:30', isNight: false },
  { hanja: '申', name: '신시', range: '15:30~17:29', defaultTime: '16:30', isNight: false },
  { hanja: '酉', name: '유시', range: '17:30~19:29', defaultTime: '18:30', isNight: false },
  { hanja: '戌', name: '술시', range: '19:30~21:29', defaultTime: '20:30', isNight: true },
  { hanja: '亥', name: '해시', range: '21:30~23:29', defaultTime: '22:30', isNight: true },
];

interface SiganSelectorProps {
  value: string;
  onChange: (time: string) => void;
  className?: string;
}

export function SiganSelector({ value, onChange, className }: SiganSelectorProps) {
  // 사용자가 시간을 변경했을 때, 해당 시간이 어떤 시진에 속하는지 파악
  const getSelectedSiganHanja = () => {
    if (!value) return null;
    const [hours, minutes] = value.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    
    // 23:30 (1410) ~ 01:29 (89) = 자시
    if (totalMinutes >= 1410 || totalMinutes <= 89) return '子';
    // 축시: 01:30 (90) ~ 03:29 (209) ...
    for (let i = 1; i < 12; i++) {
        const startMin = i * 120 - 30; // 01:30, 03:30 ...
        const endMin = startMin + 119;
        if (totalMinutes >= startMin && totalMinutes <= endMin) {
            return TWELVE_SIGAN[i].hanja;
        }
    }
    return null;
  };

  const selectedHanja = getSelectedSiganHanja();

  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5", className)}>
      {TWELVE_SIGAN.map((sigan) => {
        const isSelected = selectedHanja === sigan.hanja;
        return (
          <Button
            key={sigan.hanja}
            type="button"
            variant={isSelected ? 'default' : 'outline'}
            className={cn(
              "h-auto py-3 px-1.5 flex flex-col items-center justify-center gap-1.5 rounded-radius-md transition-all overflow-hidden",
              isSelected 
                ? "bg-primary text-primary-foreground shadow-saju-sm ring-2 ring-primary/20 ring-offset-1" 
                : "bg-surface hover:bg-surface-hover hover:border-border-strong text-foreground border-border"
            )}
            onClick={() => onChange(sigan.defaultTime)}
          >
            <div className="flex items-center justify-center gap-1 mb-0.5 whitespace-nowrap">
              {sigan.isNight ? <Moon className="w-3 h-3 min-w-[12px]" /> : <Sun className="w-3 h-3 min-w-[12px]" />}
              <span className={cn("text-[11px] sm:text-xs tracking-tighter", isSelected ? "text-primary-foreground/90" : "text-muted-foreground/80")}>
                {sigan.range}
              </span>
            </div>
            <div className="flex items-baseline justify-center gap-1.5 whitespace-nowrap">
              <span className="text-body-md sm:text-body-lg font-bold font-display">{sigan.hanja}</span>
              <span className={cn("text-xs sm:text-body-sm font-medium", isSelected ? "text-primary-foreground/90" : "text-foreground")}>
                {sigan.name}
              </span>
            </div>
          </Button>
        );
      })}
    </div>
  );
}

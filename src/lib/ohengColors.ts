import { FiveElement, YinYang } from 'manseryeok';

export interface OhengColorToken {
  bg: string;
  text: string;
  border: string;
  gradient: string;
}

// 오행에 따른 색상 매핑 (Tailwind CSS 토큰)
export const OHENG_COLORS: Record<FiveElement, OhengColorToken> = {
  '목': {
    bg: 'bg-emerald-500',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    gradient: 'from-emerald-50 to-emerald-100',
  },
  '화': {
    bg: 'bg-rose-500',
    text: 'text-rose-700',
    border: 'border-rose-200',
    gradient: 'from-rose-50 to-rose-100',
  },
  '토': {
    bg: 'bg-amber-500',
    text: 'text-amber-700',
    border: 'border-amber-200',
    gradient: 'from-amber-50 to-amber-100',
  },
  '금': {
    bg: 'bg-slate-300',      // 연한 회색/흰색 톤
    text: 'text-slate-700',
    border: 'border-slate-300',
    gradient: 'from-slate-50 to-slate-200',
  },
  '수': {
    bg: 'bg-zinc-800',       // 검은색 톤
    text: 'text-zinc-900',
    border: 'border-zinc-300',
    gradient: 'from-zinc-100 to-zinc-300',
  }
};

export function getOhengColor(element: FiveElement | undefined | null): OhengColorToken {
  if (!element) {
    return {
      bg: 'bg-slate-100',
      text: 'text-slate-500',
      border: 'border-slate-200',
      gradient: 'from-slate-50 to-slate-100',
    };
  }
  return OHENG_COLORS[element] || getOhengColor(null);
}

// 천간 상생상극 테이블 (0: 비견/겁재, 1: 식신/상관, 2: 편재/정재, 3: 편관/정관, 4: 편인/정인)
// 목(0) 화(1) 토(2) 금(3) 수(4)
const OHENG_INDEX: Record<FiveElement, number> = {
  '목': 0, '화': 1, '토': 2, '금': 3, '수': 4
};

export function calculateSipseong(
  dayElement: FiveElement,
  dayYinYang: YinYang,
  targetElement: FiveElement,
  targetYinYang: YinYang
): string {
  // 본원 (일간 자신)
  if (!dayElement || !targetElement) return '-';

  const dayIdx = OHENG_INDEX[dayElement];
  const targetIdx = OHENG_INDEX[targetElement];
  
  if (dayIdx === undefined || targetIdx === undefined) return '-';

  const diff = (targetIdx - dayIdx + 5) % 5;
  const isSameYinYang = dayYinYang === targetYinYang;

  switch (diff) {
    case 0: // 비아자 (나와 같음)
      return isSameYinYang ? '비견' : '겁재';
    case 1: // 아생자 (내가 생함)
      return isSameYinYang ? '식신' : '상관';
    case 2: // 아극자 (내가 극함)
      return isSameYinYang ? '편재' : '정재';
    case 3: // 극아자 (나를 극함)
      return isSameYinYang ? '편관' : '정관';
    case 4: // 생아자 (나를 생함)
      return isSameYinYang ? '편인' : '정인';
    default:
      return '-';
  }
}

import { getHeavenlyStemElement, getEarthlyBranchElement } from 'manseryeok';

// 천간/지지 한글 정의
const GANS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const JIS = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];

// 각 천간/지지의 음양 (양: true, 음: false)
const GAN_YIN_YANG: Record<string, boolean> = {
  '갑': true, '을': false, '병': true, '정': false, '무': true,
  '기': false, '경': true, '신': false, '임': true, '계': false
};

// 지지의 음양 (자,인,진,오,신,술 = 양 / 축,묘,사,미,유,해 = 음) - 명리학 체용 기준 적용
const JI_YIN_YANG: Record<string, boolean> = {
  '자': false, // 체는 양이나 용은 음 (오행 수)
  '축': false,
  '인': true,
  '묘': false,
  '진': true,
  '사': true,  // 체는 음이나 용은 양 (오행 화)
  '오': false, // 체는 양이나 용은 음 (오행 화)
  '미': false,
  '신': true,
  '유': false,
  '술': true,
  '해': true   // 체는 음이나 용은 양 (오행 수)
};

// 오행 생극 관계 매핑 (0:목, 1:화, 2:토, 3:금, 4:수)
const OHENG_MAP: Record<string, number> = { '목': 0, '화': 1, '토': 2, '금': 3, '수': 4 };

/**
 * 일간과 대상 간지의 십성 관계를 반환합니다.
 * @param dayStem 일간 (본원), 예: '경'
 * @param targetChar 대상 글자 (천간 또는 지지), 예: '묘'
 * @param isJi 대상 글자가 지지인지 여부
 * @returns 십성 문자열 (예: '정재')
 */
export function getSipsung(dayStem: string, targetChar: string, isJi: boolean = false): string {
  if (dayStem === targetChar && !isJi) return '본원';
  if (!GANS.includes(dayStem)) return '-';
  if (!isJi && !GANS.includes(targetChar)) return '-';
  if (isJi && !JIS.includes(targetChar)) return '-';

  try {
    const dayOheng = getHeavenlyStemElement(dayStem as any);
    const targetOheng = isJi ? getEarthlyBranchElement(targetChar as any) : getHeavenlyStemElement(targetChar as any);
    
    const dayYinYang = GAN_YIN_YANG[dayStem];
    const targetYinYang = isJi ? JI_YIN_YANG[targetChar] : GAN_YIN_YANG[targetChar];
    
    const isSameYinYang = dayYinYang === targetYinYang;
    
    const dayNum = OHENG_MAP[dayOheng];
    const targetNum = OHENG_MAP[targetOheng];
    
    // 생극 관계 계산 (차이 값: 0=비화, 1=생함, 2=극함, 3=극받음, 4=생받음)
    const diff = (targetNum - dayNum + 5) % 5;
    
    switch (diff) {
      case 0: // 비견/겁재 (같은 오행)
        return isSameYinYang ? '비견' : '겁재';
      case 1: // 식신/상관 (내가 생함)
        return isSameYinYang ? '식신' : '상관';
      case 2: // 편재/정재 (내가 극함)
        return isSameYinYang ? '편재' : '정재';
      case 3: // 편관/정관 (나를 극함)
        return isSameYinYang ? '편관' : '정관';
      case 4: // 편인/정인 (나를 생함)
        return isSameYinYang ? '편인' : '정인';
      default:
        return '-';
    }
  } catch(e) {
    return '-';
  }
}

interface SipsungResult {
  hour: { gan: string; ji: string };
  day: { gan: string; ji: string };
  month: { gan: string; ji: string };
  year: { gan: string; ji: string };
}

/**
 * 사주 원국 전체의 십성을 계산하여 반환합니다.
 */
export function getAllSipsung(hanjaObj: any): SipsungResult {
  const result: SipsungResult = {
    hour: { gan: '-', ji: '-' },
    day: { gan: '본원', ji: '-' },
    month: { gan: '-', ji: '-' },
    year: { gan: '-', ji: '-' }
  };

  if (!hanjaObj || !hanjaObj.day || !hanjaObj.day.korean) return result;

  const dayStem = hanjaObj.day.korean[0]; // 일간 (예: '경')

  const mapPillar = (key: 'hour' | 'day' | 'month' | 'year') => {
    const pillarKor = hanjaObj[key]?.korean;
    if (pillarKor && pillarKor.length === 2) {
      result[key].gan = key === 'day' ? '본원' : getSipsung(dayStem, pillarKor[0], false);
      result[key].ji = getSipsung(dayStem, pillarKor[1], true);
    }
  };

  mapPillar('year');
  mapPillar('month');
  mapPillar('day');
  mapPillar('hour');

  return result;
}

import { calculateFourPillars, FourPillars, getHeavenlyStemElement, getEarthlyBranchElement, FiveElement, YinYang } from 'manseryeok';
import { calculateSipseong } from '@/lib/ohengColors';

export interface IljinDay {
  date: string;       // YYYY-MM-DD
  day: number;        // DD
  saju: FourPillars;  // 해당 날짜의 일진 사주
  isLucky: boolean | null; // 길(true)/흉(false)/보통(null)
  sipseong?: string;  // 내담자 일간 기준 오늘의 십성
  notes: string[];    // 일진 해석 코멘트
}

export async function generateMonthlyIljin(
  userDayGan: string, 
  userDayElement: FiveElement, 
  userDayYinYang: YinYang,
  targetYear: number, 
  targetMonth: number
): Promise<IljinDay[]> {
  const daysInMonth = new Date(targetYear, targetMonth, 0).getDate();
  const results: IljinDay[] = [];

  for (let i = 1; i <= daysInMonth; i++) {
    // 매일의 사주 원국 계산 (시간은 정오 기준)
    const iljinSaju = calculateFourPillars({
      year: targetYear,
      month: targetMonth,
      day: i,
      hour: 12,
      minute: 0,
    });

    const dayKorean = iljinSaju.toHanjaObject().day.korean; // 예: "갑자"
    const todayGan = dayKorean[0];
    const todayJi = dayKorean[1];
    
    // 오늘의 천간 오행 추출
    let todayElement: FiveElement | null = null;
    const todayYinYang: YinYang | null = null;
    try {
      todayElement = getHeavenlyStemElement(todayGan as any);
      // getHeavenlyStemYinYang 등도 필요하나 일단 생략하거나 간단히 매핑
    } catch(e) {}

    let sipseong = '-';
    // 십성 계산 (userDayElement가 있고 todayElement가 있으면)
    if (todayElement) {
       // 임시 YinYang 하드코딩 (혹은 manseryeok 지원 시 교체)
       sipseong = calculateSipseong(userDayElement, userDayYinYang, todayElement, '양');
    }

    const notes: string[] = [];
    let isLucky: boolean | null = null;

    // 길운/흉운(단순 로직)
    if (['정재', '정관', '정인', '식신'].includes(sipseong)) {
       isLucky = true;
       notes.push(`안정적이고 순탄한 흐름 (${sipseong}의 기운)`);
    } else if (['편관', '상관', '겁재', '편인'].includes(sipseong)) {
       isLucky = false;
       notes.push(`주의와 조심이 필요한 날 (${sipseong}의 기운)`);
    } else {
       notes.push(`무난한 하루`);
    }

    results.push({
      date: `${targetYear}-${String(targetMonth).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
      day: i,
      saju: iljinSaju,
      isLucky,
      sipseong,
      notes
    });
  }

  return results;
}

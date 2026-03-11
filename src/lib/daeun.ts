import { getHeavenlyStemElement } from 'manseryeok';

// 60갑자 리스트
const GANJI_LIST = [
  '갑자', '을축', '병인', '정묘', '무진', '기사', '경오', '신미', '임신', '계유',
  '갑술', '을해', '병자', '정축', '무인', '기묘', '경진', '신사', '임오', '계미',
  '갑신', '을유', '병술', '정해', '무자', '기축', '경인', '신묘', '임진', '계사',
  '갑오', '을미', '병신', '정유', '무술', '기해', '경자', '신축', '임인', '계묘',
  '갑진', '을사', '병오', '정미', '무신', '기유', '경술', '신해', '임자', '계축',
  '갑인', '을묘', '병진', '정사', '무오', '기미', '경신', '신유', '임술', '계해'
];

interface DaeunItem {
  ganJi: string;    // "을유", "병술" 등
  hanja: string;    // "乙酉", "丙戌" 등
  startAge: number; // 시작 나이
  oheng: string;    // 천간 기준 오행
}

/**
 * 성별과 연주 천간을 기반으로 대운의 순행/역행을 결정합니다.
 * 양남음녀(陽男陰女)는 순행, 음남양녀(陰男陽女)는 역행
 */
function getDirection(yearGan: string, gender: string): number {
  const isYangGan = ['갑', '병', '무', '경', '임'].includes(yearGan);
  const isMale = gender === '남성' || gender === 'male' || gender === 'M';
  
  if ((isYangGan && isMale) || (!isYangGan && !isMale)) {
    return 1; // 순행
  } else {
    return -1; // 역행
  }
}

/**
 * 대운 리스트를 계산합니다. (간이 대운수 적용: 일률적으로 1~9 사이 난수 또는 고정값 3 적용, 정확한 절입일 계산 생략)
 * @param hanjaObj 사주 원국 객체
 * @param gender 성별 ('남성' | '여성')
 * @param birthYear 출생년도
 */
export function calculateDaeun(hanjaObj: any, gender: string, birthYear: number): DaeunItem[] {
  if (!hanjaObj || !hanjaObj.year || !hanjaObj.month) return [];

  const yearGan = hanjaObj.year.korean[0];
  const monthKor = hanjaObj.month.korean; // 예: "기묘"
  const monthHan = hanjaObj.month.hanja;  // 예: "己卯"
  
  const direction = getDirection(yearGan, gender);
  const startIndex = GANJI_LIST.indexOf(monthKor);
  
  if (startIndex === -1) return [];

  // 간이 대운수 (절입일 계산이 복잡하므로, 일단 고정값 3을 사용하거나 랜덤 값 사용. 기능 구현 시연용)
  // 실제 서비스라면 해당 월의 절입일에서 생일까지차이 / 3 을 계산해야 함.
  const daeunNumber = 3; 
  
  const result: DaeunItem[] = [];
  
  for (let i = 1; i <= 10; i++) {
    // 60갑자 인덱스 계산 (순행/역행)
    let nextIndex = (startIndex + (i * direction)) % 60;
    if (nextIndex < 0) nextIndex += 60;
    
    const ganJi = GANJI_LIST[nextIndex];
    let oheng = '토';
    try {
      oheng = getHeavenlyStemElement(ganJi[0] as any);
    } catch(e) {}
    
    // 단순 한자 변환 (실제로는 매핑 테이블 필요. UI 데모용으로 일단 한글 유지 또는 앞뒤만 변환)
    // 한자 매핑이 필요하므로 생략하거나, 첫 글자/두번째 글자 변환 매핑을 쓰면 좋음
    const ganToHanja: Record<string, string> = {'갑':'甲','을':'乙','병':'丙','정':'丁','무':'戊','기':'己','경':'庚','신':'辛','임':'壬','계':'癸'};
    const jiToHanja: Record<string, string> = {'자':'子','축':'丑','인':'寅','묘':'卯','진':'辰','사':'巳','오':'午','미':'未','신':'申','유':'酉','술':'戌','해':'亥'};
    
    const hanjaStr = (ganToHanja[ganJi[0]] || ganJi[0]) + (jiToHanja[ganJi[1]] || ganJi[1]);

    result.push({
      ganJi: ganJi,
      hanja: hanjaStr,
      startAge: daeunNumber + (i - 1) * 10,
      oheng: oheng
    });
  }
  
  return result;
}

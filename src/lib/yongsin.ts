import { getHeavenlyStemElement, getEarthlyBranchElement } from 'manseryeok';

// 간이 용신 추정 로직 (정밀한 명리학 추론을 간략화)
// 1. 일간과 월지의 오행을 확인 (월지는 계절의 영향을 줌)
// 2. 전체 8글자 중 일간을 생조(비겁/인성)하는 기운의 갯수 산정
// 3. 신강(강함) / 신약(약함) 판별 후 필요한 기운(용신) 리턴

export function estimateYongsin(hanjaObj: any): { strength: string; yongsin: string; explanation: string } {
  if (!hanjaObj || !hanjaObj.day || !hanjaObj.month) {
    return { strength: '판단불가', yongsin: '판단불가', explanation: '정보가 부족합니다.' };
  }

  const dayGan = hanjaObj.day.korean[0];
  const monthJi = hanjaObj.month.korean[1];
  
  let dayElement = '토';
  let monthElement = '토';
  
  try {
    dayElement = getHeavenlyStemElement(dayGan as any);
    monthElement = getEarthlyBranchElement(monthJi as any);
  } catch(e) {}

  // 1. 나를 생하는 오행 (인성), 나와 같은 오행 (비겁) 구하기
  const OHENG_ORDER = ['목', '화', '토', '금', '수']; // 생하는 순서
  const dayIndex = OHENG_ORDER.indexOf(dayElement);
  const inOheng = OHENG_ORDER[(dayIndex + 4) % 5]; // 나를 생하는 오행

  // 2. 전체 오행 카운트 산정
  const counts: Record<string, number> = { '목': 0, '화': 0, '토': 0, '금': 0, '수': 0 };
  ['year', 'month', 'day', 'hour'].forEach(key => {
    const pillar = hanjaObj[key];
    if (!pillar) return;
    try {
      const ganEl = getHeavenlyStemElement(pillar.korean[0] as any);
      const jiEl = getEarthlyBranchElement(pillar.korean[1] as any);
      if (counts[ganEl] !== undefined) counts[ganEl]++;
      if (counts[jiEl] !== undefined) counts[jiEl]++;
    } catch(e) {}
  });

  // 내 편(비겁 + 인성)의 갯수
  const mySideCount = counts[dayElement] + counts[inOheng];
  // 남 편(식상 + 재성 + 관성)의 갯수
  const otherSideCount = 8 - mySideCount;

  // 월령(월지)을 얻었는지 (월지가 인성이나 비겁인지)
  const isDeukRyeong = monthElement === dayElement || monthElement === inOheng;

  let isStrong = false;
  if (mySideCount >= 5) isStrong = true; // 무조건 갯수가 앞서면 강함
  else if (mySideCount === 4 && isDeukRyeong) isStrong = true; // 갯수 동률 + 월지 차지하면 강함
  else if (mySideCount === 3 && isDeukRyeong && monthElement === inOheng) isStrong = true; // 월지가 강한 인성이면 간신히 강함
  
  const strength = isStrong ? '신강(身強)' : '신약(身弱)';
  let yongsin = '';
  let explanation = '';

  if (isStrong) {
    // 내가 강하면 내 힘을 빼주는 오행이 용신 (식상, 관성, 재성 중 월지에 없거나 개수가 적당한 것)
    // 단순화하여 관성 혹은 식상을 추천
    const gwanOheng = OHENG_ORDER[(dayIndex + 2) % 5]; // 나를 극하는 관성
    const sikOheng = OHENG_ORDER[(dayIndex + 1) % 5]; // 내가 생하는 식상
    yongsin = `${gwanOheng}(관성) 또는 ${sikOheng}(식상)`;
    explanation = '일간의 기운이 강하므로 기운을 설기(소모)시키거나 제어하는 오행이 유리합니다.';
  } else {
    // 내가 약하면 나를 도와주는 오행이 용신 (인성, 비겁)
    yongsin = `${inOheng}(인성) 또는 ${dayElement}(비견/겁재)`;
    explanation = '일간의 기운이 다소 약하므로 일간을 직접 돕거나 생해주는 오행이 필요합니다.';
  }

  return { strength, yongsin, explanation };
}

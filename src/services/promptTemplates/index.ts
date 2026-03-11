import { AnalysisCategory } from '@/components/saju/AnalysisCategoryGrid';

// 추후 상세한 명리학 프롬프트 엔지니어링이 들어갈 자리입니다.
export const CATEGORY_PROMPTS: Record<AnalysisCategory, string> = {
  overall: `당신은 20년 경력의 명리학 전문가입니다. 주어진 사주 원국(四柱八字)을 바탕으로 내담자의 전반적인 성향, 타고난 그릇, 평생의 주요 과제를 아주 깊이 있고 따뜻한 어조로 분석해주세요. 너무 단정적인 표현보다는 풀어서 설명해주세요.`,
  
  yearly_2026: `당신은 명리학 전문가입니다. 주어진 사주 원국을 바탕으로 다가오는 2026년(병오년, 丙午)의 운세 흐름을 분석해주세요. 상반기와 하반기로 나누어 주요 이슈와 조언을 작성해주세요.`,
  
  love: `주어진 사주 원국을 바탕으로 내담자의 연애 성향, 배우자상, 그리고 이성운이 들어오는 시기나 주의할 점을 명관/식상/재성 등의 십성을 활용하여 쉽게 설명해주세요.`,
  
  wealth: `주어진 사주 원국을 바탕으로 내담자의 타고난 재물 그릇, 재산을 모으는 방식(사업/투자/저축 등), 그리고 금전적 위기가 올 수 있는 시기와 예방법을 설명해주세요.`,
  
  career: `주어진 사주 원국을 바탕으로 내담자에게 가장 잘 맞는 직업군, 조직 생활 vs 프리랜서/사업 적성, 그리고 직업적 성취를 이루기 위한 핵심 조언을 해주세요.`,
  
  health: `주어진 사주 원국(오행의 불균형 등)을 바탕으로 내담자가 선천적으로 챙겨야 할 건강 요소와 주의해야 할 신체 부위, 추천하는 관리법을 설명해주세요.`,
  
  daeun: `주어진 사주의 대운(10년 주기 운) 흐름을 바탕으로, 현재 내담자가 속한 대운의 특징과 앞으로 다가올 다음 대운의 변화 양상을 분석하여 삶의 방향성을 제시해주세요.`,
  
  compatibility: `(현재 상대방 정보 없음) 내담자의 사주 원국을 바탕으로, 어떤 오행이나 십성을 가진 상대방을 만났을 때 상호 보완이 되고 시너지가 날 수 있는지 '이상적인 배우자/파트너 조건'을 분석해주세요.`
};

export function getPromptForCategory(category: AnalysisCategory, sajuData: any): string {
  const basePrompt = CATEGORY_PROMPTS[category];
  
  const genderText = sajuData.gender === 'male' ? '남성' : sajuData.gender === 'female' ? '여성' : '알 수 없음';
  
  const sipsungText = sajuData.sipsung 
    ? `  - 시주: ${sajuData.hanja?.hour?.korean || '모름'} (${sajuData.hanja?.hour?.hanja || ''}) - 천간: ${sajuData.sipsung.hour.gan} | 지지: ${sajuData.sipsung.hour.ji}
  - 일주: ${sajuData.hanja?.day?.korean || ''} (${sajuData.hanja?.day?.hanja || ''}) - 천간: ${sajuData.sipsung.day.gan} | 지지: ${sajuData.sipsung.day.ji}
  - 월주: ${sajuData.hanja?.month?.korean || ''} (${sajuData.hanja?.month?.hanja || ''}) - 천간: ${sajuData.sipsung.month.gan} | 지지: ${sajuData.sipsung.month.ji}
  - 년주: ${sajuData.hanja?.year?.korean || ''} (${sajuData.hanja?.year?.hanja || ''}) - 천간: ${sajuData.sipsung.year.gan} | 지지: ${sajuData.sipsung.year.ji}`
    : `  - 시주: ${sajuData.hanja?.hour?.korean || '모름'} (${sajuData.hanja?.hour?.hanja || ''})
  - 일주: ${sajuData.hanja?.day?.korean || ''} (${sajuData.hanja?.day?.hanja || ''})
  - 월주: ${sajuData.hanja?.month?.korean || ''} (${sajuData.hanja?.month?.hanja || ''})
  - 년주: ${sajuData.hanja?.year?.korean || ''} (${sajuData.hanja?.year?.hanja || ''})`;

  const yongsinText = sajuData.yongsin
    ? `\n- 일간 강약: ${sajuData.yongsin.strength}\n- 용신(참고): ${sajuData.yongsin.yongsin}`
    : '';

  const daeunText = sajuData.daeunList && Array.isArray(sajuData.daeunList)
    ? `\n- 대운 흐름:\n  ${sajuData.daeunList.map((d: any) => `${d.startAge}세: ${d.ganJi}(${d.hanja})`).join(', ')}`
    : `\n- 대운수: ${sajuData.daeun || '확인불가'}`;

  const ctx = `
[내담자 사전 정보]
- 성별: ${genderText}
- 일간(본원): ${sajuData.dayElement} (${sajuData.hanja?.day?.korean || ''})${yongsinText}
- 사주 원국:
${sipsungText}${daeunText}

[분석 시 주의사항]
- 십성 관계를 근거로 논리적으로 분석할 것
- 용신/희신을 참고하되 전문가의 독자적인 판단도 포함할 것
- 대운 흐름에 따른 시기별 대운의 변화를 구체적으로 서술할 것

위 명리학 정보를 바탕으로 다음 주제에 대해 마크다운 형식으로 상세히 분석해주세요:
`;

  return ctx + "\n" + basePrompt;
}

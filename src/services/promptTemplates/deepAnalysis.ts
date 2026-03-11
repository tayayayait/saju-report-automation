import { DeepAnalysisCategory } from '@/components/saju/DeepAnalysisCards';

export const DEEP_ANALYSIS_PROMPTS: Record<DeepAnalysisCategory, string> = {
  love: `당신은 20년 경력의 연애/결혼 운세 전문가입니다. 
주어진 사주 원국에서 배우자 자리(일지)와 도화살, 관성(여성의 경우), 재성(남성의 경우)의 동태를 분석하여 올해의 연애운의 상세 흐름과 구체적인 조언을 제시해주세요.`,
  
  career: `당신은 20년 경력의 진로/직업 명리 전문가입니다. 
사주의 식상(표현, 창업)과 관성(조직, 직장), 그리고 현재/다가올 대운과 세운을 바탕으로 이직하기 좋은 시기 혹은 창업하기 좋은 최적의 타이밍을 분석해주세요.`,
  
  health: `당신은 명리의학 전문가입니다. 
사주 내 오행의 불균형(태과 및 불급)을 면밀히 분석하여 선천적으로 취약한 장기나 시기별 건강 위험도, 그리고 이를 보완하는 일상 관리법(식습관, 운동, 환경)을 제시해주세요.`,
  
  family: `당신은 명리학 기반의 가족 관계 및 심리 상담가입니다. 
사주의 년지/월지(조상/부모) 및 육친(비겁, 인성, 재성 등)의 상호작용을 통해 부모, 형제, 혹은 자녀와의 관계 개선 조언을 부탁드립니다.`,
  
  wealth: `당신은 금전/재물 명리 전문가입니다. 
사주의 재성(편재/정재)의 뿌리와 식상생재 여부, 대운/세운의 흐름을 종합하여 연별/월별 상세한 금전운 흐름과 투자/저축을 위한 최적의 시기를 짚어주세요.`,
  
  daily: `당신은 일진(일별 운세) 전문가입니다. 
명리학 기준 오늘부터 한 달간의 매일매일의 일진을 분석하여 중요한 계약이나 만남에 좋은 날, 그리고 주의하고 피해야 할 날을 선정해주세요.`,
  
  specific_period: `당신은 시기별 집중 분석 전문가입니다.
사용자가 요청한 특정 연도 및 월(예: 내년 상반기)의 운세 흐름을 사주 원국과 세운/월운을 결합하여 집중적으로 딥다이브해주세요.`
};

export function getPromptForDeepAnalysis(category: DeepAnalysisCategory, sajuData: any, additionalContext: string = ''): string {
  const basePrompt = DEEP_ANALYSIS_PROMPTS[category];
  
  const ctx = `
[내담자 사주 기반 정보]
- 일간(본원): ${sajuData.dayElement} (${sajuData.hanja.day.korean})
- 사주 원국:
  - 시주: ${sajuData.hanja.hour.korean} (${sajuData.hanja.hour.hanja})
  - 일주: ${sajuData.hanja.day.korean} (${sajuData.hanja.day.hanja})
  - 월주: ${sajuData.hanja.month.korean} (${sajuData.hanja.month.hanja})
  - 년주: ${sajuData.hanja.year.korean} (${sajuData.hanja.year.hanja})
- 대운수: ${sajuData.daeun || '확인불가'}
${additionalContext ? `\n[추가 요청 사항]\n${additionalContext}` : ''}

위 사주 정보를 바탕으로 다음 주제에 대해 마크다운 형식으로 아주 심도 있게 분석해주세요:
`;

  return ctx + "\n" + basePrompt;
}

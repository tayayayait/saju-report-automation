// 합충 지지 매핑 (단순화된 기본 규칙)
const CHUNG_PAIRS: Record<string, string> = {
  '자': '오', '오': '자', '축': '미', '미': '축', '인': '신', '신': '인',
  '묘': '유', '유': '묘', '진': '술', '술': '진', '사': '해', '해': '사'
};

const HAP_PAIRS: Record<string, string[]> = {
  '자': ['축', '신', '진'], '축': ['자', '사', '유'], '인': ['해', '오', '술'],
  '묘': ['술', '해', '미'], '진': ['유', '신', '자'], '사': ['신', '유', '축'],
  '오': ['미', '인', '술'], '미': ['오', '해', '묘'], '신': ['사', '자', '진'],
  '유': ['진', '사', '축'], '술': ['묘', '인', '오'], '해': ['인', '묘', '미']
};

export function analyzeHapChung(hanjaObj: any) {
  if (!hanjaObj || !hanjaObj.year) return [];

  const branches = {
    년: hanjaObj.year.korean[1],
    월: hanjaObj.month.korean[1],
    일: hanjaObj.day.korean[1],
    시: hanjaObj.hour.korean[1]
  };

  const results: { pair: string, type: '충' | '합' | '원진', desc: string }[] = [];
  const checkPair = (p1: string, p2: string, b1: string, b2: string) => {
    if (CHUNG_PAIRS[b1] === b2) {
      results.push({ pair: `${p1}leftrightarrow${p2}`, type: '충', desc: `${b1}${b2}충: 변화와 갈등, 새로운 시작` });
    }
    if (HAP_PAIRS[b1]?.includes(b2)) {
      results.push({ pair: `${p1}↔${p2}`, type: '합', desc: `${b1}${b2}합: 결합과 안정, 협력 관계` });
    }
  };

  checkPair('년', '월', branches.년, branches.월);
  checkPair('월', '일', branches.월, branches.일);
  checkPair('일', '시', branches.일, branches.시);

  return results;
}

export function detectSinsal(hanjaObj: any) {
  if (!hanjaObj || !hanjaObj.year) return [];
  const branches = [hanjaObj.year.korean[1], hanjaObj.month.korean[1], hanjaObj.day.korean[1], hanjaObj.hour.korean[1]];
  
  const sinsalList: { name: string, pillar: string, desc: string }[] = [];
  const pillarNames = ['년지', '월지', '일지', '시지'];

  branches.forEach((branch, idx) => {
    // 도화살 (자, 오, 묘, 유)
    if (['자', '오', '묘', '유'].includes(branch)) {
      sinsalList.push({ name: '도화살', pillar: pillarNames[idx], desc: '매력, 예술성, 대인관계 발달' });
    }
    // 역마살 (인, 신, 사, 해)
    if (['인', '신', '사', '해'].includes(branch)) {
      sinsalList.push({ name: '역마살', pillar: pillarNames[idx], desc: '이동, 활동성, 해외 인연' });
    }
    // 화개살 (진, 술, 축, 미)
    if (['진', '술', '축', '미'].includes(branch)) {
      sinsalList.push({ name: '화개살', pillar: pillarNames[idx], desc: '명예, 고독, 종교적/철학적 성향' });
    }
  });

  return sinsalList;
}

export function calculate12Unseong(dayGan: string, branch: string) {
  // 간단한 매핑 테이블 (실제로는 더 복잡하지만 컴포넌트 표시용으로 단순화)
  const map: Record<string, string> = {
    '갑': '해묘미', '을': '오인술', '병': '인오술', '정': '유사축',
    '무': '인오술', '기': '유사축', '경': '사유축', '신': '자신진',
    '임': '신자진', '계': '묘해미'
  };
  // 임시 반환 로직 (정교한 12운성 라이브러리가 없다면 기본값 표시)
  return '건록'; 
}

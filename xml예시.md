<?xml version='1.0' encoding='utf-8'?>
<uiux_spec format="example" language="ko" source_file="상세서.md" title="사주 명리학 AI 리포트 자동화 시스템 UI/UX 상세 명세">
  <metadata>
    <document_title>사주 명리학 AI 리포트 자동화 시스템 UI/UX 상세 명세</document_title>
    <entry_schema>item, value, usage, rule</entry_schema>
    <conversion_rule>Markdown heading hierarchy and table rows are preserved without omission; Markdown backticks are removed for XML readability.</conversion_rule>
    <section_count>10</section_count>
    <subsection_count>24</subsection_count>
    <source_entry_count>287</source_entry_count>
    <output_file>xml예시.md</output_file>
  </metadata>
  <sections>
    <section title="제품 UX 방향" number="1">
      <entries>
        <entry>
          <item>제품 성격</item>
          <value>내부 운영툴 / PC Web 전용</value>
          <usage>전체 서비스</usage>
          <rule>외부 홍보성 연출보다 입력 정확도, 생성 이력 추적, PDF 발행 안정성을 우선한다.</rule>
        </entry>
        <entry>
          <item>UX 목표</item>
          <value>입력 → 검증 → 생성 → 편집 → 발행 5단계</value>
          <usage>전체 플로우</usage>
          <rule>운영자가 한 케이스를 처음부터 최종 PDF까지 한 화면 체계 안에서 완료하도록 설계한다.</rule>
        </entry>
        <entry>
          <item>시각 톤</item>
          <value>Deep Indigo + Warm Gold + Paper White</value>
          <usage>브랜드 인상</usage>
          <rule>명리학의 전통성은 유지하되, 분석 도구처럼 정돈된 밀도와 신뢰감을 유지한다.</rule>
        </entry>
        <entry>
          <item>조작 원칙</item>
          <value>3클릭 이내 / 2스크롤 이내</value>
          <usage>대시보드, 케이스 상세</usage>
          <rule>자주 쓰는 기능은 사이드바 1단계, 탭 2단계, 액션 버튼 3단계 이내에 둔다.</rule>
        </entry>
        <entry>
          <item>정보 위계</item>
          <value>1차: 상태 / 2차: 본문 / 3차: 보조메타</value>
          <usage>카드, 테이블, 에디터</usage>
          <rule>상태값과 다음 액션을 최상단에 고정하고, 설명성 문구는 보조 위치로 내린다.</rule>
        </entry>
        <entry>
          <item>오류 복구</item>
          <value>인라인 오류 + 상단 배너 + 로그 기록</value>
          <usage>폼, 생성 작업, PDF 발행</usage>
          <rule>오류는 발생 위치 1차 노출, 페이지 상단 요약 2차 노출, 작업 로그 3차 기록으로 중복 확인한다.</rule>
        </entry>
        <entry>
          <item>데이터 신뢰 표시</item>
          <value>상태 배지 24px / 로그 타임라인 14px</value>
          <usage>API 연동, 정규화, LLM 생성</usage>
          <rule>모든 자동 단계는 대기/진행중/완료/검토필요/실패 5상태 중 하나를 반드시 가진다.</rule>
        </entry>
        <entry>
          <item>문서 편집 원칙</item>
          <value>3패널 편집 / 자동저장 15000ms</value>
          <usage>초안 편집 워크스페이스</usage>
          <rule>좌측 구조, 중앙 본문, 우측 속성 패널을 분리하고 저장 여부를 항상 가시화한다.</rule>
        </entry>
        <entry>
          <item>PDF 발행 원칙</item>
          <value>미리보기-템플릿-발행로그 동시 표시</value>
          <usage>PDF 퍼블리싱 화면</usage>
          <rule>발행 전 미리보기, 템플릿 선택, 출력 옵션을 한 화면에서 비교 가능해야 한다.</rule>
        </entry>
      </entries>
    </section>
    <section title="정보 구조 및 화면 구성" number="2">
      <entries>
        <entry>
          <item>로그인</item>
          <value>우측 로그인 카드 420px, 좌측 소개 패널 1fr</value>
          <usage>인증 진입 화면</usage>
          <rule>폐쇄형 시스템임을 명확히 표시하고, 좌측에는 시스템 공지·최근 발행 상태만 노출한다.</rule>
        </entry>
        <entry>
          <item>대시보드</item>
          <value>KPI 카드 4열 / 작업목록 8:4 분할</value>
          <usage>첫 화면</usage>
          <rule>오늘 생성 건수, 검토 필요 건수, 실패 건수, 발행 완료 건수를 1행에 고정한다.</rule>
        </entry>
        <entry>
          <item>고객 등록</item>
          <value>12컬럼 폼 / 섹션 카드 단위</value>
          <usage>고객 기본정보 입력</usage>
          <rule>기본정보 → 출생정보 → 옵션 → 메모 순서로 진행하고 섹션 헤더에 필수 여부를 표시한다.</rule>
        </entry>
        <entry>
          <item>케이스 상세</item>
          <value>상단 요약 바 160px, 하단 탭 콘텐츠</value>
          <usage>개별 고객 작업</usage>
          <rule>고객 식별 정보, 생성 상태, 마지막 수정자, 최종 PDF 버전을 상단 요약 바에 고정한다.</rule>
        </entry>
        <entry>
          <item>AI 초안 생성</item>
          <value>좌측 파라미터 / 중앙 프롬프트 / 우측 결과로그</value>
          <usage>LLM 생성 관리</usage>
          <rule>프롬프트 버전, 모델, 분량(30/100p), 생성 범위를 동시에 확인하고 재실행 이력을 남긴다.</rule>
        </entry>
        <entry>
          <item>웹 에디터</item>
          <value>좌측 목차 280px, 중앙 에디터 min 880px, 우측 검사기 360px</value>
          <usage>초안 수정</usage>
          <rule>장별 이동, 본문 편집, 메타정보 편집을 병렬로 수행하되 본문 영역의 시선을 방해하지 않는다.</rule>
        </entry>
        <entry>
          <item>PDF 퍼블리싱</item>
          <value>좌측 페이지 썸네일 120px, 중앙 미리보기 min 820px, 우측 발행옵션 320px</value>
          <usage>최종 출력</usage>
          <rule>미리보기는 A4 비율을 유지하고, 발행 옵션 변경 시 1000ms 이내 부분 재렌더링한다.</rule>
        </entry>
        <entry>
          <item>이력 관리</item>
          <value>검색 바 320px, 필터 3~5개, 테이블</value>
          <usage>관리자 전용 대시보드</usage>
          <rule>고객명, 생성일, 템플릿, 발행상태, 다운로드 액션을 1행에서 처리 가능해야 한다.</rule>
        </entry>
        <entry>
          <item>설정/권한</item>
          <value>2열 카드 레이아웃 7:5</value>
          <usage>관리자 설정</usage>
          <rule>API 키 노출 금지, 역할별 권한 범위, 프롬프트 버전 관리, 템플릿 관리 탭으로 분리한다.</rule>
        </entry>
      </entries>
    </section>
    <section title="디자인 토큰" number="3">
      <entries />
      <subsection title="색상 토큰" number="3-1">
        <entries>
          <entry>
            <item>color.bg.canvas</item>
            <value>#F5F1EA</value>
            <usage>앱 전체 배경</usage>
            <rule>본문 캔버스 기본 배경으로 사용하고, 카드 외부의 면 구분에만 사용한다.</rule>
          </entry>
          <entry>
            <item>color.bg.subtle</item>
            <value>#EDE7DD</value>
            <usage>보조 영역, 썸네일 레일</usage>
            <rule>강한 구획 대신 부드러운 섹션 분리에 사용한다.</rule>
          </entry>
          <entry>
            <item>color.surface.primary</item>
            <value>#FFFFFF</value>
            <usage>카드, 모달, 드로어</usage>
            <rule>주요 작업면은 항상 흰색 바탕을 사용해 입력 가독성을 확보한다.</rule>
          </entry>
          <entry>
            <item>color.surface.secondary</item>
            <value>#FAF8F4</value>
            <usage>읽기 전용 패널, 비활성 미리보기</usage>
            <rule>편집 불가 영역과 보조 정보를 구분할 때만 사용한다.</rule>
          </entry>
          <entry>
            <item>color.surface.inverse</item>
            <value>#1A2540</value>
            <usage>로그인 좌측 패널, 다크 헤더</usage>
            <rule>역배경은 정보 밀도가 높은 요약 영역에 제한 사용한다.</rule>
          </entry>
          <entry>
            <item>color.text.primary</item>
            <value>#121826</value>
            <usage>제목, 본문, 숫자 지표</usage>
            <rule>기본 텍스트 색상으로 사용하며 대비비 7:1 이상을 유지한다.</rule>
          </entry>
          <entry>
            <item>color.text.secondary</item>
            <value>#475467</value>
            <usage>설명문, 보조 메타</usage>
            <rule>주요 정보보다 한 단계 낮은 위계에만 사용한다.</rule>
          </entry>
          <entry>
            <item>color.text.tertiary</item>
            <value>#667085</value>
            <usage>플레이스홀더, 보조 캡션</usage>
            <rule>본문 텍스트로는 사용하지 않는다.</rule>
          </entry>
          <entry>
            <item>color.text.inverse</item>
            <value>#FCFCFD</value>
            <usage>역배경 위 텍스트</usage>
            <rule>color.surface.inverse 위 전용으로만 사용한다.</rule>
          </entry>
          <entry>
            <item>color.border.default</item>
            <value>#D8D2C7</value>
            <usage>입력창, 카드, 구분선</usage>
            <rule>기본 경계선 두께는 1px로 고정한다.</rule>
          </entry>
          <entry>
            <item>color.border.strong</item>
            <value>#A79F92</value>
            <usage>Hover, 선택 영역</usage>
            <rule>상호작용 Hover 또는 선택 상태에서만 사용한다.</rule>
          </entry>
          <entry>
            <item>color.brand.primary</item>
            <value>#24385B</value>
            <usage>주요 CTA, 활성 탭, 상태 강조</usage>
            <rule>기본 브랜드 액션 색상이다.</rule>
          </entry>
          <entry>
            <item>color.brand.primary-hover</item>
            <value>#1C2B47</value>
            <usage>버튼 Hover, 선택된 메뉴 Hover</usage>
            <rule>배경색만 어둡게 하고 크기 변화는 주지 않는다.</rule>
          </entry>
          <entry>
            <item>color.brand.primary-active</item>
            <value>#162238</value>
            <usage>버튼 Active</usage>
            <rule>클릭 피드백은 색상 변화만 사용한다.</rule>
          </entry>
          <entry>
            <item>color.brand.secondary</item>
            <value>#B88746</value>
            <usage>중요 보조 강조, 템플릿 선택</usage>
            <rule>전체 면적의 10% 이내로 제한한다.</rule>
          </entry>
          <entry>
            <item>color.brand.secondary-soft</item>
            <value>#F5E7D2</value>
            <usage>금색 계열 배경 배지</usage>
            <rule>텍스트는 반드시 #8E6428 이상 농도로 사용한다.</rule>
          </entry>
          <entry>
            <item>color.info</item>
            <value>#175CD3</value>
            <usage>정보성 Toast, 진행 상태</usage>
            <rule>링크와 혼동되지 않도록 아이콘과 함께 사용한다.</rule>
          </entry>
          <entry>
            <item>color.success</item>
            <value>#0F766E</value>
            <usage>저장 완료, 발행 성공</usage>
            <rule>성공 배지는 채움형보다 옅은 배경형을 우선한다.</rule>
          </entry>
          <entry>
            <item>color.warning</item>
            <value>#B45309</value>
            <usage>검토 필요, API 응답 불완전</usage>
            <rule>경고는 차단이 아니라 확인 필요 의미로만 사용한다.</rule>
          </entry>
          <entry>
            <item>color.error</item>
            <value>#B42318</value>
            <usage>유효성 오류, 발행 실패</usage>
            <rule>오류는 텍스트와 배경을 동시에 제공하고 색상 단독 전달을 금지한다.</rule>
          </entry>
          <entry>
            <item>color.error.soft</item>
            <value>#FEF3F2</value>
            <usage>인라인 에러 박스</usage>
            <rule>에러 텍스트와 아이콘을 반드시 함께 배치한다.</rule>
          </entry>
          <entry>
            <item>color.focus.ring</item>
            <value>#8FB4FF</value>
            <usage>키보드 포커스</usage>
            <rule>포커스 링은 모든 인터랙션 컴포넌트에 4px 외곽 링으로 통일한다.</rule>
          </entry>
          <entry>
            <item>color.overlay.scrim</item>
            <value>#1218268F</value>
            <usage>모달/드로어 오버레이</usage>
            <rule>배경을 완전히 가리지 말고 문맥 인지가 가능하도록 56% 불투명도로 유지한다.</rule>
          </entry>
          <entry>
            <item>color.selection</item>
            <value>#DCE8FF</value>
            <usage>선택 셀, 드래그 선택</usage>
            <rule>텍스트 선택 또는 테이블 선택 상태에 사용한다.</rule>
          </entry>
        </entries>
      </subsection>
      <subsection title="타이포그래피 토큰" number="3-2">
        <entries>
          <entry>
            <item>font.family.ui</item>
            <value>Pretendard Variable, Inter, Apple SD Gothic Neo, sans-serif</value>
            <usage>앱 UI 전체</usage>
            <rule>본문, 폼, 표, 버튼에 기본 적용한다.</rule>
          </entry>
          <entry>
            <item>font.family.display</item>
            <value>Noto Serif KR, serif</value>
            <usage>리포트 커버, 템플릿 제목</usage>
            <rule>운영툴 UI 본문에는 사용하지 않고, 문서성과 상징성이 필요한 영역에만 쓴다.</rule>
          </entry>
          <entry>
            <item>font.family.mono</item>
            <value>JetBrains Mono, Consolas, monospace</value>
            <usage>로그, 프롬프트 변수, 코드성 텍스트</usage>
            <rule>숫자 정렬과 버전 표기에 사용한다.</rule>
          </entry>
          <entry>
            <item>type.display.lg</item>
            <value>36px / 44px / 700</value>
            <usage>로그인 헤드라인, 대형 리포트 제목</usage>
            <rule>한 화면에 1회만 사용한다.</rule>
          </entry>
          <entry>
            <item>type.heading.xl</item>
            <value>30px / 40px / 700</value>
            <usage>페이지 타이틀</usage>
            <rule>페이지 최상단 1개만 허용한다.</rule>
          </entry>
          <entry>
            <item>type.heading.lg</item>
            <value>24px / 34px / 700</value>
            <usage>섹션 타이틀, 모달 제목</usage>
            <rule>카드 내부에서는 최대 1단계까지만 사용한다.</rule>
          </entry>
          <entry>
            <item>type.heading.md</item>
            <value>20px / 30px / 600</value>
            <usage>카드 제목, 탭 상단 제목</usage>
            <rule>데이터 카드 제목 기본값이다.</rule>
          </entry>
          <entry>
            <item>type.title.sm</item>
            <value>18px / 28px / 600</value>
            <usage>리스트 상세 제목</usage>
            <rule>긴 텍스트는 2줄 이내로 자른다.</rule>
          </entry>
          <entry>
            <item>type.body.lg</item>
            <value>16px / 26px / 400</value>
            <usage>본문, 폼 입력값, 에디터 기본</usage>
            <rule>본문 최소 크기 기준으로 사용한다.</rule>
          </entry>
          <entry>
            <item>type.body.md</item>
            <value>14px / 22px / 400</value>
            <usage>설명문, 테이블 셀, 보조 본문</usage>
            <rule>운영툴에서 가장 많이 사용하는 기본 텍스트다.</rule>
          </entry>
          <entry>
            <item>type.body.sm</item>
            <value>13px / 20px / 500</value>
            <usage>필터 라벨, 헬퍼 텍스트</usage>
            <rule>작은 텍스트라도 명도 대비 4.5:1 이상을 유지한다.</rule>
          </entry>
          <entry>
            <item>type.caption</item>
            <value>12px / 18px / 500</value>
            <usage>배지, 상태 메타, 토스트 시간</usage>
            <rule>12px 미만 텍스트는 사용하지 않는다.</rule>
          </entry>
          <entry>
            <item>letter.spacing.tight</item>
            <value>-0.02em</value>
            <usage>큰 제목</usage>
            <rule>24px 이상 타이틀에만 적용한다.</rule>
          </entry>
          <entry>
            <item>letter.spacing.base</item>
            <value>0</value>
            <usage>일반 본문</usage>
            <rule>한글 UI는 기본 자간을 유지한다.</rule>
          </entry>
          <entry>
            <item>measure.editor</item>
            <value>68자</value>
            <usage>에디터 읽기 폭</usage>
            <rule>본문 한 줄 길이는 60~72자 범위를 유지한다.</rule>
          </entry>
        </entries>
      </subsection>
      <subsection title="간격 토큰" number="3-3">
        <entries>
          <entry>
            <item>space.1</item>
            <value>4px</value>
            <usage>미세 간격, 아이콘 간격</usage>
            <rule>독립 블록 간격으로는 사용하지 않는다.</rule>
          </entry>
          <entry>
            <item>space.2</item>
            <value>8px</value>
            <usage>라벨-입력, 버튼 아이콘</usage>
            <rule>가장 작은 실사용 간격 기준이다.</rule>
          </entry>
          <entry>
            <item>space.3</item>
            <value>12px</value>
            <usage>폼 요소 내부, 태그 그룹</usage>
            <rule>관련 항목의 소규모 묶음 간격에 사용한다.</rule>
          </entry>
          <entry>
            <item>space.4</item>
            <value>16px</value>
            <usage>카드 내부 기본 패딩 보조</usage>
            <rule>대부분의 컴포넌트 기본 간격이다.</rule>
          </entry>
          <entry>
            <item>space.5</item>
            <value>20px</value>
            <usage>카드 헤더-본문, 섹션 내부</usage>
            <rule>카드 정보 밀도가 높을 때 사용한다.</rule>
          </entry>
          <entry>
            <item>space.6</item>
            <value>24px</value>
            <usage>카드 패딩, 섹션 간격</usage>
            <rule>앱 전체 표준 블록 간격이다.</rule>
          </entry>
          <entry>
            <item>space.8</item>
            <value>32px</value>
            <usage>페이지 섹션 간격</usage>
            <rule>페이지 주요 블록 간격 기본값이다.</rule>
          </entry>
          <entry>
            <item>space.10</item>
            <value>40px</value>
            <usage>큰 섹션 분리</usage>
            <rule>화면의 주 흐름이 바뀌는 지점에서만 사용한다.</rule>
          </entry>
          <entry>
            <item>space.12</item>
            <value>48px</value>
            <usage>로그인/커버 여백</usage>
            <rule>강조 레이아웃에서만 사용한다.</rule>
          </entry>
          <entry>
            <item>space.16</item>
            <value>64px</value>
            <usage>화면 외곽 안전 여백</usage>
            <rule>1440px 이상 와이드 화면에서 적용한다.</rule>
          </entry>
        </entries>
      </subsection>
      <subsection title="Radius 토큰" number="3-4">
        <entries>
          <entry>
            <item>radius.xs</item>
            <value>8px</value>
            <usage>입력창, 배지, 소형 버튼</usage>
            <rule>작은 입력 컨트롤 전용이다.</rule>
          </entry>
          <entry>
            <item>radius.sm</item>
            <value>12px</value>
            <usage>기본 버튼, 카드, 테이블 컨테이너</usage>
            <rule>앱 기본 라운드 값이다.</rule>
          </entry>
          <entry>
            <item>radius.md</item>
            <value>16px</value>
            <usage>대형 카드, 모달</usage>
            <rule>주요 패널의 기본값이다.</rule>
          </entry>
          <entry>
            <item>radius.lg</item>
            <value>20px</value>
            <usage>로그인 카드, 대형 퍼블리싱 패널</usage>
            <rule>강조 레이아웃에서만 사용한다.</rule>
          </entry>
          <entry>
            <item>radius.xl</item>
            <value>24px</value>
            <usage>커버형 블록, 히어로 패널</usage>
            <rule>일반 폼 요소에는 사용하지 않는다.</rule>
          </entry>
          <entry>
            <item>radius.full</item>
            <value>999px</value>
            <usage>상태 배지, 원형 아이콘 버튼</usage>
            <rule>캡슐형 요소에만 사용한다.</rule>
          </entry>
        </entries>
      </subsection>
      <subsection title="Shadow 토큰" number="3-5">
        <entries>
          <entry>
            <item>shadow.xs</item>
            <value>0 1px 2px 0 #12182612</value>
            <usage>입력창, 얕은 카드</usage>
            <rule>정적인 평면 구분이 필요할 때만 사용한다.</rule>
          </entry>
          <entry>
            <item>shadow.sm</item>
            <value>0 4px 12px -4px #12182614</value>
            <usage>기본 카드, 드롭다운</usage>
            <rule>기본 그림자 값이다.</rule>
          </entry>
          <entry>
            <item>shadow.md</item>
            <value>0 12px 24px -8px #1218261F</value>
            <usage>Hover 카드, 스티키 바</usage>
            <rule>Hover 시 그림자만 강해지고 위치 이동은 없다.</rule>
          </entry>
          <entry>
            <item>shadow.lg</item>
            <value>0 24px 48px -12px #12182624</value>
            <usage>모달, 대형 드로어</usage>
            <rule>오버레이 레이어에만 사용한다.</rule>
          </entry>
          <entry>
            <item>shadow.inner</item>
            <value>inset 0 1px 0 0 #FFFFFF66</value>
            <usage>역배경 패널</usage>
            <rule>어두운 배경에서 상단 경계 감도를 높일 때 사용한다.</rule>
          </entry>
        </entries>
      </subsection>
      <subsection title="Motion 토큰" number="3-6">
        <entries>
          <entry>
            <item>motion.fast</item>
            <value>120ms</value>
            <usage>아이콘 버튼, 배지, 체크 상태</usage>
            <rule>즉시성 피드백에 사용한다.</rule>
          </entry>
          <entry>
            <item>motion.base</item>
            <value>160ms</value>
            <usage>버튼, 입력 Hover/Focus</usage>
            <rule>앱 기본 인터랙션 시간이다.</rule>
          </entry>
          <entry>
            <item>motion.standard</item>
            <value>240ms</value>
            <usage>모달/드로어 진입, 탭 전환</usage>
            <rule>큰 패널 전환 기본값이다.</rule>
          </entry>
          <entry>
            <item>motion.slow</item>
            <value>320ms</value>
            <usage>페이지 패널 리사이즈</usage>
            <rule>구조 변경 시에만 사용한다.</rule>
          </entry>
          <entry>
            <item>motion.skeleton</item>
            <value>1200ms</value>
            <usage>로딩 셰이머</usage>
            <rule>반복 애니메이션은 1.2초 이상으로 둔다.</rule>
          </entry>
          <entry>
            <item>motion.easing.standard</item>
            <value>cubic-bezier(0.2, 0, 0, 1)</value>
            <usage>대부분 전환</usage>
            <rule>시작은 빠르게, 종료는 안정적으로 처리한다.</rule>
          </entry>
          <entry>
            <item>motion.easing.exit</item>
            <value>cubic-bezier(0.4, 0, 1, 1)</value>
            <usage>닫힘 애니메이션</usage>
            <rule>종료 시 잔상을 남기지 않는다.</rule>
          </entry>
          <entry>
            <item>reduced-motion</item>
            <value>0ms~80ms</value>
            <usage>OS 모션 축소 설정 대응</usage>
            <rule>prefers-reduced-motion 활성 시 이동 애니메이션을 제거하고 opacity만 남긴다.</rule>
          </entry>
        </entries>
      </subsection>
      <subsection title="Z-index 토큰" number="3-7">
        <entries>
          <entry>
            <item>z.base</item>
            <value>0</value>
            <usage>일반 본문</usage>
            <rule>기본 레이어 기준값이다.</rule>
          </entry>
          <entry>
            <item>z.sticky</item>
            <value>20</value>
            <usage>상단 액션바, 스티키 테이블 헤더</usage>
            <rule>콘텐츠보다 위, 팝오버보다 아래에 둔다.</rule>
          </entry>
          <entry>
            <item>z.dropdown</item>
            <value>40</value>
            <usage>셀렉트, 메뉴, 툴팁</usage>
            <rule>스티키 요소보다 위에 위치한다.</rule>
          </entry>
          <entry>
            <item>z.drawer</item>
            <value>60</value>
            <usage>우측 속성 드로어</usage>
            <rule>드롭다운보다 위, 모달보다 아래다.</rule>
          </entry>
          <entry>
            <item>z.modal</item>
            <value>80</value>
            <usage>모달, 확인 대화상자</usage>
            <rule>모든 페이지 상호작용을 차단한다.</rule>
          </entry>
          <entry>
            <item>z.toast</item>
            <value>90</value>
            <usage>토스트 스택</usage>
            <rule>모달보다 높되 화면 최상단 가장자리만 사용한다.</rule>
          </entry>
          <entry>
            <item>z.emergency</item>
            <value>100</value>
            <usage>세션 만료, 치명적 오류 배너</usage>
            <rule>강제 재로그인, 데이터 충돌 알림에만 사용한다.</rule>
          </entry>
        </entries>
      </subsection>
    </section>
    <section title="레이아웃 규격" number="4">
      <entries />
      <subsection title="브레이크포인트 및 컨테이너" number="4-1">
        <entries>
          <entry>
            <item>pc-min</item>
            <value>1024px</value>
            <usage>최소 지원 해상도</usage>
            <rule>1024px 미만에서는 사용 불가 안내 화면을 노출한다.</rule>
          </entry>
          <entry>
            <item>pc-standard</item>
            <value>1280px</value>
            <usage>기본 운영 해상도</usage>
            <rule>기본 설계 기준 해상도로 삼는다.</rule>
          </entry>
          <entry>
            <item>pc-wide</item>
            <value>1440px</value>
            <usage>권장 해상도</usage>
            <rule>좌우 패널이 동시에 열리는 기본 작업 해상도다.</rule>
          </entry>
          <entry>
            <item>pc-xl</item>
            <value>1680px</value>
            <usage>와이드 모니터</usage>
            <rule>여유 공간은 넓은 여백으로 소비하고 본문 폭은 과도하게 확장하지 않는다.</rule>
          </entry>
          <entry>
            <item>container.dashboard</item>
            <value>max 1520px / padding 32px</value>
            <usage>대시보드, 목록 화면</usage>
            <rule>카드와 테이블을 동시에 담는 기본 폭이다.</rule>
          </entry>
          <entry>
            <item>container.form</item>
            <value>max 1280px / padding 32px</value>
            <usage>고객 입력, 설정 화면</usage>
            <rule>긴 폼도 한 시선 폭 안에서 처리되도록 제한한다.</rule>
          </entry>
          <entry>
            <item>container.editor</item>
            <value>min 1440px / padding 24px</value>
            <usage>에디터, 퍼블리셔</usage>
            <rule>다중 패널 레이아웃 전용이다.</rule>
          </entry>
          <entry>
            <item>grid.desktop</item>
            <value>12col / gutter 24px / margin 32px</value>
            <usage>일반 본문 레이아웃</usage>
            <rule>컴포넌트 폭은 12컬럼 배수를 기준으로 배치한다.</rule>
          </entry>
          <entry>
            <item>grid.wide</item>
            <value>12col / gutter 24px / margin 40px</value>
            <usage>1680px 이상</usage>
            <rule>여백만 늘리고 거터는 유지한다.</rule>
          </entry>
        </entries>
      </subsection>
      <subsection title="앱 셸 규칙" number="4-2">
        <entries>
          <entry>
            <item>사이드바 폭</item>
            <value>272px</value>
            <usage>기본 앱 셸</usage>
            <rule>1차 메뉴와 최근 작업 바로가기를 포함한다.</rule>
          </entry>
          <entry>
            <item>사이드바 축소 폭</item>
            <value>72px</value>
            <usage>공간 확보 모드</usage>
            <rule>아이콘만 유지하고 텍스트는 툴팁으로 대체한다.</rule>
          </entry>
          <entry>
            <item>상단 바 높이</item>
            <value>64px</value>
            <usage>페이지 공통 헤더</usage>
            <rule>현재 위치, 검색, 사용자 메뉴, 빠른 생성 버튼을 포함한다.</rule>
          </entry>
          <entry>
            <item>페이지 헤더 높이</item>
            <value>72px</value>
            <usage>각 화면 제목 영역</usage>
            <rule>화면명, 상태 배지, 우측 주요 액션을 배치한다.</rule>
          </entry>
          <entry>
            <item>본문 최소 높이</item>
            <value>calc(100vh - 64px)</value>
            <usage>전체 앱</usage>
            <rule>Body 자체 스크롤을 금지하고 메인 콘텐츠만 스크롤한다.</rule>
          </entry>
          <entry>
            <item>콘텐츠 패딩</item>
            <value>24px~32px</value>
            <usage>페이지 본문</usage>
            <rule>정보 밀도가 높은 페이지는 24px, 일반 페이지는 32px를 사용한다.</rule>
          </entry>
          <entry>
            <item>카드 간격</item>
            <value>24px</value>
            <usage>대시보드, 리스트</usage>
            <rule>카드 행과 열 간격을 동일하게 유지한다.</rule>
          </entry>
          <entry>
            <item>섹션 최대 높이</item>
            <value>calc(100vh - 160px)</value>
            <usage>에디터, 테이블, 드로어</usage>
            <rule>내부 스크롤 컨테이너를 분리하여 헤더가 흔들리지 않게 한다.</rule>
          </entry>
        </entries>
      </subsection>
      <subsection title="스크롤 및 고정 규칙" number="4-3">
        <entries>
          <entry>
            <item>Body 스크롤</item>
            <value>금지</value>
            <usage>앱 전역</usage>
            <rule>전체 스크롤은 메인 콘텐츠 영역에서만 발생한다.</rule>
          </entry>
          <entry>
            <item>사이드바 고정</item>
            <value>top 0 / left 0 / height 100vh</value>
            <usage>앱 셸</usage>
            <rule>네비게이션은 항상 고정한다.</rule>
          </entry>
          <entry>
            <item>상단 바 고정</item>
            <value>top 0 / z 20</value>
            <usage>앱 셸</usage>
            <rule>화면 전환 시에도 유지한다.</rule>
          </entry>
          <entry>
            <item>페이지 액션바 고정</item>
            <value>top 64px</value>
            <usage>상세 화면, 에디터</usage>
            <rule>저장·생성·발행 액션은 스크롤 중에도 보이게 유지한다.</rule>
          </entry>
          <entry>
            <item>테이블 헤더 고정</item>
            <value>top 136px</value>
            <usage>목록/이력 화면</usage>
            <rule>상단 바 64px + 페이지 헤더 72px 기준으로 계산한다.</rule>
          </entry>
          <entry>
            <item>에디터 목차 스크롤</item>
            <value>독립 스크롤</value>
            <usage>좌측 목차 패널</usage>
            <rule>목차 길이가 길어져도 중앙 편집 영역은 위치를 유지한다.</rule>
          </entry>
          <entry>
            <item>모달 오픈 시</item>
            <value>배경 스크롤 잠금</value>
            <usage>모달</usage>
            <rule>Body 스크롤과 배경 요소 포커스를 동시에 차단한다.</rule>
          </entry>
          <entry>
            <item>드로어 오픈 시</item>
            <value>본문 스크롤 유지</value>
            <usage>우측 속성 편집</usage>
            <rule>배경 읽기는 허용하되, 포커스는 드로어 내부에 순환시킨다.</rule>
          </entry>
        </entries>
      </subsection>
      <subsection title="화면별 레이아웃 패턴" number="4-4">
        <entries>
          <entry>
            <item>로그인 레이아웃</item>
            <value>5:7 2단 분할 / 우측 카드 420px</value>
            <usage>로그인</usage>
            <rule>좌측은 브랜딩·시스템 상태, 우측은 로그인 폼과 비상 연락처만 둔다.</rule>
          </entry>
          <entry>
            <item>대시보드 1행</item>
            <value>3:3:3:3</value>
            <usage>KPI 카드</usage>
            <rule>4개 핵심 지표 카드 높이를 모두 160px로 통일한다.</rule>
          </entry>
          <entry>
            <item>대시보드 2행</item>
            <value>8:4</value>
            <usage>작업 목록 + 상태 패널</usage>
            <rule>좌측은 최근 작업, 우측은 실패 로그·공지 배치에 사용한다.</rule>
          </entry>
          <entry>
            <item>입력 폼 레이아웃</item>
            <value>6:6, 4:4:4, 12</value>
            <usage>고객 데이터 입력</usage>
            <rule>필드 성격별로 2열 또는 3열만 허용하고 5열 이상 분할을 금지한다.</rule>
          </entry>
          <entry>
            <item>케이스 상세</item>
            <value>상단 요약 160px + 탭 바 48px</value>
            <usage>개별 케이스</usage>
            <rule>탭은 기본정보/로직/초안/편집/PDF/이력 6개로 고정한다.</rule>
          </entry>
          <entry>
            <item>에디터 레이아웃</item>
            <value>280px / 1fr / 360px</value>
            <usage>초안 편집</usage>
            <rule>중앙 편집폭은 880px~1040px를 유지한다.</rule>
          </entry>
          <entry>
            <item>퍼블리셔 레이아웃</item>
            <value>120px / 1fr / 320px</value>
            <usage>PDF 발행</usage>
            <rule>중앙 미리보기는 A4 세로 비율을 유지하고 좌우 패널은 고정 폭으로 둔다.</rule>
          </entry>
        </entries>
      </subsection>
    </section>
    <section title="업무 흐름별 UI 구현 기준" number="5">
      <entries />
      <subsection title="로그인 및 권한" number="5-1">
        <entries>
          <entry>
            <item>로그인 카드 패딩</item>
            <value>40px</value>
            <usage>로그인 폼</usage>
            <rule>내부 요소 간격은 24px 기준으로 정렬한다.</rule>
          </entry>
          <entry>
            <item>인증 방식</item>
            <value>ID/PW + 2차 인증 옵션</value>
            <usage>로그인</usage>
            <rule>2차 인증은 관리자 계정에만 노출하고 일반 편집자는 선택 노출로 시작한다.</rule>
          </entry>
          <entry>
            <item>상태 알림</item>
            <value>배너 높이 44px</value>
            <usage>로그인 화면 상단</usage>
            <rule>점검, 장애, 세션 관련 공지를 한 줄 배너로 표시한다.</rule>
          </entry>
          <entry>
            <item>권한 레벨</item>
            <value>Admin / Editor / Viewer</value>
            <usage>전체 앱</usage>
            <rule>메뉴 노출과 액션 권한을 분리하고 버튼 disabled만으로 권한 제어하지 않는다.</rule>
          </entry>
          <entry>
            <item>세션 만료 처리</item>
            <value>경고 모달 480px / 자동 로그아웃 300000ms 전 알림</value>
            <usage>전역</usage>
            <rule>세션 종료 5분 전에 저장 유도 모달을 띄운다.</rule>
          </entry>
        </entries>
      </subsection>
      <subsection title="고객 데이터 입력 및 검증" number="5-2">
        <entries>
          <entry>
            <item>필수 입력 그룹</item>
            <value>고객명, 성별, 생년월일, 출생시각, 양력/음력, 출생지</value>
            <usage>고객 데이터 입력</usage>
            <rule>필수 그룹은 1번째 카드에 묶고 미입력 시 저장 불가 처리한다.</rule>
          </entry>
          <entry>
            <item>날짜/시간 입력</item>
            <value>입력창 높이 44px, 그룹 간격 12px</value>
            <usage>출생정보 섹션</usage>
            <rule>날짜, 시간, 달력 타입은 한 줄 그룹으로 묶고 순서 변경을 금지한다.</rule>
          </entry>
          <entry>
            <item>API 조회 버튼 위치</item>
            <value>입력 그룹 우측 하단</value>
            <usage>간지 데이터 조회</usage>
            <rule>필수값 충족 전까지 disabled 상태를 유지한다.</rule>
          </entry>
          <entry>
            <item>정규화 결과 패널</item>
            <value>카드 높이 min 240px</value>
            <usage>로직 산출 확인</usage>
            <rule>원본값, 변환값, 경고 메시지를 3단 구획으로 보여준다.</rule>
          </entry>
          <entry>
            <item>Excel 로직 매핑</item>
            <value>규칙 리스트 행 높이 40px</value>
            <usage>데이터 정규화 엔진</usage>
            <rule>적용된 규칙과 결과값을 순서대로 기록하고 숨김 계산을 금지한다.</rule>
          </entry>
          <entry>
            <item>저장 정책</item>
            <value>자동임시저장 15000ms, 수동저장 CTA 고정</value>
            <usage>입력 화면</usage>
            <rule>자동 저장은 조용히 처리하고 실패 시 상단 배너와 토스트를 함께 노출한다.</rule>
          </entry>
        </entries>
      </subsection>
      <subsection title="AI 초안 생성 워크플로" number="5-3">
        <entries>
          <entry>
            <item>생성 모드 선택</item>
            <value>세그먼트 높이 40px</value>
            <usage>30p/100p 선택</usage>
            <rule>기본값은 마지막 사용 설정을 유지하되 케이스별 독립 저장한다.</rule>
          </entry>
          <entry>
            <item>모델 선택</item>
            <value>셀렉트 폭 220px</value>
            <usage>OpenAI/Gemini 선택</usage>
            <rule>모델명, 버전, 비용 메타를 함께 표시한다.</rule>
          </entry>
          <entry>
            <item>프롬프트 버전</item>
            <value>배지 높이 28px</value>
            <usage>프롬프트 관리</usage>
            <rule>초안 생성 결과에는 항상 프롬프트 버전을 남긴다.</rule>
          </entry>
          <entry>
            <item>변수 미리보기</item>
            <value>패널 폭 320px</value>
            <usage>프롬프트 변수 확인</usage>
            <rule>사람 정보, 로직 파라미터, 문서 옵션을 3개 그룹으로 분리한다.</rule>
          </entry>
          <entry>
            <item>생성 범위</item>
            <value>체크칩 높이 32px</value>
            <usage>항목별 재생성</usage>
            <rule>성격/직업/건강/재물/대운/세운 등 섹션 단위 재실행을 지원한다.</rule>
          </entry>
          <entry>
            <item>진행 표시</item>
            <value>단계형 스텝퍼 높이 64px</value>
            <usage>생성 진행 상태</usage>
            <rule>파라미터 확인 → 프롬프트 조합 → 초안 생성 → 문단 후처리 → 저장 5단계를 고정한다.</rule>
          </entry>
          <entry>
            <item>실패 복구</item>
            <value>재시도 버튼 36px, 상세 로그 드로어 560px</value>
            <usage>생성 실패 시</usage>
            <rule>에러 코드는 숨기지 말고 운영자가 즉시 판단 가능한 문장으로 번역해 노출한다.</rule>
          </entry>
          <entry>
            <item>결과 비교</item>
            <value>Diff 2열 뷰 / 행 간격 16px</value>
            <usage>재생성 비교</usage>
            <rule>기존 초안과 재생성 초안을 좌우 비교하고 섹션 단위 채택을 지원한다.</rule>
          </entry>
        </entries>
      </subsection>
      <subsection title="웹 에디터 및 검수 워크플로" number="5-4">
        <entries>
          <entry>
            <item>에디터 툴바 높이</item>
            <value>56px</value>
            <usage>본문 편집</usage>
            <rule>텍스트 스타일, 문단, 주석, 변수 재삽입, 저장 버튼을 포함한다.</rule>
          </entry>
          <entry>
            <item>목차 패널</item>
            <value>폭 280px</value>
            <usage>장/절 이동</usage>
            <rule>장, 절, 하위 블록의 3단 구조까지 허용한다.</rule>
          </entry>
          <entry>
            <item>본문 캔버스</item>
            <value>폭 880px~1040px, 패딩 40px</value>
            <usage>본문 편집</usage>
            <rule>긴 문장을 다루므로 시선 폭을 제한하고 좌우 여백을 충분히 둔다.</rule>
          </entry>
          <entry>
            <item>속성 패널</item>
            <value>폭 360px</value>
            <usage>문단 메타, 코멘트, 변수 정보</usage>
            <rule>편집 중 선택된 블록 정보만 표시하고 전역 설정과 혼재시키지 않는다.</rule>
          </entry>
          <entry>
            <item>주석 기능</item>
            <value>코멘트 폭 320px</value>
            <usage>검수/수정 협업</usage>
            <rule>코멘트는 문단 앵커와 연결하고 완료 상태 토글을 제공한다.</rule>
          </entry>
          <entry>
            <item>자동 저장 표시</item>
            <value>상태 점 12px, 문구 13px</value>
            <usage>툴바 우측</usage>
            <rule>저장됨/저장 중/충돌/실패 4상태를 텍스트로 명확히 보여준다.</rule>
          </entry>
          <entry>
            <item>미리보기 전환</item>
            <value>탭 40px</value>
            <usage>편집/미리보기 전환</usage>
            <rule>미리보기는 읽기 전용이며 직접 편집을 허용하지 않는다.</rule>
          </entry>
        </entries>
      </subsection>
      <subsection title="PDF 퍼블리싱 워크플로" number="5-5">
        <entries>
          <entry>
            <item>출력 템플릿 카드</item>
            <value>카드 높이 132px</value>
            <usage>30p/100p 템플릿 선택</usage>
            <rule>표지 스타일, 내지 스타일, 페이지 수 정보를 카드 1장에 요약한다.</rule>
          </entry>
          <entry>
            <item>A4 미리보기</item>
            <value>794px x 1123px</value>
            <usage>브라우저 미리보기</usage>
            <rule>웹 미리보기는 96dpi 기준, 최종 출력은 300dpi로 렌더링한다.</rule>
          </entry>
          <entry>
            <item>최종 출력 해상도</item>
            <value>2480px x 3508px</value>
            <usage>PDF 렌더링</usage>
            <rule>A4 300dpi 기준으로 고정하고 리샘플링을 금지한다.</rule>
          </entry>
          <entry>
            <item>안전 여백</item>
            <value>96px</value>
            <usage>PDF 템플릿</usage>
            <rule>본문, 페이지 번호, 장식 요소 모두 안전 여백 내부에 배치한다.</rule>
          </entry>
          <entry>
            <item>썸네일 레일</item>
            <value>폭 120px, 간격 12px</value>
            <usage>페이지 이동</usage>
            <rule>현재 페이지 썸네일은 2px 브랜드 보더로 강조한다.</rule>
          </entry>
          <entry>
            <item>발행 옵션 패널</item>
            <value>폭 320px</value>
            <usage>PDF 설정</usage>
            <rule>표지 포함 여부, 목차 포함 여부, 워터마크, 버전명을 한 패널에 모은다.</rule>
          </entry>
          <entry>
            <item>발행 로그</item>
            <value>행 높이 36px</value>
            <usage>렌더링 상태</usage>
            <rule>렌더 단계별 소요 시간을 기록하고 실패 페이지 번호를 명시한다.</rule>
          </entry>
          <entry>
            <item>다운로드 액션</item>
            <value>주요 CTA 44px, 보조 CTA 44px</value>
            <usage>최종 산출물</usage>
            <rule>PDF 다운로드를 주요 액션으로, HTML 미리보기를 보조 액션으로 둔다.</rule>
          </entry>
        </entries>
      </subsection>
    </section>
    <section title="컴포넌트 규격" number="6">
      <entries />
      <subsection title="Button" number="6-1">
        <entries>
          <entry>
            <item>높이</item>
            <value>36 / 44 / 52px</value>
            <usage>sm / md / lg 버튼</usage>
            <rule>기본 높이는 44px를 사용한다.</rule>
          </entry>
          <entry>
            <item>가로 패딩</item>
            <value>12x16 / 14x20 / 16x24px</value>
            <usage>버튼 내부</usage>
            <rule>좌우 패딩은 높이와 비례시킨다.</rule>
          </entry>
          <entry>
            <item>아이콘 크기</item>
            <value>16 / 18 / 20px</value>
            <usage>아이콘 포함 버튼</usage>
            <rule>아이콘과 텍스트 간격은 8px로 고정한다.</rule>
          </entry>
          <entry>
            <item>최소 폭</item>
            <value>88px</value>
            <usage>주요 액션 버튼</usage>
            <rule>지나치게 짧은 CTA를 방지한다.</rule>
          </entry>
          <entry>
            <item>기본 Variant</item>
            <value>Primary / Secondary / Tertiary / Danger / Ghost</value>
            <usage>전역 액션</usage>
            <rule>한 화면의 주요 CTA는 1개만 Primary를 허용한다.</rule>
          </entry>
          <entry>
            <item>default</item>
            <value>bg #24385B / text #FFFFFF / border 1px transparent</value>
            <usage>Primary 버튼</usage>
            <rule>보조 버튼은 bg #FFFFFF / border #D8D2C7 / text #121826를 사용한다.</rule>
          </entry>
          <entry>
            <item>hover</item>
            <value>bg #1C2B47 / shadow sm / 160ms</value>
            <usage>마우스 Hover</usage>
            <rule>버튼 크기 확대와 위치 이동을 금지한다.</rule>
          </entry>
          <entry>
            <item>active</item>
            <value>bg #162238 / 120ms</value>
            <usage>클릭 중</usage>
            <rule>색상만 한 단계 더 어둡게 처리한다.</rule>
          </entry>
          <entry>
            <item>focus</item>
            <value>ring 4px #8FB4FF66 / outline 0</value>
            <usage>키보드 탐색</usage>
            <rule>포커스 링은 버튼 외곽에 끊김 없이 보이게 한다.</rule>
          </entry>
          <entry>
            <item>disabled</item>
            <value>bg #E5E7EB / text #98A2B3 / border #E5E7EB</value>
            <usage>비활성 버튼</usage>
            <rule>불투명도만 낮추지 말고 텍스트 대비도 함께 낮춘다.</rule>
          </entry>
          <entry>
            <item>loading</item>
            <value>spinner 16px / label opacity 0.72 / pointer-events none</value>
            <usage>비동기 액션</usage>
            <rule>로딩 중 폭 변화가 생기지 않도록 라벨 공간을 유지한다.</rule>
          </entry>
          <entry>
            <item>error</item>
            <value>bg #FEF3F2 / text #B42318 / border #F04438</value>
            <usage>실행 실패 직후 재시도 버튼</usage>
            <rule>실패 사유는 버튼 옆 헬퍼 텍스트로 반드시 보완한다.</rule>
          </entry>
        </entries>
      </subsection>
      <subsection title="Input" number="6-2">
        <entries>
          <entry>
            <item>높이</item>
            <value>44 / 52px</value>
            <usage>일반 / 강조 입력창</usage>
            <rule>기본 높이는 44px로 사용한다.</rule>
          </entry>
          <entry>
            <item>내부 패딩</item>
            <value>12px 14px</value>
            <usage>텍스트 입력</usage>
            <rule>숫자 필드는 우측 정렬, 일반 텍스트는 좌측 정렬한다.</rule>
          </entry>
          <entry>
            <item>라벨 간격</item>
            <value>8px</value>
            <usage>라벨-필드</usage>
            <rule>모든 입력창은 외부 라벨을 기본으로 한다.</rule>
          </entry>
          <entry>
            <item>헬퍼 텍스트</item>
            <value>12px / 18px</value>
            <usage>설명, 오류</usage>
            <rule>필드 바로 아래 배치한다.</rule>
          </entry>
          <entry>
            <item>접두/접미 영역</item>
            <value>40px</value>
            <usage>아이콘, 단위 표시</usage>
            <rule>클릭 가능한 아이콘은 cursor pointer를 적용한다.</rule>
          </entry>
          <entry>
            <item>default</item>
            <value>bg #FFFFFF / border #D8D2C7 / text #121826</value>
            <usage>기본 입력 상태</usage>
            <rule>placeholder는 #667085를 사용한다.</rule>
          </entry>
          <entry>
            <item>hover</item>
            <value>border #A79F92 / shadow xs / 160ms</value>
            <usage>마우스 Hover</usage>
            <rule>배경색 변화는 주지 않는다.</rule>
          </entry>
          <entry>
            <item>active</item>
            <value>border #24385B</value>
            <usage>입력 중</usage>
            <rule>active와 focus를 동일시하지 않고, 실제 포커스 시 링을 추가한다.</rule>
          </entry>
          <entry>
            <item>focus</item>
            <value>border #24385B / ring 4px #8FB4FF4D</value>
            <usage>키보드/마우스 포커스</usage>
            <rule>포커스 시 헬퍼 문구가 있으면 우선 노출한다.</rule>
          </entry>
          <entry>
            <item>disabled</item>
            <value>bg #F2F4F7 / text #98A2B3 / border #E4E7EC</value>
            <usage>읽기 전용, 권한 제한</usage>
            <rule>disabled와 readonly를 시각적으로 구분하되 둘 다 수정은 금지한다.</rule>
          </entry>
          <entry>
            <item>loading</item>
            <value>spinner 16px right 14px</value>
            <usage>자동완성, API 확인 입력</usage>
            <rule>로딩 중에도 기존 값은 유지한다.</rule>
          </entry>
          <entry>
            <item>error</item>
            <value>border #F04438 / ring 4px #F0443826 / helper #B42318</value>
            <usage>유효성 오류</usage>
            <rule>오류 메시지는 원인과 해결 문구를 1문장으로 적는다.</rule>
          </entry>
        </entries>
      </subsection>
      <subsection title="Textarea" number="6-3">
        <entries>
          <entry>
            <item>최소 높이</item>
            <value>120px</value>
            <usage>메모, 짧은 설명</usage>
            <rule>기본 행 수는 5줄로 설정한다.</rule>
          </entry>
          <entry>
            <item>확장 높이</item>
            <value>240px / 360px</value>
            <usage>프롬프트 입력, 긴 메모</usage>
            <rule>내용 밀도에 따라 2단계만 허용한다.</rule>
          </entry>
          <entry>
            <item>내부 패딩</item>
            <value>14px 16px</value>
            <usage>본문 입력</usage>
            <rule>줄간격은 22px 이상 유지한다.</rule>
          </entry>
          <entry>
            <item>리사이즈</item>
            <value>vertical only</value>
            <usage>메모 입력</usage>
            <rule>가로 리사이즈를 금지한다.</rule>
          </entry>
          <entry>
            <item>default</item>
            <value>bg #FFFFFF / border #D8D2C7 / text #121826</value>
            <usage>기본 상태</usage>
            <rule>긴 입력에도 경계가 흐려지지 않게 한다.</rule>
          </entry>
          <entry>
            <item>hover</item>
            <value>border #A79F92 / shadow xs</value>
            <usage>Hover</usage>
            <rule>입력창 외곽만 변화시킨다.</rule>
          </entry>
          <entry>
            <item>active</item>
            <value>border #24385B</value>
            <usage>입력 중</usage>
            <rule>캐럿 색상도 브랜드 컬러를 사용한다.</rule>
          </entry>
          <entry>
            <item>focus</item>
            <value>border #24385B / ring 4px #8FB4FF4D</value>
            <usage>포커스</usage>
            <rule>포커스 시 스크롤 점프를 금지한다.</rule>
          </entry>
          <entry>
            <item>disabled</item>
            <value>bg #F2F4F7 / text #98A2B3</value>
            <usage>읽기 전용 영역</usage>
            <rule>편집 불가 이유가 있으면 상단에 안내 배지를 둔다.</rule>
          </entry>
          <entry>
            <item>loading</item>
            <value>skeleton lines 4~6 / 1200ms</value>
            <usage>AI 본문 삽입 중</usage>
            <rule>기존 내용이 있으면 덮어쓰기 전 확인 모달을 띄운다.</rule>
          </entry>
          <entry>
            <item>error</item>
            <value>border #F04438 / helper #B42318</value>
            <usage>길이 초과, 금칙어, 파싱 오류</usage>
            <rule>오류 발생 시 현재 글자 수와 제한 값을 함께 노출한다.</rule>
          </entry>
        </entries>
      </subsection>
      <subsection title="Card" number="6-4">
        <entries>
          <entry>
            <item>기본 패딩</item>
            <value>24px</value>
            <usage>일반 정보 카드</usage>
            <rule>카드 내부 기본 간격은 16px를 사용한다.</rule>
          </entry>
          <entry>
            <item>강조 패딩</item>
            <value>32px</value>
            <usage>요약 카드, 로그인 패널</usage>
            <rule>정보량이 적고 비주얼 비중이 큰 카드에 사용한다.</rule>
          </entry>
          <entry>
            <item>최소 높이</item>
            <value>160px</value>
            <usage>KPI 카드</usage>
            <rule>KPI 카드 1행 높이를 통일한다.</rule>
          </entry>
          <entry>
            <item>라운드</item>
            <value>16px</value>
            <usage>카드 전반</usage>
            <rule>인터랙티브 카드도 동일 라운드를 유지한다.</rule>
          </entry>
          <entry>
            <item>default</item>
            <value>bg #FFFFFF / border 1px #E7E1D7 / shadow sm</value>
            <usage>일반 카드</usage>
            <rule>정적 카드의 기본값이다.</rule>
          </entry>
          <entry>
            <item>hover</item>
            <value>border #A79F92 / shadow md / 160ms</value>
            <usage>클릭 가능한 카드</usage>
            <rule>Hover는 클릭 가능 카드에만 적용한다.</rule>
          </entry>
          <entry>
            <item>active</item>
            <value>border #24385B / bg #FAFBFF</value>
            <usage>선택 카드</usage>
            <rule>선택 상태는 항상 보더와 배지로 함께 표시한다.</rule>
          </entry>
          <entry>
            <item>focus</item>
            <value>ring 4px #8FB4FF4D</value>
            <usage>키보드 선택 카드</usage>
            <rule>카드 전체가 링크 또는 버튼일 때만 포커스를 준다.</rule>
          </entry>
          <entry>
            <item>disabled</item>
            <value>bg #F8F6F2 / text #98A2B3 / border #ECE7DF</value>
            <usage>잠금 카드</usage>
            <rule>비활성 이유를 카드 하단 메타에 노출한다.</rule>
          </entry>
          <entry>
            <item>loading</item>
            <value>skeleton block / 1200ms</value>
            <usage>데이터 로딩 카드</usage>
            <rule>제목, 수치, 보조텍스트 3단 skeleton 구조를 사용한다.</rule>
          </entry>
          <entry>
            <item>error</item>
            <value>top bar 4px #B42318 / body #FEF3F2</value>
            <usage>실패 카드</usage>
            <rule>오류 카드는 문제 요약과 재시도 버튼을 함께 가진다.</rule>
          </entry>
        </entries>
      </subsection>
      <subsection title="Modal" number="6-5">
        <entries>
          <entry>
            <item>크기</item>
            <value>480 / 640 / 960px</value>
            <usage>sm / md / lg 모달</usage>
            <rule>확인 대화상자는 480px, 설정형 모달은 640px, 비교형 모달은 960px를 사용한다.</rule>
          </entry>
          <entry>
            <item>최대 높이</item>
            <value>calc(100vh - 96px)</value>
            <usage>모달 본문</usage>
            <rule>높이 초과 시 내부 본문만 스크롤한다.</rule>
          </entry>
          <entry>
            <item>헤더/푸터 패딩</item>
            <value>24px</value>
            <usage>모달 구조</usage>
            <rule>헤더와 푸터는 항상 본문과 분리한다.</rule>
          </entry>
          <entry>
            <item>오버레이</item>
            <value>#1218268F</value>
            <usage>모달 배경</usage>
            <rule>배경 클릭 닫기는 파괴적 작업 모달에서 금지한다.</rule>
          </entry>
          <entry>
            <item>default</item>
            <value>opacity 1 / scale 1 / shadow lg / 240ms</value>
            <usage>일반 오픈 상태</usage>
            <rule>첫 포커스는 제목 다음 첫 입력 또는 주요 버튼으로 이동한다.</rule>
          </entry>
          <entry>
            <item>hover</item>
            <value>close button bg #F2F4F7</value>
            <usage>닫기 버튼 Hover</usage>
            <rule>모달 컨테이너 자체 Hover 효과는 주지 않는다.</rule>
          </entry>
          <entry>
            <item>active</item>
            <value>primary action bg #162238</value>
            <usage>모달 내부 주요 액션 클릭</usage>
            <rule>Active는 내부 액션에만 적용한다.</rule>
          </entry>
          <entry>
            <item>focus</item>
            <value>focus trap / ring 4px #8FB4FF4D</value>
            <usage>키보드 탐색</usage>
            <rule>ESC, Tab 순환, Enter 기본 액션을 지원한다.</rule>
          </entry>
          <entry>
            <item>disabled</item>
            <value>footer actions disabled / backdrop close off</value>
            <usage>필수값 미충족, 처리 중</usage>
            <rule>치명 액션 확인 단계에서는 닫기 동작도 명확히 제어한다.</rule>
          </entry>
          <entry>
            <item>loading</item>
            <value>body overlay 24px spinner / 240ms</value>
            <usage>저장, 생성, 발행 처리</usage>
            <rule>로딩 중 스크롤과 버튼을 모두 차단한다.</rule>
          </entry>
          <entry>
            <item>error</item>
            <value>inline alert 44px / bg #FEF3F2 / border #F04438</value>
            <usage>제출 실패</usage>
            <rule>모달 상단 본문 바로 아래에 오류 배너를 배치한다.</rule>
          </entry>
        </entries>
      </subsection>
      <subsection title="Drawer" number="6-6">
        <entries>
          <entry>
            <item>폭</item>
            <value>360 / 480 / 560px</value>
            <usage>속성 편집, 상세 로그</usage>
            <rule>우측 드로어만 허용하고 좌측 드로어는 사용하지 않는다.</rule>
          </entry>
          <entry>
            <item>헤더 높이</item>
            <value>64px</value>
            <usage>드로어 상단</usage>
            <rule>제목, 닫기, 보조 액션 1개만 허용한다.</rule>
          </entry>
          <entry>
            <item>본문 패딩</item>
            <value>24px</value>
            <usage>드로어 내부</usage>
            <rule>긴 폼은 섹션 카드 없이 직접 그룹화한다.</rule>
          </entry>
          <entry>
            <item>default</item>
            <value>translateX(0) / shadow lg / 240ms</value>
            <usage>기본 오픈 상태</usage>
            <rule>페이지 문맥을 유지하기 위해 완전 불투명 흰색 배경을 사용한다.</rule>
          </entry>
          <entry>
            <item>hover</item>
            <value>row hover bg #F8FAFC</value>
            <usage>내부 리스트, 로그 행</usage>
            <rule>드로어 외곽 Hover는 사용하지 않는다.</rule>
          </entry>
          <entry>
            <item>active</item>
            <value>selected row border-left 3px #24385B</value>
            <usage>로그 선택, 속성 선택</usage>
            <rule>선택 행은 배경과 좌측 라인으로 동시 표시한다.</rule>
          </entry>
          <entry>
            <item>focus</item>
            <value>focus trap / ring 4px #8FB4FF4D</value>
            <usage>키보드 탐색</usage>
            <rule>드로어를 닫기 전 포커스를 호출 원점으로 복귀시킨다.</rule>
          </entry>
          <entry>
            <item>disabled</item>
            <value>field disabled / save off</value>
            <usage>권한 제한, 처리 중</usage>
            <rule>읽기 전용 드로어는 제목 옆 읽기 전용 배지를 붙인다.</rule>
          </entry>
          <entry>
            <item>loading</item>
            <value>skeleton rows 6 / 1200ms</value>
            <usage>로그 조회, 속성 불러오기</usage>
            <rule>제목과 닫기 버튼은 유지한다.</rule>
          </entry>
          <entry>
            <item>error</item>
            <value>alert box 44px / bg #FEF3F2</value>
            <usage>로드 실패</usage>
            <rule>재시도 버튼을 상단 오류 박스 내부에 포함한다.</rule>
          </entry>
        </entries>
      </subsection>
      <subsection title="Toast" number="6-7">
        <entries>
          <entry>
            <item>위치</item>
            <value>top 24px / right 24px</value>
            <usage>전역 알림</usage>
            <rule>한 번에 최대 3개까지만 스택한다.</rule>
          </entry>
          <entry>
            <item>폭</item>
            <value>360px</value>
            <usage>기본 토스트</usage>
            <rule>텍스트가 길어져도 2줄 이내로 제한한다.</rule>
          </entry>
          <entry>
            <item>높이</item>
            <value>min 56px</value>
            <usage>상태 알림</usage>
            <rule>아이콘, 본문, 액션, 닫기 아이콘 순서로 배치한다.</rule>
          </entry>
          <entry>
            <item>자동 닫힘</item>
            <value>4000ms / hover pause</value>
            <usage>성공, 정보 Toast</usage>
            <rule>오류 Toast는 자동 닫힘을 금지한다.</rule>
          </entry>
          <entry>
            <item>default</item>
            <value>bg #FFFFFF / border #D8D2C7 / shadow md</value>
            <usage>일반 토스트</usage>
            <rule>상태 아이콘 색상으로 의미를 보조한다.</rule>
          </entry>
          <entry>
            <item>hover</item>
            <value>timer pause / shadow lg</value>
            <usage>마우스 Hover</usage>
            <rule>Hover 시 사라지지 않고 읽을 시간을 보장한다.</rule>
          </entry>
          <entry>
            <item>active</item>
            <value>action button bg #162238</value>
            <usage>토스트 내부 액션 클릭</usage>
            <rule>액션은 1개까지만 허용한다.</rule>
          </entry>
          <entry>
            <item>focus</item>
            <value>action ring 4px #8FB4FF4D</value>
            <usage>키보드 접근</usage>
            <rule>화면 리더용 aria-live 영역에 연결한다.</rule>
          </entry>
          <entry>
            <item>disabled</item>
            <value>action text #98A2B3</value>
            <usage>후속 액션 불가 상태</usage>
            <rule>단순 정보 토스트는 액션 영역 자체를 숨긴다.</rule>
          </entry>
          <entry>
            <item>loading</item>
            <value>spinner 16px / auto close off</value>
            <usage>저장 중, 발행 중</usage>
            <rule>진행형 토스트는 완료/실패 토스트로 교체한다.</rule>
          </entry>
          <entry>
            <item>error</item>
            <value>bg #FEF3F2 / border #F04438 / text #B42318</value>
            <usage>실패 알림</usage>
            <rule>실패 원인을 1문장으로 쓰고 재시도 액션을 우선 제공한다.</rule>
          </entry>
        </entries>
      </subsection>
      <subsection title="Table" number="6-8">
        <entries>
          <entry>
            <item>헤더 높이</item>
            <value>44px</value>
            <usage>목록, 이력, 로그</usage>
            <rule>헤더는 sticky를 기본 적용한다.</rule>
          </entry>
          <entry>
            <item>행 높이</item>
            <value>52px</value>
            <usage>일반 테이블</usage>
            <rule>텍스트 1줄 기준이며 상세행은 확장한다.</rule>
          </entry>
          <entry>
            <item>셀 패딩</item>
            <value>12px 16px</value>
            <usage>테이블 셀</usage>
            <rule>숫자는 우측 정렬, 텍스트는 좌측 정렬을 기본으로 한다.</rule>
          </entry>
          <entry>
            <item>최소 컬럼 폭</item>
            <value>120px</value>
            <usage>가변 컬럼</usage>
            <rule>주요 식별 컬럼은 180px 이상을 권장한다.</rule>
          </entry>
          <entry>
            <item>선택 컬럼</item>
            <value>44px</value>
            <usage>체크박스 선택</usage>
            <rule>다중 선택이 필요한 화면에서만 사용한다.</rule>
          </entry>
          <entry>
            <item>default</item>
            <value>bg #FFFFFF / header bg #FAF8F4 / border #E7E1D7</value>
            <usage>기본 상태</usage>
            <rule>행 구분은 보더 중심으로 처리하고 zebra를 기본 사용하지 않는다.</rule>
          </entry>
          <entry>
            <item>hover</item>
            <value>row bg #F8FAFC / 120ms</value>
            <usage>마우스 Hover</usage>
            <rule>클릭 가능한 행에만 Hover를 적용한다.</rule>
          </entry>
          <entry>
            <item>active</item>
            <value>row bg #EEF4FF / left border 3px #24385B</value>
            <usage>선택 행</usage>
            <rule>선택 상태는 체크박스 유무와 무관하게 시각화한다.</rule>
          </entry>
          <entry>
            <item>focus</item>
            <value>cell ring inset 0 0 0 2px #8FB4FF</value>
            <usage>키보드 셀 탐색</usage>
            <rule>행 전체보다 현재 셀 위치를 우선 표시한다.</rule>
          </entry>
          <entry>
            <item>disabled</item>
            <value>row text #98A2B3 / actions off</value>
            <usage>잠금 데이터, 권한 제한</usage>
            <rule>비활성 행에는 사유 툴팁을 제공한다.</rule>
          </entry>
          <entry>
            <item>loading</item>
            <value>skeleton rows 5 / 1200ms</value>
            <usage>목록 로딩</usage>
            <rule>기존 행 높이를 유지하여 점프를 막는다.</rule>
          </entry>
          <entry>
            <item>error</item>
            <value>full-row alert 56px / bg #FEF3F2</value>
            <usage>목록 조회 실패</usage>
            <rule>테이블 내부 첫 행에 오류 상태를 삽입하고 재조회 버튼을 제공한다.</rule>
          </entry>
        </entries>
      </subsection>
    </section>
    <section title="운영 특화 UI 패턴" number="7">
      <entries>
        <entry>
          <item>상태 배지</item>
          <value>높이 24px, 패딩 0 10px</value>
          <usage>케이스 상태, 생성 상태</usage>
          <rule>색상만 바꾸지 말고 아이콘 또는 점 표시를 함께 사용한다.</rule>
        </entry>
        <entry>
          <item>스텝퍼</item>
          <value>높이 64px</value>
          <usage>생성/발행 진행</usage>
          <rule>현재 단계는 채움형, 완료 단계는 체크 아이콘, 대기 단계는 선형으로 표시한다.</rule>
        </entry>
        <entry>
          <item>프롬프트 변수 태그</item>
          <value>높이 28px, radius 999px</value>
          <usage>프롬프트 편집</usage>
          <rule>수정 불가능한 시스템 변수는 회색, 편집 가능한 사용자 변수는 브랜드 색상으로 구분한다.</rule>
        </entry>
        <entry>
          <item>Diff 비교 패널</item>
          <value>2열 / 간격 24px</value>
          <usage>초안 비교</usage>
          <rule>변경 문단은 좌우 모두 하이라이트하고, 채택 액션은 중앙 분리선에 둔다.</rule>
        </entry>
        <entry>
          <item>페이지 썸네일 카드</item>
          <value>96px x 136px</value>
          <usage>PDF 썸네일</usage>
          <rule>현재 페이지, 변경 발생 페이지, 오류 페이지를 서로 다른 배지로 구분한다.</rule>
        </entry>
        <entry>
          <item>활동 로그 타임라인</item>
          <value>점 10px, 행 높이 36px</value>
          <usage>작업 이력</usage>
          <rule>시간, 작업자, 액션, 결과를 한 줄에 보여주고 상세는 드로어로 연다.</rule>
        </entry>
      </entries>
    </section>
    <section title="접근성(A11y) 체크리스트" number="8">
      <entries>
        <entry>
          <item>대비비</item>
          <value>4.5:1 이상</value>
          <usage>일반 텍스트</usage>
          <rule>18px 이상 또는 700 굵기 대형 텍스트만 3:1 완화 허용한다.</rule>
        </entry>
        <entry>
          <item>포커스 표시</item>
          <value>4px 링 / #8FB4FF</value>
          <usage>모든 인터랙션 요소</usage>
          <rule>키보드 포커스가 Hover보다 항상 더 강하게 보여야 한다.</rule>
        </entry>
        <entry>
          <item>키보드 탐색</item>
          <value>Tab / Shift+Tab / Enter / Esc</value>
          <usage>앱 전역</usage>
          <rule>모달, 드로어, 메뉴, 테이블 셀 이동까지 모두 키보드로 수행 가능해야 한다.</rule>
        </entry>
        <entry>
          <item>라벨 연결</item>
          <value>for/id 명시</value>
          <usage>Input, Textarea, Select</usage>
          <rule>placeholder를 라벨 대체로 사용하지 않는다.</rule>
        </entry>
        <entry>
          <item>오류 전달</item>
          <value>색상 + 아이콘 + 문장</value>
          <usage>폼, 생성, 발행</usage>
          <rule>오류 상태는 색상만으로 전달하지 않는다.</rule>
        </entry>
        <entry>
          <item>상태 알림</item>
          <value>aria-live="polite"</value>
          <usage>Toast, 자동저장 상태</usage>
          <rule>저장 완료/실패, 생성 완료/실패는 스크린 리더에 읽혀야 한다.</rule>
        </entry>
        <entry>
          <item>모달 포커스 트랩</item>
          <value>필수</value>
          <usage>Modal, Drawer</usage>
          <rule>열린 동안 배경 요소에 포커스가 가면 안 된다.</rule>
        </entry>
        <entry>
          <item>표 구조</item>
          <value>thead / tbody / scope</value>
          <usage>Table</usage>
          <rule>정렬 가능한 컬럼은 현재 정렬 방향을 보조기기에 전달한다.</rule>
        </entry>
        <entry>
          <item>입력 도움말</item>
          <value>aria-describedby</value>
          <usage>헬퍼/오류 텍스트</usage>
          <rule>필드와 설명문은 항상 연결한다.</rule>
        </entry>
        <entry>
          <item>클릭 타깃</item>
          <value>44px 이상</value>
          <usage>버튼, 체크박스, 아이콘</usage>
          <rule>아이콘 단독 버튼도 44px 미만으로 만들지 않는다.</rule>
        </entry>
        <entry>
          <item>모션 감소</item>
          <value>prefers-reduced-motion 대응</value>
          <usage>전환, skeleton</usage>
          <rule>큰 이동 애니메이션과 패럴랙스 효과를 금지한다.</rule>
        </entry>
        <entry>
          <item>언어 설정</item>
          <value>lang="ko"</value>
          <usage>문서 루트</usage>
          <rule>리포트 편집 영역이 다른 언어를 포함하면 구간별 lang 속성을 부여한다.</rule>
        </entry>
      </entries>
    </section>
    <section title="UI QA 체크리스트" number="9">
      <entries>
        <entry>
          <item>해상도 검수</item>
          <value>1024 / 1280 / 1440 / 1680 / 1920px</value>
          <usage>전체 앱</usage>
          <rule>각 해상도에서 가로 스크롤이 없어야 한다.</rule>
        </entry>
        <entry>
          <item>브라우저 검수</item>
          <value>Chrome / Edge 최신 2개 버전</value>
          <usage>PC Web</usage>
          <rule>내부망 환경 기준으로 브라우저 버전을 명시 관리한다.</rule>
        </entry>
        <entry>
          <item>로그인 QA</item>
          <value>실패 3회, 세션 만료, 권한별 메뉴</value>
          <usage>인증</usage>
          <rule>권한 없는 메뉴는 숨김과 직접 접근 차단을 동시에 확인한다.</rule>
        </entry>
        <entry>
          <item>입력 폼 QA</item>
          <value>필수값, 날짜/시간 경계, API 실패</value>
          <usage>고객 데이터</usage>
          <rule>잘못된 생년월일, 시각 누락, 음력/윤달 예외를 검증한다.</rule>
        </entry>
        <entry>
          <item>정규화 QA</item>
          <value>Excel 규칙 매핑, 경고 문구, 로그 순서</value>
          <usage>정규화 엔진</usage>
          <rule>동일 입력값에 동일 결과가 나오는지 회귀 검증한다.</rule>
        </entry>
        <entry>
          <item>생성 QA</item>
          <value>모델 변경, 섹션 재생성, 프롬프트 버전 반영</value>
          <usage>AI 생성</usage>
          <rule>재실행 시 이전 결과와 이력이 분리 저장되는지 확인한다.</rule>
        </entry>
        <entry>
          <item>에디터 QA</item>
          <value>자동저장, 충돌 감지, 주석 완료 처리</value>
          <usage>편집</usage>
          <rule>저장 중 새로고침, 동시 수정, 네트워크 끊김 시나리오를 검증한다.</rule>
        </entry>
        <entry>
          <item>PDF QA</item>
          <value>30p/100p, 폰트 포함, 페이지 번호, 이미지 해상도</value>
          <usage>퍼블리싱</usage>
          <rule>최종 PDF가 300dpi 기준으로 깨지지 않고 페이지 흐름이 유지되는지 확인한다.</rule>
        </entry>
        <entry>
          <item>상태 표시 QA</item>
          <value>대기/진행중/완료/검토필요/실패</value>
          <usage>전역 상태</usage>
          <rule>동일 의미에 서로 다른 색/문구를 쓰지 않도록 상태 사전을 고정한다.</rule>
        </entry>
        <entry>
          <item>접근성 QA</item>
          <value>키보드 전용 사용, 스크린 리더 주요 흐름</value>
          <usage>전역</usage>
          <rule>로그인, 고객 등록, 생성, 발행까지 핵심 플로우를 키보드만으로 재현한다.</rule>
        </entry>
        <entry>
          <item>성능 QA</item>
          <value>첫 화면 3s 이내, 액션 응답 1000ms 이내</value>
          <usage>전역</usage>
          <rule>대기 시간이 길면 skeleton 또는 progress UI를 반드시 제공한다.</rule>
        </entry>
        <entry>
          <item>회귀 QA</item>
          <value>디자인 토큰 일관성</value>
          <usage>전체 UI</usage>
          <rule>임의 HEX 직접 사용을 금지하고 토큰 외 색상 사용 여부를 점검한다.</rule>
        </entry>
      </entries>
    </section>
    <section title="가정(Assumptions)">
      <entries>
        <entry>
          <item>지원 디바이스</item>
          <value>PC Web 전용</value>
          <usage>전체 설계</usage>
          <rule>모바일, 태블릿 전용 레이아웃은 이번 범위에서 제외한다.</rule>
        </entry>
        <entry>
          <item>기본 해상도</item>
          <value>1440px</value>
          <usage>레이아웃 기준</usage>
          <rule>실사용 운영 환경이 노트북+외부 모니터 조합이라고 가정한다.</rule>
        </entry>
        <entry>
          <item>기본 글꼴</item>
          <value>Pretendard Variable 사용 가능</value>
          <usage>UI 전역</usage>
          <rule>내부망 환경에도 설치 또는 웹폰트 제공이 가능하다고 가정한다.</rule>
        </entry>
        <entry>
          <item>인증 체계</item>
          <value>사내 계정 기반 로그인</value>
          <usage>로그인/권한</usage>
          <rule>외부 소셜 로그인이나 고객 셀프 접근은 고려하지 않는다.</rule>
        </entry>
        <entry>
          <item>PDF 규격</item>
          <value>A4 세로 / 300dpi</value>
          <usage>퍼블리싱</usage>
          <rule>30p/100p 모두 동일 규격 템플릿을 사용한다고 가정한다.</rule>
        </entry>
        <entry>
          <item>에디터 방식</item>
          <value>블록형 + 리치텍스트 혼합</value>
          <usage>편집 화면</usage>
          <rule>운영자가 문단 단위 수정과 메타 주석을 모두 수행해야 한다고 가정한다.</rule>
        </entry>
        <entry>
          <item>데이터 볼륨</item>
          <value>동시 사용자 2~3명 / 케이스 목록 수천 건 이하</value>
          <usage>대시보드, 테이블</usage>
          <rule>일반 테이블 + 서버 페이징으로 충분하다고 가정한다.</rule>
        </entry>
        <entry>
          <item>브랜드 방향</item>
          <value>고급 리포트 스튜디오 톤</value>
          <usage>시각 설계</usage>
          <rule>참고 사이트의 전통적 분위기를 직접 복제하지 않고 내부 업무툴에 맞게 절제한다고 가정한다.</rule>
        </entry>
      </entries>
    </section>
  </sections>
</uiux_spec>
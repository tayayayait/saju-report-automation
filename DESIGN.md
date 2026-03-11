# Design System: Saju Report Automation (사주 리포트 자동화)

**Reference Style:** Swiss Style Typography, Bento Grid, Notion/Linear Workspace
**Project Type:** Modern Data Analytics Dashboard / AI Report View
**Target Device:** Desktop-First (넓은 화면을 활용한 3단 분할 레이아웃 중심)

## 1. Visual Theme & Atmosphere

**"Data-Driven Confidence meets Swiss Precision"**

전반적인 분위기는 철저히 이성적이고 분석적입니다. 기존의 어두운(Dark) 명리학적 클리셰를 완전히 벗어던지고, 스위스 디자인 스타일(Swiss Style)의 정갈한 그리드 시스템과 벤토 그리드(Bento Grid) 모듈형 디자인을 결합합니다. 넓은 여백, 명확한 타이포그래피 계층 구조, 그리고 모듈화된 카드 UI를 통해 사용자에게 데이터에 대한 강한 신뢰감과 편안함을 제공합니다.

## 2. Color Palette & Roles

### Base Colors (The Environment)

- **Deep Navy (Primary Background/Text)** (`#1A2B3C`): 매우 짙은 네이비 블루. 지혜와 신뢰, глубо은 분석을 상징합니다. 텍스트의 기본 색상 및 헤더/사이드바 등 무게감이 필요한 요소의 배경으로 사용됩니다.
- **Soft Gray (Canvas/Background)** (`#F8F9FA`): 넓은 배경색으로 사용되어 눈의 피로를 크게 줄입니다. 약간의 따뜻함이 감도는 밝은 회색으로 깨끗한 도화지 역할을 합니다.
- **Pure White (Surface/Card)** (`#FFFFFF`): 벤토 그리드의 각 모듈(카드) 콘텐츠 영역 배경. 배경(Soft Gray)과 분명하게 구분되게 합니다.

### Symbolic Colors (The Five Elements - 오행) & Accents

명리학의 오행을 나타내는 색상은 기존의 원색을 피하고, 모던하고 톤 다운된 컬러로 세련되게 변형합니다.

- **Terracotta (Accent / Earth - 토)** (`#E67E22`): 명리학의 중심인 '토(土)'를 상징하며, 화면 내 가장 중요한 버튼(CTA), 활성 탭, 또는 하이라이트 요소에 사용되는 Primary Accent 컬러입니다.
- **Sage Green (Wood - 목)** (`#5E8B7E`): 차분한 나무의 색. 조화와 안정 뱃지(합)에 사용.
- **Muted Crimson (Fire - 화)** (`#D9534F`): 충돌을 의미하는 경고 뱃지(형, 충, 파, 해) 및 불의 기운에 사용.
- **Champagne Gold (Metal - 금)** (`#D4AF37`): 금속성 기운 및 은은한 강조 요소에 사용.
- **Steel Blue (Water - 수)** (`#4682B4`): 물의 기운 및 정보 지시어(Info)에 사용.

## 3. Typography Rules

- **Primary Font Family:** 인터(Inter) 또는 프리텐다드(Pretendard)와 같은 깔끔하고 장식이 없는 산세리프 폰트.
- **Hierarchy (Swiss Style):**
  - **Headers:** 폰트 크기의 대비를 극대화합니다. 매우 큰 제목과 작고 촘촘한 본문의 대비를 통해 시각적 긴장감을 만듭니다. (Bold, 검은색에 가까운 Navy)
  - **Body Text:** 가독성을 위한 적절한 줄간격 (1.6 이상), 옅은 Navy 또는 Dark Gray (`#4A5568`).
- **Data & Numbers:** 숫자나 핵심 한자(Hanja) 데이터는 `font-mono` 또는 고정폭 느낌을 주어 데이터 분석툴의 전문성을 강조합니다.

## 4. Component Stylings

- **Bento Grid Cards (모듈 패널):**
  - **Shape:** 완벽한 직사각형 또는 약간 둥근 모서리 (`rounded-lg` or `rounded-xl`).
  - **Border & Shadow:** 깊은 그림자를 피하고(Flat Design), 아주 연하고 얇은 테두리(`border-gray-200`)나 1픽셀의 미세한 그림자(`shadow-sm`)만을 사용하여 패널들을 구분.
  - **Padding:** 카드 내부는 여백이 넉넉해야 합니다 (`p-6` or `p-8`).

- **Buttons & Actions:**
  - **Primary Action:** Solid Terracotta (`bg-[#E67E22]`) background, 정교하게 각진 버튼 (또는 약간의 라운드).
  - **Secondary Action:** 투명 배경에 Navy 텍스트, 호버 시 옅은 회색 배경.

- **Inputs/Forms:**
  - 테두리는 얇고 연하게(`border-gray-300`), 포커스 시 Deep Navy 링(`ring-[#1A2B3C]`)으로 단호하게 피드백.

## 5. Layout Principles

- **3-Column Workspace (데스크톱 메인):**
  - Notion이나 Linear 앱처럼 화면 전체(100vw, 100vh)를 쓰는 풀스크린 레이아웃 시스템.
  - **Left (30%):** Data Overview & Navigation (사주 원국, 데이터 리스트, 네비게이션 트리).
  - **Center (45%):** Active Workspace (AI 에디터 캔버스, 리포트 메인 본문).
  - **Right (25%):** Metadata & Preview (PDF 라이브 프리뷰, 설정 패널, 메타 정보).
- **Grid Alignment:** 눈에 보이지 않는 강력한 기준선(Grid)이 존재해 모든 카드와 텍스트가 정확한 열(Column)에 맞물리도록 배치. 빈틈없는 정렬을 추구.

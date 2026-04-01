### reddit_serch 프로젝트 명세서

### 1. 프로젝트 개요
- 1.1. 프로젝트 명: reddit_serch
- 1.2. 프로젝트 목적: Reddit의 특정 커뮤니티 또는 전체를 대상으로 키워드를 검색하고 결과를 카드 형태로 목록화
- 1.3. 주요 특징: API 키 없는 공개 JSON 엔드포인트 활용, 다중 커뮤니티 동시 검색 지원, 카드 UI 출력

### 2. 기술 스택 및 라이브러리
- 2.1. Framework: React 18 (Vite 환경)
- 2.2. Routing: React Router DOM (Home <-> ResultList 전환)
- 2.3. HTTP Client: Axios (데이터 요청 및 인터셉터 활용)
- 2.4. CORS 해결: vite.config.js Proxy 설정 사용 (https://www.reddit.com 우회)
- 2.5. State Management: React Hooks 기반 (useState, useEffect 등)

### 3. 프로젝트 폴더 구조 (권장)
- src/api/redditApi.js (Reddit JSON API 호출 로직 및 URL 파라미터 처리)
- src/components/SearchBar.jsx (검색어 입력 및 고급 설정 UI)
- src/components/CommunitySelector.jsx (커뮤니티 드롭다운 및 직접 입력 필드)
- src/components/ResultCard.jsx (개별 게시글 정보 표시 카드)
- src/pages/Home.jsx (시작 화면)
- src/pages/ResultList.jsx (검색 결과 목록 화면)
- src/App.jsx (전역 라우팅 및 테마 설정)
- src/main.jsx

### 4. 화면 구성 및 디자인 테마

### 4.1. 전역 디자인 테마
- 배경색: 전체 애플리케이션 배경은 Reddit 공식 주황색(#FF4500)으로 설정
- 컴포넌트 색상: Input, Select, Button, Result Card 배경은 흰색(#FFFFFF)으로 설정
- 스타일 규칙: 모든 버튼과 카드에 border-radius: 8px 및 그림자(Shadow) 적용, 반응형 레이아웃 필수

### 4.2. 시작 화면 (Home Page)
- UI 구성: 화면 상단 중앙에 'reddit_serch' 타이틀(Bold, White), 키워드 입력창과 결과 개수 선택 드롭다운 가로 배치
- 커뮤니티 선택: r/all, r/python 등 기본 드롭다운 제공 및 토글 시 직접 입력 모드 전환
- 동작 로직: 검색어와 커뮤니티 설정값을 상태로 저장하여 ResultList 페이지로 전달

### 4.3. 검색 진행 및 결과 화면 (ResultList Page)
- UI 요소: 상단 뒤로 가기 버튼, 검색 정보 표시, 로딩 애니메이션 및 "데이터를 가져오는 중..." 문구 표시
- 결과 카드 디자인: 게시글 커뮤니티명, 제목(Bold), 본문 요약(100자), 원문 바로가기 링크로 구성
- 동작 로직: 전달받은 데이터로 API 호출 후 카드 형태로 렌더링, 클릭 시 해당 게시물 새 탭 열기

### 5. 데이터 통신 및 API 상세
- Proxy 설정: /api/reddit -> https://www.reddit.com 경로 우회
- 엔드포인트: /r/{subreddits}/search.json 사용
- 다중 커뮤니티 처리: r/a; r/b 형태 입력을 a+b 형태로 결합하여 쿼리 생성
- 필수 헤더: Reddit API 정책에 따라 User-Agent: reddit_serch_web_app_1.0 필수 지정

### 6. 기타 제약 사항 및 확장 기능
- 제약 사항: Backend 없이 프론트엔드 Proxy만 사용, API Key 미사용 공개 데이터 활용
- 확장 기능: 정렬 옵션(new/top), NSFW 필터링, localStorage 활용 즐겨찾기, 무한 스크롤 등

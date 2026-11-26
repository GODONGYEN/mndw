# MNDW 기업 홈페이지

Next.js App Router + TypeScript로 구현한 한국어 기업 사이트입니다. 회사 제공 자료가 없는 항목은 만들어 넣지 않습니다.

## 실행

Node.js 20.9 이상과 npm을 사용합니다.

```sh
npm ci
npm run dev
# http://localhost:3000

npm run build
npm start
```

## 대표 로고

사용자가 제공한 흑백 로고 원본을 `public/brand/mndw-logo.png`에 변경 없이 저장했습니다. 첫 화면 중앙과 회사소개에 같은 파일을 사용합니다. 헤더는 MNDW 텍스트만 표시합니다. 원본 크기는 1536×1024이며 레터링을 포함한 전체 이미지 비율을 보존합니다.

`src/content/company.ts`의 `logo` 설정에서 이미지 경로, 크기, 배경색 및 일출 중심을 관리합니다. 현재 해 중심은 원본 기준 가로 58.5%, 세로 68%입니다. 다른 원본으로 교체하면 해당 설정도 함께 갱신한 뒤 다시 빌드하세요.

첫 화면 이미지는 비율을 유지하며 전체가 들어오도록 배치합니다. 이미지 디코딩 후 약 3.2초 동안 배경과 로고 투명도가 부드럽게 변화하며 이미지 자체는 움직이거나 변형되지 않습니다. `prefers-reduced-motion: reduce`에서는 완성된 상태로 시작합니다.

## 회사 자료 입력

**`src/content/company.ts`** 한 곳이 공개 콘텐츠의 원본입니다.

- `services`: slug, name, audience, problem, description, 실제 image/imageAlt, 실제 url, technologyIds
- `technologies`: id, name, problem, reason, serviceSlugs
- `history`: date (`YYYY-MM`), title, description, 선택적 link
- `principles`: 원칙 문장과 evidence 배열 (`title`, `href`)
- `stories`: slug, title, category, date (`YYYY-MM-DD`), image/imageAlt, paragraphs
- `notices`: slug, title, date, paragraphs, resources
- `irResources`, `irEmail`: 확인된 공개 자료와 IR 연락처
- `team`, `workingStyle`, `jobs`: 확인된 팀 정보 및 채용 공고. 공고에는 slug, title, team, description과 선택적 applyUrl을 입력합니다.
- `introduction`: 홈과 회사소개에서 공유하는 게임회사 소개 제목·문단
- `vision`: 승인된 비전 문구

slug는 중복 없이 영문 소문자·숫자·하이픈을 사용하세요. 이미지·PDF 등은 `public/` 아래에 넣고 `/파일명`으로 참조합니다. 외부 URL은 실제 `https://` 주소를 사용하세요. 빈 URL에는 버튼을 만들지 않으며 `javascript:` 주소도 출력하지 않습니다. 원칙의 evidence에는 관련 `/services/slug`, `/stories/slug` 또는 공개 자료 URL을 연결할 수 있습니다.

홈의 서비스는 배열 첫 항목을 대표로 사용합니다. 다른 서비스는 서비스 목록에 함께 표시합니다. 연혁·스토리·투자자 공지는 날짜 내림차순으로 표시합니다. 데이터 변경 뒤 `npm run build`로 홈과 개별 페이지를 함께 갱신합니다. 운영 서버는 재시작합니다.

## 페이지

- `/about`, `/services`, `/technology`, `/sustainability`, `/investors`, `/stories`, `/careers`
- 등록된 데이터의 상세: `/services/[slug]`, `/stories/[slug]`, `/investors/[slug]`, `/careers/[slug]`
- 미등록 상세는 404입니다. 데이터가 비어 있는 홈 섹션은 숨기고 개별 페이지에는 안내를 표시합니다.

## 개발 전용 미리보기

`npm run dev` 상태의 `/preview`에서 가상 서비스·연혁·스토리를 확인합니다. 예시 파일은 `src/content/preview.ts`이며, 모든 화면에 개발 예시 안내가 표시됩니다. `/preview/services/sample`, `/preview/stories/sample`, `/preview/investors/sample`, `/preview/careers/sample`은 상세 배치 확인용입니다. 프로덕션에서는 `/preview`와 하위 경로 모두 404를 반환합니다. 개발 예시를 공개 데이터에 복사하지 마세요.

## 브라우저 검사

Google Chrome이 설치된 환경에서 서버를 먼저 실행합니다.

```sh
# 프로덕션 서버가 localhost:3000에서 실행 중일 때
npm run test:e2e

# 개발 서버가 localhost:3001에서 실행 중일 때
TEST_URL=http://localhost:3001 TEST_PREVIEW=1 npm run test:e2e
```

검사 항목: 7개 페이지 직접 접속·새로고침·뒤로 가기, 1440/390/320px 가로 넘침, 모바일 전체 메뉴와 키보드 포커스·Escape, 애니메이션 중 스크롤·메뉴 사용, 모션 감소 설정, 빈 데이터의 숨김과 안내, 상세 페이지, 프로덕션 예시 차단.

정확한 결과와 미완료 항목은 `VERIFICATION.md`에 기록합니다. 공개 배포는 GitHub Pages를 사용합니다.

## 공개 홈페이지와 배포

- 홈페이지: https://godongyen.github.io/mndw/
- 저장소: https://github.com/GODONGYEN/mndw
- `main` 브랜치에 push하면 GitHub Actions가 자동 빌드·배포합니다.
- 배포용 빌드: `npm run build:pages` (결과: `out/`)
- 기본 경로: `/mndw`. 저장소 이름을 바꾸면 워크플로의 `NEXT_PUBLIC_BASE_PATH`도 변경하세요.
- 공개 데이터가 추가되면 등록된 서비스·스토리·공지·채용 상세도 빌드 시 생성됩니다.
- 개발 미리보기와 예시 이미지는 배포 결과에서 제거합니다.

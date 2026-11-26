import { company, type CompanyContent } from "./company";
// 개발 전용 가상 예시. /preview에서만 사용하며 프로덕션에서는 접근할 수 없습니다.
export const previewContent: CompanyContent = {
  ...company,
  services: [
    {
      slug: "sample",
      name: "레이아웃 확인용 서비스",
      audience: "개발 미리보기를 확인하는 사람",
      problem: "서비스 소개의 읽는 순서와 화면 배치를 확인합니다.",
      description: ["실제 MNDW 서비스가 아닌 개발 전용 예시입니다."],
      image: "/preview-screen.svg",
      imageAlt: "실제 제품이 아닌 화면 배치 예시",
      technologyIds: ["sample-tech"],
    },
  ],
  technologies: [
    {
      id: "sample-tech",
      name: "기술 소개 예시",
      problem: "정보를 이해하기 쉽게 전달하는 방법",
      reason: "문제와 선택 이유를 함께 읽을 수 있는 배치를 확인합니다.",
      serviceSlugs: ["sample"],
    },
  ],
  history: [
    {
      date: "2026-01",
      title: "연혁 항목 예시",
      description: "실제 설립 또는 활동 기록이 아닙니다.",
    },
  ],
  stories: [
    {
      slug: "sample",
      title: "이야기를 담는 자리",
      category: "개발 미리보기",
      date: "2026-01-01",
      image: "/preview-screen.svg",
      imageAlt: "개발 예시 이미지",
      paragraphs: ["실제 기사나 인터뷰가 아닌 상세 페이지 확인용 예시입니다."],
    },
  ],
  notices: [
    {
      slug: "sample",
      title: "공지 레이아웃 예시",
      date: "2026-01-01",
      paragraphs: ["실제 투자 공지가 아닙니다."],
      resources: [],
    },
  ],
  jobs: [
    {
      slug: "sample",
      title: "채용 상세 예시",
      team: "개발 미리보기",
      description: [
        "실제 채용 공고가 아닙니다. 지원 링크는 등록되지 않았습니다.",
      ],
    },
  ],
};

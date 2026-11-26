export type Resource = { title: string; href: string };
export type Service = {
  slug: string;
  name: string;
  audience: string;
  problem: string;
  description: string[];
  image?: string;
  imageAlt?: string;
  url?: string;
  technologyIds: string[];
};
export type Technology = {
  id: string;
  name: string;
  problem: string;
  reason: string;
  serviceSlugs: string[];
};
export type Principle = { id: string; title: string; evidence: Resource[] };
export type Milestone = {
  date: string;
  title: string;
  description: string;
  link?: Resource;
};
export type Story = {
  slug: string;
  title: string;
  category: string;
  date: string;
  image?: string;
  imageAlt?: string;
  paragraphs: string[];
};
export type Notice = {
  slug: string;
  title: string;
  date: string;
  paragraphs: string[];
  resources: Resource[];
};
export type Job = {
  slug: string;
  title: string;
  team: string;
  description: string[];
  applyUrl?: string;
};
export type CompanyContent = {
  name: string;
  meaning: string;
  introduction: { heading: string; paragraphs: string[] };
  vision: string | null;
  logo: {
    src: string;
    width: number;
    height: number;
    background: string;
    sunX: number;
    sunY: number;
  };
  principles: Principle[];
  services: Service[];
  technologies: Technology[];
  history: Milestone[];
  stories: Story[];
  notices: Notice[];
  irResources: Resource[];
  irEmail: string | null;
  team: string | null;
  workingStyle: string[];
  jobs: Job[];
};
// 회사가 확인한 자료만 입력합니다. 배열에 추가한 콘텐츠는 홈과 개별 페이지가 공유합니다.
// 원본 파일을 public/brand/mndw-logo.png에 넣고 실제 크기와 해 중심(0~100%)을 설정하세요.
export const company: CompanyContent = {
  name: "MNDW",
  meaning: "MNDW는 ‘새벽을 여는’이라는 뜻을 담고 있습니다.",
  introduction: {
    heading: "새로운 즐거움의 시작, MNDW",
    paragraphs: [
      "MNDW는 ‘새벽을 여는’이라는 이름으로 새로운 즐거움을 꿈꾸는 게임회사입니다.",
      "게임 속 세계를 발견하는 설렘과 직접 플레이하는 즐거움. 플레이어의 마음에 오래 남는 경험을 만들어가고자 합니다.",
    ],
  },
  vision: null,
  logo: {
    src: "/brand/mndw-logo.png",
    width: 1536,
    height: 1024,
    background: "#ffffff",
    sunX: 58.5,
    sunY: 68,
  },
  principles: [
    {
      id: "lasting",
      title: "오래 쓸 수 있는 서비스를 지향합니다.",
      evidence: [],
    },
    {
      id: "people",
      title: "누가, 어떤 환경에서 사용하는지 먼저 생각합니다.",
      evidence: [],
    },
    {
      id: "trust",
      title: "우리가 내린 결정과 그 이유를 설명할 수 있어야 한다고 믿습니다.",
      evidence: [],
    },
  ],
  services: [],
  technologies: [],
  history: [],
  stories: [],
  notices: [],
  irResources: [],
  irEmail: null,
  team: null,
  workingStyle: [],
  jobs: [],
};
export const navigation = [
  { slug: "about", label: "회사소개", english: "About MNDW" },
  { slug: "services", label: "서비스", english: "Our services" },
  { slug: "technology", label: "기술", english: "Our technology" },
  { slug: "sustainability", label: "지속가능성", english: "Our principles" },
  { slug: "investors", label: "투자정보", english: "Investor relations" },
  { slug: "stories", label: "스토리", english: "MNDW stories" },
  { slug: "careers", label: "채용", english: "Join MNDW" },
];
// javascript: 및 빈 링크는 출력하지 않습니다. 외부 링크는 https URL을 권장합니다.
export function validHref(href?: string): href is string {
  return (
    !!href &&
    (/^https?:\/\/[^\s]+$/.test(href) || /^\/(?!\/)[^\s]*$/.test(href))
  );
}

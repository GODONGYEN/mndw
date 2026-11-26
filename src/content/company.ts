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
  date: string | null;
  dateLabel?: string;
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
  members: { name: string; role: string; email?: string }[];
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
  services: [{
    slug: "poop-wars",
    name: "푸프 워즈 (Poop Wars)",
    audience: "가볍게 접속해 색다른 대결을 즐기고 싶은 플레이어",
    problem: "핑크팀과 민트팀, 3분 동안 펼쳐지는 영역 점령전. 브라우저에서 바로 푸프 워즈를 만나보세요.",
    description: ["푸프 워즈(Poop Wars)는 MNDW가 만든 브라우저 게임입니다. 핑크팀과 민트팀이 펼치는 3분 영역 점령전을 즐길 수 있습니다.", "아래 ‘게임 플레이하기’를 누르면 공개된 게임 페이지로 이동합니다. 게임 화면에서 안내하는 방법에 따라 플레이해 보세요."],
    image: "/games/poop-wars.png",
    imageAlt: "푸프 워즈 공개 웹 게임의 실제 시작 화면",
    url: "https://mndw100.github.io/poop-wars/",
    technologyIds: [],
  }],
  technologies: [],
  history: [
    { date: null, dateLabel: "11월 23일", title: "MNDW 설립", description: "‘새벽을 여는’이라는 이름으로 MNDW의 여정을 시작했습니다." },
    { date: null, dateLabel: "수상", title: "인천대학교 제2회 유니컬쳐 아이디어 챌린지 부문 우수상", description: "인천대학교 제2회 유니컬쳐에서 아이디어 챌린지 부문 우수상을 수상했습니다." },
  ],
  stories: [],
  notices: [],
  irResources: [],
  irEmail: null,
  team: "서로 다른 시선을 모아 하나의 즐거움을 만듭니다. MNDW는 함께 고민하고 직접 만들어가는 게임회사입니다.",
  members: [
    { name: "김건우", role: "대표", email: "rjsdn100@inu.ac.kr" },
    { name: "고동현", role: "사무팀장", email: "god640388@inu.ac.kr" },
    { name: "박강민", role: "마케팅팀장" },
  ],
  workingStyle: [
    "직책보다 아이디어를 먼저 봅니다. 수평적인 관계 속에서 누구나 의견을 제안하고, 더 나은 게임을 위한 질문을 자유롭게 나눕니다.",
    "솔직하게 이야기하고, 서로를 존중합니다. 다른 의견은 더 나은 선택의 출발점입니다. 결정의 이유를 함께 나누고 각자의 역할에 책임을 다합니다.",
    "작게 시도하고, 함께 발전시킵니다. 아이디어를 직접 만들어 보고 플레이하며 얻은 피드백을 다음 개선으로 이어갑니다.",
    "혼자 잘하는 것보다 함께 완성하는 일을 중요하게 생각합니다. 서로의 강점을 보태고 배움을 나누며, 플레이어에게 전할 즐거움을 함께 키웁니다.",
  ],
  jobs: [{
    slug: "always-open",
    title: "다음 즐거움의 시작을 함께할 동료를 찾습니다",
    team: "상시모집 · MNDW",
    description: [
      "좋은 게임은 새로운 시선과 만날 때 시작됩니다. MNDW는 게임을 향한 호기심과 자신만의 아이디어로 다음 장면을 함께 만들어갈 동료를 상시 모집합니다.",
      "어떤 분야에서 무엇을 만들고 싶은지, MNDW와 어떤 즐거움을 나누고 싶은지 들려주세요. 서로의 생각을 존중하며 함께 배우고 만들어가는 분을 기다립니다.",
      "간단한 자기소개와 관심 분야를 이메일로 보내주세요. 보여주고 싶은 작업이나 포트폴리오가 있다면 함께 전달해 주세요.",
      "지원 및 문의: 사무팀장 고동현 · god640388@inu.ac.kr. 모집 분야와 구체적인 참여 조건은 문의를 통해 안내합니다.",
    ],
    applyUrl: "mailto:god640388@inu.ac.kr",
  }],
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
    (/^mailto:[A-Za-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(href) ||
      /^https?:\/\/[^\s]+$/.test(href) || /^\/(?!\/)[^\s]*$/.test(href))
  );
}

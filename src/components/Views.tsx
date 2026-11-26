import { publicPath } from "@/content/paths";
import DawnScene from "./DawnScene";
import Link from "next/link";
import type { CSSProperties } from "react";
import { type CompanyContent, navigation, validHref } from "@/content/company";
import { hasLogo } from "@/content/load";
import Principles from "./Principles";
export function Empty({ children }: { children: React.ReactNode }) {
  return <p className="empty">{children}</p>;
}
export function Resources({
  items,
}: {
  items: { title: string; href: string }[];
}) {
  return (
    <>
      {items
        .filter((r) => validHref(r.href))
        .map((r) => (
          <a className="text-link" key={r.href} href={publicPath(r.href)}>
            {r.title}
          </a>
        ))}
    </>
  );
}
export function Timeline({ data }: { data: CompanyContent }) {
  return (
    <ol className="timeline">
      {[...data.history]
        .sort((a, b) => b.date.localeCompare(a.date))
        .map((item, i) => (
          <li key={`${item.date}-${i}`}>
            <time dateTime={item.date}>{item.date.replace("-", ". ")}</time>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.link && <Resources items={[item.link]} />}
            </div>
          </li>
        ))}
    </ol>
  );
}
export function Services({
  data,
  base = "",
  featured = false,
}: {
  data: CompanyContent;
  base?: string;
  featured?: boolean;
}) {
  return (
    <div className="services-list">
      {(featured ? data.services.slice(0, 1) : data.services).map((s) => (
        <article className="service-feature" key={s.slug}>
          <div>
            <p className="eyebrow">SERVICE</p>
            <h2>{s.name}</h2>
            <p className="audience">{s.audience}을 위한 서비스</p>
            <p>{s.problem}</p>
          </div>
          {s.image && (
            <img
              className="service-image"
              src={publicPath(s.image)}
              alt={s.imageAlt || s.name}
            />
          )}
          <Link className="text-link" href={`${base}/services/${s.slug}`}>
            자세히 보기
          </Link>
        </article>
      ))}
    </div>
  );
}
export function Technologies({
  data,
  ids,
  base = "",
}: {
  data: CompanyContent;
  ids?: string[];
  base?: string;
}) {
  return (
    <div className="technology-list">
      {data.technologies
        .filter((t) => !ids || ids.includes(t.id))
        .map((t) => (
          <article key={t.id}>
            <h3>{t.name}</h3>
            <div>
              <p className="eyebrow">해결하려는 문제</p>
              <p>{t.problem}</p>
              <p className="eyebrow">이 기술을 선택한 이유</p>
              <p>{t.reason}</p>
              {data.services
                .filter((s) => t.serviceSlugs.includes(s.slug))
                .map((s) => (
                  <Link
                    className="text-link"
                    key={s.slug}
                    href={`${base}/services/${s.slug}`}
                  >
                    {s.name}
                  </Link>
                ))}
            </div>
          </article>
        ))}
    </div>
  );
}
export function Home({
  data,
  base = "",
}: {
  data: CompanyContent;
  base?: string;
}) {
  const logo = hasLogo(data);
  const cfg = data.logo;
  return (
    <>
      <DawnScene
        style={
          {
            "--logo-background": cfg.background,
            "--sun-x": `${cfg.sunX}%`,
            "--sun-y": `${cfg.sunY}%`,
            "--logo-ratio": cfg.width / cfg.height,
          } as CSSProperties
        }
      >
        <div className="dawn-atmosphere" aria-hidden="true" />
        <div className="dawn-sky" aria-hidden="true" />
        <div
          className="hero-art"
          style={{ aspectRatio: `${cfg.width}/${cfg.height}` }}
        >
          <div className="dawn-glow" aria-hidden="true" />
          <div className="horizon" aria-hidden="true" />
          {logo && (
            <img
              className="hero-logo"
              src={publicPath(cfg.src)}
              width={cfg.width}
              height={cfg.height}
              alt="페가수스의 날개, 말의 옆모습과 떠오르는 해가 담긴 MNDW 대표 로고"
              fetchPriority="high"
            />
          )}
        </div>
        <h1 className="hero-caption">새벽을 여는 MNDW</h1>
        <div className="hero-bottom">
          <span>새로운 시작을 향하여</span>
          <a href="#introduction">
            스크롤하여 더 알아보기{" "}
            <span aria-hidden="true" className="scroll-line" />
          </a>
          <span lang="en">A NEW DAWN</span>
        </div>
      </DawnScene>
      <section id="introduction" className="intro section">
        <p className="eyebrow">THE MEANING OF MNDW</p>
        <h2>{data.meaning}</h2>
        <div className="intro-lower">
          {logo ? (
            <div className="logo-detail">
              <img
                src={publicPath(cfg.src)}
                alt="페가수스와 떠오르는 해, MNDW 레터링이 담긴 대표 로고"
                width={cfg.width}
                height={cfg.height}
              />
            </div>
          ) : (
            <div className="horizon-study" aria-hidden="true">
              <span />
            </div>
          )}
          <div>
            <h3 className="intro-heading">{data.introduction.heading}</h3>
            {data.introduction.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <Link className="text-link" href={`${base}/about`}>
              MNDW 소개
            </Link>
          </div>
        </div>
      </section>
      <Principles items={data.principles} />
      {!!data.services.length && (
        <section className="section" id="services">
          <Services data={data} base={base} featured />
          {data.services.length > 1 && (
            <Link className="text-link" href={`${base}/services`}>
              모든 서비스 보기
            </Link>
          )}
          {data.technologies.some((t) =>
            data.services[0].technologyIds.includes(t.id),
          ) && (
            <div className="home-technology">
              <p className="eyebrow">BEHIND THE SERVICE</p>
              <h2>서비스를 움직이는 기술</h2>
              <Technologies
                data={data}
                ids={data.services[0].technologyIds}
                base={base}
              />
            </div>
          )}
        </section>
      )}
      {!!data.history.length && (
        <section className="section history">
          <p className="eyebrow">OUR JOURNEY</p>
          <h2>시간 위에 남기는 발자취</h2>
          <Timeline data={data} />
          <Link className="text-link" href={`${base}/about#history`}>
            전체 연혁 보기
          </Link>
        </section>
      )}
      {!!data.stories.length && (
        <section className="section">
          <p className="eyebrow">MNDW STORIES</p>
          <div className="section-title">
            <h2>우리의 이야기</h2>
            <Link className="text-link" href={`${base}/stories`}>
              모든 스토리 보기
            </Link>
          </div>
          <Stories data={data} base={base} limit={3} />
        </section>
      )}
      <section className="next-steps section">
        <p className="eyebrow">WHAT’S NEXT</p>
        <h2>
          다음 이야기를
          <br />
          함께 열어갑니다.
        </h2>
        <div>
          <Link href={`${base}/investors`}>
            <span>투자정보 보기</span>
            <small>공지와 공개 자료</small>
          </Link>
          <Link href={`${base}/careers`}>
            <span>채용 보기</span>
            <small>MNDW와 함께하는 일</small>
          </Link>
        </div>
      </section>
    </>
  );
}
export function Stories({
  data,
  base = "",
  limit,
}: {
  data: CompanyContent;
  base?: string;
  limit?: number;
}) {
  return (
    <div className="story-grid">
      {[...data.stories]
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, limit)
        .map((s) => (
          <Link
            className="story"
            href={`${base}/stories/${s.slug}`}
            key={s.slug}
          >
            {s.image && <img src={publicPath(s.image)} alt={s.imageAlt || s.title} />}
            <p className="eyebrow">
              {s.category} · {s.date}
            </p>
            <h3>{s.title}</h3>
          </Link>
        ))}
    </div>
  );
}
export function SectionPage({
  section,
  data,
  base = "",
}: {
  section: string;
  data: CompanyContent;
  base?: string;
}) {
  const nav = navigation.find((n) => n.slug === section)!;
  const subtitles: Record<string, string> = {
    about: "이름에 담긴 시작의 의미",
    services: "우리가 만드는 것",
    technology: "문제에서 출발하는 기술",
    sustainability: "오래 지켜가고 싶은 원칙",
    investors: "공개된 정보로 만나는 MNDW",
    stories: "이름에서 시작해, 이야기로",
    careers: "함께 만들어갈 다음 장면",
  };
  return (
    <>
      <section className="page-heading section">
        <p className="eyebrow">{nav.english}</p>
        <h1>{nav.label}</h1>
        <p>{subtitles[section]}</p>
      </section>
      <div className="page-body section">
        {section === "about" && (
          <>
            <section className="about-meaning">
              <h2>{data.meaning}</h2>
              <div className="about-introduction">
                <h3>{data.introduction.heading}</h3>
                {data.introduction.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {hasLogo(data) && (
                <img
                  className="about-logo"
                  src={publicPath(data.logo.src)}
                  alt="MNDW 대표 로고"
                />
              )}
              <p>
                페가수스의 날개와 말의 옆모습, 떠오르는 해가 하나의 로고에 담겨
                있습니다.
              </p>
            </section>
            <section>
              <p className="eyebrow">VISION</p>
              <h2>우리가 향하는 곳</h2>
              {data.vision ? (
                <p>{data.vision}</p>
              ) : (
                <Empty>비전에 관한 자세한 소개는 준비 중입니다.</Empty>
              )}
            </section>
            <section id="history">
              <p className="eyebrow">OUR JOURNEY</p>
              <h2>회사 연혁</h2>
              {data.history.length ? (
                <Timeline data={data} />
              ) : (
                <Empty>현재 공개된 회사 연혁이 없습니다.</Empty>
              )}
            </section>
          </>
        )}
        {section === "services" &&
          (data.services.length ? (
            <Services data={data} base={base} />
          ) : (
            <Empty>
              현재 공개된 서비스가 없습니다. 서비스 소개와 이용 링크는 공개 시
              이곳에서 안내합니다.
            </Empty>
          ))}
        {section === "technology" &&
          (data.technologies.length ? (
            <Technologies data={data} base={base} />
          ) : (
            <Empty>
              현재 공개된 기술 소개가 없습니다. 해결하려는 문제와 기술 선택
              이유를 함께 전하겠습니다.
            </Empty>
          ))}
        {section === "investors" && (
          <>
            <section>
              <h2>투자자 공지</h2>
              {data.notices.length ? (
                <div className="row-list">
                  {[...data.notices]
                    .sort((a, b) => b.date.localeCompare(a.date))
                    .map((n) => (
                      <Link key={n.slug} href={`${base}/investors/${n.slug}`}>
                        <time>{n.date}</time>
                        <h3>{n.title}</h3>
                      </Link>
                    ))}
                </div>
              ) : (
                <Empty>현재 공개된 투자자 공지가 없습니다.</Empty>
              )}
            </section>
            <section>
              <h2>공개 자료</h2>
              {data.irResources.length ? (
                <Resources items={data.irResources} />
              ) : (
                <Empty>현재 공개된 투자 자료가 없습니다.</Empty>
              )}
            </section>
            <section>
              <h2>IR 연락처</h2>
              {data.irEmail &&
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.irEmail) ? (
                <a className="text-link" href={`mailto:${data.irEmail}`}>
                  {data.irEmail}
                </a>
              ) : (
                <Empty>현재 등록된 IR 연락처가 없습니다.</Empty>
              )}
            </section>
          </>
        )}
        {section === "stories" &&
          (data.stories.length ? (
            <Stories data={data} base={base} />
          ) : (
            <Empty>
              현재 공개된 스토리가 없습니다. 브랜드 이야기, 팀 인터뷰와 서비스
              개발 기록을 이곳에서 전합니다.
            </Empty>
          ))}
        {section === "careers" && (
          <>
            <section>
              <h2>우리의 팀</h2>
              {data.team ? (
                <p>{data.team}</p>
              ) : (
                <Empty>팀 소개를 준비하고 있습니다.</Empty>
              )}
            </section>
            <section>
              <h2>일하는 방식</h2>
              {data.workingStyle.length ? (
                data.workingStyle.map((p) => <p key={p}>{p}</p>)
              ) : (
                <Empty>일하는 방식에 관한 자세한 소개는 준비 중입니다.</Empty>
              )}
            </section>
            <section>
              <h2>채용 공고</h2>
              {data.jobs.length ? (
                <div className="row-list">
                  {data.jobs.map((j) => (
                    <Link key={j.slug} href={`${base}/careers/${j.slug}`}>
                      <small>{j.team}</small>
                      <h3>{j.title}</h3>
                    </Link>
                  ))}
                </div>
              ) : (
                <Empty>현재 공개된 채용 공고가 없습니다.</Empty>
              )}
            </section>
          </>
        )}
      </div>
      {section === "sustainability" && (
        <Principles items={data.principles} full />
      )}
    </>
  );
}
export function findDetail(
  data: CompanyContent,
  section: string,
  slug: string,
) {
  switch (section) {
    case "services":
      return data.services.find((s) => s.slug === slug);
    case "stories":
      return data.stories.find((s) => s.slug === slug);
    case "investors":
      return data.notices.find((s) => s.slug === slug);
    case "careers":
      return data.jobs.find((s) => s.slug === slug);
    default:
      return undefined;
  }
}
export function Detail({
  data,
  section,
  slug,
  base = "",
}: {
  data: CompanyContent;
  section: string;
  slug: string;
  base?: string;
}) {
  const item = findDetail(data, section, slug)!;
  const title = "name" in item ? item.name : item.title;
  const paragraphs = "description" in item ? item.description : item.paragraphs;
  return (
    <article className="detail section">
      <Link className="text-link" href={`${base}/${section}`}>
        {navigation.find((n) => n.slug === section)?.label} 목록
      </Link>
      <p className="eyebrow">
        {"category" in item
          ? item.category
          : "team" in item
            ? item.team
            : section}
      </p>
      <h1>{title}</h1>
      {"date" in item && <time>{item.date}</time>}
      {"audience" in item && <p>{item.audience}을 위한 서비스</p>}
      {"problem" in item && <h2>{item.problem}</h2>}
      {"image" in item && item.image && (
        <img src={publicPath(item.image)} alt={item.imageAlt || title} />
      )}
      <div className="prose">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {"url" in item && validHref(item.url) && (
        <a className="button-link" href={publicPath(item.url)}>
          서비스 이용하기
        </a>
      )}
      {"applyUrl" in item && validHref(item.applyUrl) && (
        <a className="button-link" href={publicPath(item.applyUrl)}>
          지원하기
        </a>
      )}
      {"technologyIds" in item && (
        <Technologies data={data} ids={item.technologyIds} base={base} />
      )}
      {"resources" in item && <Resources items={item.resources} />}
    </article>
  );
}

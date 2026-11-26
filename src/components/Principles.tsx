"use client";
import { useEffect, useRef, useState } from "react";
import { type Principle, validHref } from "@/content/company";
export default function Principles({
  items,
  full = false,
}: {
  items: Principle[];
  full?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const nodes = root.current?.querySelectorAll("article");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting)
            setActive(Number((entry.target as HTMLElement).dataset.index));
      },
      { rootMargin: "-25% 0px -35% 0px", threshold: 0 },
    );
    nodes?.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);
  return (
    <section className="principles section" id="principles">
      <div className="principle-heading">
        <p className="eyebrow">OUR PRINCIPLES</p>
        <h2>
          우리가 중요하게{" "}
          <br />
          여기는 것
        </h2>
        <p>
          더 나은 내일을 향한
          <br />
          우리의 세 가지 원칙.
        </p>
        <div className="principle-progress" aria-hidden="true">
          {items.map((p, i) => (
            <span key={p.id} className={i === active ? "active" : ""} />
          ))}
        </div>
      </div>
      <div className="principle-list" ref={root}>
        {items.map((p, i) => (
          <article
            key={p.id}
            id={p.id}
            data-index={i}
            className={active === i ? "is-active" : ""}
          >
            <h3>{p.title}</h3>
            {p.evidence
              .filter((r) => validHref(r.href))
              .map((r) => (
                <a className="text-link" key={r.href} href={r.href}>
                  {r.title}
                </a>
              ))}
            {full && !p.evidence.length && (
              <p>이 원칙과 관련해 현재 공개된 활동·근거 자료가 없습니다.</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

import { notFound } from "next/navigation";
import { getContent } from "@/content/load";
import { navigation } from "@/content/company";
import { Home, SectionPage, Detail, findDetail } from "@/components/Views";
export const dynamic = "force-static";
export function generateStaticParams() { return [{ path: [] }]; }
export const metadata = {
  title: "개발 미리보기",
  robots: { index: false, follow: false },
};
export default async function Preview({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}) {
  if (process.env.NODE_ENV !== "development") notFound();
  const { path = [] } = await params;
  const data = await getContent(true);
  if (
    path.length > 2 ||
    (path.length === 1 && !navigation.some((n) => n.slug === path[0])) ||
    (path.length === 2 && !findDetail(data, path[0], path[1]))
  )
    notFound();
  return (
    <>
      <aside className="preview-banner">
        개발 전용 미리보기 · 아래 예시는 실제 회사 자료가 아닙니다.
      </aside>
      {!path.length ? (
        <Home data={data} base="/preview" />
      ) : path.length === 1 ? (
        <SectionPage data={data} section={path[0]} base="/preview" />
      ) : (
        <Detail data={data} section={path[0]} slug={path[1]} base="/preview" />
      )}
    </>
  );
}

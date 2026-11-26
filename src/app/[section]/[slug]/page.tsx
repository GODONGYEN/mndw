import { notFound } from "next/navigation";
import { getContent } from "@/content/load";
import { Detail, findDetail } from "@/components/Views";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  const item = findDetail(await getContent(), section, slug);
  return {
    title: item
      ? "name" in item
        ? item.name
        : item.title
      : "페이지를 찾을 수 없습니다",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  const data = await getContent();
  if (!findDetail(data, section, slug)) notFound();
  return <Detail data={data} section={section} slug={slug} />;
}

export const dynamicParams = false;
export async function generateStaticParams() {
  const data = await getContent();
  const routes = [
    ...data.services.map(({ slug }) => ({ section: "services", slug })),
    ...data.stories.map(({ slug }) => ({ section: "stories", slug })),
    ...data.notices.map(({ slug }) => ({ section: "investors", slug })),
    ...data.jobs.map(({ slug }) => ({ section: "careers", slug })),
  ];
  // Next export needs one param even with no published records. This produces
  // only a not-found result, never a public sample detail page.
  return routes.length ? routes : [{ section: "services", slug: "_unpublished" }];
}

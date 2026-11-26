import { notFound } from "next/navigation";
import { navigation } from "@/content/company";
import { getContent } from "@/content/load";
import { SectionPage } from "@/components/Views";
export function generateStaticParams() {
  return navigation.map((n) => ({ section: n.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  return {
    title:
      navigation.find((n) => n.slug === section)?.label ||
      "페이지를 찾을 수 없습니다",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!navigation.some((n) => n.slug === section)) notFound();
  return <SectionPage section={section} data={await getContent()} />;
}

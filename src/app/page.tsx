import { Home } from "@/components/Views";
import { getContent } from "@/content/load";
export default async function Page() {
  return <Home data={await getContent()} />;
}

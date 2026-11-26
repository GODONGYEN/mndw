import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";
import { company, type CompanyContent } from "./company";
export function hasLogo(data: CompanyContent) {
  return existsSync(path.join(process.cwd(), "public", data.logo.src));
}
export async function getContent(preview = false): Promise<CompanyContent> {
  if (preview && process.env.NODE_ENV === "development")
    return (await import("./preview")).previewContent;
  return company;
}

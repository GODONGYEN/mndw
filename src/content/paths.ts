// Next Link prefixes its own routes; native images and links need the prefix.
export function publicPath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return path.startsWith("/") && !path.startsWith("//") ? `${base}${path}` : path;
}

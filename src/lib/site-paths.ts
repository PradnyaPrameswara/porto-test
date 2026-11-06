// Preserve root URLs locally and prefix internal links for Pages previews.
const base = import.meta.env.BASE_URL.replace(/\/+$/, "")

export function sitePath(path: string): string {
  const pathname = path.startsWith("/") ? path : `/${path}`
  return `${base}${pathname}`
}

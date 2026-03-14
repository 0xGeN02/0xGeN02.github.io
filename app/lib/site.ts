const rawBasePath = "";

export const SITE_BASE_PATH = rawBasePath.endsWith("/")
  ? rawBasePath.slice(0, -1)
  : rawBasePath;

export function withBasePath(path: string) {
  if (!path) return SITE_BASE_PATH || "/";
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return SITE_BASE_PATH ? `${SITE_BASE_PATH}${normalized}` : normalized;
}

export const API_BASE_URL: string = (
  process.env.NEXT_PUBLIC_API_BASE_URL || ""
).replace(/\/+$/, "/");

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined in environment variables");
}

export function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${API_BASE_URL}${normalizedPath}`;
}

export type ApiError = Error & { status?: number; details?: unknown };
export const API_BASE_URL: string = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://mediacargo-be.vercel.app/api/")
  .replace(/\/+$/, "/");

export function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${API_BASE_URL}${normalizedPath}`;
}

export type ApiError = Error & { status?: number; details?: unknown };



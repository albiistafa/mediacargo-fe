import { buildApiUrl, ApiError } from "./config";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type RequestOptions = {
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined | null>;
  signal?: AbortSignal;
};

export type JsonBody = unknown;

function buildQuery(query?: RequestOptions["query"]): string {
  if (!query) return "";
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    params.append(key, String(value));
  });
  const s = params.toString();
  return s ? `?${s}` : "";
}

async function parseJson<T>(res: Response): Promise<T> {
  const ct = res.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) {
    return (await res.json()) as T;
  }
  return undefined as unknown as T;
}

export class HttpClient {
  private defaultHeaders: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  constructor(private readonly getToken?: () => string | undefined) {}

  private buildHeaders(extra?: Record<string, string>): Headers {
    const headers = new Headers({ ...this.defaultHeaders, ...(extra ?? {}) });
    const token = this.getToken?.();
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  }

  private async request<T>(method: HttpMethod, path: string, body?: JsonBody, options?: RequestOptions): Promise<T> {
    const url = `${buildApiUrl(path)}${buildQuery(options?.query)}`;
    const res = await fetch(url, {
      method,
      headers: this.buildHeaders(options?.headers),
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: options?.signal,
      cache: "no-store",
    });
    if (!res.ok) {
      let err: ApiError = new Error(`HTTP ${res.status}`);
      err.status = res.status;
      try {
        const data = await parseJson<{ message?: string; details?: unknown }>(res);
        if (data?.message) err.message = data.message;
        if (data?.details) err.details = data.details;
      } catch {
        // ignore
      }
      throw err;
    }
    return await parseJson<T>(res);
  }

  get<T>(path: string, options?: RequestOptions) {
    return this.request<T>("GET", path, undefined, options);
  }
  post<T>(path: string, body?: JsonBody, options?: RequestOptions) {
    return this.request<T>("POST", path, body, options);
  }
  patch<T>(path: string, body?: JsonBody, options?: RequestOptions) {
    return this.request<T>("PATCH", path, body, options);
  }
  delete<T>(path: string, options?: RequestOptions) {
    return this.request<T>("DELETE", path, undefined, options);
  }
}

let authToken: string | undefined;
export function setAuthToken(token?: string) {
  authToken = token;
}
export const http = new HttpClient(() => authToken);



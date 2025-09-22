import { http, setAuthToken } from "../lib/api/httpClient";

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export async function login(email: string, password: string) {
  const res = await http.post<LoginResponse>("/admin/login", { email, password });
  setAuthToken(res.token); 
  return res;
}

export async function register(name: string, email: string, password: string) {
  return await http.post("/admin/register", { name, email, password });
}

export function logout() {
  setAuthToken(undefined);
  localStorage.removeItem("token");
}

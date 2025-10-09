"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth.services";
import { setToken } from "@/lib/auth-helpers"; // pakai helper baru dari js-cookie

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
  const data = await login(email, password);

  // Ambil token dari response yang benar
  const token = data?.data?.token;
  if (!token) throw new Error("Token tidak ditemukan di response API");

  // Simpan token ke cookies (1 hari)
  setToken(token, 1);

  setSuccess(true);

  // Redirect ke dashboard
  setTimeout(() => {
    router.push("/dashboard");
    router.refresh(); // supaya state auth langsung terupdate
  }, 800);
} catch (err: any) {
  setError(err.response?.data?.message || err.message || "Login gagal");
} finally {
  setLoading(false);
}

  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    success,
    handleSubmit,
  };
}

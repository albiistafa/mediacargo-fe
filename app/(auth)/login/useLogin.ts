"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      setSuccess(true);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login gagal");
      setLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, loading, success, error, handleSubmit };
}

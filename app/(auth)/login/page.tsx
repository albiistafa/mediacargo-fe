"use client";
import Topbar from "@/app/components/topbar";
import Footer from "@/app/components/footer";
import { useLogin } from "@/app/(auth)/login/useLogin";

export default function LoginPage() {
  const { email, setEmail, password, setPassword, handleSubmit, loading, success, error } = useLogin();

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Masuk
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {success ? (
                "Berhasil Login!"
              ) : loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            Lupa password?{" "}
            <a href="/auth/register" className="text-blue-600 hover:underline">
              Ubah password
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        {/* Welcome Text */}
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">Selamat Datang</h1>
          <p className="text-xl text-gray-600">
            Situs Tracking PT. Media Realindo Express
          </p>
        </div>
        <Link
          href="/login"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
        >
          Login
        </Link>
      </div>
    </main>
  );
}

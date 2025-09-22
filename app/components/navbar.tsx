'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Navbar = () => {
const pathname = usePathname();

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
            {/* Logo and Brand */}
            <div className="flex items-center gap-2">
                <div className="text-blue-600">
                    <Image
                        src="/mediacargo.svg"
                        alt="MediaCargo Logo"
                        width={24}
                        height={24}
                    />
                </div>
                <Link href="/" className="text-xl font-semibold">
                    MediaCargo
                </Link>
            </div>

            {/* Daftar Navigasi */}
            <div className="flex gap-8">
                <Link href="/dashboard" 
                className={`font-medium ${pathname === '/dashboard' 
                        ? 'text-blue-600 text-decoration-2 underline decoration-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                >
                    Dashboard
                </Link>
                <Link href="/laporan" 
                className={`font-medium ${pathname === '/laporan' 
                        ? 'text-blue-600 text-decoration-2 underline decoration-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                >
                    Laporan
                </Link>
                <Link href="/input-data" 
                className={`font-medium ${pathname === '/input-data' 
                        ? 'text-blue-600 text-decoration-2 underline decoration-blue-600'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                >
                    Input Data
                </Link>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                    {/* Add user avatar image here if available */}
                </div>
                <span className="font-medium">Berlian</span>
                <button className="text-gray-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 3v18M3 12h18" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
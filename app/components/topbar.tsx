import Link from 'next/link';
import Image from 'next/image';
const Topbar = () => {
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

        </nav>
    );
};

export default Topbar;
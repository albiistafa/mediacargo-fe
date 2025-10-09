import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Daftar path yang memerlukan autentikasi
const protectedPaths = ['/dashboard', '/laporan', '/input-data', '/account'];

// Daftar path yang hanya bisa diakses oleh user yang belum login
const authPaths = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Cek apakah user memiliki token
  const token = request.cookies.get('token')?.value;
  
  // Alternatif: jika menggunakan localStorage, kita perlu cek di client side
  // Untuk server-side middleware, kita gunakan cookies
  
  // Cek apakah path memerlukan autentikasi
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  const isAuthPath = authPaths.some(path => pathname.startsWith(path));
  
  // Jika mengakses protected path tanpa token, redirect ke login
  if (isProtectedPath && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // Jika sudah login dan mencoba akses halaman auth, redirect ke dashboard
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// Konfigurasi matcher untuk menentukan path mana yang akan diproses middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
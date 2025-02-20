import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';


export async function middleware(request) {
  const isLoginPage = request.nextUrl.pathname === '/login';
  const isRegisterPage = request.nextUrl.pathname === '/register';
  const isPublicAsset = request.nextUrl.pathname.startsWith('/public/') || 
                        request.nextUrl.pathname.startsWith('/_next/') ||
                        request.nextUrl.pathname.startsWith('/uploads') ||
                        request.nextUrl.pathname.startsWith('/img/');
  
  if (isPublicAsset) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;

  const decodedToken = token ? await verifyToken(token) : null;
  
  const isLoggedIn = !!decodedToken;

  if (!isLoggedIn && !isLoginPage && !isRegisterPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/img/:path*'
  ],
};
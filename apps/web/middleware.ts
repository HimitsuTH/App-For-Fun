import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // เช็ค connect.sid ซึ่งเป็น cookie ที่ Express session ใช้จริงๆ
  const isAuthenticated = request.cookies.get('connect.sid');

  if (isAuthenticated) {
    // login อยู่แล้ว ไม่ให้เข้าหน้า login/signup → redirect ไป home
    if (PUBLIC_PATHS.includes(pathname)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    // ยังไม่ได้ login → redirect ไป /login ทันทีโดยไม่ต้องรอ API
    if (!PUBLIC_PATHS.includes(pathname)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

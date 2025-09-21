// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('middleware ----------------------->',request)
  const isAuthenticated = request.cookies.get('session-token'); // Replace with your actual auth check

  // If user is authenticated
  if (isAuthenticated) {
    // If they try to go to the login page, redirect them to a protected page
    if (pathname === '/login' || pathname === '/signup') {
      return NextResponse.redirect(new URL('/test', request.url));
    }
  } else {
    // If not authenticated, and they are trying to access a protected page,
    // redirect them to the login page.
    // Example: Check if the path starts with /test
    if (pathname.startsWith('/test')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes except API routes, static files, etc.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
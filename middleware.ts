import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Redirect old product routes to new ones
  if (pathname === '/auto') {
    return NextResponse.redirect(new URL('/products/auto', request.url));
  }
  
  if (pathname === '/home') {
    return NextResponse.redirect(new URL('/products/home', request.url));
  }
  
  if (pathname === '/life') {
    return NextResponse.redirect(new URL('/products/term-life', request.url));
  }
  
  if (pathname === '/health') {
    return NextResponse.redirect(new URL('/products/supplemental-health', request.url));
  }
  
  if (pathname === '/term') {
    return NextResponse.redirect(new URL('/products/term-life', request.url));
  }
  
  if (pathname === '/permanent-life') {
    return NextResponse.redirect(new URL('/products/permanent-life', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/auto',
    '/home',
    '/life',
    '/health',
    '/term',
    '/permanent-life',
  ],
}; 
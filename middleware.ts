import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const publicRoutes = ['/', '/events/:id', '/api/webhook/clerk', '/api/webhook/stripe', '/api/uploadthing'];
  const url = req.nextUrl.pathname;

  // Handle public routes
  if (publicRoutes.includes(url) || publicRoutes.some(route => url.startsWith(route))) {
    return NextResponse.next();
  }

  // Handle authentication check or other logic
  const token = req.headers.get('authorization');
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

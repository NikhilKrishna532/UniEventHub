import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const publicRoutes = ['/', '/events/:id', '/api/webhook/clerk', '/api/webhook/stripe', '/api/uploadthing'];
  const url = req.nextUrl.pathname;

  // Check if the route is public
  if (publicRoutes.includes(url)) {
    return NextResponse.next();
  }

  // Implement custom logic here, e.g., redirect to login if not authenticated
  // Example: check for an auth token
  const token = req.headers.get('authorization');
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

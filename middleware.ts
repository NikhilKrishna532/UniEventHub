import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;

  // Example: Allow access to public routes
  if (['/', '/events/:id', '/api/webhook/clerk', '/api/webhook/stripe', '/api/uploadthing'].includes(url)) {
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

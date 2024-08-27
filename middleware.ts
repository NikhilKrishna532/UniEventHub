import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes using createRouteMatcher
const isPublicRoute = createRouteMatcher([
  '/',
  '/events/:id',
  '/api/webhook/clerk',
  '/api/webhook/stripe',
  '/api/uploadthing'
]);

export default clerkMiddleware((auth, request) => {
  // Protect routes that are not public
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

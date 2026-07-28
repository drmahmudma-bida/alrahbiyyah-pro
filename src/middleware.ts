import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define the routes that anyone can see without logging in
const isPublicRoute = createRouteMatcher([
  '/', 
  '/pro(.*)', // This makes /pro and anything under it completely public!
  '/api/webhook(.*)'
]);

// 2. Protect everything ELSE using the new async syntax
export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

// 3. Next.js routing configuration
export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
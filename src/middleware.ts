import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Tell the security guard exactly which folders are locked
const isProtectedRoute = createRouteMatcher(['/pro(.*)']);

// 2. Check every single visitor before they load the page
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // If they try to enter /pro and are not logged in, kick them to the secure login screen
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
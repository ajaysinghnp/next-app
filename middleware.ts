import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  dashboardPrefix,
  loginRoute,
  publicRoutes,
} from "@/config/routes";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  // const isAdminRoute = nextUrl.pathname.startsWith(adminPrefix)
  const isDashboardRoute = nextUrl.pathname.startsWith(dashboardPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return void 0;
  }

  if (isAuthRoute) {
    if (isAuthenticated) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return void 0;
  }

  if (isAuthenticated && isDashboardRoute) {
    return void 0;
  }

  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL(loginRoute, nextUrl));
  }

  return void 0;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

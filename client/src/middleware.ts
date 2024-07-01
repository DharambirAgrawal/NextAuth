import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  DEFAULT_LOGOUT_REDIRECT,
} from "@/routes";
const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  // return;
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;
  //we are not protecting api and public of auth route
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  console.log({ isLoggedIn, isAuthRoute, isApiAuthRoute });

  if (isApiAuthRoute) {
    return;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      //if we are logged in we dont want to send them to login or register page so redirecting them
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }
  if (!isLoggedIn && !isPublicRoute) {
    // if we anr not logged in and not in public route then we will redirect them to login page
    return Response.redirect(new URL(DEFAULT_LOGOUT_REDIRECT, nextUrl));
  }
  return;
  // return null;
  console.log("ROUTE:", req.nextUrl.pathname);
  console.log("IS LOGGEDIN:", isLoggedIn);
});

export const config = {
  //invoke middleware every where
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

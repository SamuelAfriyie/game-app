import NextAuth from "next-auth";

import authConfig from "@/auth.config";

import { NextResponse } from "next/server";
import {
  DEFAULT_LOGIN_REDIRECT_MAIN,
  DEFAULT_LOGIN_REDIRECT_SUB,
  PAGE_NOT_FOUND,
  protectedMainRoutes,
  protectedRoutes,
  protectedSubRoutes,
} from "./routes";
import { getSeverSession } from "./hooks/custom/use_session";

const { auth } = NextAuth(authConfig);

export default auth(async (req: any, ctx: any) => {
  let { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const { pathname } = req.nextUrl;
  const role = await getSeverSession("role");

  const isMain = role === process.env.MAIN_ROLE;
  if (isAuthenticated && pathname === "/") {
    if (isMain) {
      nextUrl.pathname = DEFAULT_LOGIN_REDIRECT_MAIN;
    } else {
      nextUrl.pathname = DEFAULT_LOGIN_REDIRECT_SUB;
    }
    return NextResponse.redirect(nextUrl);
  }

  const isMainProtected = Object.values(protectedMainRoutes).includes(pathname);
  if (isAuthenticated && !isMain && isMainProtected) {
    nextUrl.pathname = PAGE_NOT_FOUND;
    return NextResponse.redirect(nextUrl);
  }

  const isSub = role === process.env.SUB_ROLE;
  const isSubProtected = Object.values(protectedSubRoutes).includes(pathname);
  if (isAuthenticated && !isSub && isSubProtected) {
    nextUrl.pathname = PAGE_NOT_FOUND;
    return NextResponse.redirect(nextUrl);
  }

  const isProtected = Object.values(protectedRoutes).includes(pathname);
  if (!isAuthenticated && isProtected) {
    nextUrl.pathname = "/signin";
    return NextResponse.redirect(nextUrl);
  }

  if (!isAuthenticated && pathname === "/") {
    nextUrl.pathname = "/signin";
    return NextResponse.redirect(nextUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

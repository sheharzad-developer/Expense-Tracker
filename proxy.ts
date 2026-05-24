import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const path = req.nextUrl.pathname;
  const isProtected =
    path.startsWith("/dashboard") || path.startsWith("/transactions");

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (path === "/" && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
});

export const config = {
  matcher: ["/", "/dashboard/:path*", "/transactions/:path*"],
};

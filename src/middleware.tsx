import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get("ACCESS_TOKEN")?.value;

  const pathname = request.nextUrl.pathname;


  const authRoutes = ["/login", "/register"];


  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/chats", request.url));
  }

  const protectedRoutes = ["/chats", "/profile"];
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chats/:path*", "/profile/:path*", "/login", "/register"],
};

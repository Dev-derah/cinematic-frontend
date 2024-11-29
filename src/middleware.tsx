import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Read the access token from cookies
  const token = request.cookies.get("ACCESS_TOKEN")?.value;

  const protectedRoutes = ["/chats", "/profile"];

  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (token && request.nextUrl.pathname === "/login") {
      return NextResponse.redirect(new URL("/chats", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chats/:path*", "/profile/:path*"],
};

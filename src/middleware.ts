import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userId = request.cookies.get('userId');
  const username = request.cookies.get('username');

  if (!userId || !username) {
    return NextResponse.redirect(new URL('/Signup', request.url));
  }
}

export const config = {
  matcher: '/'
}
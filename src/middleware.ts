// Middleware desactivado temporalmente - el locale se maneja solo por cookies
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Pasar sin modificar - el locale se lee desde cookies en request.ts
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|imgs).*)'],
};

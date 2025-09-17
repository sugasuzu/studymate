// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 保護されたルートのパターン
const protectedPaths = [
  '/my',
  '/settings',
  '/subjects/:path*/reviews/new',
  '/my/:path*',
];

// 認証が必要ないパブリックなルート
const publicPaths = [
  '/',
  '/auth/login',
  '/auth/signup',
  '/auth/reset-password',
  '/auth/verify-email',
  '/terms',
  '/privacy',
  '/contact',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 静的ファイルは除外
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // TODO: Firebase Authのセッション確認ロジックを実装
  // ここではクッキーまたはJWTトークンでの認証チェックを行う

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

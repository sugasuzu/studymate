// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  const pathname = request.nextUrl.pathname;

  // 認証不要なパス
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

  // パスが認証不要リストに含まれているかチェック
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // メール認証関連のパラメータがある場合は通す
  if (
    pathname === '/auth/verify-email' &&
    request.nextUrl.searchParams.has('oobCode')
  ) {
    return NextResponse.next();
  }

  // 認証が必要なパスにアクセスしようとしている場合
  if (!isPublicPath && !session) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // セッションがある場合、ユーザー情報をヘッダーに追加
  if (session) {
    try {
      // セッショントークンから基本情報を取得
      const token = session.value;
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));

        // ヘッダーにユーザー情報を追加
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-user-uid', payload.sub || '');
        requestHeaders.set('x-user-email', payload.email || '');
        requestHeaders.set(
          'x-user-email-verified',
          String(payload.email_verified || false)
        );
        requestHeaders.set('x-user-name', payload.name || '');

        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
      }
    } catch (error) {
      console.error('Middleware error:', error);
    }
  }

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

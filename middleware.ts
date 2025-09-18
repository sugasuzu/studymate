// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionCookieEdge } from './src/lib/auth-edge';

// 認証が必要なパス
const PROTECTED_PATHS = ['/my', '/questionnaire'];

// 認証済みユーザーがアクセスできないパス
const AUTH_PAGES = ['/auth/login', '/auth/signup', '/auth/reset-password'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 静的ファイルやAPIはスキップ
  if (
    pathname.includes('/_next') ||
    pathname.includes('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const session = request.cookies.get('session');
  const isProtectedPath = PROTECTED_PATHS.some((path) =>
    pathname.startsWith(path)
  );
  const isAuthPage = AUTH_PAGES.some((path) => pathname.startsWith(path));

  // セッションがない場合
  if (!session?.value) {
    // 保護されたパスならログインへリダイレクト
    if (isProtectedPath) {
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // セッションがある場合、検証
  try {
    const decodedToken = await verifySessionCookieEdge(session.value);

    if (!decodedToken) {
      // 無効なセッションをクリア
      const response = NextResponse.next();
      response.cookies.delete('session');

      if (isProtectedPath) {
        const url = new URL('/auth/login', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
      }

      return response;
    }

    // 認証済みユーザーが認証ページにアクセスした場合
    if (isAuthPage) {
      return NextResponse.redirect(new URL('/my', request.url));
    }

    // メール未認証でも/myへのアクセスは許可（警告を表示）
    // プロフィール未完成でも/myへのアクセスは許可（警告を表示）

    return NextResponse.next();
  } catch (error) {
    console.error('[Middleware] Error:', error);
    const response = NextResponse.next();
    response.cookies.delete('session');

    if (isProtectedPath) {
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }

    return response;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

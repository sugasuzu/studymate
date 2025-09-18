// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionCookieEdge } from './src/lib/auth-edge';

// 認証が必要なパス
const PROTECTED_PATHS = ['/my', '/questionnaire', '/auth/complete-profile'];

// 認証済みユーザーがアクセスできないパス（認証ページ）
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
    // 認証ページや公開ページはそのまま通す
    return NextResponse.next();
  }

  // セッションがある場合、検証
  try {
    const decodedToken = await verifySessionCookieEdge(session.value);

    if (!decodedToken) {
      // 無効なセッションをクリア
      const response = NextResponse.next();
      response.cookies.delete('session');

      // 保護されたパスの場合はログインへリダイレクト
      if (isProtectedPath) {
        const url = new URL('/auth/login', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
      }

      return response;
    }

    // ========== 認証済みユーザーの処理 ==========

    // 認証ページへのアクセスをブロック
    if (isAuthPage) {
      console.log(
        '[Middleware] Authenticated user trying to access auth page, redirecting to /my'
      );
      return NextResponse.redirect(new URL('/my', request.url));
    }

    // メール未認証の場合の処理
    if (isProtectedPath && !decodedToken.email_verified) {
      // verify-emailページ自体へのアクセスは許可
      if (pathname === '/auth/verify-email') {
        return NextResponse.next();
      }
      // その他の保護されたページはverify-emailへリダイレクト
      console.log(
        '[Middleware] Email not verified, redirecting to verify-email'
      );
      return NextResponse.redirect(new URL('/auth/verify-email', request.url));
    }

    // すべての条件をクリアした場合は通す
    return NextResponse.next();
  } catch (error) {
    console.error('[Middleware] Session verification error:', error);

    // エラーの場合はセッションをクリアして処理を続行
    const response = NextResponse.next();
    response.cookies.delete('session');

    // 保護されたパスの場合はログインへリダイレクト
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

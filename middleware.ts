// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionCookieEdge } from '@/lib/auth-edge';

// 認証が必要なルート
const protectedRoutes = [
  '/my',
  '/settings',
  '/subjects/*/reviews/new',
  '/my/*',
];

// 認証済みユーザーがアクセスできないルート
const authRoutes = ['/auth/login', '/auth/signup', '/auth/reset-password'];

// メール認証が必要なルート
const emailVerificationRequired = [
  '/subjects/*/reviews/new',
  '/my/reviews/*/edit',
];

// プロフィール設定が必要なルート（除外するパス）
const profileNotRequired = ['/auth/complete-profile', '/auth/logout', '/api/*'];

/**
 * パスがパターンにマッチするかチェック
 */
function matchesPattern(pathname: string, patterns: string[]): boolean {
  return patterns.some((pattern) => {
    const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
    return regex.test(pathname);
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 静的ファイルとAPIルートは除外
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // APIルートは特別扱い（認証チェックは各APIで行う）
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // セッションクッキーを取得
  const session = request.cookies.get('session');

  // セッションの検証
  let user = null;
  if (session?.value) {
    try {
      user = await verifySessionCookieEdge(session.value);
    } catch (error) {
      console.error('Session verification error in middleware:', error);
      // 無効なセッションの場合はクッキーを削除
      const response = NextResponse.redirect(
        new URL('/auth/login', request.url)
      );
      response.cookies.delete('session');
      return response;
    }
  }

  const isAuthenticated = !!user;
  const isEmailVerified = user?.email_verified || false;
  const hasProfile = !!user?.name;
  const isProtectedRoute = matchesPattern(pathname, protectedRoutes);
  const isAuthRoute = matchesPattern(pathname, authRoutes);
  const needsEmailVerification = matchesPattern(
    pathname,
    emailVerificationRequired
  );
  const needsProfile =
    isProtectedRoute && !matchesPattern(pathname, profileNotRequired);

  // 未認証ユーザーが保護されたルートにアクセスしようとした場合
  if (!isAuthenticated && isProtectedRoute) {
    const redirectUrl = new URL('/auth/login', request.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // 認証済みユーザーが認証ルートにアクセスしようとした場合
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL('/my', request.url));
  }

  // メール認証が必要なルートで未認証の場合
  if (isAuthenticated && !isEmailVerified && needsEmailVerification) {
    return NextResponse.redirect(new URL('/auth/verify-email', request.url));
  }

  // プロフィール未設定の場合（初回ログイン時）
  if (isAuthenticated && !hasProfile && needsProfile) {
    return NextResponse.redirect(
      new URL('/auth/complete-profile', request.url)
    );
  }

  // ユーザー情報をヘッダーに追加（Server Componentsで使用可能）
  const requestHeaders = new Headers(request.headers);
  if (user) {
    requestHeaders.set('x-user-uid', user.uid);
    requestHeaders.set('x-user-email', user.email || '');
    requestHeaders.set('x-user-email-verified', String(isEmailVerified));
    // 日本語を含む可能性があるためBase64エンコード
    requestHeaders.set(
      'x-user-name',
      user.name ? Buffer.from(user.name, 'utf-8').toString('base64') : ''
    );
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

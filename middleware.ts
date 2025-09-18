// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionCookieEdge } from '@/lib/auth-edge';

// TODO: Future use - Firestoreから直接ユーザー情報を取得する関数（Edge Runtime対応）
// 現在は使用されていないが、将来のプロフィールチェック機能で使用予定
// async function getUserProfileStatus(uid: string): Promise<{
//   profileCompleted: boolean;
// }> {
//   try {
//     // Firebase REST APIを使用（Edge Runtimeで動作）
//     const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
//     const response = await fetch(
//       `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${uid}`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.FIREBASE_SERVER_KEY}`, // サービスアカウントキーが必要
//         },
//       }
//     );

//     if (!response.ok) {
//       return { profileCompleted: false };
//     }

//     const data = await response.json();
//     return {
//       profileCompleted: data.fields?.profileCompleted?.booleanValue || false,
//     };
//   } catch (error) {
//     console.error('Error fetching user profile:', error);
//     return { profileCompleted: false };
//   }
// }

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

  // 完全に公開されているパスかチェック
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // メール認証関連のパラメータがある場合は通す
  if (
    pathname === '/auth/verify-email' &&
    request.nextUrl.searchParams.has('oobCode')
  ) {
    return NextResponse.next();
  }

  // セッションがない場合
  if (!session) {
    // 保護されたパスにアクセスしようとしている場合
    if (!isPublicPath) {
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // セッションがある場合、トークンを検証
  try {
    const decodedToken = await verifySessionCookieEdge(session.value);

    if (!decodedToken) {
      // トークンが無効な場合
      if (!isPublicPath) {
        const url = new URL('/auth/login', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }

    // ユーザー情報をヘッダーに追加
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-uid', decodedToken.uid);
    requestHeaders.set('x-user-email', decodedToken.email || '');
    requestHeaders.set(
      'x-user-email-verified',
      String(decodedToken.email_verified || false)
    );
    requestHeaders.set(
      'x-user-name',
      encodeURIComponent(decodedToken.name || '')
    );

    // プロフィール完成チェックが必要なパス
    const requiresCompleteProfile = ['/my'];

    // プロフィール設定ページ自体へのアクセスは許可
    if (pathname === '/auth/complete-profile') {
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    // プロフィール完成が必要なパスにアクセスしようとしている場合
    if (requiresCompleteProfile.some((path) => pathname.startsWith(path))) {
      // メール未認証の場合
      if (!decodedToken.email_verified) {
        return NextResponse.redirect(
          new URL('/auth/verify-email', request.url)
        );
      }

      // プロフィール未完成チェックは一旦削除
      // フロントエンド側でプロフィール状態をチェックして適切にハンドリングする
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('Middleware error:', error);

    // エラーが発生した場合、安全のためログインページへ
    if (!isPublicPath) {
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

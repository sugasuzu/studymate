// app/api/auth/session/route.ts
import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE_NAME = 'session';
const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 5, // 5日間
};

/**
 * IDトークンをセッションクッキーとして保存
 * 注: Edge Runtimeの制限により、通常のIDトークンを使用
 */
export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json(
        { error: 'ID token is required' },
        { status: 400 }
      );
    }

    // 簡易的な検証（形式チェックのみ）
    const parts = idToken.split('.');
    if (parts.length !== 3) {
      return NextResponse.json(
        { error: 'Invalid token format' },
        { status: 400 }
      );
    }

    // レスポンスを作成
    const response = NextResponse.json(
      { success: true, message: 'Session created' },
      { status: 200 }
    );

    // IDトークンをセッションクッキーとして設定
    response.cookies.set('session', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 5, // 5日間
    });

    console.log('[Session API] Session cookie set successfully');

    return response;
  } catch (error) {
    console.error('Session creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * セッションを削除
 */
export async function DELETE() {
  const response = NextResponse.json({ success: true }, { status: 200 });

  // セッションクッキーを削除
  response.cookies.delete(SESSION_COOKIE_NAME);

  return response;
}

/**
 * セッション状態を確認
 */
export async function GET(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME);

  if (!session?.value) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  // Edge Runtimeで動作する簡易チェック
  try {
    const parts = session.value.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token');
    }

    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < now) {
      throw new Error('Token expired');
    }

    return NextResponse.json(
      {
        authenticated: true,
        uid: payload.sub,
        email: payload.email,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}

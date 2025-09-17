// lib/auth-edge.ts
import { jwtVerify, importX509 } from 'jose';

// Firebase公開鍵のキャッシュ
let publicKeys: Record<string, string> | null = null;
let keysExpireAt = 0;

/**
 * Firebase公開鍵を取得
 */
async function getFirebasePublicKeys(): Promise<Record<string, string>> {
  const now = Date.now();
  
  // キャッシュが有効な場合は返す
  if (publicKeys && now < keysExpireAt) {
    return publicKeys;
  }

  try {
    const response = await fetch(
      'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com'
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch public keys');
    }

    const keys = await response.json();
    
    // Cache-Controlヘッダーから有効期限を取得
    const cacheControl = response.headers.get('cache-control');
    const maxAge = cacheControl?.match(/max-age=(\d+)/)?.[1];
    
    if (maxAge) {
      keysExpireAt = now + parseInt(maxAge) * 1000;
    } else {
      keysExpireAt = now + 3600 * 1000; // デフォルト1時間
    }
    
    publicKeys = keys;
    return keys;
  } catch (error) {
    console.error('Error fetching Firebase public keys:', error);
    throw error;
  }
}

/**
 * Firebase IDトークンを検証（Edge Runtime対応）
 */
export async function verifyIdTokenEdge(token: string) {
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    if (!projectId) {
      throw new Error('Firebase project ID not configured');
    }

    // JWTをデコード（検証なし）してkidを取得
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    const header = JSON.parse(atob(parts[0]));
    const kid = header.kid;

    if (!kid) {
      throw new Error('No kid in token header');
    }

    // 公開鍵を取得
    const publicKeys = await getFirebasePublicKeys();
    const publicKey = publicKeys[kid];

    if (!publicKey) {
      throw new Error('Public key not found');
    }

    // 公開鍵をインポート
    const key = await importX509(publicKey, 'RS256');

    // トークンを検証
    const { payload } = await jwtVerify(token, key, {
      issuer: `https://securetoken.google.com/${projectId}`,
      audience: projectId,
    });

    // 有効期限チェック
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      throw new Error('Token expired');
    }

    if (payload.iat && payload.iat > now) {
      throw new Error('Token issued in the future');
    }

    return {
      uid: payload.sub as string,
      email: payload.email as string | undefined,
      email_verified: payload.email_verified as boolean | undefined,
      name: payload.name as string | undefined,
      picture: payload.picture as string | undefined,
      firebase: payload.firebase as any,
    };
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

/**
 * セッションクッキーを検証（Edge Runtime対応）
 * 注: Firebase Admin SDKのセッションクッキーは使えないため、
 * 通常のIDトークンをクッキーに保存して使用
 */
export async function verifySessionCookieEdge(sessionToken: string) {
  return verifyIdTokenEdge(sessionToken);
}
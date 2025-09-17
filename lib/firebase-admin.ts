// lib/firebase-admin.ts
import {
  initializeApp,
  getApps,
  cert,
  ServiceAccount,
} from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID!,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n')!,
};

// Firebase Admin SDKの初期化
const adminApp =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccount),
      })
    : getApps()[0];

export const adminAuth = getAuth(adminApp);

/**
 * IDトークンを検証し、デコードされたトークンを返す
 */
export async function verifyIdToken(token: string) {
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying ID token:', error);
    return null;
  }
}

/**
 * セッションクッキーを作成
 * @param idToken - クライアントから送信されたIDトークン
 * @param expiresIn - セッションの有効期限（ミリ秒）
 */
export async function createSessionCookie(
  idToken: string,
  expiresIn: number = 60 * 60 * 24 * 5 * 1000
) {
  try {
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });
    return sessionCookie;
  } catch (error) {
    console.error('Error creating session cookie:', error);
    return null;
  }
}

/**
 * セッションクッキーを検証
 * @param sessionCookie - セッションクッキー
 * @param checkRevoked - 失効チェックを行うか
 */
export async function verifySessionCookie(
  sessionCookie: string,
  checkRevoked = true
) {
  try {
    const decodedClaims = await adminAuth.verifySessionCookie(
      sessionCookie,
      checkRevoked
    );
    return decodedClaims;
  } catch (error) {
    console.error('Error verifying session cookie:', error);
    return null;
  }
}

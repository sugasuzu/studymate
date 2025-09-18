// src/lib/auth-server.ts
/**
 * サーバーコンポーネント・サーバーアクション用の認証ヘルパー
 * Server Components, Route Handlers, Server Actionsで使用
 */

import { cookies } from 'next/headers';
import { cache } from 'react';
import { verifyIdTokenEdge } from './auth-edge';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

// =====================================
// 型定義
// =====================================

export interface SessionUser {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  name: string | null;
  picture: string | null;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName?: string;
  photoURL?: string;
  universityName?: string;
  universityDepartment?: string;
  graduationYear?: number;
  isStudent?: boolean;
  profileCompleted: boolean;
  emailVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// =====================================
// セッション管理
// =====================================

/**
 * セッションからユーザー情報を取得
 */
export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie?.value) {
      return null;
    }

    const decodedToken = await verifyIdTokenEdge(sessionCookie.value);

    if (!decodedToken) {
      return null;
    }

    return {
      uid: decodedToken.uid,
      email: decodedToken.email || null,
      emailVerified: decodedToken.email_verified || false,
      name: decodedToken.name || null,
      picture: decodedToken.picture || null,
    };
  } catch (error) {
    console.error('[getSessionUser] Error:', error);
    return null;
  }
});

/**
 * 認証必須ページ用：ユーザー情報を取得（なければエラーをスロー）
 */
export async function requireAuth(): Promise<SessionUser> {
  const user = await getSessionUser();

  if (!user) {
    throw new Error('Authentication required');
  }

  return user;
}

// =====================================
// プロフィール管理
// =====================================

/**
 * ユーザープロフィールを取得
 */
export const getUserProfile = cache(
  async (uid: string): Promise<UserProfile | null> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));

      if (!userDoc.exists()) {
        return null;
      }

      return userDoc.data() as UserProfile;
    } catch (error) {
      console.error('[getUserProfile] Error:', error);
      return null;
    }
  }
);

/**
 * プロフィール完成状態をチェック
 */
export async function checkProfileCompletionStatus(uid: string): Promise<{
  exists: boolean;
  completed: boolean;
  missingFields: string[];
}> {
  try {
    const profile = await getUserProfile(uid);

    if (!profile) {
      return {
        exists: false,
        completed: false,
        missingFields: ['profile'],
      };
    }

    const requiredFields = [
      'displayName',
      'universityName',
      'universityDepartment',
      'graduationYear',
    ];

    const missingFields = requiredFields.filter(
      (field) => !profile[field as keyof UserProfile]
    );

    return {
      exists: true,
      completed: profile.profileCompleted || missingFields.length === 0,
      missingFields,
    };
  } catch (error) {
    console.error('[checkProfileCompletionStatus] Error:', error);
    return {
      exists: false,
      completed: false,
      missingFields: ['error'],
    };
  }
}

/**
 * プロフィールを更新
 */
export async function updateUserProfile(
  uid: string,
  data: Partial<UserProfile>
): Promise<void> {
  try {
    await setDoc(
      doc(db, 'users', uid),
      {
        ...data,
        updatedAt: new Date(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('[updateUserProfile] Error:', error);
    throw new Error('Failed to update profile');
  }
}

// =====================================
// 便利な統合関数
// =====================================

/**
 * 現在のユーザーとプロフィールを一括取得
 */
export async function getCurrentUserWithProfile(): Promise<{
  user: SessionUser;
  profile: UserProfile | null;
} | null> {
  const user = await getSessionUser();

  if (!user) {
    return null;
  }

  const profile = await getUserProfile(user.uid);

  return { user, profile };
}

// =====================================
// 認証状態チェック（互換性のため残す）
// =====================================

/**
 * @deprecated getSessionUser() を使ってください
 */
export const getCurrentUser = getSessionUser;

/**
 * @deprecated checkProfileCompletionStatus() を使ってください
 */
export const checkUserProfileStatus = async (uid: string) => {
  const status = await checkProfileCompletionStatus(uid);
  return {
    exists: status.exists,
    profileCompleted: status.completed,
  };
};

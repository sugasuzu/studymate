// lib/auth-helpers.ts
import { headers } from 'next/headers';
import { cache } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { UserProfile } from '@/types/user';

export interface CurrentUser {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  name: string | null;
  profileCompleted?: boolean;
}

/**
 * ミドルウェアで設定されたユーザー情報を取得
 * Server Componentsで使用
 */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const headersList = await headers();

  const uid = headersList.get('x-user-uid');
  const email = headersList.get('x-user-email');
  const emailVerified = headersList.get('x-user-email-verified') === 'true';
  const name = headersList.get('x-user-name');
  const profileCompleted =
    headersList.get('x-user-profile-completed') === 'true';

  if (!uid) {
    return null;
  }

  return {
    uid,
    email: email || null,
    emailVerified,
    name: name ? decodeURIComponent(name) : null,
    profileCompleted,
  };
});

/**
 * ユーザープロフィールの完成状態をチェック
 */
export async function checkUserProfileStatus(uid: string): Promise<{
  exists: boolean;
  profileCompleted: boolean;
}> {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));

    if (!userDoc.exists()) {
      return { exists: false, profileCompleted: false };
    }

    const data = userDoc.data() as UserProfile;

    // プロフィールが完成しているかチェック
    const isCompleted = !!(
      data.profileCompleted ||
      (data.displayName &&
        data.universityName &&
        data.universityDepartment &&
        data.graduationYear)
    );

    return { exists: true, profileCompleted: isCompleted };
  } catch (error) {
    console.error('Error checking user profile:', error);
    return { exists: false, profileCompleted: false };
  }
}

/**
 * 認証済みかチェック
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}

/**
 * メール認証済みかチェック
 */
export async function isEmailVerified(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.emailVerified || false;
}

/**
 * プロフィール完成済みかチェック
 */
export async function isProfileCompleted(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.profileCompleted || false;
}

// lib/auth-helpers.ts
import { headers } from 'next/headers';
import { cache } from 'react';

export interface CurrentUser {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  name: string | null;
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

  if (!uid) {
    return null;
  }

  return {
    uid,
    email: email || null,
    emailVerified,
    name: name || null,
  };
});

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
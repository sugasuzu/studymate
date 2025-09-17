// components/auth/AuthForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../firebase';

interface AuthFormProps {
  mode: 'login' | 'signup' | 'reset';
  serverAction?: (prevState: any, formData: FormData) => Promise<any>;
}

export function AuthForm({ mode, serverAction }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // 初回ログインかチェック
      const isNewUser =
        result.user.metadata.creationTime ===
        result.user.metadata.lastSignInTime;

      if (isNewUser) {
        router.push('/auth/complete-profile');
      } else {
        router.push('/my');
      }
    } catch (error: any) {
      console.error('Google auth error:', error);
      setError('Googleアカウントでのログインに失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      if (mode === 'signup') {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await sendEmailVerification(result.user);
        router.push('/auth/verify-email');
      } else if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/my');
      } else if (mode === 'reset') {
        await sendPasswordResetEmail(auth, email);
        setError('パスワードリセットメールを送信しました');
      }
    } catch (error: any) {
      console.error('Email auth error:', error);

      // Firebaseエラーメッセージの日本語化
      const errorMessages: Record<string, string> = {
        'auth/email-already-in-use': 'このメールアドレスは既に使用されています',
        'auth/invalid-email': '無効なメールアドレスです',
        'auth/user-not-found': 'ユーザーが見つかりません',
        'auth/wrong-password': 'パスワードが正しくありません',
        'auth/weak-password': 'パスワードが弱すぎます',
        'auth/too-many-requests':
          'リクエストが多すぎます。しばらく時間をおいてから再度お試しください',
      };

      setError(errorMessages[error.code] || 'エラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return { handleGoogleAuth, handleEmailAuth, isLoading, error };
}

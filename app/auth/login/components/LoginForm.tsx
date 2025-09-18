// app/auth/login/components/LoginForm.tsx
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { IoEye, IoEyeOff } from 'react-icons/io5';

function LoginFormContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/my';
  const { user, loading } = useAuth();

  // 認証済みの場合は自動的にリダイレクト
  useEffect(() => {
    if (!loading && user) {
      // ユーザーが既に認証されている場合
      const timer = setTimeout(() => {
        router.push(redirectUrl);
      }, 100); // 少し遅延を入れて確実にリダイレクト

      return () => clearTimeout(timer);
    }
  }, [user, loading, router, redirectUrl]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // ログイン成功後、useEffectでリダイレクトされる
      console.log('Email login successful:', userCredential.user.uid);
    } catch (error: unknown) {
      console.error('Login error:', error);

      const errorMessages: Record<string, string> = {
        'auth/invalid-email': 'メールアドレスが正しくありません',
        'auth/user-not-found': 'このメールアドレスのユーザーが見つかりません',
        'auth/wrong-password': 'パスワードが正しくありません',
        'auth/too-many-requests':
          'ログイン試行回数が多すぎます。しばらくお待ちください',
        'auth/user-disabled': 'このアカウントは無効化されています',
      };

      const errorCode =
        error && typeof error === 'object' && 'code' in error
          ? (error as { code: string }).code
          : '';
      setError(errorMessages[errorCode] || 'ログインに失敗しました');
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // 初回ログインかチェック
      const isNewUser =
        result.user.metadata.creationTime ===
        result.user.metadata.lastSignInTime;

      console.log('Google login successful:', result.user.uid);

      if (isNewUser) {
        router.push('/auth/complete-profile');
      }
      // 既存ユーザーの場合は、useEffectでリダイレクトされる
    } catch (error: unknown) {
      console.error('Google login error:', error);

      // ポップアップがキャンセルされた場合
      if (error && typeof error === 'object' && 'code' in error) {
        const errorCode = (error as { code: string }).code;
        if (errorCode === 'auth/popup-closed-by-user') {
          setError('ログインがキャンセルされました');
        } else if (errorCode === 'auth/cancelled-popup-request') {
          // 別のポップアップが開いている場合
          return;
        } else {
          setError('Googleアカウントでのログインに失敗しました');
        }
      } else {
        setError('ログインに失敗しました');
      }
      setIsLoading(false);
    }
  };

  // 既に認証済みでローディング中の場合
  if (!loading && user) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">リダイレクト中...</p>
      </div>
    );
  }

  return (
    <>
      {/* Googleログイン */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span className="font-medium text-gray-700 dark:text-gray-200">
          {isLoading ? 'ログイン中...' : 'Googleでログイン'}
        </span>
      </button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
            または
          </span>
        </div>
      </div>

      {/* メールログイン */}
      <form onSubmit={handleEmailLogin} className="space-y-4">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
          >
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
          >
            パスワード
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {showPassword ? (
                <IoEyeOff className="w-5 h-5" />
              ) : (
                <IoEye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              disabled={isLoading}
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              ログイン状態を保持
            </span>
          </label>

          <Link
            href="/auth/reset-password"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            パスワードを忘れた方
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg text-lg hover:opacity-90 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? 'ログイン中...' : 'ログイン'}
        </button>
      </form>
    </>
  );
}

export function LoginForm() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">読み込み中...</p>
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}

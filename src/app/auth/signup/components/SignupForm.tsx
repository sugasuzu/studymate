'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { IoEye, IoEyeOff } from 'react-icons/io5';

export function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!email) {
      errors.email = 'メールアドレスは必須です';
    }

    if (!password) {
      errors.password = 'パスワードは必須です';
    } else if (password.length < 6) {
      errors.password = 'パスワードは6文字以上で入力してください';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'パスワードが一致しません';
    }

    if (!agreeToTerms) {
      errors.agreeToTerms = '利用規約への同意が必要です';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // 既存のユーザードキュメントを確認
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));

      if (!userDoc.exists()) {
        // 新規ユーザーの場合、基本情報を保存
        await setDoc(doc(db, 'users', result.user.uid), {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
          emailVerified: true,
          profileCompleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      // IDトークンを取得してセッション作成
      const idToken = await result.user.getIdToken();
      await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      // 常に/myへリダイレクト
      window.location.replace('/my');
    } catch (error) {
      console.error(error)
      setIsLoading(false);
    }
  };

  // メール登録の場合（handleEmailSignup）
  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // ユーザーアカウント作成
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // ユーザー情報をFirestoreに保存
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        createdAt: new Date(),
        emailVerified: false,
        profileCompleted: false,
      });

      // メール認証を送信
      await sendEmailVerification(userCredential.user);

      // 認証メール送信画面へリダイレクト
      router.push('/auth/verify-email');
    } catch (error) {
      console.error(error)
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Googleで登録 */}
      <button
        type="button"
        onClick={handleGoogleSignup}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-50"
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
          Googleで登録
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

      {/* メールで登録 */}
      <form onSubmit={handleEmailSignup} className="space-y-4">
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
            メールアドレス <span className="text-red-500">*</span>
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
          {fieldErrors.email && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
          >
            パスワード <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
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
          <p className="mt-1 text-xs text-gray-500">6文字以上</p>
          {fieldErrors.password && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
          >
            パスワード（確認） <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {showConfirmPassword ? (
                <IoEyeOff className="w-5 h-5" />
              ) : (
                <IoEye className="w-5 h-5" />
              )}
            </button>
          </div>
          {fieldErrors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {fieldErrors.confirmPassword}
            </p>
          )}
        </div>

        <div>
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              disabled={isLoading}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              <Link
                href="/terms"
                target="_blank"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                利用規約
              </Link>
              および
              <Link
                href="/privacy"
                target="_blank"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                プライバシーポリシー
              </Link>
              に同意します <span className="text-red-500">*</span>
            </span>
          </label>
          {fieldErrors.agreeToTerms && (
            <p className="mt-1 text-sm text-red-600">
              {fieldErrors.agreeToTerms}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg text-lg hover:opacity-90 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? '登録中...' : '無料で登録'}
        </button>
      </form>
    </>
  );
}

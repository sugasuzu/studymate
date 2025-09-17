// app/auth/verify-email/components/VerifyEmailStatus.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export function VerifyEmailStatus() {
  const [email, setEmail] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setEmail(user.email);

        // メールが既に認証済みの場合
        if (user.emailVerified) {
          setIsVerified(true);
          setTimeout(() => {
            router.push('/auth/complete-profile');
          }, 3000);
        }

        // 定期的に認証状態をチェック
        const interval = setInterval(async () => {
          await user.reload();
          if (user.emailVerified) {
            setIsVerified(true);
            clearInterval(interval);
            setTimeout(() => {
              router.push('/auth/complete-profile');
            }, 3000);
          }
        }, 3000);

        return () => clearInterval(interval);
      } else {
        router.push('/auth/login');
      }

      setIsChecking(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleResendEmail = async () => {
    setIsResending(true);
    setResendMessage(null);

    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        setResendMessage('認証メールを再送信しました');
      }
    } catch (error: any) {
      console.error('Resend email error:', error);
      setResendMessage('メールの再送信に失敗しました');
    } finally {
      setIsResending(false);
    }
  };

  if (isChecking) {
    return (
      <div className="flex justify-center py-8">
        <svg
          className="animate-spin h-8 w-8 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  if (isVerified) {
    return (
      <div className="text-center py-4">
        <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-10 h-10 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          メール認証が完了しました！
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          まもなくプロフィール設定画面に移動します...
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        認証メールを{' '}
        <strong className="text-gray-900 dark:text-white">{email}</strong>{' '}
        に送信しました。
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
        メール内のリンクをクリックして、メールアドレスを認証してください。
      </p>

      {resendMessage && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm ${
            resendMessage.includes('失敗')
              ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
              : 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
          }`}
        >
          {resendMessage}
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={handleResendEmail}
          disabled={isResending}
          className="w-full px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-50"
        >
          {isResending ? '送信中...' : 'メールを再送信'}
        </button>

        <button
          onClick={() => router.push('/auth/login')}
          className="w-full px-6 py-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          ログイン画面に戻る
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>メールが届かない場合：</strong>
        </p>
        <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• 迷惑メールフォルダをご確認ください</li>
          <li>• メールアドレスが正しいか確認してください</li>
          <li>• しばらく待ってから再送信してください</li>
        </ul>
      </div>
    </>
  );
}

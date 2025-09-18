// app/auth/reset-password/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { ResetPasswordForm } from './components/ResetPasswordForm';

export const metadata: Metadata = {
  title: 'パスワードリセット | Studymate',
  description: 'パスワードをリセットして、Studymateにログインしよう',
};

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* パスワードリセットカード */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            パスワードリセット
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            登録しているメールアドレスを入力してください。パスワードリセット用のリンクを送信します。
          </p>

          <ResetPasswordForm />

          <div className="mt-6 text-center">
            <Link
              href="/auth/login"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← ログイン画面に戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

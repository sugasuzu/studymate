// app/auth/login/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { LoginForm } from './components/LoginForm';

export const metadata: Metadata = {
  title: 'ログイン | Studymate',
  description: 'Studymateにログインして、教材レビューを確認しよう',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* ログインカード */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            ログイン
          </h2>

          <LoginForm />

          {/* 区切り線 */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
                アカウントをお持ちでない方
              </span>
            </div>
          </div>

          {/* 新規登録リンク */}
          <Link
            href="/auth/signup"
            className="block w-full text-center px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition font-semibold"
          >
            新規登録はこちら
          </Link>
        </div>

        {/* フッターリンク */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <Link href="/terms" className="hover:underline">
            利用規約
          </Link>
          <span className="mx-2">·</span>
          <Link href="/privacy" className="hover:underline">
            プライバシーポリシー
          </Link>
        </div>
      </div>
    </div>
  );
}

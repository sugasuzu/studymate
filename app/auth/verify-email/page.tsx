// app/auth/verify-email/page.tsx
import { Metadata } from 'next';
import { VerifyEmailStatus } from './components/VerifyEmailStatus';

export const metadata: Metadata = {
  title: 'メール認証 | Studymate',
  description: 'メールアドレスを認証して、Studymateの利用を開始しよう',
};

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* メール認証カード */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              メールを確認してください
            </h2>

            <VerifyEmailStatus />
          </div>
        </div>
      </div>
    </div>
  );
}

// src/app/my/page.tsx
import { getSessionUser, getUserProfile } from '@/lib/auth-server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function MyPage() {
  // セッションからユーザー情報を取得
  const sessionUser = await getSessionUser();

  // Middlewareで保護されているはずだが、念のためチェック
  if (!sessionUser) {
    redirect('/auth/login');
  }

  // Firestoreからプロフィール情報を取得
  const profile = await getUserProfile(sessionUser.uid);
  const isProfileCompleted = profile?.profileCompleted || false;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          ようこそ、
          {profile?.displayName ||
            sessionUser.name ||
            sessionUser.email?.split('@')[0]}
          さん
        </h1>

        {/* プロフィール未完成の通知 */}
        {!isProfileCompleted && (
          <div className="mb-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-start">
              <svg
                className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                  プロフィールを完成させましょう
                </h3>
                <p className="text-yellow-700 dark:text-yellow-300 mb-3">
                  大学名や学部を設定すると、より信頼性の高いレビューが投稿できます。
                </p>
                <Link
                  href="/auth/complete-profile"
                  className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
                >
                  プロフィールを設定する
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ダッシュボードコンテンツ */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">投稿したレビュー</h2>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">参考になった数</h2>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">プロフィール</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isProfileCompleted ? '完成済み' : '未完成'}
            </p>
          </div>
        </div>

        {/* ユーザー情報（デバッグ用） */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="font-semibold mb-2">Debug Info:</h3>
            <pre className="text-xs">
              {JSON.stringify({ sessionUser, profile }, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}

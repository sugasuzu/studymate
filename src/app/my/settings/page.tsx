import { getSessionUser, getUserProfile } from '@/lib/auth-server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    redirect('/auth/login');
  }

  const profile = await getUserProfile(sessionUser.uid);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            アカウント設定
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            アカウントとプライバシーの設定を管理します
          </p>
        </div>

        <div className="space-y-6">
          {/* アカウント情報 */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              アカウント情報
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    メールアドレス
                  </p>
                  <p className="text-gray-900 dark:text-white">
                    {sessionUser.email}
                  </p>
                </div>
                <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  変更
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    パスワード
                  </p>
                  <p className="text-gray-900 dark:text-white">••••••••</p>
                </div>
                <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  変更
                </button>
              </div>
            </div>
          </div>

          {/* プライバシー設定 */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              プライバシー設定
            </h2>

            <div className="space-y-4">
              <label className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-gray-900 dark:text-white">
                    プロフィールを公開
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    他のユーザーがあなたのプロフィールを閲覧できます
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  defaultChecked
                />
              </label>

              <label className="flex items-center justify-between py-3">
                <div>
                  <p className="text-gray-900 dark:text-white">
                    レビューに実名を表示
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    レビューにあなたの本名が表示されます
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
              </label>
            </div>
          </div>

          {/* 通知設定 */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              通知設定
            </h2>

            <div className="space-y-4">
              <label className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-gray-900 dark:text-white">メール通知</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    重要なお知らせをメールで受け取る
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  defaultChecked
                />
              </label>

              <label className="flex items-center justify-between py-3">
                <div>
                  <p className="text-gray-900 dark:text-white">いいね通知</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    レビューがいいねされたときに通知
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  defaultChecked
                />
              </label>
            </div>
          </div>

          {/* 危険な操作 */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-red-800 dark:text-red-300 mb-6">
              危険な操作
            </h2>

            <div className="space-y-4">
              <button className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
                アカウントを削除
              </button>
              <p className="text-sm text-red-700 dark:text-red-400 text-center">
                この操作は取り消せません。すべてのデータが永久に削除されます。
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

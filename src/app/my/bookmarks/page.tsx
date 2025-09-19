import { getSessionUser } from '@/lib/auth-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function BookmarksPage() {
  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    redirect('/auth/login');
  }

  // TODO: ブックマーク機能の実装後、実際のデータを取得
  const bookmarks: any[] = [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            保存した教材
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            後で見返したい教材を保存しておけます
          </p>
        </div>

        {bookmarks.length === 0 ? (
          /* ブックマークがない場合 */
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-12 text-center">
            <svg
              className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              まだ教材を保存していません
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              気になる教材を見つけたら、ブックマークアイコンをクリックして保存しましょう
            </p>
            <Link
              href="/subjects"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition"
            >
              教材を探す
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </Link>
          </div>
        ) : (
          /* ブックマークリスト */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((bookmark: any) => (
              <div
                key={bookmark.id}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {bookmark.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {bookmark.author}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {bookmark.rating} ({bookmark.reviewCount}件)
                    </span>
                  </div>
                  <button className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

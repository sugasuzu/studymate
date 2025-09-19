import { getSessionUser } from '@/lib/auth-server';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function MyReviewsPage() {
  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    redirect('/auth/login');
  }

  // ユーザーのレビューを取得
  const reviewsQuery = query(
    collection(db, 'questionnaires'),
    where('userId', '==', sessionUser.uid),
    orderBy('submittedAt', 'desc')
  );
  const reviewsSnapshot = await getDocs(reviewsQuery);
  const reviews = reviewsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ヘッダー */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              投稿したレビュー
            </h1>
            <Link
              href="/questionnaire"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition"
            >
              新規レビューを投稿
            </Link>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {reviews.length}件のレビューを投稿しています
          </p>
        </div>

        {reviews.length === 0 ? (
          /* レビューがない場合 */
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              まだレビューを投稿していません
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              使った教材のレビューを投稿して、後輩の学習を支援しましょう
            </p>
            <Link
              href="/questionnaire"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition"
            >
              最初のレビューを投稿する
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </Link>
          </div>
        ) : (
          /* レビューリスト */
          <div className="space-y-6">
            {reviews.map((review: Record<string, unknown>, index: number) => (
              <div
                key={String(review.id || index)}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 hover:shadow-xl transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* 教材情報 */}
                    {Array.isArray(review.materials) &&
                      review.materials.map(
                        (material: Record<string, unknown>, index: number) => (
                          <div key={index} className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                              {String(material.materialName || '')}
                            </h3>
                            {Boolean(material.materialBarcode) && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                ISBN: {String(material.materialBarcode)}
                              </p>
                            )}
                            <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                              {String(material.materialReview || '')}
                            </p>
                          </div>
                        )
                      )}

                    {/* メタ情報 */}
                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {new Date(
                          (review.submittedAt as { seconds?: number })?.seconds
                            ? (review.submittedAt as { seconds: number })
                                .seconds * 1000
                            : Date.now()
                        ).toLocaleDateString('ja-JP')}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        0 いいね
                      </span>
                    </div>
                  </div>

                  {/* アクションボタン */}
                  <div className="flex items-center gap-2 ml-6">
                    <Link
                      href={`/my/reviews/${review.id}/edit`}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                      title="編集"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </Link>
                    <button
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                      title="削除"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

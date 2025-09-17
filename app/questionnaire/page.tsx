import { Metadata } from 'next';
import Link from 'next/link';
import { QuestionnaireForm } from './components/QuestionnaireForm';

export const metadata: Metadata = {
  title: 'アンケート | Studymate',
  description: '教材レビューを投稿して、後輩たちの学習を支援しよう',
};

// SSRで初期データを取得
async function getInitialUniversities() {
  // 初期データを空の配列で返す（エラーを避けるため）
  // クライアント側で大学検索を行う方式に変更
  return [];
}

export default async function QuestionnairePage() {
  const initialUniversities = await getInitialUniversities();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* ヘッダー */}
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Studymate
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                ホーム
              </Link>
              <a
                href="/questionnaire"
                className="text-blue-600 dark:text-blue-400 font-semibold"
              >
                アンケート
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* タイトルセクション */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            教材レビューアンケート
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            あなたの経験が、後輩たちの成功への道しるべになります
          </p>
        </div>

        {/* 説明カード */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <svg
                className="w-8 h-8 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                アンケートについて
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                このアンケートでは、あなたが受験期に使用した教材についてのレビューをお聞きします。
                所要時間は約5分です。
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>大学ドメインの入力が必須です（信頼性確保のため）</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>教材の詳細なレビューをお願いします</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>バーコード読み取り機能で教材情報を簡単入力</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* フォーム */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
          <QuestionnaireForm initialUniversities={initialUniversities} />
        </div>

        {/* プライバシーポリシー */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            ご入力いただいた情報は、サービス改善および統計データとしてのみ使用されます。
          </p>
          <p className="mt-2">
            詳しくは
            <a
              href="/privacy"
              className="text-blue-600 dark:text-blue-400 hover:underline mx-1"
            >
              プライバシーポリシー
            </a>
            をご確認ください。
          </p>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Studymate
            </p>
            <p className="text-sm">
              &copy; 2025 Studymate. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

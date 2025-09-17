import React from "react";

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Studymateの特徴
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            信頼性を追求した、新しい教材レビューの形
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              投稿者の所属が明確
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              大学名・学部・高校名を表示。あなたと同じ志望校の先輩のレビューを簡単に見つけられます。
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-purple-600 dark:text-purple-400"
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
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              詳細な体験レビュー
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              使用時期、勉強法、成績の変化など、具体的な体験談を最低150文字以上で共有。
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              強力な絞り込み機能
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              大学名、学部名、教科で絞り込み。自分にピッタリの教材レビューだけを表示。
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-yellow-600 dark:text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              参考になった機能
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              役立つレビューを評価。多くの受験生から支持されたレビューが上位に表示されます。
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-indigo-600 dark:text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              完全無料
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              すべての機能を無料で利用可能。受験生の負担を最小限に、最大限の価値を提供。
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-pink-600 dark:text-pink-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9 9 0 0012 21c4.474 0 8.268-3.12 9.032-7.326"
                />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              SNSシェア機能
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              有益なレビューを友達とシェア。受験仲間と情報を共有して、みんなで合格を目指そう。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

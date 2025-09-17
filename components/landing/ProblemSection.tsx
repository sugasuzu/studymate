import React from 'react';

const ProblemSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            こんな悩みはありませんか？
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">😕</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              サクラレビューが心配
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              ECサイトの評価は信頼できるか分からない。本当に受験生が書いたレビューなのか疑問。
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🤔</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              自分に合うか分からない
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              レビュアーの学力レベルや志望校が分からないため、自分に適した教材か判断できない。
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💸</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              参考書選びの失敗
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              間違った教材を選んでしまい、貴重な時間とお金を無駄にしてしまうリスク。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;

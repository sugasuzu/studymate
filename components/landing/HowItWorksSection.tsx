import React from 'react';

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            使い方はカンタン3ステップ
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
              1
            </div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              無料会員登録
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              メールアドレスまたはGoogleアカウントで簡単登録。プロフィールに志望校を設定。
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
              2
            </div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              教材を検索・絞り込み
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              志望大学・学部・教科で絞り込んで、自分に最適な教材レビューを発見。
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
              3
            </div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              レビューを読む・投稿
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              先輩のリアルな体験談を読んで参考に。あなたも後輩のためにレビューを投稿しよう。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

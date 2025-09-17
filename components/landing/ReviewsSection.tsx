import React from 'react';

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            実際のレビュー例
          </h3>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                K
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Kenji
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs">
                    慶應義塾大学 経済学部
                  </span>
                </p>
              </div>
            </div>
            <div className="mb-3">
              <span className="text-yellow-500">★★★★★</span>
              <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                システム英単語
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              高3の4月から使い始めて、毎日1時間、計5周しました。最初は基礎編から始めて、夏休みには応用編まで完璧に。結果、センター試験では190点を取ることができました...
            </p>
            <button className="text-blue-600 dark:text-blue-400 hover:underline">
              続きを読む →
            </button>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                M
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Mika
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded text-xs">
                    早稲田大学 文学部
                  </span>
                </p>
              </div>
            </div>
            <div className="mb-3">
              <span className="text-yellow-500">★★★★☆</span>
              <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                青チャート数学IA
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              文系ですが数学が必要だったので使用。基礎から丁寧に解説されていて良かったです。ただ、問題量が多すぎて全部はできませんでした。重要例題だけに絞るのがおすすめ...
            </p>
            <button className="text-blue-600 dark:text-blue-400 hover:underline">
              続きを読む →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

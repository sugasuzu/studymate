import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-semibold">
            🎯 信頼できる教材選びの新スタンダード
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            志望大学の先輩の
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              リアルな声
            </span>
            が、ここにある。
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            匿名レビューやサクラに惑わされない。
            <br />
            あなたと同じ目標を持つ先輩たちが、実際に使った教材の本音レビューを共有。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg text-lg hover:opacity-90 transition transform hover:scale-105"
            >
              無料で教材レビューを見る
            </Link>
            <Link
              href="#"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg text-lg border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              レビューを投稿する
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>完全無料</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>大学名・学部を確認可能</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>詳細な体験談</span>
            </div>
          </div>
        </div>
      </div>
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-2000" />
    </section>
  );
}

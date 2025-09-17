"use client";

import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Studymate
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                特徴
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                使い方
              </a>
              <a
                href="#reviews"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                レビュー
              </a>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                ログイン
              </button>
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-lg hover:opacity-90 transition">
                無料で始める
              </button>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 dark:text-gray-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
            <div className="px-4 py-4 space-y-3">
              <a
                href="#features"
                className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              >
                特徴
              </a>
              <a
                href="#how-it-works"
                className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              >
                使い方
              </a>
              <a
                href="#reviews"
                className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              >
                レビュー
              </a>
              <button className="w-full bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                ログイン
              </button>
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-lg hover:opacity-90 transition">
                無料で始める
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
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
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg text-lg hover:opacity-90 transition transform hover:scale-105">
                無料で教材レビューを見る
              </button>
              <button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg text-lg border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                レビューを投稿する
              </button>
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
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      </section>

      {/* Problem Section */}
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

      {/* Features Section */}
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

      {/* How it works */}
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

      {/* Sample Reviews */}
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">今すぐ始めよう</h3>
          <p className="text-xl text-white/90 mb-8">
            あなたの志望校の先輩たちが待っています。
            <br />
            信頼できるレビューで、最適な教材を見つけましょう。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg text-lg hover:bg-gray-100 transition transform hover:scale-105">
              無料で始める
            </button>
            <button className="px-8 py-4 bg-transparent text-white font-semibold rounded-lg text-lg border-2 border-white hover:bg-white/10 transition">
              詳しく見る
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Studymate
              </h4>
              <p className="text-sm">
                志望大学・取得資格で絞り込める、信頼性の高い教材レビューサイト
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">サービス</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    教材を探す
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    レビューを投稿
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    大学別ランキング
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">サポート</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    使い方ガイド
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    よくある質問
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    お問い合わせ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-4">法的情報</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    利用規約
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    プライバシーポリシー
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    特定商取引法
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 Studymate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

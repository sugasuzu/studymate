// components/layout/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { user, loading, signOut } = useAuth();

  // ログアウト処理
  const handleSignOut = async () => {
    try {
      await signOut();
      setIsUserMenuOpen(false);
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // ユーザーアバターコンポーネント
  const UserAvatar = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
    const sizeClasses = {
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-10 text-base',
      lg: 'w-12 h-12 text-lg',
    };

    // photoURLが存在し、画像エラーがない場合のみ画像を表示
    const shouldShowImage = user?.photoURL && !imageError;

    return (
      <div
        className={`relative ${sizeClasses[size]} rounded-full overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600`}
      >
        {shouldShowImage ? (
          <>
            <Image
              key={user.photoURL} // URLが変更されたら再レンダリング
              src={user.photoURL}
              alt={user.displayName || 'ユーザーアバター'}
              fill
              sizes={size === 'sm' ? '32px' : size === 'md' ? '40px' : '48px'}
              className="object-cover"
              onError={() => setImageError(true)}
              onLoad={() => setImageError(false)}
              priority={size === 'sm'} // ヘッダーのアバターは優先読み込み
            />
          </>
        ) : (
          // フォールバック：頭文字表示
          <div className="w-full h-full flex items-center justify-center text-white font-semibold">
            {user?.displayName?.charAt(0)?.toUpperCase() ||
              user?.email?.charAt(0)?.toUpperCase() ||
              'U'}
          </div>
        )}
      </div>
    );
  };

  // ローディング中はスケルトンを表示
  if (loading) {
    return (
      <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                Studymate
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <div className="animate-pulse">
                <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            </div>
            <button className="md:hidden text-gray-700 dark:text-gray-200">
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ部分 */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Studymate
            </Link>
          </div>

          {/* デスクトップメニュー */}
          <div className="hidden md:flex items-center space-x-8">
            {/* 共通メニュー */}
            <Link
              href="/materials"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              教材を探す
            </Link>

            {user ? (
              // 認証済みユーザー向けメニュー
              <div className="flex items-center space-x-6">
                <Link
                  href="/questionnaire"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  レビュー投稿
                </Link>

                {/* ユーザーメニュー */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition group"
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="true"
                  >
                    {/* ユーザーアバター */}
                    <div className="group-hover:opacity-90 transition">
                      <UserAvatar size="sm" />
                    </div>
                    <span className="font-medium max-w-[150px] truncate">
                      {user.displayName ||
                        user.email?.split('@')[0] ||
                        'ユーザー'}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        isUserMenuOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* ドロップダウンメニュー */}
                  {isUserMenuOpen && (
                    <>
                      {/* オーバーレイ（クリックで閉じる） */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsUserMenuOpen(false)}
                      />

                      <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                        {/* ユーザー情報ヘッダー */}
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                          <div className="flex items-center space-x-3">
                            <UserAvatar size="md" />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                {user.displayName || 'ユーザー'}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* メニューアイテム */}
                        <Link
                          href="/my"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                          <svg
                            className="w-4 h-4 inline mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          マイページ
                        </Link>
                        <Link
                          href="/my/reviews"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                          <svg
                            className="w-4 h-4 inline mr-2"
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
                          投稿したレビュー
                        </Link>
                        <Link
                          href="/my/settings"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                          <svg
                            className="w-4 h-4 inline mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          設定
                        </Link>
                        <hr className="my-2 border-gray-200 dark:border-gray-700" />
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                        >
                          <svg
                            className="w-4 h-4 inline mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          ログアウト
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              // 未認証ユーザー向けメニュー
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/login"
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  ログイン
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition"
                >
                  無料で始める
                </Link>
              </div>
            )}
          </div>

          {/* モバイルメニューボタン */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 dark:text-gray-200"
            aria-label="メニューを開く"
            aria-expanded={isMenuOpen}
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
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
          <div className="px-4 py-4 space-y-3">
            {/* 共通メニュー */}
            <Link
              href="/materials"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 dark:text-gray-200 py-2"
            >
              教材を探す
            </Link>

            {user ? (
              // 認証済みユーザー向けモバイルメニュー
              <>
                <Link
                  href="/questionnaire"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-200 py-2"
                >
                  レビュー投稿
                </Link>
                <hr className="border-gray-200 dark:border-gray-700" />

                {/* ユーザー情報 */}
                <div className="flex items-center space-x-3 py-2">
                  <UserAvatar size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                      {user.displayName ||
                        user.email?.split('@')[0] ||
                        'ユーザー'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href="/my"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-200 py-2"
                >
                  マイページ
                </Link>
                <Link
                  href="/my/reviews"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-200 py-2"
                >
                  投稿したレビュー
                </Link>
                <Link
                  href="/my/settings"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-200 py-2"
                >
                  設定
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left text-red-600 dark:text-red-400 py-2"
                >
                  ログアウト
                </button>
              </>
            ) : (
              // 未認証ユーザー向けモバイルメニュー
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  ログイン
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition"
                >
                  無料で始める
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

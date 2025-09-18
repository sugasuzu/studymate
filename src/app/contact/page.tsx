import { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from './components/ContactForm';

export const metadata: Metadata = {
  title: 'お問い合わせ | Studymate',
  description:
    'Studymateへのお問い合わせはこちらから。ご質問・ご要望・不具合報告など、お気軽にご連絡ください。',
};

function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* タイトルセクション */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            お問い合わせ
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            ご質問・ご要望・不具合報告など、お気軽にご連絡ください
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              メール
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              24時間受付
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              返信まで2-3営業日
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-purple-600 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              よくある質問
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              FAQページを確認
            </p>
            <Link
              href="/faq"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
            >
              FAQを見る →
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-600 dark:text-green-400"
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
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              優先サポート
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              不具合・緊急のご用件
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              優先的に対応
            </p>
          </div>
        </div>

        {/* お問い合わせフォーム */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            お問い合わせフォーム
          </h2>

          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>ご注意：</strong>
              お問い合わせ内容によっては返信にお時間をいただく場合があります。
              また、内容によっては返信いたしかねる場合もございますので、あらかじめご了承ください。
            </p>
          </div>

          <ContactForm />
        </div>
      </main>
    </div>
  );
}

export default ContactPage;

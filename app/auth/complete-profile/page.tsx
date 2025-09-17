// app/auth/complete-profile/page.tsx
import { Metadata } from 'next';
import { CompleteProfileForm } from './components/CompleteProfileForm';

export const metadata: Metadata = {
  title: 'プロフィール設定 | Studymate',
  description: 'プロフィールを設定して、Studymateの利用を開始しよう',
};

export default function CompleteProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* プロフィール設定カード */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              プロフィールを設定しましょう
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              あなたの情報を入力して、より良いレビュー体験を提供できるようにしましょう
            </p>
          </div>

          {/* プログレスバー */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ステップ 3 / 3
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                もうすぐ完了！
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                style={{ width: '100%' }}
              ></div>
            </div>
          </div>

          <CompleteProfileForm />
        </div>
      </div>
    </div>
  );
}

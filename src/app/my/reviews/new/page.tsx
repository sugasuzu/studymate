import { getSessionUser } from '@/lib/auth-server';
import { redirect } from 'next/navigation';
import { NewReviewForm } from './NewReviewForm';

export const metadata = {
  title: '新規レビュー投稿 | Studymate',
  description: '教材のレビューを投稿して、他の学生の学習をサポートしましょう。',
};

export default async function NewReviewPage() {
  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            新規レビュー投稿
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            使用した教材のレビューを投稿して、他の学生の教材選びをサポートしましょう。
            詳細で正直なレビューほど、多くの学生に参考にされます。
          </p>
        </div>

        {/* フォーム */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          <NewReviewForm userId={sessionUser.uid} />
        </div>
      </main>
    </div>
  );
}

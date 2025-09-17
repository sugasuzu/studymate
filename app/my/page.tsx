// app/my/page.tsx
import { getCurrentUser } from '@/lib/auth-helpers';
import { redirect } from 'next/navigation';

export default async function MyPage() {
  const user = await getCurrentUser();
  
  // ミドルウェアでも保護されているが、二重チェック
  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          ようこそ、{user.name || user.email}さん
        </h1>
        
        {/* ダッシュボードコンテンツ */}
      </main>
    </div>
  );
}
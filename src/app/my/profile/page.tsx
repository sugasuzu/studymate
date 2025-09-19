import { getSessionUser, getUserProfile } from '@/lib/auth-server';
import { redirect } from 'next/navigation';
import { ProfileEditForm } from './components/ProfileEditForm';

export const dynamic = 'force-dynamic';

export default async function ProfileEditPage() {
  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    redirect('/auth/login');
  }

  const profile = await getUserProfile(sessionUser.uid);

  // Timestamp型を文字列に変換してClient Componentに渡せるようにする
  const serializeTimestamp = (timestamp: any) => {
    if (!timestamp) return null;
    if (timestamp instanceof Date) return timestamp.toISOString();
    if (typeof timestamp.toDate === 'function') return timestamp.toDate().toISOString();
    if (typeof timestamp.seconds === 'number') {
      return new Date(timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000)).toISOString();
    }
    return null;
  };

  const serializedProfile = profile ? {
    ...profile,
    createdAt: serializeTimestamp(profile.createdAt),
    updatedAt: serializeTimestamp(profile.updatedAt),
  } : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            プロフィール編集
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            あなたのプロフィール情報を更新します
          </p>
        </div>

        {/* フォーム */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
          <ProfileEditForm initialProfile={serializedProfile} userId={sessionUser.uid} />
        </div>
      </main>
    </div>
  );
}

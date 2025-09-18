// app/auth/complete-profile/components/CompleteProfileForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { UniversitySearch } from '@/app/questionnaire/components/Universitysearch';

export function CompleteProfileForm() {
  const [displayName, setDisplayName] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [department, setDepartment] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [isStudent, setIsStudent] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('ユーザーが見つかりません');
      }

      // Firebase Authのプロフィール更新
      await updateProfile(user, {
        displayName: displayName,
      });

      // Firestoreにプロフィール情報を保存
      await setDoc(doc(db, 'users', user.uid), {
        displayName,
        universityName,
        department,
        graduationYear: parseInt(graduationYear),
        isStudent,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      router.push('/my');
    } catch (error: unknown) {
      console.error('Profile completion error:', error);
      setError('プロフィールの設定に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUniversitySelect = (university: { school_name: string }) => {
    setUniversityName(university.school_name);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* 表示名 */}
      <div>
        <label
          htmlFor="displayName"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
        >
          表示名 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          placeholder="例：山田太郎"
          required
          disabled={isLoading}
        />
        <p className="mt-1 text-xs text-gray-500">
          レビューに表示される名前です
        </p>
      </div>

      {/* ステータス */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          現在のステータス <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="relative">
            <input
              type="radio"
              name="status"
              checked={isStudent}
              onChange={() => setIsStudent(true)}
              className="sr-only peer"
            />
            <div className="px-4 py-3 border-2 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 border-gray-300 dark:border-gray-600">
              <div className="text-center">
                <svg
                  className="w-8 h-8 mx-auto mb-2 text-gray-400 peer-checked:text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
                <span className="font-medium text-gray-900 dark:text-white">
                  在学中
                </span>
              </div>
            </div>
          </label>

          <label className="relative">
            <input
              type="radio"
              name="status"
              checked={!isStudent}
              onChange={() => setIsStudent(false)}
              className="sr-only peer"
            />
            <div className="px-4 py-3 border-2 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 border-gray-300 dark:border-gray-600">
              <div className="text-center">
                <svg
                  className="w-8 h-8 mx-auto mb-2 text-gray-400 peer-checked:text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-medium text-gray-900 dark:text-white">
                  卒業生
                </span>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* 大学名 */}
      <UniversitySearch onUniversitySelect={handleUniversitySelect} />

      {/* 学部・学科 */}
      <div>
        <label
          htmlFor="department"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
        >
          学部・学科 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          placeholder="例：経済学部 経済学科"
          required
          disabled={isLoading}
        />
      </div>

      {/* 卒業年度 */}
      <div>
        <label
          htmlFor="graduationYear"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
        >
          {isStudent ? '卒業予定年度' : '卒業年度'}{' '}
          <span className="text-red-500">*</span>
        </label>
        <select
          id="graduationYear"
          value={graduationYear}
          onChange={(e) => setGraduationYear(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          required
          disabled={isLoading}
        >
          <option value="">選択してください</option>
          {Array.from({ length: 10 }, (_, i) => {
            const year = new Date().getFullYear() + (isStudent ? 5 : 0) - i;
            return (
              <option key={year} value={year}>
                {year}年
              </option>
            );
          })}
        </select>
      </div>

      {/* 送信ボタン */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.push('/my')}
          className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition font-semibold"
          disabled={isLoading}
        >
          スキップ
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg text-lg hover:opacity-90 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? '保存中...' : 'プロフィールを完成'}
        </button>
      </div>
    </form>
  );
}

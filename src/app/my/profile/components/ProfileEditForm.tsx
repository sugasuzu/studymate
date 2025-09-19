'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { UniversitySearch } from '@/app/questionnaire/components/Universitysearch';

interface ProfileEditFormProps {
  initialProfile: any;
  userId: string;
}

export function ProfileEditForm({
  initialProfile,
  userId,
}: ProfileEditFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: initialProfile?.displayName || '',
    universityName: initialProfile?.universityName || '',
    universityDepartment: initialProfile?.universityDepartment || '',
    graduationYear: initialProfile?.graduationYear || '',
    isStudent: initialProfile?.isStudent ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Firebase Auth のプロフィール更新
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: formData.displayName,
        });
      }

      // Firestore の更新
      await setDoc(
        doc(db, 'users', userId),
        {
          ...formData,
          profileCompleted: true,
          updatedAt: new Date(),
        },
        { merge: true }
      );

      router.push('/my');
      router.refresh();
    } catch (error) {
      console.error('Profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 表示名 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          表示名 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.displayName}
          onChange={(e) =>
            setFormData({ ...formData, displayName: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          required
        />
      </div>

      {/* 大学名 */}
      <div>
        <UniversitySearch
          onUniversitySelect={(university) =>
            setFormData({ ...formData, universityName: university.school_name })
          }
        />
      </div>

      {/* 学部・学科 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          学部・学科 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.universityDepartment}
          onChange={(e) =>
            setFormData({ ...formData, universityDepartment: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          placeholder="例：経済学部 経済学科"
          required
        />
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
              checked={formData.isStudent}
              onChange={() => setFormData({ ...formData, isStudent: true })}
              className="sr-only peer"
            />
            <div className="px-4 py-3 border-2 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 border-gray-300 dark:border-gray-600 text-center">
              <span className="font-medium text-gray-900 dark:text-white">
                在学中
              </span>
            </div>
          </label>

          <label className="relative">
            <input
              type="radio"
              name="status"
              checked={!formData.isStudent}
              onChange={() => setFormData({ ...formData, isStudent: false })}
              className="sr-only peer"
            />
            <div className="px-4 py-3 border-2 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 border-gray-300 dark:border-gray-600 text-center">
              <span className="font-medium text-gray-900 dark:text-white">
                卒業生
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* 卒業年度 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          {formData.isStudent ? '卒業予定年度' : '卒業年度'}{' '}
          <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.graduationYear}
          onChange={(e) =>
            setFormData({ ...formData, graduationYear: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          required
        >
          <option value="">選択してください</option>
          {Array.from({ length: 10 }, (_, i) => {
            const year =
              new Date().getFullYear() + (formData.isStudent ? 5 : 0) - i;
            return (
              <option key={year} value={year}>
                {year}年
              </option>
            );
          })}
        </select>
      </div>

      {/* ボタン */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.push('/my')}
          className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition font-semibold"
        >
          キャンセル
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {isLoading ? '保存中...' : '保存する'}
        </button>
      </div>
    </form>
  );
}

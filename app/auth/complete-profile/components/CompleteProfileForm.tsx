// app/auth/complete-profile/components/CompleteProfileForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { auth, db, storage } from '@/lib/firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import Resizer from 'react-image-file-resizer';
import { UniversitySearch } from '@/app/questionnaire/components/Universitysearch';

interface University {
  school_code: string;
  school_name: string;
  prefecture?: string;
  homepage?: string;
  address?: string;
}

export function CompleteProfileForm() {
  const [displayName, setDisplayName] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [department, setDepartment] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [isStudent, setIsStudent] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [canSkip, setCanSkip] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkExistingProfile();
  }, []);

  const checkExistingProfile = async () => {
    setIsChecking(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log('No current user found, redirecting to login');
        router.push('/auth/login');
        return;
      }

      console.log('Current user:', user.uid, user.email);

      // Firestoreから既存のプロフィールを取得
      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (userDoc.exists()) {
        const data = userDoc.data();
        console.log('Existing profile data:', data);

        // プロフィールが既に完成している場合
        if (data.profileCompleted) {
          console.log('Profile already completed, redirecting to /my');
          router.push('/my');
          return;
        }

        // 部分的にデータがある場合は事前入力
        if (data.displayName) setDisplayName(data.displayName);
        if (data.universityName) setUniversityName(data.universityName);
        if (data.universityDepartment) setDepartment(data.universityDepartment);
        if (data.graduationYear) setGraduationYear(String(data.graduationYear));
        if (typeof data.isStudent === 'boolean') setIsStudent(data.isStudent);
        if (data.photoURL) setProfileImage(data.photoURL);

        // Googleログインユーザーはスキップ可能
        setCanSkip(user.providerData[0]?.providerId === 'google.com');
      } else {
        console.log('Creating initial user document');
        // 新規ユーザーの場合、初期データを作成
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          profileCompleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      // Googleアカウントから情報を取得
      if (user.displayName && !displayName) {
        setDisplayName(user.displayName);
      }
      if (user.photoURL && !profileImage) {
        setProfileImage(user.photoURL);
      }
    } catch (error) {
      console.error('Error checking profile:', error);
      setError('プロフィールの取得に失敗しました');
    } finally {
      setIsChecking(false);
    }
  };

  // 画像をリサイズする関数
  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        200, // 幅
        200, // 高さ
        'JPEG', // フォーマット
        80, // 品質
        0, // 回転
        (uri) => {
          resolve(uri as string);
        },
        'base64' // 出力タイプ
      );
    });
  };

  // 画像ファイルを選択する関数
  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // ファイルタイプをチェック
    if (!file.type.startsWith('image/')) {
      setError('画像ファイルを選択してください');
      return;
    }

    // ファイルサイズをチェック（5MB以下）
    if (file.size > 5 * 1024 * 1024) {
      setError('ファイルサイズは5MB以下にしてください');
      return;
    }

    try {
      setIsUploadingImage(true);
      setError(null);

      // 画像をリサイズ
      const resizedImage = await resizeImage(file);
      setProfileImage(resizedImage);
      setProfileImageFile(file);
    } catch (error) {
      console.error('Image resize error:', error);
      setError('画像の処理に失敗しました');
    } finally {
      setIsUploadingImage(false);
    }
  };

  // 画像をFirebase Storageにアップロードする関数
  const uploadProfileImage = async (userId: string): Promise<string | null> => {
    if (!profileImage) return null;

    try {
      const imageRef = ref(storage, `profile-images/${userId}/${Date.now()}.jpg`);
      await uploadString(imageRef, profileImage, 'data_url');
      const downloadURL = await getDownloadURL(imageRef);
      return downloadURL;
    } catch (error) {
      console.error('Image upload error:', error);
      throw new Error('画像のアップロードに失敗しました');
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!displayName.trim()) {
      errors.displayName = '表示名は必須です';
    }

    if (!universityName.trim()) {
      errors.universityName = '大学名は必須です';
    }

    if (!department.trim()) {
      errors.department = '学部・学科は必須です';
    }

    if (!graduationYear) {
      errors.graduationYear = '卒業年度は必須です';
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      console.log('Validation errors:', errors);
      setError('必須項目を入力してください');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');

    // バリデーション
    if (!validateForm()) {
      console.log('Validation failed');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('ユーザーが見つかりません');
      }

      console.log('Updating profile for user:', user.uid);
      console.log('Form data:', {
        displayName,
        universityName,
        department,
        graduationYear,
        isStudent,
        hasProfileImage: !!profileImage,
      });

      // プロフィール画像をアップロード（ある場合）
      let photoURL = user.photoURL;
      if (profileImage && profileImageFile) {
        console.log('Uploading profile image...');
        photoURL = await uploadProfileImage(user.uid);
        console.log('Profile image uploaded:', photoURL);
      }

      // Firebase Authのプロフィール更新
      await updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL,
      });
      console.log('Firebase Auth profile updated');

      // Firestoreにプロフィール情報を保存
      const profileData = {
        displayName,
        universityName,
        universityDepartment: department,
        graduationYear: parseInt(graduationYear),
        isStudent,
        email: user.email,
        photoURL: photoURL,
        emailVerified: user.emailVerified,
        profileCompleted: true, // プロフィール完成フラグを設定
        updatedAt: new Date(),
      };

      console.log('Saving to Firestore:', profileData);
      await setDoc(
        doc(db, 'users', user.uid),
        profileData,
        { merge: true } // 既存のデータとマージ
      );
      console.log('Firestore updated successfully');

      // セッションを更新
      await user.getIdToken(true);
      console.log('Token refreshed');

      // 成功したらリダイレクト
      console.log('Redirecting to /my');
      router.push('/my');
    } catch (error: any) {
      console.error('Profile completion error:', error);
      setError(error.message || 'プロフィールの設定に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = async () => {
    setIsLoading(true);
    console.log('Skip button clicked');
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('ユーザーが見つかりません');
      }

      // 最低限の情報だけ保存
      await setDoc(
        doc(db, 'users', user.uid),
        {
          displayName: user.displayName || 'ユーザー',
          email: user.email,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          profileCompleted: false, // スキップの場合は未完成のまま
          skippedAt: new Date(), // スキップした記録
          updatedAt: new Date(),
        },
        { merge: true }
      );

      router.push('/my');
    } catch (error: any) {
      console.error('Skip error:', error);
      setError(error.message || 'スキップ処理に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUniversitySelect = (university: University) => {
    console.log('University selected:', university);
    setUniversityName(university.school_name);
    // バリデーションエラーをクリア
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.universityName;
      return newErrors;
    });
  };

  if (isChecking) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
          onChange={(e) => {
            setDisplayName(e.target.value);
            // バリデーションエラーをクリア
            if (validationErrors.displayName) {
              setValidationErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.displayName;
                return newErrors;
              });
            }
          }}
          className={`w-full px-4 py-2 border ${
            validationErrors.displayName
              ? 'border-red-500'
              : 'border-gray-300 dark:border-gray-600'
          } rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white`}
          placeholder="例：山田太郎"
          required
          disabled={isLoading}
        />
        {validationErrors.displayName && (
          <p className="mt-1 text-sm text-red-600">
            {validationErrors.displayName}
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          レビューに表示される名前です
        </p>
      </div>

      {/* プロフィール画像 */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          プロフィール画像
        </label>
        <div className="flex items-center space-x-4">
          {/* プレビュー画像 */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="プロフィール画像"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
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
                </div>
              )}
            </div>
            {isUploadingImage && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            )}
          </div>

          {/* アップロードボタン */}
          <div className="flex-1">
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
              disabled={isLoading || isUploadingImage}
            />
            <label
              htmlFor="profileImage"
              className={`inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition ${
                isLoading || isUploadingImage
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              画像を選択
            </label>
            <p className="mt-1 text-xs text-gray-500">
              JPEG、PNG形式 / 5MB以下 / 200×200pxに自動リサイズされます
            </p>
          </div>
        </div>
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
      <div>
        <UniversitySearch onUniversitySelect={handleUniversitySelect} />
        {validationErrors.universityName && (
          <p className="mt-1 text-sm text-red-600">
            {validationErrors.universityName}
          </p>
        )}
      </div>

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
          onChange={(e) => {
            setDepartment(e.target.value);
            // バリデーションエラーをクリア
            if (validationErrors.department) {
              setValidationErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.department;
                return newErrors;
              });
            }
          }}
          className={`w-full px-4 py-2 border ${
            validationErrors.department
              ? 'border-red-500'
              : 'border-gray-300 dark:border-gray-600'
          } rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white`}
          placeholder="例：経済学部 経済学科"
          required
          disabled={isLoading}
        />
        {validationErrors.department && (
          <p className="mt-1 text-sm text-red-600">
            {validationErrors.department}
          </p>
        )}
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
          onChange={(e) => {
            setGraduationYear(e.target.value);
            // バリデーションエラーをクリア
            if (validationErrors.graduationYear) {
              setValidationErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.graduationYear;
                return newErrors;
              });
            }
          }}
          className={`w-full px-4 py-2 border ${
            validationErrors.graduationYear
              ? 'border-red-500'
              : 'border-gray-300 dark:border-gray-600'
          } rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white`}
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
        {validationErrors.graduationYear && (
          <p className="mt-1 text-sm text-red-600">
            {validationErrors.graduationYear}
          </p>
        )}
      </div>

      {/* 送信ボタン */}
      <div className="flex gap-4">
        {canSkip && (
          <button
            type="button"
            onClick={handleSkip}
            className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition font-semibold"
            disabled={isLoading}
          >
            スキップ
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg text-lg hover:opacity-90 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              保存中...
            </span>
          ) : (
            'プロフィールを完成'
          )}
        </button>
      </div>

      <p className="text-xs text-center text-gray-500 dark:text-gray-400">
        プロフィールは後から「マイページ」で変更できます
      </p>
    </form>
  );
}

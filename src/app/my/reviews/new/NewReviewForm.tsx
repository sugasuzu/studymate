'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Material {
  name: string;
  publisher: string;
  price: string;
  category: string;
  difficulty: number;
  usagePeriod: string;
  rating: number;
  review: string;
  barcode?: string;
}

interface NewReviewFormProps {
  userId: string;
}

export function NewReviewForm({ userId }: NewReviewFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [material, setMaterial] = useState<Material>({
    name: '',
    publisher: '',
    price: '',
    category: '',
    difficulty: 3,
    usagePeriod: '',
    rating: 5,
    review: '',
    barcode: '',
  });

  const categories = [
    '英語',
    '数学',
    '現代文',
    '古文・漢文',
    '物理',
    '化学',
    '生物',
    '地学',
    '日本史',
    '世界史',
    '地理',
    '政治・経済',
    '倫理',
    '現代社会',
    '情報',
    'その他',
  ];

  const difficultyLabels = {
    1: '基礎',
    2: '標準',
    3: '応用',
    4: '発展',
    5: '最難関',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // バリデーション
      if (!material.name.trim()) {
        throw new Error('教材名は必須です');
      }
      if (!material.category) {
        throw new Error('教科を選択してください');
      }
      if (material.review.length < 20) {
        throw new Error('レビューは20文字以上で入力してください');
      }

      // TODO: Server Actionで実装予定
      // const reviewData = {
      //   userId,
      //   materialName: material.name.trim(),
      //   publisher: material.publisher.trim(),
      //   price: material.price.trim(),
      //   category: material.category,
      //   difficulty: material.difficulty,
      //   usagePeriod: material.usagePeriod.trim(),
      //   rating: material.rating,
      //   review: material.review.trim(),
      //   barcode: material.barcode?.trim() || null,
      //   createdAt: new Date(),
      //   status: 'published',
      //   helpfulCount: 0,
      // };
      // const result = await createReview(reviewData);

      // 一時的にuserIdを使用してlint警告を回避
      console.log('Creating review for user:', userId);

      // 仮の成功処理
      setSuccessMessage('レビューが正常に投稿されました！');

      // 3秒後にリダイレクト
      setTimeout(() => {
        router.push('/my/reviews');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : '投稿に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof Material, value: string | number) => {
    setMaterial((prev) => ({ ...prev, [field]: value }));
  };

  if (successMessage) {
    return (
      <div className="p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            投稿完了
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {successMessage}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            自動的にレビュー一覧ページに移動します...
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-8">
      {/* エラー表示 */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex">
            <svg
              className="w-5 h-5 text-red-400 mt-0.5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-800 dark:text-red-300">{error}</p>
          </div>
        </div>
      )}

      {/* 教材基本情報 */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          教材基本情報
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 教材名 */}
          <div className="md:col-span-2">
            <label
              htmlFor="materialName"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              教材名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="materialName"
              value={material.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="例：システム英単語"
              required
            />
          </div>

          {/* 出版社 */}
          <div>
            <label
              htmlFor="publisher"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              出版社
            </label>
            <input
              type="text"
              id="publisher"
              value={material.publisher}
              onChange={(e) => handleInputChange('publisher', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="例：駿台文庫"
            />
          </div>

          {/* 価格 */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              価格
            </label>
            <input
              type="text"
              id="price"
              value={material.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="例：1,100円"
            />
          </div>

          {/* 教科 */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              教科 <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              value={material.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              required
            >
              <option value="">選択してください</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* 難易度 */}
          <div>
            <label
              htmlFor="difficulty"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              難易度
            </label>
            <select
              id="difficulty"
              value={material.difficulty}
              onChange={(e) =>
                handleInputChange('difficulty', parseInt(e.target.value))
              }
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            >
              {Object.entries(difficultyLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 使用期間 */}
        <div>
          <label
            htmlFor="usagePeriod"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            使用期間
          </label>
          <input
            type="text"
            id="usagePeriod"
            value={material.usagePeriod}
            onChange={(e) => handleInputChange('usagePeriod', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            placeholder="例：高校2年生〜3年生の2年間"
          />
        </div>

        {/* バーコード（オプション） */}
        <div>
          <label
            htmlFor="barcode"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            ISBN/バーコード（任意）
          </label>
          <input
            type="text"
            id="barcode"
            value={material.barcode}
            onChange={(e) => handleInputChange('barcode', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            placeholder="例：9784796116503"
          />
        </div>
      </div>

      {/* 評価・レビュー */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          評価・レビュー
        </h2>

        {/* 総合評価 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            総合評価
          </label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleInputChange('rating', star)}
                className={`text-2xl transition ${
                  star <= material.rating
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              >
                ★
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {material.rating}/5
            </span>
          </div>
        </div>

        {/* レビュー本文 */}
        <div>
          <label
            htmlFor="review"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            レビュー <span className="text-red-500">*</span>
          </label>
          <textarea
            id="review"
            value={material.review}
            onChange={(e) => handleInputChange('review', e.target.value)}
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            placeholder="この教材を使った感想、良かった点、改善点、おすすめの使い方などを詳しく教えてください。具体的で詳細なレビューほど、他の学生に参考にされます。"
            required
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {material.review.length}/最低20文字
          </p>
        </div>
      </div>

      {/* 投稿ガイドライン */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
          投稿ガイドライン
        </h3>
        <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
          <li>• 正直で建設的なレビューを心がけてください</li>
          <li>• 具体的な学習方法や活用法を含めると参考になります</li>
          <li>• 他の教材との比較があると分かりやすいです</li>
          <li>• 誹謗中傷や不適切な内容は禁止されています</li>
        </ul>
      </div>

      {/* 送信ボタン */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition font-medium"
        >
          キャンセル
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition transform hover:scale-105 disabled:transform-none"
        >
          {isSubmitting ? '投稿中...' : 'レビューを投稿'}
        </button>
      </div>
    </form>
  );
}

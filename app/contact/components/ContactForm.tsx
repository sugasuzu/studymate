'use client';

import { submitContactForm } from '@/lib/actions/contact';
import { useState } from 'react';

type ContactCategory = 'general' | 'bug' | 'request' | 'partnership' | 'other';

interface ContactFormData {
  name: string;
  email: string;
  category: ContactCategory;
  subject: string;
  message: string;
  acceptPrivacy: boolean;
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    category: 'general',
    subject: '',
    message: '',
    acceptPrivacy: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.acceptPrivacy) {
      setError('プライバシーポリシーへの同意が必要です');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setIsSuccess(true);
        // フォームをリセット
        setFormData({
          name: '',
          email: '',
          category: 'general',
          subject: '',
          message: '',
          acceptPrivacy: false,
        });
      } else {
        setError(result.error || '送信に失敗しました');
      }
    } catch (err) {
      setError('送信中にエラーが発生しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center">
        <svg
          className="w-16 h-16 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          送信完了しました
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          お問い合わせいただきありがとうございます。
          <br />
          内容を確認の上、担当者より返信させていただきます。
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          新しいお問い合わせを送信
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* お名前 */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
        >
          お名前 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          required
        />
      </div>

      {/* メールアドレス */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
        >
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          required
        />
      </div>

      {/* お問い合わせ種別 */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
        >
          お問い合わせ種別 <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) =>
            setFormData({
              ...formData,
              category: e.target.value as ContactCategory,
            })
          }
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          required
        >
          <option value="general">一般的なお問い合わせ</option>
          <option value="bug">不具合報告</option>
          <option value="request">機能要望</option>
          <option value="partnership">提携・パートナーシップ</option>
          <option value="other">その他</option>
        </select>
      </div>

      {/* 件名 */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
        >
          件名 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="subject"
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          required
        />
      </div>

      {/* お問い合わせ内容 */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
        >
          お問い合わせ内容 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          rows={6}
          required
        />
      </div>

      {/* プライバシーポリシー同意 */}
      <div>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={formData.acceptPrivacy}
            onChange={(e) =>
              setFormData({ ...formData, acceptPrivacy: e.target.checked })
            }
            className="mt-1"
            required
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            <a
              href="/privacy"
              target="_blank"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              プライバシーポリシー
            </a>
            に同意します <span className="text-red-500">*</span>
          </span>
        </label>
      </div>

      {/* 送信ボタン */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg text-lg hover:opacity-90 transition transform hover:scale-105 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? '送信中...' : '送信する'}
        </button>
      </div>
    </form>
  );
}

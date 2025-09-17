'use server';

import { z } from 'zod';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type ActionResult<T> =
  | {
      success: true;
      data?: T;
    }
  | {
      success: false;
      error: string;
      code?: string;
    };

// バリデーションスキーマ
const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'お名前は必須です')
    .max(100, 'お名前は100文字以内で入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  category: z.enum(['general', 'bug', 'request', 'partnership', 'other']),
  subject: z
    .string()
    .min(1, '件名は必須です')
    .max(200, '件名は200文字以内で入力してください'),
  message: z
    .string()
    .min(10, 'お問い合わせ内容は10文字以上で入力してください')
    .max(2000, 'お問い合わせ内容は2000文字以内で入力してください'),
  acceptPrivacy: z.literal(true, {
    message: 'プライバシーポリシーへの同意が必要です',
  }),
});

/**
 * お問い合わせフォームを送信するServer Action
 */
export async function submitContactForm(
  data: unknown
): Promise<ActionResult<{ id: string }>> {
  try {
    // バリデーション
    const validatedData = contactSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        success: false,
        error:
          validatedData.error.issues[0]?.message || '入力内容に不備があります',
        code: 'VALIDATION_ERROR',
      };
    }

    const { name, email, category, subject, message } = validatedData.data;

    // Firestoreに保存
    const docRef = await addDoc(collection(db, 'contacts'), {
      name,
      email,
      category,
      subject,
      message,
      status: 'unread',
      createdAt: new Date(),
      userAgent: '', // 必要に応じてheadersから取得
      ipAddress: '', // 必要に応じてheadersから取得
    });

    // TODO: メール送信処理
    // await sendContactNotificationEmail({ name, email, subject, message });

    return {
      success: true,
      data: { id: docRef.id },
    };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      error:
        '送信中にエラーが発生しました。しばらく時間をおいてから再度お試しください。',
      code: 'INTERNAL_ERROR',
    };
  }
}

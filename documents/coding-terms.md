# Studymate コーディング規約 v1.0

## 📋 概要

このドキュメントは、Studymateプロジェクトにおけるコーディング規約とベストプラクティスを定義します。

### 🎯 基本方針

1. **UX最優先**: ユーザー体験の向上を最重要視
2. **パフォーマンス重視**: 高速なページ読み込みと応答性
3. **保守性の確保**: 可読性が高く、拡張しやすいコード
4. **セキュリティの徹底**: 安全なWebアプリケーションの構築

### 🏗️ 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript 5+
- **スタイリング**: Tailwind CSS
- **データベース**: Firebase Firestore
- **認証**: Firebase Auth
- **デプロイ**: Vercel

---

## 🏛️ アーキテクチャ指針

### SSR優先戦略

**基本原則**: すべてのページとコンポーネントは **Server-Side Rendering (SSR)** をデフォルトとする

#### なぜSSRを優先するのか

```typescript
// ❌ 悪い例: 不要なクライアントサイドレンダリング
"use client";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// ✅ 良い例: SSRでデータを事前取得
import { getProducts } from '@/lib/products';

export default async function ProductList() {
  const products = await getProducts();

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**SSRの利点**:
- 初回読み込み速度の向上（FCP, LCP最適化）
- SEO対応の確実性
- JavaScript無効環境でも動作
- ネットワーク遅延の影響を最小化

### Client-Side Rendering (CSR) 使用基準

`"use client"` ディレクティブは以下の場合のみ使用する：

#### 1. ユーザーインタラクションが必要な場合

```typescript
// ✅ 適切なCSR使用例: フォーム送信
"use client";

import { useState } from 'react';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    // Server Actionを呼び出し
    await submitContactForm(formData);
    setIsSubmitting(false);
    setMessage('送信完了しました');
  };

  return (
    <form action={handleSubmit}>
      <input name="email" type="email" required />
      <textarea name="message" required />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '送信中...' : '送信'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
```

#### 2. ブラウザAPIが必要な場合

```typescript
// ✅ 適切なCSR使用例: ブラウザAPI
"use client";

import { useEffect, useState } from 'react';

export function GeolocationComponent() {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }
  }, []);

  return location ? (
    <div>現在地: {location.lat}, {location.lng}</div>
  ) : (
    <div>位置情報を取得中...</div>
  );
}
```

#### 3. 状態管理が必要な場合

```typescript
// ✅ 適切なCSR使用例: 複雑な状態管理
"use client";

import { useState, useCallback } from 'react';

export function ShoppingCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((item: CartItem) => {
    setItems(prev => [...prev, item]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        カート ({items.length})
      </button>
      {isOpen && (
        <div className="cart-dropdown">
          {items.map(item => (
            <CartItem key={item.id} item={item} onRemove={removeItem} />
          ))}
        </div>
      )}
    </div>
  );
}
```

### Server Actions 活用戦略

**基本原則**: API Routes の代わりに **Server Actions** を積極的に使用する

#### Server Actions の利点

1. **型安全性**: TypeScriptの恩恵を最大限享受
2. **パフォーマンス**: 不要なネットワークラウンドトリップの削除
3. **開発効率**: API Routesとクライアントの往復作業が不要
4. **セキュリティ**: サーバーサイドでの直接実行

#### データベース操作

```typescript
// ✅ 推奨: Server Actions でデータベース操作
"use server";

import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export async function createQuestionnaire(data: QuestionnaireData) {
  try {
    // バリデーション
    if (!data.universityName || !data.materials?.length) {
      throw new Error('必須項目が不足しています');
    }

    // Firestore への保存
    const docRef = await addDoc(collection(db, 'questionnaires'), {
      ...data,
      createdAt: new Date(),
      status: 'active'
    });

    // キャッシュの無効化
    revalidatePath('/questionnaires');

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Questionnaire creation failed:', error);
    return { success: false, error: error.message };
  }
}

export async function getQuestionnairesByUniversity(universityName: string) {
  try {
    const q = query(
      collection(db, 'questionnaires'),
      where('universityName', '==', universityName),
      where('status', '==', 'active')
    );

    const querySnapshot = await getDocs(q);
    const questionnaires = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return { success: true, data: questionnaires };
  } catch (error) {
    console.error('Failed to fetch questionnaires:', error);
    return { success: false, error: error.message };
  }
}
```

#### 外部サービス連携

```typescript
// ✅ 推奨: Server Actions で外部API呼び出し
"use server";

import { headers } from 'next/headers';
import { ratelimit } from '@/lib/ratelimit';

export async function searchUniversities(keyword: string) {
  // Rate limiting
  const headersList = headers();
  const ip = headersList.get('x-forwarded-for') ?? 'anonymous';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    throw new Error('レート制限に達しました');
  }

  try {
    const response = await fetch(
      `https://api.edu-data.jp/api/v1/school/search?keyword=${encodeURIComponent(keyword)}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.EDU_DATA_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 } // 1時間キャッシュ
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, universities: data.schools?.data || [] };
  } catch (error) {
    console.error('University search failed:', error);
    return { success: false, error: '大学検索に失敗しました' };
  }
}
```

#### フォーム処理

```typescript
// ✅ 推奨: Server Actions でフォーム処理
"use server";

import { z } from 'zod';
import { redirect } from 'next/navigation';

const contactSchema = z.object({
  name: z.string().min(1, '名前は必須です'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  message: z.string().min(10, 'メッセージは10文字以上で入力してください'),
});

export async function submitContactForm(formData: FormData) {
  // フォームデータの検証
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, message } = validatedFields.data;

  try {
    // メール送信処理（例: SendGrid, Nodemailer など）
    await sendContactEmail({ name, email, message });

    // データベースに保存
    await saveContactSubmission({ name, email, message });

    // 成功ページにリダイレクト
    redirect('/contact/success');
  } catch (error) {
    console.error('Contact form submission failed:', error);
    return {
      success: false,
      errors: { _form: ['送信に失敗しました。再度お試しください。'] }
    };
  }
}
```

### API Routes 使用基準

API Routesは以下の場合のみ使用する：

#### 1. Webhookエンドポイント

```typescript
// ✅ 適切なAPI Routes使用例: Webhook
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { verifyWebhookSignature } from '@/lib/webhook';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = headers();
  const signature = headersList.get('stripe-signature');

  // Webhookの署名検証
  if (!verifyWebhookSignature(body, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const event = JSON.parse(body);

  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSuccess(event.data.object);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
```

#### 2. 外部システム向けAPI

```typescript
// ✅ 適切なAPI Routes使用例: 外部システム向けAPI
import { NextRequest, NextResponse } from 'next/server';
import { verifyApiKey } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key');

  if (!verifyApiKey(apiKey)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 外部システム向けデータ提供
  const data = await getPublicQuestionnaireData();

  return NextResponse.json(data);
}
```

---

## 📁 ファイル・ディレクトリ構造

### プロジェクト構造

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route Groups
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   │   ├── page.tsx              # Server Component
│   │   ├── loading.tsx           # Loading UI
│   │   ├── error.tsx             # Error UI
│   │   └── components/           # ページ固有コンポーネント
│   ├── api/                      # API Routes（最小限）
│   │   └── webhooks/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/                   # 共通コンポーネント
│   ├── ui/                       # 基本UIコンポーネント
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── forms/                    # フォーム関連
│   └── layout/                   # レイアウト関連
├── lib/                          # ユーティリティ・設定
│   ├── actions/                  # Server Actions
│   │   ├── auth.ts
│   │   ├── questionnaires.ts
│   │   └── universities.ts
│   ├── validations/              # Zodスキーマ
│   ├── utils.ts
│   ├── firebase.ts
│   └── constants.ts
├── types/                        # TypeScript型定義
│   ├── auth.ts
│   ├── questionnaire.ts
│   └── index.ts
└── hooks/                        # Custom Hooks（CSRのみ）
    ├── useLocalStorage.ts
    └── useDebounce.ts
```

### ファイル命名規則

#### コンポーネント

```typescript
// ✅ PascalCase でファイル名とコンポーネント名を統一
// components/ui/Button.tsx
export function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}

// ✅ デフォルトエクスポートは使用しない（名前付きエクスポートを推奨）
export { Button };

// ❌ 悪い例
export default function button() { /* ... */ }
export default Button;
```

#### Server Actions

```typescript
// ✅ 動詞で始まる分かりやすい名前
// lib/actions/questionnaires.ts
export async function createQuestionnaire(data: QuestionnaireData) { /* ... */ }
export async function updateQuestionnaire(id: string, data: Partial<QuestionnaireData>) { /* ... */ }
export async function deleteQuestionnaire(id: string) { /* ... */ }
export async function getQuestionnaireById(id: string) { /* ... */ }
export async function getQuestionnairesByUser(userId: string) { /* ... */ }
```

#### ページファイル

```typescript
// ✅ Next.js App Router規約に従う
app/
├── page.tsx                    # / ルート
├── about/page.tsx             # /about ルート
├── questionnaires/
│   ├── page.tsx               # /questionnaires ルート
│   ├── [id]/page.tsx          # /questionnaires/[id] 動的ルート
│   └── create/page.tsx        # /questionnaires/create ルート
```

---

## 🏷️ 命名規則

### 変数・関数名

```typescript
// ✅ camelCase を使用
const userName = 'suzuki';
const isLoggedIn = true;
const currentDate = new Date();

function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ✅ Boolean値には is-, has-, can-, should- プレフィックスを使用
const isVisible = true;
const hasPermission = false;
const canEdit = user.role === 'admin';
const shouldRedirect = !isAuthenticated;

// ✅ 配列は複数形
const users = await getUsers();
const questionnaires = await getQuestionnaires();

// ❌ 悪い例
const user_name = 'suzuki';        // snake_case は避ける
const UserName = 'suzuki';         // PascalCase は変数では使わない
const visible = true;              // Boolean値にプレフィックスなし
const userData = await getUsers(); // 単数形で配列を表現
```

### 定数

```typescript
// ✅ SCREAMING_SNAKE_CASE を使用
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const API_ENDPOINTS = {
  UNIVERSITIES: '/api/universities',
  QUESTIONNAIRES: '/api/questionnaires',
} as const;

export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
```

### 型定義

```typescript
// ✅ PascalCase を使用
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

type UserRole = 'admin' | 'user' | 'guest';

// ✅ 汎用的な型には Generic を使用
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ✅ Props型には Component名 + Props サフィックス
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
}
```

---

## 🔧 TypeScript規約

### 厳格な設定

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### 型定義のベストプラクティス

```typescript
// ✅ 明示的な型定義
function processUserData(user: User): ProcessedUser {
  return {
    id: user.id,
    displayName: `${user.firstName} ${user.lastName}`,
    isActive: user.status === 'active',
  };
}

// ✅ Union Types の活用
type LoadingState = 'idle' | 'loading' | 'success' | 'error';

interface AsyncState<T> {
  data?: T;
  status: LoadingState;
  error?: string;
}

// ✅ 型ガードの使用
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function processInput(input: unknown) {
  if (isString(input)) {
    // この時点でinputはstring型として認識される
    return input.toUpperCase();
  }
  throw new Error('Input must be a string');
}

// ✅ Readonly の活用
interface ReadonlyConfig {
  readonly apiUrl: string;
  readonly maxRetries: number;
  readonly timeout: number;
}

// ✅ 配列の型安全性
const VALID_ROLES = ['admin', 'user', 'guest'] as const;
type ValidRole = typeof VALID_ROLES[number]; // 'admin' | 'user' | 'guest'
```

### エラー処理の型定義

```typescript
// ✅ Result型パターンの使用
type Result<T, E = Error> = {
  success: true;
  data: T;
} | {
  success: false;
  error: E;
};

async function fetchUser(id: string): Promise<Result<User, string>> {
  try {
    const user = await getUserById(id);
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: 'ユーザーの取得に失敗しました' };
  }
}

// 使用例
const result = await fetchUser('123');
if (result.success) {
  console.log(result.data.name); // 型安全
} else {
  console.error(result.error);   // 型安全
}
```

---

## ⚡ Next.js固有の規約

### メタデータの管理

```typescript
// ✅ Metadata API の使用
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'アンケート作成 | Studymate',
  description: '大学受験教材のレビューを投稿するためのアンケートフォーム',
  openGraph: {
    title: 'アンケート作成 | Studymate',
    description: '大学受験教材のレビューを投稿するためのアンケートフォーム',
    type: 'website',
  },
};

export default function QuestionnairePage() {
  return <QuestionnaireForm />;
}
```

### 画像最適化

```typescript
// ✅ Next.js Image コンポーネントの使用
import Image from 'next/image';

export function BookCover({ book }: { book: Book }) {
  return (
    <Image
      src={book.coverUrl}
      alt={`${book.title}の表紙`}
      width={200}
      height={300}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
      loading="lazy"
    />
  );
}
```

### 動的インポート

```typescript
// ✅ 重いコンポーネントの遅延読み込み
import dynamic from 'next/dynamic';

const BarcodeScanner = dynamic(
  () => import('./BarcodeScanner').then(mod => ({ default: mod.BarcodeScanner })),
  {
    loading: () => <p>バーコードスキャナーを読み込み中...</p>,
    ssr: false, // ブラウザAPIを使用する場合のみ
  }
);

export function QuestionnaireForm() {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <form>
      {/* 他のフィールド */}
      {showScanner && <BarcodeScanner onDetected={handleBarcode} />}
    </form>
  );
}
```

### キャッシュ戦略

```typescript
// ✅ 適切なキャッシュ戦略
// 静的データ（1時間キャッシュ）
export async function getUniversityList() {
  const response = await fetch('https://api.edu-data.jp/universities', {
    next: { revalidate: 3600 }
  });
  return response.json();
}

// 動的データ（キャッシュなし）
export async function getUserQuestionnaires(userId: string) {
  const response = await fetch(`/api/users/${userId}/questionnaires`, {
    cache: 'no-store'
  });
  return response.json();
}

// タグベースのキャッシュ無効化
export async function createQuestionnaire(data: QuestionnaireData) {
  // データ作成処理
  const result = await addDoc(collection(db, 'questionnaires'), data);

  // キャッシュの無効化
  revalidateTag('questionnaires');
  revalidatePath('/questionnaires');

  return result;
}
```

---

## 🚀 パフォーマンス最適化

### Core Web Vitals 最適化

#### 1. Largest Contentful Paint (LCP)

```typescript
// ✅ 重要な画像を優先読み込み
import Image from 'next/image';

export function HeroSection() {
  return (
    <section>
      <Image
        src="/hero-image.jpg"
        alt="メインビジュアル"
        width={1200}
        height={600}
        priority // 最初に表示される画像は priority を付ける
        placeholder="blur"
        blurDataURL="..."
      />
    </section>
  );
}

// ✅ Server Components でのデータ事前取得
export default async function HomePage() {
  // 並列でデータを取得
  const [featuredQuestionnaires, topUniversities] = await Promise.all([
    getFeaturedQuestionnaires(),
    getTopUniversities(),
  ]);

  return (
    <main>
      <HeroSection />
      <FeaturedQuestionnaires questionnaires={featuredQuestionnaires} />
      <TopUniversities universities={topUniversities} />
    </main>
  );
}
```

#### 2. Cumulative Layout Shift (CLS)

```typescript
// ✅ レイアウトシフトを防ぐ
export function SkeletonLoader() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-20 bg-gray-200 rounded"></div>
    </div>
  );
}

// loading.tsx でスケルトンを表示
export default function Loading() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonLoader key={i} />
      ))}
    </div>
  );
}
```

#### 3. First Input Delay (FID)

```typescript
// ✅ 重いタスクの分割
import { startTransition } from 'react';

export function SearchForm() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = useCallback((searchQuery: string) => {
    // 緊急度の低い更新は startTransition でラップ
    startTransition(() => {
      setResults(performHeavySearch(searchQuery));
    });
  }, []);

  const debouncedSearch = useDebounce(handleSearch, 300);

  return (
    <input
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        debouncedSearch(e.target.value);
      }}
      placeholder="教材を検索..."
    />
  );
}
```

### バンドルサイズ最適化

```typescript
// ✅ Tree Shaking を意識したインポート
import { debounce } from 'lodash-es'; // ❌ 全体をインポート
import debounce from 'lodash/debounce'; // ✅ 必要な部分のみ

// ✅ 動的インポートでコード分割
const AdminPanel = dynamic(() => import('./AdminPanel'), {
  loading: () => <div>管理パネルを読み込み中...</div>
});

// ✅ 条件付き読み込み
export function Dashboard({ user }: { user: User }) {
  return (
    <div>
      <UserProfile user={user} />
      {user.role === 'admin' && <AdminPanel />}
    </div>
  );
}
```

---

## 🔒 セキュリティガイドライン

### 入力値検証

```typescript
// ✅ Zod を使用した厳密な検証
import { z } from 'zod';

const QuestionnaireSchema = z.object({
  universityName: z.string()
    .min(1, '大学名は必須です')
    .max(100, '大学名は100文字以内で入力してください'),
  age: z.number()
    .int('年齢は整数で入力してください')
    .min(15, '年齢は15歳以上で入力してください')
    .max(100, '年齢は100歳以下で入力してください'),
  email: z.string()
    .email('有効なメールアドレスを入力してください')
    .refine(email => !email.includes('+'), 'プラス記号を含むメールアドレスは使用できません'),
  materials: z.array(z.object({
    name: z.string().min(1, '教材名は必須です'),
    review: z.string().min(10, 'レビューは10文字以上で入力してください'),
    barcode: z.string().optional(),
  })).min(1, '教材を少なくとも1つは入力してください'),
});

export async function createQuestionnaire(formData: FormData) {
  // 入力値の検証
  const validatedData = QuestionnaireSchema.safeParse({
    universityName: formData.get('universityName'),
    age: parseInt(formData.get('age') as string),
    email: formData.get('email'),
    materials: JSON.parse(formData.get('materials') as string),
  });

  if (!validatedData.success) {
    return {
      success: false,
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  // 処理続行
  const { universityName, age, email, materials } = validatedData.data;
  // ...
}
```

### XSS対策

```typescript
// ✅ DOMPurify を使用したサニタイゼーション
import DOMPurify from 'dompurify';

export function UserGeneratedContent({ content }: { content: string }) {
  // ユーザー生成コンテンツは必ずサニタイズ
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em'],
    ALLOWED_ATTR: []
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      className="user-content"
    />
  );
}

// ✅ テンプレートリテラルでの安全な文字列構築
export function generateEmailTemplate(userName: string, message: string) {
  // HTMLエスケープ関数
  const escapeHtml = (str: string) =>
    str.replace(/[&<>"']/g, (match) => {
      const escape: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      };
      return escape[match];
    });

  return `
    <h1>こんにちは、${escapeHtml(userName)}さん</h1>
    <p>${escapeHtml(message)}</p>
  `;
}
```

### CSRF対策

```typescript
// ✅ Server Actions は自動的にCSRF保護される
"use server";

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function deleteQuestionnaire(id: string) {
  // 認証チェック
  const session = await auth();
  if (!session?.user) {
    throw new Error('認証が必要です');
  }

  // 権限チェック
  const questionnaire = await getQuestionnaireById(id);
  if (questionnaire.userId !== session.user.id) {
    throw new Error('この操作を実行する権限がありません');
  }

  // Refererチェック（追加のセキュリティ）
  const headersList = headers();
  const referer = headersList.get('referer');
  if (!referer?.includes(process.env.NEXT_PUBLIC_APP_URL || '')) {
    throw new Error('不正なリクエストです');
  }

  // 削除処理
  await deleteDoc(doc(db, 'questionnaires', id));
}
```

### 環境変数の管理

```typescript
// ✅ 環境変数の型安全な管理
const requiredEnvVars = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'EDU_DATA_API_TOKEN',
] as const;

function validateEnv() {
  const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

// アプリケーション起動時に検証
validateEnv();

// ✅ 公開する環境変数のプレフィックス確認
export const publicConfig = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL!,
  firebaseConfig: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  },
};

// ❌ 秘密情報を NEXT_PUBLIC_ で公開しない
// export const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY; // 危険！
```

---

## ⚠️ エラーハンドリング

### Global Error Boundary

```typescript
// app/global-error.tsx
'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // エラーログの送信
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              予期しないエラーが発生しました
            </h2>
            <p className="text-gray-600 mb-4">
              申し訳ございません。システムエラーが発生しました。
              しばらく時間をおいてから再度お試しください。
            </p>
            <div className="space-x-2">
              <button
                onClick={reset}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                再試行
              </button>
              <a
                href="/"
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                ホームに戻る
              </a>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4">
                <summary className="cursor-pointer text-sm text-gray-500">
                  エラー詳細（開発用）
                </summary>
                <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {error.message}
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
```

### Server Actions でのエラーハンドリング

```typescript
// ✅ 統一されたエラー処理パターン
"use server";

import { z } from 'zod';
import { logger } from '@/lib/logger';

type ActionResult<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
  code?: string;
};

export async function createQuestionnaire(
  formData: FormData
): Promise<ActionResult<{ id: string }>> {
  try {
    // バリデーション
    const result = QuestionnaireSchema.safeParse({
      /* ... */
    });

    if (!result.success) {
      return {
        success: false,
        error: '入力内容に不備があります',
        code: 'VALIDATION_ERROR'
      };
    }

    // ビジネスロジック
    const questionnaire = await saveQuestionnaire(result.data);

    // 成功レスポンス
    return {
      success: true,
      data: { id: questionnaire.id }
    };

  } catch (error) {
    // エラーログ
    logger.error('Failed to create questionnaire', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      formData: Object.fromEntries(formData.entries()),
    });

    // ユーザーフレンドリーなエラーメッセージ
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: '入力内容を確認してください',
        code: 'VALIDATION_ERROR'
      };
    }

    if (error instanceof Error && error.message.includes('permission')) {
      return {
        success: false,
        error: 'この操作を実行する権限がありません',
        code: 'PERMISSION_DENIED'
      };
    }

    return {
      success: false,
      error: '一時的なエラーが発生しました。しばらくしてから再度お試しください。',
      code: 'INTERNAL_ERROR'
    };
  }
}
```

### クライアントサイドエラーハンドリング

```typescript
// ✅ useActionState を使用したエラー表示
"use client";

import { useActionState } from 'react';
import { createQuestionnaire } from '@/lib/actions/questionnaires';

export function QuestionnaireForm() {
  const [state, formAction] = useActionState(createQuestionnaire, null);

  return (
    <form action={formAction}>
      {/* フォームフィールド */}

      {/* エラー表示 */}
      {state && !state.success && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-red-800">{state.error}</p>
              {state.code === 'VALIDATION_ERROR' && (
                <p className="text-red-600 text-sm mt-1">
                  入力内容を確認してください
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 成功表示 */}
      {state && state.success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <p className="text-green-800">アンケートが正常に送信されました。</p>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        送信
      </button>
    </form>
  );
}
```

---

## 🧪 テスト規約

### テスト構成

```
__tests__/
├── components/           # コンポーネントテスト
├── lib/                 # ユーティリティテスト
├── actions/             # Server Actions テスト
└── e2e/                 # E2Eテスト
```

### Server Actions のテスト

```typescript
// __tests__/actions/questionnaires.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createQuestionnaire } from '@/lib/actions/questionnaires';
import { clearTestDatabase, seedTestData } from '@/lib/test-utils';

describe('createQuestionnaire', () => {
  beforeEach(async () => {
    await clearTestDatabase();
    await seedTestData();
  });

  afterEach(async () => {
    await clearTestDatabase();
  });

  it('should create questionnaire with valid data', async () => {
    const formData = new FormData();
    formData.append('universityName', 'テスト大学');
    formData.append('age', '20');
    formData.append('materials', JSON.stringify([
      {
        name: 'システム英単語',
        review: 'とても良い教材でした。',
      }
    ]));

    const result = await createQuestionnaire(formData);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.id).toBeDefined();
    }
  });

  it('should fail with invalid data', async () => {
    const formData = new FormData();
    formData.append('universityName', ''); // 空文字
    formData.append('age', '10'); // 範囲外

    const result = await createQuestionnaire(formData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe('入力内容に不備があります');
      expect(result.code).toBe('VALIDATION_ERROR');
    }
  });
});
```

### コンポーネントテスト

```typescript
// __tests__/components/QuestionnaireForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QuestionnaireForm } from '@/components/QuestionnaireForm';

// Server Actions のモック
vi.mock('@/lib/actions/questionnaires', () => ({
  createQuestionnaire: vi.fn(),
}));

describe('QuestionnaireForm', () => {
  it('should render form fields correctly', () => {
    render(<QuestionnaireForm />);

    expect(screen.getByLabelText('大学名')).toBeInTheDocument();
    expect(screen.getByLabelText('年齢')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '送信' })).toBeInTheDocument();
  });

  it('should show validation errors', async () => {
    const mockAction = vi.mocked(createQuestionnaire);
    mockAction.mockResolvedValueOnce({
      success: false,
      error: '入力内容に不備があります',
      code: 'VALIDATION_ERROR'
    });

    render(<QuestionnaireForm />);

    const submitButton = screen.getByRole('button', { name: '送信' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('入力内容に不備があります')).toBeInTheDocument();
    });
  });
});
```

### E2Eテスト

```typescript
// __tests__/e2e/questionnaire-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Questionnaire Flow', () => {
  test('should complete full questionnaire submission', async ({ page }) => {
    await page.goto('/questionnaire');

    // フォーム入力
    await page.fill('[data-testid="university-name"]', 'テスト大学');
    await page.fill('[data-testid="age"]', '20');
    await page.fill('[data-testid="material-name-0"]', 'システム英単語');
    await page.fill('[data-testid="material-review-0"]', 'とても良い教材でした。');

    // 送信
    await page.click('[data-testid="submit-button"]');

    // 成功メッセージを確認
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="success-message"]')).toContainText('正常に送信されました');
  });

  test('should show validation errors for invalid input', async ({ page }) => {
    await page.goto('/questionnaire');

    // 無効な入力
    await page.fill('[data-testid="university-name"]', ''); // 空文字
    await page.fill('[data-testid="age"]', '10'); // 範囲外

    // 送信
    await page.click('[data-testid="submit-button"]');

    // エラーメッセージを確認
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toContainText('入力内容');
  });
});
```

---

## 📝 コメント・ドキュメンテーション

### TSDoc を使用した関数ドキュメント

```typescript
/**
 * ユーザーのアンケートデータを作成し、データベースに保存します。
 *
 * @param data - アンケートデータ
 * @param data.universityName - 大学名
 * @param data.age - 年齢（15-100歳）
 * @param data.materials - 教材リスト
 * @returns 作成結果とアンケートID
 *
 * @example
 * ```typescript
 * const result = await createQuestionnaire({
 *   universityName: '東京大学',
 *   age: 20,
 *   materials: [
 *     {
 *       name: 'システム英単語',
 *       review: 'とても役立ちました'
 *     }
 *   ]
 * });
 *
 * if (result.success) {
 *   console.log('作成されたID:', result.data.id);
 * }
 * ```
 *
 * @throws {ValidationError} 入力データが無効な場合
 * @throws {DatabaseError} データベースアクセスに失敗した場合
 */
export async function createQuestionnaire(
  data: QuestionnaireData
): Promise<ActionResult<{ id: string }>> {
  // 実装
}
```

### 複雑なロジックのコメント

```typescript
export function calculateRecommendationScore(
  userProfile: UserProfile,
  material: Material
): number {
  // Step 1: 基本スコアの計算（大学レベルマッチング）
  // 同じ偏差値帯なら+30点、近い場合は段階的に減点
  let score = 0;
  const levelDiff = Math.abs(userProfile.universityLevel - material.targetLevel);
  if (levelDiff === 0) {
    score += 30;
  } else if (levelDiff <= 1) {
    score += 20;
  } else if (levelDiff <= 2) {
    score += 10;
  }

  // Step 2: 教科マッチングボーナス
  // 同一教科なら+25点、関連教科なら+10点
  if (userProfile.targetSubjects.includes(material.subject)) {
    score += 25;
  } else if (getRelatedSubjects(userProfile.targetSubjects).includes(material.subject)) {
    score += 10;
  }

  // Step 3: レビュー品質による重み付け
  // 高評価かつ詳細なレビューがあるものを優先
  const avgRating = material.reviews.reduce((sum, r) => sum + r.rating, 0) / material.reviews.length;
  const reviewQualityBonus = Math.floor(avgRating * 5); // 最大25点
  score += reviewQualityBonus;

  // Step 4: 実績による信頼度補正
  // 同じ大学の合格者からのレビューがあれば大幅ボーナス
  const sameUniversityReviews = material.reviews.filter(
    r => r.userUniversity === userProfile.targetUniversity
  );
  if (sameUniversityReviews.length > 0) {
    score += 40; // 同じ大学からのレビューは高く評価
  }

  return Math.min(score, 100); // 最大100点に制限
}
```

### TODO/FIXME コメント

```typescript
export function processPayment(amount: number, paymentMethod: string) {
  // TODO: Stripe以外の決済手段への対応
  // - PayPal連携 (予定: 2024年Q2)
  // - 銀行振込対応 (予定: 2024年Q3)

  // FIXME: 小数点の扱いで精度の問題が発生する可能性がある
  // Math.round()では四捨五入のルールが不正確
  // decimal.jsライブラリの導入を検討 (Issue #123)
  const roundedAmount = Math.round(amount * 100) / 100;

  // HACK: 一時的な解決策 - 本来はenumで管理すべき
  // 支払い方法の型定義を追加する必要がある (Issue #456)
  if (!['credit', 'debit', 'paypal'].includes(paymentMethod)) {
    throw new Error('Unsupported payment method');
  }

  // 実装続行...
}
```

---

## 👀 コードレビュー指針

### レビュー観点

#### 1. アーキテクチャ準拠性

```typescript
// ❌ レビューで指摘すべき例: 不要なCSR使用
"use client"; // なぜクライアントサイドが必要？

export default function ProductList() {
  const [products, setProducts] = useState([]);
  // このコンポーネントにインタラクションはない
  // SSRで実装すべき
}

// ✅ レビューで推奨すべき例: 適切なSSR使用
export default async function ProductList() {
  const products = await getProducts();
  return <ProductGrid products={products} />;
}
```

#### 2. セキュリティチェック

```typescript
// ❌ レビューで指摘すべき例: XSS脆弱性
export function UserComment({ comment }: { comment: string }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: comment }} /> // 危険！
  );
}

// ✅ レビューで推奨すべき例: 適切なサニタイゼーション
export function UserComment({ comment }: { comment: string }) {
  const sanitizedComment = DOMPurify.sanitize(comment);
  return (
    <div dangerouslySetInnerHTML={{ __html: sanitizedComment }} />
  );
}
```

#### 3. パフォーマンスチェック

```typescript
// ❌ レビューで指摘すべき例: 不適切な依存配列
useEffect(() => {
  fetchData();
}, []); // fetchDataが外部から来る場合、依存関係が不足

// ✅ レビューで推奨すべき例: 適切な依存関係
const fetchData = useCallback(async () => {
  // データ取得処理
}, []);

useEffect(() => {
  fetchData();
}, [fetchData]);
```

### レビューコメント例文

#### 建設的なフィードバック

```markdown
## 良い点
- Server Actionsを適切に使用してAPI Routesを回避している点が素晴らしいです
- エラーハンドリングが統一されており、ユーザビリティを考慮されています

## 改善提案

### アーキテクチャ
- この component に `"use client"` は必要でしょうか？ユーザーインタラクションがないため、SSRで実装できそうです
- [該当行](link) に具体的な変更案を提示

### セキュリティ
- ユーザー入力をそのままDOMに挿入するのは XSS のリスクがあります
- DOMPurify または適切なエスケープ処理を追加することをお勧めします

### パフォーマンス
- [該当行](link) で重い計算が毎回実行されています
- useMemo でメモ化することで改善できます

### 型安全性
- `any` 型の使用は避け、適切な型定義を追加してください
- [TypeScript handbook](link) を参考に改善案を検討してみてください
```

#### レビュー承認の基準

```markdown
## マージ承認基準

### 必須項目（すべて満たす必要がある）
- [ ] アーキテクチャ指針に準拠している（SSR優先、Server Actions使用）
- [ ] セキュリティ脆弱性がない（XSS、SQLインジェクション対策など）
- [ ] 型安全性が保たれている（`any` 型の不適切な使用がない）
- [ ] テストが追加・更新されている
- [ ] エラーハンドリングが適切に実装されている

### 推奨項目（可能な限り満たす）
- [ ] パフォーマンスが考慮されている（不要な再レンダリング、重い計算など）
- [ ] アクセシビリティが考慮されている
- [ ] コメント・ドキュメンテーションが適切
- [ ] 命名規則に従っている
```

---

## ✅ チェックリスト

### 開発前チェック

- [ ] **要件理解**: 機能要件と非機能要件を明確にする
- [ ] **アーキテクチャ設計**: SSR/CSRの使い分けを決定する
- [ ] **API設計**: Server Actionsで実装可能かを確認する
- [ ] **セキュリティ考慮**: 入力値検証とXSS対策を計画する
- [ ] **パフォーマンス目標**: Core Web Vitalsの目標値を設定する

### 実装中チェック

- [ ] **コーディング規約準拠**: 命名規則、ファイル構造に従う
- [ ] **型安全性**: TypeScriptの恩恵を最大限活用する
- [ ] **エラーハンドリング**: 統一されたエラー処理パターンを使用する
- [ ] **テスト実装**: 単体テストとE2Eテストを追加する
- [ ] **アクセシビリティ**: ARIA属性とセマンティックHTMLを使用する

### デプロイ前チェック

- [ ] **セキュリティ監査**: 脆弱性スキャンを実行する
- [ ] **パフォーマンステスト**: Lighthouse スコアを確認する
- [ ] **ブラウザテスト**: 主要ブラウザでの動作を確認する
- [ ] **モバイル対応**: レスポンシブデザインを確認する
- [ ] **環境変数**: 本番環境の設定を確認する

### 保守性チェック

- [ ] **ドキュメンテーション**: APIドキュメントと README を更新する
- [ ] **モニタリング**: エラー監視とパフォーマンス監視を設定する
- [ ] **ログ出力**: 適切なログレベルでログを出力する
- [ ] **バックアップ**: データベースバックアップ戦略を確認する
- [ ] **災害復旧**: 障害時の復旧手順を文書化する

---

## 🔄 バージョン管理

| バージョン | 更新日 | 変更内容 |
|----------|--------|---------|
| v1.0 | 2025-01-17 | 初版作成 - SSR優先アーキテクチャ、Server Actions活用指針を策定 |

---

## 📚 参考リソース

### 公式ドキュメント
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### ベストプラクティス
- [Next.js Performance Best Practices](https://nextjs.org/docs/app/building-your-application/optimizing)
- [React Performance Optimization](https://react.dev/learn/render-and-commit#optimizing-performance)
- [Web.dev Core Web Vitals](https://web.dev/vitals/)

### セキュリティ
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Headers](https://nextjs.org/docs/app/api-reference/next-config-js/headers)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

### テスト
- [Testing Library Documentation](https://testing-library.com/docs/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Vitest Documentation](https://vitest.dev/guide/)
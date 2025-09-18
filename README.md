# Studymate (スタディメイト)

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.0-orange)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC)](https://tailwindcss.com/)

## 📚 概要

Studymateは、大学受験生向けの「**志望大学・取得資格で絞り込める、信頼性の高い教材レビューサイト**」です。

従来の教材レビューサイトでは、匿名性が高く、サクラレビューや自分と境遇の異なるユーザーの意見が混在し、本当に信頼できる情報を見つけるのが困難でした。Studymateは、レビュー投稿者の所属（大学名・学部など）を可視化することで、「自分と同じ目標を持つ少し先の先輩」のリアルな声を見つけられるプラットフォームを提供します。

## ✨ 主な機能

### 利用者向け機能

- 🎯 **大学・学部・教科での絞り込み検索** - 自分に最適な教材レビューを発見
- 👥 **投稿者の所属情報表示** - 大学名・学部・高校名を確認可能
- 📝 **詳細な体験レビュー** - 最低150文字以上の具体的な体験談
- 👍 **参考になった機能** - 有益なレビューを評価
- 📱 **レスポンシブデザイン** - スマートフォンでも快適に利用可能
- 🌙 **ダークモード対応** - 目に優しい表示モード

### 投稿者向け機能

- 📋 **アンケートフォーム** - 構造化された入力フォーム
- 🏫 **大学検索機能** - edu-data.jp APIと連携した大学名の自動補完
- 📷 **バーコードスキャナー** - 教材のISBNコードを簡単入力
- ✅ **リアルタイムバリデーション** - 入力内容の即時検証

## 🛠 技術スタック

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **State Management**: React Hooks + Context API
- **Authentication**: Firebase Auth v10

### Backend

- **Database**: Firebase Firestore v10
- **Storage**: Firebase Storage v10
- **Authentication**: Firebase Auth + Firebase Admin SDK
- **Session Management**: JWT (Edge Runtime対応)
- **External API**: edu-data.jp (学校検索API)

### Development

- **Package Manager**: npm
- **Linting**: ESLint 9.x
- **Formatting**: Prettier 3.x
- **Git Hooks**: Husky 9.x
- **Barcode Scanner**: Quagga2
- **JWT Library**: jose (Edge Runtime対応)

## 🚀 セットアップ

### 必要な環境

- Node.js 18.17以上
- npm または yarn
- Firebaseアカウント
- edu-data.jp APIアカウント

### インストール手順

1. **リポジトリのクローン**

```bash
git clone https://github.com/yourusername/studymate.git
cd studymate
```

2. **依存関係のインストール**

```bash
npm install
```

3. **環境変数の設定**
   `.env.local`ファイルを作成し、以下の内容を追加：

```env
# edu-data.jp API Token
EDU_DATA_API_TOKEN=your_edu_data_api_token_here

# Firebase Admin SDK（認証用）
FIREBASE_ADMIN_PROJECT_ID=your_firebase_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key_here\n-----END PRIVATE KEY-----"

# JWT Secret for Edge Runtime
JWT_SECRET=your_jwt_secret_here
```

4. **edu-data.jp APIトークンの取得**

- https://api.edu-data.jp/ にアクセス
- メールアドレスで利用者登録
- 利用規約に同意
- https://api.edu-data.jp/token からトークンを発行

5. **Firebase設定**

- Firebase Consoleでプロジェクトを作成
- Firestoreデータベースを有効化
- プロジェクト設定から設定情報を取得（既にコードに含まれています）

6. **開発サーバーの起動**

```bash
npm run dev
```

アプリケーションが http://localhost:3000 で起動します。

## 📁 プロジェクト構造

```
studymate/
├── app/                              # Next.js App Router
│   ├── page.tsx                      # ランディングページ
│   ├── layout.tsx                    # ルートレイアウト
│   ├── not-found.tsx                 # 404ページ
│   ├── globals.css                   # グローバルスタイル
│   ├── auth/                         # 認証関連ページ
│   │   ├── login/
│   │   │   ├── page.tsx              # ログインページ
│   │   │   └── components/
│   │   │       └── LoginForm.tsx     # ログインフォーム
│   │   ├── signup/
│   │   │   ├── page.tsx              # 新規登録ページ
│   │   │   └── components/
│   │   │       └── SignupForm.tsx    # 新規登録フォーム
│   │   ├── reset-password/
│   │   │   ├── page.tsx              # パスワードリセットページ
│   │   │   └── components/
│   │   │       └── ResetPasswordForm.tsx
│   │   ├── verify-email/
│   │   │   ├── page.tsx              # メール認証ページ
│   │   │   └── components/
│   │   │       └── VerifyEmailStatus.tsx
│   │   └── complete-profile/
│   │       ├── page.tsx              # プロフィール設定ページ
│   │       └── components/
│   │           └── CompleteProfileForm.tsx
│   ├── my/
│   │   └── page.tsx                  # マイページ
│   ├── questionnaire/                # アンケートページ
│   │   ├── page.tsx                  # アンケートメインページ
│   │   └── components/               # アンケート用コンポーネント
│   │       ├── QuestionnaireForm.tsx # メインフォーム
│   │       ├── Universitysearch.tsx  # 大学検索コンポーネント
│   │       ├── MaterialInput.tsx     # 教材入力コンポーネント
│   │       └── BarcodeScanner.tsx    # バーコードスキャナー
│   ├── contact/                      # お問い合わせページ
│   │   ├── page.tsx
│   │   └── components/
│   │       └── ContactForm.tsx
│   ├── privacy/
│   │   └── page.tsx                  # プライバシーポリシー
│   ├── terms/
│   │   └── page.tsx                  # 利用規約
│   └── api/                          # APIルート
│       ├── auth/
│       │   └── session/
│       │       └── route.ts          # セッション管理API
│       └── books/
│           └── lookup/
│               └── route.ts          # 書籍検索API
├── components/                       # 共通コンポーネント
│   ├── layout/                       # レイアウトコンポーネント
│   │   ├── Header.tsx                # ヘッダー
│   │   └── Footer.tsx                # フッター
│   └── landing/                      # ランディングページ用コンポーネント
│       ├── HeroSection.tsx           # ヒーローセクション
│       ├── ProblemSection.tsx        # 課題セクション
│       ├── FeaturesSection.tsx       # 機能紹介セクション
│       ├── HowItWorksSection.tsx     # 使い方セクション
│       ├── ReviewsSection.tsx        # レビューセクション
│       └── CTASection.tsx            # CTA（Call to Action）セクション
├── hooks/                            # カスタムフック
│   ├── useAuth.tsx                   # 認証フック
│   └── useDebounce.ts                # デバウンスフック
├── lib/                              # ライブラリ・ユーティリティ
│   ├── firebase.ts                   # Firebase Client SDK設定
│   ├── firebase-admin.ts             # Firebase Admin SDK設定
│   ├── auth-edge.ts                  # Edge Runtime用認証
│   ├── auth-helpers.ts               # 認証ヘルパー関数
│   ├── edu-data.ts                   # edu-data API連携
│   └── actions/                      # Server Actions
│       ├── auth.ts                   # 認証関連アクション
│       ├── contact.ts                # お問い合わせアクション
│       └── universities.ts           # 大学検索アクション
├── documents/                        # プロジェクト文書
│   ├── coding-terms.md               # コーディング規約
│   └── design-terms.md               # デザイン規約
├── middleware.ts                     # Next.js ミドルウェア
├── next.config.ts                    # Next.js設定
├── tailwind.config.ts                # Tailwind CSS設定
├── tsconfig.json                     # TypeScript設定
└── package.json                      # プロジェクト依存関係
```

## 🔌 APIエンドポイント

### 大学検索API (Server Action)

```typescript
// lib/actions/universities.ts
searchUniversities(keyword: string): Promise<ActionResult<{ universities: University[] }>>

Response:
{
  success: boolean,
  data?: {
    universities: [
      {
        school_code: string,
        school_name: string,
        prefecture: string,
        address: string,
        homepage: string
      }
    ]
  },
  error?: string,
  code?: string
}
```

### 認証API

```typescript
// API Routes
POST /api/auth/session    # セッション作成・管理

// Server Actions
// lib/actions/auth.ts
saveUserProfile(userId: string, profileData: Record<string, unknown>): Promise<void>
```

### 書籍検索API

```typescript
GET /api/books/lookup?isbn={isbn}

Response:
{
  title?: string,
  author?: string,
  publisher?: string,
  isbn: string
}
```

## 💾 データベース構造

### Firestore Collections

#### users コレクション

```typescript
{
  uid: string;                    // Firebase Auth UID
  email: string;                  // メールアドレス
  name: string;                   // 表示名
  universityName: string;         // 大学名
  department: string;             // 学部・学科
  graduationYear: number;         // 卒業年度
  photoURL?: string;              // プロフィール画像URL
  createdAt: Date;               // アカウント作成日時
  updatedAt: Date;               // 最終更新日時
}
```

#### questionnaires コレクション

```typescript
{
  userId: string;                 // ユーザーID (Firebase Auth UID)
  age: number;                    // 年齢
  occupation: string;             // 所属（大学生/社会人/浪人）
  universityName: string;         // 大学名
  universityDepartment: string;   // 学部・学科
  universityDomain: string;       // 大学ドメイン（必須）
  examSubjects?: string;          // 受験科目（任意）
  materials: [                    // 教材配列
    {
      materialName: string;       // 教材名
      materialBarcode?: string;   // バーコード（ISBN等）
      materialReview: string;     // レビュー（150文字以上）
    }
  ];
  submittedAt: Date;             // 投稿日時
  isPublic: boolean;             // 公開/非公開設定
}
```

#### contacts コレクション

```typescript
{
  name: string; // お問い合わせ者名
  email: string; // メールアドレス
  subject: string; // 件名
  message: string; // お問い合わせ内容
  submittedAt: Date; // 送信日時
  status: 'pending' | 'resolved'; // 対応状況
}
```

## 🧑‍💻 開発コマンド

```bash
# 開発サーバーの起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバーの起動
npm run start

# TypeScript型チェック
npm run type-check

# リンター実行
npm run lint
```

## 🎯 実装状況と今後の予定

### ✅ 実装済み機能

- [x] ランディングページ
- [x] アンケートフォーム（教材レビュー投稿）
- [x] Firebase連携（Firestore、Storage）
- [x] 大学検索機能（edu-data.jp API連携）
- [x] ユーザー認証（Firebase Auth）
  - [x] 新規登録・ログイン・ログアウト
  - [x] メール認証
  - [x] パスワードリセット
  - [x] プロフィール設定
  - [x] セッション管理
- [x] バーコードスキャナー（教材ISBN読み取り）
- [x] お問い合わせフォーム
- [x] レスポンシブデザイン
- [x] TypeScript完全対応
- [x] Next.js 15 + App Router
- [x] ミドルウェア認証
- [x] Server Actions

### Phase 1 (残り実装)

- [ ] レビュー一覧ページ
- [ ] レビュー詳細ページ
- [ ] 教材検索・絞り込み機能
- [ ] ユーザー固有のマイページ機能

### Phase 2

- [ ] いいね機能
- [ ] SNSシェア機能
- [ ] レビュー編集・削除機能
- [ ] 管理者ダッシュボード
- [ ] 通知機能

### Phase 3

- [ ] レコメンデーション機能
- [ ] 統計ダッシュボード
- [ ] メール通知機能
- [ ] PWA対応

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は`LICENSE`ファイルをご覧ください。

## 📞 お問い合わせ

- プロジェクトリンク: https://github.com/yourusername/studymate
- 作成者: 鈴木康浩

## 🙏 謝辞

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [edu-data.jp](https://api.edu-data.jp/)
- [Tailwind CSS](https://tailwindcss.com/)

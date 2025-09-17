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
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks

### Backend
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Authentication**: Firebase Auth (実装予定)
- **External API**: edu-data.jp (学校検索API)

### Development
- **Package Manager**: npm
- **Linting**: ESLint
- **Formatting**: Prettier (推奨)

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
├── app/                      # Next.js App Router
│   ├── page.tsx             # ランディングページ
│   ├── layout.tsx           # ルートレイアウト
│   ├── globals.css          # グローバルスタイル
│   ├── questionnaire/       # アンケートページ
│   │   ├── page.tsx         # アンケートメインページ (SSR)
│   │   └── components/      # アンケート用コンポーネント
│   │       ├── QuestionnaireForm.tsx
│   │       ├── UniversitySearch.tsx
│   │       └── BarcodeScanner.tsx
│   └── api/                 # APIルート
│       └── universities/
│           └── search/
│               └── route.ts # 大学検索API
├── lib/                     # ライブラリ・ユーティリティ
│   ├── firebase.ts         # Firebase設定
│   └── edu-data.ts         # edu-data API連携
├── public/                  # 静的ファイル
├── .env.local.example      # 環境変数テンプレート
├── next.config.js          # Next.js設定
├── tailwind.config.ts      # Tailwind CSS設定
├── tsconfig.json           # TypeScript設定
└── package.json            # プロジェクト依存関係
```
## 🔌 APIエンドポイント

### 大学検索API

```typescript
GET /api/universities/search?keyword={keyword}

Response:
{
  universities: [
    {
      school_code: string,
      school_name: string,
      prefecture: string,
      address: string,
      homepage: string
    }
  ]
}
```
## 💾 データベース構造

### Firestore Collections

#### questionnaires コレクション

```typescript
{
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
## 🎯 今後の実装予定

### Phase 1 (MVP)

- [x] ランディングページ
- [x] アンケートフォーム
- [x] Firebase連携
- [x] 大学検索機能
- [ ] ユーザー認証（Firebase Auth）
- [ ] レビュー一覧ページ
- [ ] レビュー詳細ページ
- [ ] 教材検索・絞り込み機能

### Phase 2

- [ ] いいね機能
- [ ] SNSシェア機能
- [ ] ユーザープロフィール
- [ ] レビュー編集・削除機能
- [ ] 管理者ダッシュボード

### Phase 3

- [ ] レコメンデーション機能
- [ ] 統計ダッシュボード
- [ ] メール通知機能
- [ ] PWA対応

## 🤝 コントリビューション

プルリクエストを歓迎します！大きな変更の場合は、まずissueを開いて変更内容について議論してください。

1. プロジェクトをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを開く

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
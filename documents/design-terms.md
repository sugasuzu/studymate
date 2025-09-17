# Studymate デザインシステム v1.0

## 📐 デザイン原則

### コアバリュー
1. **信頼性** - 教育サービスとしての信頼感を演出
2. **親しみやすさ** - 学生が使いやすいフレンドリーなUI
3. **明瞭性** - 情報が整理され、見つけやすい
4. **アクセシビリティ** - すべてのユーザーが利用可能

## 🎨 カラーパレット

### プライマリカラー
```css
/* ブランドカラー - グラデーション */
--gradient-primary: linear-gradient(to right, #2563eb, #9333ea);  /* blue-600 → purple-600 */
--gradient-secondary: linear-gradient(to right, #3b82f6, #a855f7); /* blue-500 → purple-500 */

/* 単色 */
--color-blue-600: #2563eb;
--color-blue-500: #3b82f6;
--color-blue-400: #60a5fa;
--color-purple-600: #9333ea;
--color-purple-500: #a855f7;
--color-purple-400: #c084fc;
```

### グレースケール

```css
/* ライトモード */
--color-gray-50: #f9fafb;
--color-gray-100: #f3f4f6;
--color-gray-200: #e5e7eb;
--color-gray-300: #d1d5db;
--color-gray-400: #9ca3af;
--color-gray-500: #6b7280;
--color-gray-600: #4b5563;
--color-gray-700: #374151;
--color-gray-800: #1f2937;
--color-gray-900: #111827;

/* ダークモード */
--color-dark-bg-primary: #0a0a0a;
--color-dark-bg-secondary: #111827;
--color-dark-text-primary: #ededed;
--color-dark-text-secondary: #9ca3af;
```

### セマンティックカラー

```css
/* 成功 */
--color-success: #10b981;      /* green-500 */
--color-success-light: #d1fae5; /* green-100 */

/* エラー */
--color-error: #ef4444;        /* red-600 */
--color-error-light: #fee2e2;  /* red-100 */

/* 警告 */
--color-warning: #f59e0b;      /* yellow-500 */
--color-warning-light: #fef3c7; /* yellow-100 */

/* 情報 */
--color-info: #3b82f6;         /* blue-500 */
--color-info-light: #dbeafe;   /* blue-100 */
```

#### 使用ガイドライン

- **プライマリアクション**: グラデーション（blue-600 → purple-600）
- **セカンダリアクション**: 単色（blue-600）またはボーダーのみ
- **テキスト**: gray-900（見出し）、gray-600（本文）
- **背景**: white、gray-50（セクション分け）

## 📝 タイポグラフィ

### フォントファミリー

```css
--font-sans: 'Geist', system-ui, -apple-system, sans-serif;
--font-mono: 'Geist Mono', 'Courier New', monospace;
--font-japanese: 'Noto Sans JP', 'Hiragino Sans', sans-serif;
```

### フォントサイズ

```css
/* 見出し */
--text-6xl: 3.75rem;    /* 60px - ヒーローセクション */
--text-5xl: 3rem;       /* 48px */
--text-4xl: 2.25rem;    /* 36px - ページタイトル */
--text-3xl: 1.875rem;   /* 30px - セクションタイトル */
--text-2xl: 1.5rem;     /* 24px - サブセクション */
--text-xl: 1.25rem;     /* 20px - カード見出し */
--text-lg: 1.125rem;    /* 18px */

/* 本文 */
--text-base: 1rem;      /* 16px - 標準テキスト */
--text-sm: 0.875rem;    /* 14px - 補足テキスト */
--text-xs: 0.75rem;     /* 12px - キャプション */
```

### フォントウェイト

```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 行間（Line Height）

```css
--leading-tight: 1.25;    /* 見出し用 */
--leading-normal: 1.5;    /* 標準 */
--leading-relaxed: 1.625; /* 本文用 */
--leading-loose: 2;       /* 広めの行間 */
```

### 使用例

```html
<!-- ページタイトル -->
<h1 class="text-4xl font-bold text-gray-900 leading-tight">

<!-- セクションタイトル -->
<h2 class="text-3xl font-bold text-gray-900 mb-4">

<!-- サブタイトル -->
<h3 class="text-xl font-semibold text-gray-900 mb-3">

<!-- 本文 -->
<p class="text-base text-gray-600 leading-relaxed">

<!-- キャプション -->
<span class="text-sm text-gray-500">
```

## 📏 スペーシング

### スペーシングスケール

```css
--spacing-0: 0;
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
--spacing-32: 8rem;     /* 128px */
```

### パディング規則

- **ボタン**: `px-4 py-2`（通常）、`px-8 py-4`（大）
- **カード**: `p-6` または `p-8`
- **セクション**: `py-20`（デスクトップ）、`py-12`（モバイル）
- **コンテナ**: `px-4 sm:px-6 lg:px-8`

### マージン規則

- **見出し下**: `mb-4`（h2）、`mb-3`（h3）、`mb-2`（h4）
- **段落間**: `mb-4`
- **セクション間**: `mb-12` または `mb-20`
- **要素間（垂直）**: `space-y-4` または `space-y-6`

## 🧩 コンポーネント

### ボタン

#### プライマリボタン

```html
<button class="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg text-lg hover:opacity-90 transition transform hover:scale-105">
  アクション
</button>
```

#### セカンダリボタン

```html
<button class="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg text-lg border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
  アクション
</button>
```

#### テキストボタン

```html
<button class="text-blue-600 dark:text-blue-400 hover:underline">
  リンクテキスト
</button>
```
### カード

```html
<div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition">
  <!-- コンテンツ -->
</div>
```

### フォーム要素

#### テキスト入力

```html
<input type="text"
       class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white">
```

#### テキストエリア

```html
<textarea class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          rows="6">
</textarea>
```

#### セレクトボックス

```html
<select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white">
  <option>選択肢</option>
</select>
```
### アラート/通知

#### 成功

```html
<div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
  <p class="text-green-800 dark:text-green-300">成功メッセージ</p>
</div>
```

#### エラー

```html
<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
  <p class="text-red-600 dark:text-red-400">エラーメッセージ</p>
</div>
```
## 📱 レスポンシブデザイン

### ブレークポイント

```css
--breakpoint-sm: 640px;   /* スマートフォン横向き */
--breakpoint-md: 768px;   /* タブレット */
--breakpoint-lg: 1024px;  /* 小型デスクトップ */
--breakpoint-xl: 1280px;  /* デスクトップ */
--breakpoint-2xl: 1536px; /* 大型デスクトップ */
```

### コンテナ幅

```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

### レスポンシブパターン

```html
<!-- モバイルファースト -->
<div class="text-base md:text-lg lg:text-xl">
<div class="px-4 sm:px-6 lg:px-8">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```
## ✨ アニメーション

### トランジション

```css
/* デフォルトトランジション */
--transition-default: all 0.3s ease;

/* 高速 */
--transition-fast: all 0.15s ease;

/* 低速 */
--transition-slow: all 0.5s ease;
```

### ホバーエフェクト

```css
/* スケール */
.hover-scale {
  transition: transform 0.3s ease;
}
.hover-scale:hover {
  transform: scale(1.05);
}

/* 透明度 */
.hover-opacity {
  transition: opacity 0.3s ease;
}
.hover-opacity:hover {
  opacity: 0.9;
}

/* シャドウ */
.hover-shadow {
  transition: box-shadow 0.3s ease;
}
.hover-shadow:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

### ローディングアニメーション

```html
<svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
</svg>
```
## 🌙 ダークモード

### 実装ガイドライン

- すべての背景色にダークモード版を用意
- テキストカラーの適切なコントラスト比を維持
- ボーダーカラーの調整
- 画像やアイコンの視認性確保

### カラーマッピング

| ライトモード | ダークモード |
|-------------|-------------|
| `bg-white` | `dark:bg-gray-900` |
| `bg-gray-50` | `dark:bg-gray-800` |
| `text-gray-900` | `dark:text-white` |
| `text-gray-600` | `dark:text-gray-300` |
| `border-gray-300` | `dark:border-gray-600` |
## 🎯 デザイントークン

### 角丸（Border Radius）

```css
--radius-sm: 0.125rem;    /* 2px */
--radius-default: 0.25rem; /* 4px */
--radius-md: 0.375rem;    /* 6px */
--radius-lg: 0.5rem;      /* 8px - 標準 */
--radius-xl: 0.75rem;     /* 12px - カード */
--radius-2xl: 1rem;       /* 16px */
--radius-full: 9999px;    /* 完全な円 */
```

### シャドウ

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-default: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```
## 📋 チェックリスト

### 新規コンポーネント作成時

- [ ] カラーパレットに従っているか
- [ ] タイポグラフィルールを適用しているか
- [ ] 適切なスペーシングを使用しているか
- [ ] レスポンシブ対応しているか
- [ ] ダークモード対応しているか
- [ ] ホバー/フォーカス状態を定義しているか
- [ ] アクセシビリティ（ARIA属性等）を考慮しているか
- [ ] トランジションを適用しているか

### ページ作成時

- [ ] max-widthの設定（max-w-7xl等）
- [ ] セクション間の適切な余白
- [ ] モバイルファーストの実装
- [ ] 読みやすい行間の設定
- [ ] 視覚的階層の明確化

## 🔄 バージョン管理

| バージョン | 更新日 | 変更内容 |
|----------|--------|---------|
| v1.0 | 2025-01-01 | 初版作成 |

## 📚 参考リソース

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
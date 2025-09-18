# Firebase Storage 機能有効化手順

## 概要

プロフィール画像アップロード機能は、Firebase Storageのコスト削減のため一時的に無効化されています。

## 有効化手順

### 1. 必要な依存関係の確認

```bash
npm install react-image-file-resizer
```

### 2. Firebase Storage設定

1. Firebase Consoleでプロジェクトを開く
2. Storageセクションに移動
3. 「始める」をクリックしてStorageを有効化
4. セキュリティルールを設定:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /profile-images/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 3. コードの有効化

#### CompleteProfileForm.tsx内で以下の変更を行う:

1. **インポートのコメントアウト解除**:

```typescript
// 現在:
// import { storage } from '@/lib/firebase';
// import { ref, uploadString, getDownloadURL } from 'firebase/storage';
// import Resizer from 'react-image-file-resizer';

// 有効化後:
import { storage } from '@/lib/firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import Resizer from 'react-image-file-resizer';
```

2. **resizeImage関数のコメントアウト解除**:

```typescript
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
```

3. **handleImageSelect関数の修正**:

```typescript
const handleImageSelect = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
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
```

4. **uploadProfileImage関数の修正**:

```typescript
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
```

5. **handleSubmit内のアップロード処理有効化**:

```typescript
// プロフィール画像をアップロード（ある場合）
let photoURL = user.photoURL;
if (profileImage && profileImageFile) {
  console.log('Uploading profile image...');
  photoURL = await uploadProfileImage(user.uid);
  console.log('Profile image uploaded:', photoURL);
}
```

### 4. 環境変数の確認

`.env.local`ファイルに以下の設定があることを確認:

```
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
```

### 5. 料金監視設定

Firebase Consoleで予算アラートを設定することを推奨:

1. Google Cloud Consoleに移動
2. 請求 > 予算とアラート
3. 予算を作成してアラートを設定

## コスト最適化のヒント

- 画像は200x200pxにリサイズされるため、Storage使用量は最小限
- 古い画像ファイルの自動削除機能を実装することを検討
- Firebase Storage使用量を定期的に監視

## 注意事項

- 有効化前にFirebase Storageの料金体系を確認してください
- セキュリティルールは必ず適切に設定してください
- 本番環境での有効化前にテスト環境で十分にテストしてください

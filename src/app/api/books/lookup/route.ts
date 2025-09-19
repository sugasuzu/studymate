/**
 * @file 書籍情報検索用API Route
 *
 * NOTE: コーディング規約ではServer Actionsの使用が推奨されていますが、
 * このエンドポイントは以下の理由によりAPI Routeとして実装しています：
 *
 * 1. バーコードスキャナー（Quagga2）からの非同期リクエストに対応
 * 2. 外部API（Google Books API、楽天Books API）へのプロキシとして機能
 * 3. レスポンスヘッダーのカスタマイズが必要（CORS対応など）
 * 4. キャッシュ制御の細かい設定が必要
 *
 * 将来的には部分的にServer Actionsへの移行を検討しますが、
 * リアルタイムスキャン機能のためにはAPI Routeが適切です。
 */

import { NextRequest, NextResponse } from 'next/server';

interface BookInfo {
  isbn: string;
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  currency?: string;
  pageCount?: number;
  categories?: string[];
  source: 'google' | 'rakuten' | 'ndl' | 'manual';
}

// Simple in-memory cache for development
// In production, consider using Redis or another caching solution
const cache = new Map<string, { data: BookInfo; timestamp: number }>();
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

// Rate limiting
const lastRequestTime = new Map<string, number>();
const MIN_REQUEST_INTERVAL = {
  rakuten: 1000, // 1 request per second
  google: 100, // 10 requests per second
};

async function searchGoogleBooks(isbn: string): Promise<BookInfo | null> {
  try {
    // Rate limiting
    const lastTime = lastRequestTime.get('google') || 0;
    const now = Date.now();
    if (now - lastTime < MIN_REQUEST_INTERVAL.google) {
      await new Promise((resolve) =>
        setTimeout(resolve, MIN_REQUEST_INTERVAL.google - (now - lastTime))
      );
    }
    lastRequestTime.set('google', Date.now());

    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&langRestrict=ja`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
        signal: AbortSignal.timeout(5000), // 5 second timeout
      }
    );

    if (!response.ok) {
      console.error(`Google Books API error: ${response.status}`);
      return null;
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const book = data.items[0].volumeInfo;
      return {
        isbn,
        title: book.title,
        authors: book.authors || [],
        publisher: book.publisher,
        publishedDate: book.publishedDate,
        description: book.description,
        imageUrl: book.imageLinks?.thumbnail?.replace('http:', 'https:'),
        pageCount: book.pageCount,
        categories: book.categories,
        source: 'google',
      };
    }

    return null;
  } catch (error) {
    console.error('Google Books API error:', error);
    return null;
  }
}

async function searchRakutenBooks(isbn: string): Promise<BookInfo | null> {
  const appId = process.env.RAKUTEN_APP_ID;

  if (!appId) {
    console.log('Rakuten API key not configured, skipping Rakuten search');
    return null;
  }

  try {
    // Rate limiting
    const lastTime = lastRequestTime.get('rakuten') || 0;
    const now = Date.now();
    if (now - lastTime < MIN_REQUEST_INTERVAL.rakuten) {
      await new Promise((resolve) =>
        setTimeout(resolve, MIN_REQUEST_INTERVAL.rakuten - (now - lastTime))
      );
    }
    lastRequestTime.set('rakuten', Date.now());

    const response = await fetch(
      `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?` +
        `format=json&isbn=${isbn}&applicationId=${appId}`,
      {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      console.error(`Rakuten Books API error: ${response.status}`);
      return null;
    }

    const data = await response.json();

    if (data.Items && data.Items.length > 0) {
      const book = data.Items[0].Item;
      return {
        isbn,
        title: book.title,
        authors: book.author ? [book.author] : [],
        publisher: book.publisherName,
        publishedDate: book.salesDate,
        description: book.itemCaption,
        imageUrl:
          book.largeImageUrl || book.mediumImageUrl || book.smallImageUrl,
        price: book.itemPrice,
        currency: 'JPY',
        source: 'rakuten',
      };
    }

    return null;
  } catch (error) {
    console.error('Rakuten Books API error:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const isbn = searchParams.get('isbn');

    if (!isbn) {
      return NextResponse.json(
        { error: 'ISBN parameter is required' },
        { status: 400 }
      );
    }

    // Normalize ISBN (remove hyphens and spaces)
    const normalizedISBN = isbn.replace(/[-\s]/g, '');

    // Validate ISBN format (basic validation)
    if (!/^\d{10}|\d{13}$/.test(normalizedISBN)) {
      return NextResponse.json(
        { error: 'Invalid ISBN format' },
        { status: 400 }
      );
    }

    // Check cache
    const cached = cache.get(normalizedISBN);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json(cached.data);
    }

    // Try Rakuten Books first (best for Japanese books)
    const rakutenResult = await searchRakutenBooks(normalizedISBN);
    if (rakutenResult) {
      cache.set(normalizedISBN, { data: rakutenResult, timestamp: Date.now() });
      return NextResponse.json(rakutenResult);
    }

    // Fallback to Google Books
    const googleResult = await searchGoogleBooks(normalizedISBN);
    if (googleResult) {
      cache.set(normalizedISBN, { data: googleResult, timestamp: Date.now() });
      return NextResponse.json(googleResult);
    }

    // If both fail, return a basic structure for manual entry
    const manualEntry: BookInfo = {
      isbn: normalizedISBN,
      title: '',
      source: 'manual',
    };

    return NextResponse.json(manualEntry);
  } catch (error) {
    console.error('Book lookup API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

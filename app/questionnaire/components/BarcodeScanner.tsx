'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Quagga from '@ericblade/quagga2';

interface BookInfo {
  isbn?: string;
  title?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  currency?: string;
  source?: string;
}

interface BarcodeScannerProps {
  onDetected: (code: string, productInfo?: BookInfo) => void;
}

// ISBN validation function
function isValidISBN(code: string): boolean {
  const cleanCode = code.replace(/[-\s]/g, '');

  // Check if it's 10 or 13 digits
  if (!/^\d{10}$|^\d{13}$/.test(cleanCode)) {
    return false;
  }

  // For ISBN-13, check if it starts with 978 or 979 (book industry)
  if (cleanCode.length === 13) {
    if (!cleanCode.startsWith('978') && !cleanCode.startsWith('979')) {
      return false;
    }

    // Calculate checksum for ISBN-13
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const digit = parseInt(cleanCode[i]);
      sum += i % 2 === 0 ? digit : digit * 3;
    }
    const checkDigit = (10 - (sum % 10)) % 10;
    return checkDigit === parseInt(cleanCode[12]);
  }

  // For ISBN-10, validate checksum
  if (cleanCode.length === 10) {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCode[i]) * (10 - i);
    }
    const checkDigit = (11 - (sum % 11)) % 11;
    const lastChar = cleanCode[9];
    const expectedCheck = checkDigit === 10 ? 'X' : checkDigit.toString();
    return lastChar === expectedCheck || lastChar === checkDigit.toString();
  }

  return false;
}

export function BarcodeScanner({ onDetected }: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detectedCode, setDetectedCode] = useState<string | null>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const [scanMode, setScanMode] = useState<'camera' | 'manual' | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isScanning) {
        Quagga.stop();
      }
    };
  }, [isScanning]);

  const fetchBookInfo = useCallback(async (isbn: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/books/lookup?isbn=${isbn}`);
      if (!response.ok) {
        throw new Error('Failed to fetch book information');
      }
      const bookInfo = await response.json();
      return bookInfo;
    } catch (error) {
      console.error('Error fetching book info:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const startCameraScanner = useCallback(async () => {
    setError(null);
    setIsScanning(true);
    setScanMode('camera');

    // Wait for the DOM to update
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (!scannerRef.current) {
      setError(
        'スキャナーの初期化に失敗しました。ページを再読み込みしてお試しください。'
      );
      setIsScanning(false);
      setScanMode(null);
      return;
    }

    try {
      // Check if we're in a secure context (HTTPS or localhost)
      if (!window.isSecureContext && window.location.hostname !== 'localhost') {
        throw new Error('カメラアクセスにはHTTPS接続が必要です。');
      }

      // Check if camera access is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('このブラウザはカメラアクセスをサポートしていません。');
      }

      // Request camera permission first
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        // Stop the test stream immediately
        stream.getTracks().forEach((track) => track.stop());
      } catch (permissionError) {
        throw new Error(
          'カメラへのアクセスが拒否されました。ブラウザの設定でカメラのアクセスを許可してください。'
        );
      }
      await Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: scannerRef.current,
            constraints: {
              width: { min: 320, ideal: 640, max: 800 },
              height: { min: 240, ideal: 480, max: 600 },
              aspectRatio: { min: 1, max: 2 },
              facingMode: 'environment', // Use back camera on mobile
            },
          },
          locator: {
            patchSize: 'medium',
            halfSample: true,
          },
          numOfWorkers: navigator.hardwareConcurrency > 2 ? 2 : 1,
          frequency: 10,
          decoder: {
            readers: [
              'ean_reader', // EAN-13 (ISBN-13)
              'ean_8_reader', // EAN-8
              'code_128_reader', // Code 128
              'code_39_reader', // Code 39
              'upc_reader', // UPC-A
              'upc_e_reader', // UPC-E
            ],
            multiple: false,
          },
          locate: true,
        },
        (err) => {
          if (err) {
            console.error('Quagga initialization failed:', err);
            let errorMessage = 'カメラの初期化に失敗しました。';

            if (err.name === 'NotAllowedError') {
              errorMessage =
                'カメラへのアクセスが拒否されました。ブラウザの設定でカメラのアクセスを許可してください。';
            } else if (err.name === 'NotFoundError') {
              errorMessage =
                'カメラが見つかりません。デバイスにカメラが接続されていることを確認してください。';
            } else if (err.name === 'NotSupportedError') {
              errorMessage =
                'このブラウザではカメラ機能がサポートされていません。';
            }

            setError(errorMessage);
            setIsScanning(false);
            setScanMode(null);
            return;
          }

          Quagga.start();
        }
      );

      // Handle detected barcodes
      Quagga.onDetected(async (result) => {
        const code = result.codeResult.code;

        if (code && code.length > 0) {
          // Validate if this is likely an ISBN
          if (!isValidISBN(code)) {
            return; // Continue scanning for valid ISBN
          }

          // Stop scanning to prevent multiple detections
          Quagga.stop();
          setDetectedCode(code);

          const bookInfo = await fetchBookInfo(code);
          onDetected(code, bookInfo);

          setIsScanning(false);
          setScanMode(null);
        }
      });
    } catch (err) {
      console.error('Scanner error:', err);
      if (err instanceof Error) {
        console.error('Error details:', {
          name: err.name,
          message: err.message,
          stack: err.stack,
        });
      }

      let errorMessage = 'バーコードスキャナーの起動に失敗しました';
      if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setIsScanning(false);
      setScanMode(null);
    }
  }, [onDetected, fetchBookInfo]);

  const stopScanner = useCallback(() => {
    Quagga.stop();
    setIsScanning(false);
    setScanMode(null);
    setDetectedCode(null);
  }, []);

  const handleManualInput = useCallback(async () => {
    const code = prompt(
      'ISBNコード（バーコード番号）を入力してください:\n例：9784123456789'
    );

    if (code && code.trim()) {
      const cleanCode = code.trim().replace(/[-\s]/g, '');

      // Validate ISBN
      if (!isValidISBN(cleanCode)) {
        alert(
          '有効なISBNコードではありません。\n978または979で始まる13桁、または10桁のISBNを入力してください。'
        );
        return;
      }

      setDetectedCode(cleanCode);
      setIsLoading(true);

      const bookInfo = await fetchBookInfo(cleanCode);
      onDetected(cleanCode, bookInfo);

      setIsLoading(false);
    }
  }, [onDetected, fetchBookInfo]);

  return (
    <div className="mt-4 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
      {!scanMode ? (
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            教材のバーコード（ISBN）をスキャンまたは手動入力
          </p>
          <div className="flex gap-4 justify-center">
            <button
              type="button"
              onClick={startCameraScanner}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              <svg
                className="w-5 h-5 inline mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              カメラでスキャン
            </button>
            <button
              type="button"
              onClick={handleManualInput}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              disabled={isLoading}
            >
              <svg
                className="w-5 h-5 inline mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              手動入力
            </button>
          </div>

          {detectedCode && (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-green-800 dark:text-green-200">
                検出されたコード:{' '}
                <span className="font-mono font-bold">{detectedCode}</span>
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>
          {error ? (
            <div className="text-center">
              <div className="text-red-600 dark:text-red-400 mb-4">{error}</div>
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setScanMode(null);
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                戻る
              </button>
            </div>
          ) : (
            <>
              {/* Scanner viewport */}
              <div
                ref={scannerRef}
                className="relative w-full bg-black rounded-lg overflow-hidden"
                style={{ minHeight: '300px' }}
              >
                {isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div
                      className="border-2 border-yellow-400 rounded-lg"
                      style={{ width: '80%', height: '120px', opacity: 0.5 }}
                    >
                      <div className="w-full h-full border-2 border-yellow-400 animate-pulse"></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  バーコードをカメラに映してください
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    type="button"
                    onClick={stopScanner}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    スキャンを停止
                  </button>
                  <button
                    type="button"
                    onClick={handleManualInput}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    手動入力に切り替え
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {isLoading && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <svg
              className="animate-spin h-5 w-5"
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
            <span>書籍情報を取得中...</span>
          </div>
        </div>
      )}
    </div>
  );
}

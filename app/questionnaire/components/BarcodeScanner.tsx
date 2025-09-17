"use client";

import { useState, useRef, useEffect } from "react";

interface BarcodeScannerProps {
  onDetected: (code: string) => void;
}

export function BarcodeScanner({ onDetected }: BarcodeScannerProps) {
  const [, setHasPermission] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // コンポーネントのクリーンアップ
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setHasPermission(true);
      setIsScanning(true);
      setError(null);

      // QuaggaJSやZXingなどのバーコード読み取りライブラリを使用
      // ここでは簡略化のため、手動入力のみとします
    } catch (err) {
      console.error("Camera access error:", err);
      setError("カメラへのアクセスが許可されていません");
      setHasPermission(false);
    }
  };

  const stopScanner = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const handleManualInput = () => {
    const code = prompt(
      "バーコードを手動で入力してください（ISBNコードなど）:"
    );
    if (code) {
      onDetected(code);
      stopScanner();
    }
  };

  return (
    <div className="mt-4 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
      {!isScanning ? (
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            教材のバーコードをスキャンまたは手動入力
          </p>
          <div className="flex gap-4 justify-center">
            <button
              type="button"
              onClick={startScanner}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              カメラでスキャン
            </button>
            <button
              type="button"
              onClick={handleManualInput}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              手動入力
            </button>
          </div>
        </div>
      ) : (
        <div>
          {error ? (
            <div className="text-red-600 dark:text-red-400 text-center">
              {error}
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 bg-black rounded-lg mb-4"
              />
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
            </>
          )}
        </div>
      )}
    </div>
  );
}

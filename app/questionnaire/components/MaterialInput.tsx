"use client";

import { useState } from "react";
import { BarcodeScanner } from "./BarcodeScanner";

interface Material {
  materialName: string;
  materialBarcode?: string;
  materialReview: string;
}

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

interface MaterialInputProps {
  material: Material;
  index: number;
  onMaterialChange: (index: number, field: keyof Material, value: string) => void;
  onRemove: (index: number) => void;
  showRemoveButton: boolean;
}

export function MaterialInput({
  material,
  index,
  onMaterialChange,
  onRemove,
  showRemoveButton
}: MaterialInputProps) {
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);

  const handleBarcodeDetected = (code: string, productInfo?: BookInfo) => {
    onMaterialChange(index, "materialBarcode", code);

    // If we got book information, auto-fill the material name
    if (productInfo && productInfo.title) {
      onMaterialChange(index, "materialName", productInfo.title);
    }

    setShowBarcodeScanner(false);
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4 bg-gray-50 dark:bg-gray-800/50">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          教材 {index + 1}
        </h3>
        {showRemoveButton && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>

      {/* 教材名 */}
      <div>
        <label htmlFor={`material-${index}`} className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          教材名 <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id={`material-${index}`}
            value={material.materialName}
            onChange={(e) => onMaterialChange(index, "materialName", e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            placeholder="例：システム英単語"
            required
          />
          <button
            type="button"
            onClick={() => setShowBarcodeScanner(!showBarcodeScanner)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            バーコード
          </button>
        </div>
        {showBarcodeScanner && (
          <BarcodeScanner onDetected={handleBarcodeDetected} />
        )}
        {material.materialBarcode && (
          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ISBN: <span className="font-mono">{material.materialBarcode}</span>
            </p>
          </div>
        )}
      </div>

      {/* レビュー */}
      <div>
        <label htmlFor={`review-${index}`} className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          教材のレビュー <span className="text-red-500">*</span>
          <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
            （{material.materialReview?.length || 0}文字）
          </span>
        </label>
        <textarea
          id={`review-${index}`}
          value={material.materialReview}
          onChange={(e) => onMaterialChange(index, "materialReview", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          rows={6}
          placeholder="この教材を使った感想を詳しく教えてください。&#10;例：&#10;・なぜこの参考書を選んだか？&#10;・いつ、どのように使ったか？&#10;・結果、どうだったか？&#10;・この参考書の良い点と改善点&#10;・どんな人におすすめか？"
          required
        />
      </div>
    </div>
  );
}
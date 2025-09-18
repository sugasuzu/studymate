'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { searchUniversities } from '@/lib/actions/universities';
import { useDebounce } from '@/hooks/useDebounce';

interface University {
  school_code: string;
  school_name: string;
  prefecture?: string;
  homepage?: string;
  address?: string;
}

interface UniversitySearchProps {
  onUniversitySelect: (university: University) => void;
  initialUniversities?: University[];
}

export function UniversitySearch({
  onUniversitySelect,
  initialUniversities = [],
}: UniversitySearchProps) {
  // initialUniversitiesをメモ化して参照を安定化
  const memoizedInitialUniversities = useMemo(() => initialUniversities, [initialUniversities]);

  const [searchTerm, setSearchTerm] = useState('');
  const [universities, setUniversities] =
    useState<University[]>(memoizedInitialUniversities);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(null);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchCache = useRef<Map<string, University[]>>(new Map());

  const debouncedSearchTerm = useDebounce(searchTerm, 800);

  // memoizedInitialUniversitiesが変更されたときのみ更新
  useEffect(() => {
    setUniversities(memoizedInitialUniversities);
  }, [memoizedInitialUniversities]);

  // Server Actionを使用した検索
  const performSearch = useCallback(
    async (keyword: string) => {
      if (keyword.length < 2) {
        setUniversities(memoizedInitialUniversities);
        return;
      }

      // キャッシュチェック
      const cachedResult = searchCache.current.get(keyword);
      if (cachedResult) {
        setUniversities(cachedResult);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await searchUniversities(keyword);

        if (result.success) {
          // キャッシュに保存
          searchCache.current.set(keyword, result.data.universities);
          setUniversities(result.data.universities);
        } else {
          setError(result.error);
          setUniversities([]);
        }
      } catch (err) {
        console.error('University search failed:', err);
        setError('検索中にエラーが発生しました');
        setUniversities([]);
      } finally {
        setIsLoading(false);
      }
    },
    [memoizedInitialUniversities]
  );

  useEffect(() => {
    if (debouncedSearchTerm && !selectedUniversity) {
      performSearch(debouncedSearchTerm);
      setShowDropdown(true);
    } else if (!debouncedSearchTerm) {
      setUniversities(memoizedInitialUniversities);
      setShowDropdown(false);
    }
  }, [
    debouncedSearchTerm,
    performSearch,
    selectedUniversity,
    memoizedInitialUniversities,
  ]);

  // 外部クリックでドロップダウンを閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectUniversity = (university: University) => {
    setSelectedUniversity(university);
    setSearchTerm(university.school_name);
    setShowDropdown(false);
    onUniversitySelect(university);
  };

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    if (selectedUniversity && value !== selectedUniversity.school_name) {
      setSelectedUniversity(null);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <label
        htmlFor="university"
        className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
      >
        大学名 <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          type="text"
          id="university"
          value={searchTerm}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white pr-10"
          placeholder="大学名を入力して検索"
          required
          aria-autocomplete="list"
          aria-controls="university-dropdown"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="animate-spin h-5 w-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-label="検索中"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* エラー表示 */}
      {error && (
        <div className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {/* ドロップダウン */}
      {showDropdown && universities.length > 0 && (
        <div
          id="university-dropdown"
          role="listbox"
          className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {universities.map((university) => (
            <button
              key={university.school_code}
              type="button"
              role="option"
              aria-selected={
                selectedUniversity?.school_code === university.school_code
              }
              onClick={() => handleSelectUniversity(university)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
            >
              <div className="font-medium text-gray-900 dark:text-white">
                {university.school_name}
              </div>
              {university.prefecture && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {university.prefecture}
                  {university.address && ` - ${university.address}`}
                </div>
              )}
              {university.homepage && (
                <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  {new URL(university.homepage).hostname}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {showDropdown &&
        searchTerm.length >= 2 &&
        universities.length === 0 &&
        !isLoading && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-4">
            <p className="text-gray-500 dark:text-gray-400 text-center">
              該当する大学が見つかりませんでした
            </p>
          </div>
        )}

      {selectedUniversity && (
        <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            選択中:{' '}
            <span className="font-semibold">
              {selectedUniversity.school_name}
            </span>
            {selectedUniversity.homepage && (
              <span className="ml-2 text-xs">
                ({new URL(selectedUniversity.homepage).hostname})
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}

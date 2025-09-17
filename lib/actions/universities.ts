"use server";

import { z } from "zod";
import { headers } from "next/headers";

// 型定義
interface University {
  school_code: string;
  school_name: string;
  prefecture?: string;
  address?: string;
  homepage?: string;
}

interface School {
  school_code: string;
  school_name: string;
  school_type: string;
  pref: string;
  school_locate_at: string;
  school_status: string;
  school_founder: string;
  homepage?: string;
}

type ActionResult<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
  code?: string;
};

// バリデーションスキーマ
const searchUniversitiesSchema = z.object({
  keyword: z.string().min(2, "検索キーワードは2文字以上で入力してください"),
});

// 環境変数の検証
const API_TOKEN = process.env.EDU_DATA_API_TOKEN;
const API_BASE_URL = "https://api.edu-data.jp/api/v1";

/**
 * 大学を検索するServer Action
 * 
 * @param keyword - 検索キーワード
 * @returns 大学リストまたはエラー
 * 
 * @example
 * ```typescript
 * const result = await searchUniversities("東京");
 * if (result.success) {
 *   console.log(result.data.universities);
 * }
 * ```
 */
export async function searchUniversities(
  keyword: string
): Promise<ActionResult<{ universities: University[] }>> {
  try {
    // バリデーション
    const validatedData = searchUniversitiesSchema.safeParse({ keyword });
    
    if (!validatedData.success) {
      return {
        success: false,
        error: validatedData.error.issues[0]?.message || "入力が不正です",
        code: "VALIDATION_ERROR"
      };
    }

    // APIトークンチェック
    if (!API_TOKEN) {
      console.warn("EDU_DATA_API_TOKEN is not set, returning mock data");
      return {
        success: true,
        data: {
          universities: getMockUniversities(keyword)
        }
      };
    }

    // APIパラメータ
    const params = new URLSearchParams({
      keyword: validatedData.data.keyword,
      school_type_code: "F1", // 大学
      school_status_code: "1", // 本校
    });

    // API呼び出し
    const response = await fetch(
      `${API_BASE_URL}/school?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          Accept: "application/json",
        },
        next: { revalidate: 3600 } // 1時間キャッシュ
      }
    );

    if (!response.ok) {
      console.error("edu-data API error:", response.status);
      return {
        success: false,
        error: "大学検索に失敗しました",
        code: "API_ERROR"
      };
    }

    const data = await response.json();

    // データの整形
    const universities: University[] = (data.schools?.data || []).map((school: School) => ({
      school_code: school.school_code,
      school_name: school.school_name,
      prefecture: school.pref,
      address: school.school_locate_at,
      homepage: school.homepage,
    }));

    return {
      success: true,
      data: { universities }
    };

  } catch (error) {
    console.error("University search error:", error);
    return {
      success: false,
      error: "大学検索中にエラーが発生しました",
      code: "INTERNAL_ERROR"
    };
  }
}

/**
 * モックデータを返す（開発用）
 */
function getMockUniversities(keyword: string): University[] {
  const mockData: University[] = [
    {
      school_code: "0001",
      school_name: "東京大学",
      prefecture: "東京都",
      address: "文京区本郷7-3-1",
      homepage: "https://www.u-tokyo.ac.jp",
    },
    {
      school_code: "0002",
      school_name: "京都大学",
      prefecture: "京都府",
      address: "京都市左京区吉田本町",
      homepage: "https://www.kyoto-u.ac.jp",
    },
    {
      school_code: "0003",
      school_name: "慶應義塾大学",
      prefecture: "東京都",
      address: "港区三田2-15-45",
      homepage: "https://www.keio.ac.jp",
    },
    {
      school_code: "0004",
      school_name: "早稲田大学",
      prefecture: "東京都",
      address: "新宿区西早稲田1-6-1",
      homepage: "https://www.waseda.jp",
    },
  ];

  return mockData.filter((uni) =>
    uni.school_name.toLowerCase().includes(keyword.toLowerCase())
  );
}
// edu-data API utility functions
// Server-side only - do not use in client components

interface School {
  school_code: string;
  school_name: string;
  school_type: string;
  prefecture: string;
  address: string;
  school_status: string;
  establishment: string;
  homepage?: string;
}

interface SearchSchoolParams {
  keyword?: string;
  school_type_code?: string; // 大学: 5
  school_status_code?: string; // 現存: 2
  prefecture_code?: string;
}

interface ApiResponse {
  status: number;
  message: string;
  data: School[];
  total: number;
}

// APIトークンは環境変数から取得（.env.localに設定）
const API_TOKEN = process.env.EDU_DATA_API_TOKEN || "";
const API_BASE_URL = "https://api.edu-data.jp/api/v1";

/**
 * 学校を検索する（サーバーサイドのみ）
 */
export async function searchSchools(
  params: SearchSchoolParams
): Promise<ApiResponse> {
  try {
    const searchParams = new URLSearchParams();

    // パラメータを追加
    if (params.keyword) {
      searchParams.append("keyword", params.keyword);
    }
    if (params.school_type_code) {
      searchParams.append("school_type_code", params.school_type_code);
    }
    if (params.school_status_code) {
      searchParams.append("school_status_code", params.school_status_code);
    }
    if (params.prefecture_code) {
      searchParams.append("prefecture_code", params.prefecture_code);
    }

    const url = `${API_BASE_URL}/school?${searchParams.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: "application/json",
      },
      cache: "no-store", // SSRでリアルタイムデータ取得
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching schools:", error);
    return {
      status: 500,
      message: "Failed to fetch schools",
      data: [],
      total: 0,
    };
  }
}

/**
 * 大学のみを検索する（サーバーサイドのみ）
 */
export async function searchUniversities(keyword: string): Promise<School[]> {
  const result = await searchSchools({
    keyword,
    school_type_code: "F1", // 大学
    school_status_code: "1", // 本校
  });

  return result.data || [];
}

/**
 * 大学のドメインを抽出する
 */
export function extractDomain(homepage?: string): string | null {
  if (!homepage) return null;

  try {
    const url = new URL(homepage);
    return url.hostname;
  } catch {
    return null;
  }
}

/**
 * 学校コードから学校情報を取得
 */
export async function getSchoolByCode(
  schoolCode: string
): Promise<School | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/school/${schoolCode}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: "application/json",
      },
      cache: "force-cache", // 学校情報はキャッシュ可能
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching school by code:", error);
    return null;
  }
}

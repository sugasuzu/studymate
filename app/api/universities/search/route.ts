import { NextRequest, NextResponse } from "next/server";

// edu-data API用の型定義
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


// APIトークン（環境変数から取得）
const API_TOKEN = process.env.EDU_DATA_API_TOKEN || "";
const API_BASE_URL = "https://api.edu-data.jp/api/v1";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get("keyword");

    if (!keyword || keyword.length < 2) {
      return NextResponse.json(
        { universities: [], message: "Keyword must be at least 2 characters" },
        { status: 400 }
      );
    }

    // edu-data APIを呼び出し
    const params = new URLSearchParams({
      keyword: keyword,
      school_type_code: "F1", // 大学
      school_status_code: "1", // 本校
    });

    const response = await fetch(
      `${API_BASE_URL}/school?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("edu-data API error:", response.status);
      const errorText = await response.text();
      console.error("edu-data API error details:", errorText);

      // APIトークンが設定されていない場合のモックデータ
      if (!API_TOKEN) {
        return NextResponse.json({
          universities: [
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
          ].filter((uni) =>
            uni.school_name.toLowerCase().includes(keyword.toLowerCase())
          ),
        });
      }

      return NextResponse.json(
        { universities: [], message: "Failed to fetch universities" },
        { status: 500 }
      );
    }

    const data = await response.json();

    // 大学データを整形して返す
    const universities = data.schools.data.map((school: School) => ({
      school_code: school.school_code,
      school_name: school.school_name,
      prefecture: school.pref,
      address: school.school_locate_at,
      homepage: school.homepage,
    }));

    return NextResponse.json({ universities });
  } catch (error) {
    console.error("Error in university search API:", error);
    return NextResponse.json(
      { universities: [], message: "Internal server error" },
      { status: 500 }
    );
  }
}

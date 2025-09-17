"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UniversitySearch } from "./Universitysearch";
import { MaterialInput } from "./MaterialInput";

interface Material {
  materialName: string;
  materialBarcode?: string;
  materialReview: string;
}

export interface FormData {
  age: number;
  universityName: string;
  universityDepartment: string;
  universityDomain: string;
  examSubjects: string;
  materials: Material[];
  submittedAt: Date;
}

interface QuestionnaireFormProps {
  initialUniversities?: Array<{
    school_code: string;
    school_name: string;
    homepage?: string;
  }>;
}

export function QuestionnaireForm({ initialUniversities = [] }: QuestionnaireFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<FormData>>({
    age: 18,
    universityName: "",
    universityDepartment: "",
    universityDomain: "",
    examSubjects: "",
    materials: [{
      materialName: "",
      materialBarcode: "",
      materialReview: "",
    }],
  });

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMaterialChange = (index: number, field: keyof Material, value: string) => {
    setFormData((prev) => {
      const newMaterials = [...(prev.materials || [])];
      newMaterials[index] = {
        ...newMaterials[index],
        [field]: value,
      };
      return {
        ...prev,
        materials: newMaterials,
      };
    });
  };

  const addMaterial = () => {
    setFormData((prev) => ({
      ...prev,
      materials: [
        ...(prev.materials || []),
        {
          materialName: "",
          materialBarcode: "",
          materialReview: "",
        },
      ],
    }));
  };

  const removeMaterial = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      materials: (prev.materials || []).filter((_, i) => i !== index),
    }));
  };

  const handleUniversitySelect = (university: { school_name: string; homepage?: string }) => {
    handleInputChange("universityName", university.school_name);
    if (university.homepage) {
      try {
        const url = new URL(university.homepage);
        handleInputChange("universityDomain", url.hostname);
      } catch {
        console.error("Invalid URL:", university.homepage);
      }
    }
  };

  const validateForm = (): boolean => {
    if (!formData.age || formData.age < 15 || formData.age > 100) {
      setError("年齢は15〜100歳の間で入力してください");
      return false;
    }
    if (!formData.universityName) {
      setError("大学名を入力してください");
      return false;
    }
    if (!formData.universityDepartment) {
      setError("学部名を入力してください");
      return false;
    }
    if (!formData.universityDomain) {
      setError("大学のドメインは必須です");
      return false;
    }
    if (!formData.materials || formData.materials.length === 0) {
      setError("教材を少なくとも1つは入力してください");
      return false;
    }
    for (let i = 0; i < formData.materials.length; i++) {
      const material = formData.materials[i];
      if (!material.materialName || material.materialName.trim() === "") {
        setError(`教材${i + 1}の教材名を入力してください`);
        return false;
      }
      if (!material.materialReview || material.materialReview.trim() === "") {
        setError(`教材${i + 1}のレビューを入力してください`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Firestoreに保存
      const docRef = await addDoc(collection(db, "questionnaires"), {
        ...formData,
        submittedAt: new Date(),
      });
      
      console.log("Document written with ID: ", docRef.id);
      setIsSuccess(true);
      
      // フォームをリセット
      setFormData({
        age: 18,
        universityName: "",
        universityDepartment: "",
        universityDomain: "",
        examSubjects: "",
        materials: [{
          materialName: "",
          materialBarcode: "",
          materialReview: "",
        }],
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      setError("送信中にエラーが発生しました。もう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center">
        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ご回答ありがとうございました！
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          あなたの貴重なレビューが、後輩たちの教材選びの助けになります。
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          別のレビューを投稿する
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* 年齢 */}
      <div>
        <label htmlFor="age" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          年齢 <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="age"
          value={formData.age}
          onChange={(e) => handleInputChange("age", parseInt(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          min="15"
          max="100"
          required
        />
      </div>


      {/* 大学検索 */}
      <UniversitySearch
        onUniversitySelect={handleUniversitySelect}
        initialUniversities={initialUniversities}
      />

      {/* 学部 */}
      <div>
        <label htmlFor="department" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          学部・学科 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="department"
          value={formData.universityDepartment}
          onChange={(e) => handleInputChange("universityDepartment", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          placeholder="例：経済学部"
          required
        />
      </div>

      {/* 大学ドメイン */}
      <div>
        <label htmlFor="domain" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          大学ドメイン <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="domain"
          value={formData.universityDomain}
          onChange={(e) => handleInputChange("universityDomain", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          placeholder="例：university.ac.jp"
          required
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          大学の公式ウェブサイトのドメインを入力してください
        </p>
      </div>

      {/* 受験科目 */}
      <div>
        <label htmlFor="subjects" className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
          受験科目（任意）
        </label>
        <input
          type="text"
          id="subjects"
          value={formData.examSubjects}
          onChange={(e) => handleInputChange("examSubjects", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          placeholder="例：英語、数学、国語"
        />
      </div>

      {/* 教材セクション */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            教材レビュー
          </h2>
          <button
            type="button"
            onClick={addMaterial}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            教材を追加
          </button>
        </div>

        {formData.materials?.map((material, index) => (
          <MaterialInput
            key={index}
            material={material}
            index={index}
            onMaterialChange={handleMaterialChange}
            onRemove={removeMaterial}
            showRemoveButton={formData.materials!.length > 1}
          />
        ))}
      </div>

      {/* 送信ボタン */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg text-lg hover:opacity-90 transition transform hover:scale-105 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "送信中..." : "レビューを投稿"}
        </button>
      </div>
    </form>
  );
}
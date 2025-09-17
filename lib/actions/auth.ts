// lib/actions/auth.ts
'use server';

import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Firebase Admin SDKなしでユーザープロフィールを管理
export async function saveUserProfile(
  userId: string,
  profileData: any
) {
  try {
    // Firestoreに直接保存（Client SDKを使用）
    await setDoc(doc(db, 'users', userId), {
      ...profileData,
      updatedAt: new Date(),
    }, { merge: true });

    return { success: true };
  } catch (error) {
    console.error('Profile save error:', error);
    return { 
      success: false, 
      error: 'プロフィールの保存に失敗しました' 
    };
  }
}

export async function getUserProfile(userId: string) {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { 
        success: true, 
        data: docSnap.data() 
      };
    } else {
      return { 
        success: false, 
        error: 'ユーザーが見つかりません' 
      };
    }
  } catch (error) {
    console.error('Profile fetch error:', error);
    return { 
      success: false, 
      error: 'プロフィールの取得に失敗しました' 
    };
  }
}
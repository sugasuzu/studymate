'use server';

import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function fixIncompleteProfiles() {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));

    const updates = [];

    for (const userDoc of usersSnapshot.docs) {
      const data = userDoc.data();

      // 大学情報がないのにprofileCompletedがtrueの場合
      if (data.profileCompleted && !data.universityName) {
        updates.push(
          updateDoc(doc(db, 'users', userDoc.id), {
            profileCompleted: false,
            updatedAt: new Date(),
          })
        );
      }
    }

    await Promise.all(updates);

    return {
      success: true,
      updated: updates.length,
    };
  } catch (error) {
    console.error('Error fixing profiles:', error);
    return {
      success: false,
      error: 'Failed to fix profiles',
    };
  }
}

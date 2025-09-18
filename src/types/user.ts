export interface UserProfile {
  uid: string;
  email: string | null;
  displayName?: string;
  photoURL?: string;
  universityName?: string;
  universityDepartment?: string;
  graduationYear?: number;
  isStudent?: boolean;
  profileCompleted: boolean; // プロフィール完成フラグ
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

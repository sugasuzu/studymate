// src/hooks/useAuth.tsx
'use client';

import {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from 'react';
import {
  User,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  createSession: (user: User) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  createSession: async () => false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  /**
   * セッションクッキーを作成
   */
  const createSession = useCallback(async (user: User): Promise<boolean> => {
    try {
      const idToken = await user.getIdToken();

      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      return response.ok;
    } catch (error) {
      console.error('Session creation error:', error);
      return false;
    }
  }, []);

  /**
   * サインアウト
   */
  const signOut = useCallback(async () => {
    try {
      // Firebaseからサインアウト
      await firebaseSignOut(auth);

      // セッションクッキーを削除
      await fetch('/api/auth/session', { method: 'DELETE' });

      // トップページへリダイレクト
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }, [router]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('[useAuth] Auth state changed:', user?.uid);
      setUser(user);

      if (user) {
        // 新しいユーザーまたはトークンが更新された場合、セッションを作成/更新
        await createSession(user);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [createSession]);

  return (
    <AuthContext.Provider value={{ user, loading, signOut, createSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// hooks/useAuth.tsx
'use client';

import { useEffect, useState, createContext, useContext, useCallback } from 'react';
import { 
  User, 
  onAuthStateChanged,
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  refreshSession: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  /**
   * IDトークンをセッションクッキーとして保存
   */
  const createSession = useCallback(async (user: User) => {
    try {
      const idToken = await user.getIdToken();
      
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        console.error('Failed to create session');
      }
    } catch (error) {
      console.error('Session creation error:', error);
    }
  }, []);

  /**
   * セッションをリフレッシュ（トークンを更新）
   */
  const refreshSession = useCallback(async () => {
    if (user) {
      const idToken = await user.getIdToken(true); // 強制的に新しいトークンを取得
      await createSession(user);
    }
  }, [user, createSession]);

  /**
   * サインアウト
   */
  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
      await fetch('/api/auth/session', { method: 'DELETE' });
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }, [router]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        await createSession(user);
        
        // トークンの自動更新（50分ごと）
        const interval = setInterval(async () => {
          await refreshSession();
        }, 50 * 60 * 1000);
        
        return () => clearInterval(interval);
      } else {
        await fetch('/api/auth/session', { method: 'DELETE' });
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [createSession, refreshSession]);

  return (
    <AuthContext.Provider value={{ user, loading, signOut, refreshSession }}>
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
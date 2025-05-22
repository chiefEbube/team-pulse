'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => { },
  signUp: async () => { },
  signOut: async () => { },
  error: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log('Session data:', data);

      if (error) {
        console.error('Error getting session:', error);
        setLoading(false);
        return;
      }

      if (data.session) {
        try {
          const response = await fetch(`${BASE_URL}/user/me`, {
            headers: {
              'Authorization': `Bearer ${data.session.access_token}`
            }
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            console.log('User data:', userData);
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
        }
      }

      setLoading(false);
    };

    getSession();

    interface AuthListener {
      subscription: { unsubscribe: () => void };
    }

    interface AuthSession {
      access_token: string;
    }

    interface AuthStateChangeEvent {
      event: 'SIGNED_IN' | 'SIGNED_OUT' | string;
      session: AuthSession | null;
    }

    const { data: authListener }: { data: AuthListener } = supabase.auth.onAuthStateChange(
      async (event: AuthStateChangeEvent['event'], session: AuthSession | null) => {
        if (event === 'SIGNED_IN' && session) {
          try {
            const response = await fetch(`${BASE_URL}/user/me`, {
              headers: {
                'Authorization': `Bearer ${session.access_token}`
              }
            });

            if (response.ok) {
              const userData = await response.json();
              setUser(userData);
            }
          } catch (err) {
            console.error('Error fetching user data:', err);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          router.push('/login');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const signIn = async (email: string, password: string) => {
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message || 'An error occurred during sign in');
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    setError(null);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) throw error;
      router.push('/login?registered=true');
    } catch (error: any) {
      setError(error.message || 'An error occurred during sign up');
    }
  };

  const signOut = async () => {
    setError(null);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      setError(error.message || 'An error occurred during sign out');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
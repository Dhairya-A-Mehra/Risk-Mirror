"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';

interface AuthContextType {
  token: string | null;
  login: (formData: any) => Promise<void>;
  signup: (formData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('aura_token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (formData: any) => {
    try {
      const res = await api.post('/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      const { access_token } = res.data;
      setToken(access_token);
      localStorage.setItem('aura_token', access_token);
      router.push('/dashboard');
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error (e.g., show a toast notification)
    }
  };

  const signup = async (formData: any) => {
    try {
      await api.post('/signup', formData);
      // After signup, redirect to login to get a token
      router.push('/login');
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('aura_token');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
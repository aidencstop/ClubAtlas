/**
 * 인증 컨텍스트 - 전역 인증 상태 관리
 */
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { onAuthChange, getIdToken } from '@/lib/firebase/auth';
import { getCurrentUserProfile, AuthVerifyResponse } from '@/lib/api/auth';

interface AuthContextType {
  user: User | null;
  userProfile: AuthVerifyResponse | null;
  loading: boolean;
  isAuthenticated: boolean;
  isStudent: boolean;
  isClubLeader: boolean;
  isSuperAdmin: boolean;
  hasRole: (role: string) => boolean;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<AuthVerifyResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // 사용자 프로필 새로고침
  const refreshUserProfile = async () => {
    if (!user) {
      setUserProfile(null);
      return;
    }

    try {
      const token = await getIdToken(true); // 강제 갱신
      if (!token) {
        setUserProfile(null);
        return;
      }

      const response = await getCurrentUserProfile(token);
      if (response.data) {
        setUserProfile(response.data);
      } else {
        setUserProfile(null);
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      setUserProfile(null);
    }
  };

  // Firebase 인증 상태 변경 감지
  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // 사용자가 로그인한 경우 프로필 조회
        try {
          const token = await getIdToken();
          if (token) {
            const response = await getCurrentUserProfile(token);
            if (response.data) {
              setUserProfile(response.data);
            }
          }
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          setUserProfile(null);
        }
      } else {
        // 로그아웃한 경우
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 역할 확인 헬퍼 함수들
  const isAuthenticated = !!user && !!userProfile;
  const isStudent = userProfile?.role === 'student';
  const isClubLeader = userProfile?.role === 'club-leader' || userProfile?.role === 'admin';
  const isSuperAdmin = userProfile?.role === 'super-admin';
  
  const hasRole = (role: string): boolean => {
    if (!userProfile) return false;
    
    // admin과 club-leader는 동의어
    if (role === 'admin' || role === 'club-leader') {
      return userProfile.role === 'admin' || userProfile.role === 'club-leader';
    }
    
    return userProfile.role === role;
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    isAuthenticated,
    isStudent,
    isClubLeader,
    isSuperAdmin,
    hasRole,
    refreshUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}



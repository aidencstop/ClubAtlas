'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './AdminLoginForm.module.css';
import ForgotPasswordModal from '../../../student/login/components/ForgotPasswordModal';
import { signIn } from '@/lib/firebase/auth';
import { useAuth } from '@/contexts/AuthContext';

type AdminRole = 'club-leader' | 'super-admin';

interface AdminLoginFormProps {
  role: AdminRole;
  onRoleChange: (role: AdminRole) => void;
}

export default function AdminLoginForm({ role, onRoleChange }: AdminLoginFormProps) {
  const router = useRouter();
  const { refreshUserProfile } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Firebase 로그인
      const userCredential = await signIn(email, password);
      
      // 사용자 프로필 새로고침
      await refreshUserProfile();
      
      // ID 토큰 가져오기
      const token = await userCredential.user.getIdTokenResult();
      const userRole = token.claims.role as string | undefined;
      
      // 역할 확인
      if (role === 'super-admin') {
        if (userRole !== 'super-admin') {
          setError('Super Admin 권한이 없습니다. 역할을 확인해주세요.');
          setLoading(false);
          return;
        }
        router.push('/superadmin/dashboard');
      } else {
        // club-leader 또는 admin
        if (userRole !== 'club-leader' && userRole !== 'admin' && userRole !== 'super-admin') {
          setError('Club Leader 권한이 없습니다. 권한 요청이 필요합니다.');
          setLoading(false);
          return;
        }
        
        // Super Admin은 admin 대시보드에도 접근 가능
        if (userRole === 'super-admin') {
          router.push('/superadmin/dashboard');
        } else {
          router.push('/admin/dashboard');
        }
      }
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Firebase 에러 메시지 처리
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError('이메일 또는 비밀번호가 잘못되었습니다.');
      } else if (err.code === 'auth/user-not-found') {
        setError('존재하지 않는 계정입니다.');
      } else if (err.code === 'auth/user-disabled') {
        setError('비활성화된 계정입니다. 관리자에게 문의하세요.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.');
      } else {
        setError('로그인에 실패했습니다. 다시 시도해주세요.');
      }
      setLoading(false);
    }
  };

  const isSuperAdmin = role === 'super-admin';

  return (
    <div className={`${styles.panel} ${isSuperAdmin ? styles.panelSuperAdmin : styles.panelClubLeader}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>
          {isSuperAdmin ? 'Sign in as Super Admin' : 'Sign in to access your club dashboard'}
        </p>
      </div>

      {/* 역할 선택 버튼 */}
      <div className={styles.roleSelectorWrapper}>
      <div className={styles.roleSelector}>
        <button
          type="button"
          onClick={() => onRoleChange('club-leader')}
          className={`${styles.roleButton} ${role === 'club-leader' ? styles.roleButtonActive : ''}`}
        >
          Club Leader
        </button>
        <button
          type="button"
          onClick={() => onRoleChange('super-admin')}
          className={`${styles.roleButton} ${role === 'super-admin' ? styles.roleButtonActive : ''}`}
        >
          Super Admin
        </button>
      </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {error && (
          <div style={{
            padding: '12px',
            marginBottom: '16px',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '8px',
            color: '#c33',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}
        
        <div className={styles.fieldGroup}>
          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className={styles.input}
            placeholder={isSuperAdmin ? 'admin@clubatlas.edu' : 'leader@email.edu'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <p className={styles.hint}>
            {isSuperAdmin ? 'Use your admin credentials' : 'Use your club leader credentials'}
          </p>
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            className={styles.input}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setIsForgotPasswordOpen(true)}
            className={styles.forgotLink}
            disabled={loading}
          >
            Forgot password?
          </button>
        </div>

        <button type="submit" className={styles.submitButton} disabled={loading}>
          <img 
            src="/images/icons/student-login/arrow.svg"
            alt="arrow"
            className={styles.arrowIcon}
          />
          <span>
            {loading 
              ? 'Signing in...' 
              : isSuperAdmin ? 'Sign In as Super Admin' : 'Sign In to Dashboard'
            }
          </span>
        </button>
      </form>

      <div className={styles.divider}></div>

      {!isSuperAdmin && (
        <div className={styles.footer}>
          <p className={styles.footerText}>Not a club leader yet?</p>
          <Link href="/admin/request-access" className={styles.requestLink}>
            Request Leader Access →
          </Link>
        </div>
      )}

      <Link href="/welcome" className={styles.backLink}>
        ← Back to Home
      </Link>

      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </div>
  );
}


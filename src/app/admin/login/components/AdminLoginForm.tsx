'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './AdminLoginForm.module.css';
import ForgotPasswordModal from '../../../student/login/components/ForgotPasswordModal';

type AdminRole = 'club-leader' | 'super-admin';

interface AdminLoginFormProps {
  role: AdminRole;
  onRoleChange: (role: AdminRole) => void;
}

export default function AdminLoginForm({ role, onRoleChange }: AdminLoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 로그인 API 호출 구현
    console.log('Admin Login:', { email, password, role });
    
    // 임시: 로그인 성공 시 대시보드로 리다이렉트
    // 실제 구현 시에는 API 응답을 확인한 후 리다이렉트
    if (role === 'super-admin') {
      router.push('/superadmin/dashboard');
    } else {
      router.push('/admin/dashboard');
    }
  };

  const isSuperAdmin = role === 'super-admin';

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>
          {isSuperAdmin ? 'Sign in as Super Admin' : 'Sign in to access your club dashboard'}
        </p>
      </div>

      {/* 역할 선택 버튼 */}
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

      <form onSubmit={handleSubmit} className={styles.form}>
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
          />
          <button
            type="button"
            onClick={() => setIsForgotPasswordOpen(true)}
            className={styles.forgotLink}
          >
            Forgot password?
          </button>
        </div>

        <button type="submit" className={styles.submitButton}>
          <img 
            src={isSuperAdmin 
              ? "https://www.figma.com/api/mcp/asset/70c0d910-6213-43a6-aa12-de12917c791a"
              : "https://www.figma.com/api/mcp/asset/195395cb-8a0d-4574-ad3c-2ee36c981243"
            } 
            alt="arrow"
            className={styles.arrowIcon}
          />
          <span>{isSuperAdmin ? 'Sign In as Super Admin' : 'Sign In to Dashboard'}</span>
        </button>
      </form>

      <div className={styles.divider}></div>

      <div className={styles.footer}>
        <p className={styles.footerText}>Not a club leader yet?</p>
        <Link href="/admin/request-access" className={styles.requestLink}>
          Request Leader Access →
        </Link>
      </div>

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


'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './LoginForm.module.css';
import ForgotPasswordModal from './ForgotPasswordModal';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실제 Firebase 인증 로직 구현
    console.log('Login:', { email, password });
    
    // 임시: 로그인 성공 시 홈으로 리다이렉트
    router.push('/student/home');
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>Sign in to explore clubs and events</p>
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
            placeholder="student@email.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p className={styles.hint}>Use your student credentials</p>
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
            src="https://www.figma.com/api/mcp/asset/88488418-f09a-4267-bc48-4dbe2d6fe827" 
            alt="arrow"
            className={styles.arrowIcon}
          />
          <span>Sign In as Student</span>
        </button>
      </form>

      <div className={styles.divider}></div>

      <div className={styles.footer}>
        <p className={styles.footerText}>Don&apos;t have an account?</p>
        <Link href="/student/signup" className={styles.signupLink}>
          Create Student Account →
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


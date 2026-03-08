'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './SignupForm.module.css';
import { signIn } from '@/lib/firebase/auth';
import { signupStudent } from '@/lib/api/auth';

const userPlusIcon = "/images/icons/signup/user-plus.svg";
const arrowLeftIcon = "/images/icons/signup/arrow-left.svg";

export default function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return '비밀번호는 최소 8자 이상이어야 합니다.';
    }
    if (!/[a-z]/.test(password)) {
      return '비밀번호에 소문자가 최소 1개 포함되어야 합니다.';
    }
    if (!/[A-Z]/.test(password)) {
      return '비밀번호에 대문자가 최소 1개 포함되어야 합니다.';
    }
    if (!/\d/.test(password)) {
      return '비밀번호에 숫자가 최소 1개 포함되어야 합니다.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // 유효성 검사
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    
    if (!formData.agreeToTerms) {
      setError('약관에 동의해주세요.');
      return;
    }
    
    setLoading(true);
    
    try {
      // 백엔드 API로 회원가입 (Firebase 계정 생성 + Firestore 프로필 생성)
      const displayName = `${formData.firstName} ${formData.lastName}`.trim();
      
      const response = await signupStudent({
        email: formData.email,
        password: formData.password,
        display_name: displayName,
        student_id: formData.studentId || undefined,
      });
      
      if (response.error) {
        setError(response.error);
        setLoading(false);
        return;
      }
      
      // 회원가입 성공 - Firebase 로그인
      await signIn(formData.email, formData.password);
      
      // 학생 홈으로 리다이렉트
      router.push('/student/home');
    } catch (err: any) {
      console.error('Signup error:', err);
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>Create Account</h2>
        <p className={styles.subtitle}>Fill in your details to get started</p>
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
        
        {/* First Name & Last Name */}
        <div className={styles.nameFields}>
          <div className={styles.fieldGroup}>
            <label htmlFor="firstName" className={styles.label}>
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className={styles.input}
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="lastName" className={styles.label}>
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className={styles.input}
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className={styles.fieldGroup}>
          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={styles.input}
            placeholder="student@email.edu"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <p className={styles.hint}>Use your .edu email address</p>
        </div>

        {/* Student ID */}
        <div className={styles.fieldGroup}>
          <label htmlFor="studentId" className={styles.label}>
            Student ID
          </label>
          <input
            id="studentId"
            name="studentId"
            type="text"
            className={styles.input}
            placeholder="ca*********"
            value={formData.studentId}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className={styles.fieldGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={styles.input}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <p className={styles.hint}>
            At least 8 characters with uppercase, lowercase, and numbers
          </p>
        </div>

        {/* Confirm Password */}
        <div className={styles.fieldGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className={styles.input}
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/* Terms Checkbox */}
        <div className={styles.termsBox}>
          <input
            id="agreeToTerms"
            name="agreeToTerms"
            type="checkbox"
            className={styles.checkbox}
            checked={formData.agreeToTerms}
            onChange={handleChange}
            required
          />
          <label htmlFor="agreeToTerms" className={styles.termsLabel}>
            I agree to the ClubAtlas Terms of Service and Privacy Policy. I understand that my information will be used to create my account and improve my experience on the platform.
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton} disabled={loading}>
          <img src={userPlusIcon} alt="" className={styles.userIcon} />
          <span>{loading ? 'Creating Account...' : 'Create Student Account'}</span>
        </button>
      </form>

      <div className={styles.divider}></div>

      <div className={styles.footer}>
        <p className={styles.footerText}>Already have an account?</p>
        <Link href="/student/login" className={styles.signinLink}>
          Sign in instead →
        </Link>
      </div>

      <Link href="/welcome" className={styles.backLink}>
        <img src={arrowLeftIcon} alt="" className={styles.backIcon} />
        <span>Back to Home</span>
      </Link>
    </div>
  );
}












'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './SignupForm.module.css';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    department: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 회원가입 로직 구현
    console.log('Signup:', formData);
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>Create Account</h2>
        <p className={styles.subtitle}>Fill in your details to get started</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
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
            placeholder="STU123456"
            value={formData.studentId}
            onChange={handleChange}
            required
          />
        </div>

        {/* Department / Major */}
        <div className={styles.fieldGroup}>
          <label htmlFor="department" className={styles.label}>
            Department / Major
          </label>
          <input
            id="department"
            name="department"
            type="text"
            className={styles.input}
            placeholder="Computer Science"
            value={formData.department}
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
        <button type="submit" className={styles.submitButton}>
          <img 
            src="https://www.figma.com/api/mcp/asset/8ce620cf-a55a-4363-898d-8661cdb6c01d" 
            alt="user"
            className={styles.userIcon}
          />
          <span>Create Student Account</span>
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
        <img 
          src="https://www.figma.com/api/mcp/asset/422e1e8f-2a3a-46e9-808b-1c238a5d2c25" 
          alt="arrow"
          className={styles.backIcon}
        />
        <span>Back to Home</span>
      </Link>
    </div>
  );
}


'use client';

import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import styles from './ForgotPasswordModal.module.css';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      
      setSuccessMessage('Password reset email sent! Please check your inbox.');
      setEmail('');
      
      setTimeout(() => {
        onClose();
        setSuccessMessage('');
      }, 3000);
    } catch (error: any) {
      console.error('Password reset error:', error);
      
      let errorMsg = 'Failed to send password reset email. Please try again.';
      
      if (error.code === 'auth/user-not-found') {
        errorMsg = 'No account found with this email address.';
      } else if (error.code === 'auth/invalid-email') {
        errorMsg = 'Invalid email address format.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMsg = 'Too many requests. Please try again later.';
      }
      
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.content}>
          {/* 헤더 */}
          <div className={styles.header}>
            <div className={styles.headerText}>
              <h3 className={styles.title}>Forgot Password?</h3>
              <p className={styles.subtitle}>Request password reset assistance</p>
            </div>
            <button onClick={onClose} className={styles.closeButton} aria-label="Close">
              <img 
                src="https://www.figma.com/api/mcp/asset/fc73c43c-7d67-4dfc-a324-5dedac44674a" 
                alt="close"
                className={styles.closeIcon}
              />
            </button>
          </div>

          {/* 정보 박스 */}
          <div className={styles.infoBox}>
            <img 
              src="https://www.figma.com/api/mcp/asset/e01b2eca-144d-42ad-a28b-bd296676aab0" 
              alt="info"
              className={styles.infoIcon}
            />
            <div className={styles.infoContent}>
              <p className={styles.infoText}>
                Password reset requests are handled by our admin team for security purposes.
              </p>
              <p className={styles.infoSubtext}>
                Student accounts will be verified through your .edu email address.
              </p>
            </div>
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className={styles.form}>
            {successMessage && (
              <div style={{ 
                padding: '12px', 
                background: '#d1fae5', 
                border: '1px solid #10b981',
                borderRadius: '8px', 
                color: '#065f46',
                marginBottom: '16px',
                fontSize: '14px'
              }}>
                {successMessage}
              </div>
            )}
            
            {errorMessage && (
              <div style={{ 
                padding: '12px', 
                background: '#fee2e2', 
                border: '1px solid #ef4444',
                borderRadius: '8px', 
                color: '#991b1b',
                marginBottom: '16px',
                fontSize: '14px'
              }}>
                {errorMessage}
              </div>
            )}

            <div className={styles.fieldGroup}>
              <label htmlFor="reset-email" className={styles.label}>
                Email Address
              </label>
              <input
                id="reset-email"
                type="email"
                className={styles.input}
                placeholder="student@email.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
              <p className={styles.hint}>
                Enter the email address associated with your account
              </p>
            </div>

            {/* What happens next 섹션 */}
            <div className={styles.nextSteps}>
              <p className={styles.nextStepsTitle}>What happens next?</p>
              <ul className={styles.stepsList}>
                <li className={styles.stepItem}>
                  <img 
                    src="https://www.figma.com/api/mcp/asset/a5cbe0f3-7463-4dbd-b96f-ec55613aef59" 
                    alt="check"
                    className={styles.checkIcon}
                  />
                  <span>Your request will be sent to the admin team</span>
                </li>
                <li className={styles.stepItem}>
                  <img 
                    src="https://www.figma.com/api/mcp/asset/a5cbe0f3-7463-4dbd-b96f-ec55613aef59" 
                    alt="check"
                    className={styles.checkIcon}
                  />
                  <span>Admin will verify your identity and account details</span>
                </li>
                <li className={styles.stepItem}>
                  <img 
                    src="https://www.figma.com/api/mcp/asset/a5cbe0f3-7463-4dbd-b96f-ec55613aef59" 
                    alt="check"
                    className={styles.checkIcon}
                  />
                  <span>You&apos;ll receive further instructions via email within 24-48 hours</span>
                </li>
              </ul>
            </div>

            {/* 버튼 */}
            <div className={styles.buttons}>
              <button 
                type="button" 
                onClick={onClose} 
                className={styles.cancelButton}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isLoading}
              >
                {!isLoading && (
                  <img 
                    src="https://www.figma.com/api/mcp/asset/f6c25768-577e-4c08-9930-eeb13d68c65f" 
                    alt="send"
                    className={styles.sendIcon}
                  />
                )}
                <span>{isLoading ? 'Sending...' : 'Send Request'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}



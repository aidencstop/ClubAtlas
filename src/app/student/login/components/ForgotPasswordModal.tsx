'use client';

import { useState } from 'react';
import styles from './ForgotPasswordModal.module.css';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 비밀번호 재설정 요청 로직 구현
    console.log('Password reset request:', { email });
    // 요청 성공 후 모달 닫기
    onClose();
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
              <button type="button" onClick={onClose} className={styles.cancelButton}>
                Cancel
              </button>
              <button type="submit" className={styles.submitButton}>
                <img 
                  src="https://www.figma.com/api/mcp/asset/f6c25768-577e-4c08-9930-eeb13d68c65f" 
                  alt="send"
                  className={styles.sendIcon}
                />
                <span>Send Request</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}



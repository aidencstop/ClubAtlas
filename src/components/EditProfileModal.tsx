'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getIdToken } from '@/lib/firebase/auth';
import { updateProfile } from '@/lib/api/users';
import styles from './EditProfileModal.module.css';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  onSuccess,
}: EditProfileModalProps) {
  const { userProfile, refreshUserProfile } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen && userProfile) {
      setDisplayName(userProfile.display_name || '');
      setError('');
      setSuccess(false);
    }
  }, [isOpen, userProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!displayName.trim()) {
      setError('Display name is required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess(false);

      const token = await getIdToken();
      if (!token) {
        setError('Authentication required');
        return;
      }

      const response = await updateProfile(
        { display_name: displayName.trim() },
        token
      );

      if (response.error) {
        setError(response.error);
        return;
      }

      setSuccess(true);
      await refreshUserProfile();
      
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Failed to update profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Edit Profile</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.content}>
            <div className={styles.formGroup}>
              <label htmlFor="displayName" className={styles.label}>
                Display Name <span className={styles.required}>*</span>
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className={styles.input}
                placeholder="Enter your display name"
                disabled={loading}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                value={userProfile?.email || ''}
                className={styles.input}
                disabled
              />
              <p className={styles.hint}>Email cannot be changed</p>
            </div>

            {error && (
              <div className={styles.error}>{error}</div>
            )}

            {success && (
              <div className={styles.success}>Profile updated successfully!</div>
            )}
          </div>

          <div className={styles.footer}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={loading || !displayName.trim()}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

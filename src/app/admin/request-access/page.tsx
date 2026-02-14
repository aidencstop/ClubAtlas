'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './RequestAccess.module.css';
import { useAuth } from '@/contexts/AuthContext';
import { requestLeaderAccess, getMyLeaderRequest } from '@/lib/api/auth';
import { getIdToken } from '@/lib/firebase/auth';

export default function RequestAccessPage() {
  const router = useRouter();
  const { user, userProfile, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    requestedClubName: '',
    requestedRole: 'President',
    reason: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [existingRequest, setExistingRequest] = useState<any>(null);
  const [checkingRequest, setCheckingRequest] = useState(true);

  // 기존 요청 확인
  useEffect(() => {
    const checkExistingRequest = async () => {
      if (!user || !userProfile) return;
      
      try {
        const token = await getIdToken();
        if (!token) return;
        
        const response = await getMyLeaderRequest(token);
        if (response.data) {
          setExistingRequest(response.data);
        }
      } catch (err) {
        console.error('Failed to check existing request:', err);
      } finally {
        setCheckingRequest(false);
      }
    };
    
    if (!authLoading) {
      checkExistingRequest();
    }
  }, [user, userProfile, authLoading]);

  // 권한 확인
  useEffect(() => {
    if (authLoading || checkingRequest) return;
    
    if (!user) {
      router.push('/student/login');
      return;
    }
    
    if (userProfile?.role !== 'student') {
      router.push('/admin/dashboard');
      return;
    }
  }, [user, userProfile, authLoading, checkingRequest, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.reason.length < 10) {
      setError('요청 사유는 최소 10자 이상 입력해주세요.');
      return;
    }
    
    setLoading(true);
    
    try {
      const token = await getIdToken();
      if (!token) {
        setError('로그인이 필요합니다.');
        setLoading(false);
        return;
      }
      
      const response = await requestLeaderAccess({
        requested_club_name: formData.requestedClubName,
        requested_role: formData.requestedRole,
        reason: formData.reason,
      }, token);
      
      if (response.error) {
        setError(response.error);
        setLoading(false);
        return;
      }
      
      setSuccess(true);
      setExistingRequest(response.data);
    } catch (err: any) {
      console.error('Request error:', err);
      setError('요청에 실패했습니다. 다시 시도해주세요.');
      setLoading(false);
    }
  };

  if (authLoading || checkingRequest) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  // 이미 요청이 있는 경우
  if (existingRequest && existingRequest.status === 'pending') {
    return (
      <div className={styles.container}>
        <div className={styles.panel}>
          <div className={styles.header}>
            <h2 className={styles.title}>Leader Access Request</h2>
            <p className={styles.subtitle}>Your request is pending approval</p>
          </div>

          <div className={styles.requestInfo}>
            <div className={styles.infoRow}>
              <span className={styles.label}>Requested Club:</span>
              <span className={styles.value}>{existingRequest.requested_club_name || 'N/A'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Requested Role:</span>
              <span className={styles.value}>{existingRequest.requested_role}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Status:</span>
              <span className={`${styles.badge} ${styles.pending}`}>Pending</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.label}>Requested At:</span>
              <span className={styles.value}>
                {new Date(existingRequest.requested_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          <p className={styles.message}>
            Your leader access request is currently under review by a Super Admin.
            You will receive an email notification once your request is processed.
          </p>

          <Link href="/student/home" className={styles.backButton}>
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // 승인된 경우
  if (existingRequest && existingRequest.status === 'approved') {
    return (
      <div className={styles.container}>
        <div className={styles.panel}>
          <div className={styles.header}>
            <h2 className={styles.title}>Request Approved!</h2>
            <p className={styles.subtitle}>You now have club leader access</p>
          </div>

          <p className={styles.message}>
            Your leader access request has been approved. Please sign out and sign back in
            to access the club leader dashboard.
          </p>

          <Link href="/admin/login" className={styles.backButton}>
            Go to Admin Login →
          </Link>
        </div>
      </div>
    );
  }

  // 요청 성공
  if (success) {
    return (
      <div className={styles.container}>
        <div className={styles.panel}>
          <div className={styles.header}>
            <h2 className={styles.title}>Request Submitted!</h2>
            <p className={styles.subtitle}>Your request has been sent successfully</p>
          </div>

          <p className={styles.message}>
            Your leader access request has been submitted and is awaiting approval from a Super Admin.
            You will receive an email notification once your request is processed.
          </p>

          <Link href="/student/home" className={styles.backButton}>
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // 요청 폼
  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 className={styles.title}>Request Leader Access</h2>
          <p className={styles.subtitle}>Apply to become a club leader</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && (
            <div className={styles.errorBox}>
              {error}
            </div>
          )}

          <div className={styles.fieldGroup}>
            <label htmlFor="requestedClubName" className={styles.label}>
              Club Name
            </label>
            <input
              id="requestedClubName"
              name="requestedClubName"
              type="text"
              className={styles.input}
              placeholder="Enter the club name you want to lead"
              value={formData.requestedClubName}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <p className={styles.hint}>
              Enter the name of an existing club or a new club you want to create
            </p>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="requestedRole" className={styles.label}>
              Requested Role
            </label>
            <select
              id="requestedRole"
              name="requestedRole"
              className={styles.input}
              value={formData.requestedRole}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="President">President</option>
              <option value="Vice President">Vice President</option>
              <option value="Secretary">Secretary</option>
              <option value="Treasurer">Treasurer</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="reason" className={styles.label}>
              Reason for Request
            </label>
            <textarea
              id="reason"
              name="reason"
              className={styles.textarea}
              placeholder="Explain why you want to become a club leader (minimum 10 characters)"
              value={formData.reason}
              onChange={handleChange}
              required
              disabled={loading}
              rows={5}
            />
            <p className={styles.hint}>
              Minimum 10 characters. Be specific about your qualifications and plans.
            </p>
          </div>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>

        <div className={styles.divider}></div>

        <Link href="/admin/login" className={styles.backLink}>
          ← Back to Admin Login
        </Link>
      </div>
    </div>
  );
}



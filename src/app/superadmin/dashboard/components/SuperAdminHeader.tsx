'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { logout } from '@/lib/firebase/auth';
import EditProfileModal from '@/components/EditProfileModal';
import styles from './SuperAdminHeader.module.css';

const imgIcon = "https://www.figma.com/api/mcp/asset/7d34d2eb-6c06-4f33-bc67-4b83bc35f065";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/157f71e3-0626-46a4-b57f-503e9080fd39";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/1170304d-7665-44bb-811d-db4ebefff5e1";

export default function SuperAdminHeader() {
  const router = useRouter();
  const { userProfile } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.logoContainer}>
          <img src={imgIcon} alt="ClubAtlas" className={styles.logoIcon} />
        </div>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>ClubAtlas Super Admin</h1>
          <p className={styles.subtitle}>System Administrator</p>
        </div>
      </div>
      
      <div className={styles.rightSection}>
        <button className={styles.iconButton} onClick={() => setShowEditModal(true)} title="Settings">
          <img src={imgIcon1} alt="Settings" className={styles.icon} />
        </button>
        <button className={styles.textButton}>View Public Site</button>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>
            {userProfile?.display_name?.substring(0, 2).toUpperCase() || 'SA'}
          </div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{userProfile?.display_name || 'System Admin'}</p>
            <p className={styles.userEmail}>{userProfile?.email || 'admin@clubatlas.edu'}</p>
          </div>
        </div>
        <button className={styles.iconButton} onClick={handleLogout} title="Logout">
          <img src={imgIcon2} alt="Logout" className={styles.icon} />
        </button>
      </div>

      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
      />
    </div>
  );
}










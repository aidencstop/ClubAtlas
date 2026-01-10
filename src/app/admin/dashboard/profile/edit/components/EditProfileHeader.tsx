'use client';

import { useRouter } from 'next/navigation';
import styles from './EditProfileHeader.module.css';

const imgIconBack = "https://www.figma.com/api/mcp/asset/a6d9f18f-c910-4ec3-bd21-7d7b81842971";
const imgIconSave = "https://www.figma.com/api/mcp/asset/861682e6-2dca-449a-b130-1bcedd7e2066";

export default function EditProfileHeader() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/admin/dashboard/profile');
  };

  const handleViewPublicSite = () => {
    console.log('View public site');
  };

  const handleEditMode = () => {
    router.push('/admin/dashboard/profile/edit/active');
  };

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <button className={styles.backButton} onClick={handleBack}>
            <img src={imgIconBack} alt="" className={styles.backIcon} />
          </button>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>Club Profile Preview</h1>
            <p className={styles.subtitle}>Manage your club information</p>
          </div>
        </div>
        <div className={styles.rightSection}>
          <button className={styles.viewButton} onClick={handleViewPublicSite}>
            View Public Site
          </button>
          <button className={styles.saveButton} onClick={handleEditMode}>
            <img src={imgIconSave} alt="" className={styles.saveIcon} />
            Edit Mode
          </button>
        </div>
      </div>
    </div>
  );
}


'use client';

import styles from './SystemMaintenance.module.css';

const imgIconDownload = "https://www.figma.com/api/mcp/asset/623de70c-5c70-4512-a74a-1afacf31978f";

export default function SystemMaintenance() {
  const handleBackup = () => {
    console.log('Starting database backup...');
    // TODO: 실제 백업 API 호출
  };

  const handleClearCache = () => {
    console.log('Clearing cache...');
    // TODO: 실제 캐시 클리어 API 호출
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>System Maintenance</h3>
      <div className={styles.list}>
        <button className={styles.maintenanceItem} onClick={handleBackup}>
          <div className={styles.info}>
            <div className={styles.itemTitle}>Database Backup</div>
            <div className={styles.itemDescription}>Last backup: 2 hours ago</div>
          </div>
          <img src={imgIconDownload} alt="Download" className={styles.icon} />
        </button>
        
        <button className={styles.maintenanceItem} onClick={handleClearCache}>
          <div className={styles.info}>
            <div className={styles.itemTitle}>Clear Cache</div>
            <div className={styles.itemDescription}>Optimize system performance</div>
          </div>
        </button>
      </div>
    </div>
  );
}


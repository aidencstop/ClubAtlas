'use client';

import styles from './SystemInformation.module.css';

interface InfoItem {
  label: string;
  value: string;
}

const systemInfo: InfoItem[] = [
  { label: 'Version', value: 'ClubAtlas v1.0.0' },
  { label: 'Uptime', value: '45 days, 12 hours' },
  { label: 'Database Size', value: '2.4 GB' },
  { label: 'Storage Used', value: '8.7 GB / 50 GB' }
];

export default function SystemInformation() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>System Information</h3>
      <div className={styles.grid}>
        {systemInfo.map((info, index) => (
          <div key={index} className={styles.infoItem}>
            <div className={styles.label}>{info.label}</div>
            <div className={styles.value}>{info.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


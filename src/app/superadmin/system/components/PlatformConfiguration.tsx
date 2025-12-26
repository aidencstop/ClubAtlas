'use client';

import { useState } from 'react';
import styles from './PlatformConfiguration.module.css';

interface ConfigItem {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export default function PlatformConfiguration() {
  const [configs, setConfigs] = useState<ConfigItem[]>([
    {
      id: 'new-club-approvals',
      title: 'New Club Approvals',
      description: 'Require admin approval for new clubs',
      enabled: true
    },
    {
      id: 'email-notifications',
      title: 'Email Notifications',
      description: 'System email notifications',
      enabled: true
    },
    {
      id: 'public-registration',
      title: 'Public Registration',
      description: 'Allow public user registration',
      enabled: true
    }
  ]);

  const toggleConfig = (id: string) => {
    setConfigs(prevConfigs =>
      prevConfigs.map(config =>
        config.id === id ? { ...config, enabled: !config.enabled } : config
      )
    );
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Platform Configuration</h3>
      <div className={styles.list}>
        {configs.map((config) => (
          <div key={config.id} className={styles.item}>
            <div className={styles.info}>
              <div className={styles.itemTitle}>{config.title}</div>
              <div className={styles.itemDescription}>{config.description}</div>
            </div>
            <button
              className={`${styles.statusButton} ${config.enabled ? styles.enabled : styles.disabled}`}
              onClick={() => toggleConfig(config.id)}
            >
              {config.enabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


import styles from './SystemAlerts.module.css';

interface AlertItem {
  message: string;
  timestamp: string;
  type: 'success' | 'warning';
}

const alertItems: AlertItem[] = [
  {
    message: 'System backup completed',
    timestamp: '30 mins ago',
    type: 'success'
  },
  {
    message: 'Database optimized',
    timestamp: '2 hours ago',
    type: 'warning'
  },
  {
    message: 'Weekly report generated',
    timestamp: '1 day ago',
    type: 'success'
  }
];

export default function SystemAlerts() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>System Alerts</h3>
      <div className={styles.list}>
        {alertItems.map((item, index) => (
          <div key={index} className={`${styles.alert} ${styles[item.type]}`}>
            <p className={styles.message}>{item.message}</p>
            <p className={styles.timestamp}>{item.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


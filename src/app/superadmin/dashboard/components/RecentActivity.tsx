import styles from './RecentActivity.module.css';

interface ActivityItem {
  title: string;
  subtitle: string;
  timestamp: string;
  isNew?: boolean;
}

const activityItems: ActivityItem[] = [
  {
    title: 'New club created',
    subtitle: 'Sustainability Initiative',
    timestamp: '1 hour ago',
    isNew: true
  },
  {
    title: 'Event posted',
    subtitle: 'Robotics Club Workshop',
    timestamp: '3 hours ago'
  },
  {
    title: 'Profile updated',
    subtitle: 'Drama Society',
    timestamp: '5 hours ago'
  }
];

export default function RecentActivity() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Recent Club Activity</h3>
      <div className={styles.list}>
        {activityItems.map((item, index) => (
          <div key={index} className={styles.item}>
            <div className={`${styles.dot} ${item.isNew ? styles.dotGreen : ''}`}></div>
            <div className={styles.content}>
              <h4 className={styles.itemTitle}>{item.title}</h4>
              <p className={styles.itemSubtitle}>{item.subtitle}</p>
              <p className={styles.itemTimestamp}>{item.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


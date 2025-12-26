import styles from './RecentActivity.module.css';

interface Activity {
  title: string;
  description: string;
  time: string;
  isNew?: boolean;
}

const activities: Activity[] = [
  {
    title: 'New subscriber',
    description: 'john.doe@email.edu subscribed',
    time: '2 hours ago',
    isNew: true,
  },
  {
    title: 'Event created',
    description: 'Weekly Meeting - Nov 27',
    time: '1 day ago',
  },
  {
    title: 'Announcement posted',
    description: 'Competition Registration Open',
    time: '2 days ago',
  },
];

export default function RecentActivity() {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Recent Activity</h3>
      <div className={styles.activities}>
        {activities.map((activity, index) => (
          <div key={index} className={styles.activityItem}>
            <div
              className={`${styles.activityDot} ${activity.isNew ? styles.activityDotNew : ''}`}
            />
            <div className={styles.activityContent}>
              <p className={styles.activityTitle}>{activity.title}</p>
              <p className={styles.activityDescription}>{activity.description}</p>
              <p className={styles.activityTime}>{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



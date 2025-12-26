import styles from './ClubStats.module.css';

export default function ClubStats() {
  return (
    <div className={styles.container}>
      <div className={styles.statCard}>
        <div className={styles.value}>42</div>
        <div className={styles.label}>Active Clubs</div>
      </div>
      
      <div className={styles.statCard}>
        <div className={styles.value}>5</div>
        <div className={styles.label}>Pending Approval</div>
      </div>
      
      <div className={styles.statCard}>
        <div className={styles.value}>2,345</div>
        <div className={styles.label}>Total Subscribers</div>
      </div>
    </div>
  );
}


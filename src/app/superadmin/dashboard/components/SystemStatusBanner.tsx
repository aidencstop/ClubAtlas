import styles from './SystemStatusBanner.module.css';

const imgIcon = "https://www.figma.com/api/mcp/asset/c793bc7a-ce2b-4772-9adb-9a109ac41079";

export default function SystemStatusBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.iconContainer}>
        <img src={imgIcon} alt="System Status" className={styles.icon} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>System Status: All Systems Operational</h3>
        <p className={styles.subtitle}>Last checked: 2 minutes ago • Uptime: 99.9%</p>
      </div>
    </div>
  );
}


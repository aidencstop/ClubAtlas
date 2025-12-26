import styles from './DashboardHeader.module.css';

const imgIcon = "https://www.figma.com/api/mcp/asset/14f424ba-4031-4ab3-b5b4-aca6a8ce9f8f";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/93033ad4-3a1b-4cd2-adbc-b07121312a18";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/ff119992-fa28-430d-a710-ca69f5869f0e";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/69efd3bc-05bc-4763-84b5-07e6dec64d1f";

export default function DashboardHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <img src={imgIcon} alt="ClubAtlas" className={styles.logoIcon} />
          </div>
        </div>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Leader Dashboard</h1>
          <p className={styles.subtitle}>Robotics Club</p>
        </div>
      </div>
      
      <div className={styles.rightSection}>
        <button className={styles.iconButton}>
          <img src={imgIcon1} alt="Notifications" className={styles.icon} />
          <span className={styles.notificationDot}></span>
        </button>
        <button className={styles.textButton}>View Public Site</button>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>SJ</div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>Sarah Johnson</p>
            <p className={styles.userRole}>President</p>
          </div>
        </div>
        <button className={styles.iconButton}>
          <img src={imgIcon2} alt="Settings" className={styles.icon} />
        </button>
        <button className={styles.iconButton}>
          <img src={imgIcon3} alt="Menu" className={styles.icon} />
        </button>
      </div>
    </div>
  );
}



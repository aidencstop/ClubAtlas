import styles from './SuperAdminHeader.module.css';

const imgIcon = "https://www.figma.com/api/mcp/asset/7d34d2eb-6c06-4f33-bc67-4b83bc35f065";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/157f71e3-0626-46a4-b57f-503e9080fd39";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/1170304d-7665-44bb-811d-db4ebefff5e1";

export default function SuperAdminHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.logoContainer}>
          <img src={imgIcon} alt="ClubAtlas" className={styles.logoIcon} />
        </div>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>ClubAtlas Super Admin</h1>
          <p className={styles.subtitle}>System Administrator</p>
        </div>
      </div>
      
      <div className={styles.rightSection}>
        <button className={styles.iconButton}>
          <img src={imgIcon1} alt="Settings" className={styles.icon} />
        </button>
        <button className={styles.textButton}>View Public Site</button>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>SA</div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>System Admin</p>
            <p className={styles.userEmail}>admin@clubatlas.edu</p>
          </div>
        </div>
        <button className={styles.iconButton}>
          <img src={imgIcon2} alt="Logout" className={styles.icon} />
        </button>
      </div>
    </div>
  );
}


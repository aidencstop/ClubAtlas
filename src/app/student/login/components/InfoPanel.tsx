import styles from './InfoPanel.module.css';

export default function InfoPanel() {
  return (
    <div className={styles.panel}>
      {/* 배경 장식 원형 */}
      <div className={styles.decorativeCircle1}></div>
      <div className={styles.decorativeCircle2}></div>
      
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <img 
            src="https://www.figma.com/api/mcp/asset/5009fc8a-5048-4d84-93c3-2f8de567f00c" 
            alt="Student Portal"
            className={styles.icon}
          />
        </div>
        <h2 className={styles.title}>ClubAtlas</h2>
        <p className={styles.subtitle}>Student Portal</p>
        <p className={styles.description}>
          Discover clubs, explore events, get personalized recommendations, and connect with your campus community.
        </p>
        
        <ul className={styles.featuresList}>
          <li className={styles.featureItem}>
            <span className={styles.bullet}></span>
            <span>Browse and discover clubs</span>
          </li>
          <li className={styles.featureItem}>
            <span className={styles.bullet}></span>
            <span>Get AI-powered recommendations</span>
          </li>
          <li className={styles.featureItem}>
            <span className={styles.bullet}></span>
            <span>Subscribe to club updates</span>
          </li>
          <li className={styles.featureItem}>
            <span className={styles.bullet}></span>
            <span>Track events in your calendar</span>
          </li>
        </ul>
      </div>
    </div>
  );
}




import styles from './SignupInfoPanel.module.css';

export default function SignupInfoPanel() {
  return (
    <div className={styles.panel}>
      {/* 배경 장식 원형 */}
      <div className={styles.decorativeCircle1}></div>
      <div className={styles.decorativeCircle2}></div>
      
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <img 
            src="https://www.figma.com/api/mcp/asset/6967ac22-51f4-4792-9155-1e7b4296f9dc" 
            alt="Join as Student"
            className={styles.icon}
          />
        </div>
        <h2 className={styles.title}>ClubAtlas</h2>
        <p className={styles.subtitle}>Join as Student</p>
        <p className={styles.description}>
          Create your student account to discover clubs, get personalized recommendations, and connect with your campus community.
        </p>
        
        <ul className={styles.featuresList}>
          <li className={styles.featureItem}>
            <img 
              src="https://www.figma.com/api/mcp/asset/95031674-f097-4804-ad38-ba6fe5cc0560" 
              alt="check"
              className={styles.checkIcon}
            />
            <div className={styles.featureContent}>
              <p className={styles.featureTitle}>Discover Clubs</p>
              <p className={styles.featureDescription}>
                Browse and explore all campus clubs with smart filters
              </p>
            </div>
          </li>
          <li className={styles.featureItem}>
            <img 
              src="https://www.figma.com/api/mcp/asset/95031674-f097-4804-ad38-ba6fe5cc0560" 
              alt="check"
              className={styles.checkIcon}
            />
            <div className={styles.featureContent}>
              <p className={styles.featureTitle}>AI Recommendations</p>
              <p className={styles.featureDescription}>
                Get personalized club suggestions based on your interests
              </p>
            </div>
          </li>
          <li className={styles.featureItem}>
            <img 
              src="https://www.figma.com/api/mcp/asset/95031674-f097-4804-ad38-ba6fe5cc0560" 
              alt="check"
              className={styles.checkIcon}
            />
            <div className={styles.featureContent}>
              <p className={styles.featureTitle}>Track Events</p>
              <p className={styles.featureDescription}>
                Subscribe to clubs and track their events in your calendar
              </p>
            </div>
          </li>
          <li className={styles.featureItem}>
            <img 
              src="https://www.figma.com/api/mcp/asset/95031674-f097-4804-ad38-ba6fe5cc0560" 
              alt="check"
              className={styles.checkIcon}
            />
            <div className={styles.featureContent}>
              <p className={styles.featureTitle}>Stay Connected</p>
              <p className={styles.featureDescription}>
                Receive updates from your favorite clubs
              </p>
            </div>
          </li>
        </ul>

        <div className={styles.joinBox}>
          <p className={styles.joinText}>
            ✨ Join thousands of students already using ClubAtlas
          </p>
        </div>
      </div>
    </div>
  );
}




'use client';

import styles from './ClubProfileSection.module.css';

const imgIcon = "https://www.figma.com/api/mcp/asset/924b1ed6-ce7e-41d3-a882-68365bf1ac6a";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/96fb4881-c289-4078-937a-ef900ee63ffd";

export default function ClubProfileSection() {
  return (
    <div className={styles.profileSection}>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Club Profile Management</h2>
        <button className={styles.editButton}>
          <img src={imgIcon} alt="" className={styles.buttonIcon} />
          <span className={styles.buttonText}>Edit Profile</span>
        </button>
      </div>

      <div className={styles.profileCard}>
        <h3 className={styles.cardTitle}>Current Profile Preview</h3>

        <div className={styles.imagesSection}>
          <div className={styles.logoSection}>
            <p className={styles.label}>Club Logo</p>
            <div className={styles.logoContainer}>
              <img src={imgIcon1} alt="Club Logo" className={styles.logoIcon} />
            </div>
          </div>

          <div className={styles.coverSection}>
            <p className={styles.label}>Cover Image</p>
            <div className={styles.coverContainer}></div>
          </div>
        </div>

        <div className={styles.fieldsSection}>
          <div className={styles.fieldGroup}>
            <p className={styles.label}>Club Name</p>
            <div className={styles.fieldValue}>
              <p className={styles.fieldText}>Robotics Club</p>
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <p className={styles.label}>Tagline</p>
            <div className={styles.fieldValue}>
              <p className={styles.fieldText}>Building the future, one robot at a time</p>
            </div>
          </div>

          <div className={styles.fieldGroupLarge}>
            <p className={styles.label}>Mission Statement</p>
            <div className={styles.fieldValueLarge}>
              <p className={styles.fieldText}>The Robotics Club is dedicated to fostering innovation and technical skills among students interested in robotics, engineering, and automation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


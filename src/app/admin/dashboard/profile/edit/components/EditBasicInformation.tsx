'use client';

import { useState } from 'react';
import styles from './EditBasicInformation.module.css';

const imgIconUpload = "https://www.figma.com/api/mcp/asset/3443f4d0-635f-4f31-a5a4-3fcf7af9f9cb";

export default function EditBasicInformation() {
  const [clubName, setClubName] = useState('Robotics Club');
  const [tagline, setTagline] = useState('Building the future, one robot at a time');
  const [primaryCategory] = useState('ACADEMIC');
  const [subCategory] = useState('STEM');
  const [missionStatement, setMissionStatement] = useState(
    'The Robotics Club is dedicated to fostering innovation and technical skills among students interested in robotics, engineering, and automation. We provide hands-on learning experiences and participate in regional and national competitions.'
  );

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Basic Information</h2>

      <div className={styles.imagesRow}>
        <div className={styles.logoColumn}>
          <label className={styles.label}>Club Logo</label>
          <div className={styles.logoUploadArea}>
            <img src={imgIconUpload} alt="" className={styles.uploadIcon} />
          </div>
        </div>

        <div className={styles.coverColumn}>
          <label className={styles.label}>Cover Image</label>
          <div className={styles.coverUploadArea}></div>
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Club Name *</label>
        <input
          type="text"
          value={clubName}
          onChange={(e) => setClubName(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Tagline</label>
        <input
          type="text"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.twoColumnRow}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Primary Category *</label>
          <div className={styles.categoryInput}>
            <span className={styles.categoryBadge} data-category="academic">
              {primaryCategory}
            </span>
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Sub-Category</label>
          <div className={styles.categoryInput}>
            <span className={styles.categoryBadge} data-category="stem">
              {subCategory}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Mission Statement *</label>
        <textarea
          value={missionStatement}
          onChange={(e) => setMissionStatement(e.target.value)}
          className={styles.textarea}
          rows={4}
        />
      </div>
    </div>
  );
}


'use client';

import { useRef } from 'react';
import styles from './EditBasicInformation.module.css';

const imgIconUpload = "https://www.figma.com/api/mcp/asset/3443f4d0-635f-4f31-a5a4-3fcf7af9f9cb";

interface EditBasicInformationProps {
  clubName: string;
  setClubName: (value: string) => void;
  tagline: string;
  setTagline: (value: string) => void;
  missionStatement: string;
  setMissionStatement: (value: string) => void;
  categories: string[];
  setCategories: (value: string[]) => void;
  logoUrl?: string;
  bannerUrl?: string;
  onLogoUpload: (file: File) => void;
  onBannerUpload: (file: File) => void;
}

export default function EditBasicInformation({
  clubName,
  setClubName,
  tagline,
  setTagline,
  missionStatement,
  setMissionStatement,
  categories,
  logoUrl,
  bannerUrl,
  onLogoUpload,
  onBannerUpload
}: EditBasicInformationProps) {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleLogoClick = () => {
    logoInputRef.current?.click();
  };

  const handleBannerClick = () => {
    bannerInputRef.current?.click();
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onLogoUpload(file);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onBannerUpload(file);
    }
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Basic Information</h2>

      <div className={styles.imagesRow}>
        <div className={styles.logoColumn}>
          <label className={styles.label}>Club Logo</label>
          <div className={styles.logoUploadArea} onClick={handleLogoClick}>
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className={styles.uploadedImage} />
            ) : (
              <img src={imgIconUpload} alt="" className={styles.uploadIcon} />
            )}
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        <div className={styles.coverColumn}>
          <label className={styles.label}>Cover Image</label>
          <div className={styles.coverUploadArea} onClick={handleBannerClick}>
            {bannerUrl ? (
              <img src={bannerUrl} alt="Banner" className={styles.uploadedBanner} />
            ) : (
              <div className={styles.emptyBanner}>
                <img src={imgIconUpload} alt="" className={styles.uploadIcon} />
              </div>
            )}
            <input
              ref={bannerInputRef}
              type="file"
              accept="image/*"
              onChange={handleBannerChange}
              style={{ display: 'none' }}
            />
          </div>
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

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Categories *</label>
        <div className={styles.categoryInput}>
          {categories.map((cat, idx) => (
            <span key={idx} className={styles.categoryBadge}>
              {cat}
            </span>
          ))}
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









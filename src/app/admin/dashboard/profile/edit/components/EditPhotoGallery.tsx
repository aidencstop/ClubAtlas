'use client';

import styles from './EditPhotoGallery.module.css';

const imgIconUpload = "https://www.figma.com/api/mcp/asset/a6d9f18f-c910-4ec3-bd21-7d7b81842971";

function PhotoSlot() {
  return (
    <div className={styles.photoSlot}>
      <img src={imgIconUpload} alt="" className={styles.uploadIcon} />
    </div>
  );
}

export default function EditPhotoGallery() {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Photo Gallery</h2>

      <div className={styles.galleryGrid}>
        <PhotoSlot />
        <PhotoSlot />
        <PhotoSlot />
        <PhotoSlot />
        <PhotoSlot />
        <PhotoSlot />
        <PhotoSlot />
        <PhotoSlot />
      </div>
    </div>
  );
}






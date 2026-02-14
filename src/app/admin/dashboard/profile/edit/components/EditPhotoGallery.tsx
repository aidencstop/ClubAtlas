'use client';

import { useRef } from 'react';
import styles from './EditPhotoGallery.module.css';

const imgIconUpload = "https://www.figma.com/api/mcp/asset/a6d9f18f-c910-4ec3-bd21-7d7b81842971";
const imgIconDelete = "https://www.figma.com/api/mcp/asset/352610b8-1805-4e24-9a5d-cf41eb44d274";

interface PhotoSlotProps {
  imageUrl?: string;
  onUpload?: (file: File) => void;
  onDelete?: () => void;
}

function PhotoSlot({ imageUrl, onUpload, onDelete }: PhotoSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!imageUrl && onUpload) {
      inputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  return (
    <div className={styles.photoSlot} onClick={handleClick}>
      {imageUrl ? (
        <>
          <img src={imageUrl} alt="Gallery" className={styles.galleryImage} />
          {onDelete && (
            <button 
              className={styles.deleteButton}
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <img src={imgIconDelete} alt="Delete" className={styles.deleteIcon} />
            </button>
          )}
        </>
      ) : (
        <>
          <img src={imgIconUpload} alt="" className={styles.uploadIcon} />
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </>
      )}
    </div>
  );
}

interface EditPhotoGalleryProps {
  mediaUrls: string[];
  onMediaUpload: (file: File) => void;
  onMediaDelete: (fileUrl: string) => void;
}

export default function EditPhotoGallery({ mediaUrls, onMediaUpload, onMediaDelete }: EditPhotoGalleryProps) {
  const totalSlots = 8;
  const emptySlots = Math.max(0, totalSlots - mediaUrls.length);

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Photo Gallery</h2>

      <div className={styles.galleryGrid}>
        {mediaUrls.map((url, idx) => (
          <PhotoSlot 
            key={idx} 
            imageUrl={url} 
            onDelete={() => onMediaDelete(url)}
          />
        ))}
        {Array.from({ length: emptySlots }).map((_, idx) => (
          <PhotoSlot 
            key={`empty-${idx}`} 
            onUpload={onMediaUpload}
          />
        ))}
      </div>
    </div>
  );
}









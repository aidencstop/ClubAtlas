'use client';

import styles from './AnnouncementCard.module.css';

const imgIconMail = "https://www.figma.com/api/mcp/asset/7987a3a9-f240-4241-bffe-62f9f8ef3b60";
const imgIconEye = "https://www.figma.com/api/mcp/asset/df07d638-997c-464c-a846-58d2d7dec9db";
const imgIconEdit = "https://www.figma.com/api/mcp/asset/917950bc-6bc8-434c-95c2-0e99c1e129b7";
const imgIconDelete = "https://www.figma.com/api/mcp/asset/3de6315f-a275-40c4-a43b-92b7cdc7f05f";

interface Announcement {
  id: string;
  title: string;
  postedDate: string;
  sentTo: number;
  opens: number;
  openRate: number;
}

interface AnnouncementCardProps {
  announcement: Announcement;
}

export default function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const handleEdit = () => {
    console.log('Edit announcement:', announcement.id);
  };

  const handleDelete = () => {
    console.log('Delete announcement:', announcement.id);
  };

  return (
    <div className={styles.announcementCard}>
      <div className={styles.cardContent}>
        <div className={styles.leftSection}>
          <h3 className={styles.announcementTitle}>{announcement.title}</h3>
          
          <p className={styles.postedDate}>Posted {announcement.postedDate}</p>
          
          <div className={styles.statsSection}>
            <div className={styles.statItem}>
              <img src={imgIconMail} alt="" className={styles.statIcon} />
              <span className={styles.statText}>
                Sent to {announcement.sentTo} subscribers
              </span>
            </div>
            <div className={styles.statItem}>
              <img src={imgIconEye} alt="" className={styles.statIcon} />
              <span className={styles.statText}>
                {announcement.opens} opens ({announcement.openRate}%)
              </span>
            </div>
          </div>
        </div>

        <div className={styles.rightSection}>
          <button onClick={handleEdit} className={styles.iconButton}>
            <img src={imgIconEdit} alt="Edit" className={styles.buttonIcon} />
          </button>
          <button onClick={handleDelete} className={styles.iconButton}>
            <img src={imgIconDelete} alt="Delete" className={styles.buttonIcon} />
          </button>
        </div>
      </div>
    </div>
  );
}








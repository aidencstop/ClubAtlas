'use client';

import { useState } from 'react';
import styles from './AnnouncementsSection.module.css';
import AnnouncementCard from './AnnouncementCard';
import CreateAnnouncementModal, { AnnouncementFormData } from './CreateAnnouncementModal';

const imgIconAdd = "https://www.figma.com/api/mcp/asset/9ff62ea6-b3dd-4745-98ee-413e7b8375d7";

interface Announcement {
  id: string;
  title: string;
  postedDate: string;
  sentTo: number;
  opens: number;
  openRate: number;
}

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Competition Registration Now Open',
    postedDate: 'Nov 24, 2024',
    sentTo: 127,
    opens: 342,
    openRate: 269,
  },
  {
    id: '2',
    title: 'Guest Speaker Confirmed for December',
    postedDate: 'Nov 20, 2024',
    sentTo: 127,
    opens: 284,
    openRate: 224,
  },
];

export default function AnnouncementsSection() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateAnnouncement = () => {
    setIsCreateModalOpen(true);
  };

  const handleModalClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleAnnouncementCreate = (announcementData: AnnouncementFormData) => {
    // TODO: Implement actual announcement creation (API call)
    console.log('Creating announcement:', announcementData);
    setIsCreateModalOpen(false);
    // Here you would typically make an API call to create the announcement
    // and update the announcements list
  };

  return (
    <>
      <div className={styles.announcementsSection}>
        <div className={styles.header}>
          <h1 className={styles.title}>Announcements</h1>
          <button onClick={handleCreateAnnouncement} className={styles.createButton}>
            <img src={imgIconAdd} alt="" className={styles.buttonIcon} />
            <span>New Announcement</span>
          </button>
        </div>

        <div className={styles.infoBanner}>
          <p className={styles.infoText}>
            📧 Announcements are automatically sent to all{' '}
            <span className={styles.subscriberCount}>127 subscribers</span>{' '}
            via email and appear on your club profile page.
          </p>
        </div>

        <div className={styles.announcementsGrid}>
          {mockAnnouncements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      </div>

      <CreateAnnouncementModal
        isOpen={isCreateModalOpen}
        onClose={handleModalClose}
        onCreateAnnouncement={handleAnnouncementCreate}
      />
    </>
  );
}


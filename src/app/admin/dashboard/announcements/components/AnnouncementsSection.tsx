'use client';

import { useState, useEffect } from 'react';
import styles from './AnnouncementsSection.module.css';
import AnnouncementCard from './AnnouncementCard';
import CreateAnnouncementModal, { AnnouncementFormData } from './CreateAnnouncementModal';
import { useAuth } from '@/contexts/AuthContext';
import { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement, Announcement as ApiAnnouncement, getClubSubscribers } from '@/lib/api';

const imgIconAdd = "/images/icons/dashboard/icon-plus.svg";

interface Announcement {
  id: string;
  title: string;
  postedDate: string;
  sentTo: number;
  opens: number;
  openRate: number;
  content?: string;
}

export default function AnnouncementsSection() {
  const { userProfile } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriberCount, setSubscriberCount] = useState(0);

  useEffect(() => {
    loadAnnouncements();
  }, [userProfile]);

  const loadAnnouncements = async () => {
    if (!userProfile?.managed_club_ids || userProfile.managed_club_ids.length === 0) {
      setAnnouncements([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const clubId = userProfile.managed_club_ids[0];
      const [response, subscribersRes] = await Promise.all([
        getAnnouncements({ club_id: clubId, limit: 100 }),
        getClubSubscribers(clubId),
      ]);

      if (subscribersRes.data) {
        setSubscriberCount(subscribersRes.data.total);
      }

      if (response.data) {
        const mappedAnnouncements: Announcement[] = response.data.announcements.map((apiAnnouncement: ApiAnnouncement) => {
          const sentTo = apiAnnouncement.sent_to || 0;
          const opens = apiAnnouncement.opens || 0;
          const openRate = sentTo > 0 ? Math.round((opens / sentTo) * 100) : 0;

          return {
            id: apiAnnouncement.id || '',
            title: apiAnnouncement.title,
            postedDate: new Date(apiAnnouncement.created_at || '').toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }),
            sentTo,
            opens,
            openRate,
            content: apiAnnouncement.content,
          };
        });

        setAnnouncements(mappedAnnouncements);
      }
    } catch (err) {
      console.error('Failed to load announcements:', err);
      setError('Failed to load announcements');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAnnouncement = () => {
    setIsCreateModalOpen(true);
  };

  const handleModalClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleAnnouncementCreate = async (announcementData: AnnouncementFormData) => {
    if (!userProfile?.managed_club_ids || userProfile.managed_club_ids.length === 0) {
      alert('No managed clubs found');
      return;
    }

    try {
      const clubId = userProfile.managed_club_ids[0];

      const response = await createAnnouncement({
        club_id: clubId,
        title: announcementData.title,
        content: announcementData.content,
      });

      if (response.data) {
        setIsCreateModalOpen(false);
        await loadAnnouncements();
      } else {
        alert(response.error || 'Failed to create announcement');
      }
    } catch (err) {
      console.error('Failed to create announcement:', err);
      alert('Failed to create announcement');
    }
  };

  const handleDeleteAnnouncement = async (announcementId: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) {
      return;
    }

    try {
      const response = await deleteAnnouncement(announcementId);

      if (response.error) {
        alert(response.error || 'Failed to delete announcement');
      } else {
        await loadAnnouncements();
      }
    } catch (err) {
      console.error('Failed to delete announcement:', err);
      alert('Failed to delete announcement');
    }
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
          <img src="/images/icons/dashboard/icon-info.svg" alt="" className={styles.infoIcon} />
          <p className={styles.infoText}>
            Announcements are automatically sent to all{' '}
            <span className={styles.subscriberCount}>{subscriberCount} subscribers</span>{' '}
            via email and appear on your club profile page.
          </p>
        </div>

        {isLoading ? (
          <div className={styles.loading}>Loading announcements...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : announcements.length === 0 ? (
          <div className={styles.empty}>No announcements yet. Create your first announcement!</div>
        ) : (
          <div className={styles.announcementsGrid}>
            {announcements.map((announcement) => (
              <AnnouncementCard 
                key={announcement.id} 
                announcement={announcement} 
                onDelete={handleDeleteAnnouncement}
              />
            ))}
          </div>
        )}
      </div>

      <CreateAnnouncementModal
        isOpen={isCreateModalOpen}
        onClose={handleModalClose}
        onCreateAnnouncement={handleAnnouncementCreate}
      />
    </>
  );
}


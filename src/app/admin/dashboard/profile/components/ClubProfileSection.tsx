'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './ClubProfileSection.module.css';
import { getMyManagedClub, Club } from '@/lib/api/clubs';

const imgIcon = "https://www.figma.com/api/mcp/asset/924b1ed6-ce7e-41d3-a882-68365bf1ac6a";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/96fb4881-c289-4078-937a-ef900ee63ffd";

export default function ClubProfileSection() {
  const [club, setClub] = useState<Club | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadClub();
  }, []);

  const loadClub = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getMyManagedClub();

      if (response.data) {
        setClub(response.data);
      } else {
        setError(response.error || 'Failed to load club profile');
      }
    } catch (err) {
      console.error('Failed to load club:', err);
      setError('Failed to load club profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.profileSection}>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Club Profile Management</h2>
        <Link href="/admin/dashboard/profile/edit" className={styles.editButton}>
          <img src={imgIcon} alt="" className={styles.buttonIcon} />
          <span className={styles.buttonText}>Edit Profile</span>
        </Link>
      </div>

      {isLoading ? (
        <div className={styles.loading}>Loading club profile...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : club ? (
        <div className={styles.profileCard}>
          <h3 className={styles.cardTitle}>Current Profile Preview</h3>

          <div className={styles.imagesSection}>
            <div className={styles.logoSection}>
              <p className={styles.label}>Club Logo</p>
              <div className={styles.logoContainer}>
                {club.logo_url ? (
                  <img src={club.logo_url} alt="Club Logo" className={styles.logoIcon} />
                ) : (
                  <img src={imgIcon1} alt="No Logo" className={styles.logoIcon} />
                )}
              </div>
            </div>

            <div className={styles.coverSection}>
              <p className={styles.label}>Cover Image</p>
              <div className={styles.coverContainer}>
                {club.banner_url && (
                  <img src={club.banner_url} alt="Banner" className={styles.bannerImage} />
                )}
              </div>
            </div>
          </div>

          <div className={styles.fieldsSection}>
            <div className={styles.fieldGroup}>
              <p className={styles.label}>Club Name</p>
              <div className={styles.fieldValue}>
                <p className={styles.fieldText}>{club.name}</p>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <p className={styles.label}>Activity Types</p>
              <div className={styles.fieldValue}>
                <p className={styles.fieldText}>
                  {club.activity_type && club.activity_type.length > 0
                    ? (Array.isArray(club.activity_type) 
                        ? club.activity_type.join(', ') 
                        : club.activity_type)
                    : 'Not set'}
                </p>
              </div>
            </div>

            <div className={styles.fieldGroupLarge}>
              <p className={styles.label}>Mission Statement</p>
              <div className={styles.fieldValueLarge}>
                <p className={styles.fieldText}>{club.description}</p>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <p className={styles.label}>Categories</p>
              <div className={styles.fieldValue}>
                <p className={styles.fieldText}>{club.categories.join(', ')}</p>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <p className={styles.label}>Contact Email</p>
              <div className={styles.fieldValue}>
                <p className={styles.fieldText}>{club.contact_email || 'Not set'}</p>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <p className={styles.label}>Meeting Days</p>
              <div className={styles.fieldValue}>
                <p className={styles.fieldText}>
                  {club.meeting_schedule && club.meeting_schedule.length > 0
                    ? club.meeting_schedule.map(s => s.day).join(', ')
                    : 'Not set'}
                </p>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <p className={styles.label}>Meeting Times</p>
              <div className={styles.fieldValue}>
                <p className={styles.fieldText}>
                  {club.meeting_schedule && club.meeting_schedule.length > 0 && club.meeting_schedule[0].time_slots
                    ? Array.from(new Set(club.meeting_schedule.flatMap(s => s.time_slots || []))).join(', ')
                    : 'Not set'}
                </p>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <p className={styles.label}>Location</p>
              <div className={styles.fieldValue}>
                <p className={styles.fieldText}>
                  {club.meeting_schedule && club.meeting_schedule.length > 0 && club.meeting_schedule[0].location
                    ? club.meeting_schedule[0].location
                    : 'Not set'}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.error}>No club data available</div>
      )}
    </div>
  );
}



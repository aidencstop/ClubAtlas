'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './EditProfile.module.css';
import EditProfileHeader from './components/EditProfileHeader';
import EditBasicInformation from './components/EditBasicInformation';
import EditMeetingInformation from './components/EditMeetingInformation';
import EditLeadershipTeam from './components/EditLeadershipTeam';
import EditPhotoGallery from './components/EditPhotoGallery';
import { getMyManagedClub, updateClub, Club, MeetingSchedule, ClubLeader } from '@/lib/api/clubs';
import { uploadClubLogo, uploadClubBanner, uploadClubMedia, deleteClubMedia } from '@/lib/api';

export default function EditClubProfilePage() {
  const router = useRouter();
  const [club, setClub] = useState<Club | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form state
  const [clubName, setClubName] = useState('');
  const [activityTypes, setActivityTypes] = useState<string[]>([]);
  const [missionStatement, setMissionStatement] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [contactEmail, setContactEmail] = useState('');
  const [meetingSchedule, setMeetingSchedule] = useState<MeetingSchedule[]>([]);
  const [leaders, setLeaders] = useState<ClubLeader[]>([]);
  const [logoUrl, setLogoUrl] = useState<string | undefined>();
  const [bannerUrl, setBannerUrl] = useState<string | undefined>();
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);

  useEffect(() => {
    loadClub();
  }, []);

  const loadClub = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getMyManagedClub();

      if (response.data) {
        const clubData = response.data;
        setClub(clubData);
        
        // 폼 state 초기화
        setClubName(clubData.name);
        // activity_type을 배열로 처리 (하위 호환성 유지)
        const activityTypeArray = Array.isArray(clubData.activity_type)
          ? clubData.activity_type
          : typeof clubData.activity_type === 'string' && clubData.activity_type
            ? [clubData.activity_type]
            : [];
        setActivityTypes(activityTypeArray);
        setMissionStatement(clubData.description);
        setCategories(clubData.categories);
        setTags(clubData.tags || []);
        setContactEmail(clubData.contact_email || '');
        setMeetingSchedule(clubData.meeting_schedule || []);
        setLeaders(clubData.leaders || []);
        setLogoUrl(clubData.logo_url);
        setBannerUrl(clubData.banner_url);
        setMediaUrls(clubData.media_urls || []);
      } else {
        setError(response.error || 'Failed to load club');
      }
    } catch (err) {
      console.error('Failed to load club:', err);
      setError('Failed to load club profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!club) return;

    try {
      setIsSaving(true);
      setError(null);
      setSuccessMessage(null);

      const response = await updateClub(club.id, {
        name: clubName,
        description: missionStatement,
        categories: categories,
        tags: tags,
        activity_type: activityTypes,
        contact_email: contactEmail,
        meeting_schedule: meetingSchedule,
      });

      if (response.data) {
        setSuccessMessage('Club profile updated successfully!');
        setTimeout(() => {
          router.push('/admin/dashboard/profile');
        }, 2000);
      } else {
        setError(response.error || 'Failed to save changes');
      }
    } catch (err) {
      console.error('Failed to save:', err);
      setError('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogoUpload = async (file: File) => {
    if (!club) return;

    try {
      const response = await uploadClubLogo(club.id, file);
      if (response.data) {
        setLogoUrl(response.data.file_url);
      }
    } catch (err) {
      console.error('Failed to upload logo:', err);
      setError('Failed to upload logo');
    }
  };

  const handleBannerUpload = async (file: File) => {
    if (!club) return;

    try {
      const response = await uploadClubBanner(club.id, file);
      if (response.data) {
        setBannerUrl(response.data.file_url);
      }
    } catch (err) {
      console.error('Failed to upload banner:', err);
      setError('Failed to upload banner');
    }
  };

  const handleMediaUpload = async (file: File) => {
    if (!club) return;

    try {
      const response = await uploadClubMedia(club.id, file);
      if (response.data) {
        setMediaUrls([...mediaUrls, response.data.file_url]);
      }
    } catch (err) {
      console.error('Failed to upload media:', err);
      setError('Failed to upload media');
    }
  };

  const handleMediaDelete = async (fileUrl: string) => {
    if (!club) return;

    try {
      await deleteClubMedia(club.id, fileUrl);
      setMediaUrls(mediaUrls.filter(url => url !== fileUrl));
    } catch (err) {
      console.error('Failed to delete media:', err);
      setError('Failed to delete media');
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading club profile...</div>
      </div>
    );
  }

  if (error && !club) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <EditProfileHeader 
        onSave={handleSave}
        onCancel={() => router.push('/admin/dashboard/profile')}
        isSaving={isSaving}
      />
      
      {successMessage && (
        <div className={styles.successBanner}>{successMessage}</div>
      )}
      
      {error && (
        <div className={styles.errorBanner}>{error}</div>
      )}

      <div className={styles.content}>
        <div className={styles.formContainer}>
          <EditBasicInformation
            clubName={clubName}
            setClubName={setClubName}
            activityTypes={activityTypes}
            setActivityTypes={setActivityTypes}
            missionStatement={missionStatement}
            setMissionStatement={setMissionStatement}
            categories={categories}
            setCategories={setCategories}
            logoUrl={logoUrl}
            bannerUrl={bannerUrl}
            onLogoUpload={handleLogoUpload}
            onBannerUpload={handleBannerUpload}
          />
          <EditMeetingInformation
            meetingSchedule={meetingSchedule}
            setMeetingSchedule={setMeetingSchedule}
            contactEmail={contactEmail}
            setContactEmail={setContactEmail}
          />
          <EditLeadershipTeam
            leaders={leaders}
            setLeaders={setLeaders}
          />
          <EditPhotoGallery
            mediaUrls={mediaUrls}
            onMediaUpload={handleMediaUpload}
            onMediaDelete={handleMediaDelete}
          />
        </div>
      </div>
    </div>
  );
}









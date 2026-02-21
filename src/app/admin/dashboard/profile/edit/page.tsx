'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../Dashboard.module.css';
import editStyles from './EditProfile.module.css';
import DashboardHeader from '../../components/DashboardHeader';
import SidebarNavigation from '../../components/SidebarNavigation';
import EditPageHeader from './components/EditPageHeader';
import EditModeBanner from './components/EditModeBanner';
import EditBasicInformation from './components/EditBasicInformation';
import EditMeetingInformation from './components/EditMeetingInformation';
import EditContactInformation from './components/EditContactInformation';
import EditLeadershipTeam from './components/EditLeadershipTeam';
import EditPhotoGallery from './components/EditPhotoGallery';
import EditUpcomingEvents from './components/EditUpcomingEvents';
import EditSaveFooter from './components/EditSaveFooter';
import { getMyManagedClub, updateClub, Club, MeetingSchedule, ClubLeader } from '@/lib/api/clubs';
import { uploadClubLogo, uploadClubBanner, uploadClubMedia, deleteClubMedia } from '@/lib/api';

export default function EditClubProfilePage() {
  const router = useRouter();
  const [club, setClub] = useState<Club | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [clubName, setClubName] = useState('');
  const [tagline, setTagline] = useState('');
  const [activityTypes, setActivityTypes] = useState<string[]>([]);
  const [missionStatement, setMissionStatement] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [contactEmail, setContactEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [socialMedia, setSocialMedia] = useState('');
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
        setClubName(clubData.name);
        setTagline(clubData.tagline || '');
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
        tagline: tagline || undefined,
        categories,
        tags,
        activity_type: activityTypes,
        contact_email: contactEmail,
        meeting_schedule: meetingSchedule,
        leaders,
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

  const handleDiscard = () => {
    if (confirm('Are you sure you want to discard all changes?')) {
      router.push('/admin/dashboard/profile');
    }
  };

  const handleLogoUpload = async (file: File) => {
    if (!club) return;
    try {
      const response = await uploadClubLogo(club.id, file);
      if (response.data) setLogoUrl(response.data.file_url);
    } catch (err) {
      console.error('Failed to upload logo:', err);
      setError('Failed to upload logo');
    }
  };

  const handleBannerUpload = async (file: File) => {
    if (!club) return;
    try {
      const response = await uploadClubBanner(club.id, file);
      if (response.data) setBannerUrl(response.data.file_url);
    } catch (err) {
      console.error('Failed to upload banner:', err);
      setError('Failed to upload banner');
    }
  };

  const handleMediaUpload = async (file: File) => {
    if (!club) return;
    try {
      const response = await uploadClubMedia(club.id, file);
      if (response.data) setMediaUrls((prev) => [...prev, response.data.file_url]);
    } catch (err) {
      console.error('Failed to upload media:', err);
      setError('Failed to upload media');
    }
  };

  const handleMediaDelete = async (fileUrl: string) => {
    if (!club) return;
    try {
      await deleteClubMedia(club.id, fileUrl);
      setMediaUrls((prev) => prev.filter((url) => url !== fileUrl));
    } catch (err) {
      console.error('Failed to delete media:', err);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <DashboardHeader />
        <div className={styles.mainContent}>
          <SidebarNavigation />
          <div className={editStyles.loading}>Loading club profile...</div>
        </div>
      </div>
    );
  }

  if (error && !club) {
    return (
      <div className={styles.container}>
        <DashboardHeader />
        <div className={styles.mainContent}>
          <SidebarNavigation />
          <div className={editStyles.error}>{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <DashboardHeader />
      <div className={styles.mainContent}>
        <SidebarNavigation />
        <div className={editStyles.formWrapper}>
          {successMessage && (
            <div className={editStyles.successBanner}>{successMessage}</div>
          )}
          {error && <div className={editStyles.errorBanner}>{error}</div>}

          <EditModeBanner />
          <EditPageHeader />

          <div className={editStyles.formContainer}>
            <EditBasicInformation
              clubName={clubName}
              setClubName={setClubName}
              tagline={tagline}
              setTagline={setTagline}
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
            />
            <EditContactInformation
              email={contactEmail}
              setEmail={setContactEmail}
              website={website}
              setWebsite={setWebsite}
              socialMedia={socialMedia}
              setSocialMedia={setSocialMedia}
            />
            <EditLeadershipTeam leaders={leaders} setLeaders={setLeaders} />
            <EditPhotoGallery
              mediaUrls={mediaUrls}
              onMediaUpload={handleMediaUpload}
              onMediaDelete={handleMediaDelete}
            />
            {club && <EditUpcomingEvents clubId={club.id} />}
            <EditSaveFooter
              onDiscard={handleDiscard}
              onSave={handleSave}
              isSaving={isSaving}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

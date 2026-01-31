'use client';

import styles from './EditProfile.module.css';
import EditProfileHeader from './components/EditProfileHeader';
import EditBasicInformation from './components/EditBasicInformation';
import EditMeetingInformation from './components/EditMeetingInformation';
import EditLeadershipTeam from './components/EditLeadershipTeam';
import EditPhotoGallery from './components/EditPhotoGallery';

export default function EditClubProfilePage() {
  return (
    <div className={styles.container}>
      <EditProfileHeader />
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <EditBasicInformation />
          <EditMeetingInformation />
          <EditLeadershipTeam />
          <EditPhotoGallery />
        </div>
      </div>
    </div>
  );
}








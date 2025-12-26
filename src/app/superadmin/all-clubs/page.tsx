'use client';

import { useState } from 'react';
import styles from './AllClubs.module.css';
import SuperAdminHeader from '../dashboard/components/SuperAdminHeader';
import SuperAdminSidebar from '../dashboard/components/SuperAdminSidebar';
import AllClubsTable from './components/AllClubsTable';
import ClubStats from './components/ClubStats';
import CreateClubModal, { ClubFormData } from './components/CreateClubModal';

export default function AllClubsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateClub = (data: ClubFormData) => {
    console.log('Creating club:', data);
    // TODO: API 호출로 클럽 생성
    setIsModalOpen(false);
  };

  return (
    <div className={`${styles.container} superadmin-layout`}>
      <SuperAdminHeader />
      
      <div className={styles.mainContent}>
        <SuperAdminSidebar />
        
        <div className={styles.contentArea}>
          <div className={styles.header}>
            <h1 className={styles.title}>All Clubs Management</h1>
            <button 
              className={styles.createButton}
              onClick={() => setIsModalOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 5V15M5 10H15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Create New Club
            </button>
          </div>

          <AllClubsTable />
          
          <ClubStats />
        </div>
      </div>

      <CreateClubModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateClub}
      />
    </div>
  );
}


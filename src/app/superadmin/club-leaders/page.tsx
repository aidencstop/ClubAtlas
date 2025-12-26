'use client';

import { useState } from 'react';
import styles from './ClubLeaders.module.css';
import SuperAdminHeader from '../dashboard/components/SuperAdminHeader';
import SuperAdminSidebar from '../dashboard/components/SuperAdminSidebar';
import LeadersTable from './components/LeadersTable';
import AssignLeaderModal from './components/AssignLeaderModal';

export default function ClubLeadersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // TODO: 실제 검색 API 호출
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAssignLeader = (leaderData: { name: string; email: string; club: string; role: string }) => {
    console.log('Assigning new leader:', leaderData);
    // TODO: 실제 리더 할당 API 호출
    handleCloseModal();
  };

  return (
    <div className={`${styles.container} superadmin-layout`}>
      <SuperAdminHeader />
      
      <div className={styles.mainContent}>
        <SuperAdminSidebar />
        
        <div className={styles.contentArea}>
          <div className={styles.header}>
            <h1 className={styles.title}>Club Leaders Management</h1>
            <button className={styles.assignButton} onClick={handleOpenModal}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 5V15M5 10H15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Assign New Leader
            </button>
          </div>

          <div className={styles.searchSection}>
            <div className={styles.searchContainer}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={styles.searchIcon}>
                <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="#6B7280" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search leaders by name or email..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button className={styles.searchButton} onClick={handleSearch}>
              Search
            </button>
          </div>

          <LeadersTable />
        </div>
      </div>

      <AssignLeaderModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAssignLeader={handleAssignLeader}
      />
    </div>
  );
}


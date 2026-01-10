'use client';

import styles from '../Dashboard.module.css';
import DashboardHeader from '../components/DashboardHeader';
import SidebarNavigation from '../components/SidebarNavigation';
import AnnouncementsSection from './components/AnnouncementsSection';

export default function AnnouncementsPage() {
  return (
    <div className={styles.container}>
      <DashboardHeader />
      <div className={styles.mainContent}>
        <SidebarNavigation />
        <AnnouncementsSection />
      </div>
    </div>
  );
}


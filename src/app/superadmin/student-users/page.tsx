'use client';

import styles from './StudentUsers.module.css';
import SuperAdminHeader from '../dashboard/components/SuperAdminHeader';
import SuperAdminSidebar from '../dashboard/components/SuperAdminSidebar';
import StatCard from './components/StatCard';
import ActivityChart from './components/ActivityChart';

export default function StudentUsersPage() {
  return (
    <div className={`${styles.container} superadmin-layout`}>
      <SuperAdminHeader />
      
      <div className={styles.mainContent}>
        <SuperAdminSidebar />
        
        <div className={styles.contentArea}>
          <h1 className={styles.title}>Student Users</h1>

          <div className={styles.statsGrid}>
            <StatCard
              value="1,234"
              label="Total Users"
              subtext="+89 this week"
              subtextColor="green"
            />
            <StatCard
              value="892"
              label="Active This Month"
              subtext="72% of total"
              subtextColor="gray"
            />
            <StatCard
              value="89"
              label="New This Week"
              subtext="+15% vs last week"
              subtextColor="green"
            />
            <StatCard
              value="3.2"
              label="Avg Subscriptions"
              subtext="Per user"
              subtextColor="gray"
            />
          </div>

          <ActivityChart />
        </div>
      </div>
    </div>
  );
}


'use client';

import styles from './Analytics.module.css';
import SuperAdminHeader from '../dashboard/components/SuperAdminHeader';
import SuperAdminSidebar from '../dashboard/components/SuperAdminSidebar';
import AnalyticsCard from './components/AnalyticsCard';
import TrafficChart from './components/TrafficChart';
import PopularClubs from './components/PopularClubs';

export default function AnalyticsPage() {
  return (
    <div className={`${styles.container} superadmin-layout`}>
      <SuperAdminHeader />
      
      <div className={styles.mainContent}>
        <SuperAdminSidebar />
        
        <div className={styles.contentArea}>
          <h1 className={styles.title}>Platform Analytics</h1>

          <div className={styles.statsGrid}>
            <AnalyticsCard
              value="23,456"
              label="Total Page Views"
              subtext="+12% vs last month"
            />
            <AnalyticsCard
              value="8,234"
              label="Club Profile Views"
              subtext="+8% vs last month"
            />
            <AnalyticsCard
              value="67%"
              label="Avg Engagement"
              subtext="+3% vs last month"
            />
            <AnalyticsCard
              value="4.2 min"
              label="Session Time"
              subtext="+5% vs last month"
            />
          </div>

          <div className={styles.bottomGrid}>
            <TrafficChart />
            <PopularClubs />
          </div>
        </div>
      </div>
    </div>
  );
}


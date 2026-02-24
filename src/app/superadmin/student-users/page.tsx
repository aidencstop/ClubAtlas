'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getIdToken } from '@/lib/firebase/auth';
import styles from './StudentUsers.module.css';
import SuperAdminHeader from '../dashboard/components/SuperAdminHeader';
import SuperAdminSidebar from '../dashboard/components/SuperAdminSidebar';
import StatCard from './components/StatCard';
import ActivityChart from './components/ActivityChart';

interface StudentStats {
  total_users: number;
  active_this_month: number;
  new_this_week: number;
  avg_subscriptions: number;
}

export default function StudentUsersPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<StudentStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    if (!user) return;

    try {
      const token = await getIdToken();
      if (!token) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/superadmin/students/statistics`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to load student statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.container} superadmin-layout`}>
      <SuperAdminHeader />
      
      <div className={styles.mainContent}>
        <SuperAdminSidebar />
        
        <div className={styles.contentArea}>
          <h1 className={styles.title}>Student Users</h1>

          <div className={styles.statsGrid}>
            <StatCard
              value={loading ? "..." : (stats?.total_users ?? 0).toLocaleString()}
              label="Total Users"
              subtext={loading ? "" : `+${stats?.new_this_week || 0} this week`}
              subtextColor="green"
            />
            <StatCard
              value={loading ? "..." : (stats?.active_this_month ?? 0).toLocaleString()}
              label="Active This Month"
              subtext={loading ? "" : stats ? `${Math.round((stats.active_this_month / stats.total_users) * 100)}% of total` : ""}
              subtextColor="gray"
            />
            <StatCard
              value={loading ? "..." : (stats?.new_this_week ?? 0).toString()}
              label="New This Week"
              subtext=""
              subtextColor="green"
            />
            <StatCard
              value={loading ? "..." : (stats?.avg_subscriptions ?? 0).toString()}
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










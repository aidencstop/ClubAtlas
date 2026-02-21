'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getIdToken } from '@/lib/firebase/auth';
import styles from './SuperAdminDashboard.module.css';
import SuperAdminHeader from './components/SuperAdminHeader';
import SuperAdminSidebar from './components/SuperAdminSidebar';
import SystemStatusBanner from './components/SystemStatusBanner';
import StatCard from './components/StatCard';
import PendingApprovals from './components/PendingApprovals';
import RecentActivity from './components/RecentActivity';
import SystemAlerts from './components/SystemAlerts';

const statTotalClubs = "/images/icons/superadmin/stat-total-clubs.svg";
const statActiveLeaders = "/images/icons/superadmin/stat-active-leaders.svg";
const statStudentUsers = "/images/icons/superadmin/stat-student-users.svg";
const statTotalEvents = "/images/icons/superadmin/stat-total-events.svg";

interface PlatformStats {
  total_clubs: number;
  active_clubs: number;
  inactive_clubs: number;
  total_leaders: number;
  active_leaders: number;
  pending_leader_requests: number;
  total_students: number;
  new_students_this_week: number;
  total_events: number;
  upcoming_events: number;
  total_subscriptions: number;
}

export default function SuperAdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<PlatformStats | null>(null);
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/superadmin/statistics`,
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
      console.error('Failed to load statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <SuperAdminHeader />
      <div className={styles.mainContent}>
        <SuperAdminSidebar />
        <div className={styles.contentArea}>
          <div className={styles.header}>
            <h1 className={styles.title}>Super Admin Dashboard</h1>
            <p className={styles.subtitle}>Platform overview and system management</p>
          </div>

          <SystemStatusBanner />

          <div className={styles.statsGrid}>
            <StatCard
              icon={statTotalClubs}
              value={loading ? "..." : stats?.total_clubs.toString() || "0"}
              label="Total Clubs"
              sublabel={loading ? "" : `${stats?.active_clubs || 0} active`}
              bgColor="#dcfce7"
            />
            <StatCard
              icon={statActiveLeaders}
              value={loading ? "..." : stats?.active_leaders.toString() || "0"}
              label="Active Leaders"
              sublabel={loading ? "" : `${stats?.pending_leader_requests || 0} pending`}
              bgColor="#dcfce7"
            />
            <StatCard
              icon={statStudentUsers}
              value={loading ? "..." : stats?.total_students.toLocaleString() || "0"}
              label="Student Users"
              sublabel={loading ? "" : `+${stats?.new_students_this_week || 0} this week`}
              bgColor="#dcfce7"
            />
            <StatCard
              icon={statTotalEvents}
              value={loading ? "..." : stats?.total_events.toString() || "0"}
              label="Total Events"
              sublabel="This semester"
              bgColor="#dcfce7"
            />
          </div>

          <PendingApprovals />

          <div className={styles.bottomGrid}>
            <RecentActivity />
            <SystemAlerts />
          </div>
        </div>
      </div>
    </div>
  );
}










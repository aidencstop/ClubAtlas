import styles from './SuperAdminDashboard.module.css';
import SuperAdminHeader from './components/SuperAdminHeader';
import SuperAdminSidebar from './components/SuperAdminSidebar';
import SystemStatusBanner from './components/SystemStatusBanner';
import StatCard from './components/StatCard';
import PendingApprovals from './components/PendingApprovals';
import RecentActivity from './components/RecentActivity';
import SystemAlerts from './components/SystemAlerts';

const imgIcon1 = "https://www.figma.com/api/mcp/asset/5f7bd4aa-ac7d-4cbc-af62-707b3c3e7f33";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/132616e0-3874-4855-a95b-ff467dd72d25";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/157f71e3-0626-46a4-b57f-503e9080fd39";
const imgIcon4 = "https://www.figma.com/api/mcp/asset/b32bd367-2c80-4fba-a774-cc57246c2aae";

export default function SuperAdminDashboard() {
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
              icon={imgIcon1}
              value="47"
              label="Total Clubs"
              sublabel="+3 this month"
              bgColor="#dbeafe"
            />
            <StatCard
              icon={imgIcon2}
              value="52"
              label="Active Leaders"
              sublabel="5 pending"
              bgColor="#f3e8ff"
            />
            <StatCard
              icon={imgIcon3}
              value="1,234"
              label="Student Users"
              sublabel="+89 this week"
              bgColor="#dcfce7"
            />
            <StatCard
              icon={imgIcon4}
              value="156"
              label="Total Events"
              sublabel="This semester"
              bgColor="#ffedd4"
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


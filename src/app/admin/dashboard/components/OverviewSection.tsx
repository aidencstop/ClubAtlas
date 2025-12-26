import styles from './OverviewSection.module.css';
import StatCard from './StatCard';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';
import UpcomingEvents from './UpcomingEvents';

export default function OverviewSection() {
  return (
    <div className={styles.overviewSection}>
      <div className={styles.welcomeSection}>
        <h2 className={styles.welcomeTitle}>Welcome back, Sarah!</h2>
        <p className={styles.welcomeSubtitle}>
          Here's what's happening with Robotics Club
        </p>
      </div>

      <div className={styles.statsGrid}>
        <StatCard
          icon="https://www.figma.com/api/mcp/asset/e716709a-d34f-4326-9e83-1fba7611afd4"
          iconBg="#dbeafe"
          value="127"
          label="Total Subscribers"
          change="+12 this week"
          changePositive={true}
        />
        <StatCard
          icon="https://www.figma.com/api/mcp/asset/f9a0d896-59aa-4f4d-9ac4-b0740537ba8b"
          iconBg="#f3e8ff"
          value="5"
          label="Upcoming Events"
          change="2 this week"
          changePositive={true}
        />
        <StatCard
          icon="https://www.figma.com/api/mcp/asset/59a88fd4-c704-48d4-bc84-9435d427da82"
          iconBg="#dcfce7"
          value="342"
          label="Profile Views"
          change="+23% vs last month"
          changePositive={true}
        />
        <StatCard
          icon="https://www.figma.com/api/mcp/asset/c71c1457-508b-4a52-9da5-ac57f1d6967e"
          iconBg="#ffedd4"
          value="68%"
          label="Engagement Rate"
          change="+5% vs last month"
          changePositive={true}
        />
      </div>

      <div className={styles.contentGrid}>
        <RecentActivity />
        <QuickActions />
      </div>

      <UpcomingEvents />
    </div>
  );
}



'use client';

import { useState, useEffect } from 'react';
import styles from './OverviewSection.module.css';
import StatCard from './StatCard';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';
import UpcomingEvents from './UpcomingEvents';
import { useAuth } from '@/contexts/AuthContext';
import { getMyManagedClub, Club } from '@/lib/api/clubs';
import { getClubSubscribers, Subscriber } from '@/lib/api/subscriptions';
import { getEvents, Event } from '@/lib/api/events';
import { getAnnouncements, Announcement } from '@/lib/api/announcements';

export default function OverviewSection() {
  const { userProfile } = useAuth();
  const [club, setClub] = useState<Club | null>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, [userProfile]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const clubResponse = await getMyManagedClub();
      if (!clubResponse.data) {
        setError('No managed club found');
        return;
      }

      const clubData = clubResponse.data;
      setClub(clubData);

      const [subscribersRes, eventsRes, announcementsRes] = await Promise.all([
        getClubSubscribers(clubData.id),
        getEvents({ 
          club_id: clubData.id, 
          status_filter: 'active',
          limit: 50 
        }),
        getAnnouncements({ 
          club_id: clubData.id, 
          status_filter: 'active',
          limit: 10 
        })
      ]);

      if (subscribersRes.data) {
        setSubscribers(subscribersRes.data.subscribers);
      }

      if (eventsRes.data) {
        const now = new Date();
        const weekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        const upcoming = eventsRes.data.events.filter(event => {
          const eventDate = new Date(event.start_datetime);
          return eventDate >= now && eventDate <= weekLater;
        });
        setUpcomingEvents(upcoming);
      }

      if (announcementsRes.data) {
        setAnnouncements(announcementsRes.data.announcements);
      }

    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const totalSubscribers = club?.stats?.total_subscribers || 0;
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weeklyNewSubscribers = subscribers.filter(sub => {
    const subDate = new Date(sub.subscribed_at);
    return subDate >= weekAgo;
  }).length;

  const profileViews = club?.stats?.view_count || 0;
  
  const totalAnnouncements = announcements.length;
  const totalOpens = announcements.reduce((sum, ann) => sum + (ann.opens || 0), 0);
  const engagementRate = totalAnnouncements > 0 && totalSubscribers > 0
    ? Math.round((totalOpens / (totalAnnouncements * totalSubscribers)) * 100)
    : 0;

  const thisWeekEvents = upcomingEvents.filter(event => {
    const eventDate = new Date(event.start_datetime);
    const now = new Date();
    const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    return eventDate >= now && eventDate <= threeDaysLater;
  }).length;

  if (isLoading) {
    return (
      <div className={styles.overviewSection}>
        <div className={styles.loading}>Loading dashboard...</div>
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className={styles.overviewSection}>
        <div className={styles.error}>{error || 'No club data available'}</div>
      </div>
    );
  }

  return (
    <div className={styles.overviewSection}>
      <div className={styles.welcomeSection}>
        <h2 className={styles.welcomeTitle}>Welcome back, {userProfile?.display_name || 'Admin'}!</h2>
        <p className={styles.welcomeSubtitle}>
          Here's what's happening with {club.name}
        </p>
      </div>

      <div className={styles.statsGrid}>
        <StatCard
          icon="https://www.figma.com/api/mcp/asset/e716709a-d34f-4326-9e83-1fba7611afd4"
          iconBg="#dbeafe"
          value={totalSubscribers.toString()}
          label="Total Subscribers"
          change={weeklyNewSubscribers > 0 ? `+${weeklyNewSubscribers} this week` : 'No new this week'}
          changePositive={weeklyNewSubscribers > 0}
        />
        <StatCard
          icon="https://www.figma.com/api/mcp/asset/f9a0d896-59aa-4f4d-9ac4-b0740537ba8b"
          iconBg="#f3e8ff"
          value={upcomingEvents.length.toString()}
          label="Upcoming Events"
          change={thisWeekEvents > 0 ? `${thisWeekEvents} this week` : 'None this week'}
          changePositive={thisWeekEvents > 0}
        />
        <StatCard
          icon="https://www.figma.com/api/mcp/asset/59a88fd4-c704-48d4-bc84-9435d427da82"
          iconBg="#dcfce7"
          value={profileViews.toString()}
          label="Profile Views"
          change="Total views"
          changePositive={true}
        />
        <StatCard
          icon="https://www.figma.com/api/mcp/asset/c71c1457-508b-4a52-9da5-ac57f1d6967e"
          iconBg="#ffedd4"
          value={`${engagementRate}%`}
          label="Engagement Rate"
          change="Announcement engagement"
          changePositive={engagementRate > 0}
        />
      </div>

      <div className={styles.contentGrid}>
        <RecentActivity 
          subscribers={subscribers}
          events={upcomingEvents}
          announcements={announcements}
        />
        <QuickActions />
      </div>

      <UpcomingEvents events={upcomingEvents} clubId={club.id} />
    </div>
  );
}











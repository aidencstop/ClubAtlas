'use client';

import Link from 'next/link';
import styles from './EventsSection.module.css';
import EventCard from './EventCard';

const arrowIcon = "https://www.figma.com/api/mcp/asset/be0b2b8b-a481-4b56-bdb5-dc45b8621589";

const events = [
  {
    id: 1,
    day: 'MON',
    date: '27',
    dateColor: 'linear-gradient(132.27deg, rgba(219, 234, 254, 1) 0%, rgba(190, 219, 255, 1) 100%)',
    time: '4:00 PM',
    clubName: 'Robotics Club',
    eventType: 'Weekly Meeting',
  },
  {
    id: 2,
    day: 'TUE',
    date: '28',
    dateColor: 'transparent',
    time: '5:30 PM',
    clubName: 'Drama Society',
    eventType: 'Auditions',
  },
  {
    id: 3,
    day: 'WED',
    date: '29',
    dateColor: 'linear-gradient(132.27deg, rgba(220, 252, 231, 1) 0%, rgba(0, 0, 0, 0) 100%)',
    time: '3:00 PM',
    clubName: 'Debate Team',
    eventType: 'Practice Session',
  },
  {
    id: 4,
    day: 'THU',
    date: '30',
    dateColor: 'linear-gradient(132.27deg, rgba(252, 231, 243, 1) 0%, rgba(252, 206, 232, 1) 100%)',
    time: '6:00 PM',
    clubName: 'Photography Club',
    eventType: 'Photo Walk',
  },
];

export default function EventsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>This Week&apos;s Events</h2>
          <Link href="/student/home/calendar" className={styles.viewAllButton}>
            <span>Full Calendar</span>
            <img src={arrowIcon} alt="" />
          </Link>
        </div>
        <div className={styles.eventsGrid}>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}


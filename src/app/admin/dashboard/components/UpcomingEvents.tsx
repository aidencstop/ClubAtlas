import styles from './UpcomingEvents.module.css';

const imgIcon = "https://www.figma.com/api/mcp/asset/f9a0d896-59aa-4f4d-9ac4-b0740537ba8b";

interface Event {
  title: string;
  date: string;
  notifications: string;
}

const events: Event[] = [
  {
    title: 'Weekly Meeting',
    date: 'Mon, Nov 27 • 4:00 PM',
    notifications: '32 email notifications sent',
  },
  {
    title: 'Competition Prep Workshop',
    date: 'Wed, Nov 29 • 5:00 PM',
    notifications: '18 email notifications sent',
  },
];

export default function UpcomingEvents() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>Upcoming Events (Next 7 Days)</h3>
        <button className={styles.viewAllLink}>View All →</button>
      </div>
      <div className={styles.eventsGrid}>
        {events.map((event, index) => (
          <div key={index} className={styles.eventCard}>
            <div className={styles.eventHeader}>
              <div className={styles.eventInfo}>
                <h4 className={styles.eventTitle}>{event.title}</h4>
                <p className={styles.eventDate}>{event.date}</p>
              </div>
              <img src={imgIcon} alt="Event" className={styles.eventIcon} />
            </div>
            <p className={styles.eventNotifications}>{event.notifications}</p>
          </div>
        ))}
      </div>
    </div>
  );
}



'use client';

import styles from './EventsSection.module.css';

const clockIcon = "https://www.figma.com/api/mcp/asset/56650936-5e60-4f41-b0bf-da5eadfa8ac9";
const locationIcon = "https://www.figma.com/api/mcp/asset/e36c4c75-c4a5-4787-a4f6-6386e71614f4";

interface EventsSectionProps {
  clubId: string;
}

export default function EventsSection({ clubId }: EventsSectionProps) {
  const events = [
    {
      id: 1,
      title: 'Robotics Workshop: Introduction to Arduino',
      date: 'Monday, Jan 20, 2026',
      time: '4:00 PM - 6:00 PM',
      location: 'Engineering Lab A',
      type: 'Workshop',
      attendees: 35,
    },
    {
      id: 2,
      title: 'Robot Competition Prep Meeting',
      date: 'Monday, Jan 27, 2026',
      time: '4:00 PM - 6:00 PM',
      location: 'Engineering Lab A',
      type: 'Meeting',
      attendees: 42,
    },
    {
      id: 3,
      title: 'Guest Speaker: AI in Robotics',
      date: 'Monday, Feb 3, 2026',
      time: '4:00 PM - 5:30 PM',
      location: 'Main Auditorium',
      type: 'Seminar',
      attendees: 18,
    },
  ];

  return (
    <section className={styles.eventsSection}>
      <h2 className={styles.sectionTitle}>Upcoming Events</h2>
      <div className={styles.eventsGrid}>
        {events.map((event) => (
          <div key={event.id} className={styles.eventCard}>
            <div className={styles.eventHeader}>
              <span className={styles.eventType}>{event.type}</span>
              <span className={styles.attendees}>{event.attendees} attending</span>
            </div>
            
            <h3 className={styles.eventTitle}>{event.title}</h3>
            
            <div className={styles.eventDetails}>
              <div className={styles.detailItem}>
                <img src={clockIcon} alt="Time" className={styles.detailIcon} />
                <div>
                  <p className={styles.detailLabel}>Date & Time</p>
                  <p className={styles.detailValue}>{event.date}</p>
                  <p className={styles.detailValue}>{event.time}</p>
                </div>
              </div>
              
              <div className={styles.detailItem}>
                <img src={locationIcon} alt="Location" className={styles.detailIcon} />
                <div>
                  <p className={styles.detailLabel}>Location</p>
                  <p className={styles.detailValue}>{event.location}</p>
                </div>
              </div>
            </div>
            
            <button className={styles.rsvpButton}>RSVP</button>
          </div>
        ))}
      </div>
    </section>
  );
}




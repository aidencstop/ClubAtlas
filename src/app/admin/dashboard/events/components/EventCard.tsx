'use client';

import styles from './EventCard.module.css';

const imgIconCalendar = "https://www.figma.com/api/mcp/asset/0b484682-e16d-476a-8ae2-92199f87cd5d";
const imgIconPeople = "https://www.figma.com/api/mcp/asset/dd19207a-63e5-4f47-882c-18ef0100f6ce";
const imgIconMail = "https://www.figma.com/api/mcp/asset/1270314d-18bb-4d3f-924b-5991b020b1be";
const imgIconEdit = "https://www.figma.com/api/mcp/asset/adc1b63b-dc7f-44ad-b00e-fa5ff64894a2";
const imgIconDelete = "https://www.figma.com/api/mcp/asset/d95c4067-13e5-47be-b49e-4d339a2b57e9";

interface Event {
  id: string;
  title: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  date: string;
  notificationsSent: number;
}

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
}

export default function EventCard({ event, onEdit }: EventCardProps) {
  const handleViewDetails = () => {
    console.log('View details:', event.id);
  };

  const handleSendReminder = () => {
    console.log('Send reminder:', event.id);
  };

  const handleEdit = () => {
    onEdit(event);
  };

  const handleDelete = () => {
    console.log('Delete event:', event.id);
  };

  const getStatusClassName = () => {
    switch (event.status) {
      case 'upcoming':
        return styles.statusUpcoming;
      case 'completed':
        return styles.statusCompleted;
      case 'cancelled':
        return styles.statusCancelled;
      default:
        return '';
    }
  };

  const getStatusLabel = () => {
    return event.status.toUpperCase();
  };

  return (
    <div className={styles.eventCard}>
      <div className={styles.cardContent}>
        <div className={styles.leftSection}>
          <div className={styles.titleRow}>
            <h3 className={styles.eventTitle}>{event.title}</h3>
            <span className={`${styles.statusBadge} ${getStatusClassName()}`}>
              {getStatusLabel()}
            </span>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.infoItem}>
              <img src={imgIconCalendar} alt="" className={styles.infoIcon} />
              <span className={styles.infoText}>{event.date}</span>
            </div>
            <div className={styles.infoItem}>
              <img src={imgIconPeople} alt="" className={styles.infoIcon} />
              <span className={styles.infoText}>
                {event.notificationsSent} email notifications sent
              </span>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button onClick={handleViewDetails} className={styles.viewButton}>
              View Details
            </button>
            <button onClick={handleSendReminder} className={styles.reminderButton}>
              <img src={imgIconMail} alt="" className={styles.actionIcon} />
              <span>Send Reminder</span>
            </button>
          </div>
        </div>

        <div className={styles.rightSection}>
          <button onClick={handleEdit} className={styles.iconButton}>
            <img src={imgIconEdit} alt="Edit" className={styles.buttonIcon} />
          </button>
          <button onClick={handleDelete} className={styles.iconButton}>
            <img src={imgIconDelete} alt="Delete" className={styles.buttonIcon} />
          </button>
        </div>
      </div>
    </div>
  );
}


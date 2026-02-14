'use client';

import styles from './EditMeetingInformation.module.css';
import { MeetingSchedule } from '@/lib/api/clubs';

interface EditMeetingInformationProps {
  meetingSchedule: MeetingSchedule[];
  setMeetingSchedule: (value: MeetingSchedule[]) => void;
  contactEmail: string;
  setContactEmail: (value: string) => void;
}

export default function EditMeetingInformation({
  meetingSchedule,
  setMeetingSchedule,
  contactEmail,
  setContactEmail
}: EditMeetingInformationProps) {
  const firstSchedule = meetingSchedule[0] || { day: '', time_slots: [], location: '' };

  const handleDayChange = (value: string) => {
    const updated = [...meetingSchedule];
    if (updated.length === 0) {
      updated.push({ day: value, time_slots: [], location: '' });
    } else {
      updated[0] = { ...updated[0], day: value };
    }
    setMeetingSchedule(updated);
  };

  const handleTimeChange = (value: string) => {
    const updated = [...meetingSchedule];
    if (updated.length === 0) {
      updated.push({ day: '', time_slots: [value], location: '' });
    } else {
      updated[0] = { ...updated[0], time_slots: [value] };
    }
    setMeetingSchedule(updated);
  };

  const handleLocationChange = (value: string) => {
    const updated = [...meetingSchedule];
    if (updated.length === 0) {
      updated.push({ day: '', time_slots: [], location: value });
    } else {
      updated[0] = { ...updated[0], location: value };
    }
    setMeetingSchedule(updated);
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Meeting Information</h2>

      <div className={styles.threeColumnRow}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Meeting Day</label>
          <input
            type="text"
            value={firstSchedule.day}
            onChange={(e) => handleDayChange(e.target.value)}
            className={styles.input}
            placeholder="e.g., Monday"
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Meeting Time</label>
          <input
            type="text"
            value={firstSchedule.time_slots[0] || ''}
            onChange={(e) => handleTimeChange(e.target.value)}
            className={styles.input}
            placeholder="e.g., 4:00 PM - 6:00 PM"
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Location</label>
          <input
            type="text"
            value={firstSchedule.location || ''}
            onChange={(e) => handleLocationChange(e.target.value)}
            className={styles.input}
            placeholder="e.g., Room 201"
          />
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Contact Email</label>
        <input
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          className={styles.input}
          placeholder="club@email.com"
        />
      </div>
    </div>
  );
}









'use client';

import { useState } from 'react';
import styles from './EditMeetingInformation.module.css';

export default function EditMeetingInformation() {
  const [meetingDay, setMeetingDay] = useState('Monday');
  const [meetingTime, setMeetingTime] = useState('4:00 PM - 6:00 PM');
  const [location, setLocation] = useState('Engineering Building, Room 201');

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Meeting Information</h2>

      <div className={styles.threeColumnRow}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Meeting Day</label>
          <input
            type="text"
            value={meetingDay}
            onChange={(e) => setMeetingDay(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Meeting Time</label>
          <input
            type="text"
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.input}
          />
        </div>
      </div>
    </div>
  );
}






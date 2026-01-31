'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './CreateEventModal.module.css';
import DatePicker from './DatePicker';

// 로컬 아이콘 경로
const modalIconPlus = "/images/icons/calendar/create.svg"; // Create 아이콘 재사용
const closeIcon = "/images/icons/calendar/close.svg";
const calendarIconDate = "/images/icons/calendar/calendar-date.svg";
const locationIcon = "/images/icons/calendar/location.svg";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateEventModal({ isOpen, onClose }: CreateEventModalProps) {
  const [eventTitle, setEventTitle] = useState('');
  const [club, setClub] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateInputRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 이벤트 생성 로직 추가
    console.log('Creating event:', { eventTitle, club, date, startTime, endTime, location, description });
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerLeft}>
              <div className={styles.iconWrapper}>
                <img src={modalIconPlus} alt="" width="24" height="24" />
              </div>
              <div className={styles.headerText}>
                <h2 className={styles.modalTitle}>Create New Event</h2>
                <p className={styles.modalSubtitle}>Add a new club event to the calendar</p>
              </div>
            </div>
            <button className={styles.closeButton} onClick={onClose}>
              <img src={closeIcon} alt="" width="20" height="20" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formContent}>
            {/* Event Title */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Event Title *</label>
              <input
                type="text"
                className={styles.input}
                placeholder="e.g., Weekly Team Meeting"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                required
              />
            </div>

            {/* Club */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Club *</label>
              <select
                className={styles.select}
                value={club}
                onChange={(e) => setClub(e.target.value)}
                required
              >
                <option value="">Select a club...</option>
                <option value="robotics">Robotics Club</option>
                <option value="soccer">Soccer Team</option>
                <option value="drama">Drama Society</option>
                <option value="cs">CS Society</option>
                <option value="service">Service Society</option>
                <option value="maker">Maker Space</option>
              </select>
            </div>

            {/* Date, Start Time, End Time */}
            <div className={styles.timeGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Date *</label>
                <div className={styles.dateInputWrapper} ref={dateInputRef}>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="dd/mm/yyyy"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    readOnly
                    required
                  />
                  <img src={calendarIconDate} alt="" width="16" height="16" className={styles.dateIcon} />
                  {showDatePicker && (
                    <DatePicker
                      selectedDate={date}
                      onDateSelect={setDate}
                      onClose={() => setShowDatePicker(false)}
                    />
                  )}
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Start Time *</label>
                <input
                  type="time"
                  className={styles.input}
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>End Time *</label>
                <input
                  type="time"
                  className={styles.input}
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Location *</label>
              <div className={styles.locationInputWrapper}>
                <img src={locationIcon} alt="" width="20" height="20" className={styles.locationIcon} />
                <input
                  type="text"
                  className={`${styles.input} ${styles.inputWithIcon}`}
                  placeholder="e.g., Engineering Lab 201"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Description *</label>
              <textarea
                className={styles.textarea}
                placeholder="Describe your event..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className={styles.footer}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.createButton}>
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


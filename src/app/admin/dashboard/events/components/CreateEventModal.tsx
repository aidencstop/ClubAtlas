'use client';

import { useState } from 'react';
import styles from './CreateEventModal.module.css';

const imgIconAdd = "https://www.figma.com/api/mcp/asset/a584c665-496e-46c9-8f42-c0a97ad35bb4";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateEvent: (eventData: EventFormData) => void;
}

export interface EventFormData {
  title: string;
  dateTime: string;
  location: string;
  description: string;
}

export default function CreateEventModal({ isOpen, onClose, onCreateEvent }: CreateEventModalProps) {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    dateTime: '',
    location: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateEvent(formData);
    // Reset form
    setFormData({
      title: '',
      dateTime: '',
      location: '',
      description: '',
    });
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      title: '',
      dateTime: '',
      location: '',
      description: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalContent}>
          <h2 className={styles.title}>Create New Event</h2>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formFields}>
              <div className={styles.field}>
                <label className={styles.label}>Event Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Date & Time</label>
                <input
                  type="datetime-local"
                  value={formData.dateTime}
                  onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={styles.textarea}
                  rows={4}
                />
              </div>
            </div>

            <div className={styles.actions}>
              <button type="button" onClick={handleCancel} className={styles.cancelButton}>
                Cancel
              </button>
              <button type="submit" className={styles.createButton}>
                <img src={imgIconAdd} alt="" className={styles.buttonIcon} />
                <span>Create Event</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}





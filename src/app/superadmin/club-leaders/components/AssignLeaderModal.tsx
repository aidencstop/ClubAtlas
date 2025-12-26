'use client';

import { useState } from 'react';
import styles from './AssignLeaderModal.module.css';

const imgIconClose = "https://www.figma.com/api/mcp/asset/2a5b716d-8aba-49c7-af7f-2044b39bf661";

interface AssignLeaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssignLeader: (leaderData: { name: string; email: string; club: string; role: string }) => void;
}

export default function AssignLeaderModal({ isOpen, onClose, onAssignLeader }: AssignLeaderModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [club, setClub] = useState('');
  const [role, setRole] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAssignLeader({ name, email, club, role });
    // Reset form
    setName('');
    setEmail('');
    setClub('');
    setRole('');
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>Assign New Leader</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <img src={imgIconClose} alt="Close" className={styles.closeIcon} />
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="leaderName" className={styles.label}>Leader Name</label>
            <input
              type="text"
              id="leaderName"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="club" className={styles.label}>Club</label>
            <select
              id="club"
              className={styles.dropdown}
              value={club}
              onChange={(e) => setClub(e.target.value)}
              required
            >
              <option value="">Select a club</option>
              <option value="Robotics Club">Robotics Club</option>
              <option value="Photography Club">Photography Club</option>
              <option value="Drama Society">Drama Society</option>
              <option value="STEM Club">STEM Club</option>
              <option value="Arts Club">Arts Club</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="role" className={styles.label}>Role</label>
            <input
              type="text"
              id="role"
              className={styles.input}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.assignButton}>
            Assign Leader
          </button>
        </form>
      </div>
    </div>
  );
}


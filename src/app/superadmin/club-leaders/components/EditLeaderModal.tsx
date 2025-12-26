'use client';

import { useState, useEffect } from 'react';
import styles from './EditLeaderModal.module.css';

const imgIconClose = "https://www.figma.com/api/mcp/asset/a7fa1ae8-ccbb-49fd-a934-d777d40b49ff";
const imgIconInfo = "https://www.figma.com/api/mcp/asset/628cde68-3afd-40bb-8ce1-5eace05e0dc5";
const imgIconCheck = "https://www.figma.com/api/mcp/asset/ce1e77d4-105e-411e-af23-0d9001707a88";

interface Leader {
  id: string;
  name: string;
  email: string;
  club: string;
  role: string;
  status: 'ACTIVE' | 'INACTIVE';
}

interface EditLeaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  leader: Leader | null;
  onSave: (updatedLeader: Leader) => void;
}

export default function EditLeaderModal({ isOpen, onClose, leader, onSave }: EditLeaderModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [club, setClub] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState<'ACTIVE' | 'INACTIVE'>('ACTIVE');

  useEffect(() => {
    if (leader) {
      setName(leader.name);
      setEmail(leader.email);
      setClub(leader.club);
      setRole(leader.role);
      setStatus(leader.status);
    }
  }, [leader]);

  if (!isOpen || !leader) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...leader,
      name,
      email,
      club,
      role,
      status
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>Edit Leader Information</h3>
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
            <label htmlFor="clubAssignment" className={styles.label}>Club Assignment</label>
            <select
              id="clubAssignment"
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
            <label htmlFor="rolePosition" className={styles.label}>Role / Position</label>
            <select
              id="rolePosition"
              className={styles.dropdown}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select a role</option>
              <option value="President">President</option>
              <option value="Vice President">Vice President</option>
              <option value="Secretary">Secretary</option>
              <option value="Treasurer">Treasurer</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="status" className={styles.label}>Status</label>
            <select
              id="status"
              className={styles.dropdown}
              value={status}
              onChange={(e) => setStatus(e.target.value as 'ACTIVE' | 'INACTIVE')}
              required
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <div className={styles.infoBox}>
            <img src={imgIconInfo} alt="Info" className={styles.infoIcon} />
            <div className={styles.infoContent}>
              <p className={styles.infoTitle}>Important Notes:</p>
              <ul className={styles.infoList}>
                <li>Changes will be applied immediately</li>
                <li>The leader will receive an email notification</li>
                <li>Club members will be notified of leadership changes</li>
              </ul>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.saveButton}>
              <img src={imgIconCheck} alt="Save" className={styles.checkIcon} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


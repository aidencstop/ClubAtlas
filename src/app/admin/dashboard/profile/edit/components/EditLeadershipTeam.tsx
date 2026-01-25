'use client';

import styles from './EditLeadershipTeam.module.css';

const imgIconEdit = "https://www.figma.com/api/mcp/asset/7d5f8357-c4c3-4daa-9a50-a7a20461c680";
const imgIconDelete = "https://www.figma.com/api/mcp/asset/352610b8-1805-4e24-9a5d-cf41eb44d274";

interface LeaderCardProps {
  initial: string;
  name: string;
  role: string;
  email: string;
}

function LeaderCard({ initial, name, role, email }: LeaderCardProps) {
  return (
    <div className={styles.leaderCard}>
      <div className={styles.avatar}>
        <span className={styles.avatarText}>{initial}</span>
      </div>
      <div className={styles.leaderInfo}>
        <h3 className={styles.leaderName}>{name}</h3>
        <p className={styles.leaderRole}>{role}</p>
        <p className={styles.leaderEmail}>{email}</p>
      </div>
      <div className={styles.actions}>
        <button className={styles.actionButton}>
          <img src={imgIconEdit} alt="Edit" className={styles.actionIcon} />
        </button>
        <button className={styles.actionButton}>
          <img src={imgIconDelete} alt="Delete" className={styles.actionIcon} />
        </button>
      </div>
    </div>
  );
}

export default function EditLeadershipTeam() {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Leadership Team</h2>

      <div className={styles.leadersGrid}>
        <LeaderCard
          initial="S"
          name="Sarah Johnson"
          role="President"
          email="sarah.j@email.edu"
        />
        <LeaderCard
          initial="M"
          name="Michael Chen"
          role="Vice President"
          email="michael.c@email.edu"
        />
      </div>
    </div>
  );
}






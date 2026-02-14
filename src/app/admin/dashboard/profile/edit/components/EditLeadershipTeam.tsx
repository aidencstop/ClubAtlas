'use client';

import styles from './EditLeadershipTeam.module.css';
import { ClubLeader } from '@/lib/api/clubs';

const imgIconEdit = "https://www.figma.com/api/mcp/asset/7d5f8357-c4c3-4daa-9a50-a7a20461c680";
const imgIconDelete = "https://www.figma.com/api/mcp/asset/352610b8-1805-4e24-9a5d-cf41eb44d274";

interface LeaderCardProps {
  leader: ClubLeader;
}

function LeaderCard({ leader }: LeaderCardProps) {
  const initial = leader.name.charAt(0).toUpperCase();
  
  return (
    <div className={styles.leaderCard}>
      <div className={styles.avatar}>
        <span className={styles.avatarText}>{initial}</span>
      </div>
      <div className={styles.leaderInfo}>
        <h3 className={styles.leaderName}>{leader.name}</h3>
        <p className={styles.leaderRole}>{leader.role}</p>
        <p className={styles.leaderEmail}>{leader.email || 'No email'}</p>
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

interface EditLeadershipTeamProps {
  leaders: ClubLeader[];
  setLeaders: (value: ClubLeader[]) => void;
}

export default function EditLeadershipTeam({ leaders }: EditLeadershipTeamProps) {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Leadership Team</h2>

      {leaders.length === 0 ? (
        <div className={styles.emptyState}>No leaders assigned yet</div>
      ) : (
        <div className={styles.leadersGrid}>
          {leaders.map((leader, idx) => (
            <LeaderCard key={idx} leader={leader} />
          ))}
        </div>
      )}
    </div>
  );
}









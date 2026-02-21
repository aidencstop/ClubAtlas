'use client';

import styles from './EditLeadershipTeam.module.css';
import { ClubLeader } from '@/lib/api/clubs';

const imgIconEdit = "/images/icons/dashboard/icon-edit.svg";
const imgIconDelete = "/images/icons/dashboard/icon-delete.svg";

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

export default function EditLeadershipTeam({ leaders, setLeaders }: EditLeadershipTeamProps) {
  const handleAddLeader = () => {
    setLeaders([...leaders, { uid: `new-${Date.now()}`, name: '', role: '', email: '' }]);
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Leadership Team</h2>
        <button type="button" className={styles.addButton} onClick={handleAddLeader}>
          + Add Leader
        </button>
      </div>

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









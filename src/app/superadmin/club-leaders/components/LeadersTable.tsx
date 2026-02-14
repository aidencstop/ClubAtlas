'use client';

import { useState, useEffect } from 'react';
import styles from './LeadersTable.module.css';
import EditLeaderModal from './EditLeaderModal';
import { getClubLeaders, deleteClubLeader, ClubLeaderInfo } from '@/lib/api/superadmin';

const imgIconEdit = "https://www.figma.com/api/mcp/asset/5c34b495-2834-4791-b0c0-a8a953f629bb";
const imgIconDelete = "https://www.figma.com/api/mcp/asset/74f3b4d7-5e95-437b-8440-a517548fa2f3";

interface Leader {
  id: string;
  name: string;
  initial: string;
  email: string;
  club: string;
  role: string;
  status: 'ACTIVE' | 'INACTIVE';
}

interface LeadersTableProps {
  key?: number;
}

export default function LeadersTable({ key }: LeadersTableProps) {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);

  useEffect(() => {
    loadLeaders();
  }, []);

  const loadLeaders = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getClubLeaders({ status_filter: 'active' });

      if (response.error) {
        setError(response.error);
        return;
      }

      if (response.data) {
        const mappedLeaders: Leader[] = response.data.leaders.map((leaderInfo: ClubLeaderInfo) => {
          const clubName = leaderInfo.managed_club_names.length > 0
            ? leaderInfo.managed_club_names[0]
            : 'No Club';

          const initial = leaderInfo.display_name
            ? leaderInfo.display_name.charAt(0).toUpperCase()
            : leaderInfo.email.charAt(0).toUpperCase();

          return {
            id: leaderInfo.uid,
            name: leaderInfo.display_name || leaderInfo.email,
            initial: initial,
            email: leaderInfo.email,
            club: clubName,
            role: leaderInfo.role === 'admin' ? 'Admin' : 'President',
            status: leaderInfo.status.toUpperCase() as 'ACTIVE' | 'INACTIVE',
          };
        });

        setLeaders(mappedLeaders);
      }
    } catch (err) {
      console.error('Failed to load leaders:', err);
      setError('Failed to load club leaders');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (leader: Leader) => {
    setSelectedLeader(leader);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedLeader(null);
  };

  const handleEditSuccess = async () => {
    await loadLeaders();
  };

  const handleDelete = async (leaderId: string) => {
    if (!confirm('Are you sure you want to remove this club leader? They will be reverted to student role.')) {
      return;
    }

    try {
      const response = await deleteClubLeader(leaderId);

      if (response.error) {
        alert(`Failed to delete leader: ${response.error}`);
        return;
      }

      alert('Club leader removed successfully');
      await loadLeaders();
    } catch (err) {
      console.error('Failed to delete leader:', err);
      alert('Failed to delete club leader');
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div style={{ padding: '40px 20px', textAlign: 'center', color: '#666' }}>
          Loading club leaders...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div style={{ padding: '40px 20px', textAlign: 'center', color: '#e74c3c' }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <div className={styles.headerCell} style={{ width: '205.5px' }}>Name</div>
        <div className={styles.headerCell} style={{ width: '205.5px' }}>Email</div>
        <div className={styles.headerCell} style={{ width: '131.656px' }}>Club</div>
        <div className={styles.headerCell} style={{ width: '131.672px' }}>Role</div>
        <div className={styles.headerCell} style={{ width: '57.828px' }}>Status</div>
        <div className={styles.headerCell} style={{ width: '57.828px' }}>Actions</div>
      </div>

      <div className={styles.tableBody}>
        {leaders.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#666' }}>
            No active club leaders found.
          </div>
        ) : (
          leaders.map((leader) => (
          <div key={leader.id} className={styles.tableRow}>
            <div className={styles.nameCell} style={{ width: '205.5px' }}>
              <div className={styles.avatar}>
                {leader.initial}
              </div>
              <span className={styles.name}>{leader.name}</span>
            </div>
            
            <div className={styles.emailCell} style={{ width: '205.5px' }}>
              {leader.email}
            </div>
            
            <div className={styles.clubCell} style={{ width: '131.656px' }}>
              {leader.club}
            </div>
            
            <div className={styles.roleCell} style={{ width: '131.672px' }}>
              {leader.role}
            </div>
            
            <div className={styles.statusCell} style={{ width: '57.828px' }}>
              <span className={`${styles.statusBadge} ${styles[leader.status.toLowerCase()]}`}>
                {leader.status}
              </span>
            </div>
            
            <div className={styles.actionsCell} style={{ width: '57.828px' }}>
              <button
                className={styles.actionButton}
                onClick={() => handleEdit(leader)}
                aria-label="Edit"
              >
                <img src={imgIconEdit} alt="Edit" className={styles.actionIcon} />
              </button>
              <button
                className={styles.actionButton}
                onClick={() => handleDelete(leader.id)}
                aria-label="Delete"
              >
                <img src={imgIconDelete} alt="Delete" className={styles.actionIcon} />
              </button>
            </div>
          </div>
          ))
        )}
      </div>

      <EditLeaderModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        leader={selectedLeader}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
}


'use client';

import { useState, useEffect } from 'react';
import styles from './LeadersTable.module.css';
import EditLeaderModal from './EditLeaderModal';
import { getClubLeaders, removeLeaderFromClub, ClubLeaderInfo } from '@/lib/api/superadmin';

const editIcon = "/images/icons/superadmin/club-leaders/edit.svg";
const deleteIcon = "/images/icons/superadmin/club-leaders/delete.svg";

interface Leader {
  id: string;
  rowKey: string;
  name: string;
  initial: string;
  email: string;
  club: string;
  clubId: string;
  role: string;
  status: 'ACTIVE' | 'INACTIVE';
}

interface LeadersTableProps {
  searchQuery?: string;
}

export default function LeadersTable({ searchQuery = '' }: LeadersTableProps) {
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
        const mappedLeaders: Leader[] = response.data.leaders.flatMap((leaderInfo: ClubLeaderInfo) => {
          const initial = leaderInfo.display_name
            ? leaderInfo.display_name.charAt(0).toUpperCase()
            : leaderInfo.email.charAt(0).toUpperCase();

          const clubNames = leaderInfo.managed_club_names.length > 0
            ? leaderInfo.managed_club_names
            : ['No Club'];
          const clubIds = leaderInfo.managed_club_ids.length > 0
            ? leaderInfo.managed_club_ids
            : [''];

          return clubNames.map((clubName, idx) => ({
            id: leaderInfo.uid,
            rowKey: `${leaderInfo.uid}_${clubIds[idx] || clubName}`,
            name: leaderInfo.display_name || leaderInfo.email,
            initial,
            email: leaderInfo.email,
            club: clubName,
            clubId: clubIds[idx] || '',
            role: leaderInfo.role === 'admin' ? 'Admin' : 'President',
            status: leaderInfo.status.toUpperCase() as 'ACTIVE' | 'INACTIVE',
          }));
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

  const handleDelete = async (leaderId: string, clubId: string, clubName: string) => {
    if (!confirm(`Are you sure you want to remove this leader from "${clubName}"? If this is their only club, they will be reverted to student role.`)) {
      return;
    }

    try {
      const response = await removeLeaderFromClub(leaderId, clubId);

      if (response.error) {
        alert(`Failed to remove leader: ${response.error}`);
        return;
      }

      await loadLeaders();
    } catch (err) {
      console.error('Failed to remove leader from club:', err);
      alert('Failed to remove leader from club');
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyMessage} style={{ padding: '40px 20px', textAlign: 'center', color: '#666' }}>
          Loading club leaders...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyMessage} style={{ padding: '40px 20px', textAlign: 'center', color: '#e74c3c' }}>
          {error}
        </div>
      </div>
    );
  }

  const query = searchQuery.toLowerCase();
  const filteredLeaders = query
    ? leaders.filter(
        (l) =>
          l.name.toLowerCase().includes(query) ||
          l.email.toLowerCase().includes(query)
      )
    : leaders;

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
        {filteredLeaders.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#666' }}>
            {query ? 'No leaders found matching your search.' : 'No active club leaders found.'}
          </div>
        ) : (
          filteredLeaders.map((leader) => (
          <div key={leader.rowKey} className={styles.tableRow}>
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
                <img src={editIcon} alt="Edit" className={styles.actionIcon} />
              </button>
              <button
                className={styles.actionButton}
                onClick={() => handleDelete(leader.id, leader.clubId, leader.club)}
                aria-label="Delete"
              >
                <img src={deleteIcon} alt="Delete" className={styles.actionIcon} />
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


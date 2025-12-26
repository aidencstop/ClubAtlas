'use client';

import { useState } from 'react';
import styles from './LeadersTable.module.css';
import EditLeaderModal from './EditLeaderModal';

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

const leadersData: Leader[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    initial: 'S',
    email: 'sarah.j@email.edu',
    club: 'Robotics Club',
    role: 'President',
    status: 'ACTIVE'
  },
  {
    id: '2',
    name: 'Michael Chen',
    initial: 'M',
    email: 'michael.c@email.edu',
    club: 'Photography Club',
    role: 'President',
    status: 'ACTIVE'
  },
  {
    id: '3',
    name: 'Emma Wilson',
    initial: 'E',
    email: 'emma.w@email.edu',
    club: 'Drama Society',
    role: 'President',
    status: 'ACTIVE'
  }
];

export default function LeadersTable() {
  const [leaders, setLeaders] = useState<Leader[]>(leadersData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);

  const handleEdit = (leader: Leader) => {
    setSelectedLeader(leader);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedLeader(null);
  };

  const handleSaveLeader = (updatedLeader: Leader) => {
    setLeaders(prevLeaders => 
      prevLeaders.map(leader => 
        leader.id === updatedLeader.id ? updatedLeader : leader
      )
    );
    console.log('Saved leader:', updatedLeader);
    handleCloseEditModal();
  };

  const handleDelete = (leaderId: string) => {
    console.log('Delete leader:', leaderId);
    // TODO: 실제 삭제 로직
  };

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
        {leaders.map((leader) => (
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
        ))}
      </div>

      <EditLeaderModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        leader={selectedLeader}
        onSave={handleSaveLeader}
      />
    </div>
  );
}


'use client';

import { useState } from 'react';
import styles from './AllClubsTable.module.css';

const imgIcon = "https://www.figma.com/api/mcp/asset/24e4bd95-a117-4a3d-b4b9-c28ca4f3d370";
const imgIconEdit = "https://www.figma.com/api/mcp/asset/76d31b28-0bf6-42e2-b7a3-601f82dbab4d";
const imgIconDelete = "https://www.figma.com/api/mcp/asset/989a250a-757f-40c7-862d-b030d3c86498";

interface Club {
  id: string;
  name: string;
  category: string;
  leader: string;
  members: number;
  status: 'ACTIVE' | 'PENDING';
}

const clubsData: Club[] = [
  {
    id: '1',
    name: 'Robotics Club',
    category: 'STEM',
    leader: 'Sarah Johnson',
    members: 127,
    status: 'ACTIVE'
  },
  {
    id: '2',
    name: 'Photography Club',
    category: 'Arts',
    leader: 'Michael Chen',
    members: 89,
    status: 'ACTIVE'
  },
  {
    id: '3',
    name: 'Drama Society',
    category: 'Arts',
    leader: 'Emma Wilson',
    members: 156,
    status: 'ACTIVE'
  },
  {
    id: '4',
    name: 'AI & ML Club',
    category: 'Tech',
    leader: 'Pending',
    members: 0,
    status: 'PENDING'
  }
];

export default function AllClubsTable() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.filterSection}>
        <div className={styles.searchContainer}>
          <img src={imgIcon} alt="Search" className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search clubs..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select className={styles.dropdown}>
          <option>All Categories</option>
          <option>STEM</option>
          <option>Arts</option>
          <option>Tech</option>
        </select>
        <select className={styles.dropdown}>
          <option>All Status</option>
          <option>Active</option>
          <option>Pending</option>
        </select>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.columnClubName}>Club Name</div>
          <div className={styles.columnCategory}>Category</div>
          <div className={styles.columnLeader}>Leader</div>
          <div className={styles.columnMembers}>Members</div>
          <div className={styles.columnStatus}>Status</div>
          <div className={styles.columnActions}>Actions</div>
        </div>

        <div className={styles.tableBody}>
          {clubsData.map((club) => (
            <div key={club.id} className={styles.tableRow}>
              <div className={styles.columnClubName}>{club.name}</div>
              <div className={styles.columnCategory}>
                <span className={styles.categoryBadge}>{club.category}</span>
              </div>
              <div className={styles.columnLeader}>
                <span className={styles.leaderText}>{club.leader}</span>
              </div>
              <div className={styles.columnMembers}>
                <span className={styles.membersText}>
                  {club.members} subscriber{club.members !== 1 ? 's' : ''}
                </span>
              </div>
              <div className={styles.columnStatus}>
                <span className={`${styles.statusBadge} ${styles[`status${club.status}`]}`}>
                  {club.status}
                </span>
              </div>
              <div className={styles.columnActions}>
                <button className={styles.actionButton}>
                  <img src={club.status === 'ACTIVE' ? imgIconEdit : imgIconEdit} alt="Edit" />
                </button>
                <button className={styles.actionButton}>
                  <img src={imgIconDelete} alt="Delete" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


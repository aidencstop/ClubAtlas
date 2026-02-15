'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getIdToken } from '@/lib/firebase/auth';
import styles from './AllClubsTable.module.css';
import EditClubModal from './EditClubModal';

const imgIcon = "https://www.figma.com/api/mcp/asset/24e4bd95-a117-4a3d-b4b9-c28ca4f3d370";
const imgIconEdit = "https://www.figma.com/api/mcp/asset/76d31b28-0bf6-42e2-b7a3-601f82dbab4d";
const imgIconDelete = "https://www.figma.com/api/mcp/asset/989a250a-757f-40c7-862d-b030d3c86498";

interface Club {
  id: string;
  name: string;
  description?: string;
  categories: string[];
  activity_type: string[];
  leader_name?: string;
  leader_email?: string;
  total_subscribers: number;
  total_events: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}

interface AllClubsResponse {
  clubs: Club[];
  total: number;
  page: number;
  page_size: number;
}

export default function AllClubsTable() {
  const { user } = useAuth();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

  useEffect(() => {
    loadClubs();
  }, [searchQuery, categoryFilter, statusFilter]);

  const loadClubs = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const token = await getIdToken();
      if (!token) return;

      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (categoryFilter) params.append('category', categoryFilter);
      if (statusFilter) params.append('status', statusFilter);
      params.append('page_size', '100');

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/superadmin/clubs?${params.toString()}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data: AllClubsResponse = await response.json();
        setClubs(data.clubs);
      }
    } catch (error) {
      console.error('Failed to load clubs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (club: Club) => {
    setSelectedClub(club);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedClub(null);
  };

  const handleEditSuccess = () => {
    loadClubs();
  };

  const handleDelete = async (clubId: string) => {
    if (!confirm('Are you sure you want to deactivate this club?')) return;

    try {
      const token = await getIdToken();
      if (!token) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/superadmin/clubs/${clubId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert('Club deactivated successfully');
        loadClubs();
      } else {
        alert('Failed to deactivate club');
      }
    } catch (error) {
      console.error('Failed to delete club:', error);
      alert('Failed to deactivate club');
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div style={{ padding: '40px', textAlign: 'center' }}>
          Loading clubs...
        </div>
      </div>
    );
  }

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
        <select 
          className={styles.dropdown}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Academic">Academic</option>
          <option value="Arts">Arts</option>
          <option value="Social">Social</option>
          <option value="Sports">Sports</option>
          <option value="Tech">Tech</option>
        </select>
        <select 
          className={styles.dropdown}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
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
          {clubs.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
              No clubs found
            </div>
          ) : (
            clubs.map((club) => (
              <div key={club.id} className={styles.tableRow}>
                <div className={styles.columnClubName}>{club.name}</div>
                <div className={styles.columnCategory}>
                  <span className={styles.categoryBadge}>
                    {club.categories[0] || 'N/A'}
                  </span>
                </div>
                <div className={styles.columnLeader}>
                  <span className={styles.leaderText}>
                    {club.leader_name || 'No leader'}
                  </span>
                </div>
                <div className={styles.columnMembers}>
                  <span className={styles.membersText}>
                    {club.total_subscribers} subscriber{club.total_subscribers !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className={styles.columnStatus}>
                  <span className={`${styles.statusBadge} ${styles[`status${club.status.toUpperCase()}`]}`}>
                    {club.status.toUpperCase()}
                  </span>
                </div>
                <div className={styles.columnActions}>
                  <button 
                    className={styles.actionButton}
                    onClick={() => handleEdit(club)}
                  >
                    <img src={imgIconEdit} alt="Edit" />
                  </button>
                  <button 
                    className={styles.actionButton}
                    onClick={() => handleDelete(club.id)}
                  >
                    <img src={imgIconDelete} alt="Delete" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedClub && (
        <EditClubModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          club={selectedClub}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
}







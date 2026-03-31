'use client';

import { useState, useEffect } from 'react';
import styles from './StudentsTable.module.css';
import { getStudents, deleteStudent, StudentInfo } from '@/lib/api/superadmin';

const deleteIcon = '/images/icons/superadmin/club-leaders/delete.svg';

interface StudentsTableProps {
  searchQuery?: string;
}

const PAGE_SIZE = 5;

export default function StudentsTable({ searchQuery = '' }: StudentsTableProps) {
  const [students, setStudents] = useState<StudentInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const loadStudents = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getStudents();

      if (response.error) {
        setError(response.error);
        return;
      }

      if (response.data) {
        setStudents(response.data.students);
      }
    } catch (err) {
      console.error('Failed to load students:', err);
      setError('Failed to load students');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div style={{ padding: '40px 20px', textAlign: 'center', color: '#666' }}>
          Loading students...
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

  const query = searchQuery.toLowerCase();
  const filteredStudents = query
    ? students.filter(
        (s) =>
          (s.display_name ?? '').toLowerCase().includes(query) ||
          s.email.toLowerCase().includes(query)
      )
    : students;

  const totalPages = Math.ceil(filteredStudents.length / PAGE_SIZE);
  const pagedStudents = filteredStudents.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (uid: string, displayName: string) => {
    if (!confirm(`Are you sure you want to delete "${displayName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await deleteStudent(uid);

      if (response.error) {
        alert(`Failed to delete student: ${response.error}`);
        return;
      }

      await loadStudents();
    } catch (err) {
      console.error('Failed to delete student:', err);
      alert('Failed to delete student');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <div className={styles.headerCell} style={{ width: '200px' }}>Name</div>
        <div className={styles.headerCell} style={{ width: '280px' }}>Email</div>
        <div className={styles.headerCell} style={{ width: '140px' }}>Subscriptions</div>
        <div className={styles.headerCell} style={{ flex: 1 }}>Joined</div>
        <div className={styles.headerCell} style={{ width: '57px' }}>Actions</div>
      </div>

      <div className={styles.tableBody}>
        {pagedStudents.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#666' }}>
            {query ? 'No students found matching your search.' : 'No students found.'}
          </div>
        ) : (
          pagedStudents.map((student) => {
            const displayName = student.display_name || student.email.split('@')[0];
            const initial = displayName.charAt(0).toUpperCase();
            const joinedDate = student.created_at
              ? new Date(student.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : '—';

            return (
              <div key={student.uid} className={styles.tableRow}>
                <div className={styles.nameCell} style={{ width: '200px' }}>
                  <div className={styles.avatar}>{initial}</div>
                  <span className={styles.name}>{displayName}</span>
                </div>
                <div className={styles.emailCell} style={{ width: '280px' }}>
                  {student.email}
                </div>
                <div className={styles.subsCell} style={{ width: '140px' }}>
                  {student.subscription_count}
                </div>
                <div className={styles.joinedCell} style={{ flex: 1 }}>
                  {joinedDate}
                </div>
                <div className={styles.actionsCell} style={{ width: '57px' }}>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleDelete(student.uid, displayName)}
                    aria-label="Delete"
                  >
                    <img src={deleteIcon} alt="Delete" className={styles.actionIcon} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`${styles.pageButton} ${currentPage === page ? styles.pageButtonActive : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className={styles.pageButton}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

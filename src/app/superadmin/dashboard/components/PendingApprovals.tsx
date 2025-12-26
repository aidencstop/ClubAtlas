'use client';

import { useState } from 'react';
import styles from './PendingApprovals.module.css';
import ApprovalModal from './ApprovalModal';

const imgIcon = "https://www.figma.com/api/mcp/asset/fb1aabda-0955-4216-8cea-d576c532ee60";

interface ApprovalItem {
  title: string;
  subtitle: string;
  timestamp: string;
}

const approvalItems: ApprovalItem[] = [
  {
    title: 'New Club Request',
    subtitle: 'AI & ML Club • john.doe@email.edu',
    timestamp: '2 hours ago'
  },
  {
    title: 'Leader Access Request',
    subtitle: 'Drama Society • jane.smith@email.edu',
    timestamp: '5 hours ago'
  },
  {
    title: 'Club Info Update',
    subtitle: 'Photography Club • alex.kim@email.edu',
    timestamp: '1 day ago'
  }
];

export default function PendingApprovals() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'approve' | 'deny';
    item: ApprovalItem | null;
  }>({
    isOpen: false,
    type: 'approve',
    item: null,
  });

  const handleApprove = (item: ApprovalItem) => {
    setModalState({
      isOpen: true,
      type: 'approve',
      item,
    });
  };

  const handleDeny = (item: ApprovalItem) => {
    setModalState({
      isOpen: true,
      type: 'deny',
      item,
    });
  };

  const handleConfirm = () => {
    // TODO: 실제 승인/거부 API 호출 구현
    console.log(`${modalState.type === 'approve' ? 'Approving' : 'Denying'}:`, modalState.item);
    setModalState({ isOpen: false, type: 'approve', item: null });
  };

  const handleClose = () => {
    setModalState({ isOpen: false, type: 'approve', item: null });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={imgIcon} alt="Pending Approvals" className={styles.headerIcon} />
          <h3 className={styles.title}>Pending Approvals</h3>
          <div className={styles.badge}>3</div>
        </div>
        <div className={styles.list}>
          {approvalItems.map((item, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.itemContent}>
                <h4 className={styles.itemTitle}>{item.title}</h4>
                <p className={styles.itemSubtitle}>{item.subtitle}</p>
                <p className={styles.itemTimestamp}>{item.timestamp}</p>
              </div>
              <div className={styles.actions}>
                <button 
                  className={styles.approveButton}
                  onClick={() => handleApprove(item)}
                >
                  Approve
                </button>
                <button 
                  className={styles.denyButton}
                  onClick={() => handleDeny(item)}
                >
                  Deny
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalState.item && (
        <ApprovalModal
          isOpen={modalState.isOpen}
          onClose={handleClose}
          type={modalState.type}
          title={modalState.item.title}
          subtitle={modalState.item.subtitle}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}


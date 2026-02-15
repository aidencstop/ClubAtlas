'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { logout } from '@/lib/firebase/auth';
import EditProfileModal from '@/components/EditProfileModal';
import { getUnreadCount, getMyNotifications, markNotificationAsRead, markAllNotificationsAsRead, NotificationResponse } from '@/lib/api/notifications';
import styles from './DashboardHeader.module.css';

const imgIcon = "https://www.figma.com/api/mcp/asset/14f424ba-4031-4ab3-b5b4-aca6a8ce9f8f";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/93033ad4-3a1b-4cd2-adbc-b07121312a18";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/ff119992-fa28-430d-a710-ca69f5869f0e";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/1170304d-7665-44bb-811d-db4ebefff5e1";

export default function DashboardHeader() {
  const router = useRouter();
  const { userProfile, isAuthenticated } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadUnreadCount();
    }
  }, [isAuthenticated]);

  const loadUnreadCount = async () => {
    try {
      const response = await getUnreadCount();
      if (response.data && !response.error) {
        setUnreadCount(response.data.unread_count);
      }
    } catch (err) {
      console.error('Failed to load unread count:', err);
    }
  };

  const loadNotifications = async () => {
    try {
      const response = await getMyNotifications({ limit: 10 });
      if (response.data && !response.error) {
        setNotifications(response.data.notifications);
        setUnreadCount(response.data.unread_count);
      }
    } catch (err) {
      console.error('Failed to load notifications:', err);
    }
  };

  const handleNotificationClick = async (notification: NotificationResponse) => {
    if (!notification.is_read) {
      await markNotificationAsRead(notification.id);
      await loadNotifications();
    }

    if (notification.link) {
      router.push(notification.link);
      setShowNotifications(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      await loadNotifications();
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  const toggleNotifications = () => {
    if (!showNotifications) {
      loadNotifications();
    }
    setShowNotifications(!showNotifications);
  };

  const handleViewPublicSite = () => {
    router.push('/student/home');
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <img src={imgIcon} alt="ClubAtlas" className={styles.logoIcon} />
          </div>
        </div>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Leader Dashboard</h1>
          <p className={styles.subtitle}>Robotics Club</p>
        </div>
      </div>
      
      <div className={styles.rightSection}>
        <div className={styles.notificationContainer} ref={notificationRef}>
          <button className={styles.iconButton} onClick={toggleNotifications}>
            <img src={imgIcon1} alt="Notifications" className={styles.icon} />
            {unreadCount > 0 && (
              <span className={styles.notificationBadge}>{unreadCount}</span>
            )}
          </button>
          {showNotifications && (
            <div className={styles.notificationDropdown}>
              <div className={styles.notificationHeader}>
                <h3>Notifications</h3>
                {unreadCount > 0 && (
                  <button 
                    className={styles.markAllReadButton}
                    onClick={handleMarkAllAsRead}
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className={styles.notificationList}>
                {notifications.length === 0 ? (
                  <div className={styles.emptyNotifications}>
                    No notifications yet
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`${styles.notificationItem} ${!notification.is_read ? styles.unread : ''}`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className={styles.notificationContent}>
                        <p className={styles.notificationTitle}>{notification.title}</p>
                        <p className={styles.notificationText}>{notification.content}</p>
                        {notification.club_name && (
                          <span className={styles.notificationClub}>{notification.club_name}</span>
                        )}
                      </div>
                      <div className={styles.notificationTime}>
                        {new Date(notification.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        <button className={styles.textButton} onClick={handleViewPublicSite}>View Public Site</button>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>
            {userProfile?.display_name?.substring(0, 2).toUpperCase() || 'SJ'}
          </div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{userProfile?.display_name || 'Club Leader'}</p>
            <p className={styles.userRole}>President</p>
          </div>
        </div>
        <button className={styles.iconButton} onClick={() => setShowEditModal(true)} title="Settings">
          <img src={imgIcon2} alt="Settings" className={styles.icon} />
        </button>
        <button className={styles.iconButton} onClick={handleLogout} title="Logout">
          <img src={imgIcon3} alt="Logout" className={styles.icon} />
        </button>
      </div>

      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
      />
    </div>
  );
}











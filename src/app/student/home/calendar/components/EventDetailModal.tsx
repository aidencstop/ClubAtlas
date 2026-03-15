'use client';

import { useState, useEffect } from 'react';
import styles from './EventDetailModal.module.css';
import { useAuth } from '@/contexts/AuthContext';
import { attendEvent, cancelAttendance } from '@/lib/api/events';

// 로컬 아이콘 및 이미지 경로
const roboticsImage = "https://www.figma.com/api/mcp/asset/e4e2b0f4-0057-43dc-9d3f-e5ca513f6c4b"; // 클럽 썸네일 이미지 (Figma 유지)
const closeIcon = "/images/icons/calendar/close.svg";
const clockIcon = "/images/icons/calendar/clock.svg";
const locationIcon = "/images/icons/calendar/location2.svg"; // EventDetailModal 전용
const usersIcon = "/images/icons/calendar/users.svg";
const attendanceIcon = "/images/icons/calendar/attendance.svg";
const bellIcon = "/images/icons/calendar/bell.svg";

interface CalendarEvent {
  id: string;
  date: number;
  time: string;
  title: string;
  color: string;
  club_id: string;
  description: string;
  location: string;
  start_datetime: Date;
  attendees?: string[];
}

interface EventDetailModalProps {
  onClose: () => void;
  event: CalendarEvent;
}

export default function EventDetailModal({ onClose, event }: EventDetailModalProps) {
  const { user } = useAuth();
  const [attendanceStatus, setAttendanceStatus] = useState<'planning' | 'checked-in' | 'cannot'>('cannot');
  const [showSavedNotification, setShowSavedNotification] = useState(false);

  useEffect(() => {
    if (user && event.attendees?.includes(user.uid)) {
      setAttendanceStatus('planning');
    } else {
      setAttendanceStatus('cannot');
    }
  }, [event.id, user]);

  const handleAttendanceChange = async (status: 'planning' | 'checked-in' | 'cannot') => {
    const prev = attendanceStatus;
    setAttendanceStatus(status);

    try {
      if (status === 'planning' && prev !== 'planning') {
        await attendEvent(event.id);
      } else if (status === 'cannot' && prev === 'planning') {
        await cancelAttendance(event.id);
      }
    } catch (err) {
      console.error('Failed to update attendance:', err);
      setAttendanceStatus(prev);
      return;
    }

    setShowSavedNotification(true);
    setTimeout(() => {
      setShowSavedNotification(false);
    }, 3000);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* 이미지 헤더 */}
        <div className={styles.imageHeader}>
          <img src={roboticsImage} alt="Robotics Club" className={styles.headerImage} />
          <div className={styles.imageOverlay} />
          <button className={styles.closeButton} onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </button>
          <div className={styles.categoryTag}>
            Academic
          </div>
        </div>

        {/* 콘텐츠 */}
        <div className={styles.contentSection}>
          {/* 제목 */}
          <h1 className={styles.eventTitle}>{event.title}</h1>

          {/* 이벤트 정보 */}
          <div className={styles.infoSection}>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon} style={{ background: 'linear-gradient(135deg, #ffe2e2 0%, #ffedd4 100%)' }}>
                <img src={clockIcon} alt="Time" />
              </div>
              <div className={styles.infoText}>
                <div className={styles.infoLabel}>Time</div>
                <div className={styles.infoValue}>
                  {event.start_datetime.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon} style={{ background: 'linear-gradient(135deg, #ffedd4 0%, #ffe2e2 100%)' }}>
                <img src={locationIcon} alt="Location" />
              </div>
              <div className={styles.infoText}>
                <div className={styles.infoLabel}>Location</div>
                <div className={styles.infoValue}>{event.location}</div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon} style={{ background: 'linear-gradient(135deg, #ffe2e2 0%, #fce7f3 100%)' }}>
                <img src={usersIcon} alt="Attendees" />
              </div>
              <div className={styles.infoText}>
                <div className={styles.infoLabel}>Attendees</div>
                <div className={styles.infoValue}>Check attendance status</div>
              </div>
            </div>
          </div>

          {/* About this event */}
          <div className={styles.aboutSection}>
            <h3 className={styles.sectionTitle}>About this event</h3>
            <p className={styles.description}>{event.description}</p>
          </div>

          {/* Your Attendance */}
          <div className={styles.attendanceSection}>
            <h3 className={styles.sectionTitleWithIcon}>
              <img src={attendanceIcon} alt="Attendance" className={styles.titleIcon} />
              Your Attendance
            </h3>

            <div className={styles.attendanceOptions}>
              <label className={`${styles.radioOption} ${attendanceStatus === 'planning' ? styles.selected : ''}`}>
                <input
                  type="radio"
                  name="attendance"
                  value="planning"
                  checked={attendanceStatus === 'planning'}
                  onChange={() => handleAttendanceChange('planning')}
                  className={styles.radioInput}
                />
                <div className={styles.radioContent}>
                  <div className={styles.radioTitle}>Planning to Attend</div>
                  <div className={styles.radioDescription}>I'm interested and planning to join</div>
                </div>
              </label>

              <label className={`${styles.radioOption} ${attendanceStatus === 'checked-in' ? styles.selected : ''}`}>
                <input
                  type="radio"
                  name="attendance"
                  value="checked-in"
                  checked={attendanceStatus === 'checked-in'}
                  onChange={() => handleAttendanceChange('checked-in')}
                  className={styles.radioInput}
                />
                <div className={styles.radioContent}>
                  <div className={styles.radioTitle}>
                    Checked In
                    {attendanceStatus === 'checked-in' && <span className={styles.checkmark}> ✓</span>}
                  </div>
                  <div className={styles.radioDescription}>I attended this event</div>
                </div>
              </label>

              <label className={`${styles.radioOption} ${attendanceStatus === 'cannot' ? styles.selected : ''}`}>
                <input
                  type="radio"
                  name="attendance"
                  value="cannot"
                  checked={attendanceStatus === 'cannot'}
                  onChange={() => handleAttendanceChange('cannot')}
                  className={styles.radioInput}
                />
                <div className={styles.radioContent}>
                  <div className={styles.radioTitle}>Cannot Attend</div>
                  <div className={styles.radioDescription}>I won't be able to make it</div>
                </div>
              </label>
            </div>

            {/* 저장 알림 */}
            {showSavedNotification && (
              <div className={styles.savedNotification}>
                <span className={styles.checkIcon}>✓</span>
                <span className={styles.notificationText}>Your attendance status has been saved</span>
              </div>
            )}
          </div>

          {/* 액션 버튼 */}
          <div className={styles.actionButtons}>
            <button className={styles.subscribeButton}>
              <img src={bellIcon} alt="Subscribe" className={styles.buttonIcon} />
              Subscribe to Updates
            </button>
            <button className={styles.viewProfileButton}>
              View Club Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


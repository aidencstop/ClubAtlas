'use client';

import { useState, useEffect } from 'react';
import styles from './EventDetailModal.module.css';

// 로컬 아이콘 및 이미지 경로
const roboticsImage = "https://www.figma.com/api/mcp/asset/e4e2b0f4-0057-43dc-9d3f-e5ca513f6c4b"; // 클럽 썸네일 이미지 (Figma 유지)
const closeIcon = "/images/icons/calendar/close.svg";
const clockIcon = "/images/icons/calendar/clock.svg";
const locationIcon = "/images/icons/calendar/location2.svg"; // EventDetailModal 전용
const usersIcon = "/images/icons/calendar/users.svg";
const attendanceIcon = "/images/icons/calendar/attendance.svg";
const bellIcon = "/images/icons/calendar/bell.svg";

interface EventDetailModalProps {
  onClose: () => void;
}

export default function EventDetailModal({ onClose }: EventDetailModalProps) {
  const [attendanceStatus, setAttendanceStatus] = useState<'planning' | 'checked-in' | 'cannot'>('planning');
  const [showSavedNotification, setShowSavedNotification] = useState(false);

  const handleAttendanceChange = (status: 'planning' | 'checked-in' | 'cannot') => {
    setAttendanceStatus(status);
    setShowSavedNotification(true);
    
    // 3초 후 알림 자동으로 사라지게
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
          <h1 className={styles.eventTitle}>Robotics Club</h1>
          <button className={styles.relatedLink}>
            Soccer Team →
          </button>

          {/* 이벤트 정보 */}
          <div className={styles.infoSection}>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon} style={{ background: 'linear-gradient(135deg, #ffe2e2 0%, #ffedd4 100%)' }}>
                <img src={clockIcon} alt="Time" />
              </div>
              <div className={styles.infoText}>
                <div className={styles.infoLabel}>Time</div>
                <div className={styles.infoValue}>Feb 15, 4:00 PM – 5:00 PM</div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon} style={{ background: 'linear-gradient(135deg, #ffedd4 0%, #ffe2e2 100%)' }}>
                <img src={locationIcon} alt="Location" />
              </div>
              <div className={styles.infoText}>
                <div className={styles.infoLabel}>Location</div>
                <div className={styles.infoValue}>502 Classroom</div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon} style={{ background: 'linear-gradient(135deg, #ffe2e2 0%, #fce7f3 100%)' }}>
                <img src={usersIcon} alt="Attendees" />
              </div>
              <div className={styles.infoText}>
                <div className={styles.infoLabel}>Attendees</div>
                <div className={styles.infoValue}>13 students attending</div>
              </div>
            </div>
          </div>

          {/* About this event */}
          <div className={styles.aboutSection}>
            <h3 className={styles.sectionTitle}>About this event</h3>
            <p className={styles.description}>Morning training session.</p>
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


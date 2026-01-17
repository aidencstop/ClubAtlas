'use client';

import { useState, useEffect } from 'react';
import styles from './EventDetailModal.module.css';

// Figma 아이콘 및 이미지 URLs
const roboticsImage = "https://www.figma.com/api/mcp/asset/e4e2b0f4-0057-43dc-9d3f-e5ca513f6c4b";
const closeIcon = "https://www.figma.com/api/mcp/asset/59f79280-b953-4e14-bc7a-a8953c721bd9"; // X 아이콘
const clockIcon = "https://www.figma.com/api/mcp/asset/8304ff5c-d6fe-43aa-9316-b4e289ea10bd";
const locationIcon = "https://www.figma.com/api/mcp/asset/dd63565b-be7e-4df1-901d-7fba6c4d7435";
const usersIcon = "https://www.figma.com/api/mcp/asset/35da646b-9e92-4028-91a8-aee485c44fd9";
const attendanceIcon = "https://www.figma.com/api/mcp/asset/f2c74636-21c1-4193-a03c-402ddc97add6";
const bellIcon = "https://www.figma.com/api/mcp/asset/673eed96-414b-40b4-8570-c909d9469207";

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


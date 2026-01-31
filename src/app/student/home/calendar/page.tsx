'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Calendar.module.css';
import CreateEventModal from './components/CreateEventModal';
import EventDetailModal from './components/EventDetailModal';
import WeekView from './components/WeekView';

// 로컬 아이콘 경로
const viewModeIcon = "/images/icons/calendar/view-mode.svg";
const monthViewIcon = "/images/icons/calendar/month-view.svg";
const weekViewIcon = "/images/icons/calendar/week-view.svg";
const createIcon = "/images/icons/calendar/create.svg";
const prevArrowIcon = "/images/icons/calendar/arrow-left.svg";
const nextArrowIcon = "/images/icons/calendar/arrow-right.svg";
const upcomingIcon = "/images/icons/calendar/upcoming.svg";
const exportIcon = "/images/icons/calendar/export.svg";
const logoIcon = "/images/icons/logo.svg"; // 공용 로고
const searchIcon = "/images/icons/search.svg"; // 공용 검색
const profileIcon = "/images/icons/profile.svg"; // 공용 프로필

// 이벤트 데이터
const eventsData = [
  {
    date: 11,
    time: '2:00',
    title: 'Coding',
    color: '#615fff'
  },
  {
    date: 12,
    time: '3:00',
    title: 'Practice Session',
    color: '#00c950'
  },
  {
    date: 12,
    time: '4:00',
    title: 'Weekly Meeting',
    color: '#2b7fff'
  },
  {
    date: 13,
    time: '5:30',
    title: 'Auditions',
    color: '#ad46ff'
  }
];

const upcomingEvents = [
  {
    date: 'Feb 13',
    time: '3:00 PM',
    club: 'Soccer Club',
    event: 'Practice Session',
    category: 'sports',
    categoryColor: 'linear-gradient(135deg, #4ec27d 0%, #67b89d 100%)'
  },
  {
    date: 'Feb 13',
    time: '4:00 PM',
    club: 'Robotics Club',
    event: 'Weekly Meeting',
    category: 'academic',
    categoryColor: 'linear-gradient(135deg, #7aa4e5 0%, #7f72e4 100%)'
  },
  {
    date: 'Feb 14',
    time: '5:30 PM',
    club: 'Drama Society',
    event: 'Auditions',
    category: 'arts',
    categoryColor: 'linear-gradient(135deg, #a679c6 0%, #db7bb0 100%)'
  }
];

export default function CalendarPage() {
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [currentMonth, setCurrentMonth] = useState('February 2026');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEventDetailModalOpen, setIsEventDetailModalOpen] = useState(false);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysInMonth = Array.from({ length: 28 }, (_, i) => i + 1);

  const getEventsForDate = (date: number) => {
    return eventsData.filter(event => event.date === date);
  };

  const handleEventClick = () => {
    setIsEventDetailModalOpen(true);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Fixed Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/student/home" className={styles.logo}>
            <div className={styles.logoIcon}>
              <img src={logoIcon} alt="ClubAtlas" />
            </div>
            <span className={styles.logoText}>ClubAtlas</span>
          </Link>
          
          <nav className={styles.nav}>
            <Link href="/student/home" className={styles.navLink}>Home</Link>
            <Link href="/student/home/clubs" className={styles.navLink}>Browse Clubs</Link>
            <Link href="/student/home/calendar" className={styles.navLinkActive}>Calendar</Link>
            <Link href="/student/home/ai-recommendations" className={styles.navLink}>AI Recommendations</Link>
            <Link href="/student/home/mypage" className={styles.navLink}>My Page</Link>
          </nav>

          <div className={styles.headerActions}>
            <button className={styles.notificationButton}>
              <img src={searchIcon} alt="Search" width="20" height="20" />
            </button>
            <button className={styles.profileButton}>
              <img src={profileIcon} alt="Profile" width="20" height="20" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className={styles.mainWrapper}>
        <div className={styles.container}>
          {/* Title Section */}
          <div className={styles.titleSection}>
            <h1 className={styles.title}>Club Calendar</h1>
            <p className={styles.subtitle}>
              Stay updated with all club events and activities
            </p>
          </div>

          <div className={styles.contentGrid}>
            {/* Left Sidebar */}
            <div className={styles.sidebar}>
              {/* View Mode Card */}
              <div className={styles.viewModeCard}>
                <div className={styles.cardHeader}>
                  <img src={viewModeIcon} alt="" width="20" height="20" />
                  <h3>View Mode</h3>
                </div>
                <div className={styles.viewModeButtons}>
                  <button 
                    className={`${styles.viewModeButton} ${viewMode === 'month' ? styles.viewModeButtonActive : ''}`}
                    onClick={() => setViewMode('month')}
                  >
                    <img src={monthViewIcon} alt="" width="16" height="16" />
                    Month View
                  </button>
                  <button 
                    className={`${styles.viewModeButton} ${viewMode === 'week' ? styles.viewModeButtonActive : ''}`}
                    onClick={() => setViewMode('week')}
                  >
                    <img src={weekViewIcon} alt="" width="16" height="16" />
                    Week View
                  </button>
                  <button className={styles.createButton} onClick={() => setIsModalOpen(true)}>
                    <img src={createIcon} alt="" width="20" height="20" />
                    Create
                  </button>
                </div>
              </div>

              {/* Export Calendar Button */}
              <button className={styles.exportButton}>
                <img src={exportIcon} alt="" width="20" height="20" />
                Export Calendar
              </button>

              {/* Subscribe Button */}
              <button className={styles.subscribeButton}>
                Subscribe to Calendar
              </button>
            </div>

            {/* Main Calendar Area */}
            <div className={styles.calendarArea}>
              {/* Month Navigation */}
              <div className={styles.monthNavigation}>
                <button className={styles.navButton}>
                  <img src={prevArrowIcon} alt="Previous" width="24" height="24" />
                </button>
                <h2 className={styles.monthTitle}>{currentMonth}</h2>
                <button className={styles.navButton}>
                  <img src={nextArrowIcon} alt="Next" width="24" height="24" />
                </button>
              </div>

              {/* Calendar Grid - Conditional Rendering */}
              {viewMode === 'month' ? (
                <div className={styles.calendarCard}>
                  <div className={styles.calendarHeader}>
                    {daysOfWeek.map(day => (
                      <div key={day} className={styles.dayHeader}>{day}</div>
                    ))}
                  </div>
                  <div className={styles.calendarBody}>
                    {daysInMonth.map(date => {
                      const events = getEventsForDate(date);
                      const isToday = date === 12;
                      
                      return (
                        <div 
                          key={date} 
                          className={`${styles.calendarDay} ${date > 28 ? styles.otherMonth : ''}`}
                        >
                          {isToday ? (
                            <div className={styles.todayBadge}>{date}</div>
                          ) : (
                            <span className={styles.dayNumber}>{date}</span>
                          )}
                          <div className={styles.eventsContainer}>
                            {events.map((event, idx) => (
                              <div 
                                key={idx} 
                                className={styles.eventTag}
                                style={{ backgroundColor: event.color }}
                                onClick={handleEventClick}
                              >
                                {event.time} {event.title}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <WeekView onEventClick={handleEventClick} />
              )}

              {/* Upcoming Events */}
              <div className={styles.upcomingCard}>
                <div className={styles.upcomingHeader}>
                  <img src={upcomingIcon} alt="" width="24" height="24" />
                  <h3>Upcoming This Week</h3>
                </div>
                <div className={styles.upcomingList}>
                  {upcomingEvents.map((event, idx) => (
                    <div key={idx} className={styles.upcomingItem}>
                      <div 
                        className={styles.eventBar}
                        style={{ background: event.categoryColor }}
                      />
                      <div className={styles.eventInfo}>
                        <div className={styles.eventDateTime}>
                          <span className={styles.eventDate}>{event.date}</span>
                          <span className={styles.eventTime}>{event.time}</span>
                        </div>
                        <h4 className={styles.eventClub}>{event.club}</h4>
                        <p className={styles.eventName}>{event.event}</p>
                      </div>
                      <div 
                        className={styles.categoryBadge}
                        style={{ background: event.categoryColor }}
                      >
                        {event.category}
                      </div>
                      <button className={styles.viewClubButton}>View Club</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© 2026 Concord Academy ClubAtlas. Connecting students with their perfect campus communities.</p>
        </div>
      </footer>

      {/* Create Event Modal */}
      <CreateEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Event Detail Modal */}
      {isEventDetailModalOpen && (
        <EventDetailModal onClose={() => setIsEventDetailModalOpen(false)} />
      )}
    </div>
  );
}


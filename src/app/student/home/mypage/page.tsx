'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './MyPage.module.css';

// Figma 아이콘 및 이미지 URLs (최신 디자인 기준)
const logoIcon = "https://www.figma.com/api/mcp/asset/a3f3e789-4132-4ee6-9056-6cac63c80070";
const searchIcon = "https://www.figma.com/api/mcp/asset/3c6776bb-8f0f-41b1-adf7-db0756d1708a";
const bellIcon = "https://www.figma.com/api/mcp/asset/0fdb18a2-0960-40d6-b3ed-97250893724b";
const overviewIcon = "https://www.figma.com/api/mcp/asset/96433dc0-06b1-44e8-bc9f-7652cfcf63a9";
const subscribeIcon = "https://www.figma.com/api/mcp/asset/5feaec16-d673-4ad1-a0e8-7425ba12348e";
const historyIcon = "https://www.figma.com/api/mcp/asset/e54352bc-980e-4373-87ff-30464400b9e2";
const savedIcon = "https://www.figma.com/api/mcp/asset/7e9748b4-79fd-4661-a901-15cdac90f74a";
const settingsIcon = "https://www.figma.com/api/mcp/asset/37d7f7af-7d93-4d09-9fd8-f127ff68ef99";
const clubsFollowingIcon = "https://www.figma.com/api/mcp/asset/c3e9c472-f6ea-4eee-bbb6-721d10c4439a";
const upcomingEventsIcon = "https://www.figma.com/api/mcp/asset/8526ba9b-b6d9-4712-a205-33b92b378f4b";
const eventsAttendedIcon = "https://www.figma.com/api/mcp/asset/b75fd0dc-5929-494e-99a3-42156a88af7e";
const savedClubsIcon = "https://www.figma.com/api/mcp/asset/336474af-d61e-48f9-b80b-42de4d168f05";
const calendarIconBlue = "https://www.figma.com/api/mcp/asset/382d65ad-73da-4bc4-9943-142cb86fffd3";
const clockIcon = "https://www.figma.com/api/mcp/asset/5cde0127-b609-4238-b941-7c6cfba8259a";
const heartIcon = "https://www.figma.com/api/mcp/asset/5fb67623-b0e8-418b-a1ba-989d20404da1";

// 클럽 이미지
const roboticsImage = "https://www.figma.com/api/mcp/asset/4ba38dbe-026b-4fd0-bc00-b3d0131f693c";
const photographyImage = "https://www.figma.com/api/mcp/asset/a186a9fb-03e2-4ba0-aa24-2ce436bc6074";
const debateImage = "https://www.figma.com/api/mcp/asset/8e892fbd-ccf1-4c07-b2a8-e86e1e877f61";

export default function MyPagePage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link href="/student/home" className={styles.logoButton}>
            <div className={styles.logoIcon}>
              <img src={logoIcon} alt="ClubAtlas" />
            </div>
            <span className={styles.logoText}>ClubAtlas</span>
          </Link>

          <nav className={styles.navigation}>
            <Link href="/student/home" className={styles.navLink}>Home</Link>
            <Link href="/student/home/clubs" className={styles.navLink}>Browse Clubs</Link>
            <Link href="/student/home/calendar" className={styles.navLink}>Calendar</Link>
            <Link href="#" className={styles.navLink}>AI Recommendations</Link>
            <Link href="/student/home/mypage" className={`${styles.navLink} ${styles.activeNavLink}`}>My Page</Link>
          </nav>

          <div className={styles.headerActions}>
            <button className={styles.iconButton}>
              <img src={bellIcon} alt="Notifications" />
              <span className={styles.badge}>3</span>
            </button>
            <button className={styles.iconButton}>
              <img src={searchIcon} alt="Search" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainWrapper}>
        <div className={styles.container}>
          {/* Profile Card */}
          <div className={styles.profileCard}>
            <div className={styles.profileContent}>
              <div className={styles.avatar}>
                <span>JD</span>
              </div>
              <div className={styles.profileInfo}>
                <h1 className={styles.profileName}>John Doe</h1>
                <p className={styles.profileDetails}>
                  john.doe@email.edu • Computer Science • Class of 2026
                </p>
                <div className={styles.profileStats}>
                  <div className={styles.statTag} style={{ background: '#eff6ff' }}>
                    <span className={styles.statLabel}>Following:</span>
                    <span className={styles.statValue} style={{ color: '#155dfc' }}>3 clubs</span>
                  </div>
                  <div className={styles.statTag} style={{ background: '#f0fdf4' }}>
                    <span className={styles.statLabel}>Events:</span>
                    <span className={styles.statValue} style={{ color: '#00a63e' }}>3 attended</span>
                  </div>
                  <div className={styles.statTag} style={{ background: '#faf5ff' }}>
                    <span className={styles.statLabel}>Member since:</span>
                    <span className={styles.statValue} style={{ color: '#9810fa' }}>Nov 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className={styles.tabNavigation}>
            <button 
              className={`${styles.tab} ${activeTab === 'overview' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <img src={overviewIcon} alt="" />
              <span>Overview</span>
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'subscribed' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('subscribed')}
            >
              <img src={subscribeIcon} alt="" />
              <span>Subscribed (3)</span>
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'history' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <img src={historyIcon} alt="" />
              <span>History</span>
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'saved' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('saved')}
            >
              <img src={savedIcon} alt="" />
              <span>Saved (3)</span>
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'settings' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <img src={settingsIcon} alt="" />
              <span>Settings</span>
            </button>
          </div>

          {/* Overview Tab Content */}
          {activeTab === 'overview' && (
            <div className={styles.overviewContent}>
              {/* Stats Cards */}
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statCardHeader}>
                    <div className={styles.statIconBlue}>
                      <img src={clubsFollowingIcon} alt="" />
                    </div>
                    <span className={styles.statNumber}>3</span>
                  </div>
                  <p className={styles.statLabel}>Clubs Following</p>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statCardHeader}>
                    <div className={styles.statIconGreen}>
                      <img src={upcomingEventsIcon} alt="" />
                    </div>
                    <span className={styles.statNumber}>3</span>
                  </div>
                  <p className={styles.statLabel}>Upcoming Events</p>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statCardHeader}>
                    <div className={styles.statIconPurple}>
                      <img src={eventsAttendedIcon} alt="" />
                    </div>
                    <span className={styles.statNumber}>12</span>
                  </div>
                  <p className={styles.statLabel}>Events Attended</p>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statCardHeader}>
                    <div className={styles.statIconOrange}>
                      <img src={savedClubsIcon} alt="" />
                    </div>
                    <span className={styles.statNumber}>3</span>
                  </div>
                  <p className={styles.statLabel}>Saved Clubs</p>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className={styles.twoColumnGrid}>
                {/* My Subscribed Clubs */}
                <div className={styles.sectionCard}>
                  <div className={styles.sectionHeader}>
                    <h2>My Subscribed Clubs</h2>
                    <Link href="/student/home/clubs" className={styles.sectionLink}>
                      Browse More →
                    </Link>
                  </div>
                  <div className={styles.clubsList}>
                    {[
                      { name: 'Robotics Club', category: 'ACADEMIC', image: roboticsImage, nextEvent: 'Mon, Nov 27, 4:00 PM' },
                      { name: 'Photography Club', category: 'ARTS', image: photographyImage, nextEvent: 'Thu, Nov 30, 6:00 PM' },
                      { name: 'Debate Team', category: 'ACADEMIC', image: debateImage, nextEvent: 'Wed, Nov 29, 3:00 PM' }
                    ].map((club, index) => (
                      <div key={index} className={styles.subscribedClubCard}>
                        <div className={styles.clubCardContent}>
                          <img src={club.image} alt={club.name} className={styles.clubImage} />
                          <div className={styles.clubInfo}>
                            <span className={styles.clubCategory}>{club.category}</span>
                            <h3 className={styles.clubName}>{club.name}</h3>
                            <div className={styles.clubNextEvent}>
                              <img src={clockIcon} alt="" />
                              <span>Next: {club.nextEvent}</span>
                            </div>
                          </div>
                        </div>
                        <button className={styles.viewProfileButton}>View Profile</button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className={styles.sectionCard}>
                  <div className={styles.sectionHeader}>
                    <h2>Upcoming Events</h2>
                    <Link href="/student/home/calendar" className={styles.sectionLink}>
                      Full Calendar →
                    </Link>
                  </div>
                  <div className={styles.eventsList}>
                    {[
                      { club: 'Robotics Club', title: 'Weekly Meeting', date: 'Mon, Nov 27 • 4:00 PM' },
                      { club: 'Debate Team', title: 'Practice Session', date: 'Wed, Nov 29 • 3:00 PM' },
                      { club: 'Photography Club', title: 'Photo Walk', date: 'Thu, Nov 30 • 6:00 PM' }
                    ].map((event, index) => (
                      <div key={index} className={styles.eventCard}>
                        <div className={styles.eventContent}>
                          <div className={styles.eventIconBlue}>
                            <img src={calendarIconBlue} alt="" />
                          </div>
                          <div className={styles.eventInfo}>
                            <p className={styles.eventClub}>{event.club}</p>
                            <h3 className={styles.eventTitle}>{event.title}</h3>
                            <p className={styles.eventDate}>{event.date}</p>
                          </div>
                        </div>
                        <div className={styles.eventActions}>
                          <button className={styles.viewDetailsButton}>View Details</button>
                          <button className={styles.addToCalendarButton}>Add to Calendar</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommended for You */}
              <div className={styles.recommendedSection}>
                <div className={styles.sectionHeader}>
                  <h2>Recommended for You</h2>
                  <Link href="#" className={styles.sectionLink}>
                    Get More Recommendations →
                  </Link>
                </div>
                <div className={styles.recommendedGrid}>
                  {[
                    { name: 'Robotics Club', image: roboticsImage, match: '88% Match' },
                    { name: 'Photography Club', image: photographyImage, match: '88% Match' },
                    { name: 'Debate Team', image: debateImage, match: '88% Match' }
                  ].map((club, index) => (
                    <div key={index} className={styles.recommendedCard}>
                      <img src={club.image} alt={club.name} className={styles.recommendedImage} />
                      <span className={styles.matchBadge}>{club.match}</span>
                      <h3 className={styles.recommendedName}>{club.name}</h3>
                      <div className={styles.recommendedActions}>
                        <button className={styles.viewButton}>View</button>
                        <button className={styles.heartButton}>
                          <img src={heartIcon} alt="Save" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© 2026 Concord Academy ClubAtlas. Connecting students with their perfect campus communities.</p>
        </div>
      </footer>
    </div>
  );
}


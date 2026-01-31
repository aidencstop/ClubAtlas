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

// Subscribed 탭 아이콘
const checkIcon = "https://www.figma.com/api/mcp/asset/a10af64b-bdf3-48e7-8a33-eb26119adc3c";
const notificationIcon = "https://www.figma.com/api/mcp/asset/e4e15446-57a6-4f70-9168-97347620bfa5";

// History 탭 아이콘
const eventsAttendedIconGreen = "https://www.figma.com/api/mcp/asset/c2603490-f4ff-4e3b-aef5-0e9f27cbd014";
const eventsMissedIconRed = "https://www.figma.com/api/mcp/asset/baa6039f-f018-4afc-9a74-6622527f3228";
const attendanceRateIconBlue = "https://www.figma.com/api/mcp/asset/bfdb0d48-97a6-4933-b834-5d3fd1a8afbc";
const eventCheckIcon = "https://www.figma.com/api/mcp/asset/ea9c1071-7c96-438b-a18c-95d22f4c8d13";
const eventXIcon = "https://www.figma.com/api/mcp/asset/e135f0ff-8493-43ad-aa18-a3944ccca728";

// Saved 탭 아이콘 및 이미지
const removeIcon = "https://www.figma.com/api/mcp/asset/b0bdc92e-b7b4-4a5b-95fe-3bb61fadee36";
const computerScienceImage = "https://www.figma.com/api/mcp/asset/413a64fa-85e4-49b5-8871-247a1a387913";
const makerSpaceImage = "https://www.figma.com/api/mcp/asset/908f2a50-f8c7-40e6-8b8c-1d619f9d8367";
const dramaSocietyImage = "https://www.figma.com/api/mcp/asset/69187ad4-3095-48ad-96fb-fd0afbf85f5a";

// Settings 탭 아이콘
const passwordIcon = "https://www.figma.com/api/mcp/asset/33a04ed2-c07f-4e0b-b3e7-1aa53efb7099";

// 클럽 이미지 (Overview 탭용)
const roboticsImage = "https://www.figma.com/api/mcp/asset/4ba38dbe-026b-4fd0-bc00-b3d0131f693c";
const photographyImage = "https://www.figma.com/api/mcp/asset/a186a9fb-03e2-4ba0-aa24-2ce436bc6074";
const debateImage = "https://www.figma.com/api/mcp/asset/8e892fbd-ccf1-4c07-b2a8-e86e1e877f61";

// 클럽 이미지 (Subscribed 탭용 - 더 큰 사이즈)
const roboticsImageLarge = "https://www.figma.com/api/mcp/asset/2ea62fac-3b99-4b23-8a29-b749e4db2b63";
const photographyImageLarge = "https://www.figma.com/api/mcp/asset/cad04e6a-4e92-4d32-a266-af8cb40da6b0";
const debateImageLarge = "https://www.figma.com/api/mcp/asset/21474162-77bc-4f7c-90a2-637ab7563087";

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
            <Link href="/student/home/ai-recommendations" className={styles.navLink}>AI Recommendations</Link>
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

          {/* Subscribed Tab Content */}
          {activeTab === 'subscribed' && (
            <div className={styles.subscribedContent}>
              {/* Header with Browse More Clubs Button */}
              <div className={styles.subscribedHeader}>
                <div></div>
                <Link href="/student/home/clubs" className={styles.browseMoreButton}>
                  Browse More Clubs
                </Link>
              </div>

              {/* Subscribed Clubs List */}
              <div className={styles.subscribedClubsList}>
                {[
                  {
                    name: 'Robotics Club',
                    category: 'ACADEMIC',
                    image: roboticsImageLarge,
                    description: 'Exploring innovative ideas and building the future of technology through hands-on projects.',
                    nextMeeting: 'Mon, Nov 27, 4:00 PM',
                    emailNotifications: true,
                    memberSince: 'Nov 2024'
                  },
                  {
                    name: 'Photography Club',
                    category: 'ARTS',
                    image: photographyImageLarge,
                    description: 'Exploring innovative ideas and building the future of technology through hands-on projects.',
                    nextMeeting: 'Thu, Nov 30, 6:00 PM',
                    emailNotifications: true,
                    memberSince: 'Nov 2024'
                  },
                  {
                    name: 'Debate Team',
                    category: 'ACADEMIC',
                    image: debateImageLarge,
                    description: 'Exploring innovative ideas and building the future of technology through hands-on projects.',
                    nextMeeting: 'Wed, Nov 29, 3:00 PM',
                    emailNotifications: true,
                    memberSince: 'Nov 2024'
                  }
                ].map((club, index) => (
                  <div key={index} className={styles.subscribedClubCard}>
                    <div className={styles.subscribedClubContent}>
                      <img src={club.image} alt={club.name} className={styles.subscribedClubImage} />
                      <div className={styles.subscribedClubInfo}>
                        <div className={styles.subscribedClubTags}>
                          <span className={styles.categoryTag}>{club.category}</span>
                          <span className={styles.subscribedTag}>Subscribed ✓</span>
                        </div>
                        <h3 className={styles.subscribedClubName}>{club.name}</h3>
                        <p className={styles.subscribedClubDescription}>{club.description}</p>
                        
                        <div className={styles.clubDetailsGrid}>
                          <div className={styles.clubDetail}>
                            <p className={styles.detailLabel}>Next Meeting</p>
                            <p className={styles.detailValue}>{club.nextMeeting}</p>
                          </div>
                          <div className={styles.clubDetail}>
                            <p className={styles.detailLabel}>Email Notifications</p>
                            <div className={styles.detailValueWithIcon}>
                              <img src={checkIcon} alt="" className={styles.checkIcon} />
                              <p className={styles.detailValueEnabled}>Enabled</p>
                            </div>
                          </div>
                          <div className={styles.clubDetail}>
                            <p className={styles.detailLabel}>Member Since</p>
                            <p className={styles.detailValue}>{club.memberSince}</p>
                          </div>
                        </div>

                        <div className={styles.clubActions}>
                          <button className={styles.viewClubProfileButton}>View Club Profile</button>
                          <button className={styles.manageNotificationsButton}>
                            <img src={notificationIcon} alt="" />
                            <span>Manage Notifications</span>
                          </button>
                          <button className={styles.unsubscribeButton}>Unsubscribe</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* History Tab Content */}
          {activeTab === 'history' && (
            <div className={styles.historyContent}>
              {/* Filter Buttons */}
              <div className={styles.historyHeader}>
                <div className={styles.historyFilters}>
                  <button className={styles.filterButtonActive}>All (4)</button>
                  <button className={styles.filterButton}>Attended</button>
                  <button className={styles.filterButton}>Missed</button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className={styles.historyStatsGrid}>
                <div className={styles.historyStatCard}>
                  <div className={styles.historyStatHeader}>
                    <div className={styles.historyStatIconGreen}>
                      <img src={eventsAttendedIconGreen} alt="" />
                    </div>
                    <span className={styles.historyStatNumber}>3</span>
                  </div>
                  <p className={styles.historyStatLabel}>Events Attended</p>
                </div>

                <div className={styles.historyStatCard}>
                  <div className={styles.historyStatHeader}>
                    <div className={styles.historyStatIconRed}>
                      <img src={eventsMissedIconRed} alt="" />
                    </div>
                    <span className={styles.historyStatNumber}>1</span>
                  </div>
                  <p className={styles.historyStatLabel}>Events Missed</p>
                </div>

                <div className={styles.historyStatCard}>
                  <div className={styles.historyStatHeader}>
                    <div className={styles.historyStatIconBlue}>
                      <img src={attendanceRateIconBlue} alt="" />
                    </div>
                    <span className={styles.historyStatNumber}>75%</span>
                  </div>
                  <p className={styles.historyStatLabel}>Attendance Rate</p>
                </div>
              </div>

              {/* Event Timeline */}
              <div className={styles.eventTimeline}>
                <h2 className={styles.eventTimelineTitle}>Event Timeline</h2>
                <div className={styles.eventTimelineList}>
                  {[
                    {
                      club: 'Robotics Club',
                      event: 'Workshop',
                      date: 'Nov 20, 2024',
                      status: 'Attended'
                    },
                    {
                      club: 'Photography Club',
                      event: 'Exhibition',
                      date: 'Nov 15, 2024',
                      status: 'Attended'
                    },
                    {
                      club: 'Robotics Club',
                      event: 'Weekly Meeting',
                      date: 'Nov 13, 2024',
                      status: 'Attended'
                    },
                    {
                      club: 'Debate Team',
                      event: 'Tournament',
                      date: 'Nov 10, 2024',
                      status: 'Missed'
                    }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={item.status === 'Attended' ? styles.eventItemAttended : styles.eventItemMissed}
                    >
                      <div className={styles.eventItemContent}>
                        <div className={item.status === 'Attended' ? styles.eventIconAttended : styles.eventIconMissed}>
                          <img src={item.status === 'Attended' ? eventCheckIcon : eventXIcon} alt="" />
                        </div>
                        <div className={styles.eventItemInfo}>
                          <p className={styles.eventItemClub}>{item.club}</p>
                          <h3 className={styles.eventItemEvent}>{item.event}</h3>
                          <p className={styles.eventItemDate}>{item.date}</p>
                        </div>
                      </div>
                      <div className={item.status === 'Attended' ? styles.eventStatusAttended : styles.eventStatusMissed}>
                        {item.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Saved Tab Content */}
          {activeTab === 'saved' && (
            <div className={styles.savedContent}>
              {/* Header with Get More Recommendations Button */}
              <div className={styles.savedHeader}>
                <div></div>
                <button className={styles.getRecommendationsButton}>Get More Recommendations</button>
              </div>

              {/* Saved Clubs Card */}
              <div className={styles.savedClubsCard}>
                <h2 className={styles.savedClubsTitle}>Saved Clubs</h2>
                <div className={styles.savedClubsList}>
                  {[
                    {
                      name: 'Computer Science Society',
                      category: 'ACADEMIC',
                      match: '88% Match',
                      description: 'Based on your tech interests',
                      image: computerScienceImage
                    },
                    {
                      name: 'Maker Space',
                      category: 'TECH',
                      match: '82% Match',
                      description: 'Similar to clubs you follow',
                      image: makerSpaceImage
                    },
                    {
                      name: 'Drama Society',
                      category: 'ARTS',
                      match: '75% Match',
                      description: 'Explore new interests',
                      image: dramaSocietyImage
                    }
                  ].map((club, index) => (
                    <div key={index} className={styles.savedClubItem}>
                      <div className={styles.savedClubItemContent}>
                        <img src={club.image} alt={club.name} className={styles.savedClubItemImage} />
                        <div className={styles.savedClubItemInfo}>
                          <div className={styles.savedClubItemTags}>
                            <span className={styles.savedClubItemCategory}>{club.category}</span>
                            <span className={styles.savedClubItemMatch}>{club.match}</span>
                          </div>
                          <h3 className={styles.savedClubItemName}>{club.name}</h3>
                          <p className={styles.savedClubItemDescription}>{club.description}</p>
                          <div className={styles.savedClubItemActions}>
                            <button className={styles.viewProfileButtonBlue}>View Profile</button>
                            <button className={styles.subscribeButton}>Subscribe</button>
                          </div>
                        </div>
                      </div>
                      <button className={styles.removeButton}>
                        <img src={removeIcon} alt="Remove" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab Content */}
          {activeTab === 'settings' && (
            <div className={styles.settingsContent}>
              {/* Account Information */}
              <div className={styles.settingsSection}>
                <h2 className={styles.settingsSectionTitle}>Account Information</h2>
                <div className={styles.accountInfoForm}>
                  <div className={styles.formRow}>
                    <div className={styles.formField}>
                      <label className={styles.formLabel}>First Name</label>
                      <input type="text" className={styles.formInput} defaultValue="John" />
                    </div>
                    <div className={styles.formField}>
                      <label className={styles.formLabel}>Last Name</label>
                      <input type="text" className={styles.formInput} defaultValue="Doe" />
                    </div>
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.formLabel}>Email</label>
                    <input type="email" className={styles.formInput} defaultValue="john.doe@email.edu" />
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.formLabel}>Student ID</label>
                    <input type="text" className={`${styles.formInput} ${styles.formInputDisabled}`} defaultValue="STU202301234" disabled />
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.formLabel}>Department / Major</label>
                    <input type="text" className={styles.formInput} defaultValue="Computer Science" />
                  </div>
                  <div className={styles.formActions}>
                    <button className={styles.saveChangesButton}>Save Changes</button>
                  </div>
                </div>
              </div>

              {/* Password & Security */}
              <div className={styles.settingsSection}>
                <h2 className={styles.settingsSectionTitle}>Password & Security</h2>
                <div className={styles.passwordSection}>
                  <div className={styles.passwordInfo}>
                    <div className={styles.passwordIconWrapper}>
                      <img src={passwordIcon} alt="Password" />
                    </div>
                    <div className={styles.passwordDetails}>
                      <p className={styles.passwordTitle}>Password</p>
                      <p className={styles.passwordDate}>Last changed: Nov 15, 2025</p>
                    </div>
                  </div>
                  <button className={styles.changePasswordButton}>Change Password</button>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className={styles.settingsSection}>
                <h2 className={styles.settingsSectionTitle}>Notification Preferences</h2>
                <div className={styles.notificationsList}>
                  <div className={styles.notificationItem}>
                    <div className={styles.notificationInfo}>
                      <p className={styles.notificationTitle}>Email Notifications</p>
                      <p className={styles.notificationDescription}>Receive updates about subscribed clubs</p>
                    </div>
                    <button className={styles.notificationButtonEnabled}>Enabled</button>
                  </div>
                  <div className={styles.notificationItem}>
                    <div className={styles.notificationInfo}>
                      <p className={styles.notificationTitle}>Event Reminders</p>
                      <p className={styles.notificationDescription}>Get reminded about upcoming events</p>
                    </div>
                    <button className={styles.notificationButtonEnabled}>Enabled</button>
                  </div>
                  <div className={styles.notificationItem}>
                    <div className={styles.notificationInfo}>
                      <p className={styles.notificationTitle}>Weekly Digest</p>
                      <p className={styles.notificationDescription}>Receive weekly summary of club activities</p>
                    </div>
                    <button className={styles.notificationButtonDisabled}>Disabled</button>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className={styles.dangerZoneSection}>
                <h2 className={styles.dangerZoneTitle}>Danger Zone</h2>
                <div className={styles.dangerZoneContent}>
                  <div className={styles.dangerZoneInfo}>
                    <p className={styles.dangerZoneActionTitle}>Delete Account</p>
                    <p className={styles.dangerZoneActionDescription}>Permanently delete your account and all associated data</p>
                  </div>
                  <button className={styles.deleteAccountButton}>Delete Account</button>
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


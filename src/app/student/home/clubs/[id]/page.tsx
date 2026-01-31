'use client';

import { use } from 'react';
import Link from 'next/link';
import styles from './ClubProfile.module.css';

// 로컬 아이콘 경로
const logoIcon = "/images/icons/logo.svg"; // 공용 로고
const backArrowIcon = "/images/icons/club-detail/back-arrow.svg";
const usersIcon = "/images/icons/club-detail/users.svg";
const calendarBadgeIcon = "/images/icons/club-detail/calendar-badge.svg";
const shareIcon = "/images/icons/club-detail/share.svg";
const subscribeIcon = "/images/icons/club-detail/subscribe.svg";
const emailSmallIcon = "/images/icons/club-detail/email-small.svg";
const calendarIcon = "/images/icons/club-detail/calendar.svg";
const arrowRightIcon = "/images/icons/club-detail/arrow-right.svg";
const locationIcon = "/images/icons/club-detail/location.svg";
const mapIcon = "/images/icons/club-detail/map.svg";
const attendeesIcon = "/images/icons/club-detail/attendees.svg";
const usersRedIcon = "/images/icons/club-detail/users-red.svg";
const clockBlueIcon = "/images/icons/club-detail/clock-blue.svg";
const contactGreenIcon = "/images/icons/club-detail/contact-green.svg";
const bellIcon = "/images/icons/club-detail/bell.svg";
const emailIcon = "/images/icons/club-detail/email.svg";

// 커멘트 섹션 아이콘 (Figma URL 유지 - 섹션 삭제 예정)
const commentUserIcon = "https://www.figma.com/api/mcp/asset/f2f7159c-e58e-4d36-9276-0170acd5746e";
const starIcon = "https://www.figma.com/api/mcp/asset/f83cd3b3-46b9-407f-8bd4-e88d6f0242e1";

interface ClubProfilePageProps {
  params: Promise<{ id: string }>;
}

export default function ClubProfilePage({ params }: ClubProfilePageProps) {
  const { id } = use(params);

  return (
    <div className={styles.pageWrapper}>
      {/* Fixed Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <img src={logoIcon} alt="ClubAtlas" width="24" height="24" />
            <span className={styles.logoText}>ClubAtlas</span>
          </div>
          <Link href="/student/home/clubs" className={styles.backButton}>
            <img src={backArrowIcon} alt="" width="16" height="16" />
            Back to Browse
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className={styles.mainWrapper}>
        <div className={styles.container}>
          {/* Hero Section */}
          <div className={styles.heroCard}>
            <div className={styles.heroBanner}>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=320&fit=crop" 
                alt="Robotics Club Banner" 
                className={styles.bannerImage}
              />
              <div className={styles.bannerOverlay}></div>
            </div>
            <div className={styles.heroInfo}>
              <div className={styles.heroLeft}>
                <div className={styles.clubIcon}>🤖</div>
                <div className={styles.heroDetails}>
                  <div className={styles.categoryTags}>
                    <span className={styles.categoryTagRed}>STEM</span>
                    <span className={styles.categoryTagBlue}>Academic</span>
                  </div>
                  <h1 className={styles.clubName}>Robotics Club</h1>
                  <p className={styles.clubTagline}>Building the future, one robot at a time</p>
                  <div className={styles.quickMeta}>
                    <div className={styles.metaItem}>
                      <img src={usersIcon} alt="" width="20" height="20" />
                      <span>127 members</span>
                    </div>
                    <div className={styles.metaItem}>
                      <img src={calendarBadgeIcon} alt="" width="20" height="20" />
                      <span>Est. Fall 2020</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.heroActions}>
                <button className={styles.shareButton}>
                  <img src={shareIcon} alt="" width="20" height="20" />
                </button>
                <button className={styles.subscribeButton}>
                  <img src={subscribeIcon} alt="" width="20" height="20" />
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className={styles.contentGrid}>
            {/* Left Column */}
            <div className={styles.leftColumn}>
              {/* Overview Section */}
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2>Overview</h2>
                </div>
                <div className={styles.sectionContent}>
                  <div className={styles.subsection}>
                    <h3 className={styles.subsectionTitle}>
                      <span className={styles.titleDot}></span>
                      Mission & Purpose
                    </h3>
                    <p className={styles.paragraph}>
                      The Robotics Club is dedicated to fostering innovation and technical skills among students interested in robotics, engineering, and automation. We design, build, and program robots for competitions and educational purposes.
                    </p>
                    <p className={styles.paragraph}>
                      Whether you're a beginner or have experience, our club provides hands-on learning opportunities, mentorship, and a collaborative environment to explore the exciting field of robotics. Join us to develop problem-solving skills, work on real-world projects, and connect with like-minded peers.
                    </p>
                  </div>

                  <div className={styles.subsection}>
                    <h3 className={styles.subsectionTitle}>
                      <span className={styles.titleDot}></span>
                      Leadership Team
                    </h3>
                    <div className={styles.leadershipGrid}>
                      {[
                        {initial: 'S', name: 'Sarah Johnson', role: 'President', bio: 'Senior in Mechanical Engineering. Passionate about autonomous systems and robot design.', email: 'sarah.j@email.edu'},
                        {initial: 'M', name: 'Michael Chen', role: 'Vice President', bio: 'Junior in Computer Science. Focus on AI and machine learning for robotics.', email: 'michael.c@email.edu'},
                        {initial: 'E', name: 'Emily Rodriguez', role: 'Technical Lead', bio: 'Senior in Electrical Engineering. Expert in circuit design and embedded systems.', email: 'emily.r@email.edu'},
                        {initial: 'D', name: 'David Kim', role: 'Treasurer', bio: 'Sophomore in Business. Manages club finances and sponsorship relations.', email: 'david.k@email.edu'}
                      ].map((leader, idx) => (
                        <div key={idx} className={styles.leaderCard}>
                          <div className={styles.leaderAvatar}>{leader.initial}</div>
                          <div className={styles.leaderName}>{leader.name}</div>
                          <div className={styles.leaderRole}>{leader.role}</div>
                          <p className={styles.leaderBio}>{leader.bio}</p>
                          <div className={styles.leaderEmail}>
                            <img src={emailSmallIcon} alt="" width="12" height="12" />
                            {leader.email}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Meeting Information Section */}
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2>Meeting Information</h2>
                </div>
                <div className={styles.meetingCards}>
                  <div className={styles.meetingCardBlue}>
                    <h3 className={styles.meetingCardTitle}>
                      <img src={calendarIcon} alt="" width="20" height="20" />
                      Regular Schedule
                    </h3>
                    <div className={styles.meetingInfo}>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Day:</span>
                        <span className={styles.infoValue}>Every Monday</span>
                      </div>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Time:</span>
                        <span className={styles.infoValue}>4:00 PM - 6:00 PM</span>
                      </div>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Duration:</span>
                        <span className={styles.infoValue}>2 hours</span>
                      </div>
                    </div>
                    <button className={styles.meetingButton}>
                      View on Calendar
                      <img src={arrowRightIcon} alt="" width="16" height="16" />
                    </button>
                  </div>

                  <div className={styles.meetingCardGreen}>
                    <h3 className={styles.meetingCardTitle}>
                      <img src={locationIcon} alt="" width="20" height="20" />
                      Meeting Location
                    </h3>
                    <div className={styles.meetingInfo}>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Building:</span>
                        <span className={styles.infoValue}>Engineering Building</span>
                      </div>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Room:</span>
                        <span className={styles.infoValue}>Room 201</span>
                      </div>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Floor:</span>
                        <span className={styles.infoValue}>2nd Floor</span>
                      </div>
                    </div>
                    <button className={styles.meetingButtonGreen}>
                      <img src={mapIcon} alt="" width="16" height="16" />
                      View on Campus Map
                    </button>
                  </div>
                </div>
              </section>

              {/* Past Activities Section */}
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2>Past Activities & Events</h2>
                </div>
                <div className={styles.activitiesList}>
                  {[
                    {date: 'November 2024', title: 'Regional Robotics Competition', description: 'Our team competed in the regional tournament and secured 2nd place with our autonomous navigation robot.', attendees: '12 members'},
                    {date: 'October 2024', title: 'Arduino Workshop Series', description: 'Hosted a 4-week workshop series teaching Arduino programming and circuit design to beginners.', attendees: '25 attendees'},
                    {date: 'September 2024', title: 'Freshman Welcome Event', description: 'Introduced robotics concepts to new students through interactive demos and hands-on activities.', attendees: '40+ students'},
                    {date: 'August 2024', title: 'Summer Robot Build', description: 'Built and programmed a line-following robot for the upcoming competition season.', attendees: '8 members'}
                  ].map((activity, idx) => (
                    <div key={idx} className={styles.activityCard}>
                      <div className={styles.activityImage}></div>
                      <div className={styles.activityContent}>
                        <div className={styles.activityDate}>{activity.date}</div>
                        <h4 className={styles.activityTitle}>{activity.title}</h4>
                        <p className={styles.activityDescription}>{activity.description}</p>
                        <div className={styles.activityAttendees}>
                          <img src={attendeesIcon} alt="" width="16" height="16" />
                          {activity.attendees}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Media Gallery Section */}
              <section className={styles.section}>
                <div className={styles.sectionHeaderOptional}>
                  <h2>Media Gallery</h2>
                  <span className={styles.optionalBadge}>Optional</span>
                </div>
                <div className={styles.sectionContent}>
                  <p className={styles.gallerySubtitle}>Photos, posters, and video thumbnails from club activities</p>
                  <div className={styles.galleryGrid}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => (
                      <div key={idx} className={styles.galleryItem}></div>
                    ))}
                  </div>
                  <button className={styles.viewAllButton}>View All Photos (24)</button>
                </div>
              </section>
            </div>

            {/* Right Column (Sidebar) */}
            <div className={styles.rightColumn}>
              {/* Quick Info */}
              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarTitle}>Quick Info</h3>
                <div className={styles.quickInfoList}>
                  <div className={styles.quickInfoItem}>
                    <div className={styles.quickInfoIconRed}>
                      <img src={usersRedIcon} alt="" width="20" height="20" />
                    </div>
                    <div className={styles.quickInfoContent}>
                      <div className={styles.quickInfoLabel}>Members</div>
                      <div className={styles.quickInfoValue}>127 active members</div>
                    </div>
                  </div>
                  <div className={styles.quickInfoItem}>
                    <div className={styles.quickInfoIconBlue}>
                      <img src={clockBlueIcon} alt="" width="20" height="20" />
                    </div>
                    <div className={styles.quickInfoContent}>
                      <div className={styles.quickInfoLabel}>Established</div>
                      <div className={styles.quickInfoValue}>Fall 2020</div>
                    </div>
                  </div>
                  <div className={styles.quickInfoItem}>
                    <div className={styles.quickInfoIconGreen}>
                      <img src={contactGreenIcon} alt="" width="20" height="20" />
                    </div>
                    <div className={styles.quickInfoContent}>
                      <div className={styles.quickInfoLabel}>Contact</div>
                      <div className={styles.quickInfoValue}>robotics@club.edu</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Get Updates */}
              <div className={styles.updatesCard}>
                <div className={styles.updatesHeader}>
                  <img src={bellIcon} alt="" width="20" height="20" />
                  Get Updates
                </div>
                <div className={styles.updatesContent}>
                  <p className={styles.updatesDescription}>
                    Subscribe to receive email notifications about meetings, events, and club announcements.
                  </p>
                  <div className={styles.updatesForm}>
                    <label className={styles.formLabel}>Email Address</label>
                    <input 
                      type="email" 
                      placeholder="your.email@edu" 
                      className={styles.emailInput}
                    />
                    <button className={styles.subscribeButtonSidebar}>
                      <img src={emailIcon} alt="" width="16" height="16" />
                      Subscribe to Updates
                    </button>
                  </div>
                  <p className={styles.updatesFootnote}>
                    Club-specific subscription • Unsubscribe anytime
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Community Comments */}
          <section className={styles.commentsSection}>
            <div className={styles.commentsHeader}>
              <h2>Community Comments (2)</h2>
            </div>
            <div className={styles.commentsContent}>
              <div className={styles.commentForm}>
                <label className={styles.commentLabel}>Share your thoughts about this club</label>
                <textarea 
                  placeholder="Write a comment... (e.g., your experience, what you learned, why you recommend it)" 
                  className={styles.commentTextarea}
                />
                <div className={styles.commentFormFooter}>
                  <p className={styles.commentNote}>Comments are public and visible to all students</p>
                  <button className={styles.postButton}>Post Comment</button>
                </div>
              </div>

              <div className={styles.commentsList}>
                {[
                  {initial: 'A', name: 'Alex Kim', time: '2 days ago', comment: 'Great club! Learned so much about robotics here.'},
                  {initial: 'M', name: 'Maria Garcia', time: '1 week ago', comment: 'The leadership team is very welcoming. Highly recommend for anyone interested in engineering!'}
                ].map((comment, idx) => (
                  <div key={idx} className={styles.commentCard}>
                    <div className={styles.commentAvatar}>{comment.initial}</div>
                    <div className={styles.commentContent}>
                      <div className={styles.commentHeader}>
                        <span className={styles.commentName}>{comment.name}</span>
                        <span className={styles.commentTime}>{comment.time}</span>
                      </div>
                      <p className={styles.commentText}>{comment.comment}</p>
                      <div className={styles.commentActions}>
                        <button className={styles.commentAction}>Reply</button>
                        <button className={styles.commentAction}>
                          <img src={starIcon} alt="" width="12" height="12" />
                          Mark as Helpful
                        </button>
                        <button className={styles.commentActionReport}>Report</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© 2026 Concord Academy ClubAtlas. Connecting students with their perfect campus communities.</p>
        </div>
      </footer>
    </div>
  );
}


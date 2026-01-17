'use client';

import { use } from 'react';
import Link from 'next/link';
import styles from './ClubProfile.module.css';

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
            <div className={styles.logoIcon}>🗺️</div>
            <span className={styles.logoText}>ClubAtlas</span>
          </div>
          <Link href="/student/home/clubs" className={styles.backButton}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
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
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z"/>
                        <path d="M10 12C4.477 12 0 14.015 0 16.5V20H20V16.5C20 14.015 15.523 12 10 12Z"/>
                      </svg>
                      <span>127 members</span>
                    </div>
                    <div className={styles.metaItem}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM10 18C5.589 18 2 14.411 2 10C2 5.589 5.589 2 10 2C14.411 2 18 5.589 18 10C18 14.411 14.411 18 10 18Z"/>
                        <path d="M11 5H9V11L14 14L15 12.2L11 10V5Z"/>
                      </svg>
                      <span>Est. Fall 2020</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.heroActions}>
                <button className={styles.shareButton}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M15 6C16.657 6 18 4.657 18 3C18 1.343 16.657 0 15 0C13.343 0 12 1.343 12 3C12 3.176 12.014 3.348 12.038 3.518L7.419 6.242C6.861 5.477 5.982 5 5 5C3.343 5 2 6.343 2 8C2 9.657 3.343 11 5 11C5.982 11 6.861 10.523 7.419 9.758L12.038 12.482C12.014 12.652 12 12.824 12 13C12 14.657 13.343 16 15 16C16.657 16 18 14.657 18 13C18 11.343 16.657 10 15 10C14.018 10 13.139 10.477 12.581 11.242L7.962 8.518C7.986 8.348 8 8.176 8 8C8 7.824 7.986 7.652 7.962 7.482L12.581 4.758C13.139 5.523 14.018 6 15 6Z"/>
                  </svg>
                </button>
                <button className={styles.subscribeButton}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 4C2 2.895 2.895 2 4 2H16C17.105 2 18 2.895 18 4V6H2V4ZM2 8H18V16C18 17.105 17.105 18 16 18H4C2.895 18 2 17.105 2 16V8Z"/>
                  </svg>
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
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                              <path d="M2 2H10C10.55 2 11 2.45 11 3V9C11 9.55 10.55 10 10 10H2C1.45 10 1 9.55 1 9V3C1 2.45 1.45 2 2 2Z"/>
                              <path d="M11 3L6 6.5L1 3" stroke="white" strokeWidth="0.5"/>
                            </svg>
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
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 2C4.448 2 4 2.448 4 3V4H3C1.895 4 1 4.895 1 6V16C1 17.105 1.895 18 3 18H17C18.105 18 19 17.105 19 16V6C19 4.895 18.105 4 17 4H16V3C16 2.448 15.552 2 15 2C14.448 2 14 2.448 14 3V4H6V3C6 2.448 5.552 2 5 2Z"/>
                      </svg>
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
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M9 4L13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>

                  <div className={styles.meetingCardGreen}>
                    <h3 className={styles.meetingCardTitle}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 2C6.134 2 3 5.134 3 9C3 13.388 10 20 10 20C10 20 17 13.388 17 9C17 5.134 13.866 2 10 2ZM10 11.5C8.619 11.5 7.5 10.381 7.5 9C7.5 7.619 8.619 6.5 10 6.5C11.381 6.5 12.5 7.619 12.5 9C12.5 10.381 11.381 11.5 10 11.5Z"/>
                      </svg>
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
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 2C4.686 2 2 4.686 2 8C2 11.314 4.686 14 8 14C11.314 14 14 11.314 14 8C14 4.686 11.314 2 8 2Z"/>
                      </svg>
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
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8Z"/>
                            <path d="M8 10C3.582 10 0 11.79 0 14V16H16V14C16 11.79 12.418 10 8 10Z"/>
                          </svg>
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
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 10C12.76 10 15 7.76 15 5C15 2.24 12.76 0 10 0C7.24 0 5 2.24 5 5C5 7.76 7.24 10 10 10ZM10 12C4.477 12 0 14.015 0 16.5V20H20V16.5C20 14.015 15.523 12 10 12Z"/>
                      </svg>
                    </div>
                    <div className={styles.quickInfoContent}>
                      <div className={styles.quickInfoLabel}>Members</div>
                      <div className={styles.quickInfoValue}>127 active members</div>
                    </div>
                  </div>
                  <div className={styles.quickInfoItem}>
                    <div className={styles.quickInfoIconBlue}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0Z"/>
                        <path d="M11 5H9V11L14 14L15 12.2L11 10V5Z" fill="white"/>
                      </svg>
                    </div>
                    <div className={styles.quickInfoContent}>
                      <div className={styles.quickInfoLabel}>Established</div>
                      <div className={styles.quickInfoValue}>Fall 2020</div>
                    </div>
                  </div>
                  <div className={styles.quickInfoItem}>
                    <div className={styles.quickInfoIconGreen}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 4C2 2.895 2.895 2 4 2H16C17.105 2 18 2.895 18 4V6H2V4ZM2 8H18V16C18 17.105 17.105 18 16 18H4C2.895 18 2 17.105 2 16V8Z"/>
                      </svg>
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
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 4C2 2.895 2.895 2 4 2H16C17.105 2 18 2.895 18 4V6H2V4ZM2 8H18V16C18 17.105 17.105 18 16 18H4C2.895 18 2 17.105 2 16V8Z"/>
                  </svg>
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
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M2 3H14C14.55 3 15 3.45 15 4V12C15 12.55 14.55 13 14 13H2C1.45 13 1 12.55 1 12V4C1 3.45 1.45 3 2 3Z"/>
                      </svg>
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
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                            <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z"/>
                          </svg>
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


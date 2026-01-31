'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './BrowseClubs.module.css';

// 로컬 아이콘 경로
const searchIcon = "/images/icons/clubs/search.svg";
const filterIcon = "/images/icons/clubs/filter.svg";
const heartIcon = "/images/icons/clubs/heart.svg";
const clockIcon = "/images/icons/clubs/clock.svg";
const locationIcon = "/images/icons/clubs/location.svg";
const usersIcon1 = "/images/icons/clubs/users.svg"; // Robotics, Photography, Drama
const usersIcon2 = "/images/icons/clubs/users.svg"; // Debate, Chess, Music (같은 아이콘 사용)
const shareIcon = "/images/icons/clubs/share.svg";
const logoIcon = "/images/icons/logo.svg"; // 공용 로고
const headerSearchIcon = "/images/icons/search.svg"; // 공용 검색 아이콘
const profileIcon = "/images/icons/profile.svg"; // 공용 프로필 아이콘

const clubsData = [
  {
    id: 1,
    name: 'Robotics Club',
    category: 'STEM',
    description: 'Building the future with cutting-edge robotics and automation projects',
    day: 'Monday',
    time: '4:00 PM',
    location: 'Engineering Building, Room 201',
    members: 127,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=192&fit=crop'
  },
  {
    id: 2,
    name: 'Photography Club',
    category: 'Arts',
    description: 'Capture moments, develop skills, and share your creative vision with peers',
    day: 'Thursday',
    time: '6:00 PM',
    location: 'Arts Center, Studio 3',
    members: 89,
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=192&fit=crop'
  },
  {
    id: 3,
    name: 'Drama Society',
    category: 'Performance',
    description: 'Express yourself through theater, acting, and stage production',
    day: 'Tuesday',
    time: '5:30 PM',
    location: 'Theater Hall',
    members: 156,
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=192&fit=crop'
  },
  {
    id: 4,
    name: 'Debate Team',
    category: 'Academic',
    description: 'Sharpen your critical thinking and public speaking through competitive debates',
    day: 'Wednesday',
    time: '3:00 PM',
    location: 'Student Center, Room 105',
    members: 45,
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=192&fit=crop'
  },
  {
    id: 5,
    name: 'Chess Club',
    category: 'Strategy',
    description: 'Master the game of kings through practice, tournaments, and friendly matches',
    day: 'Friday',
    time: '4:30 PM',
    location: 'Library Lounge',
    members: 34,
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&h=192&fit=crop'
  },
  {
    id: 6,
    name: 'Music Ensemble',
    category: 'Arts',
    description: 'Create beautiful music together through instrumental and vocal performances',
    day: 'Monday',
    time: '7:00 PM',
    location: 'Music Hall',
    members: 78,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=192&fit=crop'
  }
];

export default function BrowseClubsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDay, setSelectedDay] = useState('All');
  const [selectedTime, setSelectedTime] = useState('All');
  const [selectedCommitment, setSelectedCommitment] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredClubs = clubsData.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || club.category === selectedCategory;
    const matchesDay = selectedDay === 'All' || club.day === selectedDay;
    
    return matchesSearch && matchesCategory && matchesDay;
  });

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
            <Link href="/student/home/clubs" className={styles.navLinkActive}>Browse Clubs</Link>
            <Link href="/student/home/calendar" className={styles.navLink}>Calendar</Link>
            <Link href="/student/home/ai-recommendations" className={styles.navLink}>AI Recommendations</Link>
            <Link href="/student/home/mypage" className={styles.navLink}>My Page</Link>
          </nav>

          <div className={styles.headerActions}>
            <button className={styles.notificationButton}>
              <img src={headerSearchIcon} alt="Search" width="20" height="20" />
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
            <h1 className={styles.title}>Browse Clubs</h1>
            <p className={styles.subtitle}>
              Discover your perfect campus community from {clubsData.length} amazing clubs
            </p>
          </div>

          {/* Search and Filter Card */}
          <div className={styles.searchCard}>
            <div className={styles.searchRow}>
              <div className={styles.searchInputWrapper}>
                <img src={searchIcon} alt="" width="20" height="20" className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search by club name, category, or interest..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              <button 
                className={styles.filterButton}
                onClick={() => setShowFilters(!showFilters)}
              >
                <img src={filterIcon} alt="" width="20" height="20" />
                Filters
              </button>
            </div>

            {showFilters && (
              <div className={styles.filterGrid}>
                <div className={styles.filterItem}>
                  <label className={styles.filterLabel}>Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="All">All Categories</option>
                    <option value="STEM">STEM</option>
                    <option value="Arts">Arts</option>
                    <option value="Performance">Performance</option>
                    <option value="Academic">Academic</option>
                    <option value="Strategy">Strategy</option>
                  </select>
                </div>

                <div className={styles.filterItem}>
                  <label className={styles.filterLabel}>Meeting Day</label>
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className={styles.filterSelectHighlight}
                  >
                    <option value="All">All Days</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                  </select>
                </div>

                <div className={styles.filterItem}>
                  <label className={styles.filterLabel}>Time</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="All">All Times</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>

                <div className={styles.filterItem}>
                  <label className={styles.filterLabel}>Commitment Level</label>
                  <select
                    value={selectedCommitment}
                    onChange={(e) => setSelectedCommitment(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="All">All Levels</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Results Header */}
          <div className={styles.resultsHeader}>
            <p className={styles.resultsCount}>{filteredClubs.length} clubs found</p>
            <select className={styles.sortSelect}>
              <option>Sort by: Relevance</option>
              <option>Sort by: Name</option>
              <option>Sort by: Members</option>
              <option>Sort by: Recently Added</option>
            </select>
          </div>

          {/* Clubs Grid */}
          <div className={styles.clubsGrid}>
            {filteredClubs.map((club) => (
              <div key={club.id} className={styles.clubCard}>
                <div className={styles.clubImageWrapper}>
                  <img src={club.image} alt={club.name} className={styles.clubImage} />
                  <div className={styles.clubImageOverlay}></div>
                  <span className={styles.clubCategory}>{club.category}</span>
                  <button className={styles.favoriteButton}>
                    <img src={heartIcon} alt="" width="20" height="20" />
                  </button>
                  <h3 className={styles.clubName}>{club.name}</h3>
                </div>

                <div className={styles.clubContent}>
                  <p className={styles.clubDescription}>{club.description}</p>

                  <div className={styles.clubMeta}>
                    <div className={styles.metaRow}>
                      <img src={clockIcon} alt="" width="16" height="16" />
                      <span>{club.day}, {club.time}</span>
                    </div>
                    <div className={styles.metaRow}>
                      <img src={locationIcon} alt="" width="16" height="16" />
                      <span>{club.location}</span>
                    </div>
                    <div className={styles.metaRow}>
                      <img src={club.id <= 3 ? usersIcon1 : usersIcon2} alt="" width="16" height="16" />
                      <span>{club.members} members</span>
                    </div>
                  </div>

                  <div className={styles.clubActions}>
                    <Link href={`/student/home/clubs/${club.id}`} className={styles.viewButton}>
                      View Profile
                    </Link>
                    <button className={styles.shareButton}>
                      <img src={shareIcon} alt="Share" width="20" height="20" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className={styles.loadMoreWrapper}>
            <button className={styles.loadMoreButton}>Load More Clubs</button>
          </div>
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


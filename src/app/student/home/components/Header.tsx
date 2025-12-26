'use client';

import Link from 'next/link';
import styles from './Header.module.css';

const logoIcon = "https://www.figma.com/api/mcp/asset/6348a1d4-e9af-4a54-b48b-b72b48b4a9f5";
const searchIcon = "https://www.figma.com/api/mcp/asset/852932b0-4fd8-46b7-971d-27c904703d8c";
const bellIcon = "https://www.figma.com/api/mcp/asset/e347607a-6937-4ec4-bf74-72e82a27dec8";
const profileIcon = "https://www.figma.com/api/mcp/asset/062f01fb-4f88-47ed-9471-b573b8ccb775";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/student/home" className={styles.logoContainer}>
          <div className={styles.logoIcon}>
            <img src={logoIcon} alt="ClubAtlas" />
          </div>
          <span className={styles.logoText}>ClubAtlas</span>
        </Link>

        <nav className={styles.navigation}>
          <Link href="/student/home/clubs" className={styles.navLink}>
            Browse Clubs
          </Link>
          <Link href="/student/home/calendar" className={styles.navLink}>
            Calendar
          </Link>
          <Link href="/student/home/recommendations" className={styles.navLink}>
            AI Recommendations
          </Link>
          <Link href="/student/home/collaborations" className={styles.navLink}>
            Collaborations
          </Link>
          <Link href="/student/mypage" className={styles.navLink}>
            My Page
          </Link>
        </nav>

        <div className={styles.actions}>
          <button className={styles.iconButton} aria-label="Search">
            <img src={searchIcon} alt="Search" />
          </button>
          <button className={styles.iconButton} aria-label="Notifications">
            <img src={bellIcon} alt="Notifications" />
            <span className={styles.notificationDot}></span>
          </button>
          <button className={styles.profileButton} aria-label="Profile">
            <img src={profileIcon} alt="Profile" />
          </button>
        </div>
      </div>
    </header>
  );
}


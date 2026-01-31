'use client';

import Link from 'next/link';
import styles from './Header.module.css';

const logoIcon = "/images/icons/logo.svg";
const searchIcon = "/images/icons/search.svg";
const bellIcon = "/images/icons/bell.svg";
const profileIcon = "/images/icons/profile.svg";

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
          <Link href="/student/home/ai-recommendations" className={styles.navLink}>
            AI Recommendations
          </Link>
          <Link href="/student/home/collaborations" className={styles.navLink}>
            Collaborations
          </Link>
          <Link href="/student/home/mypage" className={styles.navLink}>
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


'use client';

import Link from 'next/link';
import styles from './Header.module.css';

const logoIcon = "https://www.figma.com/api/mcp/asset/b379cb2b-fb4a-4ab2-bfb2-916edaa498ff";
const searchIcon = "https://www.figma.com/api/mcp/asset/351c15c4-0715-4cb3-ac12-2fc82757c5a5";
const bellIcon = "https://www.figma.com/api/mcp/asset/340e4d5e-2a59-468a-bccc-27081a701fd2";
const profileIcon = "https://www.figma.com/api/mcp/asset/e00204ec-bd22-40f5-ad2c-8979aa723275";

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


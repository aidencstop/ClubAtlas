'use client';

import Link from 'next/link';
import styles from './HeroSection.module.css';

const arrowIcon = "https://www.figma.com/api/mcp/asset/a6dd96f1-49f8-4b35-9d67-cde991ad7e57";
const sparklesIcon = "https://www.figma.com/api/mcp/asset/c9458851-23cf-4bdc-b150-3074986ab2c4";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>Discover Your Campus Community</h1>
        <p className={styles.subtitle}>
          Your centralized hub for club discovery, events, and personalized recommendations
        </p>
        <div className={styles.buttons}>
          <Link href="/student/home/clubs" className={styles.primaryButton}>
            <span>Explore Clubs</span>
            <img src={arrowIcon} alt="" />
          </Link>
          <Link href="/student/home/recommendations" className={styles.secondaryButton}>
            <img src={sparklesIcon} alt="" />
            <span>Get AI Recommendations</span>
          </Link>
        </div>
      </div>
    </section>
  );
}






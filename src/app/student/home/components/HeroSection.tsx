'use client';

import Link from 'next/link';
import styles from './HeroSection.module.css';

const arrowIcon = "https://www.figma.com/api/mcp/asset/cb9cdd08-8327-491c-9f38-4096073305ba";
const sparklesIcon = "https://www.figma.com/api/mcp/asset/ff4f0e9e-61b4-4260-8a8b-4fb49f61ce89";

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


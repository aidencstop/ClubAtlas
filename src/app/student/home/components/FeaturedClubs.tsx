'use client';

import Link from 'next/link';
import styles from './FeaturedClubs.module.css';
import ClubCard from './ClubCard';

const arrowIcon = "https://www.figma.com/api/mcp/asset/be0b2b8b-a481-4b56-bdb5-dc45b8621589";

const roboticsImage = "https://www.figma.com/api/mcp/asset/f19d250f-4777-4e93-a829-b8d8a3fb9731";
const photographyImage = "https://www.figma.com/api/mcp/asset/26c28010-3be4-4f44-9eec-b41bdbe5107b";
const dramaImage = "https://www.figma.com/api/mcp/asset/ee5859ec-9a0c-4ae8-9d13-b762ad52e5a9";

const clubs = [
  {
    id: 1,
    name: 'Robotics Club',
    description: 'Building the future with cutting-edge robotics and automation projects',
    category: 'STEM',
    categoryColor: 'rgba(255, 255, 255, 0.9)',
    image: roboticsImage,
    schedule: 'Every Monday 4PM',
    members: '127+ members',
  },
  {
    id: 2,
    name: 'Photography Club',
    description: 'Capture moments, develop skills, and share your creative vision',
    category: 'Arts',
    categoryColor: 'rgba(255, 255, 255, 0.9)',
    image: photographyImage,
    schedule: 'Every Thursday 6PM',
    members: '89+ members',
  },
  {
    id: 3,
    name: 'Drama Society',
    description: 'Express yourself through theater, acting, and stage production',
    category: 'Performance',
    categoryColor: 'rgba(255, 255, 255, 0.9)',
    image: dramaImage,
    schedule: 'Every Tuesday 5:30PM',
    members: '156+ members',
  },
];

export default function FeaturedClubs() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Clubs</h2>
          <Link href="/student/home/clubs" className={styles.viewAllButton}>
            <span>View All</span>
            <img src={arrowIcon} alt="" />
          </Link>
        </div>
        <div className={styles.clubsGrid}>
          {clubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </div>
    </section>
  );
}


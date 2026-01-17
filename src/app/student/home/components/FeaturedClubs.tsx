'use client';

import Link from 'next/link';
import styles from './FeaturedClubs.module.css';
import ClubCard from './ClubCard';

const arrowIcon = "https://www.figma.com/api/mcp/asset/bbb23193-5526-4a19-8739-d5af769dba0d";

const roboticsImage = "https://www.figma.com/api/mcp/asset/adbb5034-2eec-4094-a8b8-60c41e0f8e2c";
const photographyImage = "https://www.figma.com/api/mcp/asset/22444cad-5b6b-4b96-a5c1-0a9e01453064";
const dramaImage = "https://www.figma.com/api/mcp/asset/75f31f36-98bd-4a9c-ac01-9c77b1484f18";

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






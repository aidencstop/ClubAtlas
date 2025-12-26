'use client';

import styles from './PopularClubs.module.css';

interface Club {
  rank: number;
  name: string;
  views: number;
  subscribers: number;
  events: number;
}

const clubsData: Club[] = [
  { rank: 1, name: 'Drama Society', views: 1234, subscribers: 156, events: 12 },
  { rank: 2, name: 'Robotics Club', views: 1089, subscribers: 127, events: 8 },
  { rank: 3, name: 'Photography Club', views: 892, subscribers: 89, events: 6 }
];

export default function PopularClubs() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Popular Clubs</h3>
      <div className={styles.list}>
        {clubsData.map((club) => (
          <div key={club.rank} className={styles.clubItem}>
            <div className={styles.clubInfo}>
              <div className={styles.clubName}>
                {club.rank}. {club.name}
              </div>
              <div className={styles.clubStats}>
                {club.subscribers} subscribers • {club.events} events
              </div>
            </div>
            <div className={styles.views}>
              {club.views} views
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


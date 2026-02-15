'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import styles from './AdminCTA.module.css';

export default function AdminCTA() {
  const { isClubLeader } = useAuth();
  
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.decorCircle1} />
        <div className={styles.decorCircle2} />
        <div className={styles.content}>
          <h2 className={styles.title}>Direct Link to Admin</h2>
          <p className={styles.subtitle}>
            {isClubLeader 
              ? "If you're an admin, please use this button to go to Admin Home."
              : "If you're an admin, please use this button to log in."}
          </p>
          <Link href={isClubLeader ? "/admin/dashboard" : "/admin/login"} className={styles.button}>
            {isClubLeader ? "Admin Home" : "Admin Log In"}
          </Link>
        </div>
      </div>
    </section>
  );
}










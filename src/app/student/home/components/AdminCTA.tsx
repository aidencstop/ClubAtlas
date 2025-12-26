'use client';

import Link from 'next/link';
import styles from './AdminCTA.module.css';

export default function AdminCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.decorCircle1} />
        <div className={styles.decorCircle2} />
        <div className={styles.content}>
          <h2 className={styles.title}>Direct Link to Admin</h2>
          <p className={styles.subtitle}>
            If you&apos;re an admin, please use this button to log in.
          </p>
          <Link href="/admin/login" className={styles.button}>
            Admin Log In
          </Link>
        </div>
      </div>
    </section>
  );
}


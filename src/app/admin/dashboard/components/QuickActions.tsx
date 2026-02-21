'use client';

import Link from 'next/link';
import styles from './QuickActions.module.css';

interface Action {
  icon: string;
  iconBg: string;
  label: string;
  href: string;
}

const actions: Action[] = [
  {
    icon: "/images/icons/dashboard/nav-events.svg",
    iconBg: "#dbeafe",
    label: "Create Event",
    href: "/admin/dashboard/events"
  },
  {
    icon: "/images/icons/dashboard/nav-announcements.svg",
    iconBg: "#f3e8ff",
    label: "New Announcement",
    href: "/admin/dashboard/announcements"
  },
  {
    icon: "/images/icons/dashboard/nav-club-profile.svg",
    iconBg: "#dcfce7",
    label: "Edit Profile",
    href: "/admin/dashboard/profile/edit"
  },
  {
    icon: "/images/icons/dashboard/nav-subscribers.svg",
    iconBg: "#ffedd4",
    label: "View Subscribers",
    href: "/admin/dashboard/subscribers"
  },
];

export default function QuickActions() {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Quick Actions</h3>
      <div className={styles.actions}>
        {actions.map((action, index) => (
          <Link key={index} href={action.href} className={styles.actionButton}>
            <div
              className={styles.actionIconContainer}
              style={{ backgroundColor: action.iconBg }}
            >
              <img src={action.icon} alt={action.label} className={styles.actionIcon} />
            </div>
            <span className={styles.actionLabel}>{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}











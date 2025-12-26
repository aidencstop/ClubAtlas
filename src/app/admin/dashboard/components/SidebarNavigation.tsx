'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './SidebarNavigation.module.css';

const imgIcon = "https://www.figma.com/api/mcp/asset/39b932ab-3677-49ee-bf16-7761fb3eaf68";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/fc0d4d4b-4a7e-4fe6-8212-5138f7f1d0fa";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/f9a0d896-59aa-4f4d-9ac4-b0740537ba8b";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/bd8dee7d-f81d-4b0d-9a07-6c1710716739";
const imgIcon4 = "https://www.figma.com/api/mcp/asset/bc1d3d37-65af-4a05-a651-6c8a1e11cff7";
const imgIcon5 = "https://www.figma.com/api/mcp/asset/c71c1457-508b-4a52-9da5-ac57f1d6967e";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { label: 'Overview', href: '/admin/dashboard', icon: imgIcon },
  { label: 'Club Profile', href: '/admin/dashboard/profile', icon: imgIcon1 },
  { label: 'Events', href: '/admin/dashboard/events', icon: imgIcon2 },
  { label: 'Announcements', href: '/admin/dashboard/announcements', icon: imgIcon3 },
  { label: 'Subscribers', href: '/admin/dashboard/subscribers', icon: imgIcon4 },
  { label: 'Analytics', href: '/admin/dashboard/analytics', icon: imgIcon5 },
];

export default function SidebarNavigation() {
  const pathname = usePathname();

  return (
    <div className={styles.sidebar}>
      <div className={styles.navContainer}>
        <h3 className={styles.navTitle}>Navigation</h3>
        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
              >
                <img src={item.icon} alt={item.label} className={styles.navIcon} />
                <span className={styles.navText}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}



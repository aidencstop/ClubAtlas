'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './SuperAdminSidebar.module.css';

const imgIcon = "https://www.figma.com/api/mcp/asset/5eb471a3-5d78-4e76-9a3f-c18a0af7cb81";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/40203cd5-d124-4dfc-aea1-e3f3c535729f";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/d7279932-1218-424c-bc1f-9115e0eb0801";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/20177107-e79b-4551-af79-81188ba1c610";
const imgIcon4 = "https://www.figma.com/api/mcp/asset/3fd3e8d3-ccac-4390-9e88-05fe7808bf6c";
const imgIcon5 = "https://www.figma.com/api/mcp/asset/4a11b385-6181-49b5-a6e7-7f487b221eb6";
const imgIcon6 = "https://www.figma.com/api/mcp/asset/16fe8b30-d5db-4889-a999-172b3bdf72b7";
const imgIcon7 = "https://www.figma.com/api/mcp/asset/7d34d2eb-6c06-4f33-bc67-4b83bc35f065";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { label: 'Overview', href: '/superadmin/dashboard', icon: imgIcon1 },
  { label: 'All Clubs', href: '/superadmin/all-clubs', icon: imgIcon2 },
  { label: 'Club Leaders', href: '/superadmin/club-leaders', icon: imgIcon3 },
  { label: 'Student Users', href: '/superadmin/student-users', icon: imgIcon4 },
  { label: 'Analytics', href: '/superadmin/analytics', icon: imgIcon5 },
  { label: 'System', href: '/superadmin/system', icon: imgIcon6 },
  { label: 'Password Requests', href: '/superadmin/password-requests', icon: imgIcon7 },
];

interface SuperAdminSidebarProps {
  currentPage?: string;
}

export default function SuperAdminSidebar({ currentPage }: SuperAdminSidebarProps = {}) {
  const pathname = usePathname();

  return (
    <div className={styles.sidebar}>
      <div className={styles.navContainer}>
        <div className={styles.navHeader}>
          <img src={imgIcon} alt="Admin Panel" className={styles.navHeaderIcon} />
          <h3 className={styles.navTitle}>Admin Panel</h3>
        </div>
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


import type { Metadata } from "next";
import './superadmin.css';

export const metadata: Metadata = {
  title: "ClubAtlas - Super Admin",
  description: "System administration and platform management",
};

export default function SuperAdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}


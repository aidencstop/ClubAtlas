import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ClubAtlas - Leader Dashboard",
  description: "Manage your club profile, events, announcements, and engage with subscribers",
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}



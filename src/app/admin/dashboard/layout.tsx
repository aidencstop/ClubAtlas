'use client';

import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ProtectedRoute requireAuth={true} requiredRole="club-leader">
      <div className="admin-layout">
        {children}
      </div>
    </ProtectedRoute>
  );
}



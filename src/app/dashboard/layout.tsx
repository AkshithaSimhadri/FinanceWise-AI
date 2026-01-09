'use client';

import type { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';
import { AnnouncementBar } from '@/components/announcement-bar';

export const dynamic = 'force-dynamic';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <div className="flex flex-col flex-1 bg-secondary">
          {/* Top announcement (optional) */}
          <AnnouncementBar />

          {/* Top header */}
          <AppHeader />

          {/* Page content */}
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
          </main>

          {/* Bottom footer */}
          <AppFooter />
        </div>
      </div>
    </SidebarProvider>
  );
}

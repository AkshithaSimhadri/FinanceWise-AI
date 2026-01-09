'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Skeleton } from '@/components/ui/skeleton';
import { AppHeader } from '@/components/app-header';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const dashboardBgImage = PlaceHolderImages.find(img => img.id === 'dashboard-background');

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
         <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
         </div>
      </div>
    );
  }

  return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full relative">
          {dashboardBgImage && (
            <div className="absolute inset-0 z-0">
              <Image
                src={dashboardBgImage.imageUrl}
                alt={dashboardBgImage.description}
                fill
                style={{ objectFit: 'cover' }}
                className="pointer-events-none"
                data-ai-hint={dashboardBgImage.imageHint}
              />
              <div className="absolute inset-0 bg-background/90 backdrop-blur-sm"></div>
            </div>
          )}
          <div className="relative z-10 flex flex-1">
            <AppSidebar />
            <div className="flex flex-col flex-1">
              <AppHeader />
              <main className="flex-1 p-4 md:p-6 lg:p-8">
                {children}
              </main>
            </div>
          </div>
        </div>
      </SidebarProvider>
  );
}

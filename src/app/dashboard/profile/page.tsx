'use client';

import { ProfileForm } from '@/components/profile/profile-form';

export default function ProfilePage() {
  return (
    <div className="rounded-xl p-4 md:p-6 lg:p-8 -m-4 md:-m-6 lg:-m-8 bg-gradient-to-br from-slate-100 via-gray-100 to-slate-100 bg-[length:400%_400%] animate-subtle-shift dark:from-slate-900/30 dark:via-background dark:to-gray-900/30 h-full">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-fuchsia-500 bg-[length:200%_200%] animate-gradient-shift">
            Profile Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and personal information.
          </p>
        </div>
        <ProfileForm />
      </div>
    </div>
  );
}
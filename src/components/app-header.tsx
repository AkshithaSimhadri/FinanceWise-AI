'use client';

import { useEffect } from 'react';
import { useAuth } from '@/firebase';

export function AppHeader() {
  const auth = useAuth();

  useEffect(() => {
    if (!auth) return;

    const user = auth.currentUser;
    if (!user) return;

    const setAuthHeader = async () => {
      try {
        const token = await user.getIdToken();
        document.cookie = `token=${token}; path=/`;
      } catch (error) {
        console.error('Failed to get auth token:', error);
      }
    };

    setAuthHeader();
  }, [auth]);

  return (
    <header className="flex h-16 items-center px-6 border-b bg-background">
      {/* no title */}
    </header>
  );
}

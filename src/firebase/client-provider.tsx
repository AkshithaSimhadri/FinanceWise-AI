'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({
  children,
}: FirebaseClientProviderProps) {
  const [services, setServices] = useState<ReturnType<
    typeof initializeFirebase
  > | null>(null);

  useEffect(() => {
    // Initialize ONLY on client after mount
    const initialized = initializeFirebase();
    setServices(initialized);
  }, []);

  // While Firebase is initializing, render nothing
  if (!services) {
    return null;
  }

  return (
    <FirebaseProvider
      firebaseApp={services.firebaseApp}
      auth={services.auth}
      firestore={services.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}

'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';

let firebaseApp: FirebaseApp | null = null;

export function initializeFirebase() {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!firebaseConfig?.apiKey || !firebaseConfig?.projectId) {
    return null;
  }

  if (!firebaseApp) {
    firebaseApp = getApps().length
      ? getApp()
      : initializeApp(firebaseConfig);
  }

  return getSdks(firebaseApp);
}

export function getSdks(app: FirebaseApp) {
  return {
    firebaseApp: app,
    auth: getAuth(app),
    firestore: getFirestore(app),
  };
}

/* re-exports (unchanged) */
export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './errors';
export * from './error-emitter';

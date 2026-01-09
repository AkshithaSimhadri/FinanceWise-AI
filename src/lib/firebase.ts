'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let firestore: Firestore | null = null;

function initFirebase() {
  if (typeof window === "undefined") return null;

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  // Abort if config is missing (prevents app/no-options)
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    return null;
  }

  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export function useFirebaseApp() {
  if (!app) app = initFirebase();
  return app;
}

export function useAuth() {
  const firebaseApp = useFirebaseApp();
  if (!firebaseApp) return null;

  if (!auth) auth = getAuth(firebaseApp);
  return auth;
}

export function useFirestore() {
  const firebaseApp = useFirebaseApp();
  if (!firebaseApp) return null;

  if (!firestore) firestore = getFirestore(firebaseApp);
  return firestore;
}


import { initializeApp, getApps, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

let app: App;

// The project ID for your Firebase project.
const FIREBASE_PROJECT_ID = 'monospace-6';

if (getApps().length === 0) {
    // Explicitly initialize the Admin SDK with the correct project ID.
    // This ensures that the 'aud' (audience) claim in ID tokens is validated
    // against the correct project. In App Hosting, GOOGLE_APPLICATION_CREDENTIALS
    // will still be used for authentication, but this guarantees the correct
    // project context.
    app = initializeApp({
        projectId: FIREBASE_PROJECT_ID,
    });
} else {
    app = getApps()[0];
}

const adminAuth = getAuth(app);
const adminFirestore = getFirestore(app);

export function initializeAdminApp() {
  return {
    app,
    auth: adminAuth,
    firestore: adminFirestore,
  };
}


'use server';

import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { revalidatePath } from 'next/cache';

// This file uses the Firebase Admin SDK, which is safe to use in Server Actions.
// We need to initialize it here.
import { initializeAdminApp } from '@/firebase/admin';

type UpdateProfileData = {
  firstName: string;
  lastName: string;
  phone?: string;
  dob?: string;
  bio?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
};

export async function updateUserProfile(
  userId: string,
  data: UpdateProfileData
): Promise<{ success: boolean; error?: string }> {
  try {
    const { auth, firestore } = await initializeAdminApp();

    const userRef = firestore.collection('users').doc(userId);

    // Filter out undefined values
    const updateData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));

    // Update Firestore document
    await userRef.update(updateData);

    // Update Firebase Auth display name and phone number
    await auth.updateUser(userId, {
      displayName: `${data.firstName} ${data.lastName}`,
      phoneNumber: data.phone,
    });

    // Revalidate the path to ensure the UI updates with the new name
    revalidatePath('/dashboard', 'layout');
    revalidatePath('/dashboard/profile');

    return { success: true };
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    return { success: false, error: error.message || 'Failed to update profile.' };
  }
}

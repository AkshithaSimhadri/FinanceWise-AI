'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Landmark } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  RegisterForm,
  type RegisterSchema,
} from '@/components/auth/register-form';
import { useAuth, useFirestore } from '@/firebase';

export default function RegisterPage() {
  const authBgImage = PlaceHolderImages.find(
    (img) => img.id === 'auth-background'
  );

  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (data: RegisterSchema) => {
    if (!auth || !firestore || isSubmitting) return;

    try {
      setIsSubmitting(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const newUser = userCredential.user;

      await updateProfile(newUser, {
        displayName: `${data.firstName} ${data.lastName}`,
      });

      const userRef = doc(firestore, 'users', newUser.uid);
      await setDoc(
        userRef,
        {
          id: newUser.uid,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          registrationDate: new Date().toISOString(),
        },
        { merge: true }
      );

      router.replace('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="w-[350px]">
          <Link href="/" className="flex items-center justify-center gap-2 mb-4">
            <Landmark className="h-8 w-8" />
            <span className="text-3xl font-bold">FinanceWise AI</span>
          </Link>

          <RegisterForm
            onRegister={handleRegister}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>

      {authBgImage && (
        <div className="hidden lg:block relative">
          <Image
            src={authBgImage.imageUrl}
            alt={authBgImage.description}
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}

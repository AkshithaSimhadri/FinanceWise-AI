'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Landmark } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import { LoginForm } from '@/components/auth/login-form';
import { useAuth, useFirestore } from '@/firebase';

export default function LoginPage() {
  const authBgImage = PlaceHolderImages.find(
    (img) => img.id === 'auth-background'
  );

  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailLogin = async (data: { email: string; password: string }) => {
    if (!auth || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.replace('/dashboard');
    } catch (error) {
      console.error('Email login failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!auth || !firestore || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const userRef = doc(firestore, 'users', result.user.uid);
      await setDoc(
        userRef,
        {
          id: result.user.uid,
          email: result.user.email,
          registrationDate: new Date().toISOString(),
        },
        { merge: true }
      );

      router.replace('/dashboard');
    } catch (error) {
      console.error('Google login failed:', error);
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

          <LoginForm
            onEmailLogin={handleEmailLogin}
            onGoogleLogin={handleGoogleLogin}
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

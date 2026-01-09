'use client';

import Link from 'next/link';
import { Landmark, Instagram, Facebook, MessageCircle } from 'lucide-react';

export function AppFooter() {
  return (
    <footer className="w-full mt-auto py-4 px-4 md:px-6 border-t bg-footer text-primary-foreground">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Landmark className="h-5 w-5 text-primary-foreground" />
          <span className="font-bold font-headline text-sm">FinanceWise AI</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-primary-foreground/80">
          <Link href="/about" className="hover:underline hover:text-primary-foreground">About</Link>
          <Link href="/privacy" className="hover:underline hover:text-primary-foreground">Privacy</Link>
          <Link href="/terms" className="hover:underline hover:text-primary-foreground">Terms</Link>
        </div>
        <div className="flex items-center gap-3">
           <Link href="https://wa.me/?text=Check%20out%20FinanceWise%20AI!" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-primary-foreground">
            <MessageCircle className="h-4 w-4" />
            <span className="sr-only">WhatsApp</span>
          </Link>
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-primary-foreground">
            <Instagram className="h-4 w-4" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-primary-foreground">
            <Facebook className="h-4 w-4" />
            <span className="sr-only">Facebook</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

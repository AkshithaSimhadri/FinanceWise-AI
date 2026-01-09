
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit } from 'lucide-react';
import { motivationalQuotes } from '@/lib/motivations';

export function MotivationCard() {
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(
    null
  );

  useEffect(() => {
    // Select a quote based on the day of the year to ensure it's the same for the whole day
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const quoteIndex = dayOfYear % motivationalQuotes.length;
    setQuote(motivationalQuotes[quoteIndex]);
  }, []);

  return (
    <div className="relative group overflow-hidden rounded-lg">
      <div
        className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-border-spin"
      ></div>
      <Card className="relative bg-gradient-to-br from-purple-800 via-pink-700 to-orange-600 bg-[length:200%_200%] animate-subtle-shift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <BrainCircuit /> Daily Motivation
          </CardTitle>
        </CardHeader>
        <CardContent>
          {quote ? (
            <figure>
              <blockquote className="border-l-4 border-yellow-400/50 pl-4 italic text-white/90">
                "{quote.text}"
              </blockquote>
              <figcaption className="mt-2 text-right text-sm font-semibold text-white">
                - {quote.author}
              </figcaption>
            </figure>
          ) : (
            <p className="text-white">Loading your daily dose of motivation...</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

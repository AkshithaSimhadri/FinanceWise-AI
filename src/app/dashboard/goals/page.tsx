
'use client';

import { GoalCard } from '@/components/goals/goal-card';
import { AddGoalDialog } from '@/components/goals/add-goal-dialog';
import type { FinancialGoal } from '@/lib/types';
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';

function EmptyState() {
  return (
    <div className="text-center py-12 px-6 rounded-lg border-2 border-dashed">
      <Target className="mx-auto h-12 w-12 text-muted-foreground" />
      <h2 className="mt-4 text-xl font-semibold">No Goals Yet</h2>
      <p className="mt-2 text-muted-foreground">
        It looks like you haven't set any financial goals. Get started by adding one.
      </p>
      <div className="mt-6">
        <AddGoalDialog />
      </div>
    </div>
  );
}

export default function GoalsPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const goalsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, 'users', user.uid, 'financial_goals');
  }, [user, firestore]);

  const { data: goals, isLoading } = useCollection<FinancialGoal>(goalsQuery);

  return (
    <div className="rounded-xl p-4 md:p-6 lg:p-8 -m-4 md:-m-6 lg:-m-8 bg-gradient-to-br from-yellow-100 via-amber-100 to-yellow-100 bg-[length:400%_400%] animate-subtle-shift dark:from-yellow-900/30 dark:via-background dark:to-amber-900/30 h-full">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-fuchsia-500 bg-[length:200%_200%] animate-gradient-shift">Financial Goals</h1>
            <p className="text-muted-foreground">
              Track your progress towards your dreams.
            </p>
          </div>
          <AddGoalDialog />
        </div>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        ) : goals && goals.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

'use client';

import { useGoals } from '@/context/goal-context';
import { GoalCard } from '@/components/goals/goal-card';
import { AddGoalDialog } from '@/components/goals/add-goal-dialog';

export default function GoalsPage() {
  const { goals, addGoal } = useGoals();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Financial Goals</h1>
          <p className="text-muted-foreground">
            Track your progress towards your dreams.
          </p>
        </div>
        <AddGoalDialog onAddGoal={addGoal} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
}

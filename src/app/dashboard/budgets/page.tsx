'use client';

export const dynamic = 'force-dynamic';

import { BudgetingForm } from "@/components/budgets/budgeting-form";

export default function BudgetsPage() {
  return (
    <div className="rounded-xl p-4 md:p-6 lg:p-8 -m-4 md:-m-6 lg:-m-8 bg-gradient-to-br from-green-100 via-lime-100 to-green-100 bg-[length:400%_400%] animate-subtle-shift dark:from-green-900/30 dark:via-background dark:to-lime-900/30 h-full">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-fuchsia-500 bg-[length:200%_200%] animate-gradient-shift">
            Budget Planner
          </h1>
          <p className="text-muted-foreground">
            Generate a budget plan based on your financial habits.
          </p>
        </div>
        <BudgetingForm />
      </div>
    </div>
  );
}

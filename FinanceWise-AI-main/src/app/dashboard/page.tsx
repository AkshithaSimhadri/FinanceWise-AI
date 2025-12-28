'use client';

import { DollarSign, TrendingUp, TrendingDown, Landmark } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { GoalCard } from "@/components/goals/goal-card";
import { AddGoalDialog } from "@/components/goals/add-goal-dialog";
import { useGoals } from "@/context/goal-context";

export default function DashboardPage() {
  const { goals, addGoal } = useGoals();

  return (
    <div className="flex-1 space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard 
                title="Total Balance"
                value="$7,345.67"
                icon={Landmark}
                change="+20.1%"
                changeType="positive"
            />
            <StatCard 
                title="Total Income"
                value="$5,750.00"
                icon={TrendingUp}
                change="+10.5%"
                changeType="positive"
            />
            <StatCard 
                title="Total Expenses"
                value="$2,120.30"
                icon={TrendingDown}
                change="+5.2%"
                changeType="negative"
            />
            <StatCard 
                title="Savings Rate"
                value="28%"
                icon={DollarSign}
                change="-1.2%"
                changeType="negative"
            />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="lg:col-span-4">
                <OverviewChart />
            </div>
            <div className="lg:col-span-3">
                <RecentTransactions />
            </div>
        </div>
         <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Financial Goals</h2>
            <AddGoalDialog onAddGoal={addGoal} />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </div>
    </div>
  );
}

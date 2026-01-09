"use client";

import { useState, useMemo } from "react";
import { UploadForm } from "@/components/upload/upload-form";
import type { ExtractedTransaction, Expense, Income } from "@/lib/types";

import { DollarSign, TrendingUp, TrendingDown, Landmark, ArrowLeft } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { Button } from "../ui/button";
import { UploadHistory } from "./upload-history";
import { useUser } from "@/firebase"; // <-- import user hook

type ViewState = 'form' | 'history' | 'analysis';

export function UploadDashboard() {
  const { user } = useUser(); // <-- get logged-in user
  const [view, setView] = useState<ViewState>('form');
  const [analyzedTransactions, setAnalyzedTransactions] = useState<ExtractedTransaction[] | null>(null);

  const { totalIncome, totalExpenses, totalBalance, savingsRate, incomes, expenses } = useMemo(() => {
    if (!analyzedTransactions || !user) {
      return { totalIncome: 0, totalExpenses: 0, totalBalance: 0, savingsRate: 0, incomes: [], expenses: [] };
    }

    // Map incomes with userId from logged-in user
    const incs: Income[] = analyzedTransactions
      .filter(t => t.type === 'income')
      .map(t => ({
        id: Math.random().toString(),
        userId: user.uid, // <-- use logged-in user ID
        date: t.date,
        amount: t.amount,
        category: t.category,
        source: t.description || "No source",
        description: t.description, // optional if you want to keep it
      }));

    // Map expenses with userId from logged-in user
    const exps: Expense[] = analyzedTransactions
      .filter(t => t.type === 'expense')
      .map(t => ({
        id: Math.random().toString(),
        userId: user.uid, // <-- use logged-in user ID
        date: t.date,
        amount: t.amount,
        category: t.category,
        description: t.description || "No description",
      }));

    const income = incs.reduce((sum, item) => sum + item.amount, 0);
    const expense = exps.reduce((sum, item) => sum + item.amount, 0);
    const balance = income - expense;
    const rate = income > 0 ? ((balance / income) * 100) : 0;

    return {
      totalIncome: income,
      totalExpenses: expense,
      totalBalance: balance,
      savingsRate: rate,
      incomes: incs,
      expenses: exps,
    };
  }, [analyzedTransactions, user]);
  
  const handleReset = () => {
    setAnalyzedTransactions(null);
    setView('form');
  }

  const handleUploadSuccess = (transactions: ExtractedTransaction[]) => {
    setAnalyzedTransactions(transactions);
    setView('analysis');
  }

  const handleViewHistory = () => {
    setView('history');
  }

  const handleViewAnalysis = (transactions: ExtractedTransaction[]) => {
    setAnalyzedTransactions(transactions);
    setView('analysis');
  }

  if (view === 'analysis') {
    return (
       <div className="flex-1 space-y-4">
        <div className="flex justify-start">
            <Button variant="outline" onClick={handleReset}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Upload
            </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard 
                title="Total Balance"
                value={totalBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                icon={Landmark}
            />
            <StatCard 
                title="Total Income"
                value={totalIncome.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                icon={TrendingUp}
            />
            <StatCard 
                title="Total Expenses"
                value={totalExpenses.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                icon={TrendingDown}
            />
            <StatCard 
                title="Savings Rate"
                value={`${savingsRate.toFixed(1)}%`}
                icon={DollarSign}
            />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="lg:col-span-4">
                <OverviewChart incomes={incomes} expenses={expenses} isLoading={false} />
            </div>
            <div className="lg:col-span-3">
                <RecentTransactions expenses={expenses} incomes={incomes} isLoading={false} />
            </div>
        </div>
    </div>
    )
  }

  if (view === 'history') {
    return <UploadHistory onViewAnalysis={handleViewAnalysis} onBack={() => setView('form')} />;
  }

  return (
    <div className="space-y-8">
      <UploadForm onUploadSuccess={handleUploadSuccess} onViewHistory={handleViewHistory} />
    </div>
  );
}

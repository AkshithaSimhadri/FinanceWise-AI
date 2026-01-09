
"use client";

import { useState, useMemo }from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Loader2 } from "lucide-react";
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection } from 'firebase/firestore';
import type { Income, Expense } from '@/lib/types';
import { format, subMonths, addMonths } from 'date-fns';

const chartConfig = {
    expenses: {
        label: "Expenses",
        color: "hsl(var(--chart-2))",
    },
    savings: {
        label: "Savings",
        color: "hsl(var(--chart-1))",
    },
};

type ForecastItem = {
    month: string;
    expenses: number;
    savings: number;
};

export function ForecastingForm() {
  const [forecast, setForecast] = useState<ForecastItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useUser();
  const firestore = useFirestore();

  const incomesQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, 'users', user.uid, 'incomes');
  }, [user, firestore]);

  const expensesQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, 'users', user.uid, 'expenses');
  }, [user, firestore]);

  const { data: incomes, isLoading: isLoadingIncomes } = useCollection<Income>(incomesQuery);
  const { data: expenses, isLoading: isLoadingExpenses } = useCollection<Expense>(expensesQuery);

  const { avgMonthlyIncome, avgMonthlyExpenses } = useMemo(() => {
      if (!incomes || !expenses) return { avgMonthlyIncome: 0, avgMonthlyExpenses: 0 };
      const now = new Date();
      const threeMonthsAgo = subMonths(now, 3);
      
      const recentIncomes = incomes.filter(i => new Date(i.date) > threeMonthsAgo);
      const recentExpenses = expenses.filter(e => new Date(e.date) > threeMonthsAgo);

      const totalRecentIncome = recentIncomes.reduce((sum, i) => sum + i.amount, 0);
      const totalRecentExpenses = recentExpenses.reduce((sum, e) => sum + e.amount, 0);
      
      // Use 3 months for average, or 1 if data is less than 3 months old
      const monthsOfData = Math.max(1, 3); 

      return {
          avgMonthlyIncome: totalRecentIncome / monthsOfData,
          avgMonthlyExpenses: totalRecentExpenses / monthsOfData,
      }
  }, [incomes, expenses]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setForecast(null);

    if (avgMonthlyIncome === 0 && avgMonthlyExpenses === 0) {
        setError("Not enough transaction data to generate a forecast. Please add more income and expenses.");
        setLoading(false);
        return;
    }

    const forecastData: ForecastItem[] = [];
    const today = new Date();

    for (let i = 1; i <= 6; i++) {
        const futureMonth = addMonths(today, i);
        forecastData.push({
            month: format(futureMonth, 'MMM yyyy'),
            expenses: avgMonthlyExpenses,
            savings: Math.max(0, avgMonthlyIncome - avgMonthlyExpenses)
        });
    }
    
    setForecast(forecastData);
    setLoading(false);
  };
  
  const isDataLoading = isLoadingIncomes || isLoadingExpenses;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Financial Forecasting</CardTitle>
          <CardDescription>
            Project your future expenses and savings for the next 6 months based on your recent transaction history.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Button onClick={handleSubmit} disabled={loading || isDataLoading}>
                {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Forecasting...
                </>
                ) : isDataLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading Data...
                </>
                ) : (
                <>
                    <AreaChart className="mr-2 h-4 w-4" />
                    Forecast My Finances
                </>
                )}
            </Button>        
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive">
          <CardHeader><CardTitle className="text-destructive">An Error Occurred</CardTitle></CardHeader>
          <CardContent><p>{error}</p></CardContent>
        </Card>
      )}

      {forecast && (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>6-Month Forecast</CardTitle>
                    <CardDescription>Based on your average spending and income over the last 3 months.</CardDescription>
                </CardHeader>
                <CardContent>
                   <ChartContainer config={chartConfig} className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart data={forecast}>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value.toLocaleString()}`} />
                                <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent />} />
                                <Legend />
                                <Bar dataKey="expenses" name="Expenses" fill="var(--color-expenses)" radius={4} />
                                <Bar dataKey="savings" name="Savings" fill="var(--color-savings)" radius={4} />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
}

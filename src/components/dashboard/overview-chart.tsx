
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Expense, Income } from "@/lib/types";
import { useMemo } from "react";
import { Skeleton } from "../ui/skeleton";
import { format, subMonths, getYear, getMonth } from 'date-fns';

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
}

type OverviewChartProps = {
  incomes: Income[];
  expenses: Expense[];
  isLoading: boolean;
};

export function OverviewChart({ incomes, expenses, isLoading }: OverviewChartProps) {

  const chartData = useMemo(() => {
    const dataByMonth: { [key: string]: { income: number; expenses: number } } = {};
    const today = new Date();

    // 1. Generate keys for the last 6 months
    for (let i = 5; i >= 0; i--) {
        const date = subMonths(today, i);
        const monthKey = format(date, 'MMM yyyy');
        if (!dataByMonth[monthKey]) {
            dataByMonth[monthKey] = { income: 0, expenses: 0 };
        }
    }
    
    // 2. Process incomes and expenses
    incomes.forEach(t => {
      const transactionDate = new Date(t.date);
      const monthKey = format(transactionDate, 'MMM yyyy');
      if (dataByMonth.hasOwnProperty(monthKey)) {
        dataByMonth[monthKey].income += t.amount;
      }
    });

    expenses.forEach(t => {
        const transactionDate = new Date(t.date);
        const monthKey = format(transactionDate, 'MMM yyyy');
        if (dataByMonth.hasOwnProperty(monthKey)) {
          dataByMonth[monthKey].expenses += t.amount;
        }
      });
    
    // 3. Format data for the chart, ensuring chronological order
    return Object.keys(dataByMonth)
      .map(key => ({
        month: key.split(' ')[0], // 'MMM' part
        year: key.split(' ')[1],
        ...dataByMonth[key]
      }))
      .sort((a, b) => new Date(`${a.month} 1, ${a.year}`).getTime() - new Date(`${b.month} 1, ${b.year}`).getTime());

  }, [incomes, expenses]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>Your income and expenses for the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[300px] w-full" />
        ) : (
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                  />
                  <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={10}
                      tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip
                      cursor={{ fill: 'hsl(var(--muted))' }}
                      content={<ChartTooltipContent />}
                  />
                  <Legend />
                  <Bar dataKey="income" fill="var(--color-income)" name="Income" radius={4} />
                  <Bar dataKey="expenses" fill="var(--color-expenses)" name="Expenses" radius={4} />
              </BarChart>
              </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}

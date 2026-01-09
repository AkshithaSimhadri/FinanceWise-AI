
'use client';

import { TransactionsTable } from '@/components/transactions/transactions-table';
import { AddTransactionSheet } from '@/components/transactions/add-transaction-sheet';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Expense, Income } from '@/lib/types';
import { ArrowRightLeft } from 'lucide-react';

function EmptyState() {
  return (
    <div className="text-center py-12 px-6 rounded-lg border-2 border-dashed">
        <ArrowRightLeft className="mx-auto h-12 w-12 text-muted-foreground" />
        <h2 className="mt-4 text-xl font-semibold">No Transactions Found</h2>
        <p className="mt-2 text-muted-foreground">
            Get started by adding your first income or expense.
        </p>
        <div className="mt-6">
            <AddTransactionSheet />
        </div>
    </div>
  );
}

export default function TransactionsPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const expensesQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, 'users', user.uid, 'expenses');
  }, [user, firestore]);

  const incomesQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, 'users', user.uid, 'incomes');
  }, [user, firestore]);

  const { data: expenses, isLoading: isLoadingExpenses } = useCollection<Expense>(expensesQuery);
  const { data: incomes, isLoading: isLoadingIncomes } = useCollection<Income>(incomesQuery);
  
  const transactions = [
    ...(incomes || []).map(item => ({ ...item, type: 'income' as const })),
    ...(expenses || []).map(item => ({ ...item, type: 'expense' as const })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const isLoading = isLoadingExpenses || isLoadingIncomes;

  return (
    <div className="rounded-xl p-4 md:p-6 lg:p-8 -m-4 md:-m-6 lg:-m-8 bg-gradient-to-br from-blue-100 via-teal-100 to-blue-100 bg-[length:400%_400%] animate-subtle-shift dark:from-blue-900/30 dark:via-background dark:to-teal-900/30 h-full">
      <div className="space-y-6 h-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-fuchsia-500 bg-[length:200%_200%] animate-gradient-shift">
              Transactions
            </h1>
            <p className="text-muted-foreground">
              View and manage your income and expenses.
            </p>
          </div>
          <AddTransactionSheet />
        </div>
        {transactions.length > 0 || isLoading ? (
          <TransactionsTable transactions={transactions} isLoading={isLoading} />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

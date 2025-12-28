'use client';

import { useState } from 'react';
import { TransactionsTable } from '@/components/transactions/transactions-table';
import { AddTransactionSheet } from '@/components/transactions/add-transaction-sheet';
import { placeholderTransactions } from '@/lib/placeholder-data';
import type { Transaction } from '@/lib/types';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(placeholderTransactions);

  const addTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    setTransactions((prevTransactions) => [
      { id: Date.now().toString(), ...newTransaction },
      ...prevTransactions,
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Transactions
          </h1>
          <p className="text-muted-foreground">
            View and manage your income and expenses.
          </p>
        </div>
        <AddTransactionSheet onAddTransaction={addTransaction} />
      </div>
      <TransactionsTable transactions={transactions} />
    </div>
  );
}

import type { Transaction, Goal } from '@/lib/types';

export const placeholderTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-07-20',
    description: 'Monthly Salary',
    amount: 5000,
    type: 'income',
    category: 'Salary',
  },
  {
    id: '2',
    date: '2024-07-21',
    description: 'Groceries from SuperMart',
    amount: 150.75,
    type: 'expense',
    category: 'Groceries',
  },
  {
    id: '3',
    date: '2024-07-21',
    description: 'Dinner with friends',
    amount: 85.5,
    type: 'expense',
    category: 'Food',
  },
  {
    id: '4',
    date: '2024-07-22',
    description: 'Electricity Bill',
    amount: 75.0,
    type: 'expense',
    category: 'Bills & Utilities',
  },
  {
    id: '5',
    date: '2024-07-23',
    description: 'New shoes from SoleStash',
    amount: 120.0,
    type: 'expense',
    category: 'Shopping',
  },
  {
    id: '6',
    date: '2024-07-24',
    description: 'Freelance Project Payment',
    amount: 750,
    type: 'income',
    category: 'Other',
  },
  {
    id: '7',
    date: '2024-07-25',
    description: 'Monthly metro pass',
    amount: 60,
    type: 'expense',
    category: 'Transport',
  },
];

export const placeholderGoals: Goal[] = [
  {
    id: 'g1',
    name: 'Emergency Fund',
    targetAmount: 10000,
    currentAmount: 4500,
    deadline: '2025-12-31',
  },
  {
    id: 'g2',
    name: 'Vacation to Bali',
    targetAmount: 3000,
    currentAmount: 1250,
    deadline: '2024-12-20',
  },
  {
    id: 'g3',
    name: 'New Laptop',
    targetAmount: 2000,
    currentAmount: 1800,
    deadline: '2024-09-30',
  },
  {
    id: 'g4',
    name: 'Down Payment for a Car',
    targetAmount: 5000,
    currentAmount: 500,
    deadline: '2026-01-15'
  }
];

export const historicalDataForAI = {
    income: [
        { month: '2024-05', amount: 5000 },
        { month: '2024-06', amount: 5200 },
        { month: '2024-07', amount: 5750 }
    ],
    expenses: [
        { month: '2024-05', category: 'Food', amount: 600 },
        { month: '2024-05', category: 'Rent', amount: 1500 },
        { month: '2024-05', category: 'Transport', amount: 200 },
        { month: '2024-05', category: 'Entertainment', amount: 300 },
        { month: '2024-06', category: 'Food', amount: 650 },
        { month: '2024-06', category: 'Rent', amount: 1500 },
        { month: '2024-06', category: 'Transport', amount: 220 },
        { month: '2024-06', category: 'Entertainment', amount: 250 },
        { month: '2024-07', category: 'Food', amount: 620 },
        { month: '2024-07', category: 'Rent', amount: 1500 },
        { month: '2024-07', category: 'Transport', amount: 210 },
        { month: '2024-07', category: 'Entertainment', amount: 400 },
    ]
};

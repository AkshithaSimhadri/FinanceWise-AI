export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: Category;
};

export type Goal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
};

export const categories = [
  'Food',
  'Transport',
  'Shopping',
  'Bills & Utilities',
  'Entertainment',
  'Health',
  'Education',
  'Travel',
  'Groceries',
  'Salary',
  'Investments',
  'Rent',
  'Other',
] as const;

export type Category = (typeof categories)[number];

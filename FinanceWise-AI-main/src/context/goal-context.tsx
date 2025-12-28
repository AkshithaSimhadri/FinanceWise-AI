"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Goal } from '@/lib/types';
import { placeholderGoals } from '@/lib/placeholder-data';

type GoalContextType = {
  goals: Goal[];
  addGoal: (newGoal: Omit<Goal, 'id' | 'currentAmount'>) => void;
};

const GoalContext = createContext<GoalContextType | undefined>(undefined);

export function GoalProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>(placeholderGoals);

  const addGoal = (newGoal: Omit<Goal, 'id' | 'currentAmount'>) => {
    setGoals((prevGoals) => [
      {
        id: `g${Date.now()}`,
        currentAmount: 0,
        ...newGoal,
      },
      ...prevGoals,
    ]);
  };

  return (
    <GoalContext.Provider value={{ goals, addGoal }}>
      {children}
    </GoalContext.Provider>
  );
}

export function useGoals() {
  const context = useContext(GoalContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalProvider');
  }
  return context;
}

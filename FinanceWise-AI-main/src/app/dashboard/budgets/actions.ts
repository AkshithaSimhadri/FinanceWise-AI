"use server";

import { budgetingRecommendations } from "@/ai/flows/budgeting-recommendations";
import { 
  type FullBudgetingRecommendationsOutput,
  type BudgetingRecommendationsOutput
} from "@/ai/flows/budgeting-recommendations.types";
import { placeholderTransactions } from "@/lib/placeholder-data";
import type { Category } from "@/lib/types";

// Categorize expenses into Needs, Wants, and Savings/Other
const needsCategories: Category[] = ["Groceries", "Bills & Utilities", "Transport", "Health", "Rent"];
const wantsCategories: Category[] = ["Food", "Shopping", "Entertainment", "Travel"];

const defaultSavingsTips = [
  "Create a detailed monthly budget and stick to it.",
  "Review your subscriptions and cancel any you don't use.",
  "Try cooking more meals at home instead of eating out.",
  "Set up automatic transfers to your savings account each payday.",
];

export async function getBudgetingRecommendations(): Promise<FullBudgetingRecommendationsOutput | { error: string }> {
  try {
    const income = placeholderTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = placeholderTransactions
      .filter(t => t.type === 'expense')
      .map(t => ({ category: t.category, amount: t.amount }));

    // 1. Get savings tips from AI (creative task)
    let aiResult: BudgetingRecommendationsOutput | null = null;
    try {
        aiResult = await budgetingRecommendations({
            income,
            expenses,
        });
    } catch (aiError) {
        console.error("AI budgetingRecommendations flow failed:", aiError);
        // Don't surface the error to the user, just use default tips.
    }
    
    // 2. Calculate budget recommendations in code (logical task)
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    
    const needsSpend = expenses
        .filter(e => needsCategories.includes(e.category))
        .reduce((sum, e) => sum + e.amount, 0);

    const wantsSpend = expenses
        .filter(e => wantsCategories.includes(e.category))
        .reduce((sum, e) => sum + e.amount, 0);

    // Apply 50/30/20 rule
    const needsTarget = income * 0.5;
    const wantsTarget = income * 0.3;
    const savingsTarget = income * 0.2;

    const budgetRecommendations = [
        {
            category: "Needs",
            recommendedAmount: needsTarget,
            rationale: `You are currently spending $${needsSpend.toFixed(2)}. The 50/30/20 rule suggests a target of $${needsTarget.toFixed(2)}.`
        },
        {
            category: "Wants",
            recommendedAmount: wantsTarget,
            rationale: `You are currently spending $${wantsSpend.toFixed(2)}. The 50/30/20 rule suggests a target of $${wantsTarget.toFixed(2)}.`
        },
        {
            category: "Savings",
            recommendedAmount: savingsTarget,
            rationale: `Based on the 50/30/20 rule, you should aim to save at least $${savingsTarget.toFixed(2)} per month.`
        }
    ];

    // 3. Combine results
    const finalOutput: FullBudgetingRecommendationsOutput = {
      budgetRecommendations,
      savingsTips: aiResult?.savingsTips ?? defaultSavingsTips,
    };
    
    return finalOutput;

  } catch (e) {
    console.error("Error in getBudgetingRecommendations:", e);
    return { error: "Failed to get budgeting recommendations." };
  }
}

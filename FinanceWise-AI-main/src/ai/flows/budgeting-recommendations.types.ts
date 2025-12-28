import { z } from 'zod';

export const BudgetingRecommendationsInputSchema = z.object({
  income: z.number().describe('The user’s monthly income.'),
  expenses: z
    .array(
      z.object({
        category: z.string().describe('The category of the expense.'),
        amount: z.number().describe('The amount spent in that category.'),
      })
    )
    .describe('An array of the user’s expenses.'),
});
export type BudgetingRecommendationsInput = z.infer<
  typeof BudgetingRecommendationsInputSchema
>;

// Only ask the AI for savings tips, which is a creative task.
export const BudgetingRecommendationsOutputSchema = z.object({
  savingsTips: z
    .array(z.string())
    .describe('Personalized tips to improve savings.'),
});

export type BudgetingRecommendationsOutput = z.infer<
  typeof BudgetingRecommendationsOutputSchema
>;

// The full output type that the component expects, which we will construct in code.
export type FullBudgetingRecommendationsOutput = {
  budgetRecommendations: {
    category: string;
    recommendedAmount: number;
    rationale: string;
  }[];
  savingsTips: string[];
};

'use server';

/**
 * @fileOverview AI-Powered savings tips generation.
 *
 * This file defines a Genkit flow that analyzes a user's spending patterns and income
 * to provide personalized savings tips.
 *
 */

import { ai } from '@/ai/genkit';
import {
  BudgetingRecommendationsInputSchema,
  type BudgetingRecommendationsInput,
  BudgetingRecommendationsOutputSchema,
  type BudgetingRecommendationsOutput,
} from './budgeting-recommendations.types';

export async function budgetingRecommendations(
  input: BudgetingRecommendationsInput
): Promise<BudgetingRecommendationsOutput> {
  return budgetingRecommendationsFlow(input);
}

const budgetingRecommendationsPrompt = ai.definePrompt({
  name: 'budgetingRecommendationsPrompt',
  input: { schema: BudgetingRecommendationsInputSchema },
  output: { schema: BudgetingRecommendationsOutputSchema },
  prompt: `You are an expert financial advisor. Generate a short list of 3-5 actionable savings tips based on the user's income and expenses.

  User Data:
  - Monthly Income: {{{income}}}
  - Expenses:
  {{#each expenses}}
    - {{category}}: {{{amount}}}
  {{/each}}
  `,
});

const budgetingRecommendationsFlow = ai.defineFlow(
  {
    name: 'budgetingRecommendationsFlow',
    inputSchema: BudgetingRecommendationsInputSchema,
    outputSchema: BudgetingRecommendationsOutputSchema,
  },
  async (input) => {
    const { output } = await budgetingRecommendationsPrompt(input);
    return output!;
  }
);

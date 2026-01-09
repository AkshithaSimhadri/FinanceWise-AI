'use server';

/**
 * @fileOverview Provides personalized financial guidance, including loan, business, and investment suggestions,
 *               along with risk and return explanations.
 *
 * - getFinancialGuidance - A function that generates personalized financial advice.
 * - FinancialGuidanceInput - The input type for the getFinancialGuidance function.
 * - FinancialGuidanceOutput - The return type for the getFinancialGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialGuidanceInputSchema = z.object({
  financialSituation: z
    .string()
    .describe(
      'A detailed description of the user\'s current financial situation, including income, expenses, debts, and assets.'
    ),
  goals: z
    .string()
    .describe(
      'The user\'s financial goals, such as saving for retirement, buying a house, or starting a business.'
    ),
  interests: z
    .string()
    .describe(
      'The user\'s interests related to loans, business strategies, and investment ideas.'
    ),
});
export type FinancialGuidanceInput = z.infer<typeof FinancialGuidanceInputSchema>;

const SuggestionSchema = z.object({
  suggestion: z.string().describe('The specific suggestion or idea.'),
  riskLevel: z.enum(['Low', 'Medium', 'High']).describe('The estimated risk level.'),
  potentialReturn: z.string().describe('The potential return or benefit of the suggestion (e.g., interest rate, ROI percentage, outcome).'),
  explanation: z.string().describe('A brief explanation of why this suggestion is suitable for the user.'),
});


const FinancialGuidanceOutputSchema = z.object({
  loanSuggestions: z
    .array(SuggestionSchema)
    .describe('Tailored suggestions for loans.'),
  businessStrategies:
    z.array(SuggestionSchema).describe('Relevant business strategies for the user.'),
  investmentIdeas:
    z.array(SuggestionSchema).describe('Personalized investment ideas for the user.'),
});
export type FinancialGuidanceOutput = z.infer<typeof FinancialGuidanceOutputSchema>;

export async function getFinancialGuidance(
  input: FinancialGuidanceInput
): Promise<FinancialGuidanceOutput> {
  return financialGuidanceFlow(input);
}

const financialGuidancePrompt = ai.definePrompt({
  name: 'financialGuidancePrompt',
  input: {schema: FinancialGuidanceInputSchema},
  output: {schema: FinancialGuidanceOutputSchema},
  prompt: `You are an expert AI financial advisor. Your task is to provide personalized, actionable guidance based on the user's situation.
  
  User's Financial Situation: {{{financialSituation}}}
  User's Goals: {{{goals}}}
  User's Interests: {{{interests}}}

  Based on this, generate 2-3 tailored suggestions for each of the following categories: loans, business strategies, and investment ideas.
  For each suggestion, you MUST provide:
  1.  A clear, concise 'suggestion'.
  2.  An estimated 'riskLevel' (Low, Medium, or High).
  3.  A 'potentialReturn' (e.g., "3-5% APR", "15% ROI annually", "Reduces debt by $200/month").
  4.  A brief 'explanation' of why this is a good fit for the user, connecting it to their goals and situation.

  Present the output in the required structured format.
  `,
});

const financialGuidanceFlow = ai.defineFlow(
  {
    name: 'financialGuidanceFlow',
    inputSchema: FinancialGuidanceInputSchema,
    outputSchema: FinancialGuidanceOutputSchema,
  },
  async input => {
    const {output} = await financialGuidancePrompt(input);
    return output!;
  }
);

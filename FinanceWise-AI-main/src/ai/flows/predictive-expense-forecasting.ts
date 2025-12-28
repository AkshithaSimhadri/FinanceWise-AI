'use server';

/**
 * @fileOverview Provides predictive expense and savings forecasting based on user's historical data.
 *
 * - predictiveExpenseForecasting - A function that handles the expense forecasting process.
 * - PredictiveExpenseForecastingInput - The input type for the predictiveExpenseForecasting function.
 * - PredictiveExpenseForecastingOutput - The return type for the predictiveExpenseForecasting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictiveExpenseForecastingInputSchema = z.object({
  historicalData: z
    .string()
    .describe(
      'Historical financial data of the user including income and expenses, as a JSON string.'
    ),
  savingsGoals: z
    .string()
    .optional()
    .describe(
      'Optional savings goals of the user, as a JSON string.'
    ),
  investmentStrategies: z
    .string()
    .optional()
    .describe(
      'Optional investment strategies for what-if scenarios, as a JSON string.'
    ),
});
export type PredictiveExpenseForecastingInput = z.infer<
  typeof PredictiveExpenseForecastingInputSchema
>;

const PredictiveExpenseForecastingOutputSchema = z.object({
  forecastedExpenses: z.array(z.object({
    month: z.string().describe("The month for the forecast (e.g., 'Aug 2024')."),
    amount: z.number().describe("The forecasted expense amount for that month."),
  })).describe('Forecasted future expenses for the next 6 months.'),
  forecastedSavings: z.array(z.object({
    month: z.string().describe("The month for the forecast (e.g., 'Aug 2024')."),
    amount: z.number().describe("The forecasted savings amount for that month."),
  })).describe('Forecasted future savings for the next 6 months.'),
  insights: z
    .string()
    .describe('Actionable insights and recommendations based on the forecast.'),
});
export type PredictiveExpenseForecastingOutput = z.infer<
  typeof PredictiveExpenseForecastingOutputSchema
>;

export async function predictiveExpenseForecasting(
  input: PredictiveExpenseForecastingInput
): Promise<PredictiveExpenseForecastingOutput> {
  return predictiveExpenseForecastingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictiveExpenseForecastingPrompt',
  input: {schema: PredictiveExpenseForecastingInputSchema},
  output: {schema: PredictiveExpenseForecastingOutputSchema},
  prompt: `You are an AI-powered personal finance advisor. Generate a forecast of future expenses and savings for the next 6 months based on the user's historical financial data, savings goals, and investment strategies. Also provide actionable insights.

  Historical Data: {{{historicalData}}}
  Savings Goals: {{{savingsGoals}}}
  Investment Strategies: {{{investmentStrategies}}}
  `,
});

const predictiveExpenseForecastingFlow = ai.defineFlow(
  {
    name: 'predictiveExpenseForecastingFlow',
    inputSchema: PredictiveExpenseForecastingInputSchema,
    outputSchema: PredictiveExpenseForecastingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

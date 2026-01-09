'use server';
/**
 * @fileOverview Extracts transaction data from a CSV string.
 *
 * - extractTransactionsFromCsv - A function that handles the CSV extraction process.
 * - ExtractTransactionsCsvInput - The input type for the function.
 * - ExtractTransactionsCsvOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { categories } from '@/lib/types';
import { ExtractedTransactionSchema } from '@/lib/types';

const ExtractTransactionsCsvInputSchema = z.object({
  csvData: z
    .string()
    .describe(
      "A string containing transaction data in CSV format."
    ),
});
export type ExtractTransactionsCsvInput = z.infer<typeof ExtractTransactionsCsvInputSchema>;

const ExtractTransactionsCsvOutputSchema = z.object({
    transactions: z.array(ExtractedTransactionSchema).describe("An array of all transactions found in the document.")
});
export type ExtractTransactionsCsvOutput = z.infer<typeof ExtractTransactionsCsvOutputSchema>;

export async function extractTransactionsFromCsv(
  input: ExtractTransactionsCsvInput
): Promise<ExtractTransactionsCsvOutput> {
  return extractTransactionsCsvFlow(input);
}

const extractTransactionsCsvPrompt = ai.definePrompt({
  name: 'extractTransactionsCsvPrompt',
  input: { schema: ExtractTransactionsCsvInputSchema },
  output: { schema: ExtractTransactionsCsvOutputSchema },
  prompt: `You are an expert at extracting structured data from financial data. 
  Analyze the provided CSV data and extract all financial transactions.
  The CSV may have headers, but their names can vary (e.g., 'Date', 'Transaction Date'). Your job is to intelligently map the columns to the required fields.
  Amounts for expenses might be positive or negative; always store them as positive numbers and correctly identify the transaction 'type' as 'income' or 'expense'.
  
  For each transaction, determine if it is 'income' or 'expense'. 
  Identify the date, a clear description, the amount, and assign it to the most appropriate category.
  
  Possible categories are: ${categories.join(', ')}. If a category isn't clear, use 'Other'.

  The CSV data is below:
  ---
  {{{csvData}}}
  ---
  `,
});

const extractTransactionsCsvFlow = ai.defineFlow(
  {
    name: 'extractTransactionsCsvFlow',
    inputSchema: ExtractTransactionsCsvInputSchema,
    outputSchema: ExtractTransactionsCsvOutputSchema,
  },
  async (input) => {
    const { output } = await extractTransactionsCsvPrompt(input);
    return output!;
  }
);

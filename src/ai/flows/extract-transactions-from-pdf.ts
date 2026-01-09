'use server';
/**
 * @fileOverview Extracts transaction data from a PDF file.
 *
 * - extractTransactionsFromPdf - A function that handles the PDF extraction process.
 * - ExtractTransactionsInput - The input type for the function.
 * - ExtractTransactionsOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { categories } from '@/lib/types';
import { ExtractedTransaction, ExtractedTransactionSchema } from '@/lib/types';

const ExtractTransactionsInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF file of a bank or credit card statement, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:application/pdf;base64,<encoded_data>'."
    ),
});
export type ExtractTransactionsInput = z.infer<typeof ExtractTransactionsInputSchema>;

const ExtractTransactionsOutputSchema = z.object({
    transactions: z.array(ExtractedTransactionSchema).describe("An array of all transactions found in the document.")
});
export type ExtractTransactionsOutput = z.infer<typeof ExtractTransactionsOutputSchema>;

export async function extractTransactionsFromPdf(
  input: ExtractTransactionsInput
): Promise<ExtractTransactionsOutput> {
  return extractTransactionsFlow(input);
}

const extractTransactionsPrompt = ai.definePrompt({
  name: 'extractTransactionsPrompt',
  input: { schema: ExtractTransactionsInputSchema },
  output: { schema: ExtractTransactionsOutputSchema },
  prompt: `You are an expert at extracting structured data from financial documents. 
  Analyze the provided PDF file and extract all financial transactions. 
  For each transaction, determine if it is 'income' or 'expense'. 
  Identify the date, a clear description, the amount, and assign it to the most appropriate category.
  
  Possible categories are: ${categories.join(', ')}. If a category isn't clear, use 'Other'.
  
  PDF Document: {{media url=pdfDataUri}}
  `,
});

const extractTransactionsFlow = ai.defineFlow(
  {
    name: 'extractTransactionsFlow',
    inputSchema: ExtractTransactionsInputSchema,
    outputSchema: ExtractTransactionsOutputSchema,
  },
  async (input) => {
    const { output } = await extractTransactionsPrompt(input);
    return output!;
  }
);

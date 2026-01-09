
'use server';

import { extractTransactionsFromPdf, type ExtractTransactionsInput } from '@/ai/flows/extract-transactions-from-pdf';
import { extractTransactionsFromCsv, type ExtractTransactionsCsvInput } from '@/ai/flows/extract-transactions-from-csv';

export async function analyzeTransactions(
    fileType: 'pdf' | 'csv', 
    fileData: string
) {
  try {
    if (fileType === 'pdf') {
      return await extractTransactionsFromPdf({ pdfDataUri: fileData });
    } else if (fileType === 'csv') {
      return await extractTransactionsFromCsv({ csvData: fileData });
    } else {
      throw new Error('Unsupported file type');
    }
  } catch (e: any) {
    console.error('Error analyzing transactions:', e);
    // Ensure a serializable error object is returned
    return { error: e.message || 'An unexpected error occurred during analysis.' };
  }
}

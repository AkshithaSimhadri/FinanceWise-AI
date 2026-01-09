

"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UploadCloud, History } from 'lucide-react';
import type { ExtractedTransaction } from '@/lib/types';
import { analyzeTransactions } from '@/app/dashboard/upload/actions';
import { useUser, useFirestore, addDocumentNonBlocking } from '@/firebase';
import { collection } from 'firebase/firestore';


type UploadFormProps = {
  onUploadSuccess: (transactions: ExtractedTransaction[]) => void;
  onViewHistory: () => void;
};

const readFileAsDataURI = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsText(file);
    });
};

export function UploadForm({ onUploadSuccess, onViewHistory }: UploadFormProps) {
  const { register, handleSubmit, watch, reset } = useForm<{ file: FileList }>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const watchedFile = watch("file");
  const { user } = useUser();
  const firestore = useFirestore();

  const onSubmit: SubmitHandler<{ file: FileList }> = async (data) => {
    const file = data.file[0];
    if (!file || !user || !firestore) {
      toast({ variant: 'destructive', title: 'No file selected', description: 'Please choose a PDF or CSV file to upload.' });
      return;
    }

    setLoading(true);
    try {
        let fileContent: string;
        let fileType: 'pdf' | 'csv';

        if (file.type === 'application/pdf') {
            fileContent = await readFileAsDataURI(file);
            fileType = 'pdf';
        } else if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
            fileContent = await readFileAsText(file);
            fileType = 'csv';
        } else {
            throw new Error('Unsupported file type. Please upload a PDF or CSV.');
        }
      
      const result = await analyzeTransactions(fileType, fileContent);

      if (result && 'error' in result) {
        throw new Error(result.error || 'Failed to process file.');
      }
      
      if (!result || !result.transactions) {
        throw new Error('No transactions were extracted from the file.');
      }

      // Save to history
      const historyCollection = collection(firestore, 'users', user.uid, 'upload_history');
      await addDocumentNonBlocking(historyCollection, {
        userId: user.uid,
        fileName: file.name,
        uploadDate: new Date().toISOString(),
        fileType: fileType,
        transactionCount: result.transactions.length,
        transactions: result.transactions,
      });

      onUploadSuccess(result.transactions);
      toast({ title: 'Upload Successful', description: `${result.transactions.length} transactions were extracted and the upload has been recorded.` });
      reset();

    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Upload Failed', description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Transaction File</CardTitle>
        <CardDescription>Select a PDF or CSV file containing your transaction history to be analyzed by AI.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
            <div className="grid gap-2">
                <Label htmlFor="file-upload">Transaction Document</Label>
                <Input id="file-upload" type="file" accept=".pdf,.csv" {...register('file', { required: true })} />
            </div>
        </CardContent>
        <CardFooter className="justify-between">
            <Button type="submit" disabled={loading || !watchedFile || watchedFile.length === 0}>
                {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                </>
                ) : (
                <>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Upload and Analyze
                </>
                )}
            </Button>
            <Button variant="outline" type="button" onClick={onViewHistory}>
                <History className="mr-2 h-4 w-4" />
                View History
            </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

    
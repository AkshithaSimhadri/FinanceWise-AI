
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PlusCircle } from 'lucide-react';
import { useUser, useFirestore, updateDocumentNonBlocking } from '@/firebase';
import { doc, increment } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import type { FinancialGoal } from '@/lib/types';

export function AddFundsDialog({ goal }: { goal: FinancialGoal }) {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [amount, setAmount] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    const fundAmount = parseFloat(amount);
    if (isNaN(fundAmount) || fundAmount <= 0 || !user || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Invalid Amount',
        description: 'Please enter a valid positive number.',
      });
      return;
    }

    const goalRef = doc(firestore, 'users', user.uid, 'financial_goals', goal.id);

    try {
      updateDocumentNonBlocking(goalRef, {
        currentAmount: increment(fundAmount),
      });

      toast({
          title: 'Funds Added',
          description: `$${fundAmount.toFixed(2)} has been contributed to your "${goal.name}" goal.`,
      });

      setAmount('');
      setOpen(false);
    } catch (error) {
        console.error("Error adding funds: ", error);
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not add funds to your goal.',
        });
    }
  };

  const remainingAmount = goal.targetAmount - goal.currentAmount;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                Add
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add Funds</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Funds to "{goal.name}"</DialogTitle>
          <DialogDescription>
            Target: ${goal.targetAmount.toLocaleString()} | Saved: ${goal.currentAmount.toLocaleString()} | Remaining: ${remainingAmount > 0 ? remainingAmount.toLocaleString() : 0}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              className="col-span-3"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit}>
            Save contribution
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

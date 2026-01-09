
'use client';

import { useState, useEffect } from 'react';
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
import { useUser, useFirestore, updateDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import type { FinancialGoal } from '@/lib/types';
import { format } from 'date-fns';

type EditGoalDialogProps = {
  goal: FinancialGoal;
  children: React.ReactNode;
};

export function EditGoalDialog({ goal, children }: EditGoalDialogProps) {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [name, setName] = useState(goal.name);
  const [targetAmount, setTargetAmount] = useState(goal.targetAmount.toString());
  const [targetDate, setTargetDate] = useState('');
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    if (goal && open) {
        setName(goal.name);
        setTargetAmount(goal.targetAmount.toString());
        // Ensure date is in 'yyyy-MM-dd' format for the input
        try {
          setTargetDate(format(new Date(goal.targetDate), 'yyyy-MM-dd'));
        } catch (e) {
          console.error("Invalid date format for goal:", goal.targetDate);
          setTargetDate('');
        }
    }
  }, [goal, open]);


  const handleSubmit = async () => {
    if (!name || !targetAmount || !targetDate || !user || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: 'Please fill out all fields.',
      });
      return;
    }

    const goalRef = doc(firestore, 'users', user.uid, 'financial_goals', goal.id);

    const newTargetAmount = parseFloat(targetAmount);
    if (isNaN(newTargetAmount) || newTargetAmount < 0) {
        toast({
            variant: 'destructive',
            title: 'Invalid Target',
            description: 'Please enter a valid positive number for the target amount.',
        });
        return;
    }

    if (newTargetAmount < goal.currentAmount) {
        toast({
            variant: 'destructive',
            title: 'Invalid Target',
            description: 'The new target amount cannot be less than the amount already saved.',
        });
        return;
    }
    
    updateDocumentNonBlocking(goalRef, {
      name,
      targetAmount: newTargetAmount,
      targetDate: new Date(targetDate).toISOString(),
    });

    toast({
      title: 'Goal Updated',
      description: `Your goal "${name}" has been updated.`,
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Financial Goal</DialogTitle>
          <DialogDescription>
            Make changes to your goal. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name-edit" className="text-right">
              Goal Name
            </Label>
            <Input
              id="name-edit"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="target-edit" className="text-right">
              Total Target
            </Label>
            <Input
              id="target-edit"
              type="number"
              className="col-span-3"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deadline-edit" className="text-right">
              Deadline
            </Label>
            <Input
              id="deadline-edit"
              type="date"
              className="col-span-3"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

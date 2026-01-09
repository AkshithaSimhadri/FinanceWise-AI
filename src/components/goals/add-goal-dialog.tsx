
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useUser, useFirestore, addDocumentNonBlocking } from "@/firebase";
import { collection } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export function AddGoalDialog() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    const parsedTarget = parseFloat(targetAmount);
    if (!name || isNaN(parsedTarget) || parsedTarget <= 0 || !targetDate || !user || !firestore) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill out all fields with valid values.",
      });
      return;
    }

    const goalsCol = collection(firestore, 'users', user.uid, 'financial_goals');
    
    // The `targetAmount` is the total goal. `currentAmount` starts at 0.
    await addDocumentNonBlocking(goalsCol, {
      userId: user.uid,
      name,
      targetAmount: parsedTarget,
      currentAmount: 0,
      targetDate: new Date(targetDate).toISOString(),
    });
    
    toast({
      title: "Goal Added",
      description: `Your goal "${name}" has been added.`,
    });

    // Reset form and close dialog
    setName('');
    setTargetAmount('');
    setTargetDate('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-4 w-4" />
          Set New Goal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set a New Financial Goal</DialogTitle>
          <DialogDescription>
            Define what you're saving for. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Goal Name
            </Label>
            <Input id="name" placeholder="e.g., Summer Vacation" className="col-span-3" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="target" className="text-right">
              Target Amount
            </Label>
            <Input id="target" type="number" placeholder="3000" className="col-span-3" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deadline" className="text-right">
              Deadline
            </Label>
            <Input id="deadline" type="date" className="col-span-3" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
             <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit}>Save goal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

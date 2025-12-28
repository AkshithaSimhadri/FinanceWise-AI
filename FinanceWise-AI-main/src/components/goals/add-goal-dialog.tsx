
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
import type { Goal } from "@/lib/types";

type AddGoalDialogProps = {
  onAddGoal: (goal: Omit<Goal, 'id' | 'currentAmount'>) => void;
};

export function AddGoalDialog({ onAddGoal }: AddGoalDialogProps) {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (!name || !targetAmount || !deadline) {
      // Basic validation
      return;
    }
    onAddGoal({
      name,
      targetAmount: parseFloat(targetAmount),
      deadline,
    });
    // Reset form and close dialog
    setName('');
    setTargetAmount('');
    setDeadline('');
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
            <Input id="deadline" type="date" className="col-span-3" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
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

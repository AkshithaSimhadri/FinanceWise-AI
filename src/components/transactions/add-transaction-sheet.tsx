
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PlusCircle } from "lucide-react";
import { categories, Category } from "@/lib/types";
import { useUser, useFirestore, addDocumentNonBlocking } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export function AddTransactionSheet() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState<Category | ''>('');
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async () => {
    if (!description || !amount || !category || !date || !user || !firestore) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: "Please fill out all fields to add a transaction.",
        });
        return;
    }

    const collectionName = type === 'income' ? 'incomes' : 'expenses';
    const transactionCollection = collection(firestore, 'users', user.uid, collectionName);

    const dataPayload: any = {
        userId: user.uid,
        date: new Date(date).toISOString(),
        amount: parseFloat(amount),
        category: category,
    };

    if (type === 'income') {
        dataPayload.source = description; // 'source' for income
    } else {
        dataPayload.description = description; // 'description' for expense
    }

    await addDocumentNonBlocking(transactionCollection, dataPayload);

    toast({
      title: "Transaction Added",
      description: "Your transaction has been successfully recorded.",
    });

    // Reset form and close sheet
    setDescription('');
    setAmount('');
    setType('expense');
    setCategory('');
    setDate('');
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-4 w-4" />
          Add Transaction
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Transaction</SheetTitle>
          <SheetDescription>
            Enter the details of your new transaction. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="e.g., Coffee with friends" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label>Type</Label>
            <RadioGroup value={type} onValueChange={(value: 'income' | 'expense') => setType(value)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="expense" id="r1" />
                <Label htmlFor="r1">Expense</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="income" id="r2" />
                <Label htmlFor="r2">Income</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(value: Category) => setCategory(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
           <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} max={today} />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button onClick={handleSubmit}>Save transaction</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

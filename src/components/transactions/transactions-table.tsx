
"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, MoreHorizontal, Trash2 } from "lucide-react";
import { categories, type Category, type Transaction } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";
import { format } from 'date-fns';
import { useUser, useFirestore, deleteDocumentNonBlocking } from "@/firebase";
import { doc } from 'firebase/firestore';
import { useToast } from "@/hooks/use-toast";

type TransactionsTableProps = {
  transactions: Transaction[];
  isLoading: boolean;
};

export function TransactionsTable({ transactions, isLoading }: TransactionsTableProps) {
  const [categoryFilter, setCategoryFilter] = React.useState<Category[]>([]);
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const handleDelete = (transaction: Transaction) => {
    if (!user || !firestore) return;
    
    const collectionName = transaction.type === 'income' ? 'incomes' : 'expenses';
    const docRef = doc(firestore, 'users', user.uid, collectionName, transaction.id);

    deleteDocumentNonBlocking(docRef);

    toast({
      title: "Transaction Deleted",
      description: `The transaction "${transaction.description}" has been removed.`,
    });
  };

  const filteredTransactions = transactions.filter(
    (transaction) =>
      categoryFilter.length === 0 ||
      categoryFilter.includes(transaction.category)
  );

  const handleCategoryFilterChange = (category: Category) => {
    setCategoryFilter((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Category <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {categories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={categoryFilter.includes(category)}
                onCheckedChange={() => handleCategoryFilterChange(category)}
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
       {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="w-[50px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">
                {transaction.description}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    transaction.type === "income" ? "default" : "secondary"
                  }
                  className={transaction.type === 'income' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}
                >
                  {transaction.type}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{transaction.category}</Badge>
              </TableCell>
              <TableCell>
                {format(new Date(transaction.date), 'dd-MM-yyyy')}
              </TableCell>
              <TableCell
                className={`text-right font-semibold ${
                  transaction.type === "income"
                    ? "text-emerald-500"
                    : "text-destructive"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}
                ${transaction.amount.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More options</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <AlertDialogTrigger asChild>
                               <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onSelect={(e) => e.preventDefault()}
                                >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this transaction.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(transaction)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      )}
    </div>
  );
}

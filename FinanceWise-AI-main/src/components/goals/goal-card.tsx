
"use client";

import type { Goal } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { differenceInDays, formatDistanceToNow, parseISO } from 'date-fns';
import { useState, useEffect } from "react";

type DeadlineInfo = {
  text: string;
  variant: "destructive" | "secondary" | "outline";
};

export function GoalCard({ goal }: { goal: Goal }) {
  const [deadlineInfo, setDeadlineInfo] = useState<DeadlineInfo | null>(null);
  const [isClient, setIsClient] = useState(false);
  const progress = (goal.currentAmount / goal.targetAmount) * 100;

  useEffect(() => {
    setIsClient(true);
    const deadline = parseISO(goal.deadline);
    const daysLeft = differenceInDays(deadline, new Date());

    const getDeadlineBadgeVariant = () => {
      if (daysLeft < 0) return 'destructive';
      if (daysLeft < 30) return 'secondary';
      return 'outline';
    };

    setDeadlineInfo({
      text: daysLeft < 0 ? 'Overdue' : `${formatDistanceToNow(deadline)} left`,
      variant: getDeadlineBadgeVariant(),
    });
  }, [goal.deadline]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="truncate">{goal.name}</CardTitle>
        <CardDescription>
          Deadline: {isClient ? new Date(goal.deadline).toLocaleDateString() : ''}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Progress value={progress} aria-label={`${progress.toFixed(0)}% complete`} />
        <p className="text-sm text-muted-foreground">
          <span className="font-bold text-foreground">
            ${goal.currentAmount.toLocaleString()}
          </span>{" "}
          / ${goal.targetAmount.toLocaleString()}
        </p>
      </CardContent>
      <CardFooter>
        {deadlineInfo ? (
          <Badge variant={deadlineInfo.variant}>
            {deadlineInfo.text}
          </Badge>
        ) : (
          <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
        )}
      </CardFooter>
    </Card>
  );
}

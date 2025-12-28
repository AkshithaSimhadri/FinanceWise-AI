"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank, Lightbulb, Loader2 } from "lucide-react";
import type { FullBudgetingRecommendationsOutput } from "@/ai/flows/budgeting-recommendations.types";
import { getBudgetingRecommendations } from "@/app/dashboard/budgets/actions";

export function BudgetingForm() {
  const [recommendations, setRecommendations] = useState<FullBudgetingRecommendationsOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setRecommendations(null);
    const result = await getBudgetingRecommendations();
    if ("error" in result) {
      setError(result.error);
    } else {
      setRecommendations(result);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="font-headline">Get Your AI-Powered Budget</CardTitle>
          <CardDescription>
            Let our AI analyze your spending and create a personalized budget to help you reach your goals faster.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate My Budget"
            )}
          </Button>
        </CardContent>
      </Card>
      
      {error && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">An Error Occurred</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {recommendations && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PiggyBank className="text-primary" /> Budget Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.budgetRecommendations.map((rec, index) => (
                <div key={index} className="p-4 rounded-lg border">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{rec.category}</h3>
                    <p className="font-bold text-primary">${rec.recommendedAmount.toFixed(2)}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{rec.rationale}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="text-accent" /> Savings Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 list-disc list-inside">
                {recommendations.savingsTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

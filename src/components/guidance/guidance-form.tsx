"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb, Loader2, Sparkles, Building, TrendingUp } from "lucide-react";
import { getGuidance } from "@/app/dashboard/guidance/actions";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { type FinancialGuidanceOutput } from "@/ai/flows/personalized-financial-guidance";
import { Badge } from "@/components/ui/badge";

type FormInputs = {
  financialSituation: string;
  goals: string;
  interests: string;
};

const riskVariantMap = {
    'Low': 'default',
    'Medium': 'secondary',
    'High': 'destructive'
} as const;


function SuggestionCard({ suggestion }: { suggestion: FinancialGuidanceOutput['loanSuggestions'][0] }) {
    return (
        <div className="p-4 rounded-lg border bg-secondary/30">
            <h4 className="font-semibold">{suggestion.suggestion}</h4>
            <p className="text-sm text-muted-foreground mt-1">{suggestion.explanation}</p>
            <div className="flex items-center gap-4 mt-3">
                <Badge variant={riskVariantMap[suggestion.riskLevel] || 'outline'}>
                    Risk: {suggestion.riskLevel}
                </Badge>
                 <div className="text-sm">
                    <span className="font-semibold">Return:</span> {suggestion.potentialReturn}
                </div>
            </div>
        </div>
    )
}

export function GuidanceForm() {
  const [guidance, setGuidance] = useState<FinancialGuidanceOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setLoading(true);
    setError(null);
    setGuidance(null);
    const result = await getGuidance(data);
    if ("error" in result) {
      setError(result.error);
    } else {
      setGuidance(result);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Personalized Financial Guidance</CardTitle>
          <CardDescription>
            Describe your financial situation, goals, and interests to receive tailored advice from our AI on loans, business, and investments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="financial-situation">Current Financial Situation</Label>
              <Textarea
                id="financial-situation"
                placeholder="e.g., Monthly income of $5000, $10000 in savings, $500 monthly student loan payment..."
                {...register("financialSituation", { required: "This field is required." })}
              />
              {errors.financialSituation && <p className="text-sm text-destructive">{errors.financialSituation.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="goals">Financial Goals</Label>
              <Textarea
                id="goals"
                placeholder="e.g., Buy a house in 5 years, start a side business, save for retirement..."
                {...register("goals", { required: "This field is required." })}
              />
               {errors.goals && <p className="text-sm text-destructive">{errors.goals.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="interests">Interests</Label>
              <Textarea
                id="interests"
                placeholder="e.g., Interested in low-risk investments, looking for a small business loan, curious about tech stocks..."
                {...register("interests", { required: "This field is required." })}
              />
              {errors.interests && <p className="text-sm text-destructive">{errors.interests.message}</p>}
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Get My Guidance
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive"><CardHeader><CardTitle className="text-destructive">An Error Occurred</CardTitle></CardHeader><CardContent><p>{error}</p></CardContent></Card>
      )}

      {guidance && (
        <Card>
          <CardHeader>
            <CardTitle>Your Personalized AI Guidance</CardTitle>
            <CardDescription>Here are some tailored suggestions based on your input.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" defaultValue={['item-1']} className="w-full space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg px-4 bg-background">
                <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                    <div className="flex items-center gap-3"><Building className="text-primary"/>Loan Suggestions</div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 space-y-3">
                  {guidance.loanSuggestions.map((s, i) => <SuggestionCard key={`loan-${i}`} suggestion={s} />)}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border rounded-lg px-4 bg-background">
                <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                     <div className="flex items-center gap-3"><Sparkles className="text-primary"/>Business Strategies</div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 space-y-3">
                   {guidance.businessStrategies.map((s, i) => <SuggestionCard key={`biz-${i}`} suggestion={s} />)}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border rounded-lg px-4 bg-background">
                <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                    <div className="flex items-center gap-3"><TrendingUp className="text-primary"/>Investment Ideas</div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 space-y-3">
                   {guidance.investmentIdeas.map((s, i) => <SuggestionCard key={`invest-${i}`} suggestion={s} />)}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

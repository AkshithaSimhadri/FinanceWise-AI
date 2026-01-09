"use server";

import { getFinancialGuidance, type FinancialGuidanceOutput } from "@/ai/flows/personalized-financial-guidance";

type GuidanceInput = {
    financialSituation: string;
    goals: string;
    interests: string;
};

export async function getGuidance(input: GuidanceInput): Promise<FinancialGuidanceOutput | { error: string }> {
  try {
    const guidance = await getFinancialGuidance(input);
    return guidance;
  } catch (e) {
    console.error(e);
    return { error: "Failed to get financial guidance." };
  }
}

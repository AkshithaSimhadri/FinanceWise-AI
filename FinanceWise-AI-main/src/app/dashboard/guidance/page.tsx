import { GuidanceForm } from "@/components/guidance/guidance-form";

export default function GuidancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">AI Financial Advisor</h1>
        <p className="text-muted-foreground">
          Get personalized advice on loans, business, and investments.
        </p>
      </div>
      <GuidanceForm />
    </div>
  );
}

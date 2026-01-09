
import { GuidanceForm } from "@/components/guidance/guidance-form";

export default function GuidancePage() {
  return (
    <div className="rounded-xl p-4 md:p-6 lg:p-8 -m-4 md:-m-6 lg:-m-8 bg-gradient-to-br from-rose-100 via-orange-100 to-rose-100 bg-[length:400%_400%] animate-subtle-shift dark:from-rose-900/30 dark:via-background dark:to-orange-900/30 h-full">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-fuchsia-500 bg-[length:200%_200%] animate-gradient-shift">AI Financial Advisor</h1>
          <p className="text-muted-foreground">
            Get personalized advice on loans, business, and investments.
          </p>
        </div>
        <GuidanceForm />
      </div>
    </div>
  );
}

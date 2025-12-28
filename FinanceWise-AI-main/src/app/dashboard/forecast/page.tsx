import { ForecastingForm } from "@/components/forecast/forecasting-form";

export default function ForecastPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Financial Forecast</h1>
        <p className="text-muted-foreground">
          Use AI to predict your future expenses and savings.
        </p>
      </div>
      <ForecastingForm />
    </div>
  );
}

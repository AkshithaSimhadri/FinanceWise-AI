'use client';

import { DashboardGuard } from '../dashboard-guard';
import { ForecastingForm } from '../../../components/forecast/forecasting-form';

export default function ForecastPage() {
  return (
    <DashboardGuard>
      <div className="rounded-xl p-4 md:p-6 lg:p-8 -m-4 md:-m-6 lg:-m-8 bg-gradient-to-br from-indigo-100 via-sky-100 to-indigo-100 bg-[length:400%_400%] animate-subtle-shift dark:from-indigo-900/30 dark:via-background dark:to-sky-900/30 h-full">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-fuchsia-500 bg-[length:200%_200%] animate-gradient-shift">
              Financial Forecast
            </h1>
            <p className="text-muted-foreground">
              Use AI to predict your future expenses and savings.
            </p>
          </div>
          <ForecastingForm />
        </div>
      </div>
    </DashboardGuard>
  );
}

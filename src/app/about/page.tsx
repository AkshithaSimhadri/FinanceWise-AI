
import { AppFooter } from "@/components/app-footer";
import { Landmark, PiggyBank, AreaChart, Lightbulb, UploadCloud } from "lucide-react";
import Link from "next/link";
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: PiggyBank,
    title: 'Smart Budgeting',
    description:
      'Create and manage budgets with AI-powered recommendations based on the 50/30/20 rule.',
  },
  {
    icon: AreaChart,
    title: 'Financial Forecasting',
    description:
      'Predict future expenses and savings with our intelligent forecasting tools.',
  },
  {
    icon: Lightbulb,
    title: 'Personalized Guidance',
    description:
      'Receive tailored advice on loans, business strategies, and investments.',
  },
  {
    icon: UploadCloud,
    title: 'Automated Transaction Analysis',
    description:
      'Upload your bank statements (PDF or CSV) and let AI categorize your transactions automatically.',
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
       <header className="px-4 lg:px-6 h-14 flex items-center bg-background border-b">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Landmark className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">FinanceWise AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button asChild>
            <Link href="/login">
              Back to App
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
           <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  About FinanceWise AI
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our mission is to empower individuals to take control of their financial lives through intelligent, intuitive, and personalized tools. We believe that financial well-being should be accessible to everyone.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="grid gap-4 p-6 rounded-lg border bg-background"
                >
                  <feature.icon className="h-8 w-8 text-primary" />
                  <div className="grid gap-1">
                    <h3 className="text-lg font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}

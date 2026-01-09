
import Link from 'next/link';
import {
  Landmark,
  PiggyBank,
  AreaChart,
  Lightbulb,
  UploadCloud,
  ArrowRight,
} from 'lucide-react';
import { AppFooter } from '@/components/app-footer';
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

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Landmark className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">FinanceWise AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Features
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            About
          </Link>
          <Button asChild>
            <Link href="/login">Get Started</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Take Control of Your Finances with AI
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    FinanceWise AI is your intelligent partner for smart
                    budgeting, insightful analysis, and personalized guidance to
                    help you achieve your financial dreams.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/login">
                      Start Your Free Trial <ArrowRight className="ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                  Everything You Need to Succeed
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is packed with features designed to give you a
                  clear view of your financial health and guide you towards
                  your goals.
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

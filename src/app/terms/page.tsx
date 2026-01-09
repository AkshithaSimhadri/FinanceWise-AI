
import { AppFooter } from "@/components/app-footer";
import { Landmark } from "lucide-react";
import Link from "next/link";
import { Button } from '@/components/ui/button';

export default function TermsPage() {
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
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="prose prose-gray dark:prose-invert max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Terms of Service</h1>
              <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
              
              <p>
                Welcome to FinanceWise AI ("we," "our," or "us"). Please read these Terms of Service ("Terms") carefully before using our application. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">1. Acceptance of Terms</h2>
              <p>
                By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.
              </p>
              
              <h2 className="text-2xl font-bold text-foreground mt-8">2. Description of Service</h2>
              <p>
                FinanceWise AI provides users with a personal finance management tool that includes budgeting, expense tracking, financial forecasting, and personalized AI-driven guidance. The service is for informational purposes only and does not constitute financial, legal, or tax advice. You are solely responsible for your own financial decisions and research.
              </p>
              
              <h2 className="text-2xl font-bold text-foreground mt-8">3. User Accounts</h2>
              <p>
                To access the service, you must create an account. You are responsible for safeguarding your account password and for any activities or actions under your password. You agree not to disclose your password to any third party.
              </p>
              
              <h2 className="text-2xl font-bold text-foreground mt-8">4. Limitation of Liability</h2>
              <p>
                In no event shall FinanceWise AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">5. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms of Service on this page.
              </p>

               <h2 className="text-2xl font-bold text-foreground mt-8">6. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at: <a href="mailto:terms@financewise.ai">terms@financewise.ai</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}


import { AppFooter } from "@/components/app-footer";
import { Landmark } from "lucide-react";
import Link from "next/link";
import { Button } from '@/components/ui/button';

export default function PrivacyPage() {
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
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Privacy Policy</h1>
              <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
              
              <p>
                Welcome to FinanceWise AI. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
              </p>
              
              <h2 className="text-2xl font-bold text-foreground mt-8">1. Information We Collect</h2>
              <p>
                We may collect information about you in a variety of ways. The information we may collect via the Application includes:
              </p>
              <ul>
                <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, that you voluntarily give to us when you register with the Application.</li>
                <li><strong>Financial Data:</strong> Financial information, such as data related to your income, expenses, and transactions, that you upload or enter into the app. This data is used solely to provide you with the app's features.</li>
                <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Application, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Application.</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mt-8">2. How We Use Your Information</h2>
              <p>
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Application to:
              </p>
               <ul>
                <li>Create and manage your account.</li>
                <li>Generate personalized financial insights and recommendations.</li>
                <li>Analyze and monitor usage and trends to improve your experience with the Application.</li>
                <li>Compile anonymous statistical data and analysis for internal use.</li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mt-8">3. Disclosure of Your Information</h2>
              <p>
                We do not share, sell, rent, or trade your personal or financial information with any third parties for their promotional purposes. We may share information we have collected about you in certain situations, such as with third-party service providers that perform services for us or on our behalf, including data analysis and hosting services.
              </p>
              
              <h2 className="text-2xl font-bold text-foreground mt-8">4. Data Security</h2>
              <p>
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8">5. Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:privacy@financewise.ai">privacy@financewise.ai</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Landmark } from "lucide-react";

import { PlaceHolderImages } from "@/lib/placeholder-images";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  const authBgImage = PlaceHolderImages.find(
    (img) => img.id === "auth-background"
  );

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <RegisterForm />
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
      {authBgImage && (
          <Image
            src={authBgImage.imageUrl}
            alt={authBgImage.description}
            width={1200}
            height={1800}
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            data-ai-hint={authBgImage.imageHint}
          />
        )}
        <div className="absolute top-0 left-0 right-0 p-8 bg-gradient-to-b from-black/60 to-transparent">
            <Link href="/" className="flex items-center gap-2 text-primary-foreground">
                <Landmark className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold font-headline text-white">FinanceWise AI</span>
            </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
            <div className="text-white">
                <h2 className="text-3xl font-bold">Take Control of Your Finances</h2>
                <p className="mt-2 text-lg">Your intelligent partner for smart budgeting and financial success.</p>
            </div>
        </div>
      </div>
    </div>
  );
}

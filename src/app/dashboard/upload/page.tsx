
import { UploadDashboard } from "@/components/upload/upload-dashboard";

export default function UploadPage() {
  return (
    <div className="rounded-xl p-4 md:p-6 lg:p-8 -m-4 md:-m-6 lg:-m-8 bg-gradient-to-br from-violet-100 via-purple-100 to-violet-100 bg-[length:400%_400%] animate-subtle-shift dark:from-violet-900/30 dark:via-background dark:to-purple-900/30 h-full">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-fuchsia-500 bg-[length:200%_200%] animate-gradient-shift">Upload Transactions</h1>
          <p className="text-muted-foreground">
            Upload a PDF of your transaction history and let AI analyze it for you.
          </p>
        </div>
        <UploadDashboard />
      </div>
    </div>
  );
}

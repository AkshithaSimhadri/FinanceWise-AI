import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";
import { UserProvider } from "@/context/user-context";
import { GoalProvider } from "@/context/goal-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <GoalProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1">
              <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
                  <div className="md:hidden">
                    <SidebarTrigger>
                      <PanelLeft className="h-5 w-5" />
                      <span className="sr-only">Toggle Menu</span>
                    </SidebarTrigger>
                  </div>
                  <div className="flex-1">
                    {/* Header content can go here, e.g., search bar */}
                  </div>
              </header>
              <main className="flex-1 p-4 md:p-6 lg:p-8 bg-secondary/50">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </GoalProvider>
    </UserProvider>
  );
}

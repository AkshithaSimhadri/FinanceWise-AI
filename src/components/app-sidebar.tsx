"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Landmark,
  LayoutDashboard,
  ArrowRightLeft,
  PiggyBank,
  Target,
  AreaChart,
  Lightbulb,
  LogOut,
  User,
  UserCircle,
  UploadCloud,
} from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useUser as useAuthUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/transactions", icon: ArrowRightLeft, label: "Transactions" },
  { href: "/dashboard/budgets", icon: PiggyBank, label: "Budgets" },
  { href: "/dashboard/goals", icon: Target, label: "Goals" },
  { href: "/dashboard/forecast", icon: AreaChart, label: "Forecast" },
  { href: "/dashboard/guidance", icon: Lightbulb, label: "Guidance" },
  { href: "/dashboard/upload", icon: UploadCloud, label: "Upload" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuthUser();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    if (!auth) return;
    await signOut(auth);
    router.push("/");
  };

  return (
    <Sidebar className="bg-gradient-to-br from-primary via-accent to-fuchsia-500 bg-[length:200%_200%] text-primary-foreground">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-primary-foreground hover:bg-white/20"
            asChild
          >
            <SidebarTrigger>
              <Landmark className="h-6 w-6" />
            </SidebarTrigger>
          </Button>
          <Landmark className="h-6 w-6" />
          <h1 className="text-xl font-bold font-headline">FinanceWise</h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
                className="text-primary-foreground hover:bg-white/20 data-[active=true]:bg-white/20"
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 p-2 rounded-md border border-white/20 bg-slate-800/50 hover:bg-slate-800/70 cursor-pointer">
              <Avatar>
                <AvatarImage src={user?.photoURL ?? undefined} />
                <AvatarFallback>
                  <UserCircle />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold truncate">
                  {user?.displayName || user?.email}
                </span>
                <span className="text-xs opacity-80 truncate">
                  {user?.email}
                </span>
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 mb-2" side="top" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

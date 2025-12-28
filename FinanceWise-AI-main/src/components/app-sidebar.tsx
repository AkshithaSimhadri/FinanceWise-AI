"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Landmark,
  LayoutDashboard,
  ArrowRightLeft,
  PiggyBank,
  Target,
  AreaChart,
  Lightbulb,
  LogOut,
  Settings,
  UserCircle
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
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSidebar } from "@/components/ui/sidebar";
import { useUser } from "@/context/user-context";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/transactions", icon: ArrowRightLeft, label: "Transactions" },
  { href: "/dashboard/budgets", icon: PiggyBank, label: "Budgets" },
  { href: "/dashboard/goals", icon: Target, label: "Goals" },
  { href: "/dashboard/forecast", icon: AreaChart, label: "Forecast" },
  { href: "/dashboard/guidance", icon: Lightbulb, label: "Guidance" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { isMobile } = useSidebar();
  const { user } = useUser();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden" asChild>
              <SidebarTrigger>
                <Landmark className="h-6 w-6 text-primary" />
              </SidebarTrigger>
            </Button>
            <Landmark className="h-6 w-6 text-primary" />
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
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings" isActive={pathname === '/dashboard/settings'}>
              <Link href="/dashboard/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Log out">
              <Link href="/">
                <LogOut />
                <span>Log out</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex items-center gap-3 p-2 rounded-md border border-border bg-card">
            <Avatar>
                <AvatarImage src="https://picsum.photos/seed/user/40/40" />
                <AvatarFallback>
                    <UserCircle />
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="text-sm font-semibold">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

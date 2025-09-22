"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, NotebookText, Archive, User, Info, BookOpen, Heart } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar';
import { AppHeader } from '@/components/app/header';
import { cn } from '@/lib/utils';
import React from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/quiz', label: 'Daily Quiz', icon: NotebookText },
  { href: '/archive', label: 'Archive', icon: Archive },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/about', label: 'About', icon: Info },
];

const donateLink = "https://www.paypal.com/ncp/payment/FTWD5H25EELH6";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <BookOpen className="text-primary" />
            <span>Lexi Daily</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
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
             <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Donate"
                >
                  <Link href={donateLink} target="_blank" rel="noopener noreferrer">
                    <Heart className="text-red-500" />
                    <span>Donate</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="text-xs text-sidebar-foreground/50 p-2 text-center group-data-[collapsible=icon]:hidden">
            &copy; {new Date().getFullYear()} Lexi Daily
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className={cn("transition-all duration-300")}>
        <AppHeader />
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, TrendingUp, Heart, Settings, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/', label: 'dashboard', icon: LayoutDashboard },
  { href: '/trending', label: 'trending', icon: TrendingUp },
  { href: '/favorites', label: 'favorites', icon: Heart },
  { href: '/settings', label: 'settings', icon: Settings },
];

export function Sidebar() {
  const { t } = useTranslation();
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-card h-screen sticky top-0 hidden md:block">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <Hash className="w-8 h-8" />
          <span>MyDash</span>
        </Link>
      </div>
      <nav className="px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative",
                isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                />
              )}
              <item.icon className="w-5 h-5" />
              <span className="capitalize">{t(item.label)}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

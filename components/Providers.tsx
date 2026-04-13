'use client';

import { StoreProvider } from '@/store/StoreProvider';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '@/lib/i18n';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

function ThemeLoader({ children }: { children: React.ReactNode }) {
  const theme = useSelector((state: RootState) => state.userPreferences.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="bg-white dark:bg-gray-900 min-h-screen" />;
  }

  return (
    <StoreProvider>
      <ThemeLoader>
        <DndProvider backend={HTML5Backend}>
          {children}
        </DndProvider>
      </ThemeLoader>
    </StoreProvider>
  );
}

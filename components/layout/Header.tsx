'use client';

import { Search, User, Bell, Moon, Sun, Monitor } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setTheme } from '@/store/slices/userPreferencesSlice';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.userPreferences.theme);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="h-16 border-b bg-card px-8 flex items-center justify-between sticky top-0 z-50">
      <div className="flex-1 max-w-xl">
        <div className={`relative flex items-center transition-all ${isSearchFocused ? 'scale-105' : ''}`}>
          <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t('search')}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-full pl-10 pr-4 py-2 bg-accent rounded-full border-none focus:ring-2 focus:ring-primary transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex bg-accent rounded-full p-1">
          <button
            onClick={() => dispatch(setTheme('light'))}
            className={`p-1.5 rounded-full transition-all ${theme === 'light' ? 'bg-white shadow-sm text-primary' : 'text-muted-foreground'}`}
          >
            <Sun className="w-4 h-4" />
          </button>
          <button
            onClick={() => dispatch(setTheme('dark'))}
            className={`p-1.5 rounded-full transition-all ${theme === 'dark' ? 'bg-gray-800 shadow-sm text-primary' : 'text-muted-foreground'}`}
          >
            <Moon className="w-4 h-4" />
          </button>
          <button
            onClick={() => dispatch(setTheme('system'))}
            className={`p-1.5 rounded-full transition-all ${theme === 'system' ? 'bg-white dark:bg-gray-800 shadow-sm text-primary' : 'text-muted-foreground'}`}
          >
            <Monitor className="w-4 h-4" />
          </button>
        </div>

        <button className="relative p-2 text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-card" />
        </button>

        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white cursor-pointer hover:opacity-90 transition-opacity">
          <User className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
}

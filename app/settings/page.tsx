'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toggleCategory, setLanguage } from '@/store/slices/userPreferencesSlice';
import { useTranslation } from 'react-i18next';
import { Check, Globe, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';

const availableCategories = [
  'technology', 'sports', 'finance', 'entertainment', 'science', 'health', 'business'
];

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
];

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { categories, language } = useSelector((state: RootState) => state.userPreferences);

  const handleLanguageChange = (code: string) => {
    dispatch(setLanguage(code));
    i18n.changeLanguage(code);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-12">
        <h2 className="text-3xl font-bold tracking-tight">{t('settings')}</h2>

        <section className="space-y-6">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <LayoutGrid className="w-6 h-6 text-primary" />
            <h3>{t('categories')}</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {availableCategories.map((cat) => {
              const isActive = categories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => dispatch(toggleCategory(cat))}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all",
                    isActive 
                      ? "bg-primary/10 border-primary text-primary shadow-sm" 
                      : "bg-card border-transparent hover:border-muted text-muted-foreground"
                  )}
                >
                  <span className="capitalize font-medium">{t(cat)}</span>
                  {isActive && <Check className="w-4 h-4" />}
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <Globe className="w-6 h-6 text-primary" />
            <h3>Language</h3>
          </div>
          <div className="flex gap-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={cn(
                  "px-6 py-3 rounded-xl border-2 font-medium transition-all",
                  language === lang.code
                    ? "bg-primary/10 border-primary text-primary shadow-sm"
                    : "bg-card border-transparent hover:border-muted text-muted-foreground"
                )}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

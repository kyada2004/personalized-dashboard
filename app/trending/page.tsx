'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { Feed } from '@/components/dashboard/Feed';
import { useTranslation } from 'react-i18next';

export default function TrendingPage() {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <div className="max-w-[1600px] mx-auto space-y-8">
        <h2 className="text-2xl font-bold tracking-tight">{t('trending')}</h2>
        <Feed />
      </div>
    </MainLayout>
  );
}

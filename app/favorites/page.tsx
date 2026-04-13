'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/dashboard/Card';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useTranslation } from 'react-i18next';
import { HeartOff } from 'lucide-react';

export default function FavoritesPage() {
  const { t } = useTranslation();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  return (
    <MainLayout>
      <div className="max-w-[1600px] mx-auto space-y-8">
        <h2 className="text-2xl font-bold tracking-tight">{t('favorites')}</h2>
        
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-card/50 rounded-2xl border-2 border-dashed">
            <HeartOff className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">{t('noFavorites')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((item, index) => (
              <Card key={item.id} item={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

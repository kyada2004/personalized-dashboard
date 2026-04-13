'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useGetNewsByCategoryQuery } from '@/store/services/newsApi';
import { useGetMoviesQuery } from '@/store/services/tmdbApi';
import { Card } from './Card';
import { ContentItem } from '@/types';
import { useTranslation } from 'react-i18next';
import { motion, Reorder } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

export function Feed() {
  const { t } = useTranslation();
  const categories = useSelector((state: RootState) => state.userPreferences.categories);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<ContentItem[]>([]);
  
  const { data: newsData, isLoading: newsLoading } = useGetNewsByCategoryQuery(
    { category: categories[0] || 'technology', page },
    { skip: categories.length === 0 }
  );
  
  const { data: movieData, isLoading: moviesLoading } = useGetMoviesQuery({ page });

  useEffect(() => {
    const combined = [...(newsData || []), ...(movieData || [])];
    if (combined.length > 0) {
      setItems((prev) => {
        const newItems = combined.filter(item => !prev.some(p => p.id === item.id));
        return [...prev, ...newItems];
      });
    }
  }, [newsData, movieData]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const dragItem = newItems[dragIndex];
      newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, dragItem);
      return newItems;
    });
  }, []);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && !newsLoading && !moviesLoading) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  if (items.length === 0 && (newsLoading || moviesLoading)) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{t('feed')}</h2>
        <div className="flex gap-2">
          {categories.map((cat) => (
            <span key={cat} className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase">
              {t(cat)}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <Card key={item.id} item={item} index={index} moveCard={moveCard} />
        ))}
      </div>

      <div ref={ref} className="h-20 flex items-center justify-center">
        {(newsLoading || moviesLoading) && (
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        )}
      </div>
    </div>
  );
}

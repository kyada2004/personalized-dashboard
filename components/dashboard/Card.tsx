'use client';

import { ContentItem } from '@/types';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart, Share2, ExternalLink, Play } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '@/store/slices/favoritesSlice';
import { RootState } from '@/store';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  item: ContentItem;
  index: number;
  moveCard?: (dragIndex: number, hoverIndex: number) => void;
}

export function Card({ item, index, moveCard }: CardProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) => 
    state.favorites.items.some((fav) => fav.id === item.id)
  );

  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current || !moveCard) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => ({ id: item.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (moveCard) {
    drag(drop(ref));
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(item));
  };

  return (
    <motion.div
      ref={ref}
      data-handler-id={handlerId}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className={cn(
        "group relative bg-card rounded-2xl overflow-hidden border transition-all hover:shadow-xl",
        isDragging && "opacity-0"
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <button 
            onClick={handleToggleFavorite}
            className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors mr-2"
          >
            <Heart className={cn("w-5 h-5", isFavorite && "fill-red-500 text-red-500")} />
          </button>
          <button className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-black/50 backdrop-blur-md text-[10px] text-white font-medium uppercase">
          {item.type}
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
          <span>{item.category}</span>
          <span>•</span>
          <span>{new Date(item.timestamp).toLocaleDateString()}</span>
        </div>
        <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
        <div className="pt-2">
          <a
            href={item.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            {item.type === 'movie' ? <Play className="w-4 h-4 fill-current" /> : <ExternalLink className="w-4 h-4" />}
            {t(item.ctaText.replace(' ', '').toLowerCase()) || item.ctaText}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

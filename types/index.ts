export type ContentType = 'news' | 'movie' | 'social';

export interface BaseContent {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaUrl: string;
  category: string;
  timestamp: string;
}

export interface NewsContent extends BaseContent {
  type: 'news';
  author?: string;
  source: string;
}

export interface MovieContent extends BaseContent {
  type: 'movie';
  rating: number;
  releaseDate: string;
}

export interface SocialContent extends BaseContent {
  type: 'social';
  username: string;
  likes: number;
  hashtags: string[];
}

export type ContentItem = NewsContent | MovieContent | SocialContent;

export interface UserPreferences {
  categories: string[];
  theme: 'light' | 'dark' | 'system';
  language: string;
}

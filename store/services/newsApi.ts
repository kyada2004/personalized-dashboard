import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ContentItem } from '@/types';

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_NEWS_BASE_URL;

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getNewsByCategory: builder.query<ContentItem[], { category: string; page?: number }>({
      query: ({ category, page = 1 }) => 
        `top-headlines?category=${category}&apiKey=${NEWS_API_KEY}&page=${page}&pageSize=10`,
      transformResponse: (response: any) => {
        return response.articles.map((article: any, index: number) => ({
          id: `news-${article.url}-${index}`,
          type: 'news',
          title: article.title,
          description: article.description || '',
          imageUrl: article.urlToImage || 'https://images.unsplash.com/photo-1504711432869-efd597cdd042?auto=format&fit=crop&q=80&w=800',
          ctaText: 'Read More',
          ctaUrl: article.url,
          category: 'technology', // Map to correct category if needed
          timestamp: article.publishedAt,
          source: article.source.name,
        }));
      },
    }),
  }),
});

export const { useGetNewsByCategoryQuery } = newsApi;

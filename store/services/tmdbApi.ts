import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ContentItem } from '@/types';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getMovies: builder.query<ContentItem[], { category?: string; page?: number }>({
      query: ({ page = 1 }) => 
        `movie/popular?api_key=${TMDB_API_KEY}&page=${page}`,
      transformResponse: (response: any) => {
        return response.results.map((movie: any) => ({
          id: `movie-${movie.id}`,
          type: 'movie',
          title: movie.title,
          description: movie.overview,
          imageUrl: movie.backdrop_path ? `${IMAGE_BASE_URL}${movie.backdrop_path}` : 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800',
          ctaText: 'Play Now',
          ctaUrl: `https://www.themoviedb.org/movie/${movie.id}`,
          category: 'entertainment',
          timestamp: movie.release_date,
          rating: movie.vote_average,
          releaseDate: movie.release_date,
        }));
      },
    }),
  }),
});

export const { useGetMoviesQuery } = tmdbApi;

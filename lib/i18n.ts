import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      dashboard: 'Dashboard',
      feed: 'Personalized Feed',
      trending: 'Trending',
      favorites: 'Favorites',
      search: 'Search...',
      settings: 'Settings',
      readMore: 'Read More',
      playNow: 'Play Now',
      viewPost: 'View Post',
      noFavorites: 'No favorites yet.',
      categories: 'Categories',
      technology: 'Technology',
      sports: 'Sports',
      finance: 'Finance',
      entertainment: 'Entertainment',
      science: 'Science',
      health: 'Health',
    },
  },
  es: {
    translation: {
      dashboard: 'Tablero',
      feed: 'Feed Personalizado',
      trending: 'Tendencias',
      favorites: 'Favoritos',
      search: 'Buscar...',
      settings: 'Ajustes',
      readMore: 'Leer Más',
      playNow: 'Reproducir Ahora',
      viewPost: 'Ver Publicación',
      noFavorites: 'Aún no hay favoritos.',
      categories: 'Categorías',
      technology: 'Tecnología',
      sports: 'Deportes',
      finance: 'Finanzas',
      entertainment: 'Entretenimiento',
      science: 'Ciencia',
      health: 'Salud',
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

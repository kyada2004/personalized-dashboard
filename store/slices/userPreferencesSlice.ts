import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserPreferences } from '../types';

const initialState: UserPreferences = {
  categories: ['technology', 'sports', 'finance'],
  theme: 'system',
  language: 'en',
};

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      if (state.categories.includes(category)) {
        state.categories = state.categories.filter((c) => c !== category);
      } else {
        state.categories.push(category);
      }
    },
    setTheme: (state, action: PayloadAction<UserPreferences['theme']>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { toggleCategory, setTheme, setLanguage } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;

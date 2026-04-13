import userPreferencesReducer, { toggleCategory } from './userPreferencesSlice';
import { UserPreferences } from '../../types';

describe('userPreferencesSlice', () => {
  const initialState: UserPreferences = {
    categories: ['technology'],
    theme: 'system',
    language: 'en',
  };

  it('should handle toggleCategory - adding new category', () => {
    const actual = userPreferencesReducer(initialState, toggleCategory('sports'));
    expect(actual.categories).toContain('sports');
    expect(actual.categories).toHaveLength(2);
  });

  it('should handle toggleCategory - removing existing category', () => {
    const actual = userPreferencesReducer(initialState, toggleCategory('technology'));
    expect(actual.categories).not.toContain('technology');
    expect(actual.categories).toHaveLength(0);
  });
});

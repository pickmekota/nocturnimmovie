import { create } from 'zustand';

const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');

export const useFavoritesStore = create((set) => ({
  favorites: savedFavorites,
  addFavorite: (movie) =>
    set((state) => {
      const exists = state.favorites.find((m) => m.id === movie.id);
      const newFavorites = exists ? state.favorites : [...state.favorites, movie];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return { favorites: newFavorites };
    }),
  removeFavorite: (movieId) =>
    set((state) => {
      const newFavorites = state.favorites.filter((m) => m.id !== movieId);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return { favorites: newFavorites };
    }),
}));

import { create } from 'zustand';
import {
  createJSONStorage,
  persist,
} from 'zustand/middleware';

export type Theme = 'light' | 'dark';

type ThemeState = {
  theme: Theme;
};

type ThemeActions = {
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const initialThemeState: ThemeState = {
  theme: 'light',
};

export const useThemeStore = create<ThemeState & ThemeActions>()(
  persist(
    (set, get) => ({
      ...initialThemeState,
      toggleTheme: () =>
        set({ theme: get().theme === 'light' ? 'dark' : 'light' }),
      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: 'persist-theme',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

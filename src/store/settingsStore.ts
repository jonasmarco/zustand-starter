import { create } from 'zustand';
import {
  createJSONStorage,
  persist,
} from 'zustand/middleware';

export type Language = 'en' | 'pt' | 'es';

type SettingsState = {
  language: Language;
  notificationsEnabled: boolean;
};

type SettingsActions = {
  updateSettings: (partial: Partial<SettingsState>) => void;
  resetSettings: () => void;
};

const initialSettingsState: SettingsState = {
  language: 'pt',
  notificationsEnabled: true,
};

export const useSettingsStore = create<SettingsState & SettingsActions>()(
  persist(
    (set, get) => ({
      ...initialSettingsState,
      updateSettings: (partial: Partial<SettingsState>) =>
        set((state) => ({ ...state, ...partial })),
      resetSettings: () => set(initialSettingsState),
    }),
    {
      name: 'persist-settings',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

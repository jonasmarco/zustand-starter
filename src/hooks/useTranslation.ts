import { translations } from '../i18n/translations';
import { useSettingsStore } from '../store/settingsStore';

export const useTranslation = () => {
  const { language } = useSettingsStore();

  const t = (path: string) => {
    const keys = path.split('.');
    let current: any = translations[language];

    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation missing for key: ${path}`);
        return path;
      }
      current = current[key];
    }

    return current;
  };

  return { t };
};

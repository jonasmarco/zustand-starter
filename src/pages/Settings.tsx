import React, {
  useEffect,
  useRef,
} from 'react';

import { useNotification } from '../hooks/useNotification';
import { useTranslation } from '../hooks/useTranslation';
import { useSettingsStore } from '../store/settingsStore';
import { useThemeStore } from '../store/themeStore';

interface SettingsState {
  language: 'en' | 'pt' | 'es';
  notificationsEnabled: boolean;
}

const Settings: React.FC = () => {
  const { language, notificationsEnabled, updateSettings } = useSettingsStore();
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const { notify } = useNotification();

  const handleSettingsChange = (settings: Partial<SettingsState>) => {
    updateSettings(settings);
  };

  const isFirstRenderNotifications = useRef(true);

  useEffect(() => {
    if (isFirstRenderNotifications.current) {
      isFirstRenderNotifications.current = false;
      return;
    }

    if (notificationsEnabled) {
      notify(
        'notification.settingsNotificationsEnabled',
        {
          type: 'info',
          description: 'notification.settingsNotificationsDescription',
        },
        true
      );
    } else {
      notify(
        'notification.settingsNotificationsDisabled',
        {
          type: 'warning',
          description: 'notification.settingsNoNotificationsDescription',
        },
        true
      );
    }
  }, [notificationsEnabled]);

  const isFirstRenderLanguage = useRef(true);
  useEffect(() => {
    if (isFirstRenderLanguage.current) {
      isFirstRenderLanguage.current = false;
      return;
    }
    notify(
      'notification.settingsLanguage',
      {
        type: 'success',
        description: 'notification.settingsLanguageDescription',
      },
      true
    );
  }, [language]);

  return (
    <div
      className={`max-w-md mx-auto p-6 rounded-lg shadow-md ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <h2
        className={`text-2xl font-bold mb-4 ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}
      >
        {t('settings.title')}
      </h2>
      <div className="space-y-4">
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {t('settings.language')}
          </label>
          <select
            value={language}
            onChange={(e) =>
              handleSettingsChange({
                language: e.target.value as 'en' | 'pt' | 'es',
              })
            }
            className={`w-full p-2 border rounded ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-gray-100'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="en">{t('settings.english')}</option>
            <option value="pt">{t('settings.portuguese')}</option>
            <option value="es">{t('settings.spanish')}</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="notifications"
            checked={notificationsEnabled}
            onChange={(e) =>
              handleSettingsChange({ notificationsEnabled: e.target.checked })
            }
            className={`mr-2 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600'
                : 'bg-white border-gray-300'
            }`}
          />
          <label
            htmlFor="notifications"
            className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
          >
            {t('settings.notifications')}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;

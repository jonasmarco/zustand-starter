import { useCallback } from 'react';
import { toast } from 'sonner';

import { useSettingsStore } from '../store/settingsStore';
import { useThemeStore } from '../store/themeStore';
import { useTranslation } from './useTranslation';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationOptions {
  type?: NotificationType;
  description?: string;
  duration?: number;
}

export const useNotification = () => {
  const { notificationsEnabled } = useSettingsStore();
  const { theme } = useThemeStore();
  const { t } = useTranslation();

  const notify = useCallback(
    (
      messageKey: string,
      { type = 'info', description, duration = 4000 }: NotificationOptions = {},
      force = false
    ) => {
      if (!notificationsEnabled && !force) return;

      const toastOptions = {
        className: `${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`,
        duration,
        description: description ? t(description) : undefined,
      };

      const message = t(messageKey);

      switch (type) {
        case 'success':
          toast.success(message, toastOptions);
          break;
        case 'error':
          toast.error(message, toastOptions);
          break;
        case 'warning':
          toast.warning(message, toastOptions);
          break;
        default:
          toast.info(message, toastOptions);
      }
    },
    [notificationsEnabled, theme, t]
  );

  return { notify };
};

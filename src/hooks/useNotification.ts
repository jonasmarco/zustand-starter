import { toast } from 'sonner';

import { useSettingsStore } from '../store/settingsStore';
import { useThemeStore } from '../store/themeStore';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationOptions {
  type?: NotificationType;
  description?: string;
  duration?: number;
}

export const useNotification = () => {
  const { notificationsEnabled } = useSettingsStore();
  const { theme } = useThemeStore();

  const notify = (
    message: string,
    { type = 'info', description, duration = 4000 }: NotificationOptions = {}
  ) => {
    if (!notificationsEnabled) return;

    const toastOptions = {
      className: `${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`,
      duration,
      description,
    };

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
  };

  return { notify };
};

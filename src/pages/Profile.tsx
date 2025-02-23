import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useNotification } from '../hooks/useNotification';
import { useTranslation } from '../hooks/useTranslation';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

const Profile: React.FC = () => {
  const { isAuthenticated, user, reset } = useAuthStore();
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { notify } = useNotification();

  const handleLogout = () => {
    reset();
    notify('notification.logout', {
      type: 'info',
      description: 'notification.logoutDescription',
    });
    navigate('/');
  };

  if (!isAuthenticated || !user) {
    return (
      <div
        className={`p-8 rounded-lg shadow-md ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
          {t('profile.notAuthenticated')}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`max-w-2xl mx-auto p-4 sm:p-8 rounded-lg shadow-md ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8">
        <div className="w-full sm:w-auto flex flex-col items-center">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-lg shadow-md"
          />
          <h2
            className={`text-2xl font-bold mt-4 text-center sm:hidden ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}
          >
            {user.name}
          </h2>
        </div>

        <div className="flex-1 w-full">
          <h2
            className={`text-2xl font-bold mb-4 hidden sm:block ${
              theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
            }`}
          >
            {user.name}
          </h2>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            <InfoField label={t('profile.position')} value={user.position} />
            <InfoField label={t('profile.email')} value={user.email} />
            <InfoField label={t('profile.phone')} value={user.phone} />
            <InfoField label={t('profile.cellphone')} value={user.cellphone} />
            <InfoField label={t('profile.cpf')} value={user.cpf} />
            <InfoField label={t('profile.login')} value={user.login} />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleLogout}
          className={`w-full sm:w-auto px-4 py-2 rounded ${
            theme === 'dark'
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-red-500 hover:bg-red-600'
          } text-white`}
        >
          {t('profile.logout')}
        </button>
      </div>
    </div>
  );
};

const InfoField: React.FC<{ label: string; value: string | undefined }> = ({
  label,
  value,
}) => (
  <div className="p-3 rounded-lg bg-opacity-50 bg-gray-100 dark:bg-gray-700">
    <p className="font-semibold text-sm">{label}</p>
    <p className="mt-1">{value}</p>
  </div>
);

export default Profile;

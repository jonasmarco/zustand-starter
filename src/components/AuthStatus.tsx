import React from 'react';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { useNotification } from '../hooks/useNotification';
import { useTranslation } from '../hooks/useTranslation';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

const LogoutIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const AuthStatus: React.FC = () => {
  const { isAuthenticated, user, update, reset } = useAuthStore();
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { notify } = useNotification();

  const handleLogin = () => {
    update({
      isAuthenticated: true,
      user: {
        name: 'João Silva',
        email: 'joao.silva@exemplo.com',
        uuid: '123456',
        login: 'joaosilva',
        avatar: 'https://i.pravatar.cc/150?u=123456',
        cpf: '123.456.789-00',
        position: 'Desenvolvedor Senior',
        phone: '(11) 3456-7890',
        cellphone: '(11) 98765-4321',
      },
    });
    notify('notification.login', {
      type: 'success',
      description: 'notification.loginDescription',
    });
    navigate('/profile');
  };

  const handleLogout = () => {
    reset();
    notify('notification.logout', {
      type: 'info',
      description: 'notification.logoutDescription',
    });
    navigate('/');
  };

  return (
    <div className="flex items-center gap-2">
      {isAuthenticated && user ? (
        <div className="flex items-center gap-4">
          <Link
            to="/profile"
            className={`flex items-center gap-2 transition-colors hover:text-blue-200`}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full ring-2 ring-blue-500"
            />
            <span
              className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}
            >
              {t('auth.loggedInAs')} {user.name}
            </span>
          </Link>
          <button
            onClick={handleLogout}
            className={`p-2 rounded-full transition-colors ${
              theme === 'dark'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-red-500 hover:bg-red-600'
            } text-white`}
            title={t('profile.logout')}
          >
            <LogoutIcon />
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className={`px-4 py-2 rounded ${
            theme === 'dark'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {t('auth.login')}
        </button>
      )}
    </div>
  );
};

export default AuthStatus;

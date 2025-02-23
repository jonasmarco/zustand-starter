import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useNotification } from '../hooks/useNotification';
import { useTranslation } from '../hooks/useTranslation';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

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

  return (
    <div className="flex items-center gap-2">
      {isAuthenticated && user ? (
        <div className="flex items-center gap-2">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
          <span
            className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}
          >
            {t('auth.loggedInAs')} {user.name}
          </span>
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

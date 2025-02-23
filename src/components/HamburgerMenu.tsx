import React from 'react';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { useTranslation } from '../hooks/useTranslation';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClose }) => {
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const { isAuthenticated, user, update, reset } = useAuthStore();
  const navigate = useNavigate();

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
    navigate('/profile');
    onClose();
  };

  const handleLogout = () => {
    reset();
    navigate('/');
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      <div
        className={`absolute left-0 top-0 h-full w-64 shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="p-4 flex-1">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className={`p-2 rounded-full hover:bg-opacity-80 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="mt-8">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  onClick={onClose}
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-100 hover:bg-gray-700'
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {t('menu.home')}
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  onClick={onClose}
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-100 hover:bg-gray-700'
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {t('menu.profile')}
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  onClick={onClose}
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-100 hover:bg-gray-700'
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {t('menu.settings')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {isAuthenticated && user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div
                  className={
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }
                >
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm opacity-75">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className={`w-full px-4 py-2 rounded ${
                  theme === 'dark'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-red-500 hover:bg-red-600'
                } text-white`}
              >
                {t('profile.logout')}
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className={`w-full px-4 py-2 rounded ${
                theme === 'dark'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              {t('auth.login')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;

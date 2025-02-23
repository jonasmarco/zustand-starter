import React, { useState } from 'react';
import {
  Link,
  Outlet,
} from 'react-router-dom';

import { useTranslation } from '../hooks/useTranslation';
import { useThemeStore } from '../store/themeStore';
import AuthStatus from './AuthStatus';
import HamburgerMenu from './HamburgerMenu';

const Layout: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark'
          ? 'bg-gray-900 text-gray-100'
          : 'bg-gray-100 text-gray-900'
      }`}
    >
      <nav
        className={`${
          theme === 'dark' ? 'bg-gray-800' : 'bg-blue-600'
        } text-white p-4`}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between lg:hidden">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-opacity-80"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <span className="text-lg font-semibold">Zustand Starter</span>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded ${
                theme === 'dark'
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-blue-700 hover:bg-blue-800'
              }`}
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
          </div>

          <div className="hidden lg:flex lg:justify-between lg:items-center">
            <div className="space-x-4">
              <Link to="/" className="hover:text-blue-200">
                {t('menu.home')}
              </Link>
              <Link to="/profile" className="hover:text-blue-200">
                {t('menu.profile')}
              </Link>
              <Link to="/settings" className="hover:text-blue-200">
                {t('menu.settings')}
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <AuthStatus />
              <button
                onClick={toggleTheme}
                className={`p-2 rounded ${
                  theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-blue-700 hover:bg-blue-800'
                }`}
              >
                {theme === 'dark' ? '🌞' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

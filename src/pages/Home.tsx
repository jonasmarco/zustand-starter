import React from 'react';

import { useNotification } from '../hooks/useNotification';
import { useTranslation } from '../hooks/useTranslation';
import useCounterStore from '../store/counterStore';
import { useThemeStore } from '../store/themeStore';

const Home: React.FC = () => {
  const { count, increment, decrement, reset } = useCounterStore();
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const { notify } = useNotification();

  const handleIncrement = () => {
    increment();
    notify('Contador incrementado!', {
      type: 'success',
      description: `Novo valor: ${count + 1}`,
    });
  };

  const handleDecrement = () => {
    decrement();
    notify('Contador decrementado!', {
      type: 'info',
      description: `Novo valor: ${count - 1}`,
    });
  };

  const handleReset = () => {
    reset();
    notify('Contador resetado!', {
      type: 'warning',
      description: 'O contador voltou para zero',
    });
  };

  return (
    <div
      className={`p-8 rounded-lg shadow-md text-center ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <h1
        className={`text-2xl font-bold mb-4 ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}
      >
        {t('home.title')}
      </h1>
      <p
        className={`mb-6 text-xl ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        {t('home.counter')}: {count}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          className={`px-4 py-2 rounded ${
            theme === 'dark'
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
          onClick={handleIncrement}
        >
          {t('home.increment')}
        </button>
        <button
          className={`px-4 py-2 rounded ${
            theme === 'dark'
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-red-500 hover:bg-red-600'
          } text-white`}
          onClick={handleDecrement}
        >
          {t('home.decrement')}
        </button>
        <button
          className={`px-4 py-2 rounded ${
            theme === 'dark'
              ? 'bg-gray-600 hover:bg-gray-700'
              : 'bg-gray-500 hover:bg-gray-600'
          } text-white`}
          onClick={handleReset}
        >
          {t('home.reset')}
        </button>
      </div>
    </div>
  );
};

export default Home;

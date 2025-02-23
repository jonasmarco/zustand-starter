import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { Toaster } from 'sonner';

import Layout from './components/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import { useThemeStore } from './store/themeStore';

const App: React.FC = () => {
  const { theme } = useThemeStore();

  return (
    <BrowserRouter>
      <Toaster
        position="bottom-right"
        expand={true}
        richColors
        theme={theme}
        closeButton
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

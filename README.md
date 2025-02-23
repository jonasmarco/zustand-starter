# Zustand Starter

A modern React starter template featuring Zustand for state management, with built-in support for dark mode, internationalization, authentication, and toast notifications.

![Zustand Starter](./preview.png)

## 🚀 Features

- 📦 [Zustand](https://github.com/pmndrs/zustand) for state management
- 🎨 [Tailwind CSS](https://tailwindcss.com/) for styling
- 🌙 Dark mode support with persistence
- 🌐 Internationalization (i18n) with language switching
- 🔒 Authentication system with user profile (faker)
- 📱 Fully responsive design
- ⚡ [Rspack](https://www.rspack.dev/) for blazing fast builds
- 🧩 TypeScript for type safety
- 🛣️ React Router for navigation
- 💾 Local storage persistence for all stores
- 🔔 Toast notifications with [Sonner](https://sonner.emilkowal.ski/)
  - Theme-aware notifications
  - Configurable via settings
  - Multiple notification types (success, error, info, warning)
  - Rich content support with descriptions

## 🛠️ Tech Stack

- React 19
- TypeScript
- Zustand
- Tailwind CSS
- React Router
- Rspack
- PostCSS
- ESLint
- Prettier
- Babel
- Sonner

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/jonasmarco/zustand-starter.git

# Navigate to the project directory
cd zustand-starter

# Install dependencies
yarn install

# Start the development server
yarn start
```

🏗️ Project Structure

```markdown
src/
├── components/ # Reusable components
├── hooks/ # Custom hooks including useNotification
├── i18n/ # Translations
├── pages/ # Page components
├── store/ # Zustand stores
└── App.tsx # Main application component
```

💾 State Management

The project includes four main stores:

- authStore: Handles user authentication and profile
- themeStore: Manages dark/light theme switching
- settingsStore: Handles app settings, language preferences, and notification settings
- counterStore: A simple counter example with notifications
- all stores are persisted in localStorage and can be easily extended.

🔔 Notifications System

The project includes a comprehensive notification system built with Sonner:

## Features

- Theme-aware styling (automatically matches dark/light mode)
- Can be globally enabled/disabled via settings
- Multiple notification types (success, error, info, warning)
- Rich content with descriptions
- Persistent across page navigation
- Customizable duration
- Mobile-responsive

🌐 Internationalization

Supports three languages out of the box:

- 🇺🇸 English
- 🇧🇷 Portuguese
- 🇪🇸 Spanish

Language can be changed in the Settings page and persists across sessions.

🎨 Theming

- Includes a fully implemented dark mode that:
  - Persists across sessions
  - Can be toggled via the UI
  - Supports system preferences
  - Applies consistently across all components including notifications

📱 Responsive Design

- Mobile-first approach
- Hamburger menu for mobile navigation
- Responsive layouts for all pages
- Touch-friendly interface
- Optimized notification positioning for mobile

🔧 Development build

```bash
  ## Start development server
  yarn start

  ## Build for production
  yarn build
```

📝 License

- MIT License - see the LICENSE file for details

🤝 Contributing

- Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

💖 Support

- Give a ⭐️ if this project helped you!

📧 Contact

- Jonas Marco - @jonasmarco

Project Link: <https://github.com/jonasmarco/zustand-starter>

🌏 Vercel Deployment

- [zustand-starter-xi.vercel.app](https://zustand-starter-xi.vercel.app/)

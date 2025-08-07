# VibeBot React Frontend

A modern, production-ready React frontend for VibeBot - an Instagram automation SaaS platform.

## 🚀 Tech Stack

- **React 18** with **Vite** for fast development
- **Tailwind CSS v4** for utility-first styling
- **shadcn/ui** for beautiful, accessible components
- **Clerk** for authentication and user management
- **Axios** for API communication
- **React Router** for client-side routing
- **Lucide React** for consistent icons

## 📦 Features

- 🔐 **Authentication** - Clerk integration with sign-in/sign-up
- 📊 **Dashboard** - Real-time analytics and metrics
- 📱 **Responsive** - Mobile-first design with dark mode
- 🎨 **Modern UI** - Instagram-inspired gradients and clean design
- ⚡ **Fast** - Vite for lightning-fast development
- 🔧 **API Ready** - Configured for backend integration

## 🛠️ Setup

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Clerk publishable key:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   VITE_API_URL=http://localhost:3000/api
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/              # Layout components
│   └── ui/                  # shadcn/ui components
├── pages/                   # Page components
├── lib/                     # Utilities and API config
└── App.jsx                  # Main app component
```

## 🔌 API Integration

The frontend is configured to connect to these backend endpoints:

- `GET /api/user/profile` - User profile and subscription
- `GET /api/user/analytics` - Dashboard analytics
- `GET /api/instagram/status` - Instagram connection status

All requests include Bearer token authentication via Clerk.

## 🎯 Pages & Routes

- `/dashboard` - Main dashboard with metrics and overview
- `/automation` - Automation setup and management
- `/analytics` - Detailed analytics and reporting
- `/posts` - Instagram posts management
- `/webhooks` - Webhook testing and configuration
- `/settings` - Account settings

## 🔑 Authentication

Using Clerk for authentication:
- Automatic sign-in/sign-up flows
- JWT token management
- User profile management
- Secure API authentication

## 🎨 Styling

- **Dark mode by default** with Instagram-inspired design
- **Tailwind CSS v4** for utility-first styling
- **shadcn/ui components** for consistent UI
- **Responsive design** for all screen sizes

## 📱 Dashboard Features

The main dashboard includes:
- Instagram connection status banner
- Key metrics cards (followers, automations, messages)
- Response rate with progress bars
- Account overview and recent activity
- Quick action buttons

## 🚀 Development

Start the dev server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📝 Notes

- Ensure your backend API is running on the configured URL
- Update the Clerk publishable key in `.env`
- All components use dark mode by default
- The project is configured for immediate backend integration+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

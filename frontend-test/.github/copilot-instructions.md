<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# VibeBot React Frontend - Copilot Instructions

## Project Overview

This is the frontend for VibeBot, a SaaS Instagram automation platform. It's built with:

- **React** with **Vite** as the build tool
- **Tailwind CSS v4** for styling
- **shadcn/ui** components for UI elements
- **Clerk** for authentication
- **Axios** for API calls
- **React Router** for navigation
- **Lucide React** for icons

## Code Style & Patterns

### React Components

- Use functional components with hooks
- Prefer `const ComponentName = () => {}` syntax
- Use proper JSX formatting with self-closing tags
- Implement loading states, error handling, and empty states

### Styling

- Use Tailwind CSS classes for all styling
- Leverage shadcn/ui components: Card, Button, Badge, Progress, etc.
- Follow dark mode design by default
- Use Instagram-inspired gradients: `bg-gradient-to-r from-pink-500 to-orange-500`

### API Integration

- Import `api` from `@/lib/api` for HTTP requests
- Use Clerk's `getToken()` for authentication headers
- Implement proper loading and error states
- Handle 401 errors by redirecting to sign-in

### File Structure

- Components in `/src/components/`
- Pages in `/src/pages/`
- Utilities in `/src/lib/`
- Use `@/` prefix for imports

### Authentication

- Use Clerk's `useAuth()`, `useUser()` hooks
- Wrap authenticated content with `<SignedIn>`
- Redirect unauthenticated users with `<RedirectToSignIn>`

## API Endpoints Expected

- `GET /api/user/profile` - User profile and subscription info
- `GET /api/user/analytics` - Dashboard analytics data
- `GET /api/instagram/status` - Instagram connection status
- All endpoints expect Bearer token authentication

## Key Features to Implement

1. Dashboard with real-time metrics
2. Instagram account connection status
3. Automation management
4. Analytics and reporting
5. Webhook testing interface
6. Responsive design for mobile/desktop

# GitHub Copilot Instructions for Daddy Leads

This document provides guidance for GitHub Copilot when working on the Daddy Leads B2B lead scraping and enrichment platform.

## Project Overview

Daddy Leads is a comprehensive B2B lead scraping and enrichment platform built as a monorepo with:
- **Frontend**: React 18 + TypeScript + Vite at the project root
- **Backend**: Node.js + Express + MongoDB in the `backend/` folder

## Project Structure

### Frontend (Root Level)
- `src/` - React/TypeScript source code
  - `src/components/` - Reusable UI components
  - `src/components/ui/` - shadcn-ui component library
  - `src/pages/` - Page components for routing
  - `src/pages/dashboard/` - Protected dashboard pages
  - `src/hooks/` - Custom React hooks
  - `src/lib/` - Utility functions
  - `src/services/` - API service layer
  - `src/contexts/` - React context providers
- `public/` - Static assets
- Configuration files: `vite.config.ts`, `tailwind.config.ts`, `tsconfig.json`

### Backend (`backend/` folder)
- `backend/api/` - API endpoints
- `backend/models/` - MongoDB models (User, Session)
- `backend/routes/` - Express routes
- `backend/controllers/` - Business logic
- `backend/middleware/` - Express middleware (auth, validation, error handling)
- `backend/utils/` - Utility functions
- `backend/config/` - Configuration files

## Technology Stack

### Frontend
- **React 18.3.1** with TypeScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn-ui** - Accessible component library built on Radix UI
- **React Router DOM 6.30.1** - Client-side routing
- **Framer Motion 11.18.2** - Animations
- **React Hook Form + Zod** - Form management and validation
- **TanStack Query** - Data fetching and caching
- **Lucide React** - Icon library

### Backend
- **Node.js** with Express.js
- **MongoDB** - Database (MongoDB Atlas)
- **Passport.js** - Authentication strategies
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing

## Development Commands

### Frontend
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:8080)
npm run build        # Production build
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Backend
```bash
cd backend
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5000)
npm start            # Production server
```

## Code Style and Conventions

### TypeScript
- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type unless absolutely necessary
- Use type inference where appropriate

### React Components
- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use proper TypeScript typing for props

### File Naming
- Components: PascalCase (e.g., `UserProfile.tsx`)
- Hooks: camelCase with 'use' prefix (e.g., `useAuth.ts`)
- Utils: camelCase (e.g., `formatDate.ts`)
- Pages: PascalCase with 'Page' suffix (e.g., `DashboardPage.tsx`)

### Component Structure
```typescript
// Standard component structure
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  // Props interface
}

export const Component = ({ prop1, prop2 }: ComponentProps) => {
  // Hooks
  // Event handlers
  // Render
  return (
    <div className={cn("base-classes", conditionalClasses)}>
      {/* Content */}
    </div>
  );
};
```

## Design System

### Color System
- **Never use direct hex colors** - Always use semantic tokens from `src/index.css`
- All colors use HSL format for consistency
- Marketing pages: Purple (`#411c78`) and cream (`#faf8f0`)
- Dashboard: Indigo (`#6366f1`) and light purple (`#f5f3ff`)
- Use CSS custom properties defined in `index.css`

### Styling Guidelines
- Use Tailwind CSS utility classes
- Use `cn()` helper from `@/lib/utils` for conditional classes
- Responsive design with mobile-first approach
- Follow existing design patterns from shadcn-ui components

### Animation
- Use Framer Motion for complex animations
- Available Tailwind animations: `accordion-down`, `accordion-up`, `fade-in`, `fade-out`, `scale-in`, `scale-out`, `slide-in-right`, `slide-out-right`
- Add `.hover-scale` class for interactive hover effects

## Routing Structure

### Public Routes (daddy-leads.com)
- `/` - HomePage (marketing landing page)
- `/product` - ProductPage (scraper tools listing)
- `/pricing` - PricingPage (pricing calculator)
- `/connect` - ConnectPage (demo request form)

### Authentication Routes (works on both domains)
- `/access?p=login` - Login page
- `/access?p=signup` - Signup page

### Protected Routes (app.daddy-leads.com)
All dashboard routes require authentication via ProtectedRoute component:
- `/dashboard` - Main dashboard (Sales Navigator Export)
- `/dashboard/sales-navigator` - Sales Navigator Export
- `/dashboard/*` - Other dashboard features

## Authentication

### Frontend
- Auth state managed via `AuthContext` in `src/contexts/AuthContext.tsx`
- API calls in `src/services/authService.ts`
- Token stored in localStorage
- Protected routes use `ProtectedRoute` component

### Backend
- JWT tokens with 7-day expiration
- httpOnly cookies for session management
- Passport.js strategies for authentication
- bcrypt for password hashing (salt rounds ≥ 10)

## API Integration

### Base URLs
- Development: `http://localhost:5000/v1`
- Production: `https://api.daddy-leads.com/v1`

### Auth Endpoints
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/verify` - Verify session token
- `POST /auth/google` - Google OAuth

### API Call Pattern
```typescript
// Use authService for API calls
import { authService } from '@/services/authService';

const response = await authService.signup(userData);
if (response.success) {
  // Handle success
} else {
  // Handle error
}
```

## Database

### MongoDB Models
- **User**: firstName, lastName, email, password, credits (leadsFinderCredits, dataScraperCredits)
- **Session**: userId, token, expiresAt, createdAt

### Credits System
- Users start with 0 credits for both plans
- B2B Leads Finder: $0.0019 per credit ($19 for 10,000 min)
- B2B Data Scraper: $0.0009 per credit ($9 for 10,000 min)

## Component Library (shadcn-ui)

### Using Components
```typescript
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
```

### Adding New Components
```bash
npx shadcn-ui@latest add [component-name]
```

### Available Components
All components in `src/components/ui/` are from shadcn-ui library and should not be heavily modified. Customize via Tailwind classes and variants.

## Best Practices

### Performance
- Use React.memo() for expensive components
- Implement proper key props in lists
- Lazy load routes and heavy components
- Optimize images and assets

### Security
- Validate all user inputs (use Zod schemas)
- Sanitize data before rendering
- Use environment variables for sensitive data
- Never commit `.env` files
- Implement CORS properly on backend
- Use httpOnly cookies for sensitive tokens

### Accessibility
- Use semantic HTML elements
- Include proper ARIA labels
- Ensure keyboard navigation works
- Maintain proper heading hierarchy (H1 > H2 > H3)
- Add descriptive alt text to images

### SEO
- Each page has unique title and meta description
- Use React Helmet Async for meta tags
- Implement proper heading hierarchy
- Use semantic HTML structure

## Testing

### Current State
- No test framework currently configured
- When adding tests, consider: Vitest + React Testing Library

### Testing Guidelines (when implemented)
- Write unit tests for utility functions
- Write integration tests for API endpoints
- Write component tests for complex UI logic
- Test authentication flows thoroughly

## Deployment

### Frontend (Vercel)
- Auto-deploys from main branch
- Custom domains: `daddy-leads.com` and `app.daddy-leads.com`
- Environment variables managed in Vercel dashboard
- Uses `vercel.json` for SPA routing configuration

### Backend
- Deploy to Contabo VPS or similar Node.js hosting
- Use PM2 for process management
- Nginx as reverse proxy with SSL
- MongoDB Atlas for database

## Common Tasks

### Adding a New Page
1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link if needed
4. Add SEO meta tags with React Helmet
5. Ensure responsive design

### Adding a New API Endpoint
1. Create route in `backend/routes/v1/`
2. Create controller in `backend/controllers/`
3. Add validation middleware if needed
4. Add authentication middleware for protected routes
5. Update frontend service to call new endpoint

### Adding a New shadcn Component
```bash
npx shadcn-ui@latest add [component-name]
```
Then import and use in your components.

### Styling a Component
```typescript
// Example 1: Using Tailwind classes
export const SimpleComponent = () => {
  return (
    <div className="flex items-center gap-4 p-6 bg-background">
      <p>Content here</p>
    </div>
  );
};

// Example 2: Using cn() for conditional classes
import { cn } from '@/lib/utils';

export const ConditionalComponent = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className={cn(
      "base-class p-4 rounded-lg",
      isActive && "bg-primary text-white"
    )}>
      <p>Content here</p>
    </div>
  );
};
```

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=<generated-secret>
SESSION_SECRET=<generated-secret>
FRONTEND_URL=https://daddy-leads.com,https://app.daddy-leads.com
```

## Important Files to Review

- `PROJECT_STRUCTURE.md` - Complete project structure documentation
- `QUICKSTART_GUIDE.md` - Full stack setup guide
- `README.md` - Project overview and setup
- `backend/README.md` - Backend setup and API documentation
- `backend/DEPLOYMENT_GUIDE.md` - Step-by-step deployment
- `VERCEL_DEPLOYMENT.md` - Frontend deployment guide

## Dependencies Management

### Frontend
- Managed via npm
- Check `package.json` for current versions
- Run `npm audit` to check for vulnerabilities

### Backend
- Managed via npm
- Keep security-critical packages updated (bcrypt, jsonwebtoken, etc.)

## Common Pitfalls to Avoid

1. **Don't use direct colors** - Always use design tokens
2. **Don't modify shadcn-ui components heavily** - Customize via props and Tailwind
3. **Don't commit .env files** - Use .env.example as template
4. **Don't hardcode API URLs** - Use environment variables
5. **Don't skip input validation** - Always validate on both frontend and backend
6. **Don't forget CORS** - Configure properly for production domains
7. **Don't mix marketing and dashboard styles** - They have different color schemes
8. **Don't create duplicate utilities** - Check `src/lib/utils.ts` first

## Git Workflow

- Main branch: `main`
- Feature branches: `feature/feature-name`
- Bug fixes: `fix/bug-description`
- Commit messages should be clear and descriptive

## Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn-ui](https://ui.shadcn.com)
- [Vite](https://vitejs.dev)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Express.js](https://expressjs.com)

---

**Note**: This is a monorepo structure. Frontend code is at the root level, backend code is in the `backend/` folder. Always be mindful of which part of the codebase you're working on.

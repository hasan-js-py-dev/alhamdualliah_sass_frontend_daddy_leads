# Daddy Leads

A comprehensive B2B lead scraping and enrichment platform.

## Project info

**URL**: https://lovable.dev/projects/c9b9b3df-7806-4bd1-9f5c-ba10528db196

## Project Structure

This project uses a standard monorepo structure with frontend code at the root and backend code in a separate folder:

```
daddy-leads/
├── src/               # Frontend source code (React components)
├── public/            # Frontend static assets
├── backend/           # Backend API and services
│   ├── api/          # API endpoints (auth, etc.)
│   ├── config/       # Configuration & env examples
│   └── README.md     # Backend setup guide
├── index.html         # Frontend HTML template
├── vite.config.ts     # Frontend build configuration
├── tailwind.config.ts # Frontend styling configuration
└── vercel.json        # Deployment configuration
```

### Frontend (Root Level)
All React/TypeScript frontend code lives at the project root:
- `src/components/` - Reusable UI components
- `src/pages/` - Page components and routing
  - `src/pages/dashboard/` - Protected dashboard pages
- `src/hooks/` - Custom React hooks
- `src/config/` - Frontend configuration (domains, etc.)

### Backend (backend/ folder)
All backend/API code lives in the `backend/` folder:
- `backend/api/auth/` - Authentication endpoints (signup, login, logout, verify)
- `backend/config/` - Environment variable examples
- `backend/MONGODB_SETUP.md` - Database setup instructions

## GitHub Actions

This repository uses GitHub Actions for continuous integration and deployment automation.

### How to Access GitHub Actions

1. **View Workflow Runs:**
   - Go to the repository on GitHub: https://github.com/hasan-js-py-dev/alhamdualliah_sass_frontend_Daddy_leads
   - Click on the "Actions" tab at the top of the repository page
   - You'll see all workflow runs with their status (success, failed, in progress)

2. **Trigger a Workflow Manually:**
   - Navigate to the "Actions" tab
   - Select the workflow you want to run (e.g., "CI")
   - Click "Run workflow" button on the right
   - Select the branch and click "Run workflow"

3. **View Workflow Details:**
   - Click on any workflow run to see detailed logs
   - Click on individual jobs to see step-by-step execution
   - Download artifacts if the workflow produces build outputs

### Available Workflows

- **CI (Continuous Integration)**: Runs linting and builds on pull requests and pushes to main/develop branches
  - Runs on Node.js 18.x and 20.x
  - Executes `npm run lint` to check code quality
  - Executes `npm run build` to ensure the project builds successfully
  - Uploads build artifacts for download

### Workflow Configuration

Workflows are defined in `.github/workflows/` directory. You can:
- Edit workflow files to customize CI/CD behavior
- Add new workflows for deployment, testing, or other automation tasks
- Configure secrets in repository Settings → Secrets and variables → Actions

## Quick Start

### Frontend Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:8080`

### Backend Setup

The backend runs separately from the frontend. See `backend/README.md` for detailed setup instructions.

```bash
# Backend requires:
# 1. MongoDB database (see backend/MONGODB_SETUP.md)
# 2. Node.js server (Express recommended)
# 3. Environment variables (see backend/config/env.example)
```

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c9b9b3df-7806-4bd1-9f5c-ba10528db196) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Domains & Routing

- **Marketing Site**: `daddy-leads.com` → Public pages (Home, Product, Pricing)
- **Application**: `app.daddy-leads.com` → Dashboard (protected routes requiring authentication)
- **Backend API**: Separate server (configure URL in environment variables)

The frontend automatically redirects to the correct subdomain for authentication:
- Signup/Login buttons → `app.daddy-leads.com/access`
- After authentication → `app.daddy-leads.com/dashboard`

## Technology Stack

This project is built with:

### Frontend
- **React 18** + TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Router DOM** - Client-side routing
- **shadcn-ui** - Accessible component library
- **Framer Motion** - Animations

### Backend
- **Node.js** + Express
- **MongoDB** - Database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

## Deployment

### Frontend (Vercel)
1. Connect your repository to Vercel
2. Configure domains:
   - Main domain: `daddy-leads.com`
   - App subdomain: `app.daddy-leads.com`
3. The `vercel.json` file handles routing for both domains

Simply open [Lovable](https://lovable.dev/projects/c9b9b3df-7806-4bd1-9f5c-ba10528db196) and click on Share → Publish.

### Backend
Deploy your backend API separately to:
- Vercel Serverless Functions
- Heroku
- AWS Lambda
- Any Node.js hosting service

See `backend/README.md` for deployment instructions.

## Documentation

- `backend/README.md` - Backend setup and API documentation
- `backend/MONGODB_SETUP.md` - Database setup guide
- `VERCEL_DEPLOYMENT.md` - Detailed deployment instructions
- `PROJECT_STRUCTURE.md` - Complete project structure documentation

## Custom Domain

To connect a custom domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Environment Variables

### Frontend
Create `.env` in the project root:
```env
VITE_API_URL=http://localhost:5000
```

### Backend
See `backend/config/env.example` for all required environment variables.

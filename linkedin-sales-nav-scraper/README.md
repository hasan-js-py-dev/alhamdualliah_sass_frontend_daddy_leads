# LinkedIn Sales Navigator Scraper API

Modular backend for LinkedIn Sales Navigator scraping with MongoDB integration.

## Features
- ✅ JWT Authentication
- ✅ Cookie Management (one per user)
- ✅ Auto-replace old cookies
- ✅ MongoDB storage
- ✅ Modular architecture

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your settings
```

3. Start server:
```bash
npm run dev
```

## API Endpoints

Base URL: `http://localhost:3001/v1/scraper/salesnav`

### Cookie Management
- `POST /cookie` - Save/replace cookie
- `GET /cookie` - Fetch cookie
- `DELETE /cookie` - Delete cookie

### Scraper Control (Coming Soon)
- `POST /start` - Start scraper
- `POST /pause` - Pause scraper

All endpoints require JWT Bearer token in Authorization header.

## Project Structure
```
linkedin-sales-nav-scraper/
├── config/         # Database configuration
├── models/         # MongoDB models
├── controllers/    # Business logic
├── routes/         # API routes
├── middleware/     # Auth & validation
├── utils/          # Helper functions
└── server.js       # Main entry point
```

# LinkedIn Sales Navigator Scraper Backend

Separate microservice for LinkedIn Sales Navigator scraping functionality.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Start the server:
```bash
npm run dev
```

## API Endpoints

- `GET /health` - Health check
- `POST /api/scraper/export` - Create new export
- `GET /api/scraper/exports` - Get all exports
- `POST /api/scraper/cookie` - Update LinkedIn cookie

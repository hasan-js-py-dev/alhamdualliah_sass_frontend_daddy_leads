# LinkedIn Sales Navigator Scraper Backend

Backend API for managing LinkedIn cookies and controlling the Sales Navigator scraper.

## Setup Instructions

1. **Install dependencies**:
```bash
cd linkedin-scraper-backend
npm install
```

2. **Configure environment variables**:
Update the `.env` file with your MongoDB password:
```env
PORT=3001
MONGODB_URI=mongodb+srv://apurbohasan627_db_user:YOUR_PASSWORD_HERE@cluster0.z8kjjb0.mongodb.net/?appName=Cluster0
NODE_ENV=development
JWT_SECRET=8f9a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f
```

3. **Start the server**:
```bash
npm run dev
```

The server will run on `http://localhost:3001`

## API Endpoints

All endpoints require authentication via JWT token in the `Authorization` header.

### Cookie Management

#### Save or Update Cookie
```
POST /v1/scraper/sales-nav/cookie
Authorization: Bearer <token>
Content-Type: application/json

{
  "cookie": "li_at=xxxxx; JSESSIONID=xxxxx"
}
```

#### Get Cookie
```
GET /v1/scraper/sales-nav/cookie
Authorization: Bearer <token>
```

#### Delete Cookie
```
DELETE /v1/scraper/sales-nav/cookie
Authorization: Bearer <token>
```

### Scraper Control

#### Start Scraper
```
POST /v1/scraper/sales-nav/start
Authorization: Bearer <token>
Content-Type: application/json

{
  "url": "https://www.linkedin.com/sales/search/...",
  "listName": "Tech CEOs Q4 2024"
}
```

#### Pause Scraper
```
POST /v1/scraper/sales-nav/pause
Authorization: Bearer <token>
```

## Database Schema

### Cookie Collection
```javascript
{
  userId: String (unique, indexed),
  cookie: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Features

- ✅ JWT-based authentication
- ✅ MongoDB integration with Mongoose
- ✅ Automatic cookie replacement (single cookie per user)
- ✅ User-specific cookie storage
- ✅ CORS enabled for frontend integration
- ✅ Error handling middleware
- ✅ Health check endpoint

## Production Deployment

For production, update the `.env` file:
```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
```

And configure CORS origins in `server.js` to match your production domain.

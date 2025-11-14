# Implementation Guide: User-Specific Proxy & Fingerprint Assignment

## Base URL Configuration
- **Base URL**: `https://api.daddy-leads.com`
- **Auth Routes**: `/v1/auth/*`
- **Proxy Routes**: `/v1/proxy/*`

## 1. Database Collections

### Collection 1: `proxydb.proxies` (Already exists)
Stores available proxies with their fingerprints

```javascript
{
  _id: ObjectId,
  proxy: String,           // IP address
  port: Number,            // Port number
  username: String,        // Proxy authentication username
  password: String,        // Proxy authentication password
  fingerprint: {
    userAgent: String,
    platform: String,
    vendor: String,
    language: String,
    languages: Array,
    timezone: String,
    viewport: {
      width: Number,
      height: Number
    },
    screenWidth: Number,
    screenHeight: Number,
    pixelRatio: Number,
    hardwareConcurrency: Number,
    deviceMemory: Number,
    maxTouchPoints: Number,
    webGLVendor: String,
    webGLRenderer: String,
    canvas: {
      noise: Number       // Random noise level for canvas fingerprinting
    },
    battery: {
      charging: Boolean,
      level: Number,
      chargingTime: Number
    },
    connection: {
      effectiveType: String,
      downlink: Number,
      rtt: Number,
      saveData: Boolean
    }
  },
  geolocation: {
    latitude: Number,
    longitude: Number,
    accuracy: Number
  },
  isAvailable: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Collection 2: `proxydb.user_proxies` (New - needs creation)
Maps users to their assigned proxies

```javascript
{
  _id: ObjectId,
  userId: String,          // From JWT token (MongoDB User._id)
  proxyId: ObjectId,       // Reference to proxies collection
  assignedAt: Date,        // When proxy was first assigned
  lastUsedAt: Date,        // Last time proxy was used for scraping
  isActive: Boolean,       // Whether assignment is active
  usageCount: Number,      // Track number of times used
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes to create:**
```javascript
// Ensure one active proxy per user
db.user_proxies.createIndex(
  { userId: 1, isActive: 1 },
  { unique: true, partialFilterExpression: { isActive: true } }
)

// Fast lookup by userId
db.user_proxies.createIndex({ userId: 1 })

// Fast lookup by proxyId
db.user_proxies.createIndex({ proxyId: 1 })

// Track recent usage
db.user_proxies.createIndex({ lastUsedAt: -1 })
```

## 2. Backend API Endpoints

### Endpoint 1: `GET /v1/proxy/assign`
**Purpose**: Get or assign a proxy to the authenticated user

**Authentication**: Required (JWT Bearer token)

**Request Headers**:
```
Authorization: Bearer <jwt_token>
```

**Response Success (200)**:
```javascript
{
  success: true,
  data: {
    proxyId: "507f1f77bcf86cd799439011",
    proxy: "192.168.1.100",
    port: 8080,
    username: "proxyuser",
    password: "proxypass",
    fingerprint: {
      userAgent: "Mozilla/5.0...",
      platform: "Win32",
      vendor: "Google Inc.",
      language: "en-US",
      languages: ["en-US", "en"],
      timezone: "America/New_York",
      viewport: { width: 1920, height: 1080 },
      screenWidth: 1920,
      screenHeight: 1080,
      pixelRatio: 1,
      hardwareConcurrency: 8,
      deviceMemory: 8,
      maxTouchPoints: 0,
      webGLVendor: "Intel Inc.",
      webGLRenderer: "Intel Iris OpenGL Engine",
      canvas: { noise: 0.1 },
      battery: {
        charging: false,
        level: 0.75,
        chargingTime: Infinity
      },
      connection: {
        effectiveType: "4g",
        downlink: 10,
        rtt: 50,
        saveData: false
      }
    },
    geolocation: {
      latitude: 40.7128,
      longitude: -74.0060,
      accuracy: 100
    },
    assignedAt: "2024-01-15T10:30:00Z",
    lastUsedAt: "2024-01-15T14:20:00Z"
  }
}
```

**Response Error (401)**:
```javascript
{
  success: false,
  message: "Authentication required"
}
```

**Response Error (404)**:
```javascript
{
  success: false,
  message: "No available proxies found"
}
```

**Logic Flow**:
1. Extract `userId` from JWT token
2. Check `user_proxies` collection for existing active assignment
   - If found: Retrieve full proxy details from `proxies` collection and return
   - If not found: Continue to step 3
3. Find available proxy from `proxies` collection (`isAvailable: true`)
4. Create new entry in `user_proxies` collection
5. Update proxy in `proxies` collection (`isAvailable: false`)
6. Return full proxy + fingerprint data

---

### Endpoint 2: `POST /v1/proxy/update-usage`
**Purpose**: Update last used timestamp when scraper runs

**Authentication**: Required (JWT Bearer token)

**Request Headers**:
```
Authorization: Bearer <jwt_token>
```

**Request Body**: None required

**Response Success (200)**:
```javascript
{
  success: true,
  message: "Proxy usage updated successfully",
  data: {
    lastUsedAt: "2024-01-15T14:25:00Z",
    usageCount: 42
  }
}
```

**Response Error (401)**:
```javascript
{
  success: false,
  message: "Authentication required"
}
```

**Response Error (404)**:
```javascript
{
  success: false,
  message: "No active proxy assignment found"
}
```

**Logic Flow**:
1. Extract `userId` from JWT token
2. Find active assignment in `user_proxies` collection
3. Update `lastUsedAt` to current timestamp
4. Increment `usageCount` by 1
5. Return updated data

---

## 3. Mother Directory & Profile Cloning System

### Setup Mother Profile (One-time at server startup)
```
mother-profile/
  ├── Default/
  ├── Extensions/
  │   └── [Chrome Extension Files]
  └── ... (other Chrome profile data)
```

### User-Specific Temp Profiles
For each scraping job, clone mother directory to:
```
temp-profiles/user_<userId>_<timestamp>/
```

**Cleanup**: Delete temp directory after scraping completes

---

## 4. Playwright Browser Configuration

### Launch with User-Specific Profile
1. Clone mother directory to `temp-profiles/user_<userId>_<timestamp>/`
2. Launch `chromium.launchPersistentContext(tempUserDir, { ... })`
3. Configure proxy settings
4. Inject fingerprint via `addInitScript()`
5. Run scraping tasks
6. Close browser
7. Delete temp profile directory

---

## 5. Frontend Integration

### Update `scraperService.ts`
Add method to fetch assigned proxy:
```typescript
async getAssignedProxy(): Promise<ScraperResponse> {
  return this.request('/proxy/assign', {
    method: 'GET',
    headers: this.getAuthHeaders(),
  });
}
```

**Note**: Update `SCRAPER_API_DOMAIN` if needed to use `https://api.daddy-leads.com`

---

## 6. Scraping Workflow

```
1. User starts scraper
   ↓
2. Call GET /v1/proxy/assign
   ↓
3. Clone mother-profile → temp-profiles/user_<userId>_<timestamp>/
   ↓
4. Launch Playwright with proxy + fingerprint + temp profile
   ↓
5. Run scraping tasks
   ↓
6. Call POST /v1/proxy/update-usage
   ↓
7. Close browser
   ↓
8. Delete temp profile directory
```

---

## 7. Key Security & Performance Points

✅ **One proxy per user** - Maintains consistent identity  
✅ **Fingerprint injection** - All fingerprint data applied before page loads  
✅ **Mother directory cloning** - 5-10x faster than loading extension per job  
✅ **Automatic cleanup** - Temp directories deleted after each job  
✅ **Session persistence** - Same proxy/fingerprint across multiple jobs for same user  
✅ **Behavioral patterns** - Add random delays, mouse movements in scraper logic  

---

## 8. Concurrency Management

- **One active job per user** maximum
- **Global limit**: 5 concurrent scraping jobs (configurable)
- Queue additional jobs when limit reached

---

## Database Schema Summary

**Collections needed**:
1. ✅ `proxydb.proxies` (Already exists)
2. ❌ `proxydb.user_proxies` (Create this)

**Indexes to create on `user_proxies`**:
- `{ userId: 1, isActive: 1 }` - unique, partial
- `{ userId: 1 }`
- `{ proxyId: 1 }`
- `{ lastUsedAt: -1 }`

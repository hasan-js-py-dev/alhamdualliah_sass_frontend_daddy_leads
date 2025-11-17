# User Authentication & Validation Flow Documentation

## Base URLs
- **Auth API**: `https://api.daddy-leads.com/v1/auth/*`
- **Proxy API**: `https://api.daddy-leads.com/v1/proxy/*`
- **Scraper API**: `https://api.daddy-leads.com/v1/scraper/*` (or your scraper endpoints)

---

## 1. Frontend Authentication Flow

### User Signup/Login Process

**Step 1: User Registration (Signup)**
- User submits email, password, firstName, lastName via frontend form
- Frontend sends `POST /v1/auth/signup` request to backend
- Backend creates user account in MongoDB `users` collection
- Backend generates JWT token and creates session in `sessions` collection
- Backend returns JWT token to frontend
- Frontend stores token in `localStorage` as `authToken`

**Step 2: User Login**
- User submits email and password via frontend form
- Frontend sends `POST /v1/auth/login` request to backend
- Backend validates credentials against `users` collection
- Backend generates new JWT token and creates session
- Backend returns JWT token to frontend
- Frontend stores token in `localStorage` as `authToken`

**Step 3: Session Verification (On Page Load)**
- Frontend retrieves token from `localStorage`
- Frontend sends `GET /v1/auth/verify` with token in `Authorization: Bearer <token>` header
- Backend validates JWT token and checks session in `sessions` collection
- If valid: Backend returns user data (id, firstName, lastName, email, credits)
- If invalid: Frontend redirects to login page

---

## 2. Backend User Validation for Scraper

### How Backend Validates User Before Running Scraper

**Validation Flow:**

1. **Token Extraction**
   - User clicks "Run Scraper" button on frontend
   - Frontend sends scraper request with `Authorization: Bearer <token>` header
   - Backend receives request at scraper endpoint (e.g., `POST /v1/scraper/run`)
   - Backend extracts JWT token from `Authorization` header

2. **JWT Token Verification**
   - Backend uses `JWT_SECRET` to verify token signature
   - Backend checks token expiration date
   - Backend extracts `userId` from token payload
   - If token is invalid/expired: Return 401 Unauthorized error

3. **Session Validation**
   - Backend queries `sessions` collection using the token
   - Backend checks if session exists and `expiresAt > current time`
   - Backend verifies session belongs to the `userId` from token
   - If session invalid: Return 401 Unauthorized error

4. **User Lookup**
   - Backend queries `users` collection using `userId`
   - Backend verifies user exists and `isActive: true`
   - Backend checks user has sufficient credits for scraping job
   - If user invalid/inactive: Return 401/403 error

5. **Authorization Complete**
   - User is authenticated and authorized
   - Backend proceeds with scraper execution
   - Backend uses `userId` to assign/fetch user-specific proxy

---

## 3. Scraper Workflow with Authentication

### Complete Flow from Frontend to Scraper Execution

```
1. User clicks "Run Scraper" button
   ↓
2. Frontend sends: POST /v1/scraper/run
   Headers: { Authorization: "Bearer <jwt_token>" }
   Body: { scraperConfig: {...} }
   ↓
3. Backend Middleware: authenticateJWT
   - Validates JWT token signature
   - Checks token expiration
   - Queries sessions collection
   - Queries users collection
   - Extracts userId and attaches to request
   ↓
4. Backend Controller: runScraper
   - Receives authenticated request with userId
   - Checks user credits
   - Calls: GET /v1/proxy/assign (with userId from JWT)
   - Gets user-specific proxy + fingerprint
   ↓
5. Scraper Executor:
   - Clones mother profile → temp-profiles/user_<userId>_<timestamp>/
   - Launches Playwright with proxy + fingerprint + temp profile
   - Runs scraping tasks
   - Calls: POST /v1/proxy/update-usage
   - Deducts user credits
   - Closes browser and deletes temp profile
   ↓
6. Backend returns scraper results to frontend
   ↓
7. Frontend displays results to user
```

---

## 4. Security Measures

### Token Security
- **JWT tokens** are signed with `JWT_SECRET` (minimum 32 characters)
- **Session tokens** are hashed with `SESSION_SECRET` before storage in MongoDB
- Tokens expire after configured time (default: 7 days via `JWT_EXPIRES_IN`)
- Expired sessions are automatically cleaned from database

### Validation Checkpoints
1. **Frontend validation**: Token exists in localStorage
2. **Token signature validation**: JWT is signed by your server
3. **Token expiration validation**: Token hasn't expired
4. **Session validation**: Session exists in database and not expired
5. **User validation**: User exists, is active, and has permissions

### Protected Routes
- All scraper endpoints require valid JWT token
- All proxy endpoints require valid JWT token
- Public endpoints (signup, login, verify-email) do NOT require token

---

## 5. Proxy Assignment Validation

### How Proxy is Assigned to Authenticated User

**Process:**

1. User starts scraper → Backend receives JWT token
2. Backend validates user authentication (see Section 2)
3. Backend calls internal function: `assignProxyToUser(userId)`
4. Backend queries `proxydb.user_proxies` collection:
   - Check if `userId` already has active proxy (`isActive: true`)
   - If yes: Return existing proxy details
   - If no: Find available proxy from `proxydb.proxies` (`isAvailable: true`)
5. Backend creates entry in `user_proxies` collection:
   ```
   {
     userId: "<userId from JWT>",
     proxyId: "<selected proxy _id>",
     assignedAt: new Date(),
     lastUsedAt: new Date(),
     isActive: true
   }
   ```
6. Backend marks proxy as unavailable in `proxies` collection
7. Backend returns full proxy details + fingerprint to scraper

**Key Point**: `userId` is ALWAYS extracted from validated JWT token, never from user input

---

## 6. Error Handling

### Common Authentication Errors

| Error Code | Scenario | Frontend Action |
|------------|----------|-----------------|
| 401 Unauthorized | Token missing/invalid/expired | Redirect to login page |
| 401 Unauthorized | Session not found/expired | Clear localStorage, redirect to login |
| 403 Forbidden | User inactive or insufficient credits | Show error message |
| 404 Not Found | User not found in database | Clear localStorage, redirect to signup |
| 500 Internal Server Error | Database/server error | Show retry message |

---

## 7. Frontend Storage

### What is Stored in Browser

**localStorage:**
- `authToken`: JWT token (format: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

**NOT stored in frontend:**
- User password (hashed in backend only)
- Session secret
- JWT secret
- Proxy credentials
- Fingerprint data

---

## 8. Best Practices

### For Frontend Developers
✅ Always include `Authorization: Bearer <token>` header for protected API calls
✅ Check token exists in localStorage before making authenticated requests
✅ Handle 401 errors by redirecting to login page
✅ Clear localStorage on logout
✅ Never expose JWT_SECRET or SESSION_SECRET

### For Backend Developers
✅ Use middleware (e.g., `authenticateJWT`) to protect routes
✅ Always validate token signature and expiration
✅ Always check session exists in database
✅ Never trust client-side data for user identity
✅ Extract `userId` only from validated JWT token
✅ Log authentication failures for security monitoring

---

## 9. Database Collections Required

### Collection 1: `users`
- Stores user accounts (email, password hash, firstName, lastName, credits)
- Indexed on `email`

### Collection 2: `sessions`
- Stores active sessions (userId, hashed token, expiresAt)
- Indexed on `token` and `expiresAt`

### Collection 3: `proxydb.user_proxies`
- Maps users to their assigned proxies
- Indexed on `userId` and `isActive`

### Collection 4: `proxydb.proxies`
- Stores available proxies with fingerprints
- Indexed on `isAvailable`

---

## Summary

**Frontend → Backend Flow:**
1. User logs in → Gets JWT token → Stores in localStorage
2. User runs scraper → Sends token in Authorization header
3. Backend validates token → Validates session → Validates user
4. Backend assigns proxy to userId → Runs scraper with user-specific config
5. Backend updates usage → Returns results to frontend

**Key Security Point**: Backend NEVER trusts user input for identity. It always validates JWT token and extracts `userId` from the verified token payload.

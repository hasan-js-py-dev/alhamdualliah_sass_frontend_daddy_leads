# Nginx Setup Guide for Daddy Leads API

This guide explains how to configure nginx to handle multiple scraper servers while keeping a single backend subdomain.

## 🏗️ Architecture Overview

```
Frontend (app.daddy-leads.com)
         ↓
api.daddy-leads.com (Nginx)
         ↓
    ┌────┴────┐
    ↓         ↓
Main Backend  Scraper Load Balancer
(port 5000)   ↓
         ┌────┼────┬────┐
         ↓    ↓    ↓    ↓
      :3001 :3002 :3003 :3004
      (Multiple scraper instances)
```

## 📍 Route Mapping

| Route Pattern | Destination | Purpose |
|--------------|-------------|---------|
| `/v1/auth/*` | Main Backend (port 5000) | Authentication endpoints |
| `/v1/scraper/*` | Scraper Load Balancer (ports 3001-3004) | Scraper operations |
| `/v1/*` | Main Backend (port 5000) | Other API endpoints |

## 🚀 Setup Instructions

### 1. Install Nginx

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx

# MacOS
brew install nginx
```

### 2. Configure DNS

Point your domain to your server:

```
A Record: api.daddy-leads.com → Your Server IP
```

### 3. Deploy the Configuration

```bash
# Copy the nginx configuration
sudo cp nginx-multi-scraper.conf /etc/nginx/sites-available/api.daddy-leads.com

# Create symbolic link
sudo ln -s /etc/nginx/sites-available/api.daddy-leads.com /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### 4. Setup SSL with Let's Encrypt

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d api.daddy-leads.com

# Auto-renewal is configured automatically
# Test renewal with:
sudo certbot renew --dry-run
```

### 5. Start Your Services

```bash
# Start main backend
cd backend
npm start  # Runs on port 5000

# Start scraper instances
cd linkedin-sales-nav-scraper

# Instance 1
PORT=3001 npm start &

# Instance 2
PORT=3002 npm start &

# Instance 3
PORT=3003 npm start &

# Instance 4 (optional)
PORT=3004 npm start &
```

## 🔧 Load Balancing Configuration

### Current Setup (Least Connections)

```nginx
upstream scraper_backend {
    least_conn;  # Routes to server with least active connections
    
    server localhost:3001 max_fails=3 fail_timeout=30s;
    server localhost:3002 max_fails=3 fail_timeout=30s;
    server localhost:3003 max_fails=3 fail_timeout=30s;
}
```

### Alternative: Round Robin

```nginx
upstream scraper_backend {
    # Default behavior - rotates through servers
    server localhost:3001;
    server localhost:3002;
    server localhost:3003;
}
```

### Alternative: IP Hash (Sticky Sessions)

```nginx
upstream scraper_backend {
    ip_hash;  # Same client always goes to same server
    
    server localhost:3001;
    server localhost:3002;
    server localhost:3003;
}
```

### Alternative: Weighted Load Balancing

```nginx
upstream scraper_backend {
    server localhost:3001 weight=3;  # Gets 3x more requests
    server localhost:3002 weight=2;
    server localhost:3003 weight=1;
}
```

## 📊 Monitoring and Health Checks

### Check Nginx Status

```bash
# View error logs
sudo tail -f /var/log/nginx/api.daddy-leads.error.log

# View access logs
sudo tail -f /var/log/nginx/api.daddy-leads.access.log

# Check nginx status
sudo systemctl status nginx
```

### Test Endpoints

```bash
# Health check
curl https://api.daddy-leads.com/health

# Auth endpoint (main backend)
curl https://api.daddy-leads.com/v1/auth/status

# Scraper endpoint (load balanced)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.daddy-leads.com/v1/scraper/salesnav/cookie
```

## 🔒 Security Features

1. **Rate Limiting**
   - API endpoints: 10 requests/second
   - Scraper endpoints: 5 requests/second

2. **SSL/TLS**
   - Forced HTTPS redirect
   - TLS 1.2 and 1.3 only
   - Strong cipher suites

3. **CORS**
   - Restricted to daddy-leads.com domains
   - Credentials support enabled

4. **Security Headers**
   - X-Frame-Options
   - X-Content-Type-Options
   - X-XSS-Protection
   - Strict-Transport-Security

## 🔥 Scaling Considerations

### Adding More Scraper Servers

1. Start a new scraper instance on a new port:
   ```bash
   PORT=3005 npm start &
   ```

2. Add to nginx upstream block:
   ```nginx
   upstream scraper_backend {
       # ... existing servers ...
       server localhost:3005 max_fails=3 fail_timeout=30s;
   }
   ```

3. Reload nginx:
   ```bash
   sudo nginx -t && sudo systemctl reload nginx
   ```

### Using PM2 for Process Management

```bash
# Install PM2
npm install -g pm2

# Start main backend
cd backend
pm2 start npm --name "main-backend" -- start

# Start scraper instances
cd linkedin-sales-nav-scraper
pm2 start npm --name "scraper-1" -- start
PORT=3002 pm2 start npm --name "scraper-2" -- start
PORT=3003 pm2 start npm --name "scraper-3" -- start

# Save configuration
pm2 save

# Auto-start on reboot
pm2 startup
```

## 🐛 Troubleshooting

### Issue: 502 Bad Gateway

```bash
# Check if backend services are running
netstat -tulpn | grep :5000
netstat -tulpn | grep :3001

# Check nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### Issue: CORS Errors

Verify CORS headers are set correctly in nginx config and backend services match.

### Issue: SSL Certificate Errors

```bash
# Renew certificate
sudo certbot renew

# Check certificate expiry
sudo certbot certificates
```

## 📝 Environment Variables

Make sure your scraper instances have proper environment variables:

```bash
# .env for each scraper instance
PORT=3001  # or 3002, 3003, etc.
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-jwt-secret
```

## 🎯 Frontend Configuration

Your frontend (`src/config/domains.ts`) is already configured:

```typescript
export const SCRAPER_API_DOMAIN = 
  customScraperDomain || 
  (isDevelopment ? "http://localhost:3001" : "https://api.daddy-leads.com");
```

In production, all scraper requests go to `https://api.daddy-leads.com/v1/scraper/*` and nginx load balances them across your scraper instances.

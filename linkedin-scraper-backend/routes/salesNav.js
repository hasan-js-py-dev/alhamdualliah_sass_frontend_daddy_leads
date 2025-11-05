/**
 * Sales Navigator Routes
 * Handles all LinkedIn Sales Navigator scraper routes
 * All routes require authentication via JWT
 */

import express from 'express';
import { saveCookie, getCookie, deleteCookie } from '../controllers/cookieController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// ============================================
// Authentication Middleware
// ============================================
// All routes require valid JWT token
router.use(authenticateToken);

// ============================================
// Cookie Management Routes
// ============================================

/**
 * POST /v1/scraper/salesnav/cookie
 * Save or update LinkedIn cookie for authenticated user
 * Always replaces existing cookie (no duplicates)
 */
router.post('/cookie', saveCookie);

/**
 * GET /v1/scraper/salesnav/cookie
 * Get LinkedIn cookie for authenticated user
 * Used when fetching cookie in New Export dialog
 */
router.get('/cookie', getCookie);

/**
 * DELETE /v1/scraper/salesnav/cookie
 * Delete LinkedIn cookie for authenticated user
 */
router.delete('/cookie', deleteCookie);

// ============================================
// Scraper Control Routes
// ============================================
// TODO: Implement scraper start/pause logic

/**
 * POST /v1/scraper/salesnav/start
 * Start scraping LinkedIn Sales Navigator
 * Body: { url, listName }
 */
router.post('/start', (req, res) => {
  res.json({
    success: true,
    message: 'Scraper start endpoint - to be implemented',
  });
});

/**
 * POST /v1/scraper/salesnav/pause
 * Pause ongoing scraping process
 */
router.post('/pause', (req, res) => {
  res.json({
    success: true,
    message: 'Scraper pause endpoint - to be implemented',
  });
});

export default router;

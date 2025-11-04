import express from 'express';
import { saveCookie, getCookie, deleteCookie } from '../controllers/cookieController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Cookie management routes
router.post('/cookie', saveCookie);
router.get('/cookie', getCookie);
router.delete('/cookie', deleteCookie);

// Scraper control routes (placeholders for now)
router.post('/start', (req, res) => {
  res.json({
    success: true,
    message: 'Scraper start endpoint - to be implemented',
  });
});

router.post('/pause', (req, res) => {
  res.json({
    success: true,
    message: 'Scraper pause endpoint - to be implemented',
  });
});

export default router;

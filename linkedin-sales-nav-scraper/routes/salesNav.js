const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/auth');
const cookieController = require('../controllers/cookieController');

// All routes require authentication
router.use(authenticateJWT);

// Cookie management routes
router.post('/cookie', cookieController.saveCookie);
router.get('/cookie', cookieController.getCookie);
router.delete('/cookie', cookieController.deleteCookie);

// Scraper control routes (placeholder for future implementation)
router.post('/start', (req, res) => {
  res.status(501).json({ 
    success: false, 
    message: 'Start scraper endpoint - coming soon' 
  });
});

router.post('/pause', (req, res) => {
  res.status(501).json({ 
    success: false, 
    message: 'Pause scraper endpoint - coming soon' 
  });
});

module.exports = router;

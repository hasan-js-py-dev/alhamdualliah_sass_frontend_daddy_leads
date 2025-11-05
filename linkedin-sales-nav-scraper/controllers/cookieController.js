const Cookie = require('../models/Cookie');
const { successResponse, errorResponse } = require('../utils/response');

// Save or replace cookie for user
exports.saveCookie = async (req, res) => {
  try {
    const { cookie } = req.body;
    const userId = req.userId;

    if (!cookie || typeof cookie !== 'string' || cookie.trim().length === 0) {
      return res.status(400).json(errorResponse('Cookie is required'));
    }

    // Replace existing cookie or create new one (upsert)
    const savedCookie = await Cookie.findOneAndUpdate(
      { userId },
      { userId, cookie: cookie.trim() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(successResponse('Cookie saved successfully', {
      userId: savedCookie.userId,
      updatedAt: savedCookie.updatedAt
    }));
  } catch (error) {
    console.error('Save cookie error:', error);
    res.status(500).json(errorResponse('Failed to save cookie', error.message));
  }
};

// Fetch cookie for user
exports.getCookie = async (req, res) => {
  try {
    const userId = req.userId;

    const cookieDoc = await Cookie.findOne({ userId });

    if (!cookieDoc) {
      return res.status(404).json(errorResponse('No cookie found for this user'));
    }

    res.status(200).json(successResponse('Cookie retrieved successfully', {
      cookie: cookieDoc.cookie,
      updatedAt: cookieDoc.updatedAt
    }));
  } catch (error) {
    console.error('Get cookie error:', error);
    res.status(500).json(errorResponse('Failed to retrieve cookie', error.message));
  }
};

// Delete cookie for user
exports.deleteCookie = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await Cookie.findOneAndDelete({ userId });

    if (!result) {
      return res.status(404).json(errorResponse('No cookie found to delete'));
    }

    res.status(200).json(successResponse('Cookie deleted successfully'));
  } catch (error) {
    console.error('Delete cookie error:', error);
    res.status(500).json(errorResponse('Failed to delete cookie', error.message));
  }
};

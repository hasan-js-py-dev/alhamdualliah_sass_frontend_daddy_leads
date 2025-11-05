/**
 * Cookie Controller
 * Handles HTTP requests for cookie operations
 */

import { validateCookie, validateUserId } from './validation.js';
import { saveUserCookie, getUserCookie, deleteUserCookie } from '../services/cookieService.js';

/**
 * Save Cookie Endpoint
 * POST /v1/scraper/salesnav/cookie
 * Saves or updates LinkedIn cookie for authenticated user
 */
export const saveCookie = async (req, res) => {
  try {
    // Get cookie from request body
    const { cookie } = req.body;

    // Get user ID from authenticated user (set by auth middleware)
    const userId = req.user.id;

    // Validate user ID
    const userValidation = validateUserId(userId);
    if (!userValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: userValidation.message,
      });
    }

    // Validate cookie input
    const cookieValidation = validateCookie(cookie);
    if (!cookieValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: cookieValidation.message,
      });
    }

    // Save or update cookie (always replaces old one)
    const result = await saveUserCookie(userId, cookie);

    // Return success response
    return res.status(result.data.createdAt ? 201 : 200).json(result);
  } catch (error) {
    // Log error for debugging
    console.error('Save cookie error:', error);

    // Return error response
    return res.status(500).json({
      success: false,
      message: 'Failed to save cookie',
      error: error.message,
    });
  }
};

/**
 * Get Cookie Endpoint
 * GET /v1/scraper/salesnav/cookie
 * Retrieves LinkedIn cookie for authenticated user
 */
export const getCookie = async (req, res) => {
  try {
    // Get user ID from authenticated user
    const userId = req.user.id;

    // Validate user ID
    const userValidation = validateUserId(userId);
    if (!userValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: userValidation.message,
      });
    }

    // Get cookie from database
    const result = await getUserCookie(userId);

    // If no cookie found, return 404
    if (!result.success) {
      return res.status(404).json(result);
    }

    // Return cookie data
    return res.status(200).json(result);
  } catch (error) {
    // Log error for debugging
    console.error('Get cookie error:', error);

    // Return error response
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve cookie',
      error: error.message,
    });
  }
};

/**
 * Delete Cookie Endpoint
 * DELETE /v1/scraper/salesnav/cookie
 * Deletes LinkedIn cookie for authenticated user
 */
export const deleteCookie = async (req, res) => {
  try {
    // Get user ID from authenticated user
    const userId = req.user.id;

    // Validate user ID
    const userValidation = validateUserId(userId);
    if (!userValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: userValidation.message,
      });
    }

    // Delete cookie from database
    const result = await deleteUserCookie(userId);

    // If no cookie found, return 404
    if (!result.success) {
      return res.status(404).json(result);
    }

    // Return success response
    return res.status(200).json(result);
  } catch (error) {
    // Log error for debugging
    console.error('Delete cookie error:', error);

    // Return error response
    return res.status(500).json({
      success: false,
      message: 'Failed to delete cookie',
      error: error.message,
    });
  }
};

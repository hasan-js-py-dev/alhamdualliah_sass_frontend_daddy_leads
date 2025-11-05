/**
 * Cookie Service
 * Handles business logic for cookie operations
 */

import Cookie from '../models/Cookie.js';

/**
 * Save or update cookie for a user
 * Always replaces old cookie if exists
 * @param {String} userId - User ID
 * @param {String} cookieValue - Cookie string
 * @returns {Object} Save result
 */
export const saveUserCookie = async (userId, cookieValue) => {
  try {
    // Check if cookie already exists for this user
    const existingCookie = await Cookie.findOne({ userId });

    if (existingCookie) {
      // Update existing cookie (replace old one)
      existingCookie.cookie = cookieValue;
      existingCookie.updatedAt = Date.now();
      await existingCookie.save();

      return {
        success: true,
        message: 'Cookie updated successfully',
        data: {
          userId,
          updatedAt: existingCookie.updatedAt,
        },
      };
    }

    // Create new cookie if none exists
    const newCookie = new Cookie({
      userId,
      cookie: cookieValue,
    });

    await newCookie.save();

    return {
      success: true,
      message: 'Cookie saved successfully',
      data: {
        userId,
        createdAt: newCookie.createdAt,
      },
    };
  } catch (error) {
    throw new Error(`Failed to save cookie: ${error.message}`);
  }
};

/**
 * Get cookie for a user by user ID
 * @param {String} userId - User ID
 * @returns {Object} Cookie data
 */
export const getUserCookie = async (userId) => {
  try {
    // Find cookie by user ID
    const cookie = await Cookie.findOne({ userId });

    if (!cookie) {
      return {
        success: false,
        message: 'No cookie found for this user',
      };
    }

    return {
      success: true,
      data: {
        cookie: cookie.cookie,
        updatedAt: cookie.updatedAt,
      },
    };
  } catch (error) {
    throw new Error(`Failed to get cookie: ${error.message}`);
  }
};

/**
 * Delete cookie for a user
 * @param {String} userId - User ID
 * @returns {Object} Delete result
 */
export const deleteUserCookie = async (userId) => {
  try {
    const result = await Cookie.deleteOne({ userId });

    if (result.deletedCount === 0) {
      return {
        success: false,
        message: 'No cookie found for this user',
      };
    }

    return {
      success: true,
      message: 'Cookie deleted successfully',
    };
  } catch (error) {
    throw new Error(`Failed to delete cookie: ${error.message}`);
  }
};

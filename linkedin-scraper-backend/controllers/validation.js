/**
 * Validation Controller
 * Handles input validation for cookie operations
 */

/**
 * Validate cookie input
 * @param {String} cookie - Cookie string to validate
 * @returns {Object} Validation result
 */
export const validateCookie = (cookie) => {
  // Check if cookie exists
  if (!cookie) {
    return {
      isValid: false,
      message: 'Cookie value is required',
    };
  }

  // Check if cookie is not empty or just whitespace
  if (!cookie.trim()) {
    return {
      isValid: false,
      message: 'Cookie cannot be empty',
    };
  }

  // Cookie is valid
  return {
    isValid: true,
  };
};

/**
 * Validate user ID
 * @param {String} userId - User ID to validate
 * @returns {Object} Validation result
 */
export const validateUserId = (userId) => {
  if (!userId) {
    return {
      isValid: false,
      message: 'User ID is required',
    };
  }

  return {
    isValid: true,
  };
};

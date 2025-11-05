/**
 * Authentication Middleware
 * Verifies JWT tokens for protected routes
 */

import jwt from 'jsonwebtoken';

/**
 * Authenticate JWT Token
 * Verifies token from Authorization header
 * Adds user data to request object if valid
 */
export const authenticateToken = (req, res, next) => {
  // Get authorization header
  const authHeader = req.headers['authorization'];
  
  // Extract token from "Bearer <token>" format
  const token = authHeader && authHeader.split(' ')[1];

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication token required',
    });
  }

  try {
    // Verify token using JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach decoded user data to request
    req.user = decoded;
    
    // Continue to next middleware/route handler
    next();
  } catch (error) {
    // Token is invalid or expired
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

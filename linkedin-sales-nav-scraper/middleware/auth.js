const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/response');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(errorResponse('Authentication required'));
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Extract userId from different possible token structures
    req.userId = decoded.userId || decoded.id || decoded._id;
    
    if (!req.userId) {
      return res.status(401).json(errorResponse('Invalid token structure'));
    }

    next();
  } catch (error) {
    return res.status(401).json(errorResponse('Invalid or expired token'));
  }
};

module.exports = { authenticateJWT };

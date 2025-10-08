const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT token
const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user || user.status !== 'ativo') {
      return res.status(401).json({ message: 'Invalid token or user inactive.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

// Check specific permission
const authorize = (module, action) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    const hasPermission = req.user.permissions[module] && 
                         req.user.permissions[module][action];

    if (!hasPermission) {
      return res.status(403).json({ 
        message: `Access denied. Required permission: ${module}.${action}` 
      });
    }

    next();
  };
};

// Check role level
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Access denied. Required role: ${roles.join(' or ')}` 
      });
    }

    next();
  };
};

// Check if user can access dashboard
const requireDashboard = (req, res, next) => {
  if (!req.user || !req.user.permissions.dashboard) {
    return res.status(403).json({ 
      message: 'Access denied. Dashboard access required.' 
    });
  }
  next();
};

module.exports = {
  authenticate,
  authorize,
  requireRole,
  requireDashboard
};
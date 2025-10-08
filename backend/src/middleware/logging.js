const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Log levels
const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

// Logger utility
const logger = {
  log: (level, message, meta = {}) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...meta
    };

    // Console output
    console.log(`[${timestamp}] ${level}: ${message}`, meta);

    // File output
    const logFile = path.join(logsDir, `${new Date().toISOString().split('T')[0]}.log`);
    fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
  },

  error: (message, meta) => logger.log(LOG_LEVELS.ERROR, message, meta),
  warn: (message, meta) => logger.log(LOG_LEVELS.WARN, message, meta),
  info: (message, meta) => logger.log(LOG_LEVELS.INFO, message, meta),
  debug: (message, meta) => logger.log(LOG_LEVELS.DEBUG, message, meta)
};

// Request logging middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  // Log request
  logger.info('Request started', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: req.user?.id
  });

  // Override res.json to log response
  const originalJson = res.json;
  res.json = function(data) {
    const duration = Date.now() - start;
    
    logger.info('Request completed', {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userId: req.user?.id
    });

    return originalJson.call(this, data);
  };

  next();
};

// Error logging middleware
const errorLogger = (err, req, res, next) => {
  logger.error('Request error', {
    method: req.method,
    url: req.originalUrl,
    error: err.message,
    stack: err.stack,
    userId: req.user?.id
  });

  next(err);
};

// Audit logging for sensitive operations
const auditLogger = (action, resource) => {
  return (req, res, next) => {
    const originalJson = res.json;
    res.json = function(data) {
      if (res.statusCode < 400) {
        logger.info('Audit log', {
          action,
          resource,
          userId: req.user?.id,
          userName: req.user?.name,
          userRole: req.user?.role,
          resourceId: req.params.id,
          timestamp: new Date().toISOString()
        });
      }
      return originalJson.call(this, data);
    };
    next();
  };
};

module.exports = {
  logger,
  requestLogger,
  errorLogger,
  auditLogger
};
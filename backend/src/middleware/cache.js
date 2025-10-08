const NodeCache = require('node-cache');

// In-memory cache with 1 hour TTL
const cache = new NodeCache({ stdTTL: 3600 });

// Cache middleware for API responses
const cacheMiddleware = (duration = 3600) => {
  return (req, res, next) => {
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);
    
    if (cachedResponse) {
      res.set('X-Cache', 'HIT');
      return res.json(cachedResponse);
    }
    
    res.sendResponse = res.json;
    res.json = (body) => {
      cache.set(key, body, duration);
      res.set('X-Cache', 'MISS');
      res.sendResponse(body);
    };
    
    next();
  };
};

// Browser cache headers
const setBrowserCache = (maxAge = 86400) => {
  return (req, res, next) => {
    res.set('Cache-Control', `public, max-age=${maxAge}`);
    res.set('ETag', `"${Date.now()}"`);
    next();
  };
};

// Clear cache by pattern
const clearCache = (pattern) => {
  const keys = cache.keys();
  keys.forEach(key => {
    if (key.includes(pattern)) {
      cache.del(key);
    }
  });
};

module.exports = { cacheMiddleware, setBrowserCache, clearCache, cache };
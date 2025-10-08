const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const cacheMiddleware = require('./middleware/cache');
const errorHandler = require('./middleware/errorHandler');
const { requestLogger, errorLogger } = require('./middleware/logging');
const { seedDatabase } = require('./utils/seedData');
const monitoringService = require('./middleware/monitoring');
const backupService = require('./services/backupService');
const websocketService = require('./services/websocketService');
const emailService = require('./services/emailService');

const app = express();

// Security & Performance Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://caminhoseguro.com'] 
    : ['http://localhost:3000'],
  credentials: true
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Monitoring and logging
app.use(monitoringService.requestTracker());
app.use(requestLogger);

// Body parsing & cookies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Cache headers for static assets
app.use('/static', express.static('public', {
  maxAge: '1y',
  etag: true,
  lastModified: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB Atlas connected');
    // Seed database with initial data
    await seedDatabase();
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/team', require('./routes/team'));
app.use('/api/partners', require('./routes/partners'));
app.use('/api/media', require('./routes/media'));
app.use('/api/preferences', require('./routes/preferences'));
app.use('/api/users', require('./routes/users'));
app.use('/api/sales', require('./routes/sales'));
app.use('/api/revenue', require('./routes/revenue'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/products', require('./routes/products'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/system', require('./routes/system'));
app.use('/api/impact', require('./routes/impact'));
app.use('/api/segmentation', require('./routes/segmentation'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorLogger);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  
  // Initialize WebSocket
  websocketService.initialize(server);
  
  // Start backup scheduler
  backupService.scheduleBackups();
  
  console.log('All services initialized successfully');
});
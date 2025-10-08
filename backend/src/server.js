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
  .then(() => console.log('MongoDB Atlas connected'))
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

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
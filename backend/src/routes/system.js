const express = require('express');
const { authenticate, requireRole } = require('../middleware/auth');
const monitoringService = require('../middleware/monitoring');
const backupService = require('../services/backupService');
const { cacheMiddleware } = require('../middleware/cache');

const router = express.Router();

// Health check endpoint
router.get('/health', async (req, res) => {
  try {
    const health = await monitoringService.getSystemHealth();
    const statusCode = health.status === 'healthy' ? 200 : 503;
    res.status(statusCode).json(health);
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// System metrics (admin only)
router.get('/metrics', 
  authenticate,
  requireRole(['super-admin', 'admin']),
  cacheMiddleware(60), // 1 minute cache
  async (req, res) => {
    try {
      const metrics = monitoringService.getMetrics();
      const health = await monitoringService.getSystemHealth();
      
      res.json({
        success: true,
        data: {
          ...metrics,
          system: health.system,
          performance: health.performance
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Create backup (super-admin only)
router.post('/backup', 
  authenticate,
  requireRole(['super-admin']),
  async (req, res) => {
    try {
      const backupPath = await backupService.createBackup();
      
      res.json({
        success: true,
        message: 'Backup created successfully',
        data: { backupPath }
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Backup failed',
        error: error.message 
      });
    }
  }
);

// List backups (super-admin only)
router.get('/backups', 
  authenticate,
  requireRole(['super-admin']),
  (req, res) => {
    try {
      const backups = backupService.getBackupList();
      
      res.json({
        success: true,
        data: backups
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Restore backup (super-admin only)
router.post('/backup/restore', 
  authenticate,
  requireRole(['super-admin']),
  async (req, res) => {
    try {
      const { backupPath } = req.body;
      
      if (!backupPath) {
        return res.status(400).json({ message: 'Backup path is required' });
      }
      
      await backupService.restoreBackup(backupPath);
      
      res.json({
        success: true,
        message: 'Backup restored successfully'
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Restore failed',
        error: error.message 
      });
    }
  }
);

// System info (admin only)
router.get('/info', 
  authenticate,
  requireRole(['super-admin', 'admin']),
  cacheMiddleware(300), // 5 minutes cache
  async (req, res) => {
    try {
      const health = await monitoringService.getSystemHealth();
      
      res.json({
        success: true,
        data: {
          version: process.env.npm_package_version || '1.0.0',
          environment: process.env.NODE_ENV,
          uptime: health.uptime,
          database: health.database,
          system: health.system,
          timestamp: health.timestamp
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Reset metrics (super-admin only)
router.post('/metrics/reset', 
  authenticate,
  requireRole(['super-admin']),
  (req, res) => {
    try {
      monitoringService.resetMetrics();
      
      res.json({
        success: true,
        message: 'Metrics reset successfully'
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
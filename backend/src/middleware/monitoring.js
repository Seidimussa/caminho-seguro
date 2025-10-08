const os = require('os');
const mongoose = require('mongoose');

class MonitoringService {
  constructor() {
    this.metrics = {
      requests: 0,
      errors: 0,
      responseTime: [],
      memory: [],
      cpu: []
    };
    
    this.startSystemMonitoring();
  }

  // Middleware to track requests
  requestTracker() {
    return (req, res, next) => {
      const start = Date.now();
      this.metrics.requests++;

      res.on('finish', () => {
        const duration = Date.now() - start;
        this.metrics.responseTime.push(duration);
        
        // Keep only last 1000 response times
        if (this.metrics.responseTime.length > 1000) {
          this.metrics.responseTime = this.metrics.responseTime.slice(-1000);
        }

        if (res.statusCode >= 400) {
          this.metrics.errors++;
        }
      });

      next();
    };
  }

  // Start system monitoring
  startSystemMonitoring() {
    setInterval(() => {
      // Memory usage
      const memUsage = process.memoryUsage();
      this.metrics.memory.push({
        timestamp: Date.now(),
        rss: memUsage.rss,
        heapUsed: memUsage.heapUsed,
        heapTotal: memUsage.heapTotal,
        external: memUsage.external
      });

      // CPU usage
      const cpuUsage = process.cpuUsage();
      this.metrics.cpu.push({
        timestamp: Date.now(),
        user: cpuUsage.user,
        system: cpuUsage.system
      });

      // Keep only last 100 entries
      if (this.metrics.memory.length > 100) {
        this.metrics.memory = this.metrics.memory.slice(-100);
      }
      if (this.metrics.cpu.length > 100) {
        this.metrics.cpu = this.metrics.cpu.slice(-100);
      }
    }, 30000); // Every 30 seconds
  }

  // Get system health
  async getSystemHealth() {
    try {
      // Database connection status
      const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
      
      // Average response time
      const avgResponseTime = this.metrics.responseTime.length > 0
        ? this.metrics.responseTime.reduce((a, b) => a + b, 0) / this.metrics.responseTime.length
        : 0;

      // Memory usage
      const memUsage = process.memoryUsage();
      const totalMemory = os.totalmem();
      const freeMemory = os.freemem();
      const memoryUsagePercent = ((totalMemory - freeMemory) / totalMemory) * 100;

      // CPU load
      const loadAvg = os.loadavg();

      // Disk usage (simplified)
      const uptime = process.uptime();

      return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: uptime,
        database: {
          status: dbStatus,
          connections: mongoose.connections.length
        },
        performance: {
          totalRequests: this.metrics.requests,
          totalErrors: this.metrics.errors,
          errorRate: this.metrics.requests > 0 ? (this.metrics.errors / this.metrics.requests) * 100 : 0,
          avgResponseTime: Math.round(avgResponseTime),
          requestsPerMinute: this.getRequestsPerMinute()
        },
        system: {
          memory: {
            used: memUsage.rss,
            total: totalMemory,
            percentage: memoryUsagePercent,
            heap: {
              used: memUsage.heapUsed,
              total: memUsage.heapTotal
            }
          },
          cpu: {
            loadAverage: loadAvg,
            cores: os.cpus().length
          },
          platform: os.platform(),
          arch: os.arch(),
          nodeVersion: process.version
        }
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  getRequestsPerMinute() {
    const oneMinuteAgo = Date.now() - 60000;
    const recentRequests = this.metrics.responseTime.filter(
      (_, index) => Date.now() - (index * 1000) <= 60000
    );
    return recentRequests.length;
  }

  // Get detailed metrics
  getMetrics() {
    return {
      requests: this.metrics.requests,
      errors: this.metrics.errors,
      errorRate: this.metrics.requests > 0 ? (this.metrics.errors / this.metrics.requests) * 100 : 0,
      responseTime: {
        current: this.metrics.responseTime.slice(-10),
        average: this.metrics.responseTime.length > 0
          ? this.metrics.responseTime.reduce((a, b) => a + b, 0) / this.metrics.responseTime.length
          : 0,
        min: Math.min(...this.metrics.responseTime),
        max: Math.max(...this.metrics.responseTime)
      },
      memory: this.metrics.memory.slice(-10),
      cpu: this.metrics.cpu.slice(-10)
    };
  }

  // Reset metrics
  resetMetrics() {
    this.metrics = {
      requests: 0,
      errors: 0,
      responseTime: [],
      memory: [],
      cpu: []
    };
  }
}

module.exports = new MonitoringService();
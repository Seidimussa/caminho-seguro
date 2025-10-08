const express = require('express');
const Sale = require('../models/Sale');
const Revenue = require('../models/Revenue');
const User = require('../models/User');
const Product = require('../models/Product');
const { authenticate, authorize } = require('../middleware/auth');
const { cacheMiddleware } = require('../middleware/cache');
const { queryValidation } = require('../middleware/validation');

const router = express.Router();

// Sales report
router.get('/sales', 
  authenticate,
  authorize('reports', 'view'),
  queryValidation.dateRange,
  cacheMiddleware(1800), // 30 min cache
  async (req, res) => {
    try {
      const { startDate, endDate, groupBy = 'day' } = req.query;
      
      const matchStage = {};
      if (startDate || endDate) {
        matchStage.createdAt = {};
        if (startDate) matchStage.createdAt.$gte = new Date(startDate);
        if (endDate) matchStage.createdAt.$lte = new Date(endDate);
      }

      let groupStage;
      switch (groupBy) {
        case 'month':
          groupStage = {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' }
            }
          };
          break;
        case 'week':
          groupStage = {
            _id: {
              year: { $year: '$createdAt' },
              week: { $week: '$createdAt' }
            }
          };
          break;
        default: // day
          groupStage = {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
              day: { $dayOfMonth: '$createdAt' }
            }
          };
      }

      const salesReport = await Sale.aggregate([
        { $match: matchStage },
        {
          $group: {
            ...groupStage,
            totalSales: { $sum: '$total' },
            totalOrders: { $sum: 1 },
            avgOrderValue: { $avg: '$total' }
          }
        },
        { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
      ]);

      // Top products
      const topProducts = await Sale.aggregate([
        { $match: matchStage },
        { $unwind: '$products' },
        {
          $group: {
            _id: '$products.product',
            totalQuantity: { $sum: '$products.quantity' },
            totalRevenue: { $sum: '$products.totalPrice' }
          }
        },
        { $sort: { totalRevenue: -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: '_id',
            as: 'product'
          }
        },
        {
          $project: {
            product: { $arrayElemAt: ['$product.name', 0] },
            totalQuantity: 1,
            totalRevenue: 1
          }
        }
      ]);

      res.json({
        success: true,
        data: {
          salesTrend: salesReport,
          topProducts
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Revenue report
router.get('/revenue', 
  authenticate,
  authorize('reports', 'view'),
  queryValidation.dateRange,
  cacheMiddleware(1800),
  async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      
      const matchStage = { status: 'confirmada' };
      if (startDate || endDate) {
        matchStage.date = {};
        if (startDate) matchStage.date.$gte = new Date(startDate);
        if (endDate) matchStage.date.$lte = new Date(endDate);
      }

      const [revenueByType, revenueBySource, monthlyTrend] = await Promise.all([
        // Revenue by type
        Revenue.aggregate([
          { $match: matchStage },
          {
            $group: {
              _id: '$type',
              total: { $sum: '$amount' },
              count: { $sum: 1 }
            }
          },
          { $sort: { total: -1 } }
        ]),

        // Revenue by source
        Revenue.aggregate([
          { $match: matchStage },
          {
            $group: {
              _id: '$source',
              total: { $sum: '$amount' },
              count: { $sum: 1 }
            }
          },
          { $sort: { total: -1 } }
        ]),

        // Monthly trend
        Revenue.aggregate([
          { $match: matchStage },
          {
            $group: {
              _id: {
                year: { $year: '$date' },
                month: { $month: '$date' }
              },
              total: { $sum: '$amount' },
              count: { $sum: 1 }
            }
          },
          { $sort: { '_id.year': 1, '_id.month': 1 } }
        ])
      ]);

      res.json({
        success: true,
        data: {
          byType: revenueByType,
          bySource: revenueBySource,
          monthlyTrend
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Inventory report
router.get('/inventory', 
  authenticate,
  authorize('reports', 'view'),
  cacheMiddleware(3600), // 1 hour cache
  async (req, res) => {
    try {
      const [stockLevels, lowStockProducts, topSellingProducts] = await Promise.all([
        // Stock levels by category
        Product.aggregate([
          { $match: { status: 'ativo' } },
          {
            $group: {
              _id: '$category',
              totalProducts: { $sum: 1 },
              totalStock: { $sum: '$stock' },
              totalValue: { $sum: { $multiply: ['$stock', '$cost'] } },
              lowStockCount: {
                $sum: {
                  $cond: [{ $lte: ['$stock', '$minStock'] }, 1, 0]
                }
              }
            }
          }
        ]),

        // Low stock products
        Product.find({
          $expr: { $lte: ['$stock', '$minStock'] },
          status: 'ativo'
        }).select('name sku stock minStock category'),

        // Top selling products (from sales data)
        Sale.aggregate([
          { $unwind: '$products' },
          {
            $group: {
              _id: '$products.product',
              totalSold: { $sum: '$products.quantity' },
              totalRevenue: { $sum: '$products.totalPrice' }
            }
          },
          { $sort: { totalSold: -1 } },
          { $limit: 10 },
          {
            $lookup: {
              from: 'products',
              localField: '_id',
              foreignField: '_id',
              as: 'product'
            }
          },
          {
            $project: {
              product: { $arrayElemAt: ['$product.name', 0] },
              sku: { $arrayElemAt: ['$product.sku', 0] },
              totalSold: 1,
              totalRevenue: 1
            }
          }
        ])
      ]);

      res.json({
        success: true,
        data: {
          stockLevels,
          lowStockProducts,
          topSellingProducts
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// User activity report
router.get('/users', 
  authenticate,
  authorize('reports', 'view'),
  cacheMiddleware(3600),
  async (req, res) => {
    try {
      const [userStats, newUsersThisMonth, activeUsers] = await Promise.all([
        // Users by role
        User.aggregate([
          {
            $group: {
              _id: '$role',
              count: { $sum: 1 },
              active: {
                $sum: {
                  $cond: [{ $eq: ['$status', 'ativo'] }, 1, 0]
                }
              }
            }
          }
        ]),

        // New users this month
        User.aggregate([
          {
            $match: {
              createdAt: {
                $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
              }
            }
          },
          {
            $group: {
              _id: {
                day: { $dayOfMonth: '$createdAt' }
              },
              count: { $sum: 1 }
            }
          },
          { $sort: { '_id.day': 1 } }
        ]),

        // Most active users (by sales)
        Sale.aggregate([
          {
            $group: {
              _id: '$employee',
              totalSales: { $sum: '$total' },
              orderCount: { $sum: 1 }
            }
          },
          { $sort: { totalSales: -1 } },
          { $limit: 10 },
          {
            $lookup: {
              from: 'users',
              localField: '_id',
              foreignField: '_id',
              as: 'user'
            }
          },
          {
            $project: {
              user: { $arrayElemAt: ['$user.name', 0] },
              role: { $arrayElemAt: ['$user.role', 0] },
              totalSales: 1,
              orderCount: 1
            }
          }
        ])
      ]);

      res.json({
        success: true,
        data: {
          userStats,
          newUsersThisMonth,
          topPerformers: activeUsers
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
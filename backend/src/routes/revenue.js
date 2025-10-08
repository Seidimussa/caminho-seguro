const express = require('express');
const Revenue = require('../models/Revenue');
const { authenticate, authorize } = require('../middleware/auth');
const { cacheMiddleware, clearCache } = require('../middleware/cache');

const router = express.Router();

// Get revenue data
router.get('/', 
  authenticate,
  authorize('revenue', 'view'),
  cacheMiddleware(1800), // 30 min cache
  async (req, res) => {
    try {
      const { 
        type, 
        source, 
        employee,
        startDate,
        endDate,
        page = 1, 
        limit = 20 
      } = req.query;
      
      const filter = { status: 'confirmada' };
      if (type) filter.type = type;
      if (source) filter.source = source;
      if (employee) filter.employee = employee;
      
      if (startDate || endDate) {
        filter.date = {};
        if (startDate) filter.date.$gte = new Date(startDate);
        if (endDate) filter.date.$lte = new Date(endDate);
      }

      const revenues = await Revenue.find(filter)
        .populate('customer', 'name email')
        .populate('employee', 'name email')
        .populate('sale', 'saleNumber')
        .sort({ date: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .lean();

      const total = await Revenue.countDocuments(filter);

      res.json({
        success: true,
        data: revenues,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Create revenue record
router.post('/', 
  authenticate,
  authorize('revenue', 'create'),
  async (req, res) => {
    try {
      const revenue = await Revenue.create({
        ...req.body,
        employee: req.user._id
      });

      clearCache('/api/revenue');

      const populatedRevenue = await Revenue.findById(revenue._id)
        .populate('customer', 'name email')
        .populate('employee', 'name email');

      res.status(201).json({
        success: true,
        data: populatedRevenue
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Revenue analytics
router.get('/analytics/dashboard', 
  authenticate,
  authorize('revenue', 'view'),
  cacheMiddleware(3600), // 1 hour cache
  async (req, res) => {
    try {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

      const [
        monthlyRevenue,
        yearlyRevenue,
        lastMonthRevenue,
        revenueByType,
        revenueBySource,
        topEmployees
      ] = await Promise.all([
        // Current month revenue
        Revenue.aggregate([
          { 
            $match: { 
              date: { $gte: startOfMonth },
              status: 'confirmada'
            } 
          },
          { 
            $group: { 
              _id: null, 
              total: { $sum: '$amount' },
              count: { $sum: 1 }
            } 
          }
        ]),
        
        // Yearly revenue
        Revenue.aggregate([
          { 
            $match: { 
              date: { $gte: startOfYear },
              status: 'confirmada'
            } 
          },
          { 
            $group: { 
              _id: null, 
              total: { $sum: '$amount' },
              count: { $sum: 1 }
            } 
          }
        ]),

        // Last month revenue (for comparison)
        Revenue.aggregate([
          { 
            $match: { 
              date: { $gte: lastMonth, $lte: endOfLastMonth },
              status: 'confirmada'
            } 
          },
          { 
            $group: { 
              _id: null, 
              total: { $sum: '$amount' }
            } 
          }
        ]),

        // Revenue by type
        Revenue.aggregate([
          { $match: { status: 'confirmada' } },
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
          { $match: { status: 'confirmada' } },
          {
            $group: {
              _id: '$source',
              total: { $sum: '$amount' },
              count: { $sum: 1 }
            }
          },
          { $sort: { total: -1 } }
        ]),

        // Top performing employees
        Revenue.aggregate([
          { 
            $match: { 
              date: { $gte: startOfMonth },
              status: 'confirmada'
            } 
          },
          {
            $group: {
              _id: '$employee',
              total: { $sum: '$amount' },
              count: { $sum: 1 }
            }
          },
          { $sort: { total: -1 } },
          { $limit: 5 },
          {
            $lookup: {
              from: 'users',
              localField: '_id',
              foreignField: '_id',
              as: 'employee'
            }
          },
          {
            $project: {
              employee: { $arrayElemAt: ['$employee.name', 0] },
              total: 1,
              count: 1
            }
          }
        ])
      ]);

      // Calculate growth percentage
      const currentMonth = monthlyRevenue[0]?.total || 0;
      const lastMonthTotal = lastMonthRevenue[0]?.total || 0;
      const growthPercentage = lastMonthTotal > 0 
        ? ((currentMonth - lastMonthTotal) / lastMonthTotal * 100).toFixed(2)
        : 0;

      res.json({
        success: true,
        data: {
          monthly: {
            ...monthlyRevenue[0],
            total: currentMonth,
            growth: parseFloat(growthPercentage)
          },
          yearly: yearlyRevenue[0] || { total: 0, count: 0 },
          byType: revenueByType,
          bySource: revenueBySource,
          topEmployees
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Monthly revenue trend (last 12 months)
router.get('/analytics/trend', 
  authenticate,
  authorize('revenue', 'view'),
  cacheMiddleware(7200), // 2 hours cache
  async (req, res) => {
    try {
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

      const trend = await Revenue.aggregate([
        { 
          $match: { 
            date: { $gte: twelveMonthsAgo },
            status: 'confirmada'
          } 
        },
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
      ]);

      res.json({
        success: true,
        data: trend
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
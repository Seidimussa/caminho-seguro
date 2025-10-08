const express = require('express');
const Sale = require('../models/Sale');
const Revenue = require('../models/Revenue');
const { authenticate, authorize } = require('../middleware/auth');
const { cacheMiddleware, clearCache } = require('../middleware/cache');

const router = express.Router();

// Get all sales
router.get('/', 
  authenticate,
  authorize('sales', 'view'),
  cacheMiddleware(900), // 15 min cache
  async (req, res) => {
    try {
      const { 
        status, 
        paymentStatus, 
        employee, 
        customer,
        startDate,
        endDate,
        page = 1, 
        limit = 20 
      } = req.query;
      
      const filter = {};
      if (status) filter.status = status;
      if (paymentStatus) filter.paymentStatus = paymentStatus;
      if (employee) filter.employee = employee;
      if (customer) filter.customer = customer;
      
      if (startDate || endDate) {
        filter.createdAt = {};
        if (startDate) filter.createdAt.$gte = new Date(startDate);
        if (endDate) filter.createdAt.$lte = new Date(endDate);
      }

      const sales = await Sale.find(filter)
        .populate('customer', 'name email')
        .populate('employee', 'name email')
        .populate('products.product', 'name sku')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .lean();

      const total = await Sale.countDocuments(filter);

      res.json({
        success: true,
        data: sales,
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

// Create new sale
router.post('/', 
  authenticate,
  authorize('sales', 'create'),
  async (req, res) => {
    try {
      const saleData = {
        ...req.body,
        employee: req.user._id
      };

      const sale = await Sale.create(saleData);
      
      // Create revenue record
      await Revenue.create({
        type: 'venda',
        source: 'direto',
        amount: sale.total,
        sale: sale._id,
        customer: sale.customer,
        employee: sale.employee,
        description: `Venda ${sale.saleNumber}`,
        category: 'produto'
      });

      clearCache('/api/sales');
      clearCache('/api/revenue');

      const populatedSale = await Sale.findById(sale._id)
        .populate('customer', 'name email')
        .populate('employee', 'name email')
        .populate('products.product', 'name sku');

      res.status(201).json({
        success: true,
        data: populatedSale
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Get sale by ID
router.get('/:id', 
  authenticate,
  authorize('sales', 'view'),
  async (req, res) => {
    try {
      const sale = await Sale.findById(req.params.id)
        .populate('customer', 'name email phone')
        .populate('employee', 'name email')
        .populate('products.product', 'name sku description');

      if (!sale) {
        return res.status(404).json({ message: 'Sale not found' });
      }

      res.json({
        success: true,
        data: sale
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Update sale
router.put('/:id', 
  authenticate,
  authorize('sales', 'edit'),
  async (req, res) => {
    try {
      const sale = await Sale.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).populate('customer', 'name email')
       .populate('employee', 'name email')
       .populate('products.product', 'name sku');

      if (!sale) {
        return res.status(404).json({ message: 'Sale not found' });
      }

      clearCache('/api/sales');

      res.json({
        success: true,
        data: sale
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Delete sale (admin+ only)
router.delete('/:id', 
  authenticate,
  authorize('sales', 'delete'),
  async (req, res) => {
    try {
      const sale = await Sale.findByIdAndDelete(req.params.id);
      
      if (!sale) {
        return res.status(404).json({ message: 'Sale not found' });
      }

      // Delete associated revenue record
      await Revenue.deleteOne({ sale: sale._id });

      clearCache('/api/sales');
      clearCache('/api/revenue');

      res.json({
        success: true,
        message: 'Sale deleted successfully'
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Sales statistics
router.get('/stats/overview', 
  authenticate,
  authorize('sales', 'view'),
  cacheMiddleware(1800), // 30 min cache
  async (req, res) => {
    try {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const startOfYear = new Date(today.getFullYear(), 0, 1);

      const [monthlyStats, yearlyStats, statusStats] = await Promise.all([
        Sale.aggregate([
          { $match: { createdAt: { $gte: startOfMonth } } },
          { 
            $group: { 
              _id: null, 
              total: { $sum: '$total' },
              count: { $sum: 1 },
              avgSale: { $avg: '$total' }
            } 
          }
        ]),
        Sale.aggregate([
          { $match: { createdAt: { $gte: startOfYear } } },
          { 
            $group: { 
              _id: null, 
              total: { $sum: '$total' },
              count: { $sum: 1 }
            } 
          }
        ]),
        Sale.aggregate([
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 },
              total: { $sum: '$total' }
            }
          }
        ])
      ]);

      res.json({
        success: true,
        data: {
          monthly: monthlyStats[0] || { total: 0, count: 0, avgSale: 0 },
          yearly: yearlyStats[0] || { total: 0, count: 0 },
          byStatus: statusStats
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
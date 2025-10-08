const express = require('express');
const Product = require('../models/Product');
const NotificationService = require('../services/notificationService');
const { authenticate, authorize } = require('../middleware/auth');
const { cacheMiddleware, clearCache } = require('../middleware/cache');
const { productValidation, queryValidation } = require('../middleware/validation');
const { auditLogger } = require('../middleware/logging');

const router = express.Router();

// Get all products
router.get('/', 
  authenticate,
  authorize('products', 'view'),
  queryValidation.pagination,
  cacheMiddleware(1800), // 30 min cache
  async (req, res) => {
    try {
      const { 
        category, 
        status = 'ativo', 
        featured,
        lowStock,
        search,
        page = 1, 
        limit = 20 
      } = req.query;
      
      const filter = {};
      if (category) filter.category = category;
      if (status) filter.status = status;
      if (featured !== undefined) filter.featured = featured === 'true';
      if (lowStock === 'true') {
        filter.$expr = { $lte: ['$stock', '$minStock'] };
      }
      if (search) {
        filter.$text = { $search: search };
      }

      const products = await Product.find(filter)
        .sort({ featured: -1, createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .lean();

      const total = await Product.countDocuments(filter);

      // Add virtual fields
      const productsWithVirtuals = products.map(product => ({
        ...product,
        profitMargin: ((product.price - product.cost) / product.price * 100).toFixed(2),
        isLowStock: product.stock <= product.minStock
      }));

      res.json({
        success: true,
        data: productsWithVirtuals,
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

// Get product by ID
router.get('/:id', 
  authenticate,
  authorize('products', 'view'),
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json({
        success: true,
        data: {
          ...product.toObject(),
          profitMargin: product.profitMargin,
          isLowStock: product.isLowStock
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Create product
router.post('/', 
  authenticate,
  authorize('products', 'create'),
  productValidation.create,
  auditLogger('CREATE', 'product'),
  async (req, res) => {
    try {
      const product = await Product.create(req.body);
      clearCache('/api/products');

      res.status(201).json({
        success: true,
        data: product
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'SKU already exists' });
      }
      res.status(500).json({ message: error.message });
    }
  }
);

// Update product
router.put('/:id', 
  authenticate,
  authorize('products', 'edit'),
  auditLogger('UPDATE', 'product'),
  async (req, res) => {
    try {
      const oldProduct = await Product.findById(req.params.id);
      if (!oldProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      // Check if stock became low
      if (product.stock <= product.minStock && oldProduct.stock > oldProduct.minStock) {
        await NotificationService.notifyLowStock(product);
      }

      clearCache('/api/products');

      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Delete product
router.delete('/:id', 
  authenticate,
  authorize('products', 'delete'),
  auditLogger('DELETE', 'product'),
  async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      clearCache('/api/products');

      res.json({
        success: true,
        message: 'Product deleted successfully'
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Update stock
router.patch('/:id/stock', 
  authenticate,
  authorize('products', 'edit'),
  auditLogger('UPDATE', 'product'),
  async (req, res) => {
    try {
      const { quantity, operation = 'set' } = req.body;
      
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const oldStock = product.stock;
      
      switch (operation) {
        case 'add':
          product.stock += quantity;
          break;
        case 'subtract':
          product.stock = Math.max(0, product.stock - quantity);
          break;
        case 'set':
        default:
          product.stock = quantity;
      }

      await product.save();

      // Check for low stock notification
      if (product.stock <= product.minStock && oldStock > product.minStock) {
        await NotificationService.notifyLowStock(product);
      }

      clearCache('/api/products');

      res.json({
        success: true,
        data: product,
        message: `Stock updated from ${oldStock} to ${product.stock}`
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Get low stock products
router.get('/alerts/low-stock', 
  authenticate,
  authorize('products', 'view'),
  cacheMiddleware(900), // 15 min cache
  async (req, res) => {
    try {
      const lowStockProducts = await Product.find({
        $expr: { $lte: ['$stock', '$minStock'] },
        status: 'ativo'
      }).sort({ stock: 1 });

      res.json({
        success: true,
        data: lowStockProducts,
        count: lowStockProducts.length
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
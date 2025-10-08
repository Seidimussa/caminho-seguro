const express = require('express');
const User = require('../models/User');
const Sale = require('../models/Sale');
const Revenue = require('../models/Revenue');
const Product = require('../models/Product');
const { authenticate, requireDashboard } = require('../middleware/auth');
const { cacheMiddleware } = require('../middleware/cache');

const router = express.Router();

// Main dashboard overview
router.get('/overview', 
  authenticate,
  requireDashboard,
  cacheMiddleware(900), // 15 min cache
  async (req, res) => {
    try {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const startOfYear = new Date(today.getFullYear(), 0, 1);

      // Get user's role-based data
      const userRole = req.user.role;
      const canViewRevenue = req.user.permissions.revenue.view;
      const canViewSales = req.user.permissions.sales.view;
      const canViewUsers = req.user.permissions.users.view;
      const canViewProducts = req.user.permissions.products.view;

      const dashboardData = {};

      // Sales data (if user can view)
      if (canViewSales) {
        const salesFilter = userRole === 'funcionario' 
          ? { employee: req.user._id } 
          : {};

        const [monthlySales, totalSales] = await Promise.all([
          Sale.aggregate([
            { 
              $match: { 
                ...salesFilter,
                createdAt: { $gte: startOfMonth } 
              } 
            },
            { 
              $group: { 
                _id: null, 
                total: { $sum: '$total' },
                count: { $sum: 1 }
              } 
            }
          ]),
          Sale.countDocuments(salesFilter)
        ]);

        dashboardData.sales = {
          monthly: monthlySales[0] || { total: 0, count: 0 },
          total: totalSales
        };
      }

      // Revenue data (if user can view)
      if (canViewRevenue) {
        const revenueFilter = userRole === 'funcionario' 
          ? { employee: req.user._id, status: 'confirmada' } 
          : { status: 'confirmada' };

        const [monthlyRevenue, yearlyRevenue] = await Promise.all([
          Revenue.aggregate([
            { 
              $match: { 
                ...revenueFilter,
                date: { $gte: startOfMonth } 
              } 
            },
            { 
              $group: { 
                _id: null, 
                total: { $sum: '$amount' }
              } 
            }
          ]),
          Revenue.aggregate([
            { 
              $match: { 
                ...revenueFilter,
                date: { $gte: startOfYear } 
              } 
            },
            { 
              $group: { 
                _id: null, 
                total: { $sum: '$amount' }
              } 
            }
          ])
        ]);

        dashboardData.revenue = {
          monthly: monthlyRevenue[0]?.total || 0,
          yearly: yearlyRevenue[0]?.total || 0
        };
      }

      // Users data (if user can view)
      if (canViewUsers) {
        const [totalUsers, activeUsers, newUsersThisMonth] = await Promise.all([
          User.countDocuments(),
          User.countDocuments({ status: 'ativo' }),
          User.countDocuments({ 
            createdAt: { $gte: startOfMonth },
            role: 'cliente'
          })
        ]);

        dashboardData.users = {
          total: totalUsers,
          active: activeUsers,
          newThisMonth: newUsersThisMonth
        };
      }

      // Products data (if user can view)
      if (canViewProducts) {
        const [totalProducts, lowStockProducts, activeProducts] = await Promise.all([
          Product.countDocuments(),
          Product.countDocuments({ 
            $expr: { $lte: ['$stock', '$minStock'] },
            status: 'ativo'
          }),
          Product.countDocuments({ status: 'ativo' })
        ]);

        dashboardData.products = {
          total: totalProducts,
          active: activeProducts,
          lowStock: lowStockProducts
        };
      }

      // Recent activities (based on user permissions)
      const recentActivities = [];

      if (canViewSales) {
        const recentSales = await Sale.find(
          userRole === 'funcionario' ? { employee: req.user._id } : {}
        )
        .populate('customer', 'name')
        .sort({ createdAt: -1 })
        .limit(5)
        .select('saleNumber total status createdAt customer');

        recentSales.forEach(sale => {
          recentActivities.push({
            type: 'sale',
            description: `Venda ${sale.saleNumber} - ${sale.customer.name}`,
            amount: sale.total,
            status: sale.status,
            date: sale.createdAt
          });
        });
      }

      // Sort activities by date
      recentActivities.sort((a, b) => new Date(b.date) - new Date(a.date));

      res.json({
        success: true,
        data: {
          ...dashboardData,
          recentActivities: recentActivities.slice(0, 10),
          userInfo: {
            name: req.user.name,
            role: req.user.role,
            department: req.user.department,
            permissions: req.user.permissions
          }
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Quick stats for widgets
router.get('/widgets', 
  authenticate,
  requireDashboard,
  cacheMiddleware(600), // 10 min cache
  async (req, res) => {
    try {
      const widgets = [];

      // Sales widget
      if (req.user.permissions.sales.view) {
        const todaySales = await Sale.aggregate([
          { 
            $match: { 
              createdAt: { 
                $gte: new Date(new Date().setHours(0, 0, 0, 0)) 
              }
            } 
          },
          { 
            $group: { 
              _id: null, 
              total: { $sum: '$total' },
              count: { $sum: 1 }
            } 
          }
        ]);

        widgets.push({
          type: 'sales',
          title: 'Vendas Hoje',
          value: todaySales[0]?.total || 0,
          count: todaySales[0]?.count || 0,
          icon: 'shopping-cart'
        });
      }

      // Revenue widget
      if (req.user.permissions.revenue.view) {
        const todayRevenue = await Revenue.aggregate([
          { 
            $match: { 
              date: { 
                $gte: new Date(new Date().setHours(0, 0, 0, 0)) 
              },
              status: 'confirmada'
            } 
          },
          { 
            $group: { 
              _id: null, 
              total: { $sum: '$amount' }
            } 
          }
        ]);

        widgets.push({
          type: 'revenue',
          title: 'Receita Hoje',
          value: todayRevenue[0]?.total || 0,
          icon: 'dollar-sign'
        });
      }

      // Low stock alert
      if (req.user.permissions.products.view) {
        const lowStockCount = await Product.countDocuments({ 
          $expr: { $lte: ['$stock', '$minStock'] },
          status: 'ativo'
        });

        if (lowStockCount > 0) {
          widgets.push({
            type: 'alert',
            title: 'Estoque Baixo',
            value: lowStockCount,
            icon: 'alert-triangle',
            variant: 'warning'
          });
        }
      }

      res.json({
        success: true,
        data: widgets
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
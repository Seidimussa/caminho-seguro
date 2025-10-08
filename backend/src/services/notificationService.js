const Notification = require('../models/Notification');
const User = require('../models/User');

class NotificationService {
  static async createNotification(recipientId, data) {
    try {
      return await Notification.createNotification({
        recipient: recipientId,
        ...data
      });
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  }

  static async notifyByRole(roles, data) {
    try {
      const users = await User.find({ 
        role: { $in: roles },
        status: 'ativo'
      }).select('_id');
      
      const notifications = users.map(user => ({
        recipient: user._id,
        ...data
      }));
      
      return await Notification.insertMany(notifications);
    } catch (error) {
      console.error('Error notifying by role:', error);
    }
  }

  static async notifyLowStock(product) {
    const data = {
      type: 'low_stock',
      title: 'Estoque Baixo',
      message: `O produto "${product.name}" está com estoque baixo (${product.stock} unidades)`,
      category: 'inventory',
      priority: 'high',
      data: { productId: product._id, currentStock: product.stock }
    };

    return await this.notifyByRole(['super-admin', 'admin'], data);
  }

  static async notifyNewSale(sale, employee) {
    const data = {
      type: 'sale_created',
      title: 'Nova Venda Realizada',
      message: `Venda ${sale.saleNumber} no valor de ${sale.total} MZN`,
      category: 'sales',
      priority: 'medium',
      data: { saleId: sale._id, amount: sale.total },
      sender: employee._id
    };

    return await this.notifyByRole(['super-admin', 'admin'], data);
  }

  static async getUserNotifications(userId, options = {}) {
    const { page = 1, limit = 20, unreadOnly = false } = options;
    
    const filter = { recipient: userId };
    if (unreadOnly) filter.read = false;

    return await Notification.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('sender', 'name role');
  }

  static async getUnreadCount(userId) {
    return await Notification.countDocuments({
      recipient: userId,
      read: false
    });
  }
}

module.exports = NotificationService;
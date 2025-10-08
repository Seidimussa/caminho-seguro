const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class WebSocketService {
  constructor() {
    this.io = null;
    this.connectedUsers = new Map();
  }

  initialize(server) {
    this.io = new Server(server, {
      cors: {
        origin: process.env.NODE_ENV === 'production' 
          ? ['https://caminhoseguro.com'] 
          : ['http://localhost:3000'],
        credentials: true
      }
    });

    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        if (!token) {
          return next(new Error('Authentication error'));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user || user.status !== 'ativo') {
          return next(new Error('Authentication error'));
        }

        socket.userId = user._id.toString();
        socket.userRole = user.role;
        next();
      } catch (error) {
        next(new Error('Authentication error'));
      }
    });

    this.io.on('connection', (socket) => {
      console.log(`User ${socket.userId} connected`);
      this.connectedUsers.set(socket.userId, socket);

      socket.on('disconnect', () => {
        console.log(`User ${socket.userId} disconnected`);
        this.connectedUsers.delete(socket.userId);
      });

      socket.on('join-room', (room) => {
        socket.join(room);
      });
    });
  }

  // Send notification to specific user
  sendToUser(userId, event, data) {
    const socket = this.connectedUsers.get(userId.toString());
    if (socket) {
      socket.emit(event, data);
    }
  }

  // Send notification to users by role
  sendToRole(roles, event, data) {
    this.connectedUsers.forEach((socket) => {
      if (roles.includes(socket.userRole)) {
        socket.emit(event, data);
      }
    });
  }

  // Send to all connected users
  sendToAll(event, data) {
    this.io.emit(event, data);
  }

  // Send real-time notification
  sendNotification(userId, notification) {
    this.sendToUser(userId, 'notification', notification);
  }

  // Send low stock alert
  sendLowStockAlert(product) {
    this.sendToRole(['super-admin', 'admin'], 'low-stock-alert', {
      type: 'low_stock',
      product: {
        id: product._id,
        name: product.name,
        stock: product.stock,
        minStock: product.minStock
      },
      timestamp: new Date()
    });
  }

  // Send new sale notification
  sendNewSaleNotification(sale) {
    this.sendToRole(['super-admin', 'admin'], 'new-sale', {
      type: 'new_sale',
      sale: {
        id: sale._id,
        saleNumber: sale.saleNumber,
        total: sale.total,
        customer: sale.customer?.name
      },
      timestamp: new Date()
    });
  }

  // Send system update
  sendSystemUpdate(message, priority = 'medium') {
    this.sendToAll('system-update', {
      message,
      priority,
      timestamp: new Date()
    });
  }
}

module.exports = new WebSocketService();
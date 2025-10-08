import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export const useWebSocket = (token) => {
  const [connected, setConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!token) return;

    socketRef.current = io(process.env.REACT_APP_WS_URL || 'http://localhost:5000', {
      auth: { token },
      transports: ['websocket']
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      setConnected(true);
    });

    socket.on('disconnect', () => {
      setConnected(false);
    });

    socket.on('notification', (notification) => {
      setNotifications(prev => [notification, ...prev.slice(0, 49)]);
      
      if (Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/favicon.ico'
        });
      }
    });

    socket.on('low-stock-alert', (alert) => {
      setNotifications(prev => [{
        id: Date.now(),
        type: 'low_stock',
        title: 'Estoque Baixo',
        message: `${alert.product.name} está com estoque baixo (${alert.product.stock} unidades)`,
        priority: 'high',
        createdAt: alert.timestamp,
        read: false
      }, ...prev.slice(0, 49)]);
    });

    socket.on('new-sale', (sale) => {
      setNotifications(prev => [{
        id: Date.now(),
        type: 'sale_created',
        title: 'Nova Venda',
        message: `Venda ${sale.sale.saleNumber} realizada - ${sale.sale.total} MZN`,
        priority: 'medium',
        createdAt: sale.timestamp,
        read: false
      }, ...prev.slice(0, 49)]);
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, read: true }
          : notif
      )
    );
  };

  return {
    connected,
    notifications,
    markNotificationAsRead,
    unreadCount: notifications.filter(n => !n.read).length
  };
};
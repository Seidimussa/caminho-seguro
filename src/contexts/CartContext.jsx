
    import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

    const CartContext = createContext();

    export const useCart = () => {
      return useContext(CartContext);
    };

    export const CartProvider = ({ children }) => {
      const [items, setItems] = useState([]);

      useEffect(() => {
        try {
          const savedCart = localStorage.getItem('caminhoSeguroCart');
          if (savedCart) {
            setItems(JSON.parse(savedCart));
          }
        } catch (error) {
          console.error("Failed to parse cart from localStorage", error);
          setItems([]);
        }
      }, []);

      useEffect(() => {
        localStorage.setItem('caminhoSeguroCart', JSON.stringify(items));
      }, [items]);

      const addItem = (product, quantity = 1) => {
        setItems(prevItems => {
          const existingItem = prevItems.find(item => item.id === product.id);
          
          if (existingItem) {
            return prevItems.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }
          
          return [...prevItems, { ...product, quantity }];
        });
      };

      const removeItem = (productId) => {
        setItems(prevItems => prevItems.filter(item => item.id !== productId));
      };

      const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
          removeItem(productId);
          return;
        }

        setItems(prevItems =>
          prevItems.map(item =>
            item.id === productId ? { ...item, quantity } : item
          )
        );
      };

      const clearCart = () => {
        setItems([]);
      };

      const cartData = useMemo(() => {
        const totalItems = items.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
        return { totalItems, totalPrice };
      }, [items]);


      const value = {
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalPrice: () => cartData.totalPrice,
        getTotalItems: () => cartData.totalItems,
      };

      return (
        <CartContext.Provider value={value}>
          {children}
        </CartContext.Provider>
      );
    };
  
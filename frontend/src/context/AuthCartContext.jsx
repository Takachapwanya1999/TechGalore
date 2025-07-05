import React, { createContext, useContext, useState, useEffect } from 'react';
import socket from '../utils/socket';

const AuthCartContext = createContext();

export const useAuthCart = () => {
  const context = useContext(AuthCartContext);
  if (!context) {
    throw new Error('useAuthCart must be used within an AuthCartProvider');
  }
  return context;
};

export const AuthCartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState(null);

  // Initialize cart from localStorage
  useEffect(() => {
    const initializeCart = () => {
      let storedCart;
      try {
        storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      } catch {
        storedCart = [];
      }
      if (!Array.isArray(storedCart)) {
        storedCart = [];
      }
      setCart(storedCart);
      setCartCount(storedCart.length);
    };

    initializeCart();
  }, []);

  // Socket connection management
  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true);
      console.log('Connected to real-time server');
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      console.log('Disconnected from real-time server');
    };

    const handleCartUpdate = (updatedCart) => {
      setCart(updatedCart);
      setCartCount(updatedCart.length);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('cart-updated'));
    };

    const handleUserUpdate = (userData) => {
      setUser(userData);
    };

    // Socket event listeners
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('cart-updated', handleCartUpdate);
    socket.on('user-updated', handleUserUpdate);

    // Emit initial cart state to server
    if (socket.connected) {
      socket.emit('cart-sync', cart);
    }

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('cart-updated', handleCartUpdate);
      socket.off('user-updated', handleUserUpdate);
    };
  }, [cart]);

  // Cart operations
  const addToCart = (item) => {
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart.push({
        id: item.id,
        quantity: 1,
        ...item
      });
    }

    setCart(updatedCart);
    setCartCount(updatedCart.length);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Emit to server for real-time updates
    socket.emit('cart-update', updatedCart);
    window.dispatchEvent(new Event('cart-updated'));
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
    setCartCount(updatedCart.length);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    socket.emit('cart-update', updatedCart);
    window.dispatchEvent(new Event('cart-updated'));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const updatedCart = cart.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    );
    
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    socket.emit('cart-update', updatedCart);
    window.dispatchEvent(new Event('cart-updated'));
  };

  const clearCart = () => {
    setCart([]);
    setCartCount(0);
    localStorage.removeItem('cart');
    
    socket.emit('cart-update', []);
    window.dispatchEvent(new Event('cart-updated'));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    cartCount,
    isConnected,
    user,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    setUser
  };

  return (
    <AuthCartContext.Provider value={value}>
      {children}
    </AuthCartContext.Provider>
  );
};

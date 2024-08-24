import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      const cart = JSON.parse(await AsyncStorage.getItem('cart')) || [];
      const validCart = cart.filter(item => {
        const diff = (new Date().getTime() - item.timestamp) / 1000 / 3600;
        return diff < 12;
      });
    
      if (validCart.length !== cart.length) {
        await AsyncStorage.setItem('cart', JSON.stringify(validCart));
      }
    
      setCartItems(validCart);
      setTotal(validCart.reduce((sum, item) => sum + parseFloat(item.price), 0));
    };

    fetchCartItems();
  }, []);

  const addToCart = async (newItem) => {
    const cart = JSON.parse(await AsyncStorage.getItem('cart')) || [];
    
    // Convert price to string
    const itemWithStringPrice = { 
      ...newItem, 
      price: newItem.price.toString(), 
      timestamp: new Date().getTime() 
    };
    
    const updatedCart = [...cart, itemWithStringPrice];
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    setTotal(updatedCart.reduce((sum, item) => sum + parseFloat(item.price), 0));
  };

  const removeFromCart = async (flavorToRemove) => {
    const updatedCart = cartItems.filter(item => item.flavor !== flavorToRemove);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    setTotal(updatedCart.reduce((sum, item) => sum + parseFloat(item.price), 0));
  };

  const clearCart = async () => {
    await AsyncStorage.removeItem('cart');
    setCartItems([]);
    setTotal(0);
  };

  return (
    <CartContext.Provider value={{ cartItems, total, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

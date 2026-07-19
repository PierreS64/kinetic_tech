import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem('kinetic_cart');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to parse cart from local storage', e);
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('kinetic_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = async (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    setCartOpen(true);
  };

  const handleBuyNow = async (product) => {
    await handleAddToCart(product);
    setCartOpen(false);
    navigate('/checkout');
  };

  const handleAddPartsToCart = async (parts) => {
    setCartItems(prev => {
      let nextCart = [...prev];
      parts.forEach(part => {
        const existing = nextCart.find(i => i.id === part.id);
        if (existing) {
          nextCart = nextCart.map(i => i.id === part.id ? { ...i, quantity: i.quantity + 1 } : i);
        } else {
          nextCart.push({ ...part, quantity: 1 });
        }
      });
      return nextCart;
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = async (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const handleRemoveItem = async (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = async () => {
    setCartItems([]);
  };

  const loadCart = async () => {}; // Mock for API compat if needed

  const value = {
    cartItems, setCartItems, cartOpen, setCartOpen,
    handleAddToCart, handleBuyNow, handleAddPartsToCart,
    handleUpdateQuantity, handleRemoveItem, handleClearCart, loadCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

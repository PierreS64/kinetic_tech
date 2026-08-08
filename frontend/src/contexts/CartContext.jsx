import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children, userId = 'guest' }) {
  const storageKey = `kinetic_cart_${userId}`;
  const [cartItems, setCartItems] = useState(() => {
    if (userId !== 'guest') return []; // Will load from API
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to parse cart from local storage', e);
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const loadCart = async () => {
    if (userId === 'guest') return;
    try {
      const res = await api.get('/cart');
      if (res.data && res.data.CartItem) {
        const mappedCart = res.data.CartItem.map(item => ({
          cartItemId: item.id,
          id: item.ProductVariant.Product.id,
          variantId: item.productVariantId,
          name: item.ProductVariant.Product.name,
          price: item.ProductVariant.price,
          image: item.ProductVariant.Product.ProductImage?.[0]?.imageUrl || '',
          quantity: item.quantity,
          inStock: item.ProductVariant.stockQuantity > 0
        }));
        // Sort by cartItemId (creation order) to keep stable order on quantity update
        mappedCart.sort((a, b) => a.cartItemId.localeCompare(b.cartItemId));
        setCartItems(mappedCart);
      }
    } catch (err) {
      console.error('Failed to load cart', err);
    }
  };

  useEffect(() => {
    if (userId === 'guest') {
      localStorage.setItem(storageKey, JSON.stringify(cartItems));
    } else {
      loadCart();
    }
  }, [userId]);

  // Persist guest cart
  useEffect(() => {
    if (userId === 'guest') {
      localStorage.setItem(storageKey, JSON.stringify(cartItems));
    }
  }, [cartItems, storageKey, userId]);

  const handleAddToCart = async (product, quantity = 1) => {
    if (userId !== 'guest') {
      try {
        if (!product.variantId) {
          alert('Sản phẩm không có thông tin variant!');
          return;
        }
        await api.post('/cart/items', { productVariantId: product.variantId, quantity });
        await loadCart();
      } catch (err) {
        console.error('Error adding to cart API', err);
        alert(err.response?.data?.message || 'Lỗi thêm vào giỏ hàng');
        return;
      }
    } else {
      setCartItems(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing) {
          return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
        }
        return [...prev, { ...product, quantity }];
      });
    }
    setCartOpen(true);
  };

  const handleBuyNow = async (product) => {
    setCartOpen(false);
    navigate('/checkout', { state: { buyNowItem: { ...product, quantity: 1 } } });
  };

  const handleAddPartsToCart = async (parts) => {
    if (userId !== 'guest') {
      for (const part of parts) {
        if (part.variantId) {
          try {
            await api.post('/cart/items', { productVariantId: part.variantId, quantity: 1 });
          } catch (e) { console.error('Failed to add part', e); }
        }
      }
      await loadCart();
    } else {
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
    }
    setCartOpen(true);
  };

  const handleUpdateQuantity = async (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    if (userId !== 'guest') {
      try {
        const item = cartItems.find(i => i.id === id);
        if (item && item.cartItemId) {
          await api.patch(`/cart/items/${item.cartItemId}`, { quantity });
          await loadCart();
        }
      } catch (err) {
        console.error('Error updating quantity API', err);
        alert(err.response?.data?.message || 'Lỗi cập nhật số lượng');
      }
    } else {
      setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    }
  };

  const handleRemoveItem = async (id) => {
    if (userId !== 'guest') {
      try {
        const item = cartItems.find(i => i.id === id);
        if (item && item.cartItemId) {
          await api.delete(`/cart/items/${item.cartItemId}`);
          await loadCart();
        }
      } catch (err) {
        console.error('Error removing item API', err);
      }
    } else {
      setCartItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleClearCart = async () => {
    if (userId !== 'guest') {
      try {
        await api.delete('/cart');
        await loadCart();
      } catch (err) {
        console.error('Error clearing cart API', err);
      }
    } else {
      setCartItems([]);
    }
  };

  const value = {
    cartItems, setCartItems, cartOpen, setCartOpen,
    handleAddToCart, handleBuyNow, handleAddPartsToCart,
    handleUpdateQuantity, handleRemoveItem, handleClearCart, loadCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

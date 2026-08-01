import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';


const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children, userId = 'guest' }) {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('kinetic_theme');
      return stored || 'dark';
    } catch {
      return 'dark';
    }
  });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [searchQuery, setSearchQuery] = useState('');
  const [aiOpen, setAiOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState(null);
  const [storeProducts, setStoreProducts] = useState([]);
  
  // Data states
  const [orders, setOrders] = useState([]);
  const [tradeins, setTradeins] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [warranties, setWarranties] = useState([]);
  const storageKey = `kinetic_liked_${userId}`;
  const [likedProductIds, setLikedProductIds] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    localStorage.setItem('kinetic_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleToggleLike = (id) => {
    setLikedProductIds(prev => 
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const loadProducts = async () => {
    try {
      const res = await api.get('/products');
      if (res.data) {
        const mappedProducts = res.data.map(p => {
          let specsObj = {};
          let tagsArr = [];
          if (p.description) {
            try {
              if (p.description.startsWith('{')) {
                const parsed = JSON.parse(p.description);
                specsObj = parsed;
                tagsArr = parsed.tags || [];
              } else {
                specsObj = { description: p.description };
              }
            } catch (e) {
              specsObj = { description: p.description };
            }
          }
          
          return {
            id: p.id,
            name: p.name,
            brand: p.brand || '',
            category: p.Category?.name || 'khác',
            price: p.ProductVariant?.[0]?.price || 0,
            image: p.ProductImage?.[0]?.imageUrl || '',
            specs: specsObj,
            rating: 4.8,
            reviews: Math.floor(Math.random() * 100) + 20,
            tags: tagsArr,
            featured: true,
            inStock: (p.ProductVariant?.[0]?.stockQuantity || 0) > 0,
            stock: p.ProductVariant?.reduce((acc, curr) => acc + (curr.stockQuantity || 0), 0) || 0,
            variantId: p.ProductVariant?.[0]?.id
          };
        });
        setStoreProducts(mappedProducts);
      }
    } catch (err) {
      console.error('Failed to load products', err);
    }
  };

  const loadUserData = async () => {
    if (userId === 'guest') return;
    try {
      const res = await api.get('/users/me');
      if (res.data) {
        // We need to update the currentUser in AuthContext
        // To do this, we can dispatch a custom event or just return the data so caller handles it
        // Or we can import useAuth. Since we can't easily do it here without refactoring, 
        // we just save to local storage for now or we will update AuthContext.
        const storedUserStr = localStorage.getItem('kinetic_user');
        if (storedUserStr) {
          const storedUser = JSON.parse(storedUserStr);
          const updated = { ...storedUser, ...res.data };
          localStorage.setItem('kinetic_user', JSON.stringify(updated));
          // Dispatch a custom event to notify AuthContext to reload (optional)
          window.dispatchEvent(new Event('kinetic_user_updated'));
        }
      }
    } catch (err) {
      console.error('Failed to load user data', err);
    }
  };

  useEffect(() => {
    loadProducts();
    loadUserData();
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(likedProductIds));
  }, [likedProductIds, storageKey]);

  const value = {
    theme, toggleTheme,
    toast, showToast,
    storeProducts, setStoreProducts,
    orders, setOrders,
    tradeins, tickets, feedbacks, warranties,
    searchQuery, setSearchQuery,
    aiOpen, setAiOpen,
    selectedProduct, setSelectedProduct,
    selectedDetailProduct, setSelectedDetailProduct,
    likedProductIds, handleToggleLike,
    loadUserData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

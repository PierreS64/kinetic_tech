import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import ProductCard from './components/ProductCard';
import PCBuilder from './components/PCBuilder';
import AIAdvisor from './components/AIAdvisor';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Auth from './components/Auth';
import TradeIn from './components/TradeIn';
import SupportTicket from './components/SupportTicket';
import Warranty from './components/Warranty';
import OrderTracking from './components/OrderTracking';
import { products } from './mockData';
import { Sparkles, Shield, Truck, RotateCcw, MessageSquareCode, ArrowLeft, ArrowRight, Tag, X, ShoppingCart, Bot } from 'lucide-react';
import AdminDashboard from './components/AdminDashboard';
import AboutUs from './components/AboutUs';
import AccountPortal from './components/AccountPortal';

function CategoryFeaturedRow({ categoryName, categoryProducts, onAddToCart, onBuyNow, likedProductIds, onToggleLike, onViewDetails }) {
  const rowRef = useRef(null);

  return (
    <div style={{ marginBottom: '40px', position: 'relative' }} className="reveal-on-scroll">
      <h3 style={{ fontSize: '16px', fontWeight: '800', fontFamily: 'Montserrat', color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>
        <span style={{ width: '4px', height: '16px', background: 'var(--color-primary)', borderRadius: '2px', display: 'inline-block' }} />
        {categoryName.toUpperCase()} NỔI BẬT & BÁN CHẠY
      </h3>

      <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        {/* Scroll Left Button */}
        <button 
          type="button"
          onClick={() => {
            if (rowRef.current) {
              rowRef.current.scrollBy({ left: -320, behavior: 'smooth' });
            }
          }}
          className="btn btn-ghost"
          style={{
            position: 'absolute',
            left: '-16px',
            zIndex: 10,
            background: 'rgba(21, 24, 25, 0.9)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0
          }}
        >
          <ArrowLeft size={18} color="white" />
        </button>

        {/* Horizontal scroll list */}
        <div 
          ref={rowRef}
          style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            padding: '8px 0 20px',
            width: '100%',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          className="no-scrollbar"
        >
          {categoryProducts.map((product) => (
            <div key={product.id} style={{ flex: '0 0 290px' }}>
              <ProductCard 
                product={product} 
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
                isLiked={likedProductIds.includes(product.id)}
                onToggleLike={onToggleLike}
                onViewDetails={onViewDetails}
              />
            </div>
          ))}
        </div>

        {/* Scroll Right Button */}
        <button 
          type="button"
          onClick={() => {
            if (rowRef.current) {
              rowRef.current.scrollBy({ left: 320, behavior: 'smooth' });
            }
          }}
          className="btn btn-ghost"
          style={{
            position: 'absolute',
            right: '-16px',
            zIndex: 10,
            background: 'rgba(21, 24, 25, 0.9)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0
          }}
        >
          <ArrowRight size={18} color="white" />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState('deals');
  const [cartOpen, setCartOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const relatedScrollRef = useRef(null);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null); // { message: '', visible: false }
  const [storeProducts, setStoreProducts] = useState(products);

  // Synchronized States
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 'FB-001',
      title: 'Ý kiến đóng góp về độ tương phản giao diện',
      content: 'Giao diện tối (Dark mode) của Kinetic Tech rất đẹp mắt và hiện đại. Tuy nhiên chữ màu xám trên nền xanh đậm ở một số mục thông tin chi tiết hơi mờ, mong shop điều chỉnh độ sáng hoặc tăng tương phản chữ lên một chút cho dễ đọc.',
      email: 'nguyenvana@gmail.com',
      fullName: 'Nguyễn Văn A',
      date: '03/06/2026 14:22',
      status: 'pending'
    },
    {
      id: 'FB-002',
      title: 'Đề xuất thêm danh mục linh kiện tản nước custom',
      content: 'Mình thấy Kinetic rất mạnh về các dòng máy tính Hi-End, mong shop nhập thêm các linh kiện tản nhiệt nước Custom như Block CPU, fitting, ống cứng của hãng Barrow hoặc Bykski để anh em lắp ráp tiện lợi hơn.',
      email: 'hoangviet@gmail.com',
      fullName: 'Hoàng Quốc Việt',
      date: '04/06/2026 09:15',
      status: 'processed'
    }
  ]);

  const [orders, setOrders] = useState([
    {
      id: 'ORD-9842',
      customerName: 'Nguyễn Văn A',
      email: 'nguyenvana@gmail.com',
      phone: '0912345678',
      date: '2026-06-03 10:15',
      total: 36990000,
      paymentMethod: 'Chuyển khoản VietQR',
      status: 'processing',
      items: [
        { id: 'lap-01', name: 'Laptop ASUS ROG Strix G16 (2024)', price: 36990000, quantity: 1 }
      ]
    },
    {
      id: 'ORD-4395',
      customerName: 'Nguyễn Văn A',
      email: 'nguyenvana@gmail.com',
      phone: '0912345678',
      date: '2026-06-02 18:30',
      total: 65900000,
      paymentMethod: 'Thẻ tín dụng',
      status: 'completed',
      items: [
        { id: 'phone-01', name: 'iPhone 15 Pro Max 256GB', price: 29890000, quantity: 2 },
        { id: 'gear-01', name: 'Bàn phím cơ ASUS ROG Azoth Wireless', price: 6190000, quantity: 1 }
      ]
    },
    {
      id: 'ORD-2104',
      customerName: 'Nguyễn Văn A',
      email: 'nguyenvana@gmail.com',
      phone: '0912345678',
      date: '2026-06-03 08:00',
      total: 10490000,
      paymentMethod: 'Thanh toán COD',
      status: 'pending',
      items: [
        { id: 'comp-02', name: 'CPU Intel Core i7-14700K', price: 10490000, quantity: 1 }
      ]
    },
    {
      id: 'ORD-8451',
      customerName: 'Trần Thị B',
      email: 'thib@gmail.com',
      phone: '0987654321',
      date: '2026-05-28 14:20',
      total: 9890000,
      paymentMethod: 'Chuyển khoản VietQR',
      status: 'cancelled',
      items: [
        { id: 'comp-01', name: 'CPU AMD Ryzen 7 7800X3D', price: 9890000, quantity: 1 }
      ]
    }
  ]);

  const [tradeins, setTradeins] = useState([
    {
      id: 'TI-8839',
      customerName: 'Nguyễn Văn A',
      email: 'nguyenvana@gmail.com',
      phone: '0912345678',
      oldDevice: 'Điện thoại: iPhone 13 Pro Max 128GB',
      conditionDesc: 'Tình trạng: Loại B (Mới - 95% -> 98%)',
      targetDevice: 'iPhone 15 Pro Max 256GB',
      dateCreated: '2026-06-03',
      selfValuation: 12500000,
      offeredPrice: 12000000,
      status: 'valued'
    },
    {
      id: 'TI-2940',
      customerName: 'Nguyễn Văn A',
      email: 'nguyenvana@gmail.com',
      phone: '0912345678',
      oldDevice: 'Laptop: MacBook Air M1 2020 8GB/256GB',
      conditionDesc: 'Tình trạng: Loại A (Likenew - 99%)',
      targetDevice: 'MacBook Pro 14 inch M3 (2024)',
      dateCreated: '2026-06-01',
      selfValuation: 9000000,
      offeredPrice: 10500000,
      status: 'completed'
    }
  ]);

  const [warranties, setWarranties] = useState([
    {
      id: 'WR-4720',
      customerName: 'Nguyễn Văn A',
      phone: '0912345678',
      productName: 'Card Màn Hình ASUS ROG Strix RTX 4080 Super OC 16GB',
      serialNumber: 'SN-4080S-ROG-897482',
      dateCreated: '2026-06-01',
      issue: 'Quạt tản nhiệt số 3 phát ra tiếng kêu to lạ thường và thỉnh thoảng ngừng quay.',
      status: 'checking'
    }
  ]);

  const [tickets, setTickets] = useState([
    {
      id: 'TK-5039',
      customerName: 'Nguyễn Văn A',
      subject: 'Máy tính bị sập nguồn khi chạy phần mềm dựng phim DaVinci Resolve',
      category: 'Lỗi Kỹ Thuật Phần Cứng',
      urgency: 'Gấp',
      status: 'pending',
      date: '2026-06-02',
      messages: [
        {
          sender: 'user',
          text: 'Mình vừa mua bộ máy PC build bên cửa hàng được 1 tháng. Dạo này cứ bật render video trong DaVinci Resolve hoặc chơi game Cyberpunk 2077 khoảng 15 phút là máy bị sập nguồn đột ngột, đèn trên mainboard báo đỏ LED CPU. Nhờ kỹ thuật hỗ trợ kiểm tra giúp.',
          time: '02/06/2026 14:00'
        }
      ]
    }
  ]);

  const [likedProductIds, setLikedProductIds] = useState(() => {
    try {
      const stored = localStorage.getItem('kinetic_liked_ids');
      return stored ? JSON.parse(stored) : ['lap-01', 'phone-01', 'gear-01'];
    } catch {
      return ['lap-01', 'phone-01', 'gear-01'];
    }
  });

  const handleToggleLike = (id) => {
    setLikedProductIds(prev => {
      const updated = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      try {
        localStorage.setItem('kinetic_liked_ids', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleUpdateProfile = (updatedUser) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('kinetic_user', JSON.stringify(updatedUser));
  };

  const showToast = (message) => {
    setToast({ message, visible: true });
  };

  // Auto clear toast
  useEffect(() => {
    if (toast && toast.visible) {
      const timer = setTimeout(() => {
        setToast(prev => prev ? { ...prev, visible: false } : null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  
  // Theme state
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('kinetic_theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    try {
      localStorage.setItem('kinetic_theme', theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // User session state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('kinetic_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('kinetic_user', JSON.stringify(userData));
    setActiveView('account');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('kinetic_user');
  };

  // Catalog search filter states
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(80000000);
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Reset filters on tab switch
  useEffect(() => {
    setSelectedBrands([]);
    setMinPrice(0);
    setMaxPrice(80000000);
    setOnlyInStock(false);
  }, [activeView]);

  // Keep the top of the page visible when switching views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  // Cart operations
  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Đã thêm thành công "${product.name}" vào giỏ hàng!`);
  };

  const handleBuyNow = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setActiveView('checkout');
  };

  const handleAddPartsToCart = (parts) => {
    setCartItems(prev => {
      let updated = [...prev];
      parts.forEach(part => {
        const exists = updated.find(item => item.id === part.id);
        if (exists) {
          updated = updated.map(item => item.id === part.id ? { ...item, quantity: item.quantity + 1 } : item);
        } else {
          updated.push({ ...part, quantity: 1 });
        }
      });
      return updated;
    });
    showToast(`Đã thêm thành công ${parts.length} linh kiện PC vào giỏ hàng!`);
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Switch view from carousel banner CTAs
  const handleCarouselCta = (slideIndex) => {
    if (slideIndex === 0) {
      setActiveView('laptop');
    } else if (slideIndex === 1) {
      setActiveView('pc-builder');
    } else {
      setActiveView('ai-advisor');
    }
  };

  // Scroll reveal Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });

    const targets = document.querySelectorAll('.reveal-on-scroll');
    targets.forEach(t => observer.observe(t));

    return () => {
      targets.forEach(t => observer.unobserve(t));
    };
  }, [activeView, searchQuery, selectedBrands, minPrice, maxPrice, onlyInStock]);

  // Filter products based on search query and sidebar filters
  const filteredProducts = storeProducts.filter(product => {
    // 1. Category check
    const matchesCategory = activeView === 'deals' ? true : product.category === activeView;
    
    // 2. Search check
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          Object.values(product.specs).some(val => val.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // 3. Brand check
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.some(brand => {
      return product.name.toLowerCase().includes(brand.toLowerCase()) || 
             product.tags.some(tag => tag.toLowerCase() === brand.toLowerCase()) ||
             (brand.toLowerCase() === 'asus' && product.name.toLowerCase().includes('rog'));
    });
    
    // 4. Price check
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    
    // 5. Stock check
    const matchesStock = !onlyInStock || product.inStock;
    
    return matchesCategory && matchesSearch && matchesBrand && matchesPrice && matchesStock;
  });

  const featuredDeals = storeProducts.filter(p => p.featured);

  // Available brands to show filters depending on category
  const getCategoryBrands = () => {
    if (activeView === 'laptop') return ['ASUS', 'Apple', 'Lenovo'];
    if (activeView === 'điện thoại') return ['Apple', 'Samsung', 'Xiaomi'];
    if (activeView === 'gaming gear') return ['ASUS', 'Logitech', 'Razer'];
    return ['ASUS', 'Apple', 'Samsung', 'Xiaomi', 'Lenovo', 'Logitech', 'Razer', 'AMD', 'Intel', 'MSI', 'Gigabyte', 'Corsair', 'Kingston'];
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        cartItemsCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
        toggleCart={() => setCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentUser={currentUser}
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Hero Carousel: Full Width - Rendered outside main container */}
      {activeView === 'deals' && (
        <HeroCarousel 
          onCtaClick={handleCarouselCta} 
          theme={theme} 
          products={storeProducts}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onViewDetails={setSelectedProduct}
          likedProductIds={likedProductIds}
          onToggleLike={handleToggleLike}
        />
      )}

      {/* Main layout container */}
      <main style={{ flex: 1, padding: '0 0 60px' }}>
        
        {/* VIEW 1: Showcase & Benefits */}
        {activeView === 'deals' && (
          <div className="container" style={{ marginTop: '40px' }}>
            {/* Showcase Grid header */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'Montserrat', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={22} color="var(--color-primary-dim)" />
                SẢN PHẨM NỔI BẬT
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
                Khám phá cấu hình phần cứng mới nhất được khuyên dùng bởi chuyên gia.
              </p>
            </div>

            {/* Category featured scrolling rows */}
            {(() => {
              const categories = [
                { id: 'laptop', name: 'Laptop' },
                { id: 'điện thoại', name: 'Điện Thoại' },
                { id: 'gaming gear', name: 'Gaming Gear' },
                { id: 'linh kiện', name: 'Linh Kiện & PC' }
              ];

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                  {categories.map((cat) => {
                    const catProducts = storeProducts.filter(p => p.category === cat.id);
                    const sortedProducts = [...catProducts].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                    
                    if (sortedProducts.length === 0) return null;

                    return (
                      <CategoryFeaturedRow 
                        key={cat.id}
                        categoryName={cat.name}
                        categoryProducts={sortedProducts}
                        onAddToCart={handleAddToCart}
                        onBuyNow={handleBuyNow}
                        likedProductIds={likedProductIds}
                        onToggleLike={handleToggleLike}
                        onViewDetails={setSelectedProduct}
                      />
                    );
                  })}
                </div>
              );
            })()}

            {/* Brand benefits section */}
            <div 
              className="reveal-on-scroll"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px',
                marginTop: '60px',
                padding: '30px 20px',
                borderRadius: 'var(--rounded-lg)',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Shield size={24} color="var(--color-primary-dim)" />
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'white' }}>100% Chính Hãng</h4>
                  <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>Sản phẩm nhập khẩu chính ngạch, hóa đơn đỏ đầy đủ.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Truck size={24} color="var(--color-secondary-dim)" />
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'white' }}>Giao Hàng Siêu Tốc</h4>
                  <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>Hỗ trợ giao nhanh hoả tốc 2h khu vực nội đô.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <RotateCcw size={24} color="var(--color-primary-dim)" />
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'white' }}>Đổi Trả Dễ Dàng</h4>
                  <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>Đổi trả 1-đổi-1 trong vòng 15 ngày nếu lỗi nhà sản xuất.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Standard Catalogs (Laptops, Phones, Gear, Components) */}
        {['laptop', 'điện thoại', 'gaming gear', 'linh kiện'].includes(activeView) && (
          <div className="container" style={{ paddingTop: '40px' }}>
            <div className="animate-fade-in-up">
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'Montserrat', textTransform: 'capitalize' }}>
                  DANH MỤC: {activeView}
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
                  Hiển thị {filteredProducts.length} sản phẩm phù hợp.
                </p>
              </div>

              {/* Desktop Two-Column Layout with filters */}
              <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px' }} className="catalog-layout">
                {/* Sidebar Filters */}
                <aside className="filter-sidebar glass-panel" style={{
                  borderRadius: 'var(--rounded-md)',
                  padding: '20px',
                  height: 'fit-content',
                  position: 'sticky',
                  top: '92px'
                }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '800', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px', marginBottom: '16px', color: 'white' }}>
                    BỘ LỌC TÌM KIẾM
                  </h3>
                  
                  {/* Filter Stock */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: 'white' }}>
                      <input 
                        type="checkbox" 
                        checked={onlyInStock}
                        onChange={(e) => setOnlyInStock(e.target.checked)}
                        style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                      />
                      <span style={{ userSelect: 'none' }}>Chỉ hàng còn kho</span>
                    </label>
                  </div>

                  {/* Filter Price */}
                  <div style={{ marginBottom: '25px' }}>
                    <h4 style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '12px', letterSpacing: '0.5px' }}>
                      Khoảng Giá (VND)
                    </h4>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                      <div>
                        <span style={{ fontSize: '9px', color: 'var(--color-outline)', display: 'block', marginBottom: '4px' }}>Giá tối thiểu</span>
                        <input 
                          type="text" 
                          value={new Intl.NumberFormat('vi-VN').format(minPrice)}
                          onChange={(e) => {
                            const cleanVal = e.target.value.replace(/\D/g, '');
                            const val = cleanVal ? parseInt(cleanVal) : 0;
                            if (val > maxPrice) {
                              showToast("Giá tối thiểu không thể lớn hơn giá tối đa!");
                            }
                            setMinPrice(val);
                          }}
                          className="form-input"
                          style={{ padding: '6px 8px', fontSize: '12px', fontWeight: '700', textAlign: 'center', background: 'var(--color-surface-container-lowest)', color: 'white', border: '1px solid var(--color-outline-variant)' }}
                        />
                      </div>
                      <div>
                        <span style={{ fontSize: '9px', color: 'var(--color-outline)', display: 'block', marginBottom: '4px' }}>Giá tối đa</span>
                        <input 
                          type="text" 
                          value={new Intl.NumberFormat('vi-VN').format(maxPrice)}
                          onChange={(e) => {
                            const cleanVal = e.target.value.replace(/\D/g, '');
                            const val = cleanVal ? parseInt(cleanVal) : 0;
                            if (val < minPrice) {
                              showToast("Giá tối đa không thể nhỏ hơn giá tối thiểu!");
                            }
                            setMaxPrice(val);
                          }}
                          className="form-input"
                          style={{ padding: '6px 8px', fontSize: '12px', fontWeight: '700', textAlign: 'center', background: 'var(--color-surface-container-lowest)', color: 'white', border: '1px solid var(--color-outline-variant)' }}
                        />
                      </div>
                    </div>

                    {minPrice > maxPrice && (
                      <div style={{ fontSize: '10px', color: 'var(--color-error)', display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                        * Giá tối thiểu lớn hơn giá tối đa!
                      </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <input 
                        type="range" 
                        min="0" 
                        max="80000000" 
                        step="1000000"
                        value={maxPrice}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (val < minPrice) {
                            showToast("Giá tối đa không thể nhỏ hơn giá tối thiểu!");
                          }
                          setMaxPrice(val);
                        }}
                        style={{ width: '100%', accentColor: 'var(--color-primary)', cursor: 'pointer', height: '6px', borderRadius: '4px' }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--color-outline)' }}>
                        <span>0đ</span>
                        <span>80 Triệu</span>
                      </div>
                    </div>
                  </div>

                  {/* Filter Brand */}
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '10px', letterSpacing: '0.5px' }}>
                      Thương Hiệu
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', maxHeight: '180px', overflowY: 'auto' }}>
                      {getCategoryBrands().map((brand) => {
                        const isChecked = selectedBrands.includes(brand);
                        return (
                          <label key={brand} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <input 
                              type="checkbox" 
                              checked={isChecked}
                              onChange={() => {
                                if (isChecked) {
                                  setSelectedBrands(prev => prev.filter(b => b !== brand));
                                } else {
                                  setSelectedBrands(prev => [...prev, brand]);
                                }
                              }}
                              style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                            />
                            <span style={{ color: isChecked ? 'white' : 'var(--color-on-surface-variant)', userSelect: 'none' }}>
                              {brand}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Reset Filters button */}
                  <button 
                    onClick={() => {
                      setSelectedBrands([]);
                      setMinPrice(0);
                      setMaxPrice(80000000);
                      setOnlyInStock(false);
                    }}
                    className="btn btn-outline"
                    style={{ width: '100%', padding: '8px', fontSize: '12px' }}
                  >
                    Xóa bộ lọc
                  </button>
                </aside>

                {/* Product Grid Area */}
                <div>
                  {filteredProducts.length === 0 ? (
                    <div style={{
                      textAlign: 'center',
                      padding: '60px 20px',
                      color: 'var(--color-outline)',
                      background: 'rgba(255,255,255,0.01)',
                      border: '1px dashed rgba(255,255,255,0.08)',
                      borderRadius: 'var(--rounded-md)'
                    }}>
                      <MessageSquareCode size={40} style={{ marginBottom: '12px', color: 'var(--color-outline)' }} />
                      <p>Không tìm thấy sản phẩm nào phù hợp với bộ lọc hiện tại.</p>
                    </div>
                  ) : (
                    <div 
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '24px'
                      }}
                    >
                      {filteredProducts.map((product) => (
                        <ProductCard 
                          key={product.id} 
                          product={product} 
                          onAddToCart={handleAddToCart}
                          onBuyNow={handleBuyNow}
                          isLiked={likedProductIds.includes(product.id)}
                          onToggleLike={handleToggleLike}
                          onViewDetails={setSelectedProduct}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: Custom PC Builder Dashboard */}
        {activeView === 'pc-builder' && (
          <div className="container" style={{ paddingTop: '40px' }}>
            <div className="animate-fade-in-up">
              <PCBuilder onAddPartsToCart={handleAddPartsToCart} />
            </div>
          </div>
        )}

        {/* VIEW 4: AI Advisor Chat */}
        {activeView === 'ai-advisor' && (
          <div className="container" style={{ paddingTop: '40px' }}>
            <div className="animate-fade-in-up">
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'Montserrat' }}>TRỢ LÝ THÔNG MINH KINETIC</h2>
                <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>AI tự động cấu hình máy tính cá nhân hóa dựa trên mô tả yêu cầu của bạn.</p>
              </div>
              <AIAdvisor onAddToCart={handleAddToCart} theme={theme} />
            </div>
          </div>
        )}

        {/* VIEW: Admin Dashboard */}
        {activeView === 'admin' && (
          <AdminDashboard 
            storeProducts={storeProducts} 
            setStoreProducts={setStoreProducts} 
            theme={theme} 
            orders={orders}
            setOrders={setOrders}
            tickets={tickets}
            setTickets={setTickets}
            warranties={warranties}
            setWarranties={setWarranties}
            tradeins={tradeins}
            setTradeins={setTradeins}
            feedbacks={feedbacks}
            setFeedbacks={setFeedbacks}
          />
        )}

        {/* VIEW 5: Auth View (Login / Register) */}
        {['login', 'register'].includes(activeView) && (
          <Auth 
            onLoginSuccess={handleLoginSuccess}
            initialTab={activeView === 'login' ? 'login' : 'register'}
            onBackToHome={() => setActiveView('deals')}
          />
        )}

        {/* VIEW 6: Checkout View */}
        {activeView === 'checkout' && (
          <Checkout 
            cartItems={cartItems}
            onClearCart={handleClearCart}
            setActiveView={setActiveView}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            currentUser={currentUser}
            onAddOrder={(o) => setOrders(prev => [o, ...prev])}
          />
        )}

        {/* VIEW 7: Trade-In Program View */}
        {activeView === 'trade-in' && (
          <div className="container" style={{ paddingTop: '40px' }}>
            <TradeIn 
              currentUser={currentUser}
              onAddTradeIn={(t) => setTradeins(prev => [t, ...prev])}
            />
          </div>
        )}

        {/* VIEW 8: Warranty Lookup View */}
        {activeView === 'warranty' && (
          <div className="container" style={{ paddingTop: '40px' }}>
            <Warranty />
          </div>
        )}

        {/* VIEW: Order Tracking View */}
        {activeView === 'order-tracking' && (
          <div className="container" style={{ paddingTop: '40px' }}>
            <OrderTracking orders={orders} />
          </div>
        )}

        {/* VIEW 9: Support Ticket View */}
        {activeView === 'support-ticket' && (
          <div className="container" style={{ paddingTop: '40px' }}>
            <SupportTicket />
          </div>
        )}

        {/* VIEW: Account Portal */}
        {activeView === 'account' && (
          <AccountPortal 
            currentUser={currentUser}
            setActiveView={setActiveView}
            theme={theme}
            likedProductIds={likedProductIds}
            onToggleLike={handleToggleLike}
            products={storeProducts}
            orders={orders}
            onAddOrder={(o) => setOrders(prev => [o, ...prev])}
            tradeins={tradeins}
            onAddTradeIn={(t) => setTradeins(prev => [t, ...prev])}
            feedbacks={feedbacks}
            onAddFeedback={(f) => setFeedbacks(prev => [f, ...prev])}
            onUpdateProfile={handleUpdateProfile}
            onAddSupportTicket={(tk) => setTickets(prev => [tk, ...prev])}
          />
        )}

        {/* VIEW 10: About Us View */}
        {activeView === 'about-us' && (
          <div className="container" style={{ paddingTop: '40px' }}>
            <AboutUs theme={theme} setActiveView={setActiveView} />
          </div>
        )}

      </main>

      {/* Footer System */}
      <footer style={{
        background: 'var(--color-surface-container-lowest)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '40px 0',
        marginTop: 'auto'
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          fontSize: '13px',
          color: 'var(--color-on-surface-variant)'
        }}>
          <div>
            <h4 style={{ color: 'white', fontWeight: '700', fontSize: '14px', marginBottom: '16px' }}>KINETIC TECH</h4>
            <p style={{ lineHeight: '1.6' }}>Hệ thống cửa hàng bán lẻ linh kiện máy tính, laptop hi-end hàng đầu Việt Nam.</p>
          </div>
          <div>
            <h4 style={{ color: 'white', fontWeight: '700', fontSize: '14px', marginBottom: '16px' }}>HỖ TRỢ KHÁCH HÀNG</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer' }}>
              <li>Hướng dẫn mua hàng online</li>
              <li>Chính sách bảo hành đổi trả</li>
              <li>Phương thức thanh toán</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'white', fontWeight: '700', fontSize: '14px', marginBottom: '16px' }}>LIÊN HỆ</h4>
            <p style={{ lineHeight: '1.6' }}>
              Email: hotro@kinetictech.vn<br />
              Hotline: 1900 1234 (8:00 - 21:00)<br />
              Địa chỉ: Cầu Giấy, Hà Nội
            </p>
          </div>
          <div>
            <h4 style={{ color: 'white', fontWeight: '700', fontSize: '14px', marginBottom: '16px' }}>THÔNG TIN PHÁP LÝ</h4>
            <p style={{ lineHeight: '1.6' }}>
              <strong>Kinetic Tech Store</strong><br />
              GPĐKKD số: 0101234567 do Sở KH&ĐT Hà Nội cấp ngày 01/01/2026.<br />
              Mã số thuế: 0101234567<br />
              Đại diện doanh nghiệp: Nguyễn Văn A
            </p>
          </div>
        </div>
        <div className="container" style={{
          marginTop: '30px',
          borderTop: '1px solid rgba(255, 255, 255, 0.04)',
          paddingTop: '20px',
          textAlign: 'center',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.3)'
        }}>
          © 2026 Kinetic Tech Store. All Rights Reserved. Built with Premium React & Vanilla CSS.
        </div>
      </footer>

      {/* Shopping Cart Slider */}
      <Cart 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onCheckout={() => setActiveView('checkout')}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Floating Toast Notification */}
      {toast && toast.visible && (
        <div 
          className="glass-panel-glow-blue"
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            padding: '14px 20px',
            borderRadius: 'var(--rounded-md)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            maxWidth: '380px',
            border: '1px solid rgba(0, 123, 255, 0.4)',
            boxShadow: theme === 'light' ? '0 10px 25px rgba(0,0,0,0.06)' : '0 10px 25px rgba(0,0,0,0.5)',
            animation: 'slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
        >
          <div style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'rgba(76, 175, 80, 0.15)',
            border: '1px solid #81c784',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#81c784',
            fontSize: '11px',
            fontWeight: 'bold',
            flexShrink: 0
          }}>
            ✓
          </div>
          <div style={{ fontSize: '13px', color: theme === 'light' ? 'var(--color-on-surface)' : 'white', fontWeight: '600', lineHeight: '1.4' }}>
            {toast.message}
          </div>
        </div>
      )}

      {/* Floating AssistiveTouch Cart Button */}
      <button 
        onClick={() => setCartOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(30, 41, 59, 0.75)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 123, 255, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          cursor: 'pointer',
          zIndex: 99,
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
        className="floating-cart-btn-assistive"
        title="Giỏ hàng của bạn"
      >
        <ShoppingCart size={24} color="var(--color-primary-dim)" style={{ filter: 'drop-shadow(0 0 4px rgba(0, 123, 255, 0.5))' }} />
        {cartItems.reduce((acc, curr) => acc + curr.quantity, 0) > 0 && (
          <span 
            className="cart-pulse-badge"
            style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              background: '#ef4444',
              color: 'white',
              fontSize: '10px',
              fontWeight: 'bold',
              borderRadius: '10px',
              padding: '2px 6px',
              minWidth: '18px',
              textAlign: 'center',
              boxShadow: '0 0 0 2px var(--color-surface)',
              animation: 'pulseGlow 2s infinite'
            }}
          >
            {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
          </span>
        )}
      </button>

      {/* Floating AI Chat Bubble */}
      <button 
        onClick={() => setAiOpen(!aiOpen)}
        style={{
          position: 'fixed',
          bottom: '96px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: aiOpen ? 'var(--color-primary)' : 'rgba(30, 41, 59, 0.75)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 123, 255, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          cursor: 'pointer',
          zIndex: 99,
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        className="floating-ai-btn-assistive"
        title="Trò chuyện với Cố Vấn AI"
      >
        <Bot size={24} color={aiOpen ? '#ffffff' : 'var(--color-primary-dim)'} style={{ filter: 'drop-shadow(0 0 4px rgba(0, 123, 255, 0.5))' }} />
      </button>

      {/* Floating AI Chat Window Popup/Drawer */}
      {aiOpen && (
        <div 
          className="glass-panel animate-fade-in-up" 
          style={{
            position: 'fixed',
            bottom: '168px',
            right: '24px',
            width: '380px',
            height: '500px',
            borderRadius: 'var(--rounded-lg)',
            overflow: 'hidden',
            zIndex: 100,
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            border: '1px solid rgba(0, 123, 255, 0.25)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <AIAdvisor onAddToCart={handleAddToCart} theme={theme} onClose={() => setAiOpen(false)} />
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (() => {
        let description = '';
        if (selectedProduct.category === 'laptop') {
          description = `Laptop ${selectedProduct.name} sở hữu hiệu năng mạnh mẽ đột phá với CPU và GPU thế hệ mới nhất, mang lại trải nghiệm mượt mà cho cả tác vụ gaming đồ họa nặng lẫn công việc thiết kế chuyên nghiệp. Màn hình tần số quét cao giúp giảm thiểu tối đa hiện tượng xé hình, mang lại hình ảnh sắc nét đến từng chi tiết.`;
        } else if (selectedProduct.category === 'điện thoại') {
          description = `Điện thoại ${selectedProduct.name} mang ngôn ngữ thiết kế sang trọng, thời thượng. Được trang bị hệ thống camera siêu sắc nét cùng bộ xử lý tối tân và dung lượng pin bền bỉ, chiếc điện thoại này sẵn sàng đáp ứng mọi nhu cầu giải trí và làm việc cường độ cao trong ngày.`;
        } else if (selectedProduct.category === 'gaming gear') {
          description = `Sản phẩm gaming gear ${selectedProduct.name} cao cấp mang đến trải nghiệm điều khiển chính xác tuyệt đối và cảm giác bấm/nghe vượt trội. Đây là lựa chọn hoàn hảo của các tuyển thủ eSports chuyên nghiệp để nâng tầm khả năng thi đấu.`;
        } else {
          description = `Linh kiện máy tính ${selectedProduct.name} chính hãng đạt tiêu chuẩn chất lượng cao, cung cấp hiệu năng vượt trội và độ bền bỉ đáng tin cậy. Đóng vai trò then chốt giúp tối ưu hóa sức mạnh phần cứng cho hệ thống PC của bạn.`;
        }

        const promoCodes = [
          { code: 'KINETIC5', desc: 'Giảm 5% cho đơn hàng' },
          { code: 'FREESHIP', desc: 'Miễn phí vận chuyển' },
          { code: 'HELLO', desc: 'Giảm 500K khách mới' }
        ];

        const formatVND = (value) => {
          return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        };

        const discount = selectedProduct.oldPrice ? Math.round(((selectedProduct.oldPrice - selectedProduct.price) / selectedProduct.oldPrice) * 100) : 0;

        const related = storeProducts.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id);

        return (
          <div 
            className="modal-overlay" 
            style={{ zIndex: 102, display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
            onClick={() => setSelectedProduct(null)}
          >
            <div 
              className="glass-panel animate-fade-in-up" 
              onClick={(e) => e.stopPropagation()} 
              style={{ 
                width: '90%', 
                maxWidth: '850px', 
                borderRadius: 'var(--rounded-lg)', 
                overflow: 'hidden',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Modal Header */}
              <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Chi tiết sản phẩm</h3>
                <button 
                  onClick={() => setSelectedProduct(null)} 
                  className="btn btn-ghost" 
                  style={{ padding: '6px', borderRadius: '50%', minWidth: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={20} color="white" />
                </button>
              </div>

              {/* Modal Body */}
              <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) 1.2fr', gap: '28px' }} className="catalog-layout">
                  {/* Left: Product Image */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ background: 'var(--color-surface-container-lowest)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--rounded-md)', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '280px' }}>
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.name} 
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=400';
                        }}
                      />
                    </div>
                    
                    {/* Specs block */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: 'var(--rounded-md)', border: '1px solid rgba(255,255,255,0.04)' }}>
                      <h4 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-primary-dim)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.5px' }}>
                        Thông Số Kỹ Thuật
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {Object.entries(selectedProduct.specs).map(([key, val]) => (
                          <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                            <span style={{ fontWeight: '600', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{key}:</span>
                            <span style={{ color: 'white', textAlign: 'right', fontWeight: '500' }}>{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Info & CTA */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <span className={`status-badge ${selectedProduct.inStock ? 'status-badge-stock' : ''}`} style={{ background: selectedProduct.inStock ? '' : '#373a3b', color: selectedProduct.inStock ? '' : '#c1c6d7', marginBottom: '8px' }}>
                        {selectedProduct.inStock ? 'Còn hàng' : 'Hết hàng'}
                      </span>
                      <h2 style={{ fontSize: '20px', fontWeight: '800', lineHeight: '1.4', color: 'white', marginBottom: '6px' }}>
                        {selectedProduct.name}
                      </h2>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
                        <span style={{ color: '#ffb77d', fontWeight: 'bold' }}>★ {selectedProduct.rating}</span>
                        <span>({selectedProduct.reviews} đánh giá)</span>
                        <span>|</span>
                        <span>Mã SP: {selectedProduct.id.toUpperCase()}</span>
                      </div>
                    </div>

                    {/* Price Block */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px 18px', borderRadius: 'var(--rounded-md)', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                      <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-secondary-dim)' }}>
                        {formatVND(selectedProduct.price)}
                      </span>
                      {selectedProduct.oldPrice && (
                        <>
                          <span style={{ fontSize: '14px', textDecoration: 'line-through', color: 'var(--color-outline)' }}>
                            {formatVND(selectedProduct.oldPrice)}
                          </span>
                          <span className="status-badge status-badge-sale" style={{ fontSize: '10px', padding: '1px 6px' }}>
                            -{discount}%
                          </span>
                        </>
                      )}
                    </div>

                    {/* Vouchers and Promo Description Section */}
                    <div>
                      <h4 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-secondary-dim)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>
                        Khuyến Mãi & Voucher Áp Dụng
                      </h4>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                        {promoCodes.map((p) => (
                          <div 
                            key={p.code} 
                            onClick={() => {
                              navigator.clipboard.writeText(p.code);
                              showToast(`Đã sao chép mã khuyến mãi: ${p.code}`);
                            }}
                            className="glass-panel"
                            style={{ 
                              padding: '6px 12px', 
                              borderRadius: 'var(--rounded-sm)', 
                              fontSize: '11px', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'space-between', 
                              gap: '8px', 
                              cursor: 'pointer',
                              border: '1px dashed rgba(253, 139, 0, 0.4)',
                              transition: 'all 0.2s',
                              userSelect: 'none'
                            }}
                            title="Click để sao chép"
                          >
                            <span style={{ color: 'var(--color-secondary-dim)', fontWeight: 'bold' }}>{p.code}</span>
                            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px' }}>({p.desc})</span>
                          </div>
                        ))}
                      </div>

                      <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', lineHeight: '1.6' }}>
                        {description}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: 'auto', paddingTop: '10px' }}>
                      <button 
                        onClick={() => {
                          handleAddToCart(selectedProduct);
                        }}
                        disabled={!selectedProduct.inStock}
                        className="btn btn-outline"
                        style={{ padding: '12px', fontSize: '13px', fontWeight: '700' }}
                      >
                        <ShoppingCart size={16} />
                        Thêm Vào Giỏ Hàng
                      </button>
                      <button 
                        onClick={() => {
                          handleBuyNow(selectedProduct);
                          setSelectedProduct(null);
                        }}
                        disabled={!selectedProduct.inStock}
                        className="btn btn-secondary"
                        style={{ padding: '12px', fontSize: '13px', fontWeight: '700' }}
                      >
                        Mua Ngay
                      </button>
                    </div>
                  </div>
                </div>

                {/* Related Products horizontal scroll carousel */}
                {related.length > 0 && (
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px', position: 'relative' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'white', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.5px' }}>
                      Sản phẩm nổi bật cùng loại
                    </h4>
                    
                    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                      {/* Slide Left button */}
                      <button 
                        onClick={() => {
                          if (relatedScrollRef.current) {
                            relatedScrollRef.current.scrollBy({ left: -220, behavior: 'smooth' });
                          }
                        }}
                        className="btn btn-ghost"
                        style={{
                          position: 'absolute',
                          left: '-16px',
                          zIndex: 10,
                          background: 'rgba(21, 24, 25, 0.9)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 0
                        }}
                      >
                        <ArrowLeft size={16} color="white" />
                      </button>

                      {/* Slider Scroll container */}
                      <div 
                        ref={relatedScrollRef}
                        style={{
                          display: 'flex',
                          gap: '16px',
                          overflowX: 'auto',
                          scrollBehavior: 'smooth',
                          padding: '4px 0 16px',
                          width: '100%',
                          scrollbarWidth: 'none',
                          msOverflowStyle: 'none'
                        }}
                        className="no-scrollbar"
                      >
                        {related.map((prod) => (
                          <div 
                            key={prod.id}
                            onClick={() => setSelectedProduct(prod)}
                            style={{
                              flex: '0 0 200px',
                              background: 'var(--color-surface-container-low)',
                              border: '1px solid rgba(255,255,255,0.06)',
                              borderRadius: 'var(--rounded)',
                              padding: '12px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '8px',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            className="list-hover-effect"
                          >
                            <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'var(--color-surface-container-lowest)', borderRadius: '4px' }}>
                              <img src={prod.image} alt={prod.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                            </div>
                            <h5 style={{ fontSize: '11px', fontWeight: '600', color: 'white', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '32px', lineHeight: '1.4' }}>
                              {prod.name}
                            </h5>
                            <strong style={{ fontSize: '12px', color: 'var(--color-secondary-dim)' }}>
                              {formatVND(prod.price)}
                            </strong>
                          </div>
                        ))}
                      </div>

                      {/* Slide Right button */}
                      <button 
                        onClick={() => {
                          if (relatedScrollRef.current) {
                            relatedScrollRef.current.scrollBy({ left: 220, behavior: 'smooth' });
                          }
                        }}
                        className="btn btn-ghost"
                        style={{
                          position: 'absolute',
                          right: '-16px',
                          zIndex: 10,
                          background: 'rgba(21, 24, 25, 0.9)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 0
                        }}
                      >
                        <ArrowRight size={16} color="white" />
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        );
      })()}

      {/* Embedded CSS rules for media queries responsive layout inside JS */}
      <style>{`
        @media (max-width: 899px) {
          .catalog-layout {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .filter-sidebar {
            position: static !important;
            width: 100% !important;
          }
        }
        @keyframes slideIn {
          from {
            transform: translateY(-40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes pulseGlow {
          0% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          70% {
            box-shadow: 0 0 0 6px rgba(239, 68, 68, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
        }
        .floating-cart-btn-assistive:hover {
          transform: scale(1.1) rotate(6deg);
          border-color: var(--color-primary) !important;
          background: rgba(30, 41, 59, 0.9) !important;
        }
        .floating-cart-btn-assistive:active {
          transform: scale(0.9);
        }
        .floating-ai-btn-assistive:hover {
          transform: scale(1.1) rotate(-6deg);
          border-color: var(--color-primary) !important;
          background: rgba(30, 41, 59, 0.9) !important;
        }
        .floating-ai-btn-assistive:active {
          transform: scale(0.9);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .list-hover-effect:hover {
          border-color: var(--color-primary) !important;
          box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}

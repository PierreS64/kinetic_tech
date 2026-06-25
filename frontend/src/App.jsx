import React, { useState, useEffect, useRef } from 'react';
import './styles/base/category-slider.css';
import './styles/base/footer.css';
import './styles/base/button.css';
import './styles/base/badge.css';
import './styles/base/form.css';
import './styles/base/table.css';
import Navbar from './layouts/Navbar/Navbar';
import HeroCarousel from './pages/Home/HeroCarousel';
import ProductCard from './components/Common/ProductCard';
import PCBuilder from './components/PCBuilder/PCBuilder';
import AIAdvisor from './components/Common/AIAdvisor';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/CheckoutPage';
import Auth from './pages/Auth/Auth';
import TradeIn from './pages/TradeIn/TradeIn';
import SupportTicket from './pages/Support/SupportTicket';
import Warranty from './pages/Support/Warranty';
import OrderTracking from './pages/Support/OrderTracking';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import { products } from './utils/mockData.js';
import { getFilteredProducts } from './utils/filterProducts';
import FilterSidebar from './layouts/FilterSidebar/FilterSidebar';
import { Sparkles, Shield, Truck, RotateCcw, MessageSquareCode, ArrowLeft, ArrowRight, Tag, X, ShoppingCart, Bot } from 'lucide-react';
import AdminDashboard from './components/Admin/AdminDashboard';
import AboutUs from './pages/AboutUs/AboutUs';
import AccountPortal from './components/Account/AccountPortal';
import CategoryFeaturedRow from './components/Common/CategoryFeaturedRow';
export default function App() {
  const [activeView, setActiveView] = useState('deals');
  const [cartOpen, setCartOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const relatedScrollRef = useRef(null);
  const [showRelatedLeftArrow, setShowRelatedLeftArrow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState(null);
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

  // Related products scroll arrow visibility logic
  const handleRelatedScroll = () => {
    if (relatedScrollRef.current) {
      setShowRelatedLeftArrow(relatedScrollRef.current.scrollLeft > 5);
    }
  };

  useEffect(() => {
    const el = relatedScrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleRelatedScroll);
      handleRelatedScroll();
      return () => {
        el.removeEventListener('scroll', handleRelatedScroll);
      };
    }
  }, [selectedProduct]);
  
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


  // Parse OAuth data from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userDataStr = urlParams.get('userData');

    if (token && userDataStr) {
      try {
        const userData = JSON.parse(decodeURIComponent(userDataStr));
        localStorage.setItem('kinetic_token', token);
        localStorage.setItem('kinetic_user', JSON.stringify(userData));
        setCurrentUser(userData);
        window.history.replaceState({}, document.title, window.location.pathname);
        showToast('Đăng nhập thành công!');
        setActiveView('account');
      } catch (err) {
        console.error('Failed to parse OAuth data', err);
      }
    }
  }, []);

  const handleLoginSuccess = (userData, token) => {
    setCurrentUser(userData);
    localStorage.setItem('kinetic_user', JSON.stringify(userData));
    if (token) {
      localStorage.setItem('kinetic_token', token);
    }
    setActiveView('account');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('kinetic_user');
    localStorage.removeItem('kinetic_token');
  };

  // Catalog search filter states
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(80000000);
  const [onlyInStock, setOnlyInStock] = useState(false);

  const [laptopFilters, setLaptopFilters] = useState({
    usage: '',
    cpu: '',
    ram: '',
    storage: '',
    gpu: '',
    screenSize: '',
    screenHz: ''
  });
  const [phoneFilters, setPhoneFilters] = useState({
    os: '',
    rom: '',
    ram: '',
    screenSize: '',
    features: [],
    battery: ''
  });
  const [gearFilters, setGearFilters] = useState({
    type: '',
    connection: '',
    led: '',
    keyboardSwitch: '',
    keyboardLayout: '',
    mouseWeight: '',
    mouseDpi: ''
  });
  const [componentFilters, setComponentFilters] = useState({
    type: '',
    socket: '',
    chipset: '',
    ramStandard: '',
    ramBus: '',
    vgaBrand: '',
    vgaVram: '',
    psuPower: '',
    psuEfficiency: ''
  });

  // Reset filters on tab switch
  useEffect(() => {
    setSelectedBrands([]);
    setMinPrice(0);
    setMaxPrice(80000000);
    setOnlyInStock(false);
    setLaptopFilters({
      usage: '',
      cpu: '',
      ram: '',
      storage: '',
      gpu: '',
      screenSize: '',
      screenHz: ''
    });
    setPhoneFilters({
      os: '',
      rom: '',
      ram: '',
      screenSize: '',
      features: [],
      battery: ''
    });
    setGearFilters({
      type: '',
      connection: '',
      led: '',
      keyboardSwitch: '',
      keyboardLayout: '',
      mouseWeight: '',
      mouseDpi: ''
    });
    setComponentFilters({
      type: '',
      socket: '',
      chipset: '',
      ramStandard: '',
      ramBus: '',
      vgaBrand: '',
      vgaVram: '',
      psuPower: '',
      psuEfficiency: ''
    });
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
  const filteredProducts = getFilteredProducts(
    storeProducts, activeView, searchQuery, selectedBrands, minPrice, maxPrice, onlyInStock, laptopFilters, phoneFilters, gearFilters, componentFilters
  );
  const featuredDeals = storeProducts.filter(p => p.featured);

  // Available brands to show filters depending on category
  const getCategoryBrands = () => {
    if (activeView === 'laptop') return ['ASUS', 'Apple', 'Lenovo'];
    if (activeView === 'điện thoại') return ['Apple', 'Samsung', 'Xiaomi'];
    if (activeView === 'gaming gear') return ['ASUS', 'Logitech', 'Razer'];
    if (activeView === 'linh kiện') return ['Intel', 'AMD', 'ASUS', 'MSI', 'Gigabyte', 'Corsair', 'Samsung', 'Lian Li'];
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
                        theme={theme}
                      />
                    );
                  })}
                </div>
              );
            })()}

            {/* Brand benefits section */}
            <div 
              className="reveal-on-scroll brand-benefits-section"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px',
                marginTop: '60px',
                padding: '30px 20px',
                borderRadius: 'var(--rounded-lg)',
              }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Shield size={24} color="var(--color-primary-dim)" />
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '700' }}>100% Chính Hãng</h4>
                  <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>Sản phẩm nhập khẩu chính ngạch, hóa đơn đỏ đầy đủ.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Truck size={24} color="var(--color-secondary-dim)" />
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '700' }}>Giao Hàng Siêu Tốc</h4>
                  <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>Hỗ trợ giao nhanh hoả tốc 2h khu vực nội đô.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <RotateCcw size={24} color="var(--color-primary-dim)" />
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '700' }}>Đổi Trả Dễ Dàng</h4>
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
                <FilterSidebar 
                  theme={theme}
                  activeView={activeView}
                  onlyInStock={onlyInStock} setOnlyInStock={setOnlyInStock}
                  minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice}
                  selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands}
                  getCategoryBrands={getCategoryBrands}
                  laptopFilters={laptopFilters} setLaptopFilters={setLaptopFilters}
                  phoneFilters={phoneFilters} setPhoneFilters={setPhoneFilters}
                  gearFilters={gearFilters} setGearFilters={setGearFilters}
                  componentFilters={componentFilters} setComponentFilters={setComponentFilters}
                />

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
                    <div className="product-grid">
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
            <SupportTicket theme={theme} />
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
          background: theme === 'light' 
            ? 'rgba(255, 255, 255, 0.85)' 
            : 'rgba(30, 41, 59, 0.75)',
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
          background: aiOpen 
           ? 'var(--color-primary)' 
           : (theme === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(30, 41, 59, 0.75)'),  backdropFilter: 'blur(12px)',
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
                border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Modal Header */}
              <div style={{ padding: '16px 24px', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Chi tiết sản phẩm</h3>
                <button 
                  onClick={() => setSelectedProduct(null)} 
                  className="btn btn-ghost" 
                  style={{ padding: '6px', borderRadius: '50%', minWidth: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={20} color={theme === 'light' ? '#334155' : 'white'} />
                </button>
              </div>

              {/* Modal Body */}
              <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) 1.2fr', gap: '28px' }} className="catalog-layout">
                  {/* Left: Product Image */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ background: theme === 'light' ? '#f1f5f9' : 'var(--color-surface-container-lowest)', border: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--rounded-md)', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '280px' }}>
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
                    <div style={{ background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: 'var(--rounded-md)', border: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.04)' }}>
                      <h4 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-primary-dim)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.5px' }}>
                        Thông Số Kỹ Thuật
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {Object.entries(selectedProduct.specs).map(([key, val]) => (
                          <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                            <span style={{ fontWeight: '600', textTransform: 'uppercase', color: theme === 'light' ? '#94a3b8' : 'rgba(255,255,255,0.4)' }}>{key}:</span>
                            <span style={{ color: theme === 'light' ? '#0f172a' : 'white', textAlign: 'right', fontWeight: '500' }}>{val}</span>
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
                      <h2 style={{ fontSize: '20px', fontWeight: '800', lineHeight: '1.4', color: theme === 'light' ? '#0f172a' : 'white', marginBottom: '6px' }}>
                        {selectedProduct.name}
                      </h2>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
                        <span style={{ color: '#ffb77d', fontWeight: 'bold' }}>★ {selectedProduct.rating}</span>
                        <span style={{ color: theme === 'light' ? '#475569' : 'var(--color-on-surface-variant)' }}>({selectedProduct.reviews} đánh giá)</span>
                        <span style={{ color: theme === 'light' ? '#94a3b8' : 'inherit' }}>|</span>
                        <span style={{ color: theme === 'light' ? '#475569' : 'inherit' }}>Mã SP: {selectedProduct.id.toUpperCase()}</span>
                      </div>
                    </div>

                    {/* Price Block */}
                    <div style={{ background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)', padding: '14px 18px', borderRadius: 'var(--rounded-md)', border: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'baseline', gap: '12px' }}>
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
                            <span style={{ color: theme === 'light' ? '#64748b' : 'rgba(255,255,255,0.5)', fontSize: '10px' }}>({p.desc})</span>
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
                      <button 
                        onClick={() => {
                          setSelectedDetailProduct(selectedProduct);
                          setSelectedProduct(null);
                          setActiveView('product_detail');
                        }}
                        className="btn btn-ghost"
                        style={{ gridColumn: 'span 2', padding: '10px', fontSize: '13px', color: 'var(--color-primary-dim)', textDecoration: 'underline' }}
                      >
                        Xem chi tiết -&gt;
                      </button>
                    </div>
                  </div>
                </div>

                {/* Related Products horizontal scroll carousel */}
                {related.length > 0 && (
                  <div style={{ borderTop: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.06)', paddingTop: '20px', position: 'relative' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: '800', color: theme === 'light' ? '#0f172a' : 'white', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.5px' }}>
                      Sản phẩm nổi bật cùng loại
                    </h4>
                    
                    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                      {/* Slide Left button */}
                      {showRelatedLeftArrow && (
                        <button 
                          onClick={() => {
                            if (relatedScrollRef.current) {
                              const itemWidth = relatedScrollRef.current.children[0]?.offsetWidth || 0;
                              relatedScrollRef.current.scrollBy({ left: -(itemWidth + 16), behavior: 'smooth' });
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
                      )}

                      {/* Slider Scroll container */}
                      <div 
                        ref={relatedScrollRef}
                        style={{
                          display: 'flex',
                          gap: '16px',
                          overflowX: 'auto',
                          scrollBehavior: 'smooth',
                          scrollSnapType: 'x mandatory',
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
                              flex: '0 0 calc(25% - 12px)',
                              minWidth: 'calc(25% - 12px)',
                              maxWidth: 'calc(25% - 12px)',
                              scrollSnapAlign: 'start',
                              background: 'var(--color-surface-container-low)',
                              border: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.06)',
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
                            <h5 style={{ fontSize: '11px', fontWeight: '600', color: theme === 'light' ? '#0f172a' : 'white', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '32px', lineHeight: '1.4' }}>
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
                            const itemWidth = relatedScrollRef.current.children[0]?.offsetWidth || 0;
                            relatedScrollRef.current.scrollBy({ left: itemWidth + 16, behavior: 'smooth' });
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
      {activeView === 'product_detail' && (
        <ProductDetail 
          product={selectedDetailProduct}
          onBack={() => setActiveView('deals')}
          onAddToCart={(p) => handleAddToCart(p)}
          onBuyNow={handleBuyNow}
          theme={theme}
        />
      )}

      {/* Embedded CSS rules for media queries responsive layout inside JS */}
      <style>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          width: 100%;
        }
        @media (max-width: 1200px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 899px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .product-grid {
            grid-template-columns: 1fr;
          }
        }
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
        body.light-theme .floating-cart-btn-assistive:hover {
          background: rgba(255, 255, 255, 0.95) !important;
        }
        .floating-cart-btn-assistive:active {
          transform: scale(0.9);
        }
        .floating-ai-btn-assistive:hover {
          transform: scale(1.1) rotate(-6deg);
          border-color: var(--color-primary) !important;
          /* Mặc định ở Dark mode hover sẽ ra nền tối */
          background: rgba(30, 41, 59, 0.9) !important;
        }
        body.light-theme .floating-ai-btn-assistive:hover {
          background: rgba(255, 255, 255, 0.95) !important;
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

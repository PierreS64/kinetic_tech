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

function CategoryFeaturedRow({ categoryName, categoryProducts, onAddToCart, onBuyNow, likedProductIds, onToggleLike, onViewDetails, theme }) {
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const handleScroll = () => {
    if (rowRef.current) {
      setShowLeftArrow(rowRef.current.scrollLeft > 5);
    }
  };

  useEffect(() => {
    const el = rowRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => {
      if (el) {
        el.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div style={{ marginBottom: '40px', position: 'relative' }} className="reveal-on-scroll ">
      <h3 style={{ fontSize: '16px', fontWeight: '800', fontFamily: 'Montserrat', color: theme === 'light' ? '#0f172a' : '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>
        <span style={{ width: '4px', height: '16px', background: 'var(--color-primary)', borderRadius: '2px', display: 'inline-block' }} />
        {categoryName.toUpperCase()} NỔI BẬT & BÁN CHẠY
      </h3>

      <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        {/* Scroll Left Button */}
        {showLeftArrow && (
          <button 
            type="button"
            onClick={() => {
              if (rowRef.current) {
                rowRef.current.scrollBy({ left: -320, behavior: 'smooth' });
              }
            }}
            className="btn btn-ghost category-scroll-btn"
            style={{
              position: 'absolute',
              left: '-16px',
              zIndex: 10,
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0
            }}
          >
            <ArrowLeft size={18} />
          </button>
        )}

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
            <div key={product.id} style={{ flex: '0 0 calc(25% - 15px)', minWidth: 'calc(25% - 15px)', maxWidth: 'calc(25% - 15px)' }} >
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
          className="btn btn-ghost category-scroll-btn"
          style={{
            position: 'absolute',
            right: '-16px',
            zIndex: 10,
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0
          }}
        >
          <ArrowRight size={18} />
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
  const [showRelatedLeftArrow, setShowRelatedLeftArrow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
    
    // 6. Category-specific specs check
    let matchesSpecs = true;
    if (activeView === 'laptop') {
      const f = laptopFilters;
      
      // Nhu cầu
      if (f.usage) {
        const nameLower = product.name.toLowerCase();
        const tagsLower = product.tags.map(t => t.toLowerCase());
        const hasGpu = product.specs.gpu && !product.specs.gpu.toLowerCase().includes('onboard') && !product.specs.gpu.toLowerCase().includes('integrated') && !product.specs.gpu.toLowerCase().includes('arc') && !product.specs.gpu.toLowerCase().includes('intel');
        if (f.usage === 'gaming') {
          matchesSpecs = matchesSpecs && (tagsLower.includes('gaming') || nameLower.includes('gaming') || nameLower.includes('rog') || nameLower.includes('predator') || nameLower.includes('helios') || nameLower.includes('legion') || nameLower.includes('victus') || nameLower.includes('msi'));
        } else if (f.usage === 'office') {
          matchesSpecs = matchesSpecs && (tagsLower.includes('workplace') || tagsLower.includes('ultrabook') || nameLower.includes('air') || nameLower.includes('xps') || nameLower.includes('zenbook') || (!hasGpu && product.price < 25000000));
        } else if (f.usage === 'graphics') {
          matchesSpecs = matchesSpecs && (tagsLower.includes('đồ họa') || tagsLower.includes('kỹ thuật') || nameLower.includes('pro') || nameLower.includes('creator') || hasGpu || nameLower.includes('macbook pro'));
        } else if (f.usage === 'thin') {
          matchesSpecs = matchesSpecs && (tagsLower.includes('ultrabook') || nameLower.includes('macbook') || nameLower.includes('xps') || nameLower.includes('zenbook') || nameLower.includes('thin') || nameLower.includes('slim'));
        }
      }
      
      // CPU
      if (f.cpu) {
        const cpuLower = (product.specs.cpu || '').toLowerCase();
        if (f.cpu === 'intel-i3') matchesSpecs = matchesSpecs && cpuLower.includes('i3');
        else if (f.cpu === 'intel-i5') matchesSpecs = matchesSpecs && cpuLower.includes('i5');
        else if (f.cpu === 'intel-i7') matchesSpecs = matchesSpecs && (cpuLower.includes('i7') || cpuLower.includes('ultra 7'));
        else if (f.cpu === 'intel-i9') matchesSpecs = matchesSpecs && (cpuLower.includes('i9') || cpuLower.includes('ultra 9'));
        else if (f.cpu === 'amd-r3') matchesSpecs = matchesSpecs && cpuLower.includes('ryzen 3');
        else if (f.cpu === 'amd-r5') matchesSpecs = matchesSpecs && cpuLower.includes('ryzen 5');
        else if (f.cpu === 'amd-r7') matchesSpecs = matchesSpecs && cpuLower.includes('ryzen 7');
        else if (f.cpu === 'amd-r9') matchesSpecs = matchesSpecs && cpuLower.includes('ryzen 9');
        else if (f.cpu === 'apple-m') matchesSpecs = matchesSpecs && (cpuLower.includes('apple m') || cpuLower.includes('m1') || cpuLower.includes('m2') || cpuLower.includes('m3') || cpuLower.includes('m4'));
      }
      
      // RAM
      if (f.ram) {
        const ramLower = (product.specs.ram || '').toLowerCase();
        const nameLower = product.name.toLowerCase();
        if (f.ram === '4gb') matchesSpecs = matchesSpecs && (ramLower.includes('4gb') || nameLower.includes('4gb'));
        else if (f.ram === '8gb') matchesSpecs = matchesSpecs && (ramLower.includes('8gb') || nameLower.includes('8gb'));
        else if (f.ram === '16gb') matchesSpecs = matchesSpecs && (ramLower.includes('16gb') || nameLower.includes('16gb'));
        else if (f.ram === '32gb') matchesSpecs = matchesSpecs && (ramLower.includes('32gb') || ramLower.includes('64gb') || nameLower.includes('32gb') || nameLower.includes('64gb'));
      }
      
      // Storage
      if (f.storage) {
        const storageLower = (product.specs.storage || '').toLowerCase();
        const nameLower = product.name.toLowerCase();
        if (f.storage === '256gb') matchesSpecs = matchesSpecs && (storageLower.includes('256gb') || nameLower.includes('256gb'));
        else if (f.storage === '512gb') matchesSpecs = matchesSpecs && (storageLower.includes('512gb') || storageLower.includes('512gb') || nameLower.includes('512gb'));
        else if (f.storage === '1tb') matchesSpecs = matchesSpecs && (storageLower.includes('1tb') || storageLower.includes('2tb') || nameLower.includes('1tb') || nameLower.includes('2tb'));
      }
      
      // GPU/VGA
      if (f.gpu) {
        const gpuLower = (product.specs.gpu || '').toLowerCase();
        if (f.gpu === 'onboard') matchesSpecs = matchesSpecs && (gpuLower.includes('onboard') || gpuLower.includes('integrated') || gpuLower.includes('intel arc') || gpuLower.includes('intel iris') || (gpuLower.includes('gpu') && gpuLower.includes('core')) || gpuLower.includes('graphics'));
        else if (f.gpu === 'nvidia') matchesSpecs = matchesSpecs && (gpuLower.includes('nvidia') || gpuLower.includes('rtx') || gpuLower.includes('gtx'));
        else if (f.gpu === 'amd') matchesSpecs = matchesSpecs && (gpuLower.includes('radeon') || gpuLower.includes('rx'));
      }
      
      // Screen size
      if (f.screenSize) {
        const nameLower = product.name.toLowerCase();
        const screenLower = (product.specs.screen || '').toLowerCase();
        if (f.screenSize === '13') matchesSpecs = matchesSpecs && (nameLower.includes('13') || screenLower.includes('13'));
        else if (f.screenSize === '14') matchesSpecs = matchesSpecs && (nameLower.includes('14') || screenLower.includes('14'));
        else if (f.screenSize === '15') matchesSpecs = matchesSpecs && (nameLower.includes('15') || screenLower.includes('15'));
        else if (f.screenSize === '16') matchesSpecs = matchesSpecs && (nameLower.includes('16') || nameLower.includes('17') || nameLower.includes('18') || screenLower.includes('16') || screenLower.includes('17'));
      }
      
      // Screen Hz
      if (f.screenHz) {
        const tagsLower = product.tags.map(t => t.toLowerCase());
        const nameLower = product.name.toLowerCase();
        const screenLower = (product.specs.screen || '').toLowerCase();
        const fullText = nameLower + ' ' + screenLower + ' ' + tagsLower.join(' ');
        if (f.screenHz === '60') matchesSpecs = matchesSpecs && (fullText.includes('60hz') || !fullText.includes('hz'));
        else if (f.screenHz === '90') matchesSpecs = matchesSpecs && fullText.includes('90hz');
        else if (f.screenHz === '120') matchesSpecs = matchesSpecs && fullText.includes('120hz');
        else if (f.screenHz === '144') matchesSpecs = matchesSpecs && fullText.includes('144hz');
        else if (f.screenHz === '165') matchesSpecs = matchesSpecs && (fullText.includes('165hz') || fullText.includes('240hz') || fullText.includes('360hz'));
      }
    } else if (activeView === 'điện thoại') {
      const f = phoneFilters;
      
      // OS
      if (f.os) {
        const nameLower = product.name.toLowerCase();
        const isApple = nameLower.includes('iphone') || nameLower.includes('apple');
        if (f.os === 'ios') matchesSpecs = matchesSpecs && isApple;
        else if (f.os === 'android') matchesSpecs = matchesSpecs && !isApple;
      }
      
      // Storage ROM
      if (f.rom) {
        const nameLower = product.name.toLowerCase();
        const screenLower = (product.specs.screen || '').toLowerCase();
        const fullText = nameLower + ' ' + screenLower;
        matchesSpecs = matchesSpecs && fullText.includes(f.rom.toLowerCase());
      }
      
      // RAM
      if (f.ram) {
        const nameLower = product.name.toLowerCase();
        let estRam = 8;
        if (nameLower.includes('15 pro max')) estRam = 8;
        else if (nameLower.includes('s24 ultra')) estRam = 12;
        else if (nameLower.includes('z fold5')) estRam = 12;
        else if (nameLower.includes('14 ultra')) estRam = 16;
        else if (nameLower.includes('pixel 8 pro')) estRam = 12;
        else if (nameLower.includes('rog phone 8 pro')) estRam = 16;
        else if (nameLower.includes('iphone 15')) estRam = 6;
        
        if (f.ram === '4gb') matchesSpecs = matchesSpecs && estRam === 4;
        else if (f.ram === '6gb') matchesSpecs = matchesSpecs && estRam === 6;
        else if (f.ram === '8gb') matchesSpecs = matchesSpecs && estRam === 8;
        else if (f.ram === '12gb') matchesSpecs = matchesSpecs && estRam >= 12;
      }
      
      // Screen Size
      if (f.screenSize) {
        const screenStr = (product.specs.screen || '').toLowerCase();
        const match = screenStr.match(/(\d+\.?\d*)\s*inch/);
        const size = match ? parseFloat(match[1]) : 6.0;
        const isFold = product.name.toLowerCase().includes('fold') || product.name.toLowerCase().includes('gập') || product.tags.some(t => t.toLowerCase().includes('fold'));
        
        if (f.screenSize === 'small') matchesSpecs = matchesSpecs && size < 6.0 && !isFold;
        else if (f.screenSize === 'large') matchesSpecs = matchesSpecs && size >= 6.0 && !isFold;
        else if (f.screenSize === 'fold') matchesSpecs = matchesSpecs && isFold;
      }
      
      // Special features
      if (f.features && f.features.length > 0) {
        const nameLower = product.name.toLowerCase();
        const tagsLower = product.tags.map(t => t.toLowerCase());
        const specsStr = JSON.stringify(product.specs).toLowerCase();
        const fullText = nameLower + ' ' + tagsLower.join(' ') + ' ' + specsStr;
        
        f.features.forEach(feat => {
          if (feat === '5g') matchesSpecs = matchesSpecs && fullText.includes('5g');
          if (feat === 'fast') matchesSpecs = matchesSpecs && (fullText.includes('fast') || fullText.includes('sạc nhanh') || fullText.includes('90w') || fullText.includes('charge'));
          if (feat === 'waterproof') matchesSpecs = matchesSpecs && (fullText.includes('kháng nước') || fullText.includes('waterproof') || fullText.includes('ip68') || nameLower.includes('iphone') || nameLower.includes('s24 ultra') || nameLower.includes('pixel'));
          if (feat === 'ois') matchesSpecs = matchesSpecs && (fullText.includes('ois') || fullText.includes('chống rung') || nameLower.includes('iphone 15 pro') || nameLower.includes('s24 ultra') || nameLower.includes('pixel 8 pro'));
        });
      }
      
      // Battery
      if (f.battery) {
        const batteryStr = (product.specs.battery || '').toLowerCase();
        const match = batteryStr.match(/(\d+)\s*mah/);
        const capacity = match ? parseInt(match[1]) : 4500;
        if (f.battery === 'under4000') matchesSpecs = matchesSpecs && capacity < 4000;
        else if (f.battery === '4000to5000') matchesSpecs = matchesSpecs && capacity >= 4000 && capacity <= 5000;
        else if (f.battery === 'over5000') matchesSpecs = matchesSpecs && capacity > 5000;
      }
    } else if (activeView === 'gaming gear') {
      const f = gearFilters;
      
      // Product Type
      if (f.type) {
        const nameLower = product.name.toLowerCase();
        const tagsLower = product.tags.map(t => t.toLowerCase());
        const fullText = nameLower + ' ' + tagsLower.join(' ');
        if (f.type === 'keyboard') matchesSpecs = matchesSpecs && (fullText.includes('phím') || fullText.includes('keyboard') || fullText.includes('azoth'));
        else if (f.type === 'mouse') matchesSpecs = matchesSpecs && (fullText.includes('chuột') || fullText.includes('mouse') || fullText.includes('superlight') || fullText.includes('cobra'));
        else if (f.type === 'headset') matchesSpecs = matchesSpecs && (fullText.includes('tai nghe') || fullText.includes('headset') || fullText.includes('headphone') || fullText.includes('delta') || fullText.includes('blackshark'));
        else if (f.type === 'mousepad') matchesSpecs = matchesSpecs && (fullText.includes('lót') || fullText.includes('pad') || fullText.includes('bàn di'));
        else if (f.type === 'gamepad') matchesSpecs = matchesSpecs && (fullText.includes('tay cầm') || fullText.includes('gamepad') || fullText.includes('controller') || fullText.includes('xbox'));
      }
      
      // Connection
      if (f.connection) {
        const connectivity = (product.specs.connectivity || '').toLowerCase();
        const nameLower = product.name.toLowerCase();
        const fullText = connectivity + ' ' + nameLower;
        if (f.connection === 'wired') matchesSpecs = matchesSpecs && (fullText.includes('wired') || fullText.includes('có dây') || fullText.includes('type-c') || fullText.includes('usb') && !fullText.includes('wireless'));
        else if (f.connection === 'wireless') matchesSpecs = matchesSpecs && (fullText.includes('wireless') || fullText.includes('không dây') || fullText.includes('bluetooth') || fullText.includes('bt') || fullText.includes('2.4ghz'));
        else if (f.connection === '2.4g') matchesSpecs = matchesSpecs && (fullText.includes('2.4') || fullText.includes('receiver') || fullText.includes('dongle'));
      }
      
      // LED
      if (f.led) {
        const specsStr = JSON.stringify(product.specs).toLowerCase();
        const nameLower = product.name.toLowerCase();
        const tagsLower = product.tags.map(t => t.toLowerCase());
        const fullText = specsStr + ' ' + nameLower + ' ' + tagsLower.join(' ');
        
        if (f.led === 'no') matchesSpecs = matchesSpecs && !fullText.includes('rgb') && !fullText.includes('led') && !fullText.includes('matrix') && !fullText.includes('prism');
        else if (f.led === 'single') matchesSpecs = matchesSpecs && fullText.includes('led') && !fullText.includes('rgb');
        else if (f.led === 'rgb') matchesSpecs = matchesSpecs && (fullText.includes('rgb') || fullText.includes('chroma') || fullText.includes('prism') || fullText.includes('matrix'));
      }
      
      // Keyboard dynamic
      if (f.type === 'keyboard') {
        if (f.keyboardSwitch) {
          const switchStr = (product.specs.switches || '').toLowerCase();
          if (f.keyboardSwitch === 'blue') matchesSpecs = matchesSpecs && switchStr.includes('blue');
          else if (f.keyboardSwitch === 'red') matchesSpecs = matchesSpecs && switchStr.includes('red');
          else if (f.keyboardSwitch === 'brown') matchesSpecs = matchesSpecs && switchStr.includes('brown');
          else if (f.keyboardSwitch === 'custom') matchesSpecs = matchesSpecs && (switchStr.includes('nx') || switchStr.includes('pre-lubed') || switchStr.includes('lubed') || switchStr.includes('custom') || switchStr.includes('hybrid'));
        }
        if (f.keyboardLayout) {
          const layoutStr = (product.specs.layout || '').toLowerCase();
          if (f.keyboardLayout === 'fullsize') matchesSpecs = matchesSpecs && (layoutStr.includes('full') || layoutStr.includes('104') || layoutStr.includes('108'));
          else if (f.keyboardLayout === 'tkl') matchesSpecs = matchesSpecs && (layoutStr.includes('tkl') || layoutStr.includes('87'));
          else if (f.keyboardLayout === '75') matchesSpecs = matchesSpecs && layoutStr.includes('75%');
          else if (f.keyboardLayout === '60') matchesSpecs = matchesSpecs && (layoutStr.includes('60%') || layoutStr.includes('65%'));
        }
      }
      
      // Mouse dynamic
      if (f.type === 'mouse') {
        if (f.mouseWeight) {
          const weightStr = (product.specs.weight || '').toLowerCase();
          const match = weightStr.match(/(\d+)\s*gram/);
          const weightVal = match ? parseInt(match[1]) : 80;
          if (f.mouseWeight === 'light') matchesSpecs = matchesSpecs && weightVal < 70;
          else if (f.mouseWeight === 'standard') matchesSpecs = matchesSpecs && weightVal >= 70;
        }
        if (f.mouseDpi) {
          const sensorStr = (product.specs.sensor || '').toLowerCase();
          let dpiVal = 16000;
          if (sensorStr.includes('32.000') || sensorStr.includes('32k')) dpiVal = 32000;
          else if (sensorStr.includes('30k') || sensorStr.includes('30.000')) dpiVal = 30000;
          else if (sensorStr.includes('20.000') || sensorStr.includes('20k')) dpiVal = 20000;
          else if (sensorStr.includes('10.000') || sensorStr.includes('10k')) dpiVal = 10000;
          
          if (f.mouseDpi === 'under10k') matchesSpecs = matchesSpecs && dpiVal < 10000;
          else if (f.mouseDpi === '10k20k') matchesSpecs = matchesSpecs && dpiVal >= 10000 && dpiVal <= 20000;
          else if (f.mouseDpi === 'over20k') matchesSpecs = matchesSpecs && dpiVal > 20000;
        }
      }
    } else if (activeView === 'linh kiện') {
      const f = componentFilters;
      
      // Component Type
      if (f.type) {
        const nameLower = product.name.toLowerCase();
        const tagsLower = product.tags.map(t => t.toLowerCase());
        const fullText = nameLower + ' ' + tagsLower.join(' ');
        
        if (f.type === 'cpu') matchesSpecs = matchesSpecs && (fullText.includes('cpu') || fullText.includes('processor') || nameLower.includes('ryzen') || nameLower.includes('core i'));
        else if (f.type === 'motherboard') matchesSpecs = matchesSpecs && (fullText.includes('mainboard') || fullText.includes('bo mạch chủ') || fullText.includes('motherboard') || nameLower.includes('maximus') || nameLower.includes('z790') || nameLower.includes('b650'));
        else if (f.type === 'ram') matchesSpecs = matchesSpecs && (fullText.includes('ram') || fullText.includes('memory') || nameLower.includes('ddr'));
        else if (f.type === 'vga') matchesSpecs = matchesSpecs && (fullText.includes('vga') || fullText.includes('card màn hình') || fullText.includes('card đồ họa') || nameLower.includes('rtx') || nameLower.includes('radeon'));
        else if (f.type === 'ssd') matchesSpecs = matchesSpecs && (fullText.includes('ssd') || fullText.includes('hdd') || fullText.includes('ổ cứng') || nameLower.includes('nvme') || nameLower.includes('m.2'));
        else if (f.type === 'psu') matchesSpecs = matchesSpecs && (fullText.includes('psu') || fullText.includes('nguồn') || fullText.includes('power supply') || nameLower.includes('shift') || nameLower.includes('rm1000x'));
        else if (f.type === 'cooler') matchesSpecs = matchesSpecs && (fullText.includes('tản nhiệt') || fullText.includes('cooler') || nameLower.includes('ryujin') || nameLower.includes('aio'));
        else if (f.type === 'case') matchesSpecs = matchesSpecs && (fullText.includes('case') || fullText.includes('vỏ') || nameLower.includes('lian li') || nameLower.includes('vision'));
      }
      
      // Dynamic filters CPU & Mainboard
      if (f.type === 'cpu' || f.type === 'motherboard') {
        if (f.socket) {
          const socketStr = (product.specs.socket || '').toLowerCase();
          const nameLower = product.name.toLowerCase();
          const fullText = socketStr + ' ' + nameLower;
          if (f.socket === 'lga1700') matchesSpecs = matchesSpecs && fullText.includes('lga1700');
          else if (f.socket === 'lga1200') matchesSpecs = matchesSpecs && fullText.includes('lga1200');
          else if (f.socket === 'am4') matchesSpecs = matchesSpecs && fullText.includes('am4');
          else if (f.socket === 'am5') matchesSpecs = matchesSpecs && fullText.includes('am5');
        }
        if (f.chipset) {
          const nameLower = product.name.toLowerCase();
          if (f.chipset === 'h-series') matchesSpecs = matchesSpecs && (nameLower.includes('h610') || nameLower.includes('h510') || nameLower.includes('h-series'));
          else if (f.chipset === 'b-series') matchesSpecs = matchesSpecs && (nameLower.includes('b760') || nameLower.includes('b650') || nameLower.includes('b550') || nameLower.includes('b-series'));
          else if (f.chipset === 'z-series') matchesSpecs = matchesSpecs && (nameLower.includes('z790') || nameLower.includes('z690') || nameLower.includes('z-series'));
          else if (f.chipset === 'x-series') matchesSpecs = matchesSpecs && (nameLower.includes('x670') || nameLower.includes('x570') || nameLower.includes('x-series'));
        }
      }
      
      // Dynamic filters RAM
      if (f.type === 'ram') {
        if (f.ramStandard) {
          const typeStr = (product.specs.type || '').toLowerCase();
          const nameLower = product.name.toLowerCase();
          const fullText = typeStr + ' ' + nameLower;
          if (f.ramStandard === 'ddr4') matchesSpecs = matchesSpecs && fullText.includes('ddr4');
          else if (f.ramStandard === 'ddr5') matchesSpecs = matchesSpecs && fullText.includes('ddr5');
        }
        if (f.ramBus) {
          const speedStr = (product.specs.speed || '').toLowerCase();
          const nameLower = product.name.toLowerCase();
          const fullText = speedStr + ' ' + nameLower;
          matchesSpecs = matchesSpecs && fullText.includes(f.ramBus);
        }
      }
      
      // Dynamic filters VGA
      if (f.type === 'vga') {
        if (f.vgaBrand) {
          const nameLower = product.name.toLowerCase();
          const tagsLower = product.tags.map(t => t.toLowerCase());
          const fullText = nameLower + ' ' + tagsLower.join(' ');
          if (f.vgaBrand === 'nvidia') matchesSpecs = matchesSpecs && (fullText.includes('nvidia') || fullText.includes('rtx') || fullText.includes('gtx'));
          else if (f.vgaBrand === 'amd') matchesSpecs = matchesSpecs && (fullText.includes('amd') || fullText.includes('radeon') || fullText.includes('rx'));
        }
        if (f.vgaVram) {
          const vramStr = (product.specs.vram || '').toLowerCase();
          const nameLower = product.name.toLowerCase();
          const fullText = vramStr + ' ' + nameLower;
          if (f.vgaVram === '4gb') matchesSpecs = matchesSpecs && fullText.includes('4gb');
          else if (f.vgaVram === '8gb') matchesSpecs = matchesSpecs && fullText.includes('8gb');
          else if (f.vgaVram === '12gb') matchesSpecs = matchesSpecs && fullText.includes('12gb');
          else if (f.vgaVram === '16gb') matchesSpecs = matchesSpecs && (fullText.includes('16gb') || fullText.includes('24gb'));
        }
      }
      
      // Dynamic filters PSU
      if (f.type === 'psu') {
        if (f.psuPower) {
          const powerStr = (product.specs.power || '').toLowerCase();
          const nameLower = product.name.toLowerCase();
          const fullText = powerStr + ' ' + nameLower;
          const match = fullText.match(/(\d+)\s*w/);
          const watts = match ? parseInt(match[1]) : 750;
          
          if (f.psuPower === 'under500') matchesSpecs = matchesSpecs && watts < 500;
          else if (f.psuPower === '500to650') matchesSpecs = matchesSpecs && watts >= 500 && watts <= 650;
          else if (f.psuPower === '700to850') matchesSpecs = matchesSpecs && watts >= 700 && watts <= 850;
          else if (f.psuPower === 'over850') matchesSpecs = matchesSpecs && watts > 850;
        }
        if (f.psuEfficiency) {
          const effStr = (product.specs.efficiency || '').toLowerCase();
          const nameLower = product.name.toLowerCase();
          const fullText = effStr + ' ' + nameLower;
          if (f.psuEfficiency === 'white') matchesSpecs = matchesSpecs && fullText.includes('white');
          else if (f.psuEfficiency === 'bronze') matchesSpecs = matchesSpecs && fullText.includes('bronze');
          else if (f.psuEfficiency === 'gold') matchesSpecs = matchesSpecs && fullText.includes('gold');
          else if (f.psuEfficiency === 'platinum') matchesSpecs = matchesSpecs && fullText.includes('platinum');
        }
      }
    }
    
    return matchesCategory && matchesSearch && matchesBrand && matchesPrice && matchesStock && matchesSpecs;
  });

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
                <aside className="filter-sidebar glass-panel" style={{
                  borderRadius: 'var(--rounded-md)',
                  padding: '20px',
                  height: 'fit-content',
                  position: 'sticky',
                  top: '92px'
                }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '800', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px', marginBottom: '16px', color: 'var(--color-on-surface)' }}>
                    BỘ LỌC TÌM KIẾM
                  </h3>
                  
                  {/* Filter Stock */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: 'var(--color-on-surface)' }}>
                      <input 
                        type="checkbox" 
                        checked={onlyInStock}
                        onChange={(e) => setOnlyInStock(e.target.checked)}
                        style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                      />
                      <span style={{ userSelect: 'none' }}>Chỉ hàng còn kho</span>
                    </label>
                  </div>

                  {/* 1. LAPTOP FILTERS */}
                  {activeView === 'laptop' && (
                    <>
                      {/* Price Preset */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Mức Giá
                        </span>
                        <select
                          value={`${minPrice}-${maxPrice}`}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '0-80000000') {
                              setMinPrice(0);
                              setMaxPrice(80000000);
                            } else {
                              const parts = val.split('-');
                              setMinPrice(parseInt(parts[0]));
                              setMaxPrice(parseInt(parts[1]));
                            }
                          }}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="0-80000000">Tất cả mức giá</option>
                          <option value="0-10000000">Dưới 10 triệu</option>
                          <option value="10000000-15000000">10 - 15 triệu</option>
                          <option value="15000000-20000000">15 - 20 triệu</option>
                          <option value="20000000-25000000">20 - 25 triệu</option>
                          <option value="25000000-80000000">Trên 25 triệu</option>
                        </select>
                      </div>

                      {/* Brand */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Thương Hiệu
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {getCategoryBrands().map((brand) => {
                            const isChecked = selectedBrands.includes(brand);
                            return (
                              <label key={brand} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
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
                                <span style={{ color: isChecked ? 'var(--color-primary)' : 'var(--color-on-surface-variant)', userSelect: 'none' }}>
                                  {brand}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Usage */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Nhu Cầu Sử Dụng
                        </span>
                        <select
                          value={laptopFilters.usage}
                          onChange={(e) => setLaptopFilters(prev => ({ ...prev, usage: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả nhu cầu</option>
                          <option value="office">Học tập - Văn phòng</option>
                          <option value="gaming">Gaming</option>
                          <option value="graphics">Đồ họa - Kỹ thuật</option>
                          <option value="thin">Mỏng nhẹ - Cao cấp</option>
                        </select>
                      </div>

                      {/* CPU */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          CPU
                        </span>
                        <select
                          value={laptopFilters.cpu}
                          onChange={(e) => setLaptopFilters(prev => ({ ...prev, cpu: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả CPU</option>
                          <option value="intel-i3">Intel Core i3</option>
                          <option value="intel-i5">Intel Core i5</option>
                          <option value="intel-i7">Intel Core i7</option>
                          <option value="intel-i9">Intel Core i9</option>
                          <option value="amd-r3">AMD Ryzen 3</option>
                          <option value="amd-r5">AMD Ryzen 5</option>
                          <option value="amd-r7">AMD Ryzen 7</option>
                          <option value="amd-r9">AMD Ryzen 9</option>
                          <option value="apple-m">Apple M-series</option>
                        </select>
                      </div>

                      {/* RAM */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Dung Lượng RAM
                        </span>
                        <select
                          value={laptopFilters.ram}
                          onChange={(e) => setLaptopFilters(prev => ({ ...prev, ram: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả RAM</option>
                          <option value="4gb">4GB</option>
                          <option value="8gb">8GB</option>
                          <option value="16gb">16GB</option>
                          <option value="32gb">32GB trở lên</option>
                        </select>
                      </div>

                      {/* Storage */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Ổ Cứng (Lưu Trữ)
                        </span>
                        <select
                          value={laptopFilters.storage}
                          onChange={(e) => setLaptopFilters(prev => ({ ...prev, storage: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả ổ cứng</option>
                          <option value="256gb">SSD 256GB</option>
                          <option value="512gb">SSD 512GB</option>
                          <option value="1tb">SSD 1TB trở lên</option>
                        </select>
                      </div>

                      {/* GPU */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Card Đồ Họa (VGA)
                        </span>
                        <select
                          value={laptopFilters.gpu}
                          onChange={(e) => setLaptopFilters(prev => ({ ...prev, gpu: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả VGA</option>
                          <option value="onboard">Card Onboard (Tích hợp)</option>
                          <option value="nvidia">NVIDIA (GTX/RTX)</option>
                          <option value="amd">AMD Radeon</option>
                        </select>
                      </div>

                      {/* Screen Size */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Kích Thước Màn Hình
                        </span>
                        <select
                          value={laptopFilters.screenSize}
                          onChange={(e) => setLaptopFilters(prev => ({ ...prev, screenSize: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả kích thước</option>
                          <option value="13">Khoảng 13 inch</option>
                          <option value="14">Khoảng 14 inch</option>
                          <option value="15">Khoảng 15.6 inch</option>
                          <option value="16">16 inch trở lên</option>
                        </select>
                      </div>

                      {/* Screen Hz */}
                      <div style={{ marginBottom: '20px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Tần Số Quét Màn Hình
                        </span>
                        <select
                          value={laptopFilters.screenHz}
                          onChange={(e) => setLaptopFilters(prev => ({ ...prev, screenHz: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả tần số quét</option>
                          <option value="60">60Hz</option>
                          <option value="90">90Hz</option>
                          <option value="120">120Hz</option>
                          <option value="144">144Hz</option>
                          <option value="165">165Hz trở lên</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* 2. PHONE FILTERS */}
                  {activeView === 'điện thoại' && (
                    <>
                      {/* Price Preset */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Mức Giá
                        </span>
                        <select
                          value={`${minPrice}-${maxPrice}`}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '0-80000000') {
                              setMinPrice(0);
                              setMaxPrice(80000000);
                            } else {
                              const parts = val.split('-');
                              setMinPrice(parseInt(parts[0]));
                              setMaxPrice(parseInt(parts[1]));
                            }
                          }}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="0-80000000">Tất cả mức giá</option>
                          <option value="0-2000000">Dưới 2 triệu</option>
                          <option value="2000000-4000000">2 - 4 triệu</option>
                          <option value="4000000-7000000">4 - 7 triệu</option>
                          <option value="7000000-13000000">7 - 13 triệu</option>
                          <option value="13000000-20000000">13 - 20 triệu</option>
                          <option value="20000000-80000000">Trên 20 triệu</option>
                        </select>
                      </div>

                      {/* Brand */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Thương Hiệu
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {getCategoryBrands().map((brand) => {
                            const isChecked = selectedBrands.includes(brand);
                            return (
                              <label key={brand} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
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
                                <span style={{ color: isChecked ? 'var(--color-primary)' : 'var(--color-on-surface-variant)', userSelect: 'none' }}>
                                  {brand}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* OS */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Hệ Điều Hành
                        </span>
                        <select
                          value={phoneFilters.os}
                          onChange={(e) => setPhoneFilters(prev => ({ ...prev, os: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả HĐH</option>
                          <option value="ios">iOS</option>
                          <option value="android">Android</option>
                        </select>
                      </div>

                      {/* ROM */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Dung Lượng ROM
                        </span>
                        <select
                          value={phoneFilters.rom}
                          onChange={(e) => setPhoneFilters(prev => ({ ...prev, rom: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả bộ nhớ</option>
                          <option value="64GB">64GB</option>
                          <option value="128GB">128GB</option>
                          <option value="256GB">256GB</option>
                          <option value="512GB">512GB</option>
                          <option value="1TB">1TB</option>
                        </select>
                      </div>

                      {/* RAM */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Dung Lượng RAM
                        </span>
                        <select
                          value={phoneFilters.ram}
                          onChange={(e) => setPhoneFilters(prev => ({ ...prev, ram: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả RAM</option>
                          <option value="4gb">4GB</option>
                          <option value="6gb">6GB</option>
                          <option value="8gb">8GB</option>
                          <option value="12gb">12GB trở lên</option>
                        </select>
                      </div>

                      {/* Screen Size */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Đặc Điểm Màn Hình
                        </span>
                        <select
                          value={phoneFilters.screenSize}
                          onChange={(e) => setPhoneFilters(prev => ({ ...prev, screenSize: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả màn hình</option>
                          <option value="small">Dưới 6 inch (Nhỏ gọn)</option>
                          <option value="large">Trên 6 inch</option>
                          <option value="fold">Màn hình gập</option>
                        </select>
                      </div>

                      {/* Features */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Tính Năng Đặc Biệt
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {[
                            { id: '5g', label: 'Hỗ trợ mạng 5G' },
                            { id: 'fast', label: 'Sạc siêu nhanh' },
                            { id: 'waterproof', label: 'Kháng nước/bụi' },
                            { id: 'ois', label: 'Chống rung OIS' }
                          ].map(feat => {
                            const isChecked = phoneFilters.features.includes(feat.id);
                            return (
                              <label key={feat.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {
                                    if (isChecked) {
                                      setPhoneFilters(prev => ({ ...prev, features: prev.features.filter(f => f !== feat.id) }));
                                    } else {
                                      setPhoneFilters(prev => ({ ...prev, features: [...prev.features, feat.id] }));
                                    }
                                  }}
                                  style={{ width: '16px', height: '16px', accentColor: 'var(--color-primary)' }}
                                />
                                <span style={{ color: isChecked ? 'var(--color-primary)' : 'var(--color-on-surface-variant)', userSelect: 'none' }}>
                                  {feat.label}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Battery */}
                      <div style={{ marginBottom: '20px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Dung Lượng Pin
                        </span>
                        <select
                          value={phoneFilters.battery}
                          onChange={(e) => setPhoneFilters(prev => ({ ...prev, battery: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả dung lượng</option>
                          <option value="under4000">Dưới 4000 mAh</option>
                          <option value="4000to5000">4000 - 5000 mAh</option>
                          <option value="over5000">Trên 5000 mAh</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* 3. GAMING GEAR FILTERS */}
                  {activeView === 'gaming gear' && (
                    <>
                      {/* Price Preset */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Mức Giá
                        </span>
                        <select
                          value={`${minPrice}-${maxPrice}`}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '0-80000000') {
                              setMinPrice(0);
                              setMaxPrice(80000000);
                            } else {
                              const parts = val.split('-');
                              setMinPrice(parseInt(parts[0]));
                              setMaxPrice(parseInt(parts[1]));
                            }
                          }}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="0-80000000">Tất cả mức giá</option>
                          <option value="0-1000000">Dưới 1 triệu</option>
                          <option value="1000000-3000000">1 - 3 triệu</option>
                          <option value="3000000-5000000">3 - 5 triệu</option>
                          <option value="5000000-80000000">Trên 5 triệu</option>
                        </select>
                      </div>

                      {/* Brand */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Thương Hiệu
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {getCategoryBrands().map((brand) => {
                            const isChecked = selectedBrands.includes(brand);
                            return (
                              <label key={brand} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
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
                                <span style={{ color: isChecked ? 'var(--color-primary)' : 'var(--color-on-surface-variant)', userSelect: 'none' }}>
                                  {brand}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Product Type */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Loại Sản Phẩm
                        </span>
                        <select
                          value={gearFilters.type}
                          onChange={(e) => setGearFilters(prev => ({ ...prev, type: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả Gaming Gear</option>
                          <option value="keyboard">Bàn phím cơ</option>
                          <option value="mouse">Chuột gaming</option>
                          <option value="headset">Tai nghe</option>
                          <option value="mousepad">Lót chuột (Mousepad)</option>
                          <option value="gamepad">Tay cầm (Gamepad)</option>
                        </select>
                      </div>

                      {/* Connection */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Kết Nối
                        </span>
                        <select
                          value={gearFilters.connection}
                          onChange={(e) => setGearFilters(prev => ({ ...prev, connection: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả kết nối</option>
                          <option value="wired">Có dây (Type-C/USB)</option>
                          <option value="wireless">Không dây (Bluetooth)</option>
                          <option value="2.4g">Wireless 2.4GHz</option>
                        </select>
                      </div>

                      {/* LED */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Hệ Thống LED
                        </span>
                        <select
                          value={gearFilters.led}
                          onChange={(e) => setGearFilters(prev => ({ ...prev, led: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả hệ thống LED</option>
                          <option value="no">Không LED</option>
                          <option value="single">LED đơn sắc</option>
                          <option value="rgb">LED RGB</option>
                        </select>
                      </div>

                      {/* Dynamic Keyboard Filters */}
                      {gearFilters.type === 'keyboard' && (
                        <>
                          <div style={{ marginBottom: '14px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                              Loại Switch
                            </span>
                            <select
                              value={gearFilters.keyboardSwitch}
                              onChange={(e) => setGearFilters(prev => ({ ...prev, keyboardSwitch: e.target.value }))}
                              className="form-input"
                              style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                            >
                              <option value="">Tất cả Switch</option>
                              <option value="blue">Blue (Clicky)</option>
                              <option value="red">Red (Linear)</option>
                              <option value="brown">Brown (Tactile)</option>
                              <option value="custom">Custom Switch</option>
                            </select>
                          </div>
                          <div style={{ marginBottom: '20px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                              Kích Thước (Layout)
                            </span>
                            <select
                              value={gearFilters.keyboardLayout}
                              onChange={(e) => setGearFilters(prev => ({ ...prev, keyboardLayout: e.target.value }))}
                              className="form-input"
                              style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                            >
                              <option value="">Tất cả Layout</option>
                              <option value="fullsize">Fullsize (104/108 phím)</option>
                              <option value="tkl">TKL (87 phím)</option>
                              <option value="75">75%</option>
                              <option value="60">60-65%</option>
                            </select>
                          </div>
                        </>
                      )}

                      {/* Dynamic Mouse Filters */}
                      {gearFilters.type === 'mouse' && (
                        <>
                          <div style={{ marginBottom: '14px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                              Trọng Lượng
                            </span>
                            <select
                              value={gearFilters.mouseWeight}
                              onChange={(e) => setGearFilters(prev => ({ ...prev, mouseWeight: e.target.value }))}
                              className="form-input"
                              style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                            >
                              <option value="">Tất cả trọng lượng</option>
                              <option value="light">Siêu nhẹ (Dưới 70g)</option>
                              <option value="standard">Tiêu chuẩn</option>
                            </select>
                          </div>
                          <div style={{ marginBottom: '20px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                              DPI Tối Đa
                            </span>
                            <select
                              value={gearFilters.mouseDpi}
                              onChange={(e) => setGearFilters(prev => ({ ...prev, mouseDpi: e.target.value }))}
                              className="form-input"
                              style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                            >
                              <option value="">Tất cả mức DPI</option>
                              <option value="under10k">Dưới 10.000</option>
                              <option value="10k20k">10.000 - 20.000</option>
                              <option value="over20k">Trên 20.000</option>
                            </select>
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {/* 4. PC COMPONENT FILTERS */}
                  {activeView === 'linh kiện' && (
                    <>
                      {/* Price Preset */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Mức Giá
                        </span>
                        <select
                          value={`${minPrice}-${maxPrice}`}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '0-80000000') {
                              setMinPrice(0);
                              setMaxPrice(80000000);
                            } else {
                              const parts = val.split('-');
                              setMinPrice(parseInt(parts[0]));
                              setMaxPrice(parseInt(parts[1]));
                            }
                          }}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="0-80000000">Tất cả mức giá</option>
                          <option value="0-3000000">Dưới 3 triệu</option>
                          <option value="3000000-8000000">3 - 8 triệu</option>
                          <option value="8000000-15000000">8 - 15 triệu</option>
                          <option value="15000000-80000000">Trên 15 triệu</option>
                        </select>
                      </div>

                      {/* Brand */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Thương Hiệu
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {getCategoryBrands().map((brand) => {
                            const isChecked = selectedBrands.includes(brand);
                            return (
                              <label key={brand} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
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
                                <span style={{ color: isChecked ? 'var(--color-primary)' : 'var(--color-on-surface-variant)', userSelect: 'none' }}>
                                  {brand}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Component Type */}
                      <div style={{ marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                          Loại Linh Kiện
                        </span>
                        <select
                          value={componentFilters.type}
                          onChange={(e) => setComponentFilters(prev => ({ ...prev, type: e.target.value }))}
                          className="form-input"
                          style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                        >
                          <option value="">Tất cả linh kiện</option>
                          <option value="cpu">CPU</option>
                          <option value="motherboard">Mainboard (Bo mạch chủ)</option>
                          <option value="ram">RAM</option>
                          <option value="vga">VGA (Card màn hình)</option>
                          <option value="ssd">Ổ cứng (SSD/HDD)</option>
                          <option value="psu">Nguồn (PSU)</option>
                          <option value="cooler">Tản nhiệt</option>
                          <option value="case">Vỏ case</option>
                        </select>
                      </div>

                      {/* Dynamic CPU & Mainboard Filters */}
                      {(componentFilters.type === 'cpu' || componentFilters.type === 'motherboard') && (
                        <>
                          <div style={{ marginBottom: '14px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                              Socket
                            </span>
                            <select
                              value={componentFilters.socket}
                              onChange={(e) => setComponentFilters(prev => ({ ...prev, socket: e.target.value }))}
                              className="form-input"
                              style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                            >
                              <option value="">Tất cả Socket</option>
                              <option value="lga1700">LGA 1700</option>
                              <option value="lga1200">LGA 1200</option>
                              <option value="am4">AM4</option>
                              <option value="am5">AM5</option>
                            </select>
                          </div>
                          {componentFilters.type === 'motherboard' && (
                            <div style={{ marginBottom: '20px' }}>
                              <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                                Chipset
                              </span>
                              <select
                                value={componentFilters.chipset}
                                onChange={(e) => setComponentFilters(prev => ({ ...prev, chipset: e.target.value }))}
                                className="form-input"
                                style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                              >
                                <option value="">Tất cả Chipset</option>
                                <option value="h-series">H-series</option>
                                <option value="b-series">B-series</option>
                                <option value="z-series">Z-series</option>
                                <option value="x-series">X-series</option>
                              </select>
                            </div>
                          )}
                        </>
                      )}

                      {/* Dynamic RAM Filters */}
                      {componentFilters.type === 'ram' && (
                        <>
                          <div style={{ marginBottom: '14px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                              Chuẩn RAM
                            </span>
                            <select
                              value={componentFilters.ramStandard}
                              onChange={(e) => setComponentFilters(prev => ({ ...prev, ramStandard: e.target.value }))}
                              className="form-input"
                              style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                            >
                              <option value="">Tất cả chuẩn RAM</option>
                              <option value="ddr4">DDR4</option>
                              <option value="ddr5">DDR5</option>
                            </select>
                          </div>
                          <div style={{ marginBottom: '20px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                              Tốc Độ Bus
                            </span>
                            <select
                              value={componentFilters.ramBus}
                              onChange={(e) => setComponentFilters(prev => ({ ...prev, ramBus: e.target.value }))}
                              className="form-input"
                              style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                            >
                              <option value="">Tất cả tốc độ Bus</option>
                              <option value="3200">3200MHz</option>
                              <option value="4800">4800MHz</option>
                              <option value="5600">5600MHz</option>
                              <option value="6000">6000MHz</option>
                            </select>
                          </div>
                        </>
                      )}

                      {/* Dynamic VGA Filters */}
                      {componentFilters.type === 'vga' && (
                        <>
                          <div style={{ marginBottom: '14px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                              Chip Đồ Họa
                            </span>
                            <select
                              value={componentFilters.vgaBrand}
                              onChange={(e) => setComponentFilters(prev => ({ ...prev, vgaBrand: e.target.value }))}
                              className="form-input"
                              style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                            >
                              <option value="">Tất cả Chip đồ họa</option>
                              <option value="nvidia">NVIDIA</option>
                              <option value="amd">AMD</option>
                            </select>
                          </div>
                          <div style={{ marginBottom: '20px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                              Dung Lượng VRAM
                            </span>
                            <select
                              value={componentFilters.vgaVram}
                              onChange={(e) => setComponentFilters(prev => ({ ...prev, vgaVram: e.target.value }))}
                              className="form-input"
                              style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                            >
                              <option value="">Tất cả VRAM</option>
                              <option value="4gb">4GB</option>
                              <option value="8gb">8GB</option>
                              <option value="12gb">12GB</option>
                              <option value="16gb">16GB trở lên</option>
                            </select>
                          </div>
                        </>
                      )}

                      {/* Dynamic PSU Filters */}
                      {componentFilters.type === 'psu' && (
                        <>
                          <div style={{ marginBottom: '14px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                              Công Suất
                            </span>
                            <select
                              value={componentFilters.psuPower}
                              onChange={(e) => setComponentFilters(prev => ({ ...prev, psuPower: e.target.value }))}
                              className="form-input"
                              style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                            >
                              <option value="">Tất cả công suất</option>
                              <option value="under500">Dưới 500W</option>
                              <option value="500to650">500W - 650W</option>
                              <option value="700to850">700W - 850W</option>
                              <option value="over850">Trên 850W</option>
                            </select>
                          </div>
                          <div style={{ marginBottom: '20px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px', display: 'block', letterSpacing: '0.5px' }}>
                              Chuẩn Hiệu Suất
                            </span>
                            <select
                              value={componentFilters.psuEfficiency}
                              onChange={(e) => setComponentFilters(prev => ({ ...prev, psuEfficiency: e.target.value }))}
                              className="form-input"
                              style={{ width: '100%', padding: '8px', fontSize: '13px', background: 'var(--color-surface-container-lowest)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline-variant)', borderRadius: '4px' }}
                            >
                              <option value="">Tất cả chuẩn hiệu suất</option>
                              <option value="white">80 Plus White</option>
                              <option value="bronze">80 Plus Bronze</option>
                              <option value="gold">80 Plus Gold</option>
                              <option value="platinum">80 Plus Platinum</option>
                            </select>
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {/* Reset Filters button */}
                  <div style={{ marginTop: '16px' }}>
                    <button 
                      onClick={() => {
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
                      }}
                      className="btn btn-outline"
                      style={{ width: '100%', padding: '8px', fontSize: '12px' }}
                    >
                      Xóa bộ lọc
                    </button>
                  </div>
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
                      )}

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
                              flex: '0 0 calc(25% - 12px)',
                              minWidth: 'calc(25% - 12px)',
                              maxWidth: 'calc(25% - 12px)',
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

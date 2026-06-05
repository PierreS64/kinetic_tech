import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Package, 
  MessageSquare, 
  Shield, 
  Search, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowRight, 
  DollarSign, 
  Wrench, 
  RefreshCw, 
  FileText, 
  ChevronRight,
  Filter,
  Check,
  X,
  Edit2
} from 'lucide-react';

// Pre-configured mock data for Admin Dashboard
const MOCK_ORDERS = [
  {
    id: 'ORD-9842',
    customerName: 'Nguyễn Văn A',
    email: 'vana@gmail.com',
    phone: '0912345678',
    date: '2026-06-03 10:15',
    total: 36990000,
    paymentMethod: 'Chuyển khoản VietQR',
    status: 'processing', // 'pending', 'processing', 'completed', 'cancelled'
    items: [
      { id: 'lap-01', name: 'Laptop ASUS ROG Strix G16 (2024)', price: 36990000, quantity: 1 }
    ]
  },
  {
    id: 'ORD-4395',
    customerName: 'Trần Thị B',
    email: 'thib@gmail.com',
    phone: '0987654321',
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
    customerName: 'Lê Văn C',
    email: 'vanc@gmail.com',
    phone: '0905556677',
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
    customerName: 'Phạm Minh D',
    email: 'minhd@gmail.com',
    phone: '0977889900',
    date: '2026-05-28 14:20',
    total: 9890000,
    paymentMethod: 'Chuyển khoản VietQR',
    status: 'cancelled',
    items: [
      { id: 'comp-01', name: 'CPU AMD Ryzen 7 7800X3D', price: 9890000, quantity: 1 }
    ]
  }
];

const MOCK_WARRANTY_CLAIMS = [
  {
    id: 'WR-4720',
    customerName: 'Phạm Hải Đăng',
    phone: '0919283746',
    productName: 'Card Màn Hình ASUS ROG Strix RTX 4080 Super OC 16GB',
    serialNumber: 'SN-4080S-ROG-897482',
    dateCreated: '2026-06-01',
    issue: 'Quạt tản nhiệt số 3 phát ra tiếng kêu to lạ thường và thỉnh thoảng ngừng quay.',
    status: 'checking' // 'checking', 'repairing', 'returned', 'rejected'
  },
  {
    id: 'WR-8931',
    customerName: 'Hoàng Quốc Việt',
    phone: '0988776655',
    productName: 'Bàn phím cơ ASUS ROG Azoth Wireless',
    serialNumber: 'SN-AZOTH-998827',
    dateCreated: '2026-05-20',
    issue: 'Hỏng led RGB ở cụm phím điều hướng và phím Space không phản hồi.',
    status: 'repairing'
  },
  {
    id: 'WR-1204',
    customerName: 'Đỗ Thùy Chi',
    phone: '0944332211',
    productName: 'iPhone 15 Pro Max 256GB',
    serialNumber: 'SN-IP15PM-990812',
    dateCreated: '2026-05-15',
    issue: 'Pin tụt nhanh bất thường (chai pin từ 100% xuống 78% sau 1 tháng).',
    status: 'returned'
  }
];

const MOCK_TRADE_IN_REQUESTS = [
  {
    id: 'TI-8839',
    customerName: 'Trần Thế Anh',
    phone: '0933445566',
    oldDevice: 'iPhone 13 Pro Max 128GB (Pin 85%, Xước nhẹ viền)',
    targetDevice: 'iPhone 15 Pro Max 256GB',
    dateCreated: '2026-06-03',
    selfValuation: 12500000,
    offeredPrice: 0, // 0 means pending valuation
    status: 'pending' // 'pending', 'valued', 'completed', 'rejected'
  },
  {
    id: 'TI-2940',
    customerName: 'Lâm Mỹ Dung',
    phone: '0922118899',
    oldDevice: 'MacBook Air M1 2020 8GB/256GB (Đẹp 99%)',
    targetDevice: 'MacBook Pro 14 inch M3 (2024)',
    dateCreated: '2026-06-01',
    selfValuation: 9000000,
    offeredPrice: 10500000,
    status: 'valued'
  }
];

const MOCK_TICKETS = [
  {
    id: 'TK-5039',
    customerName: 'Khách Hàng KINETIC',
    subject: 'Máy tính bị sập nguồn khi chạy phần mềm dựng phim DaVinci Resolve',
    category: 'Lỗi Kỹ Thuật Phần Cứng',
    urgency: 'Gấp',
    status: 'pending', // 'pending', 'replied', 'closed'
    date: '2026-06-02',
    messages: [
      {
        sender: 'user',
        text: 'Mình vừa mua bộ máy PC build bên cửa hàng được 1 tháng. Dạo này cứ bật render video trong DaVinci Resolve hoặc chơi game Cyberpunk 2077 khoảng 15 phút là máy bị sập nguồn đột ngột, đèn trên mainboard báo đỏ LED CPU. Mình nghi là do tản nhiệt hoặc nguồn công suất không đủ. Nhờ kỹ thuật hỗ trợ kiểm tra giúp.',
        time: '02/06/2026 14:00'
      }
    ]
  },
  {
    id: 'TK-8947',
    customerName: 'Nguyễn Tiến Dũng',
    subject: 'Tư vấn nâng cấp RAM và SSD cho Asus TUF A15',
    category: 'Cấu hình PC & Laptop',
    urgency: 'Thường',
    status: 'replied',
    date: '2026-05-10',
    messages: [
      {
        sender: 'user',
        text: 'Chào Kinetic, mình đang dùng Asus TUF Gaming A15 (2022) có RAM 8GB và SSD 512GB. Máy dạo này chạy mấy game AAA hơi giật và hết dung lượng. Mình muốn nâng cấp thêm RAM lên 16GB và lắp thêm 1 ổ SSD 1TB nữa. Bên mình có linh kiện phù hợp và hỗ trợ lắp ráp luôn không?',
        time: '10/05/2026 09:30'
      },
      {
        sender: 'agent',
        agentName: 'Đức Minh (Kỹ thuật viên Laptop)',
        text: 'Chào bạn, Laptop Asus TUF Gaming A15 (2022) của bạn hỗ trợ tối đa 32GB RAM DDR5 và có sẵn 2 khe M.2 PCIe Gen 4 để nâng cấp SSD. Bên mình đang có sẵn RAM Corsair Vengeance DDR5 Bus 4800MHz giá 1.290.000đ và SSD Crucial P3 Plus 1TB giá 1.890.000đ rất phù hợp với máy bạn. Khi mua linh kiện bên mình hỗ trợ lắp đặt vệ sinh máy miễn phí tại chỗ luôn bạn nhé.',
        time: '10/05/2026 10:15'
      }
    ]
  }
];

export default function AdminDashboard({ 
  storeProducts, 
  setStoreProducts, 
  theme,
  orders = [],
  setOrders,
  tickets = [],
  setTickets,
  warranties = [],
  setWarranties,
  tradeins = [],
  setTradeins,
  feedbacks = [],
  setFeedbacks
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'orders', 'products', 'tickets', 'warranties', 'tradein', 'feedbacks'
  
  // Modal & Selection States
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketReplyText, setTicketReplyText] = useState('');
  const [selectedWarranty, setSelectedWarranty] = useState(null);
  const [selectedTradeIn, setSelectedTradeIn] = useState(null);
  const [offeredTradeInValuation, setOfferedTradeInValuation] = useState('');
  
  // Product Form states
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'laptop',
    price: '',
    oldPrice: '',
    cpu: '',
    ram: '',
    storage: '',
    gpu: '',
    inStock: true,
    tags: '',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=400'
  });

  // Search & Filter
  const [orderSearch, setOrderSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // Helpers
  const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  // 1. Order handlers
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    }
  };

  // 2. Product handlers
  const toggleStock = (prodId) => {
    setStoreProducts(prev => prev.map(p => p.id === prodId ? { ...p, inStock: !p.inStock } : p));
  };

  const updateProductPrice = (prodId, changePercent) => {
    setStoreProducts(prev => prev.map(p => {
      if (p.id === prodId) {
        const newPrice = Math.round(p.price * (1 + changePercent / 100));
        return { ...p, price: newPrice };
      }
      return p;
    }));
  };

  const handleManualPriceChange = (prodId, rawValue) => {
    const numeric = parseInt(rawValue.replace(/\D/g, '')) || 0;
    setStoreProducts(prev => prev.map(p => p.id === prodId ? { ...p, price: numeric } : p));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const priceNum = parseFloat(newProduct.price) || 0;
    const oldPriceNum = parseFloat(newProduct.oldPrice) || priceNum * 1.1;

    const productToAdd = {
      id: 'prod-' + Date.now().toString().slice(-4),
      name: newProduct.name,
      category: newProduct.category,
      price: priceNum,
      oldPrice: oldPriceNum,
      image: newProduct.image || 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=400',
      specs: {
        cpu: newProduct.cpu || 'N/A',
        ram: newProduct.ram || 'N/A',
        storage: newProduct.storage || 'N/A',
        gpu: newProduct.gpu || 'N/A'
      },
      rating: 5.0,
      reviews: 0,
      tags: newProduct.tags ? newProduct.tags.split(',').map(t => t.trim()) : [newProduct.category],
      featured: false,
      inStock: newProduct.inStock
    };

    setStoreProducts(prev => [productToAdd, ...prev]);
    setIsAddingProduct(false);
    setNewProduct({
      name: '',
      category: 'laptop',
      price: '',
      oldPrice: '',
      cpu: '',
      ram: '',
      storage: '',
      gpu: '',
      inStock: true,
      tags: '',
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=400'
    });
  };

  // 3. Support Ticket handlers
  const handleReplyTicket = (e) => {
    e.preventDefault();
    if (!ticketReplyText.trim() || !selectedTicket) return;

    const updatedMsg = {
      sender: 'agent',
      agentName: 'Quản Trị Viên (Kỹ thuật hệ thống)',
      text: ticketReplyText,
      time: new Date().toLocaleString('vi-VN')
    };

    setTickets(prev => prev.map(t => {
      if (t.id === selectedTicket.id) {
        return {
          ...t,
          status: 'replied',
          messages: [...t.messages, updatedMsg]
        };
      }
      return t;
    }));

    setSelectedTicket(prev => ({
      ...prev,
      status: 'replied',
      messages: [...prev.messages, updatedMsg]
    }));

    setTicketReplyText('');
  };

  const closeTicket = (ticketId) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'closed' } : t));
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket(prev => ({ ...prev, status: 'closed' }));
    }
  };

  // 4. Warranty handlers
  const updateWarrantyStatus = (claimId, newStatus) => {
    setWarranties(prev => prev.map(w => w.id === claimId ? { ...w, status: newStatus } : w));
    if (selectedWarranty && selectedWarranty.id === claimId) {
      setSelectedWarranty(prev => ({ ...prev, status: newStatus }));
    }
  };

  // 5. Trade-in valuation handlers
  const submitTradeInValuation = (e) => {
    e.preventDefault();
    if (!offeredTradeInValuation || !selectedTradeIn) return;

    const value = parseInt(offeredTradeInValuation) || 0;
    setTradeins(prev => prev.map(t => t.id === selectedTradeIn.id ? { ...t, offeredPrice: value, status: 'valued' } : t));
    setSelectedTradeIn(prev => ({ ...prev, offeredPrice: value, status: 'valued' }));
    setOfferedTradeInValuation('');
  };

  // Filter calculations
  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.phone.includes(orderSearch)
  );

  const filteredInventoryProducts = storeProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
                          p.id.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Calculate statistics
  const totalRevenue = orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
  const outOfStockCount = storeProducts.filter(p => !p.inStock).length;
  const activeTicketsCount = tickets.filter(t => t.status === 'pending').length;

  return (
    <div style={{ padding: '30px 0', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Dashboard Title & Stats Overview */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Shield size={24} color="var(--color-primary-dim)" />
              <h2 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'Montserrat' }}>HỆ THỐNG QUẢN TRỊ VIÊN</h2>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
              Bảng điều khiển quản lý sản phẩm, đơn hàng và hỗ trợ khách hàng Kinetic Tech.
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('overview')} 
            className="btn btn-outline"
            style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <RefreshCw size={14} />
            Làm mới số liệu
          </button>
        </div>

        {/* Stats Strip */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '20px', 
          marginBottom: '30px' 
        }}>
          {/* Card 1: Revenue */}
          <div className="glass-panel-glow-blue" style={{ padding: '20px', borderRadius: 'var(--rounded-lg)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'rgba(0,123,255,0.15)', width: '46px', height: '46px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
              <DollarSign size={22} color="var(--color-primary-dim)" />
            </div>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', display: 'block', textTransform: 'uppercase', fontWeight: '700' }}>Doanh Thu (Hoàn thành)</span>
              <strong style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-primary-dim)', display: 'block', marginTop: '2px' }}>{formatVND(totalRevenue)}</strong>
            </div>
          </div>

          {/* Card 2: Pending Orders */}
          <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--rounded-lg)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'rgba(253,139,0,0.15)', width: '46px', height: '46px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingBag size={22} color="var(--color-secondary-dim)" />
            </div>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', display: 'block', textTransform: 'uppercase', fontWeight: '700' }}>Đơn hàng cần xử lý</span>
              <strong style={{ fontSize: '20px', fontWeight: '800', color: 'white', display: 'block', marginTop: '2px' }}>{pendingOrdersCount} đơn</strong>
            </div>
          </div>

          {/* Card 3: Out of Stock items */}
          <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--rounded-lg)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'rgba(255,76,76,0.15)', width: '46px', height: '46px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={22} color="#ffb4ab" />
            </div>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', display: 'block', textTransform: 'uppercase', fontWeight: '700' }}>Sản phẩm hết hàng</span>
              <strong style={{ fontSize: '20px', fontWeight: '800', color: outOfStockCount > 0 ? '#ffb4ab' : 'white', display: 'block', marginTop: '2px' }}>{outOfStockCount} sản phẩm</strong>
            </div>
          </div>

          {/* Card 4: Technical Tickets */}
          <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--rounded-lg)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'rgba(129,199,132,0.15)', width: '46px', height: '46px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageSquare size={22} color="#81c784" />
            </div>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', display: 'block', textTransform: 'uppercase', fontWeight: '700' }}>Yêu cầu hỗ trợ mở</span>
              <strong style={{ fontSize: '20px', fontWeight: '800', color: activeTicketsCount > 0 ? '#81c784' : 'white', display: 'block', marginTop: '2px' }}>{activeTicketsCount} ticket</strong>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs & Work Area */}
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '30px', alignItems: 'start' }} className="admin-grid">
          
          {/* Left Sidebar Navigation */}
          <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-outline)', padding: '8px 12px' }}>
              Menu quản lý
            </div>

            <button 
              onClick={() => { setActiveTab('overview'); setSelectedOrder(null); setSelectedTicket(null); setSelectedWarranty(null); setSelectedTradeIn(null); }}
              className="btn"
              style={{
                justifyContent: 'flex-start',
                padding: '10px 14px',
                fontSize: '13px',
                background: activeTab === 'overview' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'overview' ? 'white' : 'var(--color-on-surface)'
              }}
            >
              <TrendingUp size={16} />
              Tổng quan chung
            </button>

            <button 
              onClick={() => { setActiveTab('orders'); setSelectedOrder(null); setSelectedTicket(null); setSelectedWarranty(null); setSelectedTradeIn(null); }}
              className="btn"
              style={{
                justifyContent: 'flex-start',
                padding: '10px 14px',
                fontSize: '13px',
                background: activeTab === 'orders' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'orders' ? 'white' : 'var(--color-on-surface)'
              }}
            >
              <ShoppingBag size={16} />
              Đơn hàng ({orders.length})
            </button>

            <button 
              onClick={() => { setActiveTab('products'); setSelectedOrder(null); setSelectedTicket(null); setSelectedWarranty(null); setSelectedTradeIn(null); }}
              className="btn"
              style={{
                justifyContent: 'flex-start',
                padding: '10px 14px',
                fontSize: '13px',
                background: activeTab === 'products' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'products' ? 'white' : 'var(--color-on-surface)'
              }}
            >
              <Package size={16} />
              Kho sản phẩm ({storeProducts.length})
            </button>

            <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)', margin: '8px 0' }} />
            <div style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-outline)', padding: '8px 12px' }}>
              CSKH & Hậu mãi
            </div>

            <button 
              onClick={() => { setActiveTab('tickets'); setSelectedOrder(null); setSelectedTicket(null); setSelectedWarranty(null); setSelectedTradeIn(null); }}
              className="btn"
              style={{
                justifyContent: 'flex-start',
                padding: '10px 14px',
                fontSize: '13px',
                background: activeTab === 'tickets' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'tickets' ? 'white' : 'var(--color-on-surface)'
              }}
            >
              <MessageSquare size={16} />
              Hỗ trợ kỹ thuật ({tickets.length})
            </button>

            <button 
              onClick={() => { setActiveTab('warranties'); setSelectedOrder(null); setSelectedTicket(null); setSelectedWarranty(null); setSelectedTradeIn(null); }}
              className="btn"
              style={{
                justifyContent: 'flex-start',
                padding: '10px 14px',
                fontSize: '13px',
                background: activeTab === 'warranties' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'warranties' ? 'white' : 'var(--color-on-surface)'
              }}
            >
              <Wrench size={16} />
              Bảo hành ({warranties.length})
            </button>

            <button 
              onClick={() => { setActiveTab('tradein'); setSelectedOrder(null); setSelectedTicket(null); setSelectedWarranty(null); setSelectedTradeIn(null); }}
              className="btn"
              style={{
                justifyContent: 'flex-start',
                padding: '10px 14px',
                fontSize: '13px',
                background: activeTab === 'tradein' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'tradein' ? 'white' : 'var(--color-on-surface)'
              }}
            >
              <RefreshCw size={16} />
              Thu cũ đổi mới ({tradeins.length})
            </button>

            <button 
              onClick={() => { setActiveTab('feedbacks'); setSelectedOrder(null); setSelectedTicket(null); setSelectedWarranty(null); setSelectedTradeIn(null); }}
              className="btn"
              style={{
                justifyContent: 'flex-start',
                padding: '10px 14px',
                fontSize: '13px',
                background: activeTab === 'feedbacks' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'feedbacks' ? 'white' : 'var(--color-on-surface)'
              }}
            >
              <MessageSquare size={16} />
              Ý kiến & Góp ý ({feedbacks.length})
            </button>
          </div>

          {/* Right Work Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* TAB 1: OVERVIEW COMPONENT */}
            {activeTab === 'overview' && (
              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px' }}>
                  Tổng Quan Hoạt Động Gần Đây
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="overview-subgrid">
                  
                  {/* Left Column: Recent Orders */}
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ShoppingBag size={14} color="var(--color-primary-dim)" />
                      Đơn hàng mới nhận
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {orders.slice(0, 3).map(order => (
                        <div 
                          key={order.id} 
                          style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: 'var(--rounded)',
                            padding: '12px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <span style={{ fontWeight: '700', fontSize: '12px', display: 'block', color: 'white' }}>{order.id} - {order.customerName}</span>
                            <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>{order.date} | {order.paymentMethod}</span>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontWeight: '800', fontSize: '13px', display: 'block', color: 'var(--color-secondary-dim)' }}>{formatVND(order.total)}</span>
                            <span className="status-badge" style={{ 
                              fontSize: '9px',
                              background: order.status === 'completed' ? 'rgba(76,175,80,0.15)' : order.status === 'pending' ? 'rgba(253,139,0,0.15)' : 'rgba(0,123,255,0.15)',
                              color: order.status === 'completed' ? '#81c784' : order.status === 'pending' ? '#ffb77d' : '#adc7ff',
                              padding: '2px 6px'
                            }}>
                              {order.status === 'completed' ? 'Đã Giao' : order.status === 'pending' ? 'Chờ duyệt' : 'Đang xử lý'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Customer Inquiries */}
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MessageSquare size={14} color="#81c784" />
                      Yêu cầu hỗ trợ kỹ thuật
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {tickets.map(ticket => (
                        <div 
                          key={ticket.id} 
                          style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: 'var(--rounded)',
                            padding: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '700', fontSize: '12px', color: 'white' }}>#{ticket.id} - {ticket.customerName}</span>
                            <span className="status-badge" style={{ 
                              fontSize: '9px',
                              background: ticket.status === 'pending' ? 'rgba(255,76,76,0.15)' : 'rgba(76,175,80,0.15)',
                              color: ticket.status === 'pending' ? '#ffb4ab' : '#81c784',
                              padding: '1px 6px'
                            }}>
                              {ticket.status === 'pending' ? 'Chờ trả lời' : 'Đã phản hồi'}
                            </span>
                          </div>
                          <p style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {ticket.subject}
                          </p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--color-outline)' }}>
                            <span>Phân loại: {ticket.category}</span>
                            <span>Mức độ: <strong style={{ color: ticket.urgency === 'Gấp' ? '#ffb4ab' : 'var(--color-outline)' }}>{ticket.urgency}</strong></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Quick Quick Actions Section */}
                <div style={{ marginTop: '30px', background: 'rgba(0,123,255,0.03)', border: '1px solid rgba(0,123,255,0.1)', borderRadius: 'var(--rounded)', padding: '16px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: '800', marginBottom: '10px', color: 'var(--color-primary-dim)' }}>Lối tắt thao tác nhanh</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <button onClick={() => { setActiveTab('products'); setIsAddingProduct(true); }} className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '12px' }}>
                      <Plus size={14} />
                      Thêm sản phẩm mới
                    </button>
                    <button onClick={() => setActiveTab('orders')} className="btn btn-outline" style={{ padding: '8px 14px', fontSize: '12px' }}>
                      <ShoppingBag size={14} />
                      Xem danh sách đơn hàng
                    </button>
                    <button onClick={() => setActiveTab('tickets')} className="btn btn-outline" style={{ padding: '8px 14px', fontSize: '12px' }}>
                      <MessageSquare size={14} />
                      Trực chat kỹ thuật
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ORDERS MANAGEMENT */}
            {activeTab === 'orders' && (
              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Quản Lý Đơn Hàng</h3>
                  
                  {/* Search box */}
                  <div style={{ position: 'relative', width: '260px' }}>
                    <input 
                      type="text" 
                      placeholder="Tìm ID, Tên Khách Hàng, SĐT..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="form-input"
                      style={{ paddingLeft: '34px', fontSize: '12px' }}
                    />
                    <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-outline)' }} />
                  </div>
                </div>

                {/* Orders list table */}
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }} className="zebra-table">
                    <thead>
                      <tr style={{ background: 'var(--color-surface-container-high)' }}>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Mã Đơn Hàng</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Khách Hàng</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Thời Gian</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Tổng Tiền</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Thanh Toán</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Trạng Thái</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', textAlign: 'center' }}>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan="7" style={{ textAlign: 'center', color: 'var(--color-outline)', padding: '30px' }}>Không tìm thấy đơn hàng nào.</td>
                        </tr>
                      ) : (
                        filteredOrders.map(order => (
                          <tr key={order.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedOrder(order)}>
                            <td style={{ fontWeight: '700', color: 'var(--color-primary-dim)' }}>{order.id}</td>
                            <td>
                              <strong style={{ color: 'white', display: 'block', fontSize: '12px' }}>{order.customerName}</strong>
                              <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>{order.phone}</span>
                            </td>
                            <td>{order.date}</td>
                            <td style={{ fontWeight: '800', color: 'var(--color-secondary-dim)' }}>{formatVND(order.total)}</td>
                            <td style={{ fontSize: '12px' }}>{order.paymentMethod}</td>
                            <td>
                              <span className="status-badge" style={{
                                fontSize: '10px',
                                background: 
                                  order.status === 'completed' ? 'rgba(76,175,80,0.15)' : 
                                  order.status === 'cancelled' ? 'rgba(255,76,76,0.15)' :
                                  order.status === 'processing' ? 'rgba(0,123,255,0.15)' : 'rgba(253,139,0,0.15)',
                                color: 
                                  order.status === 'completed' ? '#81c784' : 
                                  order.status === 'cancelled' ? '#ffb4ab' :
                                  order.status === 'processing' ? '#adc7ff' : '#ffb77d',
                              }}>
                                {order.status === 'completed' && 'Đã giao'}
                                {order.status === 'cancelled' && 'Đã hủy'}
                                {order.status === 'processing' && 'Đang xử lý'}
                                {order.status === 'pending' && 'Chờ duyệt'}
                              </span>
                            </td>
                            <td onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center' }}>
                              <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                                {order.status === 'pending' && (
                                  <button onClick={() => updateOrderStatus(order.id, 'processing')} className="btn btn-primary" style={{ padding: '4px 8px', fontSize: '10px' }} title="Duyệt đơn hàng">
                                    Duyệt đơn
                                  </button>
                                )}
                                {order.status === 'processing' && (
                                  <button onClick={() => updateOrderStatus(order.id, 'completed')} className="btn" style={{ padding: '4px 8px', fontSize: '10px', background: '#388e3c', color: 'white' }} title="Hoàn thành đơn hàng">
                                    Hoàn thành
                                  </button>
                                )}
                                {['pending', 'processing'].includes(order.status) && (
                                  <button onClick={() => updateOrderStatus(order.id, 'cancelled')} className="btn" style={{ padding: '4px 8px', fontSize: '10px', background: '#d32f2f', color: 'white' }} title="Hủy đơn hàng">
                                    Hủy
                                  </button>
                                )}
                                {['completed', 'cancelled'].includes(order.status) && (
                                  <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Khóa</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Detail Modal overlay */}
                {selectedOrder && (
                  <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
                    <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '600px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden' }}>
                      {/* Header */}
                      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: '800' }}>Chi tiết đơn hàng {selectedOrder.id}</h4>
                        <button onClick={() => setSelectedOrder(null)} className="btn btn-ghost" style={{ padding: '4px', borderRadius: '50%' }}>
                          <X size={18} color="white" />
                        </button>
                      </div>

                      {/* Content */}
                      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '70vh', overflowY: 'auto' }}>
                        {/* Customer Info */}
                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: 'var(--rounded)', border: '1px solid rgba(255,255,255,0.04)' }}>
                          <h5 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-primary-dim)', textTransform: 'uppercase', marginBottom: '6px' }}>Thông tin giao nhận</h5>
                          <p style={{ fontSize: '12px', color: 'white', lineHeight: '1.6' }}>
                            Khách hàng: <strong>{selectedOrder.customerName}</strong><br />
                            SĐT: {selectedOrder.phone} | Email: {selectedOrder.email}<br />
                            Phương thức thanh toán: {selectedOrder.paymentMethod}
                          </p>
                        </div>

                        {/* Items List */}
                        <div>
                          <h5 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-primary-dim)', textTransform: 'uppercase', marginBottom: '8px' }}>Sản phẩm đã mua</h5>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {selectedOrder.items.map((it, idx) => (
                              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '6px' }}>
                                <span style={{ color: 'white' }}>{it.name} (x{it.quantity})</span>
                                <strong style={{ color: 'var(--color-secondary-dim)' }}>{formatVND(it.price * it.quantity)}</strong>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Order Total & Status action */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                          <div>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Tổng thanh toán:</span>
                            <span style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: 'var(--color-secondary-dim)' }}>{formatVND(selectedOrder.total)}</span>
                          </div>

                          <div style={{ display: 'flex', gap: '8px' }}>
                            {selectedOrder.status === 'pending' && (
                              <button onClick={() => updateOrderStatus(selectedOrder.id, 'processing')} className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '12px' }}>
                                Duyệt đơn
                              </button>
                            )}
                            {selectedOrder.status === 'processing' && (
                              <button onClick={() => updateOrderStatus(selectedOrder.id, 'completed')} className="btn" style={{ padding: '8px 14px', fontSize: '12px', background: '#388e3c', color: 'white' }}>
                                Đã giao hàng
                              </button>
                            )}
                            {['pending', 'processing'].includes(selectedOrder.status) && (
                              <button onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')} className="btn" style={{ padding: '8px 14px', fontSize: '12px', background: '#d32f2f', color: 'white' }}>
                                Hủy đơn
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: PRODUCT INVENTORY */}
            {activeTab === 'products' && (
              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                
                {/* Header Controls */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Quản Lý Kho Sản Phẩm</h3>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {/* Category Filter */}
                    <select 
                      value={selectedCategoryFilter} 
                      onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                      className="form-input"
                      style={{ width: '150px', fontSize: '12px', padding: '8px' }}
                    >
                      <option value="all">Tất cả danh mục</option>
                      <option value="laptop">Laptop</option>
                      <option value="điện thoại">Điện thoại</option>
                      <option value="gaming gear">Gaming Gear</option>
                      <option value="linh kiện">Linh kiện</option>
                    </select>

                    {/* Search box */}
                    <div style={{ position: 'relative', width: '220px' }}>
                      <input 
                        type="text" 
                        placeholder="Tìm theo tên sản phẩm..."
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        className="form-input"
                        style={{ paddingLeft: '34px', fontSize: '12px', padding: '8px' }}
                      />
                      <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-outline)' }} />
                    </div>

                    {/* Add button */}
                    <button 
                      onClick={() => setIsAddingProduct(true)}
                      className="btn btn-secondary" 
                      style={{ padding: '8px 14px', fontSize: '12px' }}
                    >
                      <Plus size={14} />
                      Thêm sản phẩm
                    </button>
                  </div>
                </div>

                {/* Adding Product Form Overlay */}
                {isAddingProduct && (
                  <div className="modal-overlay" onClick={() => setIsAddingProduct(false)}>
                    <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '560px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden' }}>
                      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: '800' }}>Tạo sản phẩm mới</h4>
                        <button onClick={() => setIsAddingProduct(false)} className="btn btn-ghost" style={{ padding: '4px', borderRadius: '50%' }}>
                          <X size={18} color="white" />
                        </button>
                      </div>

                      <form onSubmit={handleAddProduct} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '75vh', overflowY: 'auto' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: 'var(--color-outline)', marginBottom: '4px' }}>Tên Sản Phẩm *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Ví dụ: Laptop Asus ROG Strix..."
                            value={newProduct.name}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                            className="form-input"
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: 'var(--color-outline)', marginBottom: '4px' }}>Danh Mục *</label>
                            <select 
                              value={newProduct.category}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                              className="form-input"
                            >
                              <option value="laptop">Laptop</option>
                              <option value="điện thoại">Điện thoại</option>
                              <option value="gaming gear">Gaming Gear</option>
                              <option value="linh kiện">Linh kiện</option>
                            </select>
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: 'var(--color-outline)', marginBottom: '4px' }}>Tình Trạng Kho</label>
                            <select 
                              value={newProduct.inStock ? 'true' : 'false'}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, inStock: e.target.value === 'true' }))}
                              className="form-input"
                            >
                              <option value="true">Còn hàng</option>
                              <option value="false">Hết hàng</option>
                            </select>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: 'var(--color-outline)', marginBottom: '4px' }}>Giá Bán (VND) *</label>
                            <input 
                              type="number" 
                              required
                              placeholder="Ví dụ: 15900000"
                              value={newProduct.price}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                              className="form-input"
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: 'var(--color-outline)', marginBottom: '4px' }}>Giá Cũ (Gốc)</label>
                            <input 
                              type="number" 
                              placeholder="Ví dụ: 17900000"
                              value={newProduct.oldPrice}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, oldPrice: e.target.value }))}
                              className="form-input"
                            />
                          </div>
                        </div>

                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
                          <span style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--color-primary-dim)', marginBottom: '8px' }}>Thông số cấu hình kỹ thuật (Không bắt buộc)</span>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <input 
                              type="text" 
                              placeholder="CPU (ví dụ: Intel i7)"
                              value={newProduct.cpu}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, cpu: e.target.value }))}
                              className="form-input"
                            />
                            <input 
                              type="text" 
                              placeholder="RAM (ví dụ: 16GB)"
                              value={newProduct.ram}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, ram: e.target.value }))}
                              className="form-input"
                            />
                            <input 
                              type="text" 
                              placeholder="Ổ Cứng (ví dụ: 512GB SSD)"
                              value={newProduct.storage}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, storage: e.target.value }))}
                              className="form-input"
                            />
                            <input 
                              type="text" 
                              placeholder="VGA / GPU (ví dụ: RTX 4060)"
                              value={newProduct.gpu}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, gpu: e.target.value }))}
                              className="form-input"
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: 'var(--color-outline)', marginBottom: '4px' }}>Mã Tags (cách nhau bằng dấu phẩy)</label>
                          <input 
                            type="text" 
                            placeholder="Ví dụ: Gaming, RTX4060, Intel"
                            value={newProduct.tags}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, tags: e.target.value }))}
                            className="form-input"
                          />
                        </div>

                        <button type="submit" className="btn btn-secondary" style={{ width: '100%', padding: '12px', fontWeight: '700', marginTop: '10px' }}>
                          HOÀN TẤT THÊM SẢN PHẨM
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* Product List Table */}
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }} className="zebra-table">
                    <thead>
                      <tr style={{ background: 'var(--color-surface-container-high)' }}>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Ảnh</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Tên Sản Phẩm</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Danh Mục</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Giá Hiện Tại</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Tình Trạng Kho</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', textAlign: 'center' }}>Điều Chỉnh Giá</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', textAlign: 'center' }}>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInventoryProducts.length === 0 ? (
                        <tr>
                          <td colSpan="7" style={{ textAlign: 'center', color: 'var(--color-outline)', padding: '30px' }}>Không có sản phẩm nào.</td>
                        </tr>
                      ) : (
                        filteredInventoryProducts.map(prod => (
                          <tr key={prod.id}>
                            <td>
                              <img src={prod.image} alt={prod.name} style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'contain', background: 'rgba(255,255,255,0.02)' }} />
                            </td>
                            <td>
                              <strong style={{ color: 'white', display: 'block', fontSize: '12px' }}>{prod.name}</strong>
                              <span style={{ fontSize: '10px', color: 'var(--color-outline)' }}>ID: {prod.id}</span>
                            </td>
                            <td style={{ textTransform: 'capitalize' }}>{prod.category}</td>
                            <td style={{ fontWeight: '800', color: 'var(--color-secondary-dim)', fontSize: '13px' }}>
                              <input 
                                type="text"
                                value={prod.price}
                                onChange={(e) => handleManualPriceChange(prod.id, e.target.value)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  borderBottom: '1px dashed var(--color-outline)',
                                  color: 'var(--color-secondary-dim)',
                                  fontWeight: '800',
                                  width: '90px',
                                  outline: 'none',
                                  fontSize: '13px'
                                }}
                              />
                            </td>
                            <td>
                              <button 
                                onClick={() => toggleStock(prod.id)}
                                className="status-badge"
                                style={{
                                  border: 'none',
                                  cursor: 'pointer',
                                  fontSize: '9px',
                                  background: prod.inStock ? 'rgba(76,175,80,0.15)' : 'rgba(255,76,76,0.15)',
                                  color: prod.inStock ? '#81c784' : '#ffb4ab'
                                }}
                              >
                                {prod.inStock ? 'Còn hàng' : 'Hết hàng'}
                              </button>
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                                <button onClick={() => updateProductPrice(prod.id, -5)} className="btn btn-outline" style={{ padding: '2px 6px', fontSize: '9px' }}>-5%</button>
                                <button onClick={() => updateProductPrice(prod.id, 5)} className="btn btn-outline" style={{ padding: '2px 6px', fontSize: '9px' }}>+5%</button>
                              </div>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <button 
                                onClick={() => setStoreProducts(prev => prev.filter(p => p.id !== prod.id))}
                                className="btn btn-ghost" 
                                style={{ padding: '6px', color: 'var(--color-error)' }}
                                title="Xóa sản phẩm"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* TAB 4: SUPPORT TICKETS */}
            {activeTab === 'tickets' && (
              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>Hỗ Trợ Kỹ Thuật (Hệ thống Ticket)</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="tickets-subgrid">
                  
                  {/* Left Column: List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '500px', overflowY: 'auto', paddingRight: '4px' }}>
                    {tickets.map(ticket => (
                      <div 
                        key={ticket.id}
                        onClick={() => setSelectedTicket(ticket)}
                        style={{
                          background: selectedTicket && selectedTicket.id === ticket.id ? 'rgba(0,123,255,0.06)' : 'rgba(255,255,255,0.01)',
                          border: `1px solid ${selectedTicket && selectedTicket.id === ticket.id ? 'var(--color-primary)' : 'rgba(255,255,255,0.04)'}`,
                          borderRadius: 'var(--rounded)',
                          padding: '14px',
                          cursor: 'pointer',
                          transition: 'var(--transition-smooth)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-primary-dim)' }}>#{ticket.id}</span>
                          <span className="status-badge" style={{
                            fontSize: '9px',
                            background: ticket.status === 'pending' ? 'rgba(255,76,76,0.15)' : ticket.status === 'replied' ? 'rgba(0,123,255,0.15)' : 'rgba(76,175,80,0.15)',
                            color: ticket.status === 'pending' ? '#ffb4ab' : ticket.status === 'replied' ? '#adc7ff' : '#81c784'
                          }}>
                            {ticket.status === 'pending' && 'Chờ phản hồi'}
                            {ticket.status === 'replied' && 'Đã phản hồi'}
                            {ticket.status === 'closed' && 'Đã đóng'}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'white', marginBottom: '4px' }}>{ticket.subject}</h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--color-outline)' }}>
                          <span>Khách: {ticket.customerName}</span>
                          <span>Độ khẩn: <strong style={{ color: ticket.urgency === 'Gấp' ? '#ffb4ab' : 'var(--color-outline)' }}>{ticket.urgency}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column: Chat Box Details */}
                  <div className="glass-panel" style={{ borderRadius: 'var(--rounded)', padding: '16px', display: 'flex', flexDirection: 'column', height: '500px', background: 'rgba(5, 13, 24, 0.15)' }}>
                    {selectedTicket ? (
                      <>
                        {/* Box Header */}
                        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'white' }}>#{selectedTicket.id} - {selectedTicket.subject}</h4>
                            <span style={{ fontSize: '10px', color: 'var(--color-outline)' }}>Danh mục: {selectedTicket.category}</span>
                          </div>
                          {selectedTicket.status !== 'closed' && (
                            <button onClick={() => closeTicket(selectedTicket.id)} className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '10px', color: 'var(--color-error)', borderColor: 'rgba(255,76,76,0.2)' }}>
                              Đóng Ticket
                            </button>
                          )}
                        </div>

                        {/* Messages Queue */}
                        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '4px', marginBottom: '12px' }}>
                          {selectedTicket.messages.map((msg, index) => {
                            const isAgent = msg.sender === 'agent';
                            return (
                              <div 
                                key={index} 
                                style={{
                                  alignSelf: isAgent ? 'flex-end' : 'flex-start',
                                  maxWidth: '85%',
                                  background: isAgent ? 'rgba(0, 123, 255, 0.1)' : 'rgba(255,255,255,0.03)',
                                  border: `1px solid ${isAgent ? 'rgba(0,123,255,0.2)' : 'rgba(255,255,255,0.05)'}`,
                                  borderRadius: isAgent ? '10px 0 10px 10px' : '0 10px 10px 10px',
                                  padding: '10px 12px'
                                }}
                              >
                                <span style={{ fontSize: '9px', fontWeight: '700', display: 'block', color: isAgent ? 'var(--color-primary-dim)' : 'var(--color-secondary-dim)', marginBottom: '2px' }}>
                                  {isAgent ? (msg.agentName || 'Kỹ thuật viên') : selectedTicket.customerName}
                                </span>
                                <p style={{ fontSize: '12px', color: 'white', lineHeight: '1.4' }}>{msg.text}</p>
                                <span style={{ fontSize: '9px', color: 'var(--color-outline)', display: 'block', textAlign: 'right', marginTop: '4px' }}>{msg.time}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Reply Form */}
                        {selectedTicket.status !== 'closed' ? (
                          <form onSubmit={handleReplyTicket} style={{ display: 'flex', gap: '8px' }}>
                            <input 
                              type="text" 
                              placeholder="Nhập nội dung phản hồi cho khách..."
                              value={ticketReplyText}
                              onChange={(e) => setTicketReplyText(e.target.value)}
                              className="form-input"
                              style={{ fontSize: '12px', padding: '8px 12px' }}
                            />
                            <button type="submit" className="btn btn-primary" style={{ padding: '8px 14px' }}>
                              Gửi
                            </button>
                          </form>
                        ) : (
                          <div style={{ textAlign: 'center', padding: '10px', color: 'var(--color-outline)', fontSize: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                            Ticket này đã được giải quyết và đóng lại.
                          </div>
                        )}
                      </>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-outline)', gap: '12px' }}>
                        <MessageSquare size={36} strokeWidth={1} />
                        <p style={{ fontSize: '13px' }}>Chọn một ticket từ danh sách để xem chi tiết và phản hồi khách hàng.</p>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}

            {/* TAB 5: WARRANTY CLAIMS */}
            {activeTab === 'warranties' && (
              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>Quản Lý Yêu Cầu Bảo Hành</h3>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }} className="zebra-table">
                    <thead>
                      <tr style={{ background: 'var(--color-surface-container-high)' }}>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Mã yêu cầu</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Khách hàng</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Sản Phẩm & Serial</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Mô tả lỗi</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Ngày nhận</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Trạng thái</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', textAlign: 'center' }}>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {warranties.map(claim => (
                        <tr key={claim.id}>
                          <td style={{ fontWeight: '700', color: 'var(--color-primary-dim)' }}>{claim.id}</td>
                          <td>
                            <strong style={{ color: 'white', display: 'block' }}>{claim.customerName}</strong>
                            <span style={{ fontSize: '10px', color: 'var(--color-outline)' }}>{claim.phone}</span>
                          </td>
                          <td>
                            <strong style={{ color: 'white', display: 'block', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={claim.productName}>{claim.productName}</strong>
                            <span style={{ fontSize: '10px', color: 'var(--color-secondary-dim)' }}>S/N: {claim.serialNumber}</span>
                          </td>
                          <td>
                            <p style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={claim.issue}>
                              {claim.issue}
                            </p>
                          </td>
                          <td>{claim.dateCreated}</td>
                          <td>
                            <span className="status-badge" style={{
                              fontSize: '9px',
                              background: 
                                claim.status === 'returned' ? 'rgba(76,175,80,0.15)' : 
                                claim.status === 'checking' ? 'rgba(253,139,0,0.15)' : 'rgba(0,123,255,0.15)',
                              color: 
                                claim.status === 'returned' ? '#81c784' : 
                                claim.status === 'checking' ? '#ffb77d' : '#adc7ff'
                            }}>
                              {claim.status === 'checking' && 'Đang kiểm tra'}
                              {claim.status === 'repairing' && 'Đang sửa chữa'}
                              {claim.status === 'returned' && 'Đã trả máy'}
                            </span>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                              {claim.status === 'checking' && (
                                <button onClick={() => updateWarrantyStatus(claim.id, 'repairing')} className="btn btn-primary" style={{ padding: '4px 6px', fontSize: '9px' }}>
                                  Nhận sửa
                                </button>
                              )}
                              {claim.status === 'repairing' && (
                                <button onClick={() => updateWarrantyStatus(claim.id, 'returned')} className="btn" style={{ padding: '4px 6px', fontSize: '9px', background: '#388e3c', color: 'white' }}>
                                  Trả khách
                                </button>
                              )}
                              {claim.status === 'returned' && (
                                <span style={{ color: 'var(--color-outline)', fontSize: '10px' }}>Hoàn tất</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 6: TRADE IN MANAGEMENT */}
            {activeTab === 'tradein' && (
              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>Thu Cũ Đổi Mới (Trade-in)</h3>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }} className="zebra-table">
                    <thead>
                      <tr style={{ background: 'var(--color-surface-container-high)' }}>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Mã Yêu Cầu</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Khách Hàng</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Thiết Bị Cũ</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Sản Phẩm Muốn Đổi</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Chi tiết tình trạng</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Mức giá thu mua</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Trạng Thái</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', textAlign: 'center' }}>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tradeins.map(req => (
                        <tr key={req.id}>
                          <td style={{ fontWeight: '700', color: 'var(--color-primary-dim)' }}>{req.id}</td>
                          <td>
                            <strong style={{ color: 'white', display: 'block' }}>{req.customerName}</strong>
                            <span style={{ fontSize: '10px', color: 'var(--color-outline)' }}>{req.phone}</span>
                          </td>
                          <td>
                            <strong style={{ color: 'white', display: 'block', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={req.oldDevice}>{req.oldDevice}</strong>
                          </td>
                          <td>
                            <span style={{ color: 'var(--color-primary-dim)' }}>{req.targetDevice}</span>
                          </td>
                          <td style={{ color: 'var(--color-on-surface-variant)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={req.conditionDesc}>
                            {req.conditionDesc}
                          </td>
                          <td style={{ fontWeight: '700', color: 'var(--color-secondary-dim)' }}>
                            {req.offeredPrice > 0 ? formatVND(req.offeredPrice) : 'Chờ thẩm định'}
                          </td>
                          <td>
                            <span className="status-badge" style={{
                              fontSize: '9px',
                              background: 
                                req.status === 'valued' ? 'rgba(0,123,255,0.15)' : 
                                req.status === 'completed' ? 'rgba(76,175,80,0.15)' : 'rgba(253,139,0,0.15)',
                              color: 
                                req.status === 'valued' ? '#adc7ff' : 
                                req.status === 'completed' ? '#81c784' : '#ffb77d'
                            }}>
                              {req.status === 'pending' && 'Chờ thẩm định'}
                              {req.status === 'valued' && 'Đã báo giá'}
                              {req.status === 'completed' && 'Hoàn thành đổi'}
                            </span>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                              {req.status === 'pending' && (
                                <button onClick={() => setSelectedTradeIn(req)} className="btn btn-primary" style={{ padding: '4px 6px', fontSize: '9px' }}>
                                  Thẩm định
                                </button>
                              )}
                              {req.status === 'valued' && (
                                <button 
                                  onClick={() => setTradeins(prev => prev.map(t => t.id === req.id ? { ...t, status: 'completed' } : t))}
                                  className="btn" 
                                  style={{ padding: '4px 6px', fontSize: '9px', background: '#388e3c', color: 'white' }}
                                >
                                  Hoàn tất đổi
                                </button>
                              )}
                              {req.status === 'completed' && (
                                <span style={{ color: 'var(--color-outline)', fontSize: '10px' }}>Hoàn tất</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Valuation Modal overlay */}
                {selectedTradeIn && (
                  <div className="modal-overlay" onClick={() => setSelectedTradeIn(null)}>
                    <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '440px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden' }}>
                      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '800' }}>Thẩm định & Báo giá thu cũ cho {selectedTradeIn.customerName}</h4>
                        <button onClick={() => setSelectedTradeIn(null)} className="btn btn-ghost" style={{ padding: '4px', borderRadius: '50%' }}>
                          <X size={18} color="white" />
                        </button>
                      </div>

                      <form onSubmit={submitTradeInValuation} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                          <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Mẫu máy thu cũ:</span>
                          <strong style={{ display: 'block', fontSize: '13px', color: 'white', marginTop: '2px' }}>{selectedTradeIn.oldDevice}</strong>
                        </div>

                        <div>
                          <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Thông tin sử dụng & tình trạng:</span>
                          <p style={{ fontSize: '12px', color: 'white', marginTop: '2px', lineHeight: '1.4' }}>{selectedTradeIn.conditionDesc}</p>
                        </div>

                        {selectedTradeIn.selfValuation > 0 && (
                          <div>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Giá mong muốn:</span>
                            <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-secondary-dim)', marginTop: '2px' }}>{formatVND(selectedTradeIn.selfValuation)}</strong>
                          </div>
                        )}

                        {selectedTradeIn.attachedImage && (
                          <div style={{ marginTop: '4px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', display: 'block', marginBottom: '4px' }}>Hình ảnh thực tế đính kèm:</span>
                            <img 
                              src={selectedTradeIn.attachedImage} 
                              alt="Ảnh thực tế linh kiện cũ" 
                              style={{ width: '100%', maxHeight: '180px', objectFit: 'contain', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', background: '#050d18' }} 
                            />
                          </div>
                        )}

                        <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '4px 0' }} />

                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: 'var(--color-outline)', marginBottom: '4px' }}>Mức giá thu mua đề nghị (VND) *</label>
                          <input 
                            type="number"
                            required
                            placeholder="Ví dụ: 8500000"
                            value={offeredTradeInValuation}
                            onChange={(e) => setOfferedTradeInValuation(e.target.value)}
                            className="form-input"
                          />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px', marginTop: '10px' }}>
                          Gửi báo giá thẩm định cho khách
                        </button>
                      </form>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB 7: FEEDBACKS MANAGEMENT */}
            {activeTab === 'feedbacks' && (
              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px' }}>
                  Ý Kiến & Góp Ý Từ Khách Hàng
                </h3>
                
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }} className="zebra-table">
                    <thead>
                      <tr style={{ background: 'var(--color-surface-container-high)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Mã Góp Ý</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Khách Hàng</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Tiêu Đề</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Nội Dung Chi Tiết</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Thời Gian</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Trạng Thái</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', textAlign: 'center' }}>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedbacks.length === 0 ? (
                        <tr>
                          <td colSpan="7" style={{ textAlign: 'center', color: 'var(--color-outline)', padding: '30px' }}>Không có ý kiến đóng góp nào từ khách hàng.</td>
                        </tr>
                      ) : (
                        feedbacks.map(fb => (
                          <tr key={fb.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <td style={{ fontWeight: '700', color: 'var(--color-primary-dim)', padding: '12px 16px' }}>{fb.id}</td>
                            <td style={{ padding: '12px 16px' }}>
                              <strong style={{ color: 'white', display: 'block' }}>{fb.fullName}</strong>
                              <span style={{ fontSize: '10px', color: 'var(--color-outline)' }}>{fb.email}</span>
                            </td>
                            <td style={{ fontWeight: '600', color: 'white', padding: '12px 16px' }}>{fb.title}</td>
                            <td style={{ padding: '12px 16px' }}>
                              <p style={{ maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={fb.content}>
                                {fb.content}
                              </p>
                            </td>
                            <td style={{ padding: '12px 16px' }}>{fb.date}</td>
                            <td style={{ padding: '12px 16px' }}>
                              <span className="status-badge" style={{
                                fontSize: '10px',
                                background: fb.status === 'processed' ? 'rgba(76,175,80,0.15)' : 'rgba(253,139,0,0.15)',
                                color: fb.status === 'processed' ? '#81c784' : '#ffb77d',
                                padding: '2px 6px'
                              }}>
                                {fb.status === 'processed' ? 'Đã xử lý' : 'Chờ xử lý'}
                              </span>
                            </td>
                            <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                              <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                                {fb.status === 'pending' && (
                                  <button 
                                    onClick={() => setFeedbacks(prev => prev.map(f => f.id === fb.id ? { ...f, status: 'processed' } : f))}
                                    className="btn btn-primary" 
                                    style={{ padding: '4px 8px', fontSize: '10px' }}
                                  >
                                    Duyệt
                                  </button>
                                )}
                                <button 
                                  onClick={() => setFeedbacks(prev => prev.filter(f => f.id !== fb.id))}
                                  className="btn" 
                                  style={{ padding: '4px 8px', fontSize: '10px', background: '#d32f2f', color: 'white' }}
                                  title="Xóa"
                                >
                                  Xóa
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

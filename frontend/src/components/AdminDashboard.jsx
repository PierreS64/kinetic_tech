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
  Edit2,
  Tag
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
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'orders', 'products', 'tickets', 'warranties', 'tradein', 'feedbacks', 'promotions'

  // Modal & Selection States
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Promotions States
  const [promotions, setPromotions] = useState([
    {
      id: 'PROM-001',
      name: 'Mừng hè rực rỡ 2026',
      discountPercent: 10,
      startDate: '2026-06-01',
      endDate: '2026-06-30',
      salesCount: 15,
      revenue: 45000000,
      productIds: ['lap-01', 'phone-01']
    },
    {
      id: 'PROM-002',
      name: 'Bão Deal Hi-End PC',
      discountPercent: 15,
      startDate: '2026-06-10',
      endDate: '2026-06-20',
      salesCount: 5,
      revenue: 120000000,
      productIds: ['comp-02', 'gear-01']
    }
  ]);

  const [isAddingPromo, setIsAddingPromo] = useState(false);
  const [newPromo, setNewPromo] = useState({
    name: '',
    discountPercent: 10,
    startDate: '2026-06-15',
    endDate: '2026-06-30'
  });

  const [selectedPromoForEdit, setSelectedPromoForEdit] = useState(null);
  const [productToAddToPromo, setProductToAddToPromo] = useState('');

  const handleAddPromo = (e) => {
    e.preventDefault();
    if (!newPromo.name) return;
    const promoToAdd = {
      id: 'PROM-' + Date.now().toString().slice(-3),
      name: newPromo.name,
      discountPercent: Number(newPromo.discountPercent) || 0,
      startDate: newPromo.startDate,
      endDate: newPromo.endDate,
      salesCount: 0,
      revenue: 0,
      productIds: []
    };
    setPromotions(prev => [...prev, promoToAdd]);
    setIsAddingPromo(false);
    setNewPromo({
      name: '',
      discountPercent: 10,
      startDate: '2026-06-15',
      endDate: '2026-06-30'
    });
  };

  const handleDeletePromo = (id) => {
    setPromotions(prev => prev.filter(p => p.id !== id));
    if (selectedPromoForEdit && selectedPromoForEdit.id === id) {
      setSelectedPromoForEdit(null);
    }
  };

  const handleAddProductToPromo = (promoId, prodId) => {
    if (!prodId) return;
    setPromotions(prev => prev.map(promo => {
      if (promo.id === promoId) {
        if (promo.productIds.includes(prodId)) return promo;
        return {
          ...promo,
          productIds: [...promo.productIds, prodId]
        };
      }
      return promo;
    }));
    if (selectedPromoForEdit && selectedPromoForEdit.id === promoId) {
      setSelectedPromoForEdit(prev => {
        if (prev.productIds.includes(prodId)) return prev;
        return {
          ...prev,
          productIds: [...prev.productIds, prodId]
        };
      });
    }
  };

  const handleRemoveProductFromPromo = (promoId, prodId) => {
    setPromotions(prev => prev.map(promo => {
      if (promo.id === promoId) {
        return {
          ...promo,
          productIds: promo.productIds.filter(id => id !== prodId)
        };
      }
      return promo;
    }));
    if (selectedPromoForEdit && selectedPromoForEdit.id === promoId) {
      setSelectedPromoForEdit(prev => ({
        ...prev,
        productIds: prev.productIds.filter(id => id !== prodId)
      }));
    }
  };

  const handlePromoProductPriceChange = (prodId, rawValue) => {
    const numeric = parseInt(rawValue.replace(/\D/g, '')) || 0;
    setStoreProducts(prev => prev.map(p => p.id === prodId ? { ...p, price: numeric } : p));
  };
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
  const [inventorySort, setInventorySort] = useState('default'); // 'default' | 'sold-desc' | 'sold-asc'

  // Price confirm modal state
  const [priceConfirmModal, setPriceConfirmModal] = useState(null); // { prodId, pendingPrice, originalPrice }
  const [tempPriceInput, setTempPriceInput] = useState({});

  // Detailed Modal states
  const [detailedItem, setDetailedItem] = useState(null); // Product/Warranty/TradeIn/Feedback
  const [productEditDraft, setProductEditDraft] = useState(null); // local copy of product being edited
  const [productConfirmModal, setProductConfirmModal] = useState(null); // confirmation dialog state for product edits

  const textColor = theme === 'light' ? '#0f172a' : '#ffffff';

  // Mock "Đã bán tháng này" — stable random seeded by product id
  const getSoldThisMonth = (prodId) => {
    let hash = 0;
    for (let i = 0; i < prodId.length; i++) hash = prodId.charCodeAt(i) + ((hash << 5) - hash);
    return Math.abs(hash % 120) + 1;
  };

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

  // Detailed Modal Helpers
  const handleInputBlurOrEnter = (e) => {
    if (e.type === 'blur' || e.key === 'Enter') {
      const isChanged = JSON.stringify(productEditDraft) !== JSON.stringify(detailedItem);
      if (isChanged) {
        setProductConfirmModal(true);
      }
    }
  };

  const handleCloseDetailedModal = () => {
    if (detailedItem && detailedItem.type === 'product' && productEditDraft) {
      const isChanged = JSON.stringify(productEditDraft) !== JSON.stringify(detailedItem);
      if (isChanged) {
        setProductConfirmModal(true);
        return;
      }
    }
    setDetailedItem(null);
    setProductEditDraft(null);
  };

  // Filter calculations
  const filteredOrders = orders.filter(o =>
    o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.phone.includes(orderSearch)
  );

  let filteredInventoryProducts = storeProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.id.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });
  if (inventorySort === 'sold-desc') {
    filteredInventoryProducts = [...filteredInventoryProducts].sort((a, b) => getSoldThisMonth(b.id) - getSoldThisMonth(a.id));
  } else if (inventorySort === 'sold-asc') {
    filteredInventoryProducts = [...filteredInventoryProducts].sort((a, b) => getSoldThisMonth(a.id) - getSoldThisMonth(b.id));
  }

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
              <strong style={{ fontSize: '20px', fontWeight: '800', color: '#fd8b00', display: 'block', marginTop: '2px' }}>{pendingOrdersCount} đơn</strong>
            </div>
          </div>

          {/* Card 3: Out of Stock items */}
          <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--rounded-lg)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'rgba(255,76,76,0.15)', width: '46px', height: '46px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={22} color="#ffb4ab" />
            </div>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', display: 'block', textTransform: 'uppercase', fontWeight: '700' }}>Sản phẩm hết hàng</span>
              <strong style={{ fontSize: '20px', fontWeight: '800', color: '#d32f2f', display: 'block', marginTop: '2px' }}>{outOfStockCount} sản phẩm</strong>
            </div>
          </div>

          {/* Card 4: Technical Tickets */}
          <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--rounded-lg)', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'rgba(129,199,132,0.15)', width: '46px', height: '46px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageSquare size={22} color="#81c784" />
            </div>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', display: 'block', textTransform: 'uppercase', fontWeight: '700' }}>Yêu cầu hỗ trợ mở</span>
              <strong style={{ fontSize: '20px', fontWeight: '800', color: '#388e3c', display: 'block', marginTop: '2px' }}>{activeTicketsCount} ticket</strong>
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

            <button
              onClick={() => { setActiveTab('promotions'); setSelectedOrder(null); setSelectedTicket(null); setSelectedWarranty(null); setSelectedTradeIn(null); setSelectedPromoForEdit(null); }}
              className="btn"
              style={{
                justifyContent: 'flex-start',
                padding: '10px 14px',
                fontSize: '13px',
                background: activeTab === 'promotions' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'promotions' ? 'white' : 'var(--color-on-surface)'
              }}
            >
              <Tag size={16} />
              Khuyến mãi ({promotions.length})
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
                            <span style={{ fontWeight: '700', fontSize: '12px', display: 'block', color: theme === 'light' ? '#0f172a' : 'white' }}>{order.id} - {order.customerName}</span>
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
                            <span style={{ fontWeight: '700', fontSize: '12px', color: theme === 'light' ? '#0f172a' : 'white' }}>#{ticket.id} - {ticket.customerName}</span>
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
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }} className="zebra-table">
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
                              <strong style={{ color: theme === 'light' ? '#0f172a' : 'white', display: 'block', fontSize: '13px' }}>{order.customerName}</strong>
                              <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>{order.phone}</span>
                            </td>
                            <td style={{ maxWidth: '110px', color: theme === 'light' ? '#0f172a' : 'inherit' }}>{order.date}</td>
                            <td style={{ fontWeight: '800', color: 'var(--color-secondary-dim)' }}>{formatVND(order.total)}</td>
                            <td style={{ maxWidth: '90px', fontSize: '12px', color: theme === 'light' ? '#0f172a' : 'inherit' }}>{order.paymentMethod}</td>
                            <td>
                              <span className="status-badge" style={{
                                fontSize: '10px',
                                fontWeight: 'bold',
                                background:
                                  order.status === 'completed' ? (theme === 'light' ? '#4caf50' : 'rgba(76,175,80,0.15)') :
                                    order.status === 'cancelled' ? (theme === 'light' ? '#f44336' : 'rgba(255,76,76,0.15)') :
                                      order.status === 'processing' ? (theme === 'light' ? '#2196f3' : 'rgba(0,123,255,0.15)') : (theme === 'light' ? '#ff9800' : 'rgba(253,139,0,0.15)'),
                                color:
                                  order.status === 'completed' ? '#ffffff' :
                                    order.status === 'cancelled' ? '#ffffff' :
                                      order.status === 'processing' ? '#ffffff' : '#ffffff',
                                border: theme === 'light' ? 'none' : '1px solid currentColor',
                                padding: '4px 8px',
                                borderRadius: '4px'
                              }}>
                                {order.status === 'completed' && 'Đã giao'}
                                {order.status === 'cancelled' && 'Đã hủy'}
                                {order.status === 'processing' && 'Đang xử lý'}
                                {order.status === 'pending' && 'Chờ duyệt'}
                              </span>
                            </td>
                            <td onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', justifyContent: 'center' }}>
                                {order.status === 'pending' && (
                                  <button onClick={() => updateOrderStatus(order.id, 'processing')} className="btn btn-primary" style={{ padding: '4px 8px', fontSize: '11px', width: '90px' }} title="Duyệt đơn hàng">
                                    Duyệt đơn
                                  </button>
                                )}
                                {order.status === 'processing' && (
                                  <button onClick={() => updateOrderStatus(order.id, 'completed')} className="btn" style={{ padding: '4px 8px', fontSize: '11px', width: '90px', background: '#388e3c', color: 'white' }} title="Hoàn thành đơn hàng">
                                    Hoàn thành
                                  </button>
                                )}
                                {['pending', 'processing'].includes(order.status) && (
                                  <button onClick={() => updateOrderStatus(order.id, 'cancelled')} className="btn" style={{ padding: '4px 8px', fontSize: '11px', width: '90px', background: '#d32f2f', color: 'white' }} title="Hủy đơn hàng">
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


              </div>
            )}

            {/* TAB 3: PRODUCT INVENTORY */}
            {activeTab === 'products' && (
              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>

                {/* Header Controls */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Quản Lý Kho Sản Phẩm</h3>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                    {/* Sort Dropdown */}
                    <select
                      value={inventorySort}
                      onChange={(e) => setInventorySort(e.target.value)}
                      className="form-input"
                      style={{ width: '180px', fontSize: '12px', padding: '8px' }}
                    >
                      <option value="default">Sắp xếp: Mặc định</option>
                      <option value="sold-desc">Bán nhiều nhất</option>
                      <option value="sold-asc">Bán ít nhất</option>
                    </select>

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
                  <div className="modal-overlay" onClick={() => setIsAddingProduct(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1000 }}>
                    <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '560px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden', zIndex: 1001, background: theme === 'light' ? '#ffffff' : undefined, border: theme === 'light' ? '1px solid #cbd5e1' : undefined }}>
                      <div style={{ padding: '16px 20px', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: '800', color: textColor }}>Tạo sản phẩm mới</h4>
                        <button onClick={() => setIsAddingProduct(false)} className="btn btn-ghost" style={{ padding: '4px', borderRadius: '50%' }}>
                          <X size={18} color={theme === 'light' ? '#334155' : 'white'} />
                        </button>
                      </div>

                      <form onSubmit={handleAddProduct} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '75vh', overflowY: 'auto' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Tên Sản Phẩm *</label>
                          <input
                            type="text"
                            required
                            placeholder="Ví dụ: Laptop Asus ROG Strix..."
                            value={newProduct.name}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                            className="form-input"
                            style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Danh Mục *</label>
                            <select
                              value={newProduct.category}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                              className="form-input"
                              style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                            >
                              <option value="laptop">Laptop</option>
                              <option value="điện thoại">Điện thoại</option>
                              <option value="gaming gear">Gaming Gear</option>
                              <option value="linh kiện">Linh kiện</option>
                            </select>
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Tình Trạng Kho</label>
                            <select
                              value={newProduct.inStock ? 'true' : 'false'}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, inStock: e.target.value === 'true' }))}
                              className="form-input"
                              style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                            >
                              <option value="true">Còn hàng</option>
                              <option value="false">Hết hàng</option>
                            </select>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Giá Bán (VND) *</label>
                            <input
                              type="number"
                              required
                              placeholder="Ví dụ: 15900000"
                              value={newProduct.price}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                              className="form-input"
                              style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Giá Cũ (Gốc)</label>
                            <input
                              type="number"
                              placeholder="Ví dụ: 17900000"
                              value={newProduct.oldPrice}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, oldPrice: e.target.value }))}
                              className="form-input"
                              style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                            />
                          </div>
                        </div>

                        <div style={{ borderTop: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
                          <span style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--color-primary-dim)', marginBottom: '8px' }}>Thông số cấu hình kỹ thuật (Không bắt buộc)</span>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <input
                              type="text"
                              placeholder="CPU (ví dụ: Intel i7)"
                              value={newProduct.cpu}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, cpu: e.target.value }))}
                              className="form-input"
                              style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                            />
                            <input
                              type="text"
                              placeholder="RAM (ví dụ: 16GB)"
                              value={newProduct.ram}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, ram: e.target.value }))}
                              className="form-input"
                              style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                            />
                            <input
                              type="text"
                              placeholder="Ổ Cứng (ví dụ: 512GB SSD)"
                              value={newProduct.storage}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, storage: e.target.value }))}
                              className="form-input"
                              style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                            />
                            <input
                              type="text"
                              placeholder="VGA / GPU (ví dụ: RTX 4060)"
                              value={newProduct.gpu}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, gpu: e.target.value }))}
                              className="form-input"
                              style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Mã Tags (cách nhau bằng dấu phẩy)</label>
                          <input
                            type="text"
                            placeholder="Ví dụ: Gaming, RTX4060, Intel"
                            value={newProduct.tags}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, tags: e.target.value }))}
                            className="form-input"
                            style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
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
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }} className="zebra-table">
                    <thead>
                      <tr style={{ background: 'var(--color-surface-container-high)' }}>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: theme === 'light' ? '#0f172a' : 'white' }}>Ảnh</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: theme === 'light' ? '#0f172a' : 'white' }}>Tên Sản Phẩm</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: theme === 'light' ? '#0f172a' : 'white' }}>Danh Mục</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: theme === 'light' ? '#0f172a' : 'white' }}>Giá Hiện Tại</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', textAlign: 'center', color: theme === 'light' ? '#0f172a' : 'white' }}>Đã Bán Tháng Này</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: theme === 'light' ? '#0f172a' : 'white' }}>Tình Trạng Kho</th>
                        <th style={{ padding: '12px 10px', fontWeight: '700', textAlign: 'center', width: '80px', color: theme === 'light' ? '#0f172a' : 'white' }}>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInventoryProducts.length === 0 ? (
                        <tr>
                          <td colSpan="7" style={{ textAlign: 'center', color: 'var(--color-outline)', padding: '30px' }}>Không có sản phẩm nào.</td>
                        </tr>
                      ) : (
                        filteredInventoryProducts.map(prod => (
                          <tr key={prod.id} onClick={(e) => {
                            if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT' && !e.target.closest('button')) {
                              const item = { ...prod, type: 'product' };
                              setDetailedItem(item);
                              setProductEditDraft(JSON.parse(JSON.stringify(item)));
                            }
                          }} style={{ cursor: 'pointer' }}>
                            <td>
                              <img src={prod.image} alt={prod.name} style={{ width: '36px', height: '36px', borderRadius: '4px', objectFit: 'contain', background: 'rgba(255,255,255,0.04)' }} />
                            </td>
                            <td>
                              <strong style={{ color: theme === 'light' ? '#0f172a' : 'white', display: 'block', fontSize: '13px', lineHeight: '1.4' }}>{prod.name}</strong>
                              <span style={{ fontSize: '10px', color: 'var(--color-outline)' }}>ID: {prod.id}</span>
                            </td>
                            <td style={{ textTransform: 'capitalize', fontSize: '13px', color: theme === 'light' ? '#0f172a' : 'white' }}>{prod.category}</td>
                            <td style={{ fontWeight: '800', color: 'var(--color-secondary-dim)', fontSize: '14px' }}>
                              <input
                                type="text"
                                value={tempPriceInput[prod.id] !== undefined ? tempPriceInput[prod.id] : prod.price}
                                onChange={(e) => setTempPriceInput(prev => ({ ...prev, [prod.id]: e.target.value }))}
                                onFocus={() => setTempPriceInput(prev => ({ ...prev, [prod.id]: prod.price }))}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    const raw = tempPriceInput[prod.id];
                                    const numeric = parseInt(String(raw).replace(/\D/g, '')) || 0;
                                    if (numeric !== prod.price && numeric > 0) {
                                      setPriceConfirmModal({ prodId: prod.id, pendingPrice: numeric, originalPrice: prod.price, prodName: prod.name });
                                    }
                                    setTempPriceInput(prev => { const n = { ...prev }; delete n[prod.id]; return n; });
                                    e.target.blur();
                                  }
                                }}
                                onBlur={() => {
                                  const raw = tempPriceInput[prod.id];
                                  if (raw === undefined) return;
                                  const numeric = parseInt(String(raw).replace(/\D/g, '')) || 0;
                                  if (numeric !== prod.price && numeric > 0) {
                                    setPriceConfirmModal({ prodId: prod.id, pendingPrice: numeric, originalPrice: prod.price, prodName: prod.name });
                                  }
                                  setTempPriceInput(prev => { const n = { ...prev }; delete n[prod.id]; return n; });
                                }}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  borderBottom: '1px dashed var(--color-outline)',
                                  color: 'var(--color-secondary-dim)',
                                  fontWeight: '800',
                                  width: '110px',
                                  outline: 'none',
                                  fontSize: '13px'
                                }}
                              />
                            </td>
                            <td style={{ textAlign: 'center', fontWeight: '700', fontSize: '14px', color: theme === 'light' ? '#0f172a' : 'white' }}>
                              {getSoldThisMonth(prod.id)}
                            </td>
                            <td>
                              <button
                                onClick={(e) => { e.stopPropagation(); toggleStock(prod.id); }}
                                className="status-badge"
                                style={{
                                  border: theme === 'light' ? 'none' : '1px solid currentColor',
                                  cursor: 'pointer',
                                  fontSize: '10px',
                                  fontWeight: 'bold',
                                  background: prod.inStock ? (theme === 'light' ? '#4caf50' : 'rgba(76,175,80,0.15)') : (theme === 'light' ? '#f44336' : 'rgba(255,76,76,0.15)'),
                                  color: '#ffffff',
                                  padding: '4px 8px',
                                  borderRadius: '4px'
                                }}
                              >
                                {prod.inStock ? 'Còn hàng' : 'Hết hàng'}
                              </button>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                                <button
                                  onClick={(e) => { e.stopPropagation(); setStoreProducts(prev => prev.filter(p => p.id !== prod.id)); }}
                                  className="btn btn-ghost"
                                  style={{ padding: '5px 8px', fontSize: '10px', color: 'var(--color-error)' }}
                                  title="Xóa sản phẩm"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Price Confirm Modal */}
                {priceConfirmModal && (
                  <div className="modal-overlay" onClick={() => setPriceConfirmModal(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1000 }}>
                    <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '420px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden', zIndex: 1001, background: theme === 'light' ? '#ffffff' : undefined, border: theme === 'light' ? '1px solid #cbd5e1' : undefined }}>
                      <div style={{ padding: '16px 20px', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '800', color: theme === 'light' ? '#0f172a' : 'white' }}>Xác nhận thay đổi giá</h4>
                        <button onClick={() => setPriceConfirmModal(null)} className="btn btn-ghost" style={{ padding: '4px', borderRadius: '50%' }}>
                          <X size={18} color={theme === 'light' ? '#334155' : 'white'} />
                        </button>
                      </div>
                      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <p style={{ fontSize: '13px', color: theme === 'light' ? '#0f172a' : 'white', lineHeight: '1.6' }}>
                          Bạn muốn đổi giá sản phẩm <strong>{priceConfirmModal.prodName}</strong>?<br />
                          <span style={{ color: theme === 'light' ? '#475569' : 'var(--color-outline)' }}>Giá cũ:</span> <strong style={{ color: '#64748b' }}>{formatVND(priceConfirmModal.originalPrice)}</strong><br />
                          <span style={{ color: theme === 'light' ? '#475569' : 'var(--color-outline)' }}>Giá mới:</span> <strong style={{ color: '#fd8b00' }}>{formatVND(priceConfirmModal.pendingPrice)}</strong>
                        </p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                            className="btn btn-secondary"
                            style={{ flex: 1, padding: '10px', fontSize: '13px', fontWeight: '700' }}
                            onClick={() => {
                              setStoreProducts(prev => prev.map(p => p.id === priceConfirmModal.prodId ? { ...p, price: priceConfirmModal.pendingPrice } : p));
                              setPriceConfirmModal(null);
                            }}
                          >
                            Lưu
                          </button>
                          <button
                            className="btn btn-outline"
                            style={{ flex: 1, padding: '10px', fontSize: '13px' }}
                            onClick={() => setPriceConfirmModal(null)}
                          >
                            Hoàn tác
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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
                        <h4 style={{ fontSize: '13px', fontWeight: '700', color: textColor, marginBottom: '4px' }}>{ticket.subject}</h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--color-outline)' }}>
                          <span>Khách: {ticket.customerName}</span>
                          <span>Độ khẩn: <strong style={{ color: ticket.urgency === 'Gấp' ? '#ffb4ab' : 'var(--color-outline)' }}>{ticket.urgency}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column: Chat Box Details */}
                  <div className="glass-panel" style={{ borderRadius: 'var(--rounded)', padding: '16px', display: 'flex', flexDirection: 'column', height: '500px', background: theme === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(5, 13, 24, 0.15)', border: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : 'none' }}>
                    {selectedTicket ? (
                      <>
                        {/* Box Header */}
                        <div style={{ borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <h4 style={{ fontSize: '13px', fontWeight: '800', color: textColor }}>#{selectedTicket.id} - {selectedTicket.subject}</h4>
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
                                  background: isAgent ? 'rgba(0, 123, 255, 0.1)' : (theme === 'light' ? '#f1f5f9' : 'rgba(255,255,255,0.03)'),
                                  border: `1px solid ${isAgent ? 'rgba(0,123,255,0.2)' : (theme === 'light' ? '#e2e8f0' : 'rgba(255,255,255,0.05)')}`,
                                  borderRadius: isAgent ? '10px 0 10px 10px' : '0 10px 10px 10px',
                                  padding: '10px 12px'
                                }}
                              >
                                <span style={{ fontSize: '9px', fontWeight: '700', display: 'block', color: isAgent ? 'var(--color-primary-dim)' : 'var(--color-secondary-dim)', marginBottom: '2px' }}>
                                  {isAgent ? (msg.agentName || 'Kỹ thuật viên') : selectedTicket.customerName}
                                </span>
                                <p style={{ fontSize: '12px', color: textColor, lineHeight: '1.4' }}>{msg.text}</p>
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
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', color: textColor }}>Quản Lý Yêu Cầu Bảo Hành</h3>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }} className="zebra-table">
                    <thead>
                      <tr style={{ background: 'var(--color-surface-container-high)' }}>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: textColor }}>Mã yêu cầu</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: textColor }}>Khách hàng</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: textColor }}>Sản Phẩm & Serial</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: textColor }}>Mô tả lỗi</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: textColor }}>Ngày nhận</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: textColor }}>Trạng thái</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', textAlign: 'center', color: textColor }}>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {warranties.map(claim => (
                        <tr key={claim.id} onClick={(e) => { if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') setDetailedItem({ ...claim, type: 'warranty' }); }} style={{ cursor: 'pointer' }}>
                          <td style={{ fontWeight: '700', color: 'var(--color-primary-dim)' }}>{claim.id}</td>
                          <td>
                            <strong style={{ color: textColor, display: 'block' }}>{claim.customerName}</strong>
                            <span style={{ fontSize: '10px', color: 'var(--color-outline)' }}>{claim.phone}</span>
                          </td>
                          <td>
                            <strong style={{ color: textColor, display: 'block', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={claim.productName}>{claim.productName}</strong>
                            <span style={{ fontSize: '10px', color: 'var(--color-outline)' }}>S/N: {claim.serialNumber}</span>
                          </td>
                          <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: textColor }} title={claim.issue}>
                            {claim.issue}
                          </td>
                          <td style={{ color: textColor }}>{claim.dateCreated}</td>
                          <td>
                            <span className="status-badge" style={{
                              fontSize: '10px',
                              fontWeight: 'bold',
                              background:
                                claim.status === 'returned' ? (theme === 'light' ? '#4caf50' : 'rgba(76,175,80,0.15)') :
                                  claim.status === 'checking' ? (theme === 'light' ? '#ff9800' : 'rgba(253,139,0,0.15)') : (theme === 'light' ? '#2196f3' : 'rgba(0,123,255,0.15)'),
                              color: '#ffffff',
                              border: theme === 'light' ? 'none' : '1px solid currentColor',
                              padding: '4px 8px',
                              borderRadius: '4px'
                            }}>
                              {claim.status === 'checking' && 'Đang kiểm tra'}
                              {claim.status === 'repairing' && 'Đang sửa chữa'}
                              {claim.status === 'returned' && 'Đã trả máy'}
                            </span>
                          </td>
                          <td style={{ textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                              {claim.status === 'checking' && (
                                <button onClick={(e) => { e.stopPropagation(); updateWarrantyStatus(claim.id, 'repairing'); }} className="btn btn-primary" style={{ padding: '4px 6px', fontSize: '10px' }}>
                                  Nhận sửa
                                </button>
                              )}
                              {claim.status === 'repairing' && (
                                <button onClick={(e) => { e.stopPropagation(); updateWarrantyStatus(claim.id, 'returned'); }} className="btn" style={{ padding: '4px 6px', fontSize: '10px', background: '#388e3c', color: 'white' }}>
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
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', color: textColor }}>Thu Cũ Đổi Mới (Trade-in)</h3>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }} className="zebra-table">
                    <thead>
                      <tr style={{ background: 'var(--color-surface-container-high)' }}>
                        <th style={{ padding: '10px 12px', fontWeight: '700', color: textColor, whiteSpace: 'nowrap' }}>Mã YC</th>
                        <th style={{ padding: '10px 12px', fontWeight: '700', color: textColor, whiteSpace: 'nowrap' }}>Khách Hàng</th>
                        <th style={{ padding: '10px 12px', fontWeight: '700', width: '22%', color: textColor }}>Thiết Bị Cũ</th>
                        <th style={{ padding: '10px 12px', fontWeight: '700', width: '22%', color: textColor }}>Sản Phẩm Đổi</th>
                        <th style={{ padding: '10px 12px', fontWeight: '700', width: '15%', color: textColor }}>Tình trạng</th>
                        <th style={{ padding: '10px 12px', fontWeight: '700', color: textColor, whiteSpace: 'nowrap' }}>Giá thu mua</th>
                        <th style={{ padding: '10px 12px', fontWeight: '700', color: textColor, whiteSpace: 'nowrap' }}>Trạng Thái</th>
                        <th style={{ padding: '10px 12px', fontWeight: '700', textAlign: 'center', color: textColor, whiteSpace: 'nowrap' }}>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tradeins.map(req => (
                        <tr key={req.id} onClick={(e) => { if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') setDetailedItem({ ...req, type: 'tradein' }); }} style={{ cursor: 'pointer' }}>
                          <td style={{ padding: '10px 12px', fontWeight: '700', color: 'var(--color-primary-dim)' }}>{req.id}</td>
                          <td style={{ padding: '10px 12px' }}>
                            <strong style={{ color: textColor, display: 'block', whiteSpace: 'nowrap', fontSize: '12px' }}>{req.customerName}</strong>
                            <span style={{ fontSize: '9px', color: 'var(--color-outline)' }}>{req.phone}</span>
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <strong style={{ color: textColor, display: 'block', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '12px' }} title={req.oldDevice}>{req.oldDevice}</strong>
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <span style={{ color: 'var(--color-primary-dim)', fontWeight: '600', display: 'block', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '12px' }} title={req.targetDevice}>{req.targetDevice}</span>
                          </td>
                          <td style={{ padding: '10px 12px', color: textColor, maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '12px' }} title={req.conditionDesc}>
                            {req.conditionDesc}
                          </td>
                          <td style={{ padding: '10px 12px', fontWeight: '700', color: 'var(--color-secondary-dim)', whiteSpace: 'nowrap', fontSize: '12px' }}>
                            {req.offeredPrice > 0 ? formatVND(req.offeredPrice) : 'Chờ thẩm định'}
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <span className="status-badge" style={{
                              fontSize: '9px',
                              fontWeight: 'bold',
                              background:
                                req.status === 'completed' ? (theme === 'light' ? '#4caf50' : 'rgba(76,175,80,0.15)') :
                                  req.status === 'valued' ? (theme === 'light' ? '#2196f3' : 'rgba(0,123,255,0.15)') : (theme === 'light' ? '#ff9800' : 'rgba(253,139,0,0.15)'),
                              color: '#ffffff',
                              border: theme === 'light' ? 'none' : '1px solid currentColor',
                              padding: '4px 6px',
                              borderRadius: '4px',
                              whiteSpace: 'nowrap'
                            }}>
                              {req.status === 'pending' && 'Chờ thẩm định'}
                              {req.status === 'valued' && 'Đã báo giá'}
                              {req.status === 'completed' && 'Hoàn thành'}
                            </span>
                          </td>
                          <td style={{ padding: '10px 12px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                              {req.status === 'pending' && (
                                <button onClick={(e) => { e.stopPropagation(); setSelectedTradeIn(req); }} className="btn btn-primary" style={{ padding: '4px 6px', fontSize: '9px', whiteSpace: 'nowrap' }}>
                                  Thẩm định
                                </button>
                              )}
                              {req.status === 'valued' && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); setTradeins(prev => prev.map(t => t.id === req.id ? { ...t, status: 'completed' } : t)); }}
                                  className="btn"
                                  style={{ padding: '4px 6px', fontSize: '9px', background: '#388e3c', color: 'white', whiteSpace: 'nowrap' }}
                                >
                                  Hoàn tất
                                </button>
                              )}
                              {req.status === 'completed' && (
                                <span style={{ color: 'var(--color-outline)', fontSize: '9px', whiteSpace: 'nowrap' }}>Hoàn tất</span>
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
                  <div className="modal-overlay" onClick={() => setSelectedTradeIn(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1000 }}>
                    <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '440px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden', zIndex: 1001, background: theme === 'light' ? '#ffffff' : undefined, border: theme === 'light' ? '1px solid #cbd5e1' : undefined }}>
                      <div style={{ padding: '16px 20px', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '800', color: textColor }}>Thẩm định & Báo giá thu cũ cho {selectedTradeIn.customerName}</h4>
                        <button onClick={() => setSelectedTradeIn(null)} className="btn btn-ghost" style={{ padding: '4px', borderRadius: '50%' }}>
                          <X size={18} color={theme === 'light' ? '#334155' : 'white'} />
                        </button>
                      </div>

                      <form onSubmit={submitTradeInValuation} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                          <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Mẫu máy thu cũ:</span>
                          <strong style={{ display: 'block', fontSize: '13px', color: textColor, marginTop: '2px' }}>{selectedTradeIn.oldDevice}</strong>
                        </div>

                        <div>
                          <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Thông tin sử dụng & tình trạng:</span>
                          <p style={{ fontSize: '12px', color: textColor, marginTop: '2px', lineHeight: '1.4' }}>{selectedTradeIn.conditionDesc}</p>
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
                              style={{ width: '100%', maxHeight: '180px', objectFit: 'contain', borderRadius: '6px', border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.08)', background: theme === 'light' ? '#f8fafc' : '#050d18' }}
                            />
                          </div>
                        )}

                        <div style={{ height: '1px', background: theme === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)', margin: '4px 0' }} />

                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Mức giá thu mua đề nghị (VND) *</label>
                          <input
                            type="number"
                            required
                            placeholder="Ví dụ: 8500000"
                            value={offeredTradeInValuation}
                            onChange={(e) => setOfferedTradeInValuation(e.target.value)}
                            className="form-input"
                            style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
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
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px', color: theme === 'light' ? '#0f172a' : 'white' }}>
                  Ý Kiến & Góp Ý Từ Khách Hàng
                </h3>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }} className="zebra-table">
                    <thead>
                      <tr style={{ background: 'var(--color-surface-container-high)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: theme === 'light' ? '#0f172a' : 'white' }}>Mã Góp Ý</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: theme === 'light' ? '#0f172a' : 'white' }}>Khách Hàng</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', width: '33%', color: theme === 'light' ? '#0f172a' : 'white' }}>Tiêu Đề</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', width: '17%', color: theme === 'light' ? '#0f172a' : 'white' }}>Nội Dung Chi Tiết</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: theme === 'light' ? '#0f172a' : 'white' }}>Thời Gian</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: theme === 'light' ? '#0f172a' : 'white' }}>Trạng Thái</th>
                        <th style={{ padding: '12px 10px', fontWeight: '700', textAlign: 'center', width: '100px', color: theme === 'light' ? '#0f172a' : 'white' }}>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedbacks.length === 0 ? (
                        <tr>
                          <td colSpan="7" style={{ textAlign: 'center', color: 'var(--color-outline)', padding: '30px' }}>Không có ý kiến đóng góp nào từ khách hàng.</td>
                        </tr>
                      ) : (
                        feedbacks.map(fb => (
                          <tr key={fb.id} onClick={(e) => { if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') setDetailedItem({ ...fb, type: 'feedback' }); }} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer' }}>
                            <td style={{ fontWeight: '700', color: 'var(--color-primary-dim)', padding: '12px 16px' }}>{fb.id}</td>
                            <td style={{ padding: '12px 16px' }}>
                              <strong style={{ color: textColor, display: 'block' }}>{fb.fullName}</strong>
                              <span style={{ fontSize: '10px', color: 'var(--color-outline)' }}>{fb.email}</span>
                            </td>
                            <td style={{ fontWeight: '600', color: textColor, padding: '12px 16px', fontSize: '14px' }}>{fb.title}</td>
                            <td style={{ padding: '12px 16px' }}>
                              <p style={{ fontSize: '13px', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: theme === 'light' ? '#334155' : 'white' }} title={fb.content}>
                                {fb.content}
                              </p>
                            </td>
                            <td style={{ padding: '12px 16px', color: textColor }}>{fb.date}</td>
                            <td style={{ padding: '12px 16px' }}>
                              <span className="status-badge" style={{
                                fontSize: '10px',
                                fontWeight: 'bold',
                                background: fb.status === 'processed' ? (theme === 'light' ? '#4caf50' : 'rgba(76,175,80,0.15)') : (theme === 'light' ? '#ff9800' : 'rgba(253,139,0,0.15)'),
                                color: '#ffffff',
                                border: theme === 'light' ? 'none' : '1px solid currentColor',
                                padding: '4px 8px',
                                borderRadius: '4px'
                              }}>
                                {fb.status === 'processed' ? 'Đã xử lý' : 'Chờ xử lý'}
                              </span>
                            </td>
                            <td style={{ padding: '12px 16px' }} onClick={(e) => e.stopPropagation()}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', justifyContent: 'center' }}>
                                {fb.status === 'pending' && (
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setFeedbacks(prev => prev.map(f => f.id === fb.id ? { ...f, status: 'processed' } : f)); }}
                                    className="btn btn-primary"
                                    style={{ padding: '4px 8px', fontSize: '10px', width: '70px' }}
                                  >
                                    Duyệt
                                  </button>
                                )}
                                <button
                                  onClick={() => setFeedbacks(prev => prev.filter(f => f.id !== fb.id))}
                                  className="btn"
                                  style={{ padding: '4px 8px', fontSize: '10px', width: '70px', background: '#d32f2f', color: 'white' }}
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

            {activeTab === 'promotions' && (
              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Chương Trình Khuyến Mãi</h3>

                  <button
                    onClick={() => setIsAddingPromo(true)}
                    className="btn btn-secondary"
                    style={{ padding: '8px 14px', fontSize: '12px' }}
                  >
                    <Plus size={14} />
                    Thêm chương trình
                  </button>
                </div>

                {isAddingPromo && (
                  <div className="modal-overlay" onClick={() => setIsAddingPromo(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1000 }}>
                    <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '440px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden', zIndex: 1001, background: theme === 'light' ? '#ffffff' : undefined, border: theme === 'light' ? '1px solid #cbd5e1' : undefined }}>
                      <div style={{ padding: '16px 20px', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '800', color: textColor }}>Tạo khuyến mãi mới</h4>
                        <button onClick={() => setIsAddingPromo(false)} className="btn btn-ghost" style={{ padding: '4px', borderRadius: '50%' }}>
                          <X size={18} color={theme === 'light' ? '#334155' : 'white'} />
                        </button>
                      </div>

                      <form onSubmit={handleAddPromo} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Tên chương trình *</label>
                          <input
                            type="text"
                            required
                            placeholder="Siêu Sale Hè 2026..."
                            value={newPromo.name}
                            onChange={(e) => setNewPromo(prev => ({ ...prev, name: e.target.value }))}
                            className="form-input"
                            style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>% Giảm giá mặc định *</label>
                          <input
                            type="number"
                            required
                            min="0"
                            max="100"
                            placeholder="Ví dụ: 10"
                            value={newPromo.discountPercent}
                            onChange={(e) => setNewPromo(prev => ({ ...prev, discountPercent: e.target.value }))}
                            className="form-input"
                            style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Ngày bắt đầu</label>
                            <input
                              type="date"
                              value={newPromo.startDate}
                              onChange={(e) => setNewPromo(prev => ({ ...prev, startDate: e.target.value }))}
                              className="form-input"
                              style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Ngày kết thúc</label>
                            <input
                              type="date"
                              value={newPromo.endDate}
                              onChange={(e) => setNewPromo(prev => ({ ...prev, endDate: e.target.value }))}
                              className="form-input"
                              style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                            />
                          </div>
                        </div>

                        <button type="submit" className="btn btn-secondary" style={{ width: '100%', padding: '10px', marginTop: '10px', fontWeight: '700' }}>
                          TẠO KHUYẾN MÃI
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px' }} className="promotions-grid">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <h4 style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-outline)' }}>Danh sách chương trình</h4>
                    {promotions.length === 0 ? (
                      <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-outline)', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '6px' }}>
                        Chưa có chương trình khuyến mãi nào.
                      </div>
                    ) : (
                      promotions.map(promo => (
                        <div
                          key={promo.id}
                          onClick={() => setSelectedPromoForEdit(promo)}
                          style={{
                            background: selectedPromoForEdit && selectedPromoForEdit.id === promo.id ? 'rgba(0,123,255,0.06)' : 'rgba(255,255,255,0.01)',
                            border: `1px solid ${selectedPromoForEdit && selectedPromoForEdit.id === promo.id ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)'}`,
                            borderRadius: 'var(--rounded)',
                            padding: '14px',
                            cursor: 'pointer',
                            position: 'relative'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--color-primary-dim)' }}>{promo.id}</span>
                            <span className="status-badge" style={{ fontSize: '9px', background: 'rgba(253,139,0,0.15)', color: '#ffb77d' }}>
                              Giảm {promo.discountPercent}%
                            </span>
                          </div>

                          <h5 style={{ fontSize: '13px', fontWeight: '800', color: textColor, marginBottom: '4px' }}>{promo.name}</h5>
                          <span style={{ fontSize: '11px', color: 'var(--color-outline)', display: 'block' }}>Hạn: {promo.startDate} đến {promo.endDate}</span>
                          <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', display: 'block', marginTop: '4px' }}>
                            Sản phẩm áp dụng: {promo.productIds.length} | Đã bán: {promo.salesCount}
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePromo(promo.id);
                            }}
                            className="btn btn-ghost"
                            style={{ position: 'absolute', right: '10px', bottom: '10px', padding: '6px', color: 'var(--color-error)' }}
                            title="Xóa chương trình"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="glass-panel" style={{ borderRadius: 'var(--rounded)', padding: '18px', background: theme === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(5, 13, 24, 0.15)', border: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : 'none', minHeight: '400px' }}>
                    {selectedPromoForEdit ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.06)', paddingBottom: '14px' }}>
                          <h4 style={{ fontSize: '16px', fontWeight: '800', color: textColor }}>{selectedPromoForEdit.name}</h4>
                          <span style={{ fontSize: '12px', color: 'var(--color-outline)' }}>Áp dụng từ: {selectedPromoForEdit.startDate} đến {selectedPromoForEdit.endDate}</span>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '12px' }}>
                            <div style={{ background: theme === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '4px', border: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.04)' }}>
                              <span style={{ fontSize: '10px', color: 'var(--color-outline)', display: 'block', textTransform: 'uppercase', fontWeight: '700' }}>Số lượng đã bán</span>
                              <strong style={{ fontSize: '16px', fontWeight: '800', color: textColor, marginTop: '2px', display: 'block' }}>{selectedPromoForEdit.salesCount} sản phẩm</strong>
                            </div>
                            <div style={{ background: theme === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '4px', border: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.04)' }}>
                              <span style={{ fontSize: '10px', color: 'var(--color-outline)', display: 'block', textTransform: 'uppercase', fontWeight: '700' }}>Doanh số chương trình</span>
                              <strong style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-secondary-dim)', marginTop: '2px', display: 'block' }}>{formatVND(selectedPromoForEdit.revenue)}</strong>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-primary-dim)', textTransform: 'uppercase', marginBottom: '8px' }}>Thêm sản phẩm vào chương trình</h5>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <select
                              value={productToAddToPromo}
                              onChange={(e) => setProductToAddToPromo(e.target.value)}
                              className="form-input"
                              style={{ fontSize: '12px', padding: '8px' }}
                            >
                              <option value="">-- Chọn sản phẩm để áp dụng --</option>
                              {storeProducts
                                .filter(p => !selectedPromoForEdit.productIds.includes(p.id))
                                .map(p => (
                                  <option key={p.id} value={p.id}>
                                    [{p.id}] {p.name} - {formatVND(p.price)}
                                  </option>
                                ))}
                            </select>
                            <button
                              onClick={() => {
                                handleAddProductToPromo(selectedPromoForEdit.id, productToAddToPromo);
                                setProductToAddToPromo('');
                              }}
                              disabled={!productToAddToPromo}
                              className="btn btn-primary"
                              style={{ padding: '8px 16px', fontSize: '12px' }}
                            >
                              Thêm sản phẩm
                            </button>
                          </div>
                        </div>

                        <div>
                          <h5 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-primary-dim)', textTransform: 'uppercase', marginBottom: '8px' }}>Danh sách sản phẩm áp dụng</h5>
                          {selectedPromoForEdit.productIds.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '20px', color: 'var(--color-outline)', fontSize: '12px', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                              Chưa có sản phẩm nào thuộc chương trình này. Chọn sản phẩm ở trên để thêm.
                            </div>
                          ) : (
                            <div style={{ overflowX: 'auto' }}>
                              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }} className="zebra-table">
                                <thead>
                                  <tr style={{ background: 'var(--color-surface-container-high)' }}>
                                    <th style={{ padding: '8px 12px', fontWeight: '700', color: textColor }}>Sản phẩm</th>
                                    <th style={{ padding: '8px 12px', fontWeight: '700', color: textColor }}>Giá gốc (VND)</th>
                                    <th style={{ padding: '8px 12px', fontWeight: '700', color: textColor }}>Mức giảm</th>
                                    <th style={{ padding: '8px 12px', fontWeight: '700', color: textColor }}>Giá khuyến mãi</th>
                                    <th style={{ padding: '8px 12px', fontWeight: '700', textAlign: 'center', color: textColor }}>Thao Tác</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {storeProducts
                                    .filter(p => selectedPromoForEdit.productIds.includes(p.id))
                                    .map(p => {
                                      const promoPrice = Math.round(p.price * (1 - selectedPromoForEdit.discountPercent / 100));
                                      return (
                                        <tr key={p.id}>
                                          <td>
                                            <strong style={{ color: textColor, display: 'block' }}>{p.name}</strong>
                                            <span style={{ fontSize: '9px', color: 'var(--color-outline)' }}>ID: {p.id}</span>
                                          </td>
                                          <td>
                                            <input
                                              type="text"
                                              value={p.price}
                                              onChange={(e) => handlePromoProductPriceChange(p.id, e.target.value)}
                                              style={{
                                                background: 'none',
                                                border: 'none',
                                                borderBottom: theme === 'light' ? '1px dashed #cbd5e1' : '1px dashed var(--color-outline)',
                                                color: textColor,
                                                fontWeight: '700',
                                                width: '90px',
                                                outline: 'none',
                                                fontSize: '12px'
                                              }}
                                            />
                                          </td>
                                          <td>
                                            <span style={{ color: '#ffb77d', fontWeight: '600' }}>-{selectedPromoForEdit.discountPercent}%</span>
                                          </td>
                                          <td style={{ fontWeight: '800', color: 'var(--color-secondary-dim)' }}>
                                            {formatVND(promoPrice)}
                                          </td>
                                          <td style={{ textAlign: 'center' }}>
                                            <button
                                              onClick={() => handleRemoveProductFromPromo(selectedPromoForEdit.id, p.id)}
                                              className="btn btn-ghost"
                                              style={{ padding: '4px', color: 'var(--color-error)' }}
                                              title="Xóa khỏi chương trình"
                                            >
                                              <Trash2 size={13} />
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-outline)', gap: '12px' }}>
                        <Tag size={36} strokeWidth={1} />
                        <p style={{ fontSize: '13px' }}>Chọn một chương trình từ danh sách để xem chi tiết hoặc quản lý sản phẩm.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Detailed Item Modal */}
      {detailedItem && (
        <div className="modal-overlay" onClick={handleCloseDetailedModal} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1000 }}>
          <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '600px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden', zIndex: 1001, background: theme === 'light' ? '#ffffff' : undefined, border: theme === 'light' ? '1px solid #cbd5e1' : undefined }}>

            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '800', color: textColor }}>
                {detailedItem.type === 'product' && `Chỉnh sửa sản phẩm: ${detailedItem.name} (${detailedItem.id})`}
                {detailedItem.type === 'warranty' && `Chi tiết yêu cầu bảo hành ${detailedItem.id}`}
                {detailedItem.type === 'tradein' && `Chi tiết yêu cầu Trade-in ${detailedItem.id}`}
                {detailedItem.type === 'feedback' && `Ý kiến đóng góp ${detailedItem.id}`}
              </h4>
              <button onClick={handleCloseDetailedModal} className="btn btn-ghost" style={{ padding: '4px', borderRadius: '50%' }}>
                <X size={18} color={theme === 'light' ? '#334155' : 'white'} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '20px', maxHeight: '70vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* 1. WARRANTY DETAILED VIEW */}
              {detailedItem.type === 'warranty' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Khách hàng:</span>
                      <strong style={{ display: 'block', color: textColor }}>{detailedItem.customerName}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Số điện thoại:</span>
                      <strong style={{ display: 'block', color: textColor }}>{detailedItem.phone}</strong>
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Sản phẩm bảo hành:</span>
                    <strong style={{ display: 'block', color: textColor }}>{detailedItem.productName}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Serial Number: {detailedItem.serialNumber}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Mô tả lỗi:</span>
                    <p style={{ fontSize: '13px', color: textColor, background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '4px', border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.05)', marginTop: '4px', lineHeight: '1.5' }}>
                      {detailedItem.issue}
                    </p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Ngày tạo yêu cầu:</span>
                      <strong style={{ display: 'block', color: textColor }}>{detailedItem.dateCreated}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Trạng thái hiện tại:</span>
                      <span className="status-badge" style={{
                        display: 'inline-block',
                        marginTop: '4px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        background:
                          detailedItem.status === 'returned' ? (theme === 'light' ? '#4caf50' : 'rgba(76,175,80,0.15)') :
                            detailedItem.status === 'checking' ? (theme === 'light' ? '#ff9800' : 'rgba(253,139,0,0.15)') : (theme === 'light' ? '#2196f3' : 'rgba(0,123,255,0.15)'),
                        color: '#ffffff',
                        padding: '4px 8px',
                        borderRadius: '4px'
                      }}>
                        {detailedItem.status === 'checking' && 'Đang kiểm tra'}
                        {detailedItem.status === 'repairing' && 'Đang sửa chữa'}
                        {detailedItem.status === 'returned' && 'Đã trả máy'}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* 2. TRADE-IN DETAILED VIEW */}
              {detailedItem.type === 'tradein' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Khách hàng:</span>
                      <strong style={{ display: 'block', color: textColor }}>{detailedItem.customerName}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Số điện thoại:</span>
                      <strong style={{ display: 'block', color: textColor }}>{detailedItem.phone}</strong>
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Thiết bị cũ thu mua:</span>
                    <strong style={{ display: 'block', color: textColor }}>{detailedItem.oldDevice}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Sản phẩm muốn lên đời:</span>
                    <strong style={{ display: 'block', color: 'var(--color-primary-dim)' }}>{detailedItem.targetDevice}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Tình trạng thiết bị chi tiết:</span>
                    <p style={{ fontSize: '13px', color: textColor, background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '4px', border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.05)', marginTop: '4px', lineHeight: '1.5' }}>
                      {detailedItem.conditionDesc}
                    </p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Mức giá tự định giá:</span>
                      <strong style={{ display: 'block', color: 'var(--color-secondary-dim)', fontSize: '15px' }}>{detailedItem.selfValuation > 0 ? formatVND(detailedItem.selfValuation) : 'N/A'}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Giá Kinetic đề nghị:</span>
                      <strong style={{ display: 'block', color: 'var(--color-primary-dim)', fontSize: '15px' }}>{detailedItem.offeredPrice > 0 ? formatVND(detailedItem.offeredPrice) : 'Chờ thẩm định'}</strong>
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Trạng thái:</span>
                    <span className="status-badge" style={{
                      display: 'inline-block',
                      marginTop: '4px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      background:
                        detailedItem.status === 'completed' ? (theme === 'light' ? '#4caf50' : 'rgba(76,175,80,0.15)') :
                          detailedItem.status === 'valued' ? (theme === 'light' ? '#2196f3' : 'rgba(0,123,255,0.15)') : (theme === 'light' ? '#ff9800' : 'rgba(253,139,0,0.15)'),
                      color: '#ffffff',
                      padding: '4px 8px',
                      borderRadius: '4px'
                    }}>
                      {detailedItem.status === 'pending' && 'Chờ thẩm định'}
                      {detailedItem.status === 'valued' && 'Đã báo giá'}
                      {detailedItem.status === 'completed' && 'Hoàn thành đổi'}
                    </span>
                  </div>
                </>
              )}

              {/* 3. FEEDBACK DETAILED VIEW */}
              {detailedItem.type === 'feedback' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Khách hàng:</span>
                      <strong style={{ display: 'block', color: textColor }}>{detailedItem.fullName}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Email liên hệ:</span>
                      <strong style={{ display: 'block', color: textColor }}>{detailedItem.email}</strong>
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Tiêu đề góp ý:</span>
                    <strong style={{ display: 'block', color: textColor, fontSize: '14px' }}>{detailedItem.title}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Nội dung góp ý chi tiết:</span>
                    <p style={{ fontSize: '13px', color: textColor, background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '4px', border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.05)', marginTop: '4px', lineHeight: '1.6' }}>
                      {detailedItem.content}
                    </p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Thời gian gửi:</span>
                      <strong style={{ display: 'block', color: textColor }}>{detailedItem.date}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Trạng thái:</span>
                      <span className="status-badge" style={{
                        display: 'inline-block',
                        marginTop: '4px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        background: detailedItem.status === 'processed' ? (theme === 'light' ? '#4caf50' : 'rgba(76,175,80,0.15)') : (theme === 'light' ? '#ff9800' : 'rgba(253,139,0,0.15)'),
                        color: '#ffffff',
                        padding: '4px 8px',
                        borderRadius: '4px'
                      }}>
                        {detailedItem.status === 'processed' ? 'Đã xử lý' : 'Chờ xử lý'}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* 4. PRODUCT EDIT FORM VIEW */}
              {detailedItem.type === 'product' && productEditDraft && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Tên Sản Phẩm *</label>
                    <input
                      type="text"
                      value={productEditDraft.name || ''}
                      onChange={(e) => setProductEditDraft(prev => ({ ...prev, name: e.target.value }))}
                      onBlur={handleInputBlurOrEnter}
                      onKeyDown={(e) => e.key === 'Enter' && handleInputBlurOrEnter(e)}
                      className="form-input"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.1)',
                        background: theme === 'light' ? '#ffffff' : 'rgba(255, 255, 255, 0.02)',
                        color: textColor,
                        fontSize: '13px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Danh Mục *</label>
                      <select
                        value={productEditDraft.category || ''}
                        onChange={(e) => setProductEditDraft(prev => ({ ...prev, category: e.target.value }))}
                        onBlur={handleInputBlurOrEnter}
                        onKeyDown={(e) => e.key === 'Enter' && handleInputBlurOrEnter(e)}
                        className="form-input"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.1)',
                          background: theme === 'light' ? '#ffffff' : 'rgba(255, 255, 255, 0.02)',
                          color: textColor,
                          fontSize: '13px',
                          outline: 'none'
                        }}
                      >
                        <option value="laptop">Laptop</option>
                        <option value="điện thoại">Điện thoại</option>
                        <option value="gaming gear">Gaming Gear</option>
                        <option value="linh kiện">Linh kiện</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Tình Trạng Kho</label>
                      <select
                        value={productEditDraft.inStock ? 'true' : 'false'}
                        onChange={(e) => setProductEditDraft(prev => ({ ...prev, inStock: e.target.value === 'true' }))}
                        onBlur={handleInputBlurOrEnter}
                        onKeyDown={(e) => e.key === 'Enter' && handleInputBlurOrEnter(e)}
                        className="form-input"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.1)',
                          background: theme === 'light' ? '#ffffff' : 'rgba(255, 255, 255, 0.02)',
                          color: textColor,
                          fontSize: '13px',
                          outline: 'none'
                        }}
                      >
                        <option value="true">Còn hàng</option>
                        <option value="false">Hết hàng</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Giá Bán (VND) *</label>
                      <input
                        type="number"
                        value={productEditDraft.price || ''}
                        onChange={(e) => setProductEditDraft(prev => ({ ...prev, price: Number(e.target.value) || 0 }))}
                        onBlur={handleInputBlurOrEnter}
                        onKeyDown={(e) => e.key === 'Enter' && handleInputBlurOrEnter(e)}
                        className="form-input"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.1)',
                          background: theme === 'light' ? '#ffffff' : 'rgba(255, 255, 255, 0.02)',
                          color: textColor,
                          fontSize: '13px',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Giá Cũ (Gốc)</label>
                      <input
                        type="number"
                        value={productEditDraft.oldPrice || ''}
                        onChange={(e) => setProductEditDraft(prev => ({ ...prev, oldPrice: Number(e.target.value) || 0 }))}
                        onBlur={handleInputBlurOrEnter}
                        onKeyDown={(e) => e.key === 'Enter' && handleInputBlurOrEnter(e)}
                        className="form-input"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.1)',
                          background: theme === 'light' ? '#ffffff' : 'rgba(255, 255, 255, 0.02)',
                          color: textColor,
                          fontSize: '13px',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <span style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--color-primary-dim)', marginBottom: '8px' }}>Thông số cấu hình kỹ thuật</span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '10px', color: 'var(--color-outline)', marginBottom: '2px' }}>CPU</label>
                        <input
                          type="text"
                          value={(productEditDraft.specs && productEditDraft.specs.cpu) || ''}
                          onChange={(e) => setProductEditDraft(prev => ({ ...prev, specs: { ...prev.specs, cpu: e.target.value } }))}
                          onBlur={handleInputBlurOrEnter}
                          onKeyDown={(e) => e.key === 'Enter' && handleInputBlurOrEnter(e)}
                          className="form-input"
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.1)',
                            background: theme === 'light' ? '#ffffff' : 'rgba(255, 255, 255, 0.02)',
                            color: textColor,
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '10px', color: 'var(--color-outline)', marginBottom: '2px' }}>RAM</label>
                        <input
                          type="text"
                          value={(productEditDraft.specs && productEditDraft.specs.ram) || ''}
                          onChange={(e) => setProductEditDraft(prev => ({ ...prev, specs: { ...prev.specs, ram: e.target.value } }))}
                          onBlur={handleInputBlurOrEnter}
                          onKeyDown={(e) => e.key === 'Enter' && handleInputBlurOrEnter(e)}
                          className="form-input"
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.1)',
                            background: theme === 'light' ? '#ffffff' : 'rgba(255, 255, 255, 0.02)',
                            color: textColor,
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '10px', color: 'var(--color-outline)', marginBottom: '2px' }}>Ổ Cứng</label>
                        <input
                          type="text"
                          value={(productEditDraft.specs && productEditDraft.specs.storage) || ''}
                          onChange={(e) => setProductEditDraft(prev => ({ ...prev, specs: { ...prev.specs, storage: e.target.value } }))}
                          onBlur={handleInputBlurOrEnter}
                          onKeyDown={(e) => e.key === 'Enter' && handleInputBlurOrEnter(e)}
                          className="form-input"
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.1)',
                            background: theme === 'light' ? '#ffffff' : 'rgba(255, 255, 255, 0.02)',
                            color: textColor,
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '10px', color: 'var(--color-outline)', marginBottom: '2px' }}>VGA / GPU</label>
                        <input
                          type="text"
                          value={(productEditDraft.specs && productEditDraft.specs.gpu) || ''}
                          onChange={(e) => setProductEditDraft(prev => ({ ...prev, specs: { ...prev.specs, gpu: e.target.value } }))}
                          onBlur={handleInputBlurOrEnter}
                          onKeyDown={(e) => e.key === 'Enter' && handleInputBlurOrEnter(e)}
                          className="form-input"
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.1)',
                            background: theme === 'light' ? '#ffffff' : 'rgba(255, 255, 255, 0.02)',
                            color: textColor,
                            fontSize: '13px',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Mã Tags (cách nhau bằng dấu phẩy)</label>
                    <input
                      type="text"
                      value={productEditDraft.tags ? (Array.isArray(productEditDraft.tags) ? productEditDraft.tags.join(', ') : productEditDraft.tags) : ''}
                      onChange={(e) => setProductEditDraft(prev => ({ ...prev, tags: e.target.value.split(',').map(t => t.trim()) }))}
                      onBlur={handleInputBlurOrEnter}
                      onKeyDown={(e) => e.key === 'Enter' && handleInputBlurOrEnter(e)}
                      className="form-input"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.1)',
                        background: theme === 'light' ? '#ffffff' : 'rgba(255, 255, 255, 0.02)',
                        color: textColor,
                        fontSize: '13px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Đường dẫn ảnh sản phẩm</label>
                    <input
                      type="text"
                      value={productEditDraft.image || ''}
                      onChange={(e) => setProductEditDraft(prev => ({ ...prev, image: e.target.value }))}
                      onBlur={handleInputBlurOrEnter}
                      onKeyDown={(e) => e.key === 'Enter' && handleInputBlurOrEnter(e)}
                      className="form-input"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.1)',
                        background: theme === 'light' ? '#ffffff' : 'rgba(255, 255, 255, 0.02)',
                        color: textColor,
                        fontSize: '13px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Detail Modal overlay moved to root layout to avoid stacking context with glass-panel */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1000 }}>
          <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '600px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden', zIndex: 1001, background: theme === 'light' ? '#ffffff' : undefined, border: theme === 'light' ? '1px solid #cbd5e1' : undefined }}>
            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '800', color: textColor }}>Chi tiết đơn hàng {selectedOrder.id}</h4>
              <button onClick={() => setSelectedOrder(null)} className="btn btn-ghost" style={{ padding: '4px', borderRadius: '50%' }}>
                <X size={18} color={theme === 'light' ? '#334155' : 'white'} />
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '70vh', overflowY: 'auto' }}>
              {/* Customer Info */}
              <div style={{ background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: 'var(--rounded)', border: theme === 'light' ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.04)' }}>
                <h5 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-primary-dim)', textTransform: 'uppercase', marginBottom: '6px' }}>Thông tin giao nhận</h5>
                <p style={{ fontSize: '13px', color: textColor, lineHeight: '1.6' }}>
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
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderBottom: theme === 'light' ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.04)', paddingBottom: '6px' }}>
                      <span style={{ color: textColor }}>{it.name} (x{it.quantity})</span>
                      <strong style={{ color: 'var(--color-secondary-dim)' }}>{formatVND(it.price * it.quantity)}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total & Status action */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: theme === 'light' ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
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

      {/* Product Confirmation Modal */}
      {productConfirmModal && (
        <div className="modal-overlay" onClick={() => setProductConfirmModal(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1100 }}>
          <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '380px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden', zIndex: 1101, background: theme === 'light' ? '#ffffff' : undefined, border: theme === 'light' ? '1px solid #cbd5e1' : undefined }}>
            <div style={{ padding: '16px 20px', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '800', color: textColor }}>Xác nhận thay đổi sản phẩm</h4>
              <button onClick={() => setProductConfirmModal(false)} className="btn btn-ghost" style={{ padding: '4px', borderRadius: '50%' }}>
                <X size={18} color={theme === 'light' ? '#334155' : 'white'} />
              </button>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <p style={{ fontSize: '13px', color: textColor, lineHeight: '1.6' }}>
                Bạn có muốn **Lưu** các thay đổi đã thực hiện cho sản phẩm này trực tiếp vào hệ thống, hay **Hoàn tác** để khôi phục giá trị cũ?
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '10px', fontSize: '13px', fontWeight: '700' }}
                  onClick={() => {
                    setStoreProducts(prev => prev.map(p => p.id === productEditDraft.id ? productEditDraft : p));
                    setDetailedItem(productEditDraft);
                    setProductConfirmModal(false);
                  }}
                >
                  Lưu
                </button>
                <button
                  className="btn btn-outline"
                  style={{ flex: 1, padding: '10px', fontSize: '13px' }}
                  onClick={() => {
                    setProductEditDraft(JSON.parse(JSON.stringify(detailedItem)));
                    setProductConfirmModal(false);
                  }}
                >
                  Hoàn tác
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

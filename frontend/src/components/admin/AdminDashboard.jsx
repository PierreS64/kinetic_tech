import React, { useState } from 'react';
import AdminModals from './AdminModals';
import OverviewTab from './OverviewTab';
import OrdersTab from './OrdersTab';
import ProductsTab from './ProductsTab';
import TicketsTab from './TicketsTab';
import WarrantiesTab from './WarrantiesTab';
import TradeInTab from './TradeInTab';
import FeedbacksTab from './FeedbacksTab';
import PromotionsTab from './PromotionsTab';
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

  const tabProps = {
    theme, orders, tickets, warranties, tradeins, feedbacks, storeProducts, setStoreProducts,
    setOrders, setTickets, setWarranties, setTradeins, setFeedbacks,
    selectedOrder, setSelectedOrder,
    promotions, setPromotions, isAddingPromo, setIsAddingPromo, newPromo, setNewPromo,
    selectedPromoForEdit, setSelectedPromoForEdit, productToAddToPromo, setProductToAddToPromo,
    handleAddPromo, handleDeletePromo, handleAddProductToPromo, handleRemoveProductFromPromo, handlePromoProductPriceChange,
    selectedTicket, setSelectedTicket, ticketReplyText, setTicketReplyText,
    selectedWarranty, setSelectedWarranty, selectedTradeIn, setSelectedTradeIn, offeredTradeInValuation, setOfferedTradeInValuation,
    isAddingProduct, setIsAddingProduct, newProduct, setNewProduct,
    orderSearch, setOrderSearch, productSearch, setProductSearch, selectedCategoryFilter, setSelectedCategoryFilter, inventorySort, setInventorySort,
    priceConfirmModal, setPriceConfirmModal, tempPriceInput, setTempPriceInput,
    detailedItem, setDetailedItem, productEditDraft, setProductEditDraft, productConfirmModal, setProductConfirmModal,
    textColor, getSoldThisMonth, formatVND, updateOrderStatus, toggleStock, updateProductPrice, handleManualPriceChange, handleAddProduct, handleReplyTicket, closeTicket, updateWarrantyStatus, submitTradeInValuation, handleInputBlurOrEnter, handleCloseDetailedModal, filteredOrders, filteredInventoryProducts,
    totalRevenue, pendingOrdersCount, outOfStockCount, activeTicketsCount
  };

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
            {activeTab === 'overview' && <OverviewTab {...tabProps} />}
            {activeTab === 'orders' && <OrdersTab {...tabProps} />}
            {activeTab === 'products' && <ProductsTab {...tabProps} />}
            {activeTab === 'tickets' && <TicketsTab {...tabProps} />}
            {activeTab === 'warranties' && <WarrantiesTab {...tabProps} />}
            {activeTab === 'tradein' && <TradeInTab {...tabProps} />}
            {activeTab === 'feedbacks' && <FeedbacksTab {...tabProps} />}
            {activeTab === 'promotions' && <PromotionsTab {...tabProps} />}

            {/* TAB 1: OVERVIEW COMPONENT */}

            {/* TAB 2: ORDERS MANAGEMENT */}

            {/* TAB 3: PRODUCT INVENTORY */}

            {/* TAB 4: SUPPORT TICKETS */}

            {/* TAB 5: WARRANTY CLAIMS */}

            {/* TAB 6: TRADE IN MANAGEMENT */}

            {/* TAB 7: FEEDBACKS MANAGEMENT */}

          </div>

        </div>

      </div>

      {/* Detailed Item Modal */}

      {/* Detail Modal overlay moved to root layout to avoid stacking context with glass-panel */}

      {/* Product Confirmation Modal */}

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import AdminModals from './AdminModals';
import OverviewTab from './OverviewTab';
import OrdersTab from './OrdersTab';
import ProductsTab from './ProductsTab';
import TicketsTab from './TicketsTab';
import WarrantiesTab from './WarrantiesTab';
import TradeInTab from './TradeInTab';
import FeedbacksTab from './FeedbacksTab';
import PromotionsTab from './PromotionsTab';
import VouchersTab from './VouchersTab';
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
import api from '../../utils/api';

export default function AdminDashboard({
  storeProducts,
  setStoreProducts,
  theme,
}) {
  const [orders, setOrders] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [warranties, setWarranties] = useState([]);
  const [tradeins, setTradeins] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [ordersRes, ticketsRes, tradeInsRes, feedbacksRes, couponsRes] = await Promise.all([
          api.get('/orders/all').catch(() => ({ data: [] })),
          api.get('/tickets').catch(() => ({ data: [] })),
          api.get('/trade-in').catch(() => ({ data: [] })),
          api.get('/feedback').catch(() => ({ data: [] })),
          api.get('/coupons').catch(() => ({ data: [] }))
        ]);
        setOrders(ordersRes.data || []);

        // Map tickets
        const mappedTickets = (ticketsRes.data || []).map(t => {
          const descMatch = t.description ? t.description.match(/^\[(.*?)\] - \[(.*?)\] - (.*)$/) : null;
          let subject = 'Hỗ trợ kỹ thuật #' + t.id.substring(0, 6).toUpperCase();
          let category = 'Khác';
          let pureDesc = t.description || '';

          if (descMatch) {
            subject = descMatch[1];
            category = descMatch[2];
            pureDesc = descMatch[3];
          }

          return {
            id: t.id,
            subject,
            category,
            status: t.status === 'OPEN' ? 'OPEN' : (t.status === 'CLOSED' || t.status === 'RESOLVED' ? 'CLOSED' : 'IN_PROGRESS'),
            urgency: t.severity === 'HIGH' ? 'Rất gấp' : (t.severity === 'MEDIUM' ? 'Gấp' : 'Thường'),
            customerName: t.User_Ticket_customerIdToUser?.fullName || 'Khách hàng',
            messages: [
              { sender: 'user', text: pureDesc, time: new Date(t.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) }
            ]
          };
        });
        setTickets(mappedTickets);

        // Map trade-ins
        const mappedTradeIns = (tradeInsRes.data || []).map(t => ({
          ...t,
          customerName: t.User?.fullName || 'Khách hàng',
          phone: t.User?.phoneNumber || 'N/A',
          oldDevice: t.deviceName,
          targetDevice: 'Sản phẩm Kinetic',
          conditionDesc: t.condition,
          selfValuation: t.estimatedValue || 0,
          offeredPrice: t.estimatedValue || 0,
          status: t.status === 'PENDING' ? 'PENDING' : (t.status === 'APPROVED' ? 'VALUED' : 'COMPLETED'),
        }));
        setTradeins(mappedTradeIns);

        // Map feedbacks
        const mappedFeedbacks = (feedbacksRes.data || []).map(f => ({
          ...f,
          fullName: f.User?.fullName || 'Khách hàng',
          email: f.User?.email || 'N/A',
          date: new Date(f.createdAt).toLocaleDateString('vi-VN')
        }));
        setFeedbacks(mappedFeedbacks);
        
        // Map coupons
        const mappedCoupons = (couponsRes.data || []).map(c => ({
          id: c.id,
          name: c.code,
          type: c.type,
          discountPercent: c.discountPercentage || 0,
          discountAmount: c.discountAmount || 0,
          startDate: new Date(c.validFrom).toISOString().split('T')[0],
          endDate: new Date(c.validUntil).toISOString().split('T')[0],
          salesCount: 0,
          revenue: 0,
          productIds: c.CouponProduct ? c.CouponProduct.map(cp => cp.productId) : []
        }));
        setPromotions(mappedCoupons.filter(c => c.type === 'PRODUCT_DISCOUNT'));
        setVouchers(mappedCoupons.filter(c => c.type === 'ORDER_DISCOUNT'));
      } catch (err) {
        console.error('Failed to fetch admin data', err);
      }
    };
    fetchAdminData();
  }, []);
  const [activeTab, setActiveTab] = useState(() => {
    try {
      return localStorage.getItem('kinetic_admin_tab') || 'overview';
    } catch {
      return 'overview';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kinetic_admin_tab', activeTab);
    } catch (e) {
      console.error('Failed to save admin tab', e);
    }
  }, [activeTab]);

  // Modal & Selection States
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Promotions States
  const [promotions, setPromotions] = useState([]);
  
  // Helper to get today's date as YYYY-MM-DD
  const getTodayStr = () => new Date().toISOString().split('T')[0];

  // Vouchers States
  const [vouchers, setVouchers] = useState([]);
  const [isAddingVoucher, setIsAddingVoucher] = useState(false);
  const [newVoucher, setNewVoucher] = useState({
    name: '',
    discountType: 'percent',
    discountValue: 10,
    startDate: getTodayStr(),
    endDate: getTodayStr()
  });

  const [isAddingPromo, setIsAddingPromo] = useState(false);
  const [newPromo, setNewPromo] = useState({
    name: '',
    discountPercent: 10,
    startDate: getTodayStr(),
    endDate: getTodayStr()
  });

  const [selectedPromoForEdit, setSelectedPromoForEdit] = useState(null);
  const [productToAddToPromo, setProductToAddToPromo] = useState('');

  const handleAddPromo = async (e) => {
    e.preventDefault();
    if (!newPromo.name) return;
    try {
      const res = await api.post('/coupons', {
        code: newPromo.name,
        type: 'PRODUCT_DISCOUNT',
        discountPercentage: Number(newPromo.discountPercent) || 0,
        validFrom: new Date(newPromo.startDate).toISOString(),
        validUntil: new Date(newPromo.endDate).toISOString(),
        productIds: []
      });
      const c = res.data;
      const promoToAdd = {
        id: c.id,
        name: c.code,
        type: c.type,
        discountPercent: c.discountPercentage || 0,
        startDate: new Date(c.validFrom).toISOString().split('T')[0],
        endDate: new Date(c.validUntil).toISOString().split('T')[0],
        salesCount: 0,
        revenue: 0,
        productIds: []
      };
      setPromotions(prev => [...prev, promoToAdd]);
      setIsAddingPromo(false);
      setNewPromo({
        name: '',
        discountPercent: 10,
        startDate: getTodayStr(),
        endDate: getTodayStr()
      });
    } catch (error) {
      console.error(error);
      alert('Lỗi tạo khuyến mãi');
    }
  };

  const handleDeletePromo = async (id) => {
    try {
      await api.delete(`/coupons/${id}`);
      setPromotions(prev => prev.filter(p => p.id !== id));
      if (selectedPromoForEdit?.id === id) setSelectedPromoForEdit(null);
    } catch (err) {
      console.error(err);
      alert('Lỗi xoá khuyến mãi');
    }
  };

  const handleAddVoucher = async (e) => {
    e.preventDefault();
    if (!newVoucher.name) return;
    try {
      const res = await api.post('/coupons', {
        code: newVoucher.name,
        type: 'ORDER_DISCOUNT',
        discountPercentage: newVoucher.discountType === 'percent' ? Number(newVoucher.discountValue) : null,
        discountAmount: newVoucher.discountType === 'cash' ? Number(newVoucher.discountValue) : null,
        validFrom: new Date(newVoucher.startDate).toISOString(),
        validUntil: new Date(newVoucher.endDate).toISOString(),
        productIds: []
      });
      const c = res.data;
      const voucherToAdd = {
        id: c.id,
        name: c.code,
        type: c.type,
        discountPercent: c.discountPercentage || 0,
        discountAmount: c.discountAmount || 0,
        startDate: new Date(c.validFrom).toISOString().split('T')[0],
        endDate: new Date(c.validUntil).toISOString().split('T')[0]
      };
      setVouchers(prev => [...prev, voucherToAdd]);
      setIsAddingVoucher(false);
      setNewVoucher({
        name: '',
        discountType: 'percent',
        discountValue: 10,
        startDate: getTodayStr(),
        endDate: getTodayStr()
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteVoucher = async (id) => {
    try {
      await api.delete(`/coupons/${id}`);
      setVouchers(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProductToPromo = async (promoId, prodId) => {
    if (!prodId) return;
    try {
      await api.post(`/coupons/${promoId}/products`, { productId: prodId });
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
    } catch (err) {
      console.error('Failed to add product to promo', err);
    }
  };

  const handleRemoveProductFromPromo = async (promoId, prodId) => {
    try {
      await api.delete(`/coupons/${promoId}/products/${prodId}`);
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
    } catch (err) {
      console.error('Failed to remove product from promo', err);
    }
  };

  const handleRemoveAllProductsFromPromo = async (promoId) => {
    try {
      await api.delete(`/coupons/${promoId}/products`);
      setPromotions(prev => prev.map(promo => {
        if (promo.id === promoId) {
          return {
            ...promo,
            productIds: []
          };
        }
        return promo;
      }));
      if (selectedPromoForEdit && selectedPromoForEdit.id === promoId) {
        setSelectedPromoForEdit(prev => ({
          ...prev,
          productIds: []
        }));
      }
    } catch (err) {
      console.error('Failed to remove all products from promo', err);
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
    file: null
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
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status: newStatus });
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi cập nhật trạng thái đơn hàng');
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

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('category', newProduct.category);
      formData.append('price', newProduct.price);
      if (newProduct.oldPrice) formData.append('oldPrice', newProduct.oldPrice);
      if (newProduct.cpu) formData.append('cpu', newProduct.cpu);
      if (newProduct.ram) formData.append('ram', newProduct.ram);
      if (newProduct.storage) formData.append('storage', newProduct.storage);
      if (newProduct.gpu) formData.append('gpu', newProduct.gpu);
      if (newProduct.tags) formData.append('tags', newProduct.tags);
      formData.append('inStock', newProduct.inStock ? 'true' : 'false');

      if (newProduct.file) {
        formData.append('image', newProduct.file);
      }

      const res = await api.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const p = res.data;

      // Map API product to UI format
      let specs = {};
      try { specs = JSON.parse(p.description); } catch { specs = { Brand: p.brand }; }
      const image = p.ProductImage?.find(img => img.isThumbnail)?.imageUrl ||
        p.ProductImage?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=400';
      const variant = p.ProductVariant?.[0] || {};

      const productToAdd = {
        id: p.id,
        name: p.name,
        category: p.Category?.name || newProduct.category,
        price: variant.price || parseFloat(newProduct.price),
        oldPrice: (variant.price || parseFloat(newProduct.price)) * 1.1,
        image: image,
        specs: specs,
        ...specs,
        rating: 5.0,
        reviews: 0,
        tags: newProduct.tags ? newProduct.tags.split(',').map(t => t.trim()) : [newProduct.category],
        featured: false,
        inStock: newProduct.inStock
      };

      setStoreProducts(prev => [productToAdd, ...prev]);
      setIsAddingProduct(false);
      setNewProduct({
        name: '', category: 'laptop', price: '', oldPrice: '',
        cpu: '', ram: '', storage: '', gpu: '', inStock: true, tags: '', file: null
      });
    } catch (error) {
      console.error(error);
      alert('Lỗi khi thêm sản phẩm: ' + (error.response?.data?.message || error.message));
    }
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

  const closeTicket = async (ticketId) => {
    try {
      await api.patch(`/tickets/${ticketId}/status`, { status: 'CLOSED' });
      setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'CLOSED' } : t));
      if (selectedTicket && selectedTicket.id === ticketId) {
        setSelectedTicket(prev => ({ ...prev, status: 'CLOSED' }));
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi đóng yêu cầu hỗ trợ');
    }
  };

  // 4. Warranty handlers
  const updateWarrantyStatus = (claimId, newStatus) => {
    setWarranties(prev => prev.map(w => w.id === claimId ? { ...w, status: newStatus } : w));
    if (selectedWarranty && selectedWarranty.id === claimId) {
      setSelectedWarranty(prev => ({ ...prev, status: newStatus }));
    }
  };

  const submitTradeInValuation = async (e) => {
    e.preventDefault();
    if (!offeredTradeInValuation || !selectedTradeIn) return;

    const value = parseInt(offeredTradeInValuation) || 0;
    try {
      await api.patch(`/trade-in/${selectedTradeIn.id}/status`, {
        status: 'APPROVED',
        estimatedValue: value
      });
      setTradeins(prev => prev.map(t => t.id === selectedTradeIn.id ? { ...t, offeredPrice: value, status: 'VALUED' } : t));
      setSelectedTradeIn(prev => ({ ...prev, offeredPrice: value, status: 'VALUED' }));
      setOfferedTradeInValuation('');
    } catch (err) {
      console.error(err);
      alert('Lỗi cập nhật thẩm định giá');
    }
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
    handleAddPromo, handleDeletePromo, handleAddProductToPromo, handleRemoveProductFromPromo, handleRemoveAllProductsFromPromo, handlePromoProductPriceChange,
    vouchers, setVouchers, isAddingVoucher, setIsAddingVoucher, newVoucher, setNewVoucher,
    handleAddVoucher, handleDeleteVoucher,
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
      <div  className="container">

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
          <div  style={{ padding: '20px', borderRadius: 'var(--rounded-lg)', display: 'flex', alignItems: 'center', gap: '16px' }} className="glass-panel-glow-blue">
            <div style={{ background: 'rgba(0,123,255,0.15)', width: '46px', height: '46px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
              <DollarSign size={22} color="var(--color-primary-dim)" />
            </div>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', display: 'block', textTransform: 'uppercase', fontWeight: '700' }}>Doanh Thu (Hoàn thành)</span>
              <strong style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-primary-dim)', display: 'block', marginTop: '2px' }}>{formatVND(totalRevenue)}</strong>
            </div>
          </div>

          {/* Card 2: Pending Orders */}
          <div  style={{ padding: '20px', borderRadius: 'var(--rounded-lg)', display: 'flex', alignItems: 'center', gap: '16px' }} className="glass-panel">
            <div style={{ background: 'rgba(253,139,0,0.15)', width: '46px', height: '46px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingBag size={22} color="var(--color-secondary-dim)" />
            </div>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', display: 'block', textTransform: 'uppercase', fontWeight: '700' }}>Đơn hàng cần xử lý</span>
              <strong style={{ fontSize: '20px', fontWeight: '800', color: '#fd8b00', display: 'block', marginTop: '2px' }}>{pendingOrdersCount} đơn</strong>
            </div>
          </div>

          {/* Card 3: Out of Stock items */}
          <div  style={{ padding: '20px', borderRadius: 'var(--rounded-lg)', display: 'flex', alignItems: 'center', gap: '16px' }} className="glass-panel">
            <div style={{ background: 'rgba(255,76,76,0.15)', width: '46px', height: '46px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={22} color="#ffb4ab" />
            </div>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', display: 'block', textTransform: 'uppercase', fontWeight: '700' }}>Sản phẩm hết hàng</span>
              <strong style={{ fontSize: '20px', fontWeight: '800', color: '#d32f2f', display: 'block', marginTop: '2px' }}>{outOfStockCount} sản phẩm</strong>
            </div>
          </div>

          {/* Card 4: Technical Tickets */}
          <div  style={{ padding: '20px', borderRadius: 'var(--rounded-lg)', display: 'flex', alignItems: 'center', gap: '16px' }} className="glass-panel">
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
        <div style={{ display: 'grid', gap: '30px', alignItems: 'start' }}   className="grid-responsive-sidebar-narrow admin-grid">

          {/* Left Sidebar Navigation */}
          <div  style={{ borderRadius: 'var(--rounded-lg)', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }} className="glass-panel">
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
                
                style={{
                  justifyContent: 'flex-start',
                  padding: '10px 14px',
                  fontSize: '13px',
                  background: activeTab === 'promotions' ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === 'promotions' ? 'white' : 'var(--color-on-surface)'
                }}
                className="btn" onClick={() => setActiveTab('promotions')}
              >
                <Tag size={16} /> Chương trình khuyến mãi ({promotions.length})
              </button>
              <button 
                
                style={{
                  justifyContent: 'flex-start',
                  padding: '10px 14px',
                  fontSize: '13px',
                  background: activeTab === 'vouchers' ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === 'vouchers' ? 'white' : 'var(--color-on-surface)'
                }}
                className="btn" onClick={() => setActiveTab('vouchers')}
              >
                <Tag size={16} /> Mã giảm giá Voucher ({vouchers.length})
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
            {activeTab === 'vouchers' && <VouchersTab {...tabProps} />}

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
      <AdminModals {...tabProps} />

      {/* Detail Modal overlay moved to root layout to avoid stacking context with glass-panel */}

      {/* Product Confirmation Modal */}

    </div>
  );
}

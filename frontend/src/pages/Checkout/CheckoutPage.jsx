import React, { useState, useMemo, useEffect } from 'react';
import EmptyCart from '../../components/checkout/EmptyCart';
import OrderReceipt from '../../components/checkout/OrderReceipt';
import CheckoutSidebar from '../../components/checkout/CheckoutSidebar';
import { 
  CreditCard, 
  MapPin, 
  Truck, 
  Tag, 
  QrCode, 
  DollarSign, 
  ShoppingBag, 
  ChevronLeft, 
  CheckCircle2, 
  FileText, 
  Loader2,
  Calendar,
  User,
  Phone,
  Mail
} from 'lucide-react';
import api from '../../utils/api';

import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Checkout({ onClearCart, setActiveView, onUpdateQuantity, onRemoveItem, onAddOrder }) {
  const { currentUser } = useAuth();
  const { cartItems, handleUpdateQuantity, handleRemoveItem, handleClearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const buyNowItem = location.state?.buyNowItem;
  const [localBuyNowItem, setLocalBuyNowItem] = useState(buyNowItem ? [buyNowItem] : null);
  
  useEffect(() => {
    const item = location.state?.buyNowItem;
    setLocalBuyNowItem(item ? [item] : null);
  }, [location.state]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get('status');
    const orderId = params.get('orderId');
    if (status === 'success') {
      const type = localStorage.getItem('pending_checkout_type');
      if (type === 'cart' && handleClearCart) {
        handleClearCart();
      }
      localStorage.removeItem('pending_checkout_type');
      
      if (orderId) {
        api.get(`/orders/${orderId}`).then(res => {
          const data = res.data;
          const today = new Date(data.createdAt).toLocaleDateString('vi-VN', {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
          });
          setOrderReceipt({
            orderId: data.id,
            date: today,
            customerName: data.User?.fullName || '',
            phone: data.User?.phoneNumber || '',
            email: data.User?.email || '',
            address: 'Thanh toán trực tuyến',
            paymentMethod: 'Thanh toán trực tuyến (PayOS)',
            items: data.OrderItem.map(i => ({ ...i, ...i.ProductVariant, name: i.ProductVariant.Product.name })),
            subtotal: data.totalAmount,
            shippingCost: 0,
            vatTax: 0,
            discountAmount: 0,
            total: data.totalAmount,
            notes: ''
          });
        }).catch(console.error);
      }
    }
  }, [location.search, handleClearCart]);

  const effectiveCartItems = localBuyNowItem || cartItems;

  const localHandleUpdateQuantity = (id, quantity) => {
    if (localBuyNowItem) {
      setLocalBuyNowItem(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    } else {
      handleUpdateQuantity(id, quantity);
    }
  };

  const localHandleRemoveItem = (id) => {
    if (localBuyNowItem) {
      setLocalBuyNowItem([]);
    } else {
      handleRemoveItem(id);
    }
  };

  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    city: '',
    district: '',
    ward: '',
    address: currentUser?.address || '',
    notes: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod', 'bank', 'card'
  const [cardData, setCardData] = useState({ name: '', number: '', expiry: '', cvv: '' });
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null); // { code: '...', discountPercent: 5, discountCash: 0 }
  const [promoError, setPromoError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState(null); // stores confirmation receipt details

  // Format currency helper
  const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  // Cart calculations
  const subtotal = useMemo(() => {
    return effectiveCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [effectiveCartItems]);

  const shippingCost = useMemo(() => {
    if (subtotal > 15000000 || (appliedPromo && appliedPromo.code === 'FREESHIP')) {
      return 0;
    }
    return 45000; // Flat 45k standard delivery
  }, [subtotal, appliedPromo]);

  const vatTax = useMemo(() => {
    return Math.round(subtotal * 0.08); // 8% VAT
  }, [subtotal]);

  const discountAmount = useMemo(() => {
    if (!appliedPromo) return 0;
    if (appliedPromo.discountPercent) {
      return Math.round(subtotal * (appliedPromo.discountPercent / 100));
    }
    if (appliedPromo.discountCash) {
      return appliedPromo.discountCash;
    }
    return 0;
  }, [subtotal, appliedPromo]);

  const total = useMemo(() => {
    return subtotal + vatTax + shippingCost - discountAmount;
  }, [subtotal, vatTax, shippingCost, discountAmount]);

  const handleApplyPromo = async (e) => {
    if (e) e.preventDefault();
    if (!promoCode.trim()) return;
    setPromoError('');
    try {
      const res = await api.get(`/coupons/apply/${promoCode}`);
      const coupon = res.data;
      setAppliedPromo({
        id: coupon.id,
        code: coupon.code,
        discountPercent: coupon.discountPercentage || 0,
        discountCash: coupon.discountAmount || 0,
        label: coupon.discountPercentage ? `Giảm ${coupon.discountPercentage}%` : `Giảm ${formatVND(coupon.discountAmount)}`
      });
      setPromoCode('');
    } catch (err) {
      setPromoError(err.response?.data?.message || 'Mã giảm giá không hợp lệ hoặc đã hết hạn.');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    // Require login
    if (!currentUser) {
      alert('Vui lòng đăng nhập để tiến hành đặt hàng.');
      navigate('/login');
      return;
    }

    
    // Check cart
    if (effectiveCartItems.length === 0) {
      alert('Giỏ hàng trống! Vui lòng chọn sản phẩm trước.');
      return;
    }

    // Basic Validation
    if (!formData.fullName || !formData.phone || !formData.email || !formData.city || !formData.address) {
      alert('Vui lòng điền đầy đủ thông tin giao hàng cơ bản.');
      return;
    }

    if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      alert('Số điện thoại giao hàng không hợp lệ! Vui lòng nhập 10-11 chữ số (ví dụ: 0912345678).');
      return;
    }

    if (paymentMethod === 'card' && (!cardData.number || !cardData.cvv)) {
      alert('Vui lòng điền đầy đủ thông tin thẻ tín dụng.');
      return;
    }

    setIsProcessing(true);
    
    try {
      const fullAddress = `${formData.address}, ${formData.ward ? formData.ward + ', ' : ''}${formData.district}, ${formData.city}`;
      
      const payload = {
        shippingAddress: fullAddress,
        paymentMethod: paymentMethod === 'cod' ? 'COD' : 'PAYOS',
        ...(appliedPromo?.id && { couponId: appliedPromo.id }),
        items: effectiveCartItems.map(i => ({ productId: i.id, quantity: i.quantity }))
      };
      
      const res = await api.post('/orders', payload);
      const data = res.data;
      
      if (data.checkoutUrl) {
        // Redirect to PayOS
        localStorage.setItem('pending_checkout_type', localBuyNowItem ? 'buynow' : 'cart');
        window.location.href = data.checkoutUrl;
      } else {
        // COD Success
        setIsProcessing(false);
        const today = new Date().toLocaleDateString('vi-VN', {
          year: 'numeric', month: 'long', day: 'numeric',
          hour: '2-digit', minute: '2-digit'
        });

        if (onAddOrder) {
          onAddOrder(data);
        }

        setOrderReceipt({
          orderId: data.id,
          date: today,
          customerName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          address: fullAddress,
          paymentMethod: 'Thanh toán COD (Tiền mặt khi nhận hàng)',
          items: [...effectiveCartItems],
          subtotal,
          shippingCost,
          vatTax,
          discountAmount,
          total,
          notes: formData.notes
        });
        
        // Clear cart immediately after successful order
        if (!localBuyNowItem && handleClearCart) {
          await handleClearCart();
        } else if (localBuyNowItem) {
          setLocalBuyNowItem([]); // clear local cart
        }
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.');
      setIsProcessing(false);
    }
  };

  const handleFinish = () => {
    navigate('/');
  };

  // If empty and no receipt, show empty cart
  if (effectiveCartItems.length === 0 && !orderReceipt) return <EmptyCart setActiveView={setActiveView} />;

  // If order is completed, render Receipt page
  if (orderReceipt) return <OrderReceipt orderReceipt={orderReceipt} formatVND={formatVND} handleFinish={handleFinish} />;

  // Regular Checkout Form View
  return (
    <div  style={{ paddingTop: '40px' }} className="container">
      
      {/* Return link */}
      <button 
        onClick={() => navigate('/')}
        className="btn btn-ghost"
        style={{ padding: '0 8px', marginBottom: '24px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
      >
        <ChevronLeft size={16} /> Quay lại cửa hàng
      </button>

      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'Montserrat' }}>TIẾN HÀNH THANH TOÁN</h2>
        <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
          Vui lòng hoàn tất thông tin giao hàng và chọn phương thức thanh toán bên dưới.
        </p>
      </div>

      <div style={{
        display: 'grid', gap: '30px'
      }}   className="grid-responsive-checkout catalog-layout">
        
        {/* Left Column: Form details */}
        <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Shipping Form Box */}
          <div  style={{ padding: '24px', borderRadius: 'var(--rounded-md)' }} className="glass-panel">
            <h3 style={{ fontSize: '15px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px', marginBottom: '20px' }}>
              <MapPin size={18} color="var(--color-primary-dim)" />
              1. THÔNG TIN GIAO HÀNG
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gap: '16px' }}  className="grid-responsive-2col">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-on-surface)' }}>Họ và tên người nhận *</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="text" 
                      name="fullName"
                      required
                      placeholder="Họ tên người nhận..."
                      value={formData.fullName}
                      onChange={handleInputChange}
                      
                      style={{ paddingLeft: '36px', fontSize: '13px' }}
                     className="form-input" />
                    <User size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-outline)' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-on-surface)' }}>Số điện thoại liên hệ *</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      placeholder="Số điện thoại di động..."
                      value={formData.phone}
                      onChange={handleInputChange}
                      
                      style={{ paddingLeft: '36px', fontSize: '13px' }}
                     className="form-input" />
                    <Phone size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-outline)' }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-on-surface)' }}>Địa chỉ Email nhận hóa đơn *</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="example@gmail.com..."
                    value={formData.email}
                    onChange={handleInputChange}
                    
                    style={{ paddingLeft: '36px', fontSize: '13px' }}
                   className="form-input" />
                  <Mail size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-outline)' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gap: '12px' }}  className="grid-responsive-3col">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-on-surface)' }}>Tỉnh / Thành phố *</label>
                  <input 
                    type="text" 
                    name="city"
                    required
                    placeholder="Ví dụ: Hà Nội..."
                    value={formData.city}
                    onChange={handleInputChange}
                    
                    style={{ fontSize: '13px' }}
                   className="form-input" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-on-surface)' }}>Quận / Huyện *</label>
                  <input 
                    type="text" 
                    name="district"
                    required
                    placeholder="Quận Cầu Giấy..."
                    value={formData.district}
                    onChange={handleInputChange}
                    
                    style={{ fontSize: '13px' }}
                   className="form-input" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-on-surface)' }}>Phường / Xã</label>
                  <input 
                    type="text" 
                    name="ward"
                    placeholder="Phường Dịch Vọng..."
                    value={formData.ward}
                    onChange={handleInputChange}
                    
                    style={{ fontSize: '13px' }}
                   className="form-input" />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-on-surface)' }}>Địa chỉ chi tiết (Số nhà, tên đường...) *</label>
                <input 
                  type="text" 
                  name="address"
                  required
                  placeholder="Nhập số nhà, ngõ ngách, tên đường..."
                  value={formData.address}
                  onChange={handleInputChange}
                  
                  style={{ fontSize: '13px' }}
                 className="form-input" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-on-surface)' }}>Ghi chú đơn hàng (Không bắt buộc)</label>
                <textarea 
                  name="notes"
                  placeholder="Ghi chú thời gian giao hàng, hướng dẫn chỉ đường..."
                  rows="3"
                  value={formData.notes}
                  onChange={handleInputChange}
                  
                  style={{ fontSize: '13px', resize: 'vertical' }}
                 className="form-input" />
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div  style={{ padding: '24px', borderRadius: 'var(--rounded-md)' }} className="glass-panel">
            <h3 style={{ fontSize: '15px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px', marginBottom: '20px' }}>
              <CreditCard size={18} color="var(--color-primary-dim)" />
              2. PHƯƠNG THỨC THANH TOÁN
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* COD */}
              <label 
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: 'var(--rounded)',
                  border: `1px solid ${paymentMethod === 'cod' ? 'var(--color-primary)' : 'rgba(255,255,255,0.06)'}`,
                  background: paymentMethod === 'cod' ? 'rgba(0,123,255,0.05)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  style={{ marginTop: '3px', accentColor: 'var(--color-primary)' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-on-surface)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <DollarSign size={14} color="var(--color-secondary-dim)" />
                    Thanh toán khi nhận hàng (COD)
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>
                    Nhận hàng rồi trả tiền mặt trực tiếp cho nhân viên vận chuyển (áp dụng toàn quốc).
                  </span>
                </div>
              </label>

              {/* Bank transfer QR */}
              <label 
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: 'var(--rounded)',
                  border: `1px solid ${paymentMethod === 'bank' ? 'var(--color-primary)' : 'rgba(255,255,255,0.06)'}`,
                  background: paymentMethod === 'bank' ? 'rgba(0,123,255,0.05)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  checked={paymentMethod === 'bank'}
                  onChange={() => setPaymentMethod('bank')}
                  style={{ marginTop: '3px', accentColor: 'var(--color-primary)' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-on-surface)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <QrCode size={14} color="var(--color-primary-dim)" />
                    Chuyển khoản nhanh qua mã QR (Khuyên dùng)
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>
                    Quét mã QR tự động điền số tiền và nội dung chuyển khoản để xác thực tự động 24/7.
                  </span>
                  
                  {paymentMethod === 'bank' && (
                    <div 
                      
                      style={{
                        marginTop: '12px',
                        padding: '16px',
                        background: 'rgba(0,0,0,0.2)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: 'var(--rounded-md)',
                        display: 'flex',
                        gap: '20px',
                        alignItems: 'center'
                      }}
                     className="animate-fade-in-up">
                      {/* QR Box mockup */}
                      <div style={{
                        background: 'white',
                        padding: '8px',
                        borderRadius: 'var(--rounded-sm)',
                        width: '120px',
                        height: '120px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                      }}>
                        <img 
                          src={`https://img.vietqr.io/image/TCB-1902049583739-compact.jpg?amount=${total}&addInfo=${encodeURIComponent('KINETIC ' + formData.phone)}&accountName=${encodeURIComponent('CTY CP KINETIC TECH STORE')}`} 
                          alt="Bank Transfer QR Code" 
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </div>
                      <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--color-on-surface-variant)' }}>
                        <p>Ngân hàng: <strong>Techcombank (TCB)</strong></p>
                        <p>Số tài khoản: <strong style={{ color: 'var(--color-on-surface)' }}>1902049583739</strong></p>
                        <p>Chủ tài khoản: <strong>CTY CP KINETIC TECH STORE</strong></p>
                        <p>Số tiền: <strong style={{ color: 'var(--color-secondary-dim)' }}>{formatVND(total)}</strong></p>
                        <p>Nội dung CK: <strong style={{ color: 'var(--color-secondary-dim)' }}>KINETIC {formData.phone || 'SĐT'}</strong></p>
                        <p style={{ fontStyle: 'italic', fontSize: '11px', color: '#81c784', marginTop: '4px' }}>
                          * Hệ thống sẽ tự động duyệt đơn hàng sau khi nhận được tiền.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </label>

              {/* Credit card fields */}
              <label 
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: 'var(--rounded)',
                  border: `1px solid ${paymentMethod === 'card' ? 'var(--color-primary)' : 'rgba(255,255,255,0.06)'}`,
                  background: paymentMethod === 'card' ? 'rgba(0,123,255,0.05)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  style={{ marginTop: '3px', accentColor: 'var(--color-primary)' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-on-surface)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CreditCard size={14} color="var(--color-primary-dim)" />
                    Thẻ tín dụng Quốc tế (Visa, Mastercard, JCB)
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>
                    Thanh toán trực tuyến bảo mật cao qua cổng thanh toán OnePay / Stripe.
                  </span>

                  {paymentMethod === 'card' && (
                    <div 
                      
                      style={{
                        marginTop: '12px',
                        padding: '16px',
                        background: 'rgba(0,0,0,0.2)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: 'var(--rounded-md)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}
                     className="animate-fade-in-up">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-on-surface)' }}>Tên in trên thẻ</span>
                        <input 
                          type="text" 
                          name="name"
                          placeholder="NGUYEN VAN A"
                          value={cardData.name}
                          onChange={handleCardChange}
                          
                          style={{ textTransform: 'uppercase', fontSize: '12px', padding: '8px 12px' }}
                         className="form-input" />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--color-on-surface)' }}>Số thẻ</span>
                        <input 
                          type="text" 
                          name="number"
                          placeholder="4129 8837 9928 1084"
                          value={cardData.number}
                          onChange={handleCardChange}
                          
                          style={{ fontSize: '12px', padding: '8px 12px' }}
                         className="form-input" />
                      </div>
                      <div style={{ display: 'grid', gap: '10px' }}  className="grid-responsive-2col">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={{ fontSize: '11px', color: 'var(--color-on-surface)' }}>Hạn dùng (MM/YY)</span>
                          <input 
                            type="text" 
                            name="expiry"
                            placeholder="12/28"
                            value={cardData.expiry}
                            onChange={handleCardChange}
                            
                            style={{ fontSize: '12px', padding: '8px 12px' }}
                           className="form-input" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={{ fontSize: '11px', color: 'var(--color-on-surface)' }}>Mã bí mật CVV</span>
                          <input 
                            type="password" 
                            name="cvv"
                            placeholder="***"
                            maxLength="3"
                            value={cardData.cvv}
                            onChange={handleCardChange}
                            
                            style={{ fontSize: '12px', padding: '8px 12px' }}
                           className="form-input" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>
        </form>
        <CheckoutSidebar 
          cartItems={effectiveCartItems} formatVND={formatVND} onUpdateQuantity={localHandleUpdateQuantity} 
          onRemoveItem={localHandleRemoveItem} promoCode={promoCode} setPromoCode={setPromoCode} 
          promoError={promoError} setPromoError={setPromoError} handleApplyPromo={handleApplyPromo} 
          appliedPromo={appliedPromo} handleRemovePromo={handleRemovePromo} subtotal={subtotal} 
          shippingCost={shippingCost} vatTax={vatTax} discountAmount={discountAmount} 
          total={total} handleSubmitOrder={handleSubmitOrder} isProcessing={isProcessing} currentUser={currentUser}
        />

      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(76, 175, 80, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); }
        }
      `}</style>
    </div>
  );
}

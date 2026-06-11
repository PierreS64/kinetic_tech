import React, { useState, useMemo } from 'react';
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

export default function Checkout({ cartItems, onClearCart, setActiveView, onUpdateQuantity, onRemoveItem, currentUser, onAddOrder }) {
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
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cartItems]);

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

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    
    if (code === 'KINETIC5') {
      setAppliedPromo({
        code: 'KINETIC5',
        discountPercent: 5,
        label: 'Giảm giá 5% hóa đơn'
      });
      setPromoCode('');
    } else if (code === 'FREESHIP') {
      setAppliedPromo({
        code: 'FREESHIP',
        discountPercent: 0,
        discountCash: 0,
        label: 'Miễn phí vận chuyển toàn quốc'
      });
      setPromoCode('');
    } else if (code === 'HELLO') {
      setAppliedPromo({
        code: 'HELLO',
        discountPercent: 0,
        discountCash: 500000,
        label: 'Giảm trực tiếp 500.000đ'
      });
      setPromoCode('');
    } else {
      setPromoError('Mã giảm giá không tồn tại hoặc đã hết hạn.');
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

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    
    // Check cart
    if (cartItems.length === 0) {
      alert('Giỏ hàng trống! Vui lòng chọn sản phẩm trước.');
      return;
    }

    // Basic Validation
    if (!formData.fullName || !formData.phone || !formData.email || !formData.city || !formData.address) {
      alert('Vui lòng điền đầy đủ thông tin giao hàng cơ bản.');
      return;
    }

    if (paymentMethod === 'card' && (!cardData.number || !cardData.cvv)) {
      alert('Vui lòng điền đầy đủ thông tin thẻ tín dụng.');
      return;
    }

    // Start simulation
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      const randomOrderId = 'KT-' + Math.floor(100000 + Math.random() * 900000);
      const today = new Date().toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const createdOrder = {
        id: randomOrderId,
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        total: total,
        paymentMethod: paymentMethod === 'cod' 
          ? 'Thanh toán COD' 
          : paymentMethod === 'bank' 
            ? 'Chuyển khoản VietQR' 
            : 'Thẻ tín dụng',
        status: 'pending',
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        address: `${formData.address}, ${formData.ward || ''}, ${formData.district}, ${formData.city}`
      };

      if (onAddOrder) {
        onAddOrder(createdOrder);
      }

      setOrderReceipt({
        orderId: randomOrderId,
        date: today,
        customerName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: `${formData.address}, ${formData.ward || ''}, ${formData.district}, ${formData.city}`,
        paymentMethod: paymentMethod === 'cod' 
          ? 'Thanh toán COD (Tiền mặt khi nhận hàng)' 
          : paymentMethod === 'bank' 
            ? 'Chuyển khoản Ngân hàng (Đang xác thực)' 
            : 'Thẻ tín dụng Quốc tế (Đã thanh toán)',
        items: [...cartItems],
        subtotal,
        shippingCost,
        vatTax,
        discountAmount,
        total,
        notes: formData.notes
      });
    }, 2000);
  };

  const handleFinish = () => {
    onClearCart();
    setActiveView('deals');
  };

  // If cart is empty and no order placed yet, render empty cart state
  if (cartItems.length === 0 && !orderReceipt) {
    return (
      <div className="container animate-fade-in-up" style={{ paddingTop: '60px', maxWidth: '480px' }}>
        <div 
          className="glass-panel" 
          style={{
            padding: '40px 30px',
            borderRadius: 'var(--rounded-lg)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <ShoppingBag size={48} color="var(--color-outline)" />
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'white' }}>Giỏ hàng của bạn đang trống!</h3>
          <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', lineHeight: '1.5' }}>
            Vui lòng chọn sản phẩm và thêm vào giỏ hàng trước khi tiến hành thanh toán.
          </p>
          <button 
            onClick={() => setActiveView('deals')}
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px' }}
          >
            Quay lại cửa hàng
          </button>
        </div>
      </div>
    );
  }

  // If order is completed, render Receipt page
  if (orderReceipt) {
    return (
      <div className="container" style={{ paddingTop: '40px', maxWidth: '680px' }}>
        <div 
          className="glass-panel animate-fade-in-up" 
          style={{
            borderRadius: 'var(--rounded-lg)',
            border: '1px solid rgba(76, 175, 80, 0.25)',
            boxShadow: '0 0 30px rgba(76, 175, 80, 0.1)',
            overflow: 'hidden'
          }}
        >
          {/* Header success */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.02))',
            padding: '40px 30px',
            textAlign: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(76, 175, 80, 0.15)',
              border: '2px solid #81c784',
              marginBottom: '16px',
              animation: 'pulse 2s infinite'
            }}>
              <CheckCircle2 size={36} color="#81c784" />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', letterSpacing: '0.5px' }}>
              ĐẶT HÀNG THÀNH CÔNG!
            </h2>
            <p style={{ fontSize: '13px', color: '#a5d6a7', marginTop: '6px' }}>
              Mã đơn hàng: <strong style={{ color: 'white', fontSize: '15px' }}>{orderReceipt.orderId}</strong>
            </p>
            <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '8px' }}>
              Đơn hàng của bạn đã được ghi nhận trên hệ thống và chuyên viên sẽ liên hệ trong 15 phút.
            </p>
          </div>

          {/* Receipt details */}
          <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Info meta */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              fontSize: '13px',
              background: 'rgba(0,0,0,0.15)',
              padding: '16px',
              borderRadius: 'var(--rounded-md)',
              border: '1px solid rgba(255,255,255,0.04)'
            }}>
              <div>
                <span style={{ color: 'var(--color-outline)', display: 'block', marginBottom: '4px' }}>Thời gian đặt hàng:</span>
                <span style={{ color: 'white', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={13} /> {orderReceipt.date}
                </span>
              </div>
              <div>
                <span style={{ color: 'var(--color-outline)', display: 'block', marginBottom: '4px' }}>Phương thức thanh toán:</span>
                <span style={{ color: 'white', fontWeight: '600' }}>{orderReceipt.paymentMethod}</span>
              </div>
            </div>

            {/* Delivery address details */}
            <div>
              <h4 style={{ fontSize: '13px', color: 'var(--color-outline)', textTransform: 'uppercase', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} color="var(--color-primary-dim)" />
                THÔNG TIN NHẬN HÀNG
              </h4>
              <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px', color: 'var(--color-on-surface)' }}>
                <p><strong>Người nhận:</strong> {orderReceipt.customerName}</p>
                <p><strong>Điện thoại:</strong> {orderReceipt.phone}</p>
                <p><strong>Email:</strong> {orderReceipt.email}</p>
                <p><strong>Địa chỉ giao:</strong> {orderReceipt.address}</p>
                {orderReceipt.notes && <p><strong>Ghi chú:</strong> {orderReceipt.notes}</p>}
              </div>
            </div>

            {/* Purchased Items list */}
            <div>
              <h4 style={{ fontSize: '13px', color: 'var(--color-outline)', textTransform: 'uppercase', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShoppingBag size={14} color="var(--color-primary-dim)" />
                CHI TIẾT ĐƠN HÀNG
              </h4>
              <div style={{
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: 'var(--rounded-md)',
                overflow: 'hidden'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }} className="zebra-table">
                  <thead>
                    <tr style={{ background: 'rgba(0,0,0,0.2)', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      <th style={{ padding: '10px 14px', color: 'var(--color-outline)' }}>Sản phẩm</th>
                      <th style={{ padding: '10px 14px', textAlign: 'center', color: 'var(--color-outline)' }}>SL</th>
                      <th style={{ padding: '10px 14px', textAlign: 'right', color: 'var(--color-outline)' }}>Đơn giá</th>
                      <th style={{ padding: '10px 14px', textAlign: 'right', color: 'var(--color-outline)' }}>Tổng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderReceipt.items.map(item => (
                      <tr key={item.id}>
                        <td style={{ padding: '10px 14px', color: 'white', fontWeight: '500' }}>{item.name}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'center', color: 'var(--color-on-surface-variant)' }}>{item.quantity}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', color: 'var(--color-on-surface-variant)' }}>{formatVND(item.price)}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', color: 'white', fontWeight: '600' }}>{formatVND(item.price * item.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Calculations breakdown */}
            <div style={{
              borderTop: '1px dashed rgba(255,255,255,0.1)',
              paddingTop: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontSize: '13px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-on-surface-variant)' }}>
                <span>Tạm tính:</span>
                <span>{formatVND(orderReceipt.subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-on-surface-variant)' }}>
                <span>Thuế VAT (8%):</span>
                <span>{formatVND(orderReceipt.vatTax)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-on-surface-variant)' }}>
                <span>Phí vận chuyển:</span>
                <span>{orderReceipt.shippingCost === 0 ? 'Miễn phí' : formatVND(orderReceipt.shippingCost)}</span>
              </div>
              {orderReceipt.discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ffb77d' }}>
                  <span>Chiết khấu giảm giá:</span>
                  <span>-{formatVND(orderReceipt.discountAmount)}</span>
                </div>
              )}
              <div style={{
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '18px', 
                fontWeight: '800', 
                color: 'var(--color-secondary-dim)',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: '12px',
                marginTop: '6px'
              }}>
                <span>Tổng cộng:</span>
                <span>{formatVND(orderReceipt.total)}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
              <button 
                onClick={() => window.print()}
                className="btn btn-outline"
                style={{ flex: 1, padding: '12px', gap: '8px' }}
              >
                <FileText size={16} />
                In hóa đơn
              </button>
              <button 
                onClick={handleFinish}
                className="btn btn-secondary"
                style={{ flex: 1, padding: '12px' }}
              >
                Tiếp tục mua sắm
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Regular Checkout Form View
  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      
      {/* Return link */}
      <button 
        onClick={() => setActiveView('deals')}
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
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '30px'
      }} className="catalog-layout">
        
        {/* Left Column: Form details */}
        <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Shipping Form Box */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--rounded-md)' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px', marginBottom: '20px' }}>
              <MapPin size={18} color="var(--color-primary-dim)" />
              1. THÔNG TIN GIAO HÀNG
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>Họ và tên người nhận *</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="text" 
                      name="fullName"
                      required
                      placeholder="Họ tên người nhận..."
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="form-input"
                      style={{ paddingLeft: '36px', fontSize: '13px' }}
                    />
                    <User size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-outline)' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>Số điện thoại liên hệ *</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      placeholder="Số điện thoại di động..."
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      style={{ paddingLeft: '36px', fontSize: '13px' }}
                    />
                    <Phone size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-outline)' }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>Địa chỉ Email nhận hóa đơn *</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="example@gmail.com..."
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    style={{ paddingLeft: '36px', fontSize: '13px' }}
                  />
                  <Mail size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-outline)' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>Tỉnh / Thành phố *</label>
                  <input 
                    type="text" 
                    name="city"
                    required
                    placeholder="Ví dụ: Hà Nội..."
                    value={formData.city}
                    onChange={handleInputChange}
                    className="form-input"
                    style={{ fontSize: '13px' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>Quận / Huyện *</label>
                  <input 
                    type="text" 
                    name="district"
                    required
                    placeholder="Quận Cầu Giấy..."
                    value={formData.district}
                    onChange={handleInputChange}
                    className="form-input"
                    style={{ fontSize: '13px' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>Phường / Xã</label>
                  <input 
                    type="text" 
                    name="ward"
                    placeholder="Phường Dịch Vọng..."
                    value={formData.ward}
                    onChange={handleInputChange}
                    className="form-input"
                    style={{ fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>Địa chỉ chi tiết (Số nhà, tên đường...) *</label>
                <input 
                  type="text" 
                  name="address"
                  required
                  placeholder="Nhập số nhà, ngõ ngách, tên đường..."
                  value={formData.address}
                  onChange={handleInputChange}
                  className="form-input"
                  style={{ fontSize: '13px' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>Ghi chú đơn hàng (Không bắt buộc)</label>
                <textarea 
                  name="notes"
                  placeholder="Ghi chú thời gian giao hàng, hướng dẫn chỉ đường..."
                  rows="3"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="form-input"
                  style={{ fontSize: '13px', resize: 'vertical' }}
                />
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--rounded-md)' }}>
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
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'white', display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'white', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <QrCode size={14} color="var(--color-primary-dim)" />
                    Chuyển khoản nhanh qua mã QR (Khuyên dùng)
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>
                    Quét mã QR tự động điền số tiền và nội dung chuyển khoản để xác thực tự động 24/7.
                  </span>
                  
                  {paymentMethod === 'bank' && (
                    <div 
                      className="animate-fade-in-up"
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
                    >
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
                          src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=VietQR:Techcombank|1902049583739|KINETIC%20TECH%20STORE" 
                          alt="Bank Transfer QR Code" 
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </div>
                      <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--color-on-surface-variant)' }}>
                        <p>Ngân hàng: <strong>Techcombank (TCB)</strong></p>
                        <p>Số tài khoản: <strong style={{ color: 'white' }}>1902049583739</strong></p>
                        <p>Chủ tài khoản: <strong>CTY CP KINETIC TECH STORE</strong></p>
                        <p>Nội dung CK: <strong style={{ color: 'var(--color-secondary-dim)' }}>KINETIC {Math.floor(1000 + Math.random() * 9000)}</strong></p>
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
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'white', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CreditCard size={14} color="var(--color-primary-dim)" />
                    Thẻ tín dụng Quốc tế (Visa, Mastercard, JCB)
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>
                    Thanh toán trực tuyến bảo mật cao qua cổng thanh toán OnePay / Stripe.
                  </span>

                  {paymentMethod === 'card' && (
                    <div 
                      className="animate-fade-in-up"
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
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '11px', color: 'white' }}>Tên in trên thẻ</span>
                        <input 
                          type="text" 
                          name="name"
                          placeholder="NGUYEN VAN A"
                          value={cardData.name}
                          onChange={handleCardChange}
                          className="form-input"
                          style={{ textTransform: 'uppercase', fontSize: '12px', padding: '8px 12px' }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '11px', color: 'white' }}>Số thẻ</span>
                        <input 
                          type="text" 
                          name="number"
                          placeholder="4129 8837 9928 1084"
                          value={cardData.number}
                          onChange={handleCardChange}
                          className="form-input"
                          style={{ fontSize: '12px', padding: '8px 12px' }}
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={{ fontSize: '11px', color: 'white' }}>Hạn dùng (MM/YY)</span>
                          <input 
                            type="text" 
                            name="expiry"
                            placeholder="12/28"
                            value={cardData.expiry}
                            onChange={handleCardChange}
                            className="form-input"
                            style={{ fontSize: '12px', padding: '8px 12px' }}
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={{ fontSize: '11px', color: 'white' }}>Mã bí mật CVV</span>
                          <input 
                            type="password" 
                            name="cvv"
                            placeholder="***"
                            maxLength="3"
                            value={cardData.cvv}
                            onChange={handleCardChange}
                            className="form-input"
                            style={{ fontSize: '12px', padding: '8px 12px' }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>
        </form>

        {/* Right Column: Order summary and total checkout price */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* List of items being purchased */}
          <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--rounded-md)', height: 'fit-content' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '800', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px', marginBottom: '16px', color: 'white' }}>
              ĐƠN HÀNG CỦA BẠN ({cartItems.reduce((acc, curr) => acc + curr.quantity, 0)})
            </h3>

            {/* Scrollable list */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              maxHeight: '260px',
              overflowY: 'auto',
              marginBottom: '20px',
              paddingRight: '4px'
            }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '10px', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '10px' }}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--rounded-sm)',
                      objectFit: 'cover',
                      border: '1px solid rgba(255,255,255,0.06)'
                    }}
                  />
                  <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <h4 style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: 'white',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }} title={item.name}>
                      {item.name}
                    </h4>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-secondary-dim)' }}>
                      {formatVND(item.price)}
                    </span>
                    
                    {/* Quantity & Delete controls directly inside Checkout page */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'var(--color-surface-container-lowest)',
                        border: '1px solid var(--color-outline-variant)',
                        borderRadius: 'var(--rounded-sm)',
                        padding: '1px'
                      }}>
                        <button 
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="btn btn-ghost"
                          style={{ padding: '2px', minWidth: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: 'var(--color-on-surface)' }}
                        >
                          -
                        </button>
                        <span style={{ fontSize: '11px', fontWeight: '700', width: '20px', textAlign: 'center', color: 'var(--color-on-surface)' }}>
                          {item.quantity}
                        </span>
                        <button 
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="btn btn-ghost"
                          style={{ padding: '2px', minWidth: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: 'var(--color-on-surface)' }}
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--color-error)',
                          cursor: 'pointer',
                          fontSize: '11px',
                          textDecoration: 'underline',
                          padding: 0
                        }}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'white', whiteSpace: 'nowrap', alignSelf: 'center' }}>
                    {formatVND(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Promo Code Input Form */}
            <div style={{
              paddingTop: '16px',
              borderTop: '1px dashed rgba(255,255,255,0.06)',
              marginBottom: '20px'
            }}>
              <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  placeholder="Nhập mã giảm giá (KINETIC5, FREESHIP...)"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value);
                    setPromoError('');
                  }}
                  className="form-input"
                  style={{ fontSize: '11px', padding: '8px 10px', textTransform: 'uppercase' }}
                />
                <button 
                  type="submit" 
                  className="btn btn-outline"
                  style={{ padding: '8px 16px', fontSize: '11px', whiteSpace: 'nowrap' }}
                >
                  Áp dụng
                </button>
              </form>
              
              {promoError && (
                <p style={{ color: '#ffb4ab', fontSize: '11px', marginTop: '6px' }}>{promoError}</p>
              )}

              {appliedPromo && (
                <div style={{
                  marginTop: '10px',
                  padding: '8px 12px',
                  background: 'rgba(253, 139, 0, 0.1)',
                  border: '1px solid rgba(253, 139, 0, 0.3)',
                  borderRadius: 'var(--rounded-sm)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '11px',
                  marginBottom: '10px'
                }}>
                  <div>
                    <span style={{ fontWeight: 'bold', color: 'var(--color-secondary-dim)', display: 'block' }}>
                      Đã áp dụng: {appliedPromo.code}
                    </span>
                    <span style={{ color: 'var(--color-on-surface-variant)' }}>{appliedPromo.label}</span>
                  </div>
                  <button 
                    onClick={handleRemovePromo}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-error)',
                      cursor: 'pointer',
                      fontSize: '11px',
                      textDecoration: 'underline'
                    }}
                  >
                    Hủy bỏ
                  </button>
                </div>
              )}

              {/* List of Available Vouchers to Choose directly */}
              <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-outline)', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                  MÃ GIẢM GIÁ CÓ SẴN (CLICK ĐỂ ÁP DỤNG):
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { code: 'KINETIC5', label: 'Giảm 5%', desc: 'Giảm 5% cho toàn bộ hóa đơn' },
                    { code: 'FREESHIP', label: 'Freeship', desc: 'Miễn phí giao hàng (hóa đơn bất kỳ)' },
                    { code: 'HELLO', label: 'Giảm 500K', desc: 'Giảm trực tiếp 500.000đ cho bạn' }
                  ].map((v) => {
                    const isApplied = appliedPromo && appliedPromo.code === v.code;
                    return (
                      <div
                        key={v.code}
                        onClick={() => {
                          if (isApplied) {
                            handleRemovePromo();
                          } else {
                            if (v.code === 'KINETIC5') {
                              setAppliedPromo({
                                code: 'KINETIC5',
                                discountPercent: 5,
                                label: 'Giảm giá 5% hóa đơn'
                              });
                            } else if (v.code === 'FREESHIP') {
                              setAppliedPromo({
                                code: 'FREESHIP',
                                discountPercent: 0,
                                discountCash: 0,
                                label: 'Miễn phí vận chuyển toàn quốc'
                              });
                            } else if (v.code === 'HELLO') {
                              setAppliedPromo({
                                code: 'HELLO',
                                discountPercent: 0,
                                discountCash: 500000,
                                label: 'Giảm trực tiếp 500.000đ'
                              });
                            }
                          }
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          background: isApplied ? 'rgba(253, 139, 0, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                          border: isApplied ? '1px solid var(--color-secondary)' : '1px dashed rgba(255, 255, 255, 0.08)',
                          borderRadius: 'var(--rounded-sm)',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          fontSize: '11px',
                          userSelect: 'none'
                        }}
                        className="voucher-selection-item"
                        title={isApplied ? "Click để hủy áp dụng" : "Click để áp dụng"}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontWeight: '800', color: isApplied ? 'var(--color-secondary)' : 'var(--color-primary-dim)', fontFamily: 'monospace' }}>
                            {v.code}
                          </span>
                          <span style={{ fontSize: '9px', color: 'var(--color-on-surface-variant)' }}>
                            {v.desc}
                          </span>
                        </div>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: '700',
                          color: isApplied ? 'var(--color-secondary-dim)' : 'var(--color-outline)'
                        }}>
                          {isApplied ? 'Đang dùng ✓' : 'Chọn dùng'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Calculation Breakdown */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontSize: '12px',
              color: 'var(--color-on-surface-variant)',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Tạm tính:</span>
                <span style={{ color: 'white' }}>{formatVND(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Phí vận chuyển:</span>
                <span style={{ color: 'white' }}>{shippingCost === 0 ? 'Miễn phí' : formatVND(shippingCost)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Thuế VAT (8%):</span>
                <span style={{ color: 'white' }}>{formatVND(vatTax)}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-secondary-dim)' }}>
                  <span>Chiết khấu giảm giá:</span>
                  <span>-{formatVND(discountAmount)}</span>
                </div>
              )}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '16px',
                fontWeight: '800',
                color: 'var(--color-secondary-dim)',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255,255,255,0.06)'
              }}>
                <span>Tổng thanh toán:</span>
                <span>{formatVND(total)}</span>
              </div>
            </div>

            {/* Confirm checkout CTA Button */}
            <button
              onClick={handleSubmitOrder}
              disabled={isProcessing || cartItems.length === 0}
              className="btn btn-secondary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '13px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {isProcessing ? (
                <>
                  <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                  <span>ĐANG GỬI ĐƠN HÀNG...</span>
                </>
              ) : (
                <>
                  <Truck size={16} />
                  <b>XÁC NHẬN ĐẶT HÀNG</b>
                </>
              )}
            </button>

            {/* Free shipping banner if total is close */}
            {shippingCost > 0 && (
              <div style={{
                marginTop: '12px',
                padding: '10px',
                fontSize: '11px',
                textAlign: 'center',
                borderRadius: 'var(--rounded-sm)',
                background: 'rgba(0, 123, 255, 0.05)',
                border: '1px solid rgba(0, 123, 255, 0.1)',
                color: 'var(--color-primary-dim)'
              }}>
                Mua thêm <strong>{formatVND(15000000 - subtotal)}</strong> để được Miễn phí vận chuyển toàn quốc!
              </div>
            )}
          </div>
          
        </aside>
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

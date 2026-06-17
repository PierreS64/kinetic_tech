import React, { useState, useMemo } from 'react';
import EmptyCart from './EmptyCart';
import OrderReceipt from './OrderReceipt';
import CheckoutSidebar from './CheckoutSidebar';
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
  if (cartItems.length === 0 && !orderReceipt) return <EmptyCart setActiveView={setActiveView} />;

  // If order is completed, render Receipt page
  if (orderReceipt) return <OrderReceipt orderReceipt={orderReceipt} formatVND={formatVND} handleFinish={handleFinish} />;

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
        <CheckoutSidebar 
          cartItems={cartItems} formatVND={formatVND} onUpdateQuantity={onUpdateQuantity} 
          onRemoveItem={onRemoveItem} promoCode={promoCode} setPromoCode={setPromoCode} 
          promoError={promoError} setPromoError={setPromoError} handleApplyPromo={handleApplyPromo} 
          appliedPromo={appliedPromo} handleRemovePromo={handleRemovePromo} subtotal={subtotal} 
          shippingCost={shippingCost} vatTax={vatTax} discountAmount={discountAmount} 
          total={total} handleSubmitOrder={handleSubmitOrder} isProcessing={isProcessing} 
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

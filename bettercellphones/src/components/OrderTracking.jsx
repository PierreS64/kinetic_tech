import React, { useState } from 'react';
import { Search, MapPin, Calendar, Clock, Truck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function OrderTracking({ orders = [] }) {
  const [orderIdInput, setOrderIdInput] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [searched, setSearched] = useState(false);

  const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!orderIdInput.trim()) return;
    
    // Support prefix search or exact match
    const searchId = orderIdInput.trim().toUpperCase();
    const match = orders.find(o => o.id.toUpperCase() === searchId || o.id.toUpperCase() === `ORD-${searchId}` || o.id.toUpperCase() === `KT-${searchId}`);
    
    setTrackedOrder(match || null);
    setSearched(true);
  };

  // Helper to determine active step
  const getStepStatus = (status, stepIndex) => {
    // Steps: 1: Placed, 2: Confirmed, 3: In Transit, 4: Delivered
    if (status === 'cancelled') {
      return stepIndex === 1 ? 'cancelled' : 'inactive';
    }
    
    switch (status) {
      case 'pending':
        return stepIndex === 1 ? 'active' : 'inactive';
      case 'processing':
        return stepIndex <= 2 ? 'active' : stepIndex === 3 ? 'pending-step' : 'inactive';
      case 'completed':
        return 'active';
      default:
        return 'inactive';
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px 0' }} className="animate-fade-in-up">
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'Montserrat' }}>THEO DÕI TRẠNG THÁI ĐƠN HÀNG</h2>
        <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginTop: '6px' }}>
          Nhập mã đơn hàng của bạn (ví dụ: ORD-9842) để tra cứu trạng thái vận chuyển thời gian thực.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px', marginBottom: '24px' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input 
              type="text"
              placeholder="Nhập mã đơn hàng (Ví dụ: ORD-9842, ORD-4395...)"
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '40px', fontSize: '14px', height: '48px' }}
            />
            <Search size={18} style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-outline)'
            }} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ height: '48px', padding: '0 24px', whiteSpace: 'nowrap' }}>
            Tra Cứu Đơn
          </button>
        </form>
      </div>

      {/* Result Display */}
      {searched && (
        trackedOrder ? (
          <div className="glass-panel-glow-blue animate-fade-in-up" style={{ borderRadius: 'var(--rounded-lg)', padding: '30px', border: '1px solid rgba(0, 123, 255, 0.25)' }}>
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px', marginBottom: '24px' }}>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--color-outline)' }}>Mã Đơn Hàng</span>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'white', marginTop: '2px' }}>{trackedOrder.id}</h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', color: 'var(--color-outline)' }}>Ngày đặt hàng</span>
                <span style={{ display: 'block', fontSize: '14px', color: 'white', fontWeight: '600', marginTop: '2px' }}>{trackedOrder.date}</span>
              </div>
            </div>

            {/* Stepper progress tracker */}
            <div style={{ marginBottom: '40px', padding: '10px 0' }}>
              <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--color-outline)', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '24px' }}>
                Trạng thái vận chuyển
              </h4>

              {trackedOrder.status === 'cancelled' ? (
                <div style={{
                  background: 'rgba(255, 76, 76, 0.1)',
                  border: '1px solid rgba(255, 76, 76, 0.3)',
                  padding: '16px',
                  borderRadius: 'var(--rounded-md)',
                  color: '#ffb4ab',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <AlertCircle size={20} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '14px' }}>Đơn hàng này đã bị hủy</strong>
                    <span style={{ fontSize: '12px', opacity: 0.8 }}>Vui lòng liên hệ Hotline 1900 1234 nếu bạn cần hỗ trợ.</span>
                  </div>
                </div>
              ) : (
                <div className="stepper-wrapper" style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginTop: '20px' }}>
                  {/* Background progress bar line */}
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '5%',
                    right: '5%',
                    height: '4px',
                    background: 'rgba(255,255,255,0.08)',
                    zIndex: 0
                  }} />
                  {/* Colored progress bar line */}
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '5%',
                    width: trackedOrder.status === 'pending' ? '0%' : trackedOrder.status === 'processing' ? '50%' : '90%',
                    height: '4px',
                    background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
                    boxShadow: '0 0 10px rgba(0, 123, 255, 0.5)',
                    zIndex: 0,
                    transition: 'width 0.5s ease-out'
                  }} />

                  {/* Steps */}
                  {[
                    { title: 'Đặt đơn', desc: 'Chờ duyệt', icon: Calendar },
                    { title: 'Xác nhận', desc: 'Đang chuẩn bị', icon: CheckCircle2 },
                    { title: 'Đang giao', desc: 'Trong lộ trình', icon: Truck },
                    { title: 'Thành công', desc: 'Đã giao hàng', icon: CheckCircle2 }
                  ].map((step, index) => {
                    const stepNum = index + 1;
                    const status = getStepStatus(trackedOrder.status, stepNum);
                    const StepIcon = step.icon;
                    
                    let bg = 'var(--color-surface-container-high)';
                    let border = '2px solid rgba(255,255,255,0.1)';
                    let color = 'var(--color-outline)';
                    let glow = 'none';

                    if (status === 'active') {
                      bg = 'var(--color-primary)';
                      border = '2px solid var(--color-primary-dim)';
                      color = 'white';
                      glow = '0 0 15px rgba(0, 123, 255, 0.6)';
                    } else if (status === 'pending-step') {
                      bg = 'var(--color-surface-bright)';
                      border = '2px dashed var(--color-secondary)';
                      color = 'var(--color-secondary-dim)';
                      glow = '0 0 10px rgba(253, 139, 0, 0.3)';
                    }

                    return (
                      <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, width: '22%', position: 'relative' }}>
                        <div style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          background: bg,
                          border: border,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: color,
                          boxShadow: glow,
                          transition: 'all 0.3s ease',
                          marginBottom: '8px'
                        }}>
                          <StepIcon size={20} />
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: status !== 'inactive' ? 'white' : 'var(--color-outline)' }}>
                          {step.title}
                        </span>
                        <span style={{ fontSize: '10px', color: 'var(--color-outline)', marginTop: '2px', textAlign: 'center' }}>
                          {trackedOrder.status === 'completed' && index === 3 ? 'Hoàn thành' : step.desc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Order info details summary */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.04)', padding: '20px', borderRadius: 'var(--rounded)', marginBottom: '24px' }} className="overview-subgrid">
              <div>
                <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--color-primary-dim)', fontWeight: '700', marginBottom: '12px', letterSpacing: '0.5px' }}>
                  Thông tin người nhận
                </h4>
                <div style={{ fontSize: '13px', lineHeight: '1.7', color: 'var(--color-on-surface-variant)' }}>
                  <p><strong style={{ color: 'white' }}>Khách hàng:</strong> {trackedOrder.customerName}</p>
                  <p><strong style={{ color: 'white' }}>Số điện thoại:</strong> {trackedOrder.phone}</p>
                  <p><strong style={{ color: 'white' }}>Địa chỉ nhận hàng:</strong> {trackedOrder.address || 'Hà Nội'}</p>
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--color-primary-dim)', fontWeight: '700', marginBottom: '12px', letterSpacing: '0.5px' }}>
                  Thanh toán & Vận chuyển
                </h4>
                <div style={{ fontSize: '13px', lineHeight: '1.7', color: 'var(--color-on-surface-variant)' }}>
                  <p><strong style={{ color: 'white' }}>Hình thức thanh toán:</strong> {trackedOrder.paymentMethod}</p>
                  <p><strong style={{ color: 'white' }}>Trạng thái thanh toán:</strong> {trackedOrder.status === 'completed' ? 'Đã hoàn thành' : 'Chờ xử lý (COD)'}</p>
                  <p><strong style={{ color: 'white' }}>Đơn vị vận chuyển:</strong> Kinetic Express (Giao hàng 2h)</p>
                </div>
              </div>
            </div>

            {/* Purchase Item List */}
            <div>
              <h4 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--color-primary-dim)', fontWeight: '700', marginBottom: '12px', letterSpacing: '0.5px' }}>
                Danh mục linh kiện
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {trackedOrder.items.map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 14px',
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid rgba(255,255,255,0.03)',
                    borderRadius: 'var(--rounded-sm)'
                  }}>
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: 'white' }}>{item.name}</span>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-outline)', marginTop: '2px' }}>
                        Số lượng: {item.quantity} x {formatVND(item.price)}
                      </span>
                    </div>
                    <strong style={{ fontSize: '13px', color: 'var(--color-secondary-dim)' }}>
                      {formatVND(item.price * item.quantity)}
                    </strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Total price */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', marginTop: '24px' }}>
              <span style={{ fontSize: '14px', color: 'var(--color-outline)' }}>Tổng chi phí đơn hàng:</span>
              <strong style={{ fontSize: '22px', color: 'var(--color-secondary-dim)', fontWeight: '800' }}>
                {formatVND(trackedOrder.total)}
              </strong>
            </div>

          </div>
        ) : (
          <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '40px 20px', textAlign: 'center', color: 'var(--color-error)' }}>
            <AlertCircle size={40} style={{ marginBottom: '12px', color: 'var(--color-error)' }} />
            <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '6px' }}>Không tìm thấy đơn hàng</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
              Không tìm thấy đơn hàng nào có mã "{orderIdInput.trim()}". Vui lòng kiểm tra lại mã đơn hàng chính xác (Ví dụ: ORD-9842, ORD-4395).
            </p>
          </div>
        )
      )}
    </div>
  );
}

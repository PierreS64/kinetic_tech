import React from 'react';
import { CheckCircle2, Calendar, MapPin, ShoppingBag, FileText } from 'lucide-react';

export default function OrderReceipt({ orderReceipt, formatVND, handleFinish }) {
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

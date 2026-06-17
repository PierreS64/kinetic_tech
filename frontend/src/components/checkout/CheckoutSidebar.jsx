import React from 'react';
import { Loader2, Truck } from 'lucide-react';

export default function CheckoutSidebar({ cartItems, formatVND, onUpdateQuantity, onRemoveItem, promoCode, setPromoCode, promoError, setPromoError, handleApplyPromo, appliedPromo, handleRemovePromo, subtotal, shippingCost, vatTax, discountAmount, total, handleSubmitOrder, isProcessing }) {
  return (
    <>
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
    </>
  );
}

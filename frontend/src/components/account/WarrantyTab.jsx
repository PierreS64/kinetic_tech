import React from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight, ShoppingBag, Tag, Heart, X, ShieldCheck, RotateCcw, CheckCircle2, Lock, Send, HelpCircle } from 'lucide-react';

export default function WarrantyTab(props) {
  const { currentUser, setActiveView, theme, likedProductIds, onToggleLike, products, orders, onAddOrder, tradeins, onAddTradeIn, feedbacks, onAddFeedback, onUpdateProfile, onAddSupportTicket, activeTab, setActiveTab, selectedOrder, setSelectedOrder, supportProduct, setSupportProduct, supportOrderId, setSupportOrderId, supportMessage, setSupportMessage, supportUrgency, setSupportUrgency, supportSuccess, setSupportSuccess, feedbackTitle, setFeedbackTitle, feedbackContent, setFeedbackContent, feedbackSuccess, setFeedbackSuccess, profileForm, setProfileForm, profileSuccess, setProfileSuccess, passwordForm, setPasswordForm, passwordError, setPasswordError, passwordSuccess, setPasswordSuccess, formatVND, userOrders, recentOrders, userTradeins, favoriteProducts, warrantyProducts, vouchers, handleCopyVoucher, handleFeedbackSubmit, handleSupportRequestSubmit, handleProfileUpdate, handlePasswordChange } = props;

  return (

              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px' }}>
                  Thiết Bị Công Nghệ Đã Mua & Trạng Thái Bảo Hành
                </h3>

                <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginBottom: '20px', lineHeight: '1.6' }}>
                  Hệ thống tự động đồng bộ tất cả các sản phẩm công nghệ bạn đã mua thành công tại cửa hàng Kinetic Tech. Thời gian bảo hành mặc định là 12 tháng kể từ ngày mua.
                </p>

                {warrantyProducts.length === 0 ? (
                  <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--color-outline)' }}>
                    <ShieldCheck size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
                    <p style={{ fontSize: '13px' }}>Không tìm thấy sản phẩm công nghệ nào có bảo hành. Chỉ các đơn hàng đã giao thành công mới được kích hoạt bảo hành điện tử.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {warrantyProducts.map((prod, idx) => (
                      <div 
                        key={idx}
                        style={{
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                          borderRadius: 'var(--rounded)',
                          padding: '16px',
                          display: 'flex',
                          flexWrap: 'wrap',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '16px'
                        }}
                      >
                        <div style={{ flex: '1 1 300px' }}>
                          <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'white' }}>{prod.name}</h4>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', marginTop: '10px', fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>
                            <div>
                              <span style={{ color: 'var(--color-outline)' }}>Mã Serial/IMEI:</span>
                              <strong style={{ display: 'block', color: 'white', fontFamily: 'monospace', fontSize: '13px', marginTop: '2px' }}>{prod.serial}</strong>
                            </div>
                            <div>
                              <span style={{ color: 'var(--color-outline)' }}>Ngày hết hạn bảo hành:</span>
                              <strong style={{ display: 'block', color: 'white', marginTop: '2px' }}>{prod.expirationDate}</strong>
                            </div>
                            <div>
                              <span style={{ color: 'var(--color-outline)' }}>Ngày mua:</span>
                              <span style={{ display: 'block', color: 'white', marginTop: '2px' }}>{prod.purchaseDate}</span>
                            </div>
                            <div>
                              <span style={{ color: 'var(--color-outline)' }}>Đơn hàng:</span>
                              <span style={{ display: 'block', color: 'var(--color-primary-dim)', marginTop: '2px', fontWeight: '700' }}>#{prod.orderId}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                          <span style={{
                            fontSize: '12px',
                            fontWeight: '800',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            background: prod.isUnderWarranty ? 'rgba(76, 175, 80, 0.15)' : 'rgba(255, 76, 76, 0.15)',
                            color: prod.isUnderWarranty ? '#81c784' : '#ffb4ab',
                            border: prod.isUnderWarranty ? '1px solid rgba(76, 175, 80, 0.3)' : '1px solid rgba(255, 76, 76, 0.3)'
                          }}>
                            {prod.isUnderWarranty ? 'Còn bảo hành' : 'Hết hạn'}
                          </span>
                          
                          <button 
                            onClick={() => {
                              setSelectedOrder(orders.find(o => o.id === prod.orderId));
                              setActiveTab('orders');
                            }}
                            className="btn btn-outline" 
                            style={{ padding: '6px 12px', fontSize: '11px' }}
                          >
                            Hỗ trợ sửa chữa
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
}

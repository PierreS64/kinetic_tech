import React from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight, ShoppingBag, Tag, Heart, X, ShieldCheck, RotateCcw, CheckCircle2, Lock, Send, HelpCircle } from 'lucide-react';

import { useAppContext } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';

export default function WarrantyTab(props) {
  const { theme, likedProductIds, orders, tradeins, feedbacks } = useAppContext();
  const { currentUser } = useAuth();
  const { setActiveView, onToggleLike, products, onAddOrder, onAddTradeIn, onAddFeedback, onUpdateProfile, onAddSupportTicket, activeTab, setActiveTab, selectedOrder, setSelectedOrder, supportProduct, setSupportProduct, supportOrderId, setSupportOrderId, supportMessage, setSupportMessage, supportUrgency, setSupportUrgency, supportType, setSupportType, supportSuccess, setSupportSuccess, feedbackTitle, setFeedbackTitle, feedbackContent, setFeedbackContent, feedbackSuccess, setFeedbackSuccess, profileForm, setProfileForm, profileSuccess, setProfileSuccess, passwordForm, setPasswordForm, passwordError, setPasswordError, passwordSuccess, setPasswordSuccess, formatVND, userOrders, recentOrders, userTradeins, favoriteProducts, warrantyProducts, vouchers, handleCopyVoucher, handleFeedbackSubmit, handleSupportRequestSubmit, handleProfileUpdate, handlePasswordChange } = props;

  return (

              <div  style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }} className="glass-panel">
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
                          <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-on-surface)' }}>{prod.name}</h4>
                          <div style={{ display: 'grid', gap: '8px 16px', marginTop: '10px', fontSize: '12px', color: 'var(--color-on-surface-variant)' }}  className="grid-responsive-2col">
                            <div>
                              <span style={{ color: 'var(--color-outline)' }}>Mã Serial/IMEI:</span>
                              <strong style={{ display: 'block', color: 'var(--color-on-surface)', fontFamily: 'monospace', fontSize: '13px', marginTop: '2px' }}>{prod.serial}</strong>
                            </div>
                            <div>
                              <span style={{ color: 'var(--color-outline)' }}>Ngày hết hạn bảo hành:</span>
                              <strong style={{ display: 'block', color: 'var(--color-on-surface)', marginTop: '2px' }}>{prod.expirationDate}</strong>
                            </div>
                            <div>
                              <span style={{ color: 'var(--color-outline)' }}>Ngày mua:</span>
                              <span style={{ display: 'block', color: 'var(--color-on-surface)', marginTop: '2px' }}>{prod.purchaseDate}</span>
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
                              setSupportProduct(prod);
                              setSupportOrderId(prod.orderId);
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

                {supportProduct && activeTab === 'warranty' && createPortal(
                  <div 
                    style={{ 
                      zIndex: 101, position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                      background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(10px)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }} 
                    className="modal-overlay" onClick={() => setSupportProduct(null)}
                  >
                    <div 
                      className="glass-panel animate-fade-in-up" onClick={(e) => e.stopPropagation()} 
                      style={{ width: '90%', maxWidth: '650px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden', padding: '0' }}
                    >
                      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-error)' }}>YÊU CẦU HỖ TRỢ KỸ THUẬT BẢO HÀNH</h4>
                        <button onClick={() => setSupportProduct(null)} className="btn btn-ghost" style={{ padding: '4px', borderRadius: '50%' }}>
                          <X size={18} color="var(--color-error)" />
                        </button>
                      </div>

                      <div style={{ padding: '20px' }}>
                        <div style={{ marginBottom: '16px', fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
                          Sản phẩm: <strong style={{ color: 'var(--color-on-surface)' }}>{supportProduct.name}</strong><br />
                          Đơn hàng: #{supportOrderId}
                        </div>

                        {supportSuccess ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#81c784', fontSize: '13px', padding: '16px 0' }}>
                            <CheckCircle2 size={24} />
                            <span>Gửi yêu cầu bảo hành thành công! Kỹ thuật viên sẽ phản hồi bạn trong mục Support Ticket (Tab Bảo hành) hoặc SMS.</span>
                          </div>
                        ) : (
                          <form onSubmit={handleSupportRequestSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'grid', gap: '16px' }} className="grid-responsive-2col">
                              <div>
                                <label style={{ fontSize: '12px', color: 'var(--color-outline)', display: 'block', marginBottom: '6px' }}>Mức độ khẩn cấp</label>
                                <select 
                                  value={supportUrgency} 
                                  onChange={(e) => setSupportUrgency(e.target.value)}
                                  className="form-input"
                                  style={{ width: '100%', padding: '10px', fontSize: '13px' }}
                                >
                                  <option value="Thường">Thường (Xử lý trong 24h)</option>
                                  <option value="Gấp">Gấp (Xử lý trong 2-4h)</option>
                                  <option value="Rất Gấp">Rất Gấp (Yêu cầu gọi lại ngay)</option>
                                </select>
                              </div>
                              <div>
                                <label style={{ fontSize: '12px', color: 'var(--color-outline)', display: 'block', marginBottom: '6px' }}>Loại sự cố</label>
                                <input 
                                  type="text" 
                                  value={supportType} 
                                  onChange={(e) => setSupportType(e.target.value)} 
                                  onFocus={() => { if (supportType === 'Báo lỗi phần cứng thiết bị') setSupportType(''); }}
                                  onBlur={() => { if (!supportType.trim()) setSupportType('Báo lỗi phần cứng thiết bị'); }}
                                  placeholder="Báo lỗi phần cứng thiết bị" 
                                  style={{ width: '100%', padding: '10px', fontSize: '13px' }} 
                                  className="form-input" 
                                />
                              </div>
                            </div>
                            <div>
                              <label style={{ fontSize: '12px', color: 'var(--color-outline)', display: 'block', marginBottom: '6px' }}>Nội dung báo lỗi / Mô tả sự cố chi tiết</label>
                              <textarea
                                value={supportMessage}
                                onChange={(e) => setSupportMessage(e.target.value)}
                                placeholder="Vui lòng mô tả chi tiết lỗi gặp phải (ví dụ: máy không lên nguồn, màn hình bị sọc xanh, phím kẹt...)"
                                rows="4"
                                className="form-input"
                                style={{ width: '100%', fontSize: '13px', padding: '12px' }}
                              />
                            </div>
                            <button type="submit" className="btn btn-secondary" style={{ padding: '10px 20px', fontSize: '13px', alignSelf: 'flex-end' }}>
                              Gửi Yêu Cầu Hỗ Trợ
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>,
                  document.body
                )}

              </div>
            );
}

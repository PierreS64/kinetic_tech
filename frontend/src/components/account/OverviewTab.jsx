import React from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight, ShoppingBag, Tag, Heart, X, ShieldCheck, RotateCcw, CheckCircle2, Lock, Send, HelpCircle } from 'lucide-react';

export default function OverviewTab(props) {
  const { currentUser, setActiveView, theme, likedProductIds, onToggleLike, products, orders, onAddOrder, tradeins, onAddTradeIn, feedbacks, onAddFeedback, onUpdateProfile, onAddSupportTicket, activeTab, setActiveTab, selectedOrder, setSelectedOrder, supportProduct, setSupportProduct, supportOrderId, setSupportOrderId, supportMessage, setSupportMessage, supportUrgency, setSupportUrgency, supportSuccess, setSupportSuccess, feedbackTitle, setFeedbackTitle, feedbackContent, setFeedbackContent, feedbackSuccess, setFeedbackSuccess, profileForm, setProfileForm, profileSuccess, setProfileSuccess, passwordForm, setPasswordForm, passwordError, setPasswordError, passwordSuccess, setPasswordSuccess, formatVND, userOrders, recentOrders, userTradeins, favoriteProducts, warrantyProducts, vouchers, handleCopyVoucher, handleFeedbackSubmit, handleSupportRequestSubmit, handleProfileUpdate, handlePasswordChange } = props;

  return (

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Valued Trade-In Notification Alert */}
                {(() => {
                  const valuedTradeIns = userTradeins.filter(t => t.status === 'valued');
                  if (valuedTradeIns.length === 0) return null;

                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {valuedTradeIns.map(trade => (
                        <div 
                          key={trade.id}
                          className="glass-panel-glow-orange animate-fade-in-up"
                          style={{
                            borderRadius: 'var(--rounded-md)',
                            padding: '16px 20px',
                            borderLeft: '4px solid var(--color-secondary)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '12px',
                            position: 'relative'
                          }}
                        >
                          <div>
                            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--color-secondary-dim)', textTransform: 'uppercase', display: 'block', letterSpacing: '0.5px' }}>
                              🔔 BÁO GIÁ THU CŨ MỚI (YÊU CẦU: {trade.id})
                            </span>
                            <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'white', marginTop: '6px' }}>
                              {trade.oldDevice}
                            </h4>
                            <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
                              Định giá thu mua đề nghị: <strong style={{ color: 'var(--color-secondary-dim)', fontSize: '15px' }}>{formatVND(trade.offeredPrice)}</strong>
                            </p>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', display: 'block', marginTop: '4px' }}>
                              Dùng cấn trừ nâng cấp lên đời: <strong style={{ color: 'white' }}>{trade.targetDevice}</strong>
                            </span>
                          </div>

                          <button 
                            onClick={() => setActiveTab('tradein')}
                            className="btn btn-secondary" 
                            style={{ padding: '8px 14px', fontSize: '12px' }}
                          >
                            Xem Chi Tiết Lịch Hẹn
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                })()}
                
                {/* Promo Banner Section - Rich Custom Design */}
                <div 
                  className="glass-panel-glow-orange" 
                  style={{
                    borderRadius: 'var(--rounded-lg)',
                    padding: '30px',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px',
                    border: '1px solid rgba(253, 139, 0, 0.25)'
                  }}
                >
                  {/* Decorative background circle */}
                  <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    background: 'rgba(253, 139, 0, 0.1)',
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                    zIndex: 0
                  }} />

                  <div style={{ flex: '1 1 350px', zIndex: 1 }}>
                    <span style={{ fontSize: '10px', fontWeight: '800', background: 'rgba(253, 139, 0, 0.2)', color: 'var(--color-secondary-dim)', padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase' }}>
                      Ưu đãi đặc quyền
                    </span>
                    <h3 style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'Montserrat', marginTop: '12px' }}>
                      CHIẾN DỊCH HÈ SIÊU NHIỆT - LÊN ĐỜI HI-END LAPTOP
                    </h3>
                    <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '8px', lineHeight: '1.6' }}>
                      Áp dụng đặc quyền trả góp 0%, tặng gói vệ sinh bảo dưỡng laptop trọn đời trị giá <strong style={{ color: 'white' }}>1.500.000đ</strong> và voucher giảm giá trực tiếp tới <strong style={{ color: 'var(--color-secondary-dim)' }}>2.000.000đ</strong> khi mua các dòng Asus ROG Strix 2026.
                    </p>
                    <button 
                      onClick={() => setActiveView('laptop')}
                      className="btn btn-secondary" 
                      style={{ marginTop: '16px', padding: '8px 16px', fontSize: '12px' }}
                    >
                      Khám phá ngay
                      <ChevronRight size={14} />
                    </button>
                  </div>
                  
                  {/* Graphic Display Image */}
                  <div style={{ flex: '1 1 180px', display: 'flex', justifyContent: 'center', zIndex: 1 }}>
                    <img 
                      src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=300"
                      alt="ASUS ROG Strix Promo"
                      style={{
                        width: '100%',
                        maxWidth: '220px',
                        height: 'auto',
                        borderRadius: 'var(--rounded)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        transform: 'rotate(-3deg)'
                      }}
                    />
                  </div>
                </div>

                {/* Dashboard Sub-grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="overview-subgrid">
                  
                  {/* Left sub-column: Recent 3 Orders */}
                  <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '20px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px' }}>
                      <ShoppingBag size={16} color="var(--color-primary-dim)" />
                      Đơn hàng gần đây nhất
                    </h4>

                    {recentOrders.length === 0 ? (
                      <div style={{ padding: '30px 10px', textAlign: 'center', color: 'var(--color-outline)' }}>
                        <p style={{ fontSize: '12px' }}>Bạn chưa có đơn đặt hàng nào.</p>
                        <button onClick={() => setActiveView('deals')} className="btn btn-ghost" style={{ fontSize: '12px', marginTop: '10px', color: 'var(--color-primary-dim)' }}>
                          Khám phá sản phẩm
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {recentOrders.map(order => (
                          <div 
                            key={order.id} 
                            onClick={() => { setSelectedOrder(order); setActiveTab('orders'); }}
                            style={{
                              background: 'rgba(255, 255, 255, 0.02)',
                              border: '1px solid rgba(255, 255, 255, 0.04)',
                              borderRadius: 'var(--rounded)',
                              padding: '12px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            className="list-hover-effect"
                          >
                            <div>
                              <strong style={{ fontSize: '12px', color: 'white', display: 'block' }}>{order.id}</strong>
                              <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>{order.date.split(' ')[0]}</span>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <span style={{ fontWeight: '700', fontSize: '12px', color: 'var(--color-secondary-dim)', display: 'block' }}>{formatVND(order.total)}</span>
                              <span style={{ 
                                fontSize: '9px',
                                background: 
                                  order.status === 'completed' ? 'rgba(76,175,80,0.12)' : 
                                  order.status === 'cancelled' ? 'rgba(255,76,76,0.12)' :
                                  order.status === 'processing' ? 'rgba(0,123,255,0.12)' : 'rgba(253,139,0,0.12)',
                                color: 
                                  order.status === 'completed' ? '#81c784' : 
                                  order.status === 'cancelled' ? '#ffb4ab' :
                                  order.status === 'processing' ? '#adc7ff' : '#ffb77d',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontWeight: '700'
                              }}>
                                {order.status === 'completed' ? 'Đã giao' : order.status === 'cancelled' ? 'Đã hủy' : order.status === 'processing' ? 'Đang xử lý' : 'Chờ duyệt'}
                              </span>
                            </div>
                          </div>
                        ))}
                        <button 
                          onClick={() => setActiveTab('orders')}
                          className="btn btn-ghost" 
                          style={{ width: '100%', fontSize: '12px', padding: '6px', color: 'var(--color-primary-dim)' }}
                        >
                          Xem tất cả đơn hàng
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right sub-column: Current Vouchers */}
                  <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '20px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px' }}>
                      <Tag size={16} color="var(--color-secondary-dim)" />
                      Mã giảm giá hiện có
                    </h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {vouchers.map(v => (
                        <div 
                          key={v.code} 
                          style={{
                            background: 'rgba(253, 139, 0, 0.03)',
                            border: '1px dashed rgba(253, 139, 0, 0.25)',
                            borderRadius: 'var(--rounded)',
                            padding: '10px 12px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontFamily: 'monospace', fontWeight: '800', fontSize: '13px', color: 'white', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>
                                {v.code}
                              </span>
                              <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-secondary-dim)' }}>
                                {v.label}
                              </span>
                            </div>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', display: 'block', marginTop: '4px' }}>{v.desc}</span>
                          </div>
                          <button 
                            onClick={() => handleCopyVoucher(v.code)}
                            className="btn btn-outline" 
                            style={{ padding: '4px 8px', fontSize: '10px', height: 'fit-content' }}
                          >
                            Sao chép
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Favorites Row (Loved Products) */}
                <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '20px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px' }}>
                    <Heart size={16} color="var(--color-error)" fill="var(--color-error)" />
                    Sản phẩm bạn yêu thích ({favoriteProducts.length})
                  </h4>

                  {favoriteProducts.length === 0 ? (
                    <div style={{ padding: '40px 10px', textAlign: 'center', color: 'var(--color-outline)' }}>
                      <Heart size={32} color="rgba(255,255,255,0.1)" style={{ marginBottom: '12px' }} />
                      <p style={{ fontSize: '12px' }}>Danh sách yêu thích trống.</p>
                      <button onClick={() => setActiveView('deals')} className="btn btn-primary" style={{ fontSize: '12px', marginTop: '14px', padding: '8px 16px' }}>
                        Đi mua sắm ngay
                      </button>
                    </div>
                  ) : (
                    <div 
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '16px'
                      }}
                    >
                      {favoriteProducts.map(prod => (
                        <div 
                          key={prod.id}
                          style={{
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.04)',
                            borderRadius: 'var(--rounded)',
                            padding: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            position: 'relative'
                          }}
                        >
                          {/* Heart toggle on top-right */}
                          <button 
                            onClick={() => onToggleLike(prod.id)}
                            style={{
                              position: 'absolute',
                              top: '8px',
                              right: '8px',
                              background: 'rgba(0,0,0,0.4)',
                              border: 'none',
                              borderRadius: '50%',
                              width: '26px',
                              height: '26px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              color: 'var(--color-error)'
                            }}
                          >
                            <X size={12} />
                          </button>

                          <div style={{ height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '4px' }}>
                            <img src={prod.image} alt={prod.name} style={{ height: '100%', objectFit: 'contain' }} />
                          </div>

                          <h5 style={{ fontSize: '12px', fontWeight: '600', color: 'white', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '34px', lineHeight: '1.4' }}>
                            {prod.name}
                          </h5>

                          <strong style={{ fontSize: '13px', color: 'var(--color-secondary-dim)' }}>
                            {formatVND(prod.price)}
                          </strong>

                          <button 
                            onClick={() => {
                              setActiveView(prod.category);
                            }}
                            className="btn btn-primary" 
                            style={{ padding: '6px 10px', fontSize: '10px', width: '100%', marginTop: 'auto' }}
                          >
                            Xem chi tiết
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            );
}

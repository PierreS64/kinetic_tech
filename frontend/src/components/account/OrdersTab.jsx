import React from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight, ShoppingBag, Tag, Heart, X, ShieldCheck, RotateCcw, CheckCircle2, Lock, Send, HelpCircle } from 'lucide-react';

export default function OrdersTab(props) {
  const { currentUser, setActiveView, theme, likedProductIds, onToggleLike, products, orders, onAddOrder, tradeins, onAddTradeIn, feedbacks, onAddFeedback, onUpdateProfile, onAddSupportTicket, activeTab, setActiveTab, selectedOrder, setSelectedOrder, supportProduct, setSupportProduct, supportOrderId, setSupportOrderId, supportMessage, setSupportMessage, supportUrgency, setSupportUrgency, supportSuccess, setSupportSuccess, feedbackTitle, setFeedbackTitle, feedbackContent, setFeedbackContent, feedbackSuccess, setFeedbackSuccess, profileForm, setProfileForm, profileSuccess, setProfileSuccess, passwordForm, setPasswordForm, passwordError, setPasswordError, passwordSuccess, setPasswordSuccess, formatVND, userOrders, recentOrders, userTradeins, favoriteProducts, warrantyProducts, vouchers, handleCopyVoucher, handleFeedbackSubmit, handleSupportRequestSubmit, handleProfileUpdate, handlePasswordChange } = props;

  return (

              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px' }}>
                  Lịch Sử Đơn Hàng Của Bạn
                </h3>

                {userOrders.length === 0 ? (
                  <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--color-outline)' }}>
                    <ShoppingBag size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
                    <p style={{ fontSize: '13px' }}>Bạn chưa đặt bất kỳ đơn hàng nào từ hệ thống Kinetic Tech.</p>
                    <button onClick={() => setActiveView('deals')} className="btn btn-primary" style={{ marginTop: '20px', padding: '10px 20px' }}>
                      Xem các sản phẩm hot
                    </button>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }} className="zebra-table">
                      <thead>
                        <tr style={{ background: 'var(--color-surface-container-high)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                          <th style={{ padding: '12px 16px', fontWeight: '700' }}>Mã Đơn Hàng</th>
                          <th style={{ padding: '12px 16px', fontWeight: '700' }}>Ngày Mua</th>
                          <th style={{ padding: '12px 16px', fontWeight: '700' }}>Tổng Thanh Toán</th>
                          <th style={{ padding: '12px 16px', fontWeight: '700' }}>Trạng Thái</th>
                          <th style={{ padding: '12px 16px', fontWeight: '700', textAlign: 'center' }}>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userOrders.map(order => (
                          <tr key={order.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <td style={{ fontWeight: '700', color: 'var(--color-primary-dim)', padding: '12px 16px' }}>{order.id}</td>
                            <td style={{ padding: '12px 16px' }}>{order.date}</td>
                            <td style={{ fontWeight: '800', color: 'var(--color-secondary-dim)', padding: '12px 16px' }}>{formatVND(order.total)}</td>
                            <td style={{ padding: '12px 16px' }}>
                              <span className="status-badge" style={{
                                fontSize: '10px',
                                background: 
                                  order.status === 'completed' ? 'rgba(76,175,80,0.15)' : 
                                  order.status === 'cancelled' ? 'rgba(255,76,76,0.15)' :
                                  order.status === 'processing' ? 'rgba(0,123,255,0.15)' : 'rgba(253,139,0,0.15)',
                                color: 
                                  order.status === 'completed' ? '#81c784' : 
                                  order.status === 'cancelled' ? '#ffb4ab' :
                                  order.status === 'processing' ? '#adc7ff' : '#ffb77d',
                                padding: '2px 8px'
                              }}>
                                {order.status === 'completed' && 'Đã hoàn thành'}
                                {order.status === 'cancelled' && 'Đã hủy'}
                                {order.status === 'processing' && 'Đang xử lý'}
                                {order.status === 'pending' && 'Chờ duyệt'}
                              </span>
                            </td>
                            <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                              <button 
                                onClick={() => setSelectedOrder(order)} 
                                className="btn btn-outline" 
                                style={{ padding: '6px 12px', fontSize: '11px' }}
                              >
                                Xem chi tiết
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Sub-Modal / Expanding Window for Order details & Request Support */}
                {selectedOrder && createPortal(
                  <div 
                    className="modal-overlay" 
                    style={{ 
                      zIndex: 101,
                      position: 'fixed',
                      top: 0, left: 0,
                      width: '100vw', height: '100vh',
                      background: 'rgba(0, 0, 0, 0.6)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',            
                      alignItems: 'center',       
                      justifyContent: 'center'
                    }} 
                    onClick={() => setSelectedOrder(null)}
                  >
                    <div 
                      className="glass-panel animate-fade-in-up" 
                      onClick={(e) => e.stopPropagation()} 
                      style={{ width: '90%', maxWidth: '650px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden' }}
                    >
                      {/* Modal Header */}
                      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                        <div>
                          <h4 style={{ fontSize: '16px', fontWeight: '800' }}>Chi tiết đơn hàng {selectedOrder.id}</h4>
                          <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Ngày đặt: {selectedOrder.date}</span>
                        </div>
                        <button onClick={() => setSelectedOrder(null)} className="btn btn-ghost" style={{ padding: '4px', borderRadius: '50%' }}>
                          <X size={18} color="#ff8000" />
                        </button>
                      </div>

                      {/* Modal Content */}
                      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '75vh', overflowY: 'auto' }}>
                        
                        {/* Transaction summary */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', padding: '14px', borderRadius: 'var(--rounded)' }}>
                          <div>
                            <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-outline)', fontWeight: '800', display: 'block', marginBottom: '4px' }}>Địa chỉ giao hàng</span>
                            <span style={{ fontSize: '12px', color: 'white', lineHeight: '1.5' }}>
                              Người nhận: {selectedOrder.customerName}<br />
                              SĐT: {selectedOrder.phone}<br />
                              Địa chỉ: {selectedOrder.address || 'Hà Nội'}
                            </span>
                          </div>
                          <div>
                            <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-outline)', fontWeight: '800', display: 'block', marginBottom: '4px' }}>Thanh toán</span>
                            <span style={{ fontSize: '12px', color: 'white', lineHeight: '1.5' }}>
                              Phương thức: {selectedOrder.paymentMethod}<br />
                              Trạng thái: <strong>{selectedOrder.status === 'completed' ? 'Đã thanh toán' : 'Chờ xác thực'}</strong>
                            </span>
                          </div>
                        </div>

                        {/* Order Tracking Progress Stepper */}
                        <div style={{ padding: '10px 0 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                          <h5 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-primary-dim)', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '0.5px' }}>
                            HÀNH TRÌNH ĐƠN HÀNG
                          </h5>
                          {selectedOrder.status === 'cancelled' ? (
                            <div style={{ padding: '12px', background: 'rgba(255,76,76,0.1)', border: '1px solid rgba(255,76,76,0.2)', borderRadius: '4px', color: '#ffb4ab', fontSize: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <span>✖</span>
                              <span>Đơn hàng này đã bị hủy. Vui lòng liên hệ hotline để biết thêm chi tiết.</span>
                            </div>
                          ) : (
                            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginTop: '10px' }}>
                              {/* Background Line */}
                              <div style={{ position: 'absolute', top: '15px', left: '8%', right: '8%', height: '2px', background: 'rgba(255,255,255,0.06)', zIndex: 0 }} />
                              {/* Active Line */}
                              <div style={{ 
                                position: 'absolute', 
                                top: '15px', 
                                left: '8%', 
                                width: selectedOrder.status === 'completed' ? '84%' : selectedOrder.status === 'processing' ? '42%' : '0%', 
                                height: '2px', 
                                background: 'var(--color-primary)', 
                                zIndex: 0,
                                transition: 'width 0.4s ease'
                              }} />
                              
                              {/* Step 1 */}
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, width: '20%' }}>
                                <div style={{
                                  width: '32px', height: '32px', borderRadius: '50%',
                                  background: 'var(--color-primary)', color: 'white',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold',
                                  boxShadow: '0 0 10px rgba(0, 123, 255, 0.4)'
                                }}>1</div>
                                <span style={{ fontSize: '11px', fontWeight: '700', color: 'white', marginTop: '6px' }}>Đã đặt đơn</span>
                              </div>

                              {/* Step 2 */}
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, width: '20%' }}>
                                <div style={{
                                  width: '32px', height: '32px', borderRadius: '50%',
                                  background: ['processing', 'completed'].includes(selectedOrder.status) ? 'var(--color-primary)' : 'var(--color-surface-container-highest)',
                                  color: ['processing', 'completed'].includes(selectedOrder.status) ? 'white' : 'var(--color-outline)',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold',
                                  boxShadow: ['processing', 'completed'].includes(selectedOrder.status) ? '0 0 10px rgba(0, 123, 255, 0.4)' : 'none'
                                }}>2</div>
                                <span style={{ fontSize: '11px', fontWeight: '700', color: ['processing', 'completed'].includes(selectedOrder.status) ? 'white' : 'var(--color-outline)', marginTop: '6px' }}>Đã xác nhận</span>
                              </div>

                              {/* Step 3 */}
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, width: '20%' }}>
                                <div style={{
                                  width: '32px', height: '32px', borderRadius: '50%',
                                  background: selectedOrder.status === 'completed' ? 'var(--color-primary)' : selectedOrder.status === 'processing' ? 'var(--color-surface-bright)' : 'var(--color-surface-container-highest)',
                                  color: selectedOrder.status === 'completed' ? 'white' : selectedOrder.status === 'processing' ? 'var(--color-secondary)' : 'var(--color-outline)',
                                  border: selectedOrder.status === 'processing' ? '1px dashed var(--color-secondary)' : 'none',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold',
                                  boxShadow: selectedOrder.status === 'completed' ? '0 0 10px rgba(0, 123, 255, 0.4)' : selectedOrder.status === 'processing' ? '0 0 10px rgba(253, 139, 0, 0.2)' : 'none'
                                }}>3</div>
                                <span style={{ fontSize: '11px', fontWeight: '700', color: ['processing', 'completed'].includes(selectedOrder.status) ? 'white' : 'var(--color-outline)', marginTop: '6px' }}>Đang giao</span>
                              </div>

                              {/* Step 4 */}
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, width: '20%' }}>
                                <div style={{
                                  width: '32px', height: '32px', borderRadius: '50%',
                                  background: selectedOrder.status === 'completed' ? 'rgba(76, 175, 80, 0.15)' : 'var(--color-surface-container-highest)',
                                  color: selectedOrder.status === 'completed' ? '#81c784' : 'var(--color-outline)',
                                  border: selectedOrder.status === 'completed' ? '1px solid rgba(76, 175, 80, 0.3)' : 'none',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold',
                                  boxShadow: selectedOrder.status === 'completed' ? '0 0 10px rgba(76, 175, 80, 0.3)' : 'none'
                                }}>4</div>
                                <span style={{ fontSize: '11px', fontWeight: '700', color: selectedOrder.status === 'completed' ? '#81c784' : 'var(--color-outline)', marginTop: '6px' }}>Thành công</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Product list with integrated Technical support request */}
                        <div>
                          <h5 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-primary-dim)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.5px' }}>
                            Danh sách sản phẩm mua
                          </h5>
                          
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {selectedOrder.items.map((item, idx) => (
                              <div 
                                key={idx} 
                                style={{
                                  background: 'rgba(255,255,255,0.02)',
                                  border: '1px solid rgba(255,255,255,0.04)',
                                  borderRadius: 'var(--rounded)',
                                  padding: '12px',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  gap: '16px'
                                }}
                              >
                                <div style={{ flex: 1 }}>
                                  <span style={{ fontWeight: '600', fontSize: '13px', color: 'white', display: 'block' }}>{item.name}</span>
                                  <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>
                                    Số lượng: {item.quantity} | Đơn giá: {formatVND(item.price)}
                                  </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <strong style={{ fontSize: '13px', color: 'var(--color-secondary-dim)' }}>
                                    {formatVND(item.price * item.quantity)}
                                  </strong>
                                  
                                  {/* Request support button */}
                                  <button
                                    onClick={() => {
                                      setSupportProduct(item);
                                      setSupportOrderId(selectedOrder.id);
                                    }}
                                    className="btn btn-outline"
                                    style={{
                                      padding: '6px 10px',
                                      fontSize: '11px',
                                      borderColor: 'rgba(255,76,76,0.3)',
                                      color: 'var(--color-error)'
                                    }}
                                  >
                                    Yêu cầu hỗ trợ
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Order billing total */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                          <span style={{ fontSize: '12px', color: 'var(--color-outline)' }}>Tổng thanh toán hóa đơn:</span>
                          <strong style={{ fontSize: '20px', color: 'var(--color-secondary-dim)', fontWeight: '800' }}>
                            {formatVND(selectedOrder.total)}
                          </strong>
                        </div>

                        {/* Triggered Support request popup inline inside modal */}
                        {supportProduct && (
                          <div 
                            style={{ 
                              background: 'rgba(255, 76, 76, 0.02)', 
                              border: '1px solid rgba(255, 76, 76, 0.15)', 
                              padding: '16px', 
                              borderRadius: 'var(--rounded)',
                              marginTop: '10px'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', itemsAlign: 'center', marginBottom: '12px' }}>
                              <h5 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-error)' }}>
                                YÊU CẦU HỖ TRỢ KỸ THUẬT: {supportProduct.name}
                              </h5>
                              <button onClick={() => setSupportProduct(null)} className="btn btn-ghost" style={{ padding: '2px', borderRadius: '50%' }}>
                                <X size={14} color="var(--color-error)" />
                              </button>
                            </div>
                            
                            {supportSuccess ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#81c784', fontSize: '12px', padding: '10px 0' }}>
                                <CheckCircle2 size={16} />
                                <span>Gửi yêu cầu hỗ trợ thành công! Kỹ thuật viên sẽ phản hồi bạn trong mục Support Ticket hoặc SMS.</span>
                              </div>
                            ) : (
                              <form onSubmit={handleSupportRequestSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                  <div>
                                    <label style={{ fontSize: '11px', color: 'var(--color-outline)', display: 'block', marginBottom: '4px' }}>Mức độ khẩn cấp</label>
                                    <select 
                                      value={supportUrgency} 
                                      onChange={(e) => setSupportUrgency(e.target.value)}
                                      className="form-input"
                                      style={{ padding: '8px', fontSize: '12px' }}
                                    >
                                      <option value="Thường">Thường (Xử lý trong 24h)</option>
                                      <option value="Gấp">Gấp (Xử lý trong 2-4h)</option>
                                      <option value="Rất Gấp">Rất Gấp (Yêu cầu gọi lại ngay)</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label style={{ fontSize: '11px', color: 'var(--color-outline)', display: 'block', marginBottom: '4px' }}>Loại sự cố</label>
                                    <input type="text" value="Báo lỗi phần cứng thiết bị" disabled className="form-input" style={{ padding: '8px', fontSize: '12px', opacity: 0.7 }} />
                                  </div>
                                </div>
                                <div>
                                  <label style={{ fontSize: '11px', color: 'var(--color-outline)', display: 'block', marginBottom: '4px' }}>Nội dung báo lỗi / Mô tả sự cố chi tiết</label>
                                  <textarea
                                    value={supportMessage}
                                    onChange={(e) => setSupportMessage(e.target.value)}
                                    placeholder="Vui lòng mô tả chi tiết lỗi gặp phải (ví dụ: máy không lên nguồn, màn hình bị sọc xanh, phím kẹt...). Nhập thông tin để shop tiếp nhận nhanh nhất..."
                                    rows="3"
                                    className="form-input"
                                    style={{ fontSize: '12px', padding: '10px' }}
                                  />
                                </div>
                                <button type="submit" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '12px', alignSelf: 'flex-end' }}>
                                  Gửi Yêu Cầu Hỗ Trợ
                                </button>
                              </form>
                            )}
                          </div>
                        )}
                        
                      </div>
                    </div>
                  </div>,
                  document.body
                )}
              </div>
            );
}

import React from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight, ShoppingBag, Tag, Heart, X, ShieldCheck, RotateCcw, CheckCircle2, Lock, Send, HelpCircle } from 'lucide-react';

export default function FeedbackTab(props) {
  const { currentUser, setActiveView, theme, likedProductIds, onToggleLike, products, orders, onAddOrder, tradeins, onAddTradeIn, feedbacks, onAddFeedback, onUpdateProfile, onAddSupportTicket, activeTab, setActiveTab, selectedOrder, setSelectedOrder, supportProduct, setSupportProduct, supportOrderId, setSupportOrderId, supportMessage, setSupportMessage, supportUrgency, setSupportUrgency, supportSuccess, setSupportSuccess, feedbackTitle, setFeedbackTitle, feedbackContent, setFeedbackContent, feedbackSuccess, setFeedbackSuccess, profileForm, setProfileForm, profileSuccess, setProfileSuccess, passwordForm, setPasswordForm, passwordError, setPasswordError, passwordSuccess, setPasswordSuccess, formatVND, userOrders, recentOrders, userTradeins, favoriteProducts, warrantyProducts, vouchers, handleCopyVoucher, handleFeedbackSubmit, handleSupportRequestSubmit, handleProfileUpdate, handlePasswordChange } = props;

  return (

              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px' }}>
                  Góp Ý - Phản Hồi Về Dịch Vụ
                </h3>

                <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginBottom: '20px', lineHeight: '1.6' }}>
                  Mọi ý kiến đóng góp của bạn là động lực giúp Kinetic Tech nâng cao chất lượng dịch vụ chăm sóc khách hàng và trải nghiệm mua sắm hi-end. Dữ liệu góp ý sau khi gửi sẽ được lưu trữ trực tiếp vào hệ thống quản lý để ban giám đốc tiếp nhận xử lý.
                </p>

                {feedbackSuccess ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: 'rgba(76, 175, 80, 0.15)',
                      border: '2px solid #81c784',
                      color: '#81c784',
                      marginBottom: '16px'
                    }}>
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'white', marginBottom: '8px' }}>Gửi góp ý thành công!</h4>
                    <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', maxWidth: '400px', margin: '0 auto' }}>
                      Cảm ơn bạn đã dành thời gian phản hồi. Đội ngũ quản trị viên đã ghi nhận và sẽ phản hồi qua email/SĐT đăng ký của bạn nếu cần thiết.
                    </p>
                    <button onClick={() => setFeedbackSuccess(false)} className="btn btn-outline" style={{ marginTop: '20px', padding: '8px 16px', fontSize: '12px' }}>
                      Gửi thêm góp ý khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFeedbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-outline)', marginBottom: '6px', fontWeight: '600' }}>Tiêu đề góp ý</label>
                      <input
                        type="text"
                        value={feedbackTitle}
                        onChange={(e) => setFeedbackTitle(e.target.value)}
                        placeholder="Ví dụ: Đóng góp về thái độ phục vụ, đề xuất mặt hàng mới..."
                        className="form-input"
                        style={{ padding: '10px' }}
                        required
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-outline)', marginBottom: '6px', fontWeight: '600' }}>Nội dung chi tiết</label>
                      <textarea
                        value={feedbackContent}
                        onChange={(e) => setFeedbackContent(e.target.value)}
                        placeholder="Vui lòng viết rõ các ý kiến đóng góp, đề xuất nâng cấp dịch vụ hoặc phản ánh trải nghiệm mua sắm của bạn tại Kinetic Tech..."
                        className="form-input"
                        style={{ padding: '10px' }}
                        rows="6"
                        required
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      style={{ padding: '10px 24px', alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <Send size={14} />
                      Gửi Góp Ý
                    </button>
                  </form>
                )}
              </div>
            );
}

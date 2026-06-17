import React from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight, ShoppingBag, Tag, Heart, X, ShieldCheck, RotateCcw, CheckCircle2, Lock, Send, HelpCircle } from 'lucide-react';

export default function ProfileTab(props) {
  const { currentUser, setActiveView, theme, likedProductIds, onToggleLike, products, orders, onAddOrder, tradeins, onAddTradeIn, feedbacks, onAddFeedback, onUpdateProfile, onAddSupportTicket, activeTab, setActiveTab, selectedOrder, setSelectedOrder, supportProduct, setSupportProduct, supportOrderId, setSupportOrderId, supportMessage, setSupportMessage, supportUrgency, setSupportUrgency, supportSuccess, setSupportSuccess, feedbackTitle, setFeedbackTitle, feedbackContent, setFeedbackContent, feedbackSuccess, setFeedbackSuccess, profileForm, setProfileForm, profileSuccess, setProfileSuccess, passwordForm, setPasswordForm, passwordError, setPasswordError, passwordSuccess, setPasswordSuccess, formatVND, userOrders, recentOrders, userTradeins, favoriteProducts, warrantyProducts, vouchers, handleCopyVoucher, handleFeedbackSubmit, handleSupportRequestSubmit, handleProfileUpdate, handlePasswordChange } = props;

  return (

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px' }}>
                    Chỉnh Sửa Thông Tin Cá Nhân
                  </h3>
                  
                  {profileSuccess && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#81c784', background: 'rgba(76,175,80,0.1)', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
                      <CheckCircle2 size={16} />
                      <span>Cập nhật thông tin tài khoản thành công!</span>
                    </div>
                  )}

                  <form onSubmit={handleProfileUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="overview-subgrid">
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-outline)', marginBottom: '6px', fontWeight: '600' }}>Họ và tên</label>
                        <input
                          type="text"
                          value={profileForm.fullName}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, fullName: e.target.value }))}
                          className="form-input"
                          style={{ padding: '10px' }}
                          required
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-outline)', marginBottom: '6px', fontWeight: '600' }}>Số điện thoại</label>
                        <input
                          type="text"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="form-input"
                          style={{ padding: '10px' }}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-outline)', marginBottom: '6px', fontWeight: '600' }}>Địa chỉ nhận hàng mặc định</label>
                      <textarea
                        value={profileForm.address}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, address: e.target.value }))}
                        className="form-input"
                        style={{ padding: '10px' }}
                        rows="3"
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px', alignSelf: 'flex-start' }}>
                      Lưu Thay Đổi
                    </button>
                  </form>
                </div>

                <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Lock size={18} color="var(--color-primary-dim)" />
                    Đổi Mật Khẩu Bảo Mật
                  </h3>

                  {passwordError && (
                    <div style={{ background: 'rgba(255,76,76,0.1)', border: '1px solid rgba(255,76,76,0.3)', color: '#ffb4ab', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
                      {passwordError}
                    </div>
                  )}

                  {passwordSuccess && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#81c784', background: 'rgba(76,175,80,0.1)', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
                      <CheckCircle2 size={16} />
                      <span>Đổi mật khẩu bảo mật thành công! Mật khẩu mới đã được kích hoạt.</span>
                    </div>
                  )}

                  <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-outline)', marginBottom: '6px', fontWeight: '600' }}>Mật khẩu cũ</label>
                      <input
                        type="password"
                        value={passwordForm.oldPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, oldPassword: e.target.value }))}
                        className="form-input"
                        placeholder="••••••••"
                        style={{ padding: '10px' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="overview-subgrid">
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-outline)', marginBottom: '6px', fontWeight: '600' }}>Mật khẩu mới</label>
                        <input
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="form-input"
                          placeholder="Tối thiểu 6 ký tự"
                          style={{ padding: '10px' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-outline)', marginBottom: '6px', fontWeight: '600' }}>Nhập lại mật khẩu mới</label>
                        <input
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="form-input"
                          placeholder="Trùng khớp mật khẩu trên"
                          style={{ padding: '10px' }}
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn btn-secondary" style={{ padding: '10px 20px', alignSelf: 'flex-start' }}>
                      Xác Nhận Đổi Mật Khẩu
                    </button>
                  </form>
                </div>
              </div>
            );
}

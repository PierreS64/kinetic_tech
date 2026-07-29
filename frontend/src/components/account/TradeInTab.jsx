import React from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight, ShoppingBag, Tag, Heart, X, ShieldCheck, RotateCcw, CheckCircle2, Lock, Send, HelpCircle } from 'lucide-react';

import { useAppContext } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';

export default function TradeInTab(props) {
  const { theme, likedProductIds, orders, tradeins, feedbacks } = useAppContext();
  const { currentUser } = useAuth();
  const { setActiveView, onToggleLike, products, onAddOrder, onAddTradeIn, onAddFeedback, onUpdateProfile, onAddSupportTicket, activeTab, setActiveTab, selectedOrder, setSelectedOrder, supportProduct, setSupportProduct, supportOrderId, setSupportOrderId, supportMessage, setSupportMessage, supportUrgency, setSupportUrgency, supportSuccess, setSupportSuccess, feedbackTitle, setFeedbackTitle, feedbackContent, setFeedbackContent, feedbackSuccess, setFeedbackSuccess, profileForm, setProfileForm, profileSuccess, setProfileSuccess, passwordForm, setPasswordForm, passwordError, setPasswordError, passwordSuccess, setPasswordSuccess, formatVND, userOrders, recentOrders, userTradeins, favoriteProducts, warrantyProducts, vouchers, handleCopyVoucher, handleFeedbackSubmit, handleSupportRequestSubmit, handleProfileUpdate, handlePasswordChange } = props;

  return (

              <div  style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }} className="glass-panel">
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px' }}>
                  Lịch Sử Đăng Ký Thu Cũ Đổi Mới
                </h3>

                <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginBottom: '20px' }}>
                  Danh sách các thiết bị công nghệ cũ bạn đã gửi định giá để nâng cấp lên các sản phẩm mới của cửa hàng.
                </p>

                {userTradeins.length === 0 ? (
                  <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--color-outline)' }}>
                    <RotateCcw size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
                    <p style={{ fontSize: '13px' }}>Bạn chưa có yêu cầu thu cũ đổi mới nào.</p>
                    <button onClick={() => setActiveView('trade-in')} className="btn btn-primary" style={{ marginTop: '20px', padding: '10px 20px' }}>
                      Định giá máy cũ ngay
                    </button>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}  className="zebra-table">
                      <thead>
                        <tr style={{ background: 'var(--color-surface-container-high)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                          <th style={{ padding: '12px 16px', fontWeight: '700' }}>Tên Máy Cũ</th>
                          <th style={{ padding: '12px 16px', fontWeight: '700' }}>Tự Đánh Giá</th>
                          <th style={{ padding: '12px 16px', fontWeight: '700' }}>Giá Định Sơ Bộ</th>
                          <th style={{ padding: '12px 16px', fontWeight: '700' }}>Trạng Thái</th>
                          <th style={{ padding: '12px 16px', fontWeight: '700' }}>Ngày gửi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userTradeins.map(trade => (
                          <tr key={trade.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <td style={{ fontWeight: '700', color: 'var(--color-on-surface)', padding: '12px 16px' }}>
                              {trade.oldDevice}
                            </td>
                            <td style={{ padding: '12px 16px', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={trade.conditionDesc}>
                              {trade.conditionDesc}
                            </td>
                            <td style={{ fontWeight: '800', color: 'var(--color-secondary-dim)', padding: '12px 16px' }}>
                              {trade.offeredPrice > 0 ? formatVND(trade.offeredPrice) : 'Chờ định giá'}
                            </td>
                            <td style={{ padding: '12px 16px' }}>
                              <span  style={{
                                fontSize: '10px',
                                background: 
                                  trade.status === 'COMPLETED' || trade.status === 'Đã thu mua' ? 'rgba(76,175,80,0.15)' : 
                                  trade.status === 'CANCELLED' || trade.status === 'Đã hủy' ? 'rgba(255,76,76,0.15)' :
                                  'rgba(253,139,0,0.15)',
                                color: 
                                  trade.status === 'COMPLETED' || trade.status === 'Đã thu mua' ? '#81c784' : 
                                  trade.status === 'CANCELLED' || trade.status === 'Đã hủy' ? '#ffb4ab' :
                                  '#ffb77d',
                                padding: '2px 8px'
                              }} className="status-badge">
                                {trade.status === 'COMPLETED' && 'Đã thu mua'}
                                {trade.status === 'VALUED' && 'Đã định giá'}
                                {trade.status === 'PENDING' && 'Chờ duyệt'}
                                {trade.status === 'CANCELLED' && 'Đã hủy'}
                                {trade.status === 'Đã thu mua' && 'Đã thu mua'}
                                {trade.status === 'Chờ duyệt' && 'Chờ duyệt'}
                                {trade.status === 'Đã hủy' && 'Đã hủy'}
                              </span>
                            </td>
                            <td style={{ padding: '12px 16px', color: 'var(--color-outline)' }}>{trade.dateCreated}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
}

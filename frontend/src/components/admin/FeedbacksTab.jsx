import React from 'react';
import { TrendingUp, ShoppingBag, Package, MessageSquare, Shield, Search, Plus, Trash2, CheckCircle2, XCircle, AlertCircle, ArrowRight, DollarSign, Wrench, RefreshCw, FileText, ChevronRight, Filter, Check, X, Edit2, Tag } from 'lucide-react';

export default function FeedbacksTab(props) {
  const { theme, orders, tickets, warranties, tradeins, feedbacks, storeProducts, setStoreProducts, setOrders, setTickets, setWarranties, setTradeins, setFeedbacks, selectedOrder, setSelectedOrder, promotions, setPromotions, isAddingPromo, setIsAddingPromo, newPromo, setNewPromo, selectedPromoForEdit, setSelectedPromoForEdit, productToAddToPromo, setProductToAddToPromo, handleAddPromo, handleDeletePromo, handleAddProductToPromo, handleRemoveProductFromPromo, handlePromoProductPriceChange, selectedTicket, setSelectedTicket, ticketReplyText, setTicketReplyText, selectedWarranty, setSelectedWarranty, selectedTradeIn, setSelectedTradeIn, offeredTradeInValuation, setOfferedTradeInValuation, isAddingProduct, setIsAddingProduct, newProduct, setNewProduct, orderSearch, setOrderSearch, productSearch, setProductSearch, selectedCategoryFilter, setSelectedCategoryFilter, inventorySort, setInventorySort, priceConfirmModal, setPriceConfirmModal, tempPriceInput, setTempPriceInput, detailedItem, setDetailedItem, productEditDraft, setProductEditDraft, productConfirmModal, setProductConfirmModal, textColor, getSoldThisMonth, formatVND, updateOrderStatus, toggleStock, updateProductPrice, handleManualPriceChange, handleAddProduct, handleReplyTicket, closeTicket, updateWarrantyStatus, submitTradeInValuation, handleInputBlurOrEnter, handleCloseDetailedModal, filteredOrders, filteredInventoryProducts, totalRevenue, pendingOrdersCount, outOfStockCount, activeTicketsCount } = props;

  return (

              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px', color: theme === 'light' ? '#0f172a' : 'white' }}>
                  Ý Kiến & Góp Ý Từ Khách Hàng
                </h3>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }} className="zebra-table">
                    <thead>
                      <tr style={{ background: 'var(--color-surface-container-high)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: theme === 'light' ? '#0f172a' : 'white' }}>Mã Góp Ý</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: theme === 'light' ? '#0f172a' : 'white' }}>Khách Hàng</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', width: '33%', color: theme === 'light' ? '#0f172a' : 'white' }}>Tiêu Đề</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', width: '17%', color: theme === 'light' ? '#0f172a' : 'white' }}>Nội Dung Chi Tiết</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: theme === 'light' ? '#0f172a' : 'white' }}>Thời Gian</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: theme === 'light' ? '#0f172a' : 'white' }}>Trạng Thái</th>
                        <th style={{ padding: '12px 10px', fontWeight: '700', textAlign: 'center', width: '100px', color: theme === 'light' ? '#0f172a' : 'white' }}>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedbacks.length === 0 ? (
                        <tr>
                          <td colSpan="7" style={{ textAlign: 'center', color: 'var(--color-outline)', padding: '30px' }}>Không có ý kiến đóng góp nào từ khách hàng.</td>
                        </tr>
                      ) : (
                        feedbacks.map(fb => (
                          <tr key={fb.id} onClick={(e) => { if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') setDetailedItem({ ...fb, type: 'feedback' }); }} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer' }}>
                            <td style={{ fontWeight: '700', color: 'var(--color-primary-dim)', padding: '12px 16px' }}>{fb.id}</td>
                            <td style={{ padding: '12px 16px' }}>
                              <strong style={{ color: textColor, display: 'block' }}>{fb.fullName}</strong>
                              <span style={{ fontSize: '10px', color: 'var(--color-outline)' }}>{fb.email}</span>
                            </td>
                            <td style={{ fontWeight: '600', color: textColor, padding: '12px 16px', fontSize: '14px' }}>{fb.title}</td>
                            <td style={{ padding: '12px 16px' }}>
                              <p style={{ fontSize: '13px', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: theme === 'light' ? '#334155' : 'white' }} title={fb.content}>
                                {fb.content}
                              </p>
                            </td>
                            <td style={{ padding: '12px 16px', color: textColor }}>{fb.date}</td>
                            <td style={{ padding: '12px 16px' }}>
                              <span className="status-badge" style={{
                                fontSize: '10px',
                                fontWeight: 'bold',
                                background: fb.status === 'processed' ? (theme === 'light' ? '#4caf50' : 'rgba(76,175,80,0.15)') : (theme === 'light' ? '#ff9800' : 'rgba(253,139,0,0.15)'),
                                color: '#ffffff',
                                border: theme === 'light' ? 'none' : '1px solid currentColor',
                                padding: '4px 8px',
                                borderRadius: '4px'
                              }}>
                                {fb.status === 'processed' ? 'Đã xử lý' : 'Chờ xử lý'}
                              </span>
                            </td>
                            <td style={{ padding: '12px 16px' }} onClick={(e) => e.stopPropagation()}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', justifyContent: 'center' }}>
                                {fb.status === 'pending' && (
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setFeedbacks(prev => prev.map(f => f.id === fb.id ? { ...f, status: 'processed' } : f)); }}
                                    className="btn btn-primary"
                                    style={{ padding: '4px 8px', fontSize: '10px', width: '70px' }}
                                  >
                                    Duyệt
                                  </button>
                                )}
                                <button
                                  onClick={() => setFeedbacks(prev => prev.filter(f => f.id !== fb.id))}
                                  className="btn"
                                  style={{ padding: '4px 8px', fontSize: '10px', width: '70px', background: '#d32f2f', color: 'white' }}
                                  title="Xóa"
                                >
                                  Xóa
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            );
}

import React from 'react';
import { TrendingUp, ShoppingBag, Package, MessageSquare, Shield, Search, Plus, Trash2, CheckCircle2, XCircle, AlertCircle, ArrowRight, DollarSign, Wrench, RefreshCw, FileText, ChevronRight, Filter, Check, X, Edit2, Tag } from 'lucide-react';

export default function TradeInTab(props) {
  const { theme, orders, tickets, warranties, tradeins, feedbacks, storeProducts, setStoreProducts, setOrders, setTickets, setWarranties, setTradeins, setFeedbacks, selectedOrder, setSelectedOrder, promotions, setPromotions, isAddingPromo, setIsAddingPromo, newPromo, setNewPromo, selectedPromoForEdit, setSelectedPromoForEdit, productToAddToPromo, setProductToAddToPromo, handleAddPromo, handleDeletePromo, handleAddProductToPromo, handleRemoveProductFromPromo, handlePromoProductPriceChange, selectedTicket, setSelectedTicket, ticketReplyText, setTicketReplyText, selectedWarranty, setSelectedWarranty, selectedTradeIn, setSelectedTradeIn, offeredTradeInValuation, setOfferedTradeInValuation, isAddingProduct, setIsAddingProduct, newProduct, setNewProduct, orderSearch, setOrderSearch, productSearch, setProductSearch, selectedCategoryFilter, setSelectedCategoryFilter, inventorySort, setInventorySort, priceConfirmModal, setPriceConfirmModal, tempPriceInput, setTempPriceInput, detailedItem, setDetailedItem, productEditDraft, setProductEditDraft, productConfirmModal, setProductConfirmModal, textColor, getSoldThisMonth, formatVND, updateOrderStatus, toggleStock, updateProductPrice, handleManualPriceChange, handleAddProduct, handleReplyTicket, closeTicket, updateWarrantyStatus, submitTradeInValuation, handleInputBlurOrEnter, handleCloseDetailedModal, filteredOrders, filteredInventoryProducts, totalRevenue, pendingOrdersCount, outOfStockCount, activeTicketsCount } = props;

  return (

              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', color: textColor }}>Thu Cũ Đổi Mới (Trade-in)</h3>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }} className="zebra-table">
                    <thead>
                      <tr style={{ background: 'var(--color-surface-container-high)' }}>
                        <th style={{ padding: '10px 12px', fontWeight: '700', color: textColor, whiteSpace: 'nowrap' }}>Mã YC</th>
                        <th style={{ padding: '10px 12px', fontWeight: '700', color: textColor, whiteSpace: 'nowrap' }}>Khách Hàng</th>
                        <th style={{ padding: '10px 12px', fontWeight: '700', width: '22%', color: textColor }}>Thiết Bị Cũ</th>
                        <th style={{ padding: '10px 12px', fontWeight: '700', width: '22%', color: textColor }}>Sản Phẩm Đổi</th>
                        <th style={{ padding: '10px 12px', fontWeight: '700', width: '15%', color: textColor }}>Tình trạng</th>
                        <th style={{ padding: '10px 12px', fontWeight: '700', color: textColor, whiteSpace: 'nowrap' }}>Giá thu mua</th>
                        <th style={{ padding: '10px 12px', fontWeight: '700', color: textColor, whiteSpace: 'nowrap' }}>Trạng Thái</th>
                        <th style={{ padding: '10px 12px', fontWeight: '700', textAlign: 'center', color: textColor, whiteSpace: 'nowrap' }}>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tradeins.map(req => (
                        <tr key={req.id} onClick={(e) => { if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') setDetailedItem({ ...req, type: 'tradein' }); }} style={{ cursor: 'pointer' }}>
                          <td style={{ padding: '10px 12px', fontWeight: '700', color: 'var(--color-primary-dim)' }}>{req.id}</td>
                          <td style={{ padding: '10px 12px' }}>
                            <strong style={{ color: textColor, display: 'block', whiteSpace: 'nowrap', fontSize: '12px' }}>{req.customerName}</strong>
                            <span style={{ fontSize: '9px', color: 'var(--color-outline)' }}>{req.phone}</span>
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <strong style={{ color: textColor, display: 'block', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '12px' }} title={req.oldDevice}>{req.oldDevice}</strong>
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <span style={{ color: 'var(--color-primary-dim)', fontWeight: '600', display: 'block', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '12px' }} title={req.targetDevice}>{req.targetDevice}</span>
                          </td>
                          <td style={{ padding: '10px 12px', color: textColor, maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '12px' }} title={req.conditionDesc}>
                            {req.conditionDesc}
                          </td>
                          <td style={{ padding: '10px 12px', fontWeight: '700', color: 'var(--color-secondary-dim)', whiteSpace: 'nowrap', fontSize: '12px' }}>
                            {req.offeredPrice > 0 ? formatVND(req.offeredPrice) : 'Chờ thẩm định'}
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <span className="status-badge" style={{
                              fontSize: '9px',
                              fontWeight: 'bold',
                              background:
                                req.status === 'completed' ? (theme === 'light' ? '#4caf50' : 'rgba(76,175,80,0.15)') :
                                  req.status === 'valued' ? (theme === 'light' ? '#2196f3' : 'rgba(0,123,255,0.15)') : (theme === 'light' ? '#ff9800' : 'rgba(253,139,0,0.15)'),
                              color: '#ffffff',
                              border: theme === 'light' ? 'none' : '1px solid currentColor',
                              padding: '4px 6px',
                              borderRadius: '4px',
                              whiteSpace: 'nowrap'
                            }}>
                              {req.status === 'pending' && 'Chờ thẩm định'}
                              {req.status === 'valued' && 'Đã báo giá'}
                              {req.status === 'completed' && 'Hoàn thành'}
                            </span>
                          </td>
                          <td style={{ padding: '10px 12px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                              {req.status === 'pending' && (
                                <button onClick={(e) => { e.stopPropagation(); setSelectedTradeIn(req); }} className="btn btn-primary" style={{ padding: '4px 6px', fontSize: '9px', whiteSpace: 'nowrap' }}>
                                  Thẩm định
                                </button>
                              )}
                              {req.status === 'valued' && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); setTradeins(prev => prev.map(t => t.id === req.id ? { ...t, status: 'completed' } : t)); }}
                                  className="btn"
                                  style={{ padding: '4px 6px', fontSize: '9px', background: '#388e3c', color: 'white', whiteSpace: 'nowrap' }}
                                >
                                  Hoàn tất
                                </button>
                              )}
                              {req.status === 'completed' && (
                                <span style={{ color: 'var(--color-outline)', fontSize: '9px', whiteSpace: 'nowrap' }}>Hoàn tất</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Valuation Modal overlay */}
                {selectedTradeIn && (
                  <div className="modal-overlay" onClick={() => setSelectedTradeIn(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1000 }}>
                    <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '440px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden', zIndex: 1001, background: theme === 'light' ? '#ffffff' : undefined, border: theme === 'light' ? '1px solid #cbd5e1' : undefined }}>
                      <div style={{ padding: '16px 20px', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '800', color: textColor }}>Thẩm định & Báo giá thu cũ cho {selectedTradeIn.customerName}</h4>
                        <button onClick={() => setSelectedTradeIn(null)} className="btn btn-ghost" style={{ padding: '4px', borderRadius: '50%' }}>
                          <X size={18} color={theme === 'light' ? '#334155' : 'white'} />
                        </button>
                      </div>

                      <form onSubmit={submitTradeInValuation} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                          <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Mẫu máy thu cũ:</span>
                          <strong style={{ display: 'block', fontSize: '13px', color: textColor, marginTop: '2px' }}>{selectedTradeIn.oldDevice}</strong>
                        </div>

                        <div>
                          <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Thông tin sử dụng & tình trạng:</span>
                          <p style={{ fontSize: '12px', color: textColor, marginTop: '2px', lineHeight: '1.4' }}>{selectedTradeIn.conditionDesc}</p>
                        </div>

                        {selectedTradeIn.selfValuation > 0 && (
                          <div>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Giá mong muốn:</span>
                            <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-secondary-dim)', marginTop: '2px' }}>{formatVND(selectedTradeIn.selfValuation)}</strong>
                          </div>
                        )}

                        {selectedTradeIn.attachedImage && (
                          <div style={{ marginTop: '4px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', display: 'block', marginBottom: '4px' }}>Hình ảnh thực tế đính kèm:</span>
                            <img
                              src={selectedTradeIn.attachedImage}
                              alt="Ảnh thực tế linh kiện cũ"
                              style={{ width: '100%', maxHeight: '180px', objectFit: 'contain', borderRadius: '6px', border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.08)', background: theme === 'light' ? '#f8fafc' : '#050d18' }}
                            />
                          </div>
                        )}

                        <div style={{ height: '1px', background: theme === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)', margin: '4px 0' }} />

                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Mức giá thu mua đề nghị (VND) *</label>
                          <input
                            type="number"
                            required
                            placeholder="Ví dụ: 8500000"
                            value={offeredTradeInValuation}
                            onChange={(e) => setOfferedTradeInValuation(e.target.value)}
                            className="form-input"
                            style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                          />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px', marginTop: '10px' }}>
                          Gửi báo giá thẩm định cho khách
                        </button>
                      </form>
                    </div>
                  </div>
                )}

              </div>
            );
}

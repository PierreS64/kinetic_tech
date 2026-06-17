import React from 'react';
import { TrendingUp, ShoppingBag, Package, MessageSquare, Shield, Search, Plus, Trash2, CheckCircle2, XCircle, AlertCircle, ArrowRight, DollarSign, Wrench, RefreshCw, FileText, ChevronRight, Filter, Check, X, Edit2, Tag } from 'lucide-react';

export default function WarrantiesTab(props) {
  const { theme, orders, tickets, warranties, tradeins, feedbacks, storeProducts, setStoreProducts, setOrders, setTickets, setWarranties, setTradeins, setFeedbacks, selectedOrder, setSelectedOrder, promotions, setPromotions, isAddingPromo, setIsAddingPromo, newPromo, setNewPromo, selectedPromoForEdit, setSelectedPromoForEdit, productToAddToPromo, setProductToAddToPromo, handleAddPromo, handleDeletePromo, handleAddProductToPromo, handleRemoveProductFromPromo, handlePromoProductPriceChange, selectedTicket, setSelectedTicket, ticketReplyText, setTicketReplyText, selectedWarranty, setSelectedWarranty, selectedTradeIn, setSelectedTradeIn, offeredTradeInValuation, setOfferedTradeInValuation, isAddingProduct, setIsAddingProduct, newProduct, setNewProduct, orderSearch, setOrderSearch, productSearch, setProductSearch, selectedCategoryFilter, setSelectedCategoryFilter, inventorySort, setInventorySort, priceConfirmModal, setPriceConfirmModal, tempPriceInput, setTempPriceInput, detailedItem, setDetailedItem, productEditDraft, setProductEditDraft, productConfirmModal, setProductConfirmModal, textColor, getSoldThisMonth, formatVND, updateOrderStatus, toggleStock, updateProductPrice, handleManualPriceChange, handleAddProduct, handleReplyTicket, closeTicket, updateWarrantyStatus, submitTradeInValuation, handleInputBlurOrEnter, handleCloseDetailedModal, filteredOrders, filteredInventoryProducts, totalRevenue, pendingOrdersCount, outOfStockCount, activeTicketsCount } = props;

  return (

              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', color: textColor }}>Quản Lý Yêu Cầu Bảo Hành</h3>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }} className="zebra-table">
                    <thead>
                      <tr style={{ background: 'var(--color-surface-container-high)' }}>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: textColor }}>Mã yêu cầu</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: textColor }}>Khách hàng</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: textColor }}>Sản Phẩm & Serial</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: textColor }}>Mô tả lỗi</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: textColor }}>Ngày nhận</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: textColor }}>Trạng thái</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', textAlign: 'center', color: textColor }}>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {warranties.map(claim => (
                        <tr key={claim.id} onClick={(e) => { if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') setDetailedItem({ ...claim, type: 'warranty' }); }} style={{ cursor: 'pointer' }}>
                          <td style={{ fontWeight: '700', color: 'var(--color-primary-dim)' }}>{claim.id}</td>
                          <td>
                            <strong style={{ color: textColor, display: 'block' }}>{claim.customerName}</strong>
                            <span style={{ fontSize: '10px', color: 'var(--color-outline)' }}>{claim.phone}</span>
                          </td>
                          <td>
                            <strong style={{ color: textColor, display: 'block', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={claim.productName}>{claim.productName}</strong>
                            <span style={{ fontSize: '10px', color: 'var(--color-outline)' }}>S/N: {claim.serialNumber}</span>
                          </td>
                          <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: textColor }} title={claim.issue}>
                            {claim.issue}
                          </td>
                          <td style={{ color: textColor }}>{claim.dateCreated}</td>
                          <td>
                            <span className="status-badge" style={{
                              fontSize: '10px',
                              fontWeight: 'bold',
                              background:
                                claim.status === 'returned' ? (theme === 'light' ? '#4caf50' : 'rgba(76,175,80,0.15)') :
                                  claim.status === 'checking' ? (theme === 'light' ? '#ff9800' : 'rgba(253,139,0,0.15)') : (theme === 'light' ? '#2196f3' : 'rgba(0,123,255,0.15)'),
                              color: '#ffffff',
                              border: theme === 'light' ? 'none' : '1px solid currentColor',
                              padding: '4px 8px',
                              borderRadius: '4px'
                            }}>
                              {claim.status === 'checking' && 'Đang kiểm tra'}
                              {claim.status === 'repairing' && 'Đang sửa chữa'}
                              {claim.status === 'returned' && 'Đã trả máy'}
                            </span>
                          </td>
                          <td style={{ textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                              {claim.status === 'checking' && (
                                <button onClick={(e) => { e.stopPropagation(); updateWarrantyStatus(claim.id, 'repairing'); }} className="btn btn-primary" style={{ padding: '4px 6px', fontSize: '10px' }}>
                                  Nhận sửa
                                </button>
                              )}
                              {claim.status === 'repairing' && (
                                <button onClick={(e) => { e.stopPropagation(); updateWarrantyStatus(claim.id, 'returned'); }} className="btn" style={{ padding: '4px 6px', fontSize: '10px', background: '#388e3c', color: 'white' }}>
                                  Trả khách
                                </button>
                              )}
                              {claim.status === 'returned' && (
                                <span style={{ color: 'var(--color-outline)', fontSize: '10px' }}>Hoàn tất</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
}

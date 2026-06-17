import React from 'react';
import { TrendingUp, ShoppingBag, Package, MessageSquare, Shield, Search, Plus, Trash2, CheckCircle2, XCircle, AlertCircle, ArrowRight, DollarSign, Wrench, RefreshCw, FileText, ChevronRight, Filter, Check, X, Edit2, Tag } from 'lucide-react';

export default function OrdersTab(props) {
  const { theme, orders, tickets, warranties, tradeins, feedbacks, storeProducts, setStoreProducts, setOrders, setTickets, setWarranties, setTradeins, setFeedbacks, selectedOrder, setSelectedOrder, promotions, setPromotions, isAddingPromo, setIsAddingPromo, newPromo, setNewPromo, selectedPromoForEdit, setSelectedPromoForEdit, productToAddToPromo, setProductToAddToPromo, handleAddPromo, handleDeletePromo, handleAddProductToPromo, handleRemoveProductFromPromo, handlePromoProductPriceChange, selectedTicket, setSelectedTicket, ticketReplyText, setTicketReplyText, selectedWarranty, setSelectedWarranty, selectedTradeIn, setSelectedTradeIn, offeredTradeInValuation, setOfferedTradeInValuation, isAddingProduct, setIsAddingProduct, newProduct, setNewProduct, orderSearch, setOrderSearch, productSearch, setProductSearch, selectedCategoryFilter, setSelectedCategoryFilter, inventorySort, setInventorySort, priceConfirmModal, setPriceConfirmModal, tempPriceInput, setTempPriceInput, detailedItem, setDetailedItem, productEditDraft, setProductEditDraft, productConfirmModal, setProductConfirmModal, textColor, getSoldThisMonth, formatVND, updateOrderStatus, toggleStock, updateProductPrice, handleManualPriceChange, handleAddProduct, handleReplyTicket, closeTicket, updateWarrantyStatus, submitTradeInValuation, handleInputBlurOrEnter, handleCloseDetailedModal, filteredOrders, filteredInventoryProducts, totalRevenue, pendingOrdersCount, outOfStockCount, activeTicketsCount } = props;

  return (

              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Quản Lý Đơn Hàng</h3>

                  {/* Search box */}
                  <div style={{ position: 'relative', width: '260px' }}>
                    <input
                      type="text"
                      placeholder="Tìm ID, Tên Khách Hàng, SĐT..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="form-input"
                      style={{ paddingLeft: '34px', fontSize: '12px' }}
                    />
                    <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-outline)' }} />
                  </div>
                </div>

                {/* Orders list table */}
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }} className="zebra-table">
                    <thead>
                      <tr style={{ background: 'var(--color-surface-container-high)' }}>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Mã Đơn Hàng</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Khách Hàng</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Thời Gian</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Tổng Tiền</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Thanh Toán</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700' }}>Trạng Thái</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', textAlign: 'center' }}>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan="7" style={{ textAlign: 'center', color: 'var(--color-outline)', padding: '30px' }}>Không tìm thấy đơn hàng nào.</td>
                        </tr>
                      ) : (
                        filteredOrders.map(order => (
                          <tr key={order.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedOrder(order)}>
                            <td style={{ fontWeight: '700', color: 'var(--color-primary-dim)' }}>{order.id}</td>
                            <td>
                              <strong style={{ color: theme === 'light' ? '#0f172a' : 'white', display: 'block', fontSize: '13px' }}>{order.customerName}</strong>
                              <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>{order.phone}</span>
                            </td>
                            <td style={{ maxWidth: '110px', color: theme === 'light' ? '#0f172a' : 'inherit' }}>{order.date}</td>
                            <td style={{ fontWeight: '800', color: 'var(--color-secondary-dim)' }}>{formatVND(order.total)}</td>
                            <td style={{ maxWidth: '90px', fontSize: '12px', color: theme === 'light' ? '#0f172a' : 'inherit' }}>{order.paymentMethod}</td>
                            <td>
                              <span className="status-badge" style={{
                                fontSize: '10px',
                                fontWeight: 'bold',
                                background:
                                  order.status === 'completed' ? (theme === 'light' ? '#4caf50' : 'rgba(76,175,80,0.15)') :
                                    order.status === 'cancelled' ? (theme === 'light' ? '#f44336' : 'rgba(255,76,76,0.15)') :
                                      order.status === 'processing' ? (theme === 'light' ? '#2196f3' : 'rgba(0,123,255,0.15)') : (theme === 'light' ? '#ff9800' : 'rgba(253,139,0,0.15)'),
                                color:
                                  order.status === 'completed' ? '#ffffff' :
                                    order.status === 'cancelled' ? '#ffffff' :
                                      order.status === 'processing' ? '#ffffff' : '#ffffff',
                                border: theme === 'light' ? 'none' : '1px solid currentColor',
                                padding: '4px 8px',
                                borderRadius: '4px'
                              }}>
                                {order.status === 'completed' && 'Đã giao'}
                                {order.status === 'cancelled' && 'Đã hủy'}
                                {order.status === 'processing' && 'Đang xử lý'}
                                {order.status === 'pending' && 'Chờ duyệt'}
                              </span>
                            </td>
                            <td onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', justifyContent: 'center' }}>
                                {order.status === 'pending' && (
                                  <button onClick={() => updateOrderStatus(order.id, 'processing')} className="btn btn-primary" style={{ padding: '4px 8px', fontSize: '11px', width: '90px' }} title="Duyệt đơn hàng">
                                    Duyệt đơn
                                  </button>
                                )}
                                {order.status === 'processing' && (
                                  <button onClick={() => updateOrderStatus(order.id, 'completed')} className="btn" style={{ padding: '4px 8px', fontSize: '11px', width: '90px', background: '#388e3c', color: 'white' }} title="Hoàn thành đơn hàng">
                                    Hoàn thành
                                  </button>
                                )}
                                {['pending', 'processing'].includes(order.status) && (
                                  <button onClick={() => updateOrderStatus(order.id, 'cancelled')} className="btn" style={{ padding: '4px 8px', fontSize: '11px', width: '90px', background: '#d32f2f', color: 'white' }} title="Hủy đơn hàng">
                                    Hủy
                                  </button>
                                )}
                                {['completed', 'cancelled'].includes(order.status) && (
                                  <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Khóa</span>
                                )}
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

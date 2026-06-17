import React from 'react';
import { TrendingUp, ShoppingBag, Package, MessageSquare, Shield, Search, Plus, Trash2, CheckCircle2, XCircle, AlertCircle, ArrowRight, DollarSign, Wrench, RefreshCw, FileText, ChevronRight, Filter, Check, X, Edit2, Tag } from 'lucide-react';

export default function OverviewTab(props) {
  const { theme, orders, tickets, warranties, tradeins, feedbacks, storeProducts, setStoreProducts, setOrders, setTickets, setWarranties, setTradeins, setFeedbacks, selectedOrder, setSelectedOrder, promotions, setPromotions, isAddingPromo, setIsAddingPromo, newPromo, setNewPromo, selectedPromoForEdit, setSelectedPromoForEdit, productToAddToPromo, setProductToAddToPromo, handleAddPromo, handleDeletePromo, handleAddProductToPromo, handleRemoveProductFromPromo, handlePromoProductPriceChange, selectedTicket, setSelectedTicket, ticketReplyText, setTicketReplyText, selectedWarranty, setSelectedWarranty, selectedTradeIn, setSelectedTradeIn, offeredTradeInValuation, setOfferedTradeInValuation, isAddingProduct, setIsAddingProduct, newProduct, setNewProduct, orderSearch, setOrderSearch, productSearch, setProductSearch, selectedCategoryFilter, setSelectedCategoryFilter, inventorySort, setInventorySort, priceConfirmModal, setPriceConfirmModal, tempPriceInput, setTempPriceInput, detailedItem, setDetailedItem, productEditDraft, setProductEditDraft, productConfirmModal, setProductConfirmModal, textColor, getSoldThisMonth, formatVND, updateOrderStatus, toggleStock, updateProductPrice, handleManualPriceChange, handleAddProduct, handleReplyTicket, closeTicket, updateWarrantyStatus, submitTradeInValuation, handleInputBlurOrEnter, handleCloseDetailedModal, filteredOrders, filteredInventoryProducts, totalRevenue, pendingOrdersCount, outOfStockCount, activeTicketsCount } = props;

  return (

              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px' }}>
                  Tổng Quan Hoạt Động Gần Đây
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="overview-subgrid">

                  {/* Left Column: Recent Orders */}
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ShoppingBag size={14} color="var(--color-primary-dim)" />
                      Đơn hàng mới nhận
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {orders.slice(0, 3).map(order => (
                        <div
                          key={order.id}
                          style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: 'var(--rounded)',
                            padding: '12px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <span style={{ fontWeight: '700', fontSize: '12px', display: 'block', color: theme === 'light' ? '#0f172a' : 'white' }}>{order.id} - {order.customerName}</span>
                            <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>{order.date} | {order.paymentMethod}</span>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontWeight: '800', fontSize: '13px', display: 'block', color: 'var(--color-secondary-dim)' }}>{formatVND(order.total)}</span>
                            <span className="status-badge" style={{
                              fontSize: '9px',
                              background: order.status === 'completed' ? 'rgba(76,175,80,0.15)' : order.status === 'pending' ? 'rgba(253,139,0,0.15)' : 'rgba(0,123,255,0.15)',
                              color: order.status === 'completed' ? '#81c784' : order.status === 'pending' ? '#ffb77d' : '#adc7ff',
                              padding: '2px 6px'
                            }}>
                              {order.status === 'completed' ? 'Đã Giao' : order.status === 'pending' ? 'Chờ duyệt' : 'Đang xử lý'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Customer Inquiries */}
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MessageSquare size={14} color="#81c784" />
                      Yêu cầu hỗ trợ kỹ thuật
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {tickets.map(ticket => (
                        <div
                          key={ticket.id}
                          style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            borderRadius: 'var(--rounded)',
                            padding: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: '700', fontSize: '12px', color: theme === 'light' ? '#0f172a' : 'white' }}>#{ticket.id} - {ticket.customerName}</span>
                            <span className="status-badge" style={{
                              fontSize: '9px',
                              background: ticket.status === 'pending' ? 'rgba(255,76,76,0.15)' : 'rgba(76,175,80,0.15)',
                              color: ticket.status === 'pending' ? '#ffb4ab' : '#81c784',
                              padding: '1px 6px'
                            }}>
                              {ticket.status === 'pending' ? 'Chờ trả lời' : 'Đã phản hồi'}
                            </span>
                          </div>
                          <p style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {ticket.subject}
                          </p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--color-outline)' }}>
                            <span>Phân loại: {ticket.category}</span>
                            <span>Mức độ: <strong style={{ color: ticket.urgency === 'Gấp' ? '#ffb4ab' : 'var(--color-outline)' }}>{ticket.urgency}</strong></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Quick Quick Actions Section */}
                <div style={{ marginTop: '30px', background: 'rgba(0,123,255,0.03)', border: '1px solid rgba(0,123,255,0.1)', borderRadius: 'var(--rounded)', padding: '16px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: '800', marginBottom: '10px', color: 'var(--color-primary-dim)' }}>Lối tắt thao tác nhanh</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <button onClick={() => { setActiveTab('products'); setIsAddingProduct(true); }} className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '12px' }}>
                      <Plus size={14} />
                      Thêm sản phẩm mới
                    </button>
                    <button onClick={() => setActiveTab('orders')} className="btn btn-outline" style={{ padding: '8px 14px', fontSize: '12px' }}>
                      <ShoppingBag size={14} />
                      Xem danh sách đơn hàng
                    </button>
                    <button onClick={() => setActiveTab('tickets')} className="btn btn-outline" style={{ padding: '8px 14px', fontSize: '12px' }}>
                      <MessageSquare size={14} />
                      Trực chat kỹ thuật
                    </button>
                  </div>
                </div>
              </div>
            );
}

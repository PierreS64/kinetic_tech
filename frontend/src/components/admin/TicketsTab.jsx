import React from 'react';
import { TrendingUp, ShoppingBag, Package, MessageSquare, Shield, Search, Plus, Trash2, CheckCircle2, XCircle, AlertCircle, ArrowRight, DollarSign, Wrench, RefreshCw, FileText, ChevronRight, Filter, Check, X, Edit2, Tag } from 'lucide-react';

export default function TicketsTab(props) {
  const { theme, orders, tickets, warranties, tradeins, feedbacks, storeProducts, setStoreProducts, setOrders, setTickets, setWarranties, setTradeins, setFeedbacks, selectedOrder, setSelectedOrder, promotions, setPromotions, isAddingPromo, setIsAddingPromo, newPromo, setNewPromo, selectedPromoForEdit, setSelectedPromoForEdit, productToAddToPromo, setProductToAddToPromo, handleAddPromo, handleDeletePromo, handleAddProductToPromo, handleRemoveProductFromPromo, handlePromoProductPriceChange, selectedTicket, setSelectedTicket, ticketReplyText, setTicketReplyText, selectedWarranty, setSelectedWarranty, selectedTradeIn, setSelectedTradeIn, offeredTradeInValuation, setOfferedTradeInValuation, isAddingProduct, setIsAddingProduct, newProduct, setNewProduct, orderSearch, setOrderSearch, productSearch, setProductSearch, selectedCategoryFilter, setSelectedCategoryFilter, inventorySort, setInventorySort, priceConfirmModal, setPriceConfirmModal, tempPriceInput, setTempPriceInput, detailedItem, setDetailedItem, productEditDraft, setProductEditDraft, productConfirmModal, setProductConfirmModal, textColor, getSoldThisMonth, formatVND, updateOrderStatus, toggleStock, updateProductPrice, handleManualPriceChange, handleAddProduct, handleReplyTicket, closeTicket, updateWarrantyStatus, submitTradeInValuation, handleInputBlurOrEnter, handleCloseDetailedModal, filteredOrders, filteredInventoryProducts, totalRevenue, pendingOrdersCount, outOfStockCount, activeTicketsCount } = props;

  return (

              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>Hỗ Trợ Kỹ Thuật (Hệ thống Ticket)</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="tickets-subgrid">

                  {/* Left Column: List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '500px', overflowY: 'auto', paddingRight: '4px' }}>
                    {tickets.map(ticket => (
                      <div
                        key={ticket.id}
                        onClick={() => setSelectedTicket(ticket)}
                        style={{
                          background: selectedTicket && selectedTicket.id === ticket.id ? 'rgba(0,123,255,0.06)' : 'rgba(255,255,255,0.01)',
                          border: `1px solid ${selectedTicket && selectedTicket.id === ticket.id ? 'var(--color-primary)' : 'rgba(255,255,255,0.04)'}`,
                          borderRadius: 'var(--rounded)',
                          padding: '14px',
                          cursor: 'pointer',
                          transition: 'var(--transition-smooth)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-primary-dim)' }}>#{ticket.id}</span>
                          <span className="status-badge" style={{
                            fontSize: '9px',
                            background: ticket.status === 'pending' ? 'rgba(255,76,76,0.15)' : ticket.status === 'replied' ? 'rgba(0,123,255,0.15)' : 'rgba(76,175,80,0.15)',
                            color: ticket.status === 'pending' ? '#ffb4ab' : ticket.status === 'replied' ? '#adc7ff' : '#81c784'
                          }}>
                            {ticket.status === 'pending' && 'Chờ phản hồi'}
                            {ticket.status === 'replied' && 'Đã phản hồi'}
                            {ticket.status === 'closed' && 'Đã đóng'}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '13px', fontWeight: '700', color: textColor, marginBottom: '4px' }}>{ticket.subject}</h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--color-outline)' }}>
                          <span>Khách: {ticket.customerName}</span>
                          <span>Độ khẩn: <strong style={{ color: ticket.urgency === 'Gấp' ? '#ffb4ab' : 'var(--color-outline)' }}>{ticket.urgency}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column: Chat Box Details */}
                  <div className="glass-panel" style={{ borderRadius: 'var(--rounded)', padding: '16px', display: 'flex', flexDirection: 'column', height: '500px', background: theme === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(5, 13, 24, 0.15)', border: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : 'none' }}>
                    {selectedTicket ? (
                      <>
                        {/* Box Header */}
                        <div style={{ borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <h4 style={{ fontSize: '13px', fontWeight: '800', color: textColor }}>#{selectedTicket.id} - {selectedTicket.subject}</h4>
                            <span style={{ fontSize: '10px', color: 'var(--color-outline)' }}>Danh mục: {selectedTicket.category}</span>
                          </div>
                          {selectedTicket.status !== 'closed' && (
                            <button onClick={() => closeTicket(selectedTicket.id)} className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '10px', color: 'var(--color-error)', borderColor: 'rgba(255,76,76,0.2)' }}>
                              Đóng Ticket
                            </button>
                          )}
                        </div>

                        {/* Messages Queue */}
                        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '4px', marginBottom: '12px' }}>
                          {selectedTicket.messages.map((msg, index) => {
                            const isAgent = msg.sender === 'agent';
                            return (
                              <div
                                key={index}
                                style={{
                                  alignSelf: isAgent ? 'flex-end' : 'flex-start',
                                  maxWidth: '85%',
                                  background: isAgent ? 'rgba(0, 123, 255, 0.1)' : (theme === 'light' ? '#f1f5f9' : 'rgba(255,255,255,0.03)'),
                                  border: `1px solid ${isAgent ? 'rgba(0,123,255,0.2)' : (theme === 'light' ? '#e2e8f0' : 'rgba(255,255,255,0.05)')}`,
                                  borderRadius: isAgent ? '10px 0 10px 10px' : '0 10px 10px 10px',
                                  padding: '10px 12px'
                                }}
                              >
                                <span style={{ fontSize: '9px', fontWeight: '700', display: 'block', color: isAgent ? 'var(--color-primary-dim)' : 'var(--color-secondary-dim)', marginBottom: '2px' }}>
                                  {isAgent ? (msg.agentName || 'Kỹ thuật viên') : selectedTicket.customerName}
                                </span>
                                <p style={{ fontSize: '12px', color: textColor, lineHeight: '1.4' }}>{msg.text}</p>
                                <span style={{ fontSize: '9px', color: 'var(--color-outline)', display: 'block', textAlign: 'right', marginTop: '4px' }}>{msg.time}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Reply Form */}
                        {selectedTicket.status !== 'closed' ? (
                          <form onSubmit={handleReplyTicket} style={{ display: 'flex', gap: '8px' }}>
                            <input
                              type="text"
                              placeholder="Nhập nội dung phản hồi cho khách..."
                              value={ticketReplyText}
                              onChange={(e) => setTicketReplyText(e.target.value)}
                              className="form-input"
                              style={{ fontSize: '12px', padding: '8px 12px' }}
                            />
                            <button type="submit" className="btn btn-primary" style={{ padding: '8px 14px' }}>
                              Gửi
                            </button>
                          </form>
                        ) : (
                          <div style={{ textAlign: 'center', padding: '10px', color: 'var(--color-outline)', fontSize: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                            Ticket này đã được giải quyết và đóng lại.
                          </div>
                        )}
                      </>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-outline)', gap: '12px' }}>
                        <MessageSquare size={36} strokeWidth={1} />
                        <p style={{ fontSize: '13px' }}>Chọn một ticket từ danh sách để xem chi tiết và phản hồi khách hàng.</p>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            );
}

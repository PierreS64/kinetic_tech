import React from 'react';
import { TrendingUp, ShoppingBag, Package, MessageSquare, Shield, Search, Plus, Trash2, CheckCircle2, XCircle, AlertCircle, ArrowRight, DollarSign, Wrench, RefreshCw, FileText, ChevronRight, Filter, Check, X, Edit2, Tag } from 'lucide-react';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../../contexts/AppContext';

export default function OverviewTab(props) {
  const { theme, storeProducts, setStoreProducts, setOrders } = useAppContext();
  const { orders, tickets, warranties, tradeins, feedbacks, setTickets, setWarranties, setTradeins, setFeedbacks, selectedOrder, setSelectedOrder, promotions, setPromotions, isAddingPromo, setIsAddingPromo, newPromo, setNewPromo, selectedPromoForEdit, setSelectedPromoForEdit, productToAddToPromo, setProductToAddToPromo, handleAddPromo, handleDeletePromo, handleAddProductToPromo, handleRemoveProductFromPromo, handlePromoProductPriceChange, selectedTicket, setSelectedTicket, ticketReplyText, setTicketReplyText, selectedWarranty, setSelectedWarranty, selectedTradeIn, setSelectedTradeIn, offeredTradeInValuation, setOfferedTradeInValuation, isAddingProduct, setIsAddingProduct, newProduct, setNewProduct, orderSearch, setOrderSearch, productSearch, setProductSearch, selectedCategoryFilter, setSelectedCategoryFilter, inventorySort, setInventorySort, priceConfirmModal, setPriceConfirmModal, tempPriceInput, setTempPriceInput, detailedItem, setDetailedItem, productEditDraft, setProductEditDraft, productConfirmModal, setProductConfirmModal, textColor, getSoldThisMonth, formatVND, updateOrderStatus, toggleStock, updateProductPrice, handleManualPriceChange, handleAddProduct, handleReplyTicket, closeTicket, updateWarrantyStatus, submitTradeInValuation, handleInputBlurOrEnter, handleCloseDetailedModal, filteredOrders, filteredInventoryProducts, totalRevenue, pendingOrdersCount, outOfStockCount, activeTicketsCount } = props;

  // Calculate revenue for the last 7 days
  const last7DaysData = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const localDate = new Date(d.getTime() - (d.getTimezoneOffset() * 60000));
    const rawDateStr = localDate.toISOString().split('T')[0];
    
    const dailyRevenue = orders
      .filter(o => o.status === 'DELIVERED' && o.rawDate === rawDateStr)
      .reduce((sum, o) => sum + o.total, 0);

    return {
      date: `${d.getDate()}/${d.getMonth() + 1}`,
      revenue: dailyRevenue,
      fullDate: rawDateStr
    };
  });

  const formatYAxis = (value) => {
    if (value === 0) return '0';
    if (value >= 1000000) return `${value / 1000000}M`;
    if (value >= 1000) return `${value / 1000}k`;
    return value;
  };

  return (

              <div  style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }} className="glass-panel">
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px' }}>
                  Tổng Quan Hoạt Động Gần Đây
                </h3>

                {/* Revenue Chart Section */}
                <div style={{ marginBottom: '30px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <TrendingUp size={14} color="var(--color-primary-dim)" />
                    Biểu đồ doanh thu 7 ngày qua
                  </h4>
                  <div style={{ height: '250px', width: '100%', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 'var(--rounded)', padding: '16px 16px 0 0' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={last7DaysData}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#007bff" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#007bff" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" stroke="var(--color-on-surface-variant)" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="var(--color-on-surface-variant)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={formatYAxis} />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-outline)', borderRadius: 'var(--rounded)', fontSize: '12px' }}
                          formatter={(value) => [formatVND(value), 'Doanh thu']}
                          labelStyle={{ color: 'var(--color-primary-dim)', fontWeight: '700', marginBottom: '5px' }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#007bff" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '20px' }}   className="grid-responsive-2col overview-subgrid">

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
                            <span  style={{
                              fontSize: '9px',
                              background: order.status === 'DELIVERED' ? 'rgba(76,175,80,0.15)' : order.status === 'PENDING' ? 'rgba(253,139,0,0.15)' : 'rgba(0,123,255,0.15)',
                              color: order.status === 'DELIVERED' ? '#81c784' : order.status === 'PENDING' ? '#ffb77d' : '#adc7ff',
                              padding: '2px 6px'
                            }} className="status-badge">
                              {order.status === 'DELIVERED' ? 'Đã Giao' : order.status === 'PENDING' ? 'Chờ duyệt' : 'Đang xử lý'}
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
                            <span  style={{
                              fontSize: '9px',
                              background: ticket.status === 'OPEN' ? 'rgba(255,76,76,0.15)' : 'rgba(76,175,80,0.15)',
                              color: ticket.status === 'OPEN' ? '#ffb4ab' : '#81c784',
                              padding: '1px 6px'
                            }} className="status-badge">
                              {ticket.status === 'OPEN' ? 'Chờ trả lời' : 'Đã phản hồi'}
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


              </div>
            );
}

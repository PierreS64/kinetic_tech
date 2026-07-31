import React, { useState } from 'react';
import { TrendingUp, ShoppingBag, Package, MessageSquare, Shield, Search, Plus, Trash2, CheckCircle2, XCircle, AlertCircle, ArrowRight, DollarSign, Wrench, RefreshCw, FileText, ChevronRight, Filter, Check, X, Edit2, Tag } from 'lucide-react';

import { useAppContext } from '../../contexts/AppContext';

export default function PromotionsTab(props) {
  const { theme, orders, tickets, warranties, tradeins, feedbacks, storeProducts, setStoreProducts, setOrders } = useAppContext();
  const { setTickets, setWarranties, setTradeins, setFeedbacks, selectedOrder, setSelectedOrder, promotions, setPromotions, isAddingPromo, setIsAddingPromo, newPromo, setNewPromo, selectedPromoForEdit, setSelectedPromoForEdit, productToAddToPromo, setProductToAddToPromo, handleAddPromo, handleDeletePromo, handleAddProductToPromo, handleRemoveProductFromPromo, handleRemoveAllProductsFromPromo, handlePromoProductPriceChange, selectedTicket, setSelectedTicket, ticketReplyText, setTicketReplyText, selectedWarranty, setSelectedWarranty, selectedTradeIn, setSelectedTradeIn, offeredTradeInValuation, setOfferedTradeInValuation, isAddingProduct, setIsAddingProduct, newProduct, setNewProduct, orderSearch, setOrderSearch, productSearch, setProductSearch, selectedCategoryFilter, setSelectedCategoryFilter, inventorySort, setInventorySort, priceConfirmModal, setPriceConfirmModal, tempPriceInput, setTempPriceInput, detailedItem, setDetailedItem, productEditDraft, setProductEditDraft, productConfirmModal, setProductConfirmModal, textColor, getSoldThisMonth, formatVND, updateOrderStatus, toggleStock, updateProductPrice, handleManualPriceChange, handleAddProduct, handleReplyTicket, closeTicket, updateWarrantyStatus, submitTradeInValuation, handleInputBlurOrEnter, handleCloseDetailedModal, filteredOrders, filteredInventoryProducts, totalRevenue, pendingOrdersCount, outOfStockCount, activeTicketsCount } = props;

  const [promoSearchTerm, setPromoSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleApplyToAll = () => {
    const missingProducts = storeProducts.filter(p => !selectedPromoForEdit.productIds.includes(p.id));
    missingProducts.forEach(p => {
      handleAddProductToPromo(selectedPromoForEdit.id, p.id);
    });
  };

  return (

              <div  style={{ borderRadius: 'var(--rounded-lg)', padding: '24px', height: '620px', display: 'flex', flexDirection: 'column' }} className="glass-panel">
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Chương Trình Khuyến Mãi</h3>

                  <button
                    onClick={() => setIsAddingPromo(true)}
                    className="btn btn-secondary"
                    style={{ padding: '8px 14px', fontSize: '12px' }}
                  >
                    <Plus size={14} />
                    Thêm chương trình
                  </button>
                </div>

                {isAddingPromo && (
                  <div  className="modal-overlay" onClick={() => setIsAddingPromo(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1000 }}>
                    <div  className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '440px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden', zIndex: 1001, background: theme === 'light' ? '#ffffff' : undefined, border: theme === 'light' ? '1px solid #cbd5e1' : undefined }}>
                      <div style={{ padding: '16px 20px', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '800', color: textColor }}>Tạo khuyến mãi mới</h4>
                        <button onClick={() => setIsAddingPromo(false)} className="btn btn-ghost" style={{ padding: '4px', borderRadius: '50%' }}>
                          <X size={18} color={theme === 'light' ? '#334155' : 'white'} />
                        </button>
                      </div>

                      <form onSubmit={handleAddPromo} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Tên chương trình *</label>
                          <input
                            type="text"
                            required
                            placeholder="Siêu Sale Hè 2026..."
                            value={newPromo.name}
                            onChange={(e) => setNewPromo(prev => ({ ...prev, name: e.target.value }))}
                            className="form-input"
                            style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>% Giảm giá mặc định *</label>
                          <input
                            type="number"
                            required
                            min="0"
                            max="100"
                            placeholder="Ví dụ: 10"
                            value={newPromo.discountPercent}
                            onChange={(e) => setNewPromo(prev => ({ ...prev, discountPercent: e.target.value }))}
                            className="form-input"
                            style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                          />
                        </div>

                        <div style={{ display: 'grid', gap: '12px' }}  className="grid-responsive-2col">
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Ngày bắt đầu</label>
                            <input
                              type="date"
                              value={newPromo.startDate}
                              onChange={(e) => setNewPromo(prev => ({ ...prev, startDate: e.target.value }))}
                              className="form-input"
                              style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Ngày kết thúc</label>
                            <input
                              type="date"
                              value={newPromo.endDate}
                              onChange={(e) => setNewPromo(prev => ({ ...prev, endDate: e.target.value }))}
                              className="form-input"
                              style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                            />
                          </div>
                        </div>

                        <button type="submit"  style={{ width: '100%', padding: '10px', marginTop: '10px', fontWeight: '700' }} className="btn btn-secondary">
                          TẠO KHUYẾN MÃI
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                <div style={{ display: 'grid', gap: '24px', flex: 1, minHeight: 0 }}   className="grid-responsive-sidebar-wide promotions-grid">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%', overflowY: 'auto', paddingRight: '4px' }}>
                    <h4 style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-outline)', position: 'sticky', top: 0, background: theme === 'light' ? '#f8fafc' : 'rgba(15, 23, 42, 1)', zIndex: 1, paddingBottom: '8px' }}>Danh sách chương trình</h4>
                    {promotions.length === 0 ? (
                      <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-outline)', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '6px' }}>
                        Chưa có chương trình khuyến mãi nào.
                      </div>
                    ) : (
                      promotions.map(promo => (
                        <div
                          key={promo.id}
                          onClick={() => setSelectedPromoForEdit(promo)}
                          style={{
                            background: selectedPromoForEdit && selectedPromoForEdit.id === promo.id ? 'rgba(0,123,255,0.06)' : 'rgba(255,255,255,0.01)',
                            border: `1px solid ${selectedPromoForEdit && selectedPromoForEdit.id === promo.id ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)'}`,
                            borderRadius: 'var(--rounded)',
                            padding: '14px',
                            cursor: 'pointer',
                            position: 'relative'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--color-primary-dim)' }}>{promo.id}</span>
                            <span  style={{ fontSize: '9px', background: 'rgba(253,139,0,0.15)', color: '#ffb77d' }} className="status-badge">
                              Giảm {promo.discountPercent}%
                            </span>
                          </div>

                          <h5 style={{ fontSize: '13px', fontWeight: '800', color: textColor, marginBottom: '4px' }}>{promo.name}</h5>
                          <span style={{ fontSize: '11px', color: 'var(--color-outline)', display: 'block' }}>Hạn: {promo.startDate} đến {promo.endDate}</span>
                          <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', display: 'block', marginTop: '4px' }}>
                            Sản phẩm áp dụng: {promo.productIds.length} | Đã bán: {promo.salesCount}
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePromo(promo.id);
                            }}
                            className="btn btn-ghost"
                            style={{ position: 'absolute', right: '10px', bottom: '10px', padding: '6px', color: 'var(--color-error)' }}
                            title="Xóa chương trình"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  <div  style={{ borderRadius: 'var(--rounded)', padding: '18px', background: theme === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(5, 13, 24, 0.15)', border: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : 'none', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }} className="glass-panel">
                    {selectedPromoForEdit ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
                        <div style={{ borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.06)', paddingBottom: '14px', flexShrink: 0 }}>
                          <h4 style={{ fontSize: '16px', fontWeight: '800', color: textColor }}>{selectedPromoForEdit.name}</h4>
                          <span style={{ fontSize: '12px', color: 'var(--color-outline)' }}>Áp dụng từ: {selectedPromoForEdit.startDate} đến {selectedPromoForEdit.endDate}</span>

                          <div style={{ display: 'grid', gap: '14px', marginTop: '12px' }}  className="grid-responsive-2col">
                            <div style={{ background: theme === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '4px', border: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.04)' }}>
                              <span style={{ fontSize: '10px', color: 'var(--color-outline)', display: 'block', textTransform: 'uppercase', fontWeight: '700' }}>Số lượng đã bán</span>
                              <strong style={{ fontSize: '16px', fontWeight: '800', color: textColor, marginTop: '2px', display: 'block' }}>{selectedPromoForEdit.salesCount} sản phẩm</strong>
                            </div>
                            <div style={{ background: theme === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '4px', border: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.04)' }}>
                              <span style={{ fontSize: '10px', color: 'var(--color-outline)', display: 'block', textTransform: 'uppercase', fontWeight: '700' }}>Doanh số chương trình</span>
                              <strong style={{ fontSize: '16px', fontWeight: '800', color: 'var(--color-secondary-dim)', marginTop: '2px', display: 'block' }}>{formatVND(selectedPromoForEdit.revenue)}</strong>
                            </div>
                          </div>
                        </div>

                        <div style={{ flexShrink: 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <h5 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-primary-dim)', textTransform: 'uppercase' }}>Thêm sản phẩm vào chương trình</h5>
                            <button
                              onClick={handleApplyToAll}
                              style={{ padding: '4px 10px', fontSize: '11px', whiteSpace: 'nowrap' }}
                              className="btn btn-secondary">
                              Áp dụng cho tất cả
                            </button>
                          </div>
                          
                          <div style={{ position: 'relative' }}>
                            <div 
                              style={{ 
                                display: 'flex', alignItems: 'center', 
                                background: theme === 'light' ? '#ffffff' : 'rgba(255,255,255,0.02)', 
                                border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.1)', 
                                borderRadius: '4px',
                                padding: '8px 12px',
                                cursor: 'text'
                              }}
                              onClick={() => setIsDropdownOpen(true)}
                            >
                              <Search size={14} style={{ color: 'var(--color-outline)', marginRight: '8px' }} />
                              <input 
                                type="text"
                                placeholder="Tìm và chọn sản phẩm..."
                                value={promoSearchTerm}
                                onChange={(e) => {
                                  setPromoSearchTerm(e.target.value);
                                  setIsDropdownOpen(true);
                                }}
                                onFocus={() => setIsDropdownOpen(true)}
                                onBlur={() => {
                                  // delay to allow click on items
                                  setTimeout(() => setIsDropdownOpen(false), 200);
                                }}
                                style={{ 
                                  background: 'transparent', border: 'none', outline: 'none', 
                                  color: textColor, width: '100%', fontSize: '12px' 
                                }}
                              />
                              <ChevronRight size={14} style={{ color: 'var(--color-outline)', transform: isDropdownOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: '0.2s' }} />
                            </div>

                            {isDropdownOpen && (
                              <div style={{ 
                                position: 'absolute', top: '100%', left: 0, right: 0, 
                                background: theme === 'light' ? '#ffffff' : '#1e293b', 
                                border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.1)', 
                                borderRadius: '4px', 
                                marginTop: '4px', 
                                maxHeight: '200px', overflowY: 'auto', 
                                zIndex: 10,
                                boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                              }}>
                                {storeProducts
                                  .filter(p => !selectedPromoForEdit.productIds.includes(p.id))
                                  .filter(p => p.name.toLowerCase().includes(promoSearchTerm.toLowerCase()))
                                  .map(p => (
                                    <div 
                                      key={p.id}
                                      onMouseDown={() => {
                                        handleAddProductToPromo(selectedPromoForEdit.id, p.id);
                                        setPromoSearchTerm('');
                                        setIsDropdownOpen(false);
                                      }}
                                      style={{ 
                                        padding: '10px 12px', 
                                        fontSize: '12px', 
                                        color: textColor,
                                        cursor: 'pointer',
                                        borderBottom: theme === 'light' ? '1px solid #f1f5f9' : '1px solid rgba(255,255,255,0.05)',
                                      }}
                                      onMouseEnter={(e) => e.target.style.background = theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.05)'}
                                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                    >
                                      <span style={{ display: 'block', fontWeight: '600', marginBottom: '2px' }}>{p.name}</span>
                                      <span style={{ color: 'var(--color-primary-dim)', fontSize: '11px' }}>{formatVND(p.price)}</span>
                                    </div>
                                  ))}
                                {storeProducts.filter(p => !selectedPromoForEdit.productIds.includes(p.id) && p.name.toLowerCase().includes(promoSearchTerm.toLowerCase())).length === 0 && (
                                  <div style={{ padding: '12px', fontSize: '12px', color: 'var(--color-outline)', textAlign: 'center' }}>
                                    Không tìm thấy sản phẩm phù hợp.
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexShrink: 0 }}>
                            <h5 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-primary-dim)', textTransform: 'uppercase' }}>Danh sách sản phẩm áp dụng</h5>
                            {selectedPromoForEdit.productIds.length > 0 && (
                              <button
                                onClick={() => handleRemoveAllProductsFromPromo(selectedPromoForEdit.id)}
                                className="btn btn-outline"
                                style={{ padding: '4px 10px', fontSize: '11px', color: 'var(--color-error)', borderColor: 'var(--color-error)' }}
                              >
                                Xóa tất cả
                              </button>
                            )}
                          </div>
                          {selectedPromoForEdit.productIds.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '20px', color: 'var(--color-outline)', fontSize: '12px', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                              Chưa có sản phẩm nào thuộc chương trình này. Chọn sản phẩm ở trên để thêm.
                            </div>
                          ) : (
                            <div style={{ flex: 1, overflowY: 'auto' }}>
                              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}  className="zebra-table">
                                <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                                  <tr style={{ background: 'var(--color-surface-container-high)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                    <th style={{ padding: '8px 12px', fontWeight: '700', color: textColor }}>Sản phẩm</th>
                                    <th style={{ padding: '8px 12px', fontWeight: '700', color: textColor }}>Giá gốc (VND)</th>
                                    <th style={{ padding: '8px 12px', fontWeight: '700', color: textColor }}>Mức giảm</th>
                                    <th style={{ padding: '8px 12px', fontWeight: '700', color: textColor }}>Giá khuyến mãi</th>
                                    <th style={{ padding: '8px 12px', fontWeight: '700', textAlign: 'center', color: textColor }}>Thao Tác</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {storeProducts
                                    .filter(p => selectedPromoForEdit.productIds.includes(p.id))
                                    .map(p => {
                                      const promoPrice = Math.round(p.price * (1 - selectedPromoForEdit.discountPercent / 100));
                                      return (
                                        <tr key={p.id}>
                                          <td>
                                            <strong style={{ color: textColor, display: 'block' }}>{p.name}</strong>
                                            <span style={{ fontSize: '9px', color: 'var(--color-outline)' }}>ID: {p.id}</span>
                                          </td>
                                          <td style={{ fontWeight: '700', color: textColor, fontSize: '13px' }}>
                                            {formatVND(p.price)}
                                          </td>
                                          <td>
                                            <span style={{ color: '#ffb77d', fontWeight: '600' }}>-{selectedPromoForEdit.discountPercent}%</span>
                                          </td>
                                          <td style={{ fontWeight: '800', color: 'var(--color-secondary-dim)' }}>
                                            {formatVND(promoPrice)}
                                          </td>
                                          <td style={{ textAlign: 'center' }}>
                                            <button
                                              onClick={() => handleRemoveProductFromPromo(selectedPromoForEdit.id, p.id)}
                                              className="btn btn-ghost"
                                              style={{ padding: '4px', color: 'var(--color-error)' }}
                                              title="Xóa khỏi chương trình"
                                            >
                                              <Trash2 size={13} />
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-outline)', gap: '12px' }}>
                        <Tag size={36} strokeWidth={1} />
                        <p style={{ fontSize: '13px' }}>Chọn một chương trình từ danh sách để xem chi tiết hoặc quản lý sản phẩm.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
}

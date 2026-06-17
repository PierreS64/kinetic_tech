import React from 'react';
import { TrendingUp, ShoppingBag, Package, MessageSquare, Shield, Search, Plus, Trash2, CheckCircle2, XCircle, AlertCircle, ArrowRight, DollarSign, Wrench, RefreshCw, FileText, ChevronRight, Filter, Check, X, Edit2, Tag } from 'lucide-react';

export default function ProductsTab(props) {
  const { theme, orders, tickets, warranties, tradeins, feedbacks, storeProducts, setStoreProducts, setOrders, setTickets, setWarranties, setTradeins, setFeedbacks, selectedOrder, setSelectedOrder, promotions, setPromotions, isAddingPromo, setIsAddingPromo, newPromo, setNewPromo, selectedPromoForEdit, setSelectedPromoForEdit, productToAddToPromo, setProductToAddToPromo, handleAddPromo, handleDeletePromo, handleAddProductToPromo, handleRemoveProductFromPromo, handlePromoProductPriceChange, selectedTicket, setSelectedTicket, ticketReplyText, setTicketReplyText, selectedWarranty, setSelectedWarranty, selectedTradeIn, setSelectedTradeIn, offeredTradeInValuation, setOfferedTradeInValuation, isAddingProduct, setIsAddingProduct, newProduct, setNewProduct, orderSearch, setOrderSearch, productSearch, setProductSearch, selectedCategoryFilter, setSelectedCategoryFilter, inventorySort, setInventorySort, priceConfirmModal, setPriceConfirmModal, tempPriceInput, setTempPriceInput, detailedItem, setDetailedItem, productEditDraft, setProductEditDraft, productConfirmModal, setProductConfirmModal, textColor, getSoldThisMonth, formatVND, updateOrderStatus, toggleStock, updateProductPrice, handleManualPriceChange, handleAddProduct, handleReplyTicket, closeTicket, updateWarrantyStatus, submitTradeInValuation, handleInputBlurOrEnter, handleCloseDetailedModal, filteredOrders, filteredInventoryProducts, totalRevenue, pendingOrdersCount, outOfStockCount, activeTicketsCount } = props;

  return (

              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>

                {/* Header Controls */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Quản Lý Kho Sản Phẩm</h3>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                    {/* Sort Dropdown */}
                    <select
                      value={inventorySort}
                      onChange={(e) => setInventorySort(e.target.value)}
                      className="form-input"
                      style={{ width: '180px', fontSize: '12px', padding: '8px' }}
                    >
                      <option value="default">Sắp xếp: Mặc định</option>
                      <option value="sold-desc">Bán nhiều nhất</option>
                      <option value="sold-asc">Bán ít nhất</option>
                    </select>

                    {/* Category Filter */}
                    <select
                      value={selectedCategoryFilter}
                      onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                      className="form-input"
                      style={{ width: '150px', fontSize: '12px', padding: '8px' }}
                    >
                      <option value="all">Tất cả danh mục</option>
                      <option value="laptop">Laptop</option>
                      <option value="điện thoại">Điện thoại</option>
                      <option value="gaming gear">Gaming Gear</option>
                      <option value="linh kiện">Linh kiện</option>
                    </select>

                    {/* Search box */}
                    <div style={{ position: 'relative', width: '220px' }}>
                      <input
                        type="text"
                        placeholder="Tìm theo tên sản phẩm..."
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        className="form-input"
                        style={{ paddingLeft: '34px', fontSize: '12px', padding: '8px' }}
                      />
                      <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-outline)' }} />
                    </div>

                    {/* Add button */}
                    <button
                      onClick={() => setIsAddingProduct(true)}
                      className="btn btn-secondary"
                      style={{ padding: '8px 14px', fontSize: '12px' }}
                    >
                      <Plus size={14} />
                      Thêm sản phẩm
                    </button>
                  </div>
                </div>

                {/* Adding Product Form Overlay */}
                {isAddingProduct && (
                  <div className="modal-overlay" onClick={() => setIsAddingProduct(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1000 }}>
                    <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '560px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden', zIndex: 1001, background: theme === 'light' ? '#ffffff' : undefined, border: theme === 'light' ? '1px solid #cbd5e1' : undefined }}>
                      <div style={{ padding: '16px 20px', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: '800', color: textColor }}>Tạo sản phẩm mới</h4>
                        <button onClick={() => setIsAddingProduct(false)} className="btn btn-ghost" style={{ padding: '4px', borderRadius: '50%' }}>
                          <X size={18} color={theme === 'light' ? '#334155' : 'white'} />
                        </button>
                      </div>

                      <form onSubmit={handleAddProduct} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '75vh', overflowY: 'auto' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Tên Sản Phẩm *</label>
                          <input
                            type="text"
                            required
                            placeholder="Ví dụ: Laptop Asus ROG Strix..."
                            value={newProduct.name}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                            className="form-input"
                            style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Danh Mục *</label>
                            <select
                              value={newProduct.category}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                              className="form-input"
                              style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                            >
                              <option value="laptop">Laptop</option>
                              <option value="điện thoại">Điện thoại</option>
                              <option value="gaming gear">Gaming Gear</option>
                              <option value="linh kiện">Linh kiện</option>
                            </select>
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Tình Trạng Kho</label>
                            <select
                              value={newProduct.inStock ? 'true' : 'false'}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, inStock: e.target.value === 'true' }))}
                              className="form-input"
                              style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                            >
                              <option value="true">Còn hàng</option>
                              <option value="false">Hết hàng</option>
                            </select>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Giá Bán (VND) *</label>
                            <input
                              type="number"
                              required
                              placeholder="Ví dụ: 15900000"
                              value={newProduct.price}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                              className="form-input"
                              style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Giá Cũ (Gốc)</label>
                            <input
                              type="number"
                              placeholder="Ví dụ: 17900000"
                              value={newProduct.oldPrice}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, oldPrice: e.target.value }))}
                              className="form-input"
                              style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                            />
                          </div>
                        </div>

                        <div style={{ borderTop: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
                          <span style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--color-primary-dim)', marginBottom: '8px' }}>Thông số cấu hình kỹ thuật (Không bắt buộc)</span>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <input
                              type="text"
                              placeholder="CPU (ví dụ: Intel i7)"
                              value={newProduct.cpu}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, cpu: e.target.value }))}
                              className="form-input"
                              style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                            />
                            <input
                              type="text"
                              placeholder="RAM (ví dụ: 16GB)"
                              value={newProduct.ram}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, ram: e.target.value }))}
                              className="form-input"
                              style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                            />
                            <input
                              type="text"
                              placeholder="Ổ Cứng (ví dụ: 512GB SSD)"
                              value={newProduct.storage}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, storage: e.target.value }))}
                              className="form-input"
                              style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                            />
                            <input
                              type="text"
                              placeholder="VGA / GPU (ví dụ: RTX 4060)"
                              value={newProduct.gpu}
                              onChange={(e) => setNewProduct(prev => ({ ...prev, gpu: e.target.value }))}
                              className="form-input"
                              style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Mã Tags (cách nhau bằng dấu phẩy)</label>
                          <input
                            type="text"
                            placeholder="Ví dụ: Gaming, RTX4060, Intel"
                            value={newProduct.tags}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, tags: e.target.value }))}
                            className="form-input"
                            style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                          />
                        </div>

                        <button type="submit" className="btn btn-secondary" style={{ width: '100%', padding: '12px', fontWeight: '700', marginTop: '10px' }}>
                          HOÀN TẤT THÊM SẢN PHẨM
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* Product List Table */}
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }} className="zebra-table">
                    <thead>
                      <tr style={{ background: 'var(--color-surface-container-high)' }}>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: theme === 'light' ? '#0f172a' : 'white' }}>Ảnh</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: theme === 'light' ? '#0f172a' : 'white' }}>Tên Sản Phẩm</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: theme === 'light' ? '#0f172a' : 'white' }}>Danh Mục</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: theme === 'light' ? '#0f172a' : 'white' }}>Giá Hiện Tại</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', textAlign: 'center', color: theme === 'light' ? '#0f172a' : 'white' }}>Đã Bán Tháng Này</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: theme === 'light' ? '#0f172a' : 'white' }}>Tình Trạng Kho</th>
                        <th style={{ padding: '12px 10px', fontWeight: '700', textAlign: 'center', width: '80px', color: theme === 'light' ? '#0f172a' : 'white' }}>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInventoryProducts.length === 0 ? (
                        <tr>
                          <td colSpan="7" style={{ textAlign: 'center', color: 'var(--color-outline)', padding: '30px' }}>Không có sản phẩm nào.</td>
                        </tr>
                      ) : (
                        filteredInventoryProducts.map(prod => (
                          <tr key={prod.id} onClick={(e) => {
                            if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT' && !e.target.closest('button')) {
                              const item = { ...prod, type: 'product' };
                              setDetailedItem(item);
                              setProductEditDraft(JSON.parse(JSON.stringify(item)));
                            }
                          }} style={{ cursor: 'pointer' }}>
                            <td>
                              <img src={prod.image} alt={prod.name} style={{ width: '36px', height: '36px', borderRadius: '4px', objectFit: 'contain', background: 'rgba(255,255,255,0.04)' }} />
                            </td>
                            <td>
                              <strong style={{ color: theme === 'light' ? '#0f172a' : 'white', display: 'block', fontSize: '13px', lineHeight: '1.4' }}>{prod.name}</strong>
                              <span style={{ fontSize: '10px', color: 'var(--color-outline)' }}>ID: {prod.id}</span>
                            </td>
                            <td style={{ textTransform: 'capitalize', fontSize: '13px', color: theme === 'light' ? '#0f172a' : 'white' }}>{prod.category}</td>
                            <td style={{ fontWeight: '800', color: 'var(--color-secondary-dim)', fontSize: '14px' }}>
                              <input
                                type="text"
                                value={tempPriceInput[prod.id] !== undefined ? tempPriceInput[prod.id] : prod.price}
                                onChange={(e) => setTempPriceInput(prev => ({ ...prev, [prod.id]: e.target.value }))}
                                onFocus={() => setTempPriceInput(prev => ({ ...prev, [prod.id]: prod.price }))}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    const raw = tempPriceInput[prod.id];
                                    const numeric = parseInt(String(raw).replace(/\D/g, '')) || 0;
                                    if (numeric !== prod.price && numeric > 0) {
                                      setPriceConfirmModal({ prodId: prod.id, pendingPrice: numeric, originalPrice: prod.price, prodName: prod.name });
                                    }
                                    setTempPriceInput(prev => { const n = { ...prev }; delete n[prod.id]; return n; });
                                    e.target.blur();
                                  }
                                }}
                                onBlur={() => {
                                  const raw = tempPriceInput[prod.id];
                                  if (raw === undefined) return;
                                  const numeric = parseInt(String(raw).replace(/\D/g, '')) || 0;
                                  if (numeric !== prod.price && numeric > 0) {
                                    setPriceConfirmModal({ prodId: prod.id, pendingPrice: numeric, originalPrice: prod.price, prodName: prod.name });
                                  }
                                  setTempPriceInput(prev => { const n = { ...prev }; delete n[prod.id]; return n; });
                                }}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  borderBottom: '1px dashed var(--color-outline)',
                                  color: 'var(--color-secondary-dim)',
                                  fontWeight: '800',
                                  width: '110px',
                                  outline: 'none',
                                  fontSize: '13px'
                                }}
                              />
                            </td>
                            <td style={{ textAlign: 'center', fontWeight: '700', fontSize: '14px', color: theme === 'light' ? '#0f172a' : 'white' }}>
                              {getSoldThisMonth(prod.id)}
                            </td>
                            <td>
                              <button
                                onClick={(e) => { e.stopPropagation(); toggleStock(prod.id); }}
                                className="status-badge"
                                style={{
                                  border: theme === 'light' ? 'none' : '1px solid currentColor',
                                  cursor: 'pointer',
                                  fontSize: '10px',
                                  fontWeight: 'bold',
                                  background: prod.inStock ? (theme === 'light' ? '#4caf50' : 'rgba(76,175,80,0.15)') : (theme === 'light' ? '#f44336' : 'rgba(255,76,76,0.15)'),
                                  color: '#ffffff',
                                  padding: '4px 8px',
                                  borderRadius: '4px'
                                }}
                              >
                                {prod.inStock ? 'Còn hàng' : 'Hết hàng'}
                              </button>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                                <button
                                  onClick={(e) => { e.stopPropagation(); setStoreProducts(prev => prev.filter(p => p.id !== prod.id)); }}
                                  className="btn btn-ghost"
                                  style={{ padding: '5px 8px', fontSize: '10px', color: 'var(--color-error)' }}
                                  title="Xóa sản phẩm"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Price Confirm Modal */}
                {priceConfirmModal && (
                  <div className="modal-overlay" onClick={() => setPriceConfirmModal(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1000 }}>
                    <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '420px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden', zIndex: 1001, background: theme === 'light' ? '#ffffff' : undefined, border: theme === 'light' ? '1px solid #cbd5e1' : undefined }}>
                      <div style={{ padding: '16px 20px', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '800', color: theme === 'light' ? '#0f172a' : 'white' }}>Xác nhận thay đổi giá</h4>
                        <button onClick={() => setPriceConfirmModal(null)} className="btn btn-ghost" style={{ padding: '4px', borderRadius: '50%' }}>
                          <X size={18} color={theme === 'light' ? '#334155' : 'white'} />
                        </button>
                      </div>
                      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <p style={{ fontSize: '13px', color: theme === 'light' ? '#0f172a' : 'white', lineHeight: '1.6' }}>
                          Bạn muốn đổi giá sản phẩm <strong>{priceConfirmModal.prodName}</strong>?<br />
                          <span style={{ color: theme === 'light' ? '#475569' : 'var(--color-outline)' }}>Giá cũ:</span> <strong style={{ color: '#64748b' }}>{formatVND(priceConfirmModal.originalPrice)}</strong><br />
                          <span style={{ color: theme === 'light' ? '#475569' : 'var(--color-outline)' }}>Giá mới:</span> <strong style={{ color: '#fd8b00' }}>{formatVND(priceConfirmModal.pendingPrice)}</strong>
                        </p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                            className="btn btn-secondary"
                            style={{ flex: 1, padding: '10px', fontSize: '13px', fontWeight: '700' }}
                            onClick={() => {
                              setStoreProducts(prev => prev.map(p => p.id === priceConfirmModal.prodId ? { ...p, price: priceConfirmModal.pendingPrice } : p));
                              setPriceConfirmModal(null);
                            }}
                          >
                            Lưu
                          </button>
                          <button
                            className="btn btn-outline"
                            style={{ flex: 1, padding: '10px', fontSize: '13px' }}
                            onClick={() => setPriceConfirmModal(null)}
                          >
                            Hoàn tác
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            );
}

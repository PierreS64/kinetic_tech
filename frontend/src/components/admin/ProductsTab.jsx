import React from 'react';
import { TrendingUp, ShoppingBag, Package, MessageSquare, Shield, Search, Plus, Trash2, CheckCircle2, XCircle, AlertCircle, ArrowRight, DollarSign, Wrench, RefreshCw, FileText, ChevronRight, Filter, Check, X, Edit2, Tag } from 'lucide-react';

import { useAppContext } from '../../contexts/AppContext';

export default function ProductsTab(props) {
  const { theme, orders, tickets, warranties, tradeins, feedbacks, storeProducts, setStoreProducts, setOrders } = useAppContext();
  const { setTickets, setWarranties, setTradeins, setFeedbacks, selectedOrder, setSelectedOrder, promotions, setPromotions, isAddingPromo, setIsAddingPromo, newPromo, setNewPromo, selectedPromoForEdit, setSelectedPromoForEdit, productToAddToPromo, setProductToAddToPromo, handleAddPromo, handleDeletePromo, handleAddProductToPromo, handleRemoveProductFromPromo, handlePromoProductPriceChange, selectedTicket, setSelectedTicket, ticketReplyText, setTicketReplyText, selectedWarranty, setSelectedWarranty, selectedTradeIn, setSelectedTradeIn, offeredTradeInValuation, setOfferedTradeInValuation, isAddingProduct, setIsAddingProduct, newProduct, setNewProduct, orderSearch, setOrderSearch, productSearch, setProductSearch, selectedCategoryFilter, setSelectedCategoryFilter, inventorySort, setInventorySort, priceConfirmModal, setPriceConfirmModal, tempPriceInput, setTempPriceInput, detailedItem, setDetailedItem, productEditDraft, setProductEditDraft, productConfirmModal, setProductConfirmModal, textColor, getSoldThisMonth, formatVND, updateOrderStatus, toggleStock, updateProductPrice, handleManualPriceChange, handleAddProduct, handleDeleteProduct, handleReplyTicket, closeTicket, updateWarrantyStatus, submitTradeInValuation, handleInputBlurOrEnter, handleCloseDetailedModal, filteredOrders, filteredInventoryProducts, totalRevenue, pendingOrdersCount, outOfStockCount, activeTicketsCount } = props;

  return (

              <div  style={{ borderRadius: 'var(--rounded-lg)', padding: '24px', height: '620px', display: 'flex', flexDirection: 'column' }} className="glass-panel">

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
                        style={{ fontSize: '12px', padding: '8px', paddingLeft: '34px' }}
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



                {/* Product List Table */}
                <div style={{ flex: 1, overflowY: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}  className="zebra-table">
                    <thead style={{ position: 'sticky', top: 0, zIndex: 2, background: theme === 'light' ? '#ffffff' : '#1d2021', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      <tr>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: theme === 'light' ? '#0f172a' : 'white', width: '30%' }}>Tên Sản Phẩm</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: theme === 'light' ? '#0f172a' : 'white', width: '15%' }}>Danh Mục</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', color: theme === 'light' ? '#0f172a' : 'white', width: '15%' }}>Giá Hiện Tại</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', textAlign: 'center', color: theme === 'light' ? '#0f172a' : 'white', width: '15%' }}>Đã Bán Tháng Này</th>
                        <th style={{ padding: '12px 16px', fontWeight: '700', textAlign: 'center', color: theme === 'light' ? '#0f172a' : 'white', width: '15%' }}>Tình Trạng Kho</th>
                        <th style={{ padding: '12px 10px', fontWeight: '700', textAlign: 'center', width: '10%', color: theme === 'light' ? '#0f172a' : 'white' }}>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInventoryProducts.length === 0 ? (
                        <tr>
                          <td colSpan="6" style={{ textAlign: 'center', color: 'var(--color-outline)', padding: '30px' }}>Không có sản phẩm nào.</td>
                        </tr>
                      ) : (
                        filteredInventoryProducts.map(prod => (
                          <tr key={prod.id}>
                            <td style={{ padding: '16px', verticalAlign: 'middle' }}>
                              <strong style={{ color: theme === 'light' ? '#0f172a' : 'white', display: 'block', fontSize: '15px', lineHeight: '1.4', textAlign: 'left' }}>{prod.name}</strong>
                            </td>
                            <td style={{ textTransform: 'capitalize', fontSize: '13px', color: theme === 'light' ? '#0f172a' : 'white' }}>{prod.category}</td>
                            <td style={{ fontWeight: '800', color: 'var(--color-secondary-dim)', fontSize: '14px' }}>
                              {formatVND(prod.price)}
                            </td>
                            <td style={{ textAlign: 'center', fontWeight: '700', fontSize: '14px', color: theme === 'light' ? '#0f172a' : 'white' }}>
                              {getSoldThisMonth(prod.id)}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
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
                                <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-outline)' }}>
                                  Tồn kho: {prod.ProductVariant ? prod.ProductVariant.reduce((sum, v) => sum + (v.stockQuantity || 0), 0) : (prod.stock || 0)}
                                </span>
                              </div>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    let specs = {};
                                    try { if (prod.description && prod.description.startsWith('{')) specs = JSON.parse(prod.description); } catch(e) {}
                                    
                                    const item = { ...prod, type: 'product' };
                                    if (prod.ProductVariant && prod.ProductVariant.length > 0) {
                                      item.variants = prod.ProductVariant.map((v, idx) => ({
                                        id: v.id || Date.now() + idx,
                                        price: v.price?.toString() || '',
                                        stockQuantity: v.stockQuantity?.toString() || '',
                                        color: v.color || '',
                                        cpu: specs.cpu || '', ram: specs.ram || '', storage: specs.storage || '', gpu: specs.gpu || '',
                                        screen: specs.screen || '', soc: specs.soc || '', battery: specs.battery || '', gearType: specs.gearType || '',
                                        connectivity: specs.connectivity || '', switchType: specs.switchType || '', socket: specs.socket || '', wattage: specs.wattage || ''
                                      }));
                                    } else {
                                      item.variants = [{
                                        id: Date.now(), price: '', stockQuantity: '', color: '',
                                        cpu: specs.cpu || '', ram: specs.ram || '', storage: specs.storage || '', gpu: specs.gpu || '',
                                        screen: specs.screen || '', soc: specs.soc || '', battery: specs.battery || '', gearType: specs.gearType || '',
                                        connectivity: specs.connectivity || '', switchType: specs.switchType || '', socket: specs.socket || '', wattage: specs.wattage || ''
                                      }];
                                    }
                                    
                                    setDetailedItem(item);
                                    setProductEditDraft(JSON.parse(JSON.stringify(item)));
                                  }}
                                  className="btn btn-ghost"
                                  style={{ padding: '5px 8px', fontSize: '10px', color: 'var(--color-primary)' }}
                                  title="Chỉnh sửa sản phẩm"
                                >
                                  <Edit2 size={14} />
                                </button>
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleDeleteProduct(prod.id); }}
                                  className="btn btn-ghost"
                                  style={{ padding: '5px 8px', fontSize: '10px', color: 'var(--color-error)' }}
                                  title="Xóa sản phẩm"
                                >
                                  <Trash2 size={14} />
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
                  <div  className="modal-overlay" onClick={() => setPriceConfirmModal(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1000 }}>
                    <div  className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '420px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden', zIndex: 1001, background: theme === 'light' ? '#ffffff' : undefined, border: theme === 'light' ? '1px solid #cbd5e1' : undefined }}>
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
                            
                            style={{ flex: 1, padding: '10px', fontSize: '13px', fontWeight: '700' }}
                            className="btn btn-secondary" onClick={() => {
                              setStoreProducts(prev => prev.map(p => p.id === priceConfirmModal.prodId ? { ...p, price: priceConfirmModal.pendingPrice } : p));
                              setPriceConfirmModal(null);
                            }}
                          >
                            Lưu
                          </button>
                          <button
                            
                            style={{ flex: 1, padding: '10px', fontSize: '13px' }}
                            className="btn btn-outline" onClick={() => setPriceConfirmModal(null)}
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

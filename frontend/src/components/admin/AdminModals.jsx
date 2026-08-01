import React from 'react';
import { X, Check } from 'lucide-react';

import { useAppContext } from '../../contexts/AppContext';

export default function AdminModals(props) {
  const { theme, setStoreProducts } = useAppContext();
  const { isAddingProduct, setIsAddingProduct, newProduct, setNewProduct, handleAddProduct, detailedItem, setDetailedItem, handleCloseDetailedModal, textColor, productEditDraft, setProductEditDraft, handleInputBlurOrEnter, selectedOrder, setSelectedOrder, formatVND, updateOrderStatus, priceConfirmModal, setPriceConfirmModal, updateProductPrice, productConfirmModal, setProductConfirmModal, handleUpdateProduct } = props;

  const updateVariant = (index, field, value) => {
    setNewProduct(prev => {
      const newVariants = [...(prev.variants || [])];
      if (!newVariants[index]) return prev;
      newVariants[index] = { ...newVariants[index], [field]: value };
      return { ...prev, variants: newVariants };
    });
  };

  const addVariant = () => {
    setNewProduct(prev => ({
      ...prev,
      variants: [
        ...(prev.variants || []),
        { id: Date.now(), price: '', stockQuantity: '', color: '', cpu: '', ram: '', storage: '', gpu: '', screen: '', soc: '', battery: '', gearType: '', connectivity: '', switchType: '', socket: '', wattage: '' }
      ]
    }));
  };


  const updateEditVariant = (index, field, value) => {
    setProductEditDraft(prev => {
      const newVariants = [...(prev.variants || [])];
      newVariants[index] = { ...newVariants[index], [field]: value };
      return { ...prev, variants: newVariants };
    });
  };

  const addEditVariant = () => {
    setProductEditDraft(prev => ({
      ...prev,
      variants: [
        ...(prev.variants || []),
        { id: Date.now(), price: '', stockQuantity: '', color: '', cpu: '', ram: '', storage: '', gpu: '', screen: '', soc: '', battery: '', gearType: '', connectivity: '', switchType: '', socket: '', wattage: '' }
      ]
    }));
  };

  const removeEditVariant = (index) => {
    setProductEditDraft(prev => {
      if (!prev.variants || prev.variants.length <= 1) return prev;
      const newVariants = [...prev.variants];
      newVariants.splice(index, 1);
      return { ...prev, variants: newVariants };
    });
  };

  const removeVariant = (index) => {
    setNewProduct(prev => {
      if (!prev.variants || prev.variants.length <= 1) return prev;
      const newVariants = [...prev.variants];
      newVariants.splice(index, 1);
      return { ...prev, variants: newVariants };
    });
  };

  return (
    <>
      {/* Adding Product Form Overlay */}
      {isAddingProduct && (
        <div  className="modal-overlay" onClick={() => setIsAddingProduct(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div  className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '560px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden', zIndex: 1001, background: theme === 'light' ? '#ffffff' : undefined, border: theme === 'light' ? '1px solid #cbd5e1' : undefined }}>
            <div style={{ padding: '16px 20px', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '800', color: textColor }}>Tạo sản phẩm mới</h4>
              <button onClick={() => setIsAddingProduct(false)} className="btn btn-ghost" style={{ padding: '4px', borderRadius: '50%' }}>
                <X size={18} color={theme === 'light' ? '#334155' : 'white'} />
              </button>
            </div>

            <form onSubmit={handleAddProduct} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '75vh', overflowY: 'auto' }}>
              {/* CATEGORY BUTTONS */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '8px' }}>CHỌN DANH MỤC *</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['laptop', 'điện thoại', 'gaming gear', 'linh kiện'].map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewProduct(prev => ({ ...prev, category: cat, componentType: cat === 'linh kiện' ? 'CPU' : undefined }))}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: newProduct.category === cat ? 'none' : (theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.2)'),
                        background: newProduct.category === cat ? 'var(--color-primary)' : 'transparent',
                        color: newProduct.category === cat ? 'white' : textColor,
                        fontWeight: newProduct.category === cat ? 'bold' : 'normal',
                        cursor: 'pointer',
                        textTransform: 'capitalize'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* COMPONENT TYPE BUTTONS (IF LINH KIỆN) */}
              {newProduct.category === 'linh kiện' && (
                <div style={{ marginTop: '-4px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '8px' }}>LOẠI LINH KIỆN *</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['CPU', 'Mainboard', 'VGA', 'RAM', 'Nguồn', 'Vỏ Case', 'Tản Nhiệt', 'Ổ Cứng'].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setNewProduct(prev => ({ ...prev, componentType: type }))}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: newProduct.componentType === type ? '1px solid var(--color-primary)' : (theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.2)'),
                          background: newProduct.componentType === type ? 'rgba(0,123,255,0.1)' : 'transparent',
                          color: newProduct.componentType === type ? 'var(--color-primary)' : textColor,
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* COMMON BASIC INFO */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Tên Sản Phẩm *</label>
                <input
                  type="text"
                  required
                  placeholder="Nhập tên sản phẩm..."
                  value={newProduct.name || ''}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                  className="form-input"
                  style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                />
              </div>


              {/* VARIANTS SECTION */}
              <div style={{ borderTop: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                <span style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: textColor, marginBottom: '16px' }}>
                  Các biến thể sản phẩm
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {(newProduct.variants || []).map((variant, index) => (
                    <div key={variant.id || index} style={{ border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.1)', padding: '16px', borderRadius: '8px', position: 'relative', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)' }}>
                      <h5 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-primary-dim)', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        Biến thể {index + 1}
                        {newProduct.variants.length > 1 && (
                          <button type="button" onClick={() => removeVariant(index)} className="btn btn-ghost" style={{ color: 'var(--color-error)' }}>
                            <X size={14} /> Xóa
                          </button>
                        )}
                      </h5>

                      <div style={{ display: 'grid', gap: '10px' }} className="grid-responsive-2col">
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Giá Bán (VND) *</label>
                          <input type="number" required placeholder="Ví dụ: 15900000" value={variant.price || ''} onChange={(e) => updateVariant(index, 'price', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Tồn kho *</label>
                          <input type="number" required placeholder="Ví dụ: 100" value={variant.stockQuantity || ''} onChange={(e) => updateVariant(index, 'stockQuantity', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Màu sắc (nếu có)</label>
                          <input type="text" placeholder="Ví dụ: Space Gray" value={variant.color || ''} onChange={(e) => updateVariant(index, 'color', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                        </div>
                      </div>

                      {/* SPECIFIC FIELDS PER CATEGORY INSIDE VARIANT */}
                      <div style={{ marginTop: '12px' }}>
                        <span style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '8px', textTransform: 'uppercase' }}>Thông số kỹ thuật ({newProduct.category === 'linh kiện' ? newProduct.componentType : newProduct.category})</span>
                        <div style={{ display: 'grid', gap: '10px' }} className="grid-responsive-2col">
                          {/* LAPTOP */}
                          {newProduct.category === 'laptop' && (
                            <>
                              <input type="text" placeholder="CPU (ví dụ: Intel i7)" value={variant.cpu || ''} onChange={(e) => updateVariant(index, 'cpu', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                              <input type="text" placeholder="RAM (ví dụ: 16GB)" value={variant.ram || ''} onChange={(e) => updateVariant(index, 'ram', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                              <input type="text" placeholder="Ổ Cứng (ví dụ: 512GB SSD)" value={variant.storage || ''} onChange={(e) => updateVariant(index, 'storage', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                              <input type="text" placeholder="VGA / GPU (ví dụ: RTX 4060)" value={variant.gpu || ''} onChange={(e) => updateVariant(index, 'gpu', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                            </>
                          )}

                          {/* ĐIỆN THOẠI */}
                          {newProduct.category === 'điện thoại' && (
                            <>
                              <input type="text" placeholder="Màn hình (ví dụ: 6.1 inch OLED)" value={variant.screen || ''} onChange={(e) => updateVariant(index, 'screen', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                              <input type="text" placeholder="SoC / CPU (ví dụ: Snapdragon 8 Gen 2)" value={variant.soc || ''} onChange={(e) => updateVariant(index, 'soc', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                              <input type="text" placeholder="RAM (ví dụ: 8GB)" value={variant.ram || ''} onChange={(e) => updateVariant(index, 'ram', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                              <input type="text" placeholder="Bộ nhớ (ví dụ: 256GB)" value={variant.storage || ''} onChange={(e) => updateVariant(index, 'storage', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                              <input type="text" placeholder="Pin (ví dụ: 5000 mAh)" value={variant.battery || ''} onChange={(e) => updateVariant(index, 'battery', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                            </>
                          )}

                          {/* GAMING GEAR */}
                          {newProduct.category === 'gaming gear' && (
                            <>
                              <input type="text" placeholder="Loại (Chuột, Bàn phím...)" value={variant.gearType || ''} onChange={(e) => updateVariant(index, 'gearType', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                              <input type="text" placeholder="Kết nối (Có dây, Không dây...)" value={variant.connectivity || ''} onChange={(e) => updateVariant(index, 'connectivity', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                              <input type="text" placeholder="Switch (ví dụ: Red Switch)" value={variant.switchType || ''} onChange={(e) => updateVariant(index, 'switchType', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                            </>
                          )}

                          {/* LINH KIỆN */}
                          {newProduct.category === 'linh kiện' && (
                            <>
                              {newProduct.componentType === 'CPU' && (
                                <>
                                  <input type="text" placeholder="Socket (ví dụ: LGA 1700)" value={variant.socket || ''} onChange={(e) => updateVariant(index, 'socket', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                                  <input type="text" placeholder="Chipset hỗ trợ" value={variant.chipset || ''} onChange={(e) => updateVariant(index, 'chipset', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                                </>
                              )}
                              {newProduct.componentType === 'Mainboard' && (
                                <>
                                  <input type="text" placeholder="Socket (ví dụ: AM5)" value={variant.socket || ''} onChange={(e) => updateVariant(index, 'socket', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                                  <input type="text" placeholder="Chipset (ví dụ: X670E)" value={variant.chipset || ''} onChange={(e) => updateVariant(index, 'chipset', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                                  <input type="text" placeholder="Form Factor (ví dụ: ATX)" value={variant.formFactor || ''} onChange={(e) => updateVariant(index, 'formFactor', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                                </>
                              )}
                              {newProduct.componentType === 'VGA' && (
                                <>
                                  <input type="text" placeholder="Chiều dài (ví dụ: 300mm)" value={variant.length || ''} onChange={(e) => updateVariant(index, 'length', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                                  <input type="text" placeholder="Nguồn (ví dụ: 1x 8-pin)" value={variant.powerPin || ''} onChange={(e) => updateVariant(index, 'powerPin', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                                </>
                              )}
                              {newProduct.componentType === 'RAM' && (
                                <>
                                  <input type="text" placeholder="Dung lượng (ví dụ: 16GB)" value={variant.capacity || ''} onChange={(e) => updateVariant(index, 'capacity', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                                  <input type="text" placeholder="Loại RAM (ví dụ: DDR5)" value={variant.ramType || ''} onChange={(e) => updateVariant(index, 'ramType', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                                  <input type="text" placeholder="Bus (ví dụ: 6000MHz)" value={variant.bus || ''} onChange={(e) => updateVariant(index, 'bus', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                                </>
                              )}
                              {newProduct.componentType === 'Nguồn' && (
                                <>
                                  <input type="text" placeholder="Công suất (ví dụ: 750W)" value={variant.wattage || ''} onChange={(e) => updateVariant(index, 'wattage', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                                  <input type="text" placeholder="Chuẩn (ví dụ: 80 Plus Gold)" value={variant.efficiency || ''} onChange={(e) => updateVariant(index, 'efficiency', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                                </>
                              )}
                              {newProduct.componentType === 'Vỏ Case' && (
                                <>
                                  <input type="text" placeholder="Form Factor (ví dụ: Mid Tower)" value={variant.formFactor || ''} onChange={(e) => updateVariant(index, 'formFactor', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                                  <input type="text" placeholder="VGA hỗ trợ tối đa (ví dụ: 350mm)" value={variant.maxGpuLength || ''} onChange={(e) => updateVariant(index, 'maxGpuLength', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                                </>
                              )}
                              {newProduct.componentType === 'Tản Nhiệt' && (
                                <>
                                  <input type="text" placeholder="Chiều cao tản (Khí) / Kích thước (Nước)" value={variant.coolerSize || ''} onChange={(e) => updateVariant(index, 'coolerSize', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                                </>
                              )}
                              {newProduct.componentType === 'Ổ Cứng' && (
                                <>
                                  <input type="text" placeholder="Dung lượng (ví dụ: 1TB)" value={variant.capacity || ''} onChange={(e) => updateVariant(index, 'capacity', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                                  <input type="text" placeholder="Form Factor (ví dụ: M.2 NVMe)" value={variant.storageFormFactor || ''} onChange={(e) => updateVariant(index, 'storageFormFactor', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button type="button" onClick={addVariant} className="btn btn-ghost" style={{ alignSelf: 'flex-start', color: 'var(--color-primary-dim)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>+</span> Thêm biến thể
                  </button>
                </div>
              </div>

              {/* COMMON FIELDS (Tags, Image) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Mã Tags (cách nhau bằng dấu phẩy)</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Gaming, RTX4060, Intel"
                    value={newProduct.tags || ''}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, tags: e.target.value }))}
                    className="form-input"
                    style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Hình ảnh sản phẩm *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewProduct(prev => ({ ...prev, file: e.target.files[0] }))}
                    className="form-input"
                    style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                  />
                </div>
              </div>

              {/* SUBMIT BUTTONS */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button type="button" onClick={(e) => handleAddProduct(e, false)} style={{ flex: 1, padding: '12px', fontWeight: '700' }} className="btn btn-secondary">
                  LƯU VÀ ĐÓNG
                </button>
                <button type="button" onClick={(e) => handleAddProduct(e, true)} style={{ flex: 1, padding: '12px', fontWeight: '700' }} className="btn btn-primary">
                  LƯU VÀ THÊM MỚI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {detailedItem && (
        <div  onClick={handleCloseDetailedModal} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1000 }} className="modal-overlay">
          <div  className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '600px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden', zIndex: 1001, background: theme === 'light' ? '#ffffff' : undefined, border: theme === 'light' ? '1px solid #cbd5e1' : undefined }}>

            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '800', color: textColor }}>
                {detailedItem.type === 'product' && `Chỉnh sửa sản phẩm: ${detailedItem.name} (${detailedItem.id})`}
                {detailedItem.type === 'warranty' && `Chi tiết yêu cầu bảo hành ${detailedItem.id}`}
                {detailedItem.type === 'tradein' && `Chi tiết yêu cầu Trade-in ${detailedItem.id}`}
                {detailedItem.type === 'feedback' && `Ý kiến đóng góp ${detailedItem.id}`}
              </h4>
              <button onClick={handleCloseDetailedModal}  style={{ padding: '4px', borderRadius: '50%' }} className="btn btn-ghost">
                <X size={18} color={theme === 'light' ? '#334155' : 'white'} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '20px', maxHeight: '70vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* 1. WARRANTY DETAILED VIEW */}
              {detailedItem.type === 'warranty' && (
                <>
                  <div style={{ display: 'grid', gap: '12px' }}  className="grid-responsive-2col">
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Khách hàng:</span>
                      <strong style={{ display: 'block', color: textColor }}>{detailedItem.customerName}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Số điện thoại:</span>
                      <strong style={{ display: 'block', color: textColor }}>{detailedItem.phone}</strong>
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Sản phẩm bảo hành:</span>
                    <strong style={{ display: 'block', color: textColor }}>{detailedItem.productName}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Serial Number: {detailedItem.serialNumber}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Mô tả lỗi:</span>
                    <p style={{ fontSize: '13px', color: textColor, background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '4px', border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.05)', marginTop: '4px', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                      {detailedItem.issue}
                    </p>
                  </div>
                  <div style={{ display: 'grid', gap: '12px' }}  className="grid-responsive-2col">
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Ngày tạo yêu cầu:</span>
                      <strong style={{ display: 'block', color: textColor }}>{detailedItem.dateCreated}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Trạng thái hiện tại:</span>
                      <span  style={{
                        display: 'inline-block',
                        marginTop: '4px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        background:
                          detailedItem.status === 'returned' ? (theme === 'light' ? '#4caf50' : 'rgba(76,175,80,0.15)') :
                            detailedItem.status === 'checking' ? (theme === 'light' ? '#ff9800' : 'rgba(253,139,0,0.15)') : (theme === 'light' ? '#2196f3' : 'rgba(0,123,255,0.15)'),
                        color: '#ffffff',
                        padding: '4px 8px',
                        borderRadius: '4px'
                      }} className="status-badge">
                        {detailedItem.status === 'checking' && 'Đang kiểm tra'}
                        {detailedItem.status === 'repairing' && 'Đang sửa chữa'}
                        {detailedItem.status === 'returned' && 'Đã trả máy'}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* 2. TRADE-IN DETAILED VIEW */}
              {detailedItem.type === 'tradein' && (
                <>
                  <div style={{ display: 'grid', gap: '12px' }}  className="grid-responsive-2col">
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Khách hàng:</span>
                      <strong style={{ display: 'block', color: textColor }}>{detailedItem.customerName}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Số điện thoại:</span>
                      <strong style={{ display: 'block', color: textColor }}>{detailedItem.phone}</strong>
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Thiết bị cũ thu mua:</span>
                    <strong style={{ display: 'block', color: textColor }}>{detailedItem.oldDevice}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Sản phẩm muốn lên đời:</span>
                    <strong style={{ display: 'block', color: 'var(--color-primary-dim)' }}>{detailedItem.targetDevice}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Tình trạng thiết bị chi tiết:</span>
                    <p style={{ fontSize: '13px', color: textColor, background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '4px', border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.05)', marginTop: '4px', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                      {detailedItem.conditionDesc?.replace(/\. Mô tả:/g, '\nMô tả:').replace(/\. Nâng cấp lên:/g, '\nNâng cấp lên:').replace(/\. Lịch hẹn:/g, '\nLịch hẹn:')}
                    </p>
                  </div>
                  <div style={{ display: 'grid', gap: '12px' }}  className="grid-responsive-2col">
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Mức giá tự định giá:</span>
                      <strong style={{ display: 'block', color: 'var(--color-secondary-dim)', fontSize: '15px' }}>{detailedItem.selfValuation > 0 ? formatVND(detailedItem.selfValuation) : 'N/A'}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Giá Kinetic đề nghị:</span>
                      <strong style={{ display: 'block', color: 'var(--color-primary-dim)', fontSize: '15px' }}>{detailedItem.offeredPrice > 0 ? formatVND(detailedItem.offeredPrice) : 'Chờ thẩm định'}</strong>
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Trạng thái:</span>
                    <span  style={{
                      display: 'inline-block',
                      marginTop: '4px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      background:
                        detailedItem.status === 'completed' ? (theme === 'light' ? '#4caf50' : 'rgba(76,175,80,0.15)') :
                          detailedItem.status === 'valued' ? (theme === 'light' ? '#2196f3' : 'rgba(0,123,255,0.15)') : (theme === 'light' ? '#ff9800' : 'rgba(253,139,0,0.15)'),
                      color: '#ffffff',
                      padding: '4px 8px',
                      borderRadius: '4px'
                    }} className="status-badge">
                      {detailedItem.status === 'pending' && 'Chờ thẩm định'}
                      {detailedItem.status === 'valued' && 'Đã báo giá'}
                      {detailedItem.status === 'completed' && 'Hoàn thành đổi'}
                    </span>
                  </div>
                </>
              )}

              {/* 3. FEEDBACK DETAILED VIEW */}
              {detailedItem.type === 'feedback' && (
                <>
                  <div style={{ display: 'grid', gap: '12px' }}  className="grid-responsive-2col">
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Khách hàng:</span>
                      <strong style={{ display: 'block', color: textColor }}>{detailedItem.fullName}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Email liên hệ:</span>
                      <strong style={{ display: 'block', color: textColor }}>{detailedItem.email}</strong>
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Tiêu đề góp ý:</span>
                    <strong style={{ display: 'block', color: textColor, fontSize: '14px' }}>{detailedItem.title}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Nội dung góp ý chi tiết:</span>
                    <p style={{ fontSize: '13px', color: textColor, background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '4px', border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.05)', marginTop: '4px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                      {detailedItem.content}
                    </p>
                  </div>
                  <div style={{ display: 'grid', gap: '12px' }}  className="grid-responsive-2col">
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Thời gian gửi:</span>
                      <strong style={{ display: 'block', color: textColor }}>{detailedItem.date}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Trạng thái:</span>
                      <span  style={{
                        display: 'inline-block',
                        marginTop: '4px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        background: detailedItem.status === 'processed' ? (theme === 'light' ? '#4caf50' : 'rgba(76,175,80,0.15)') : (theme === 'light' ? '#ff9800' : 'rgba(253,139,0,0.15)'),
                        color: '#ffffff',
                        padding: '4px 8px',
                        borderRadius: '4px'
                      }} className="status-badge">
                        {detailedItem.status === 'processed' ? 'Đã xử lý' : 'Chờ xử lý'}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* 4. PRODUCT EDIT FORM VIEW */}
              {detailedItem.type === 'product' && productEditDraft && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Tên Sản Phẩm *</label>
                    <input
                      type="text"
                      value={productEditDraft.name || ''}
                      onChange={(e) => setProductEditDraft(prev => ({ ...prev, name: e.target.value }))}
                      className="form-input"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.1)',
                        background: theme === 'light' ? '#ffffff' : 'rgba(255, 255, 255, 0.02)',
                        color: textColor,
                        fontSize: '13px',
                        outline: 'none'
                      }}
                    />
                  </div>

                                    <div style={{ display: 'grid', gap: '12px' }}  className="grid-responsive-2col">
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Danh Mục *</label>
                      <select
                        value={productEditDraft.category || ''}
                        onChange={(e) => setProductEditDraft(prev => ({ ...prev, category: e.target.value }))}
                        className="form-input"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255, 255, 255, 0.1)',
                          background: theme === 'light' ? '#ffffff' : 'rgba(255, 255, 255, 0.02)',
                          color: textColor,
                          fontSize: '13px',
                          outline: 'none'
                        }}
                      >
                        <option value="laptop">Laptop</option>
                        <option value="điện thoại">Điện thoại</option>
                        <option value="gaming gear">Gaming Gear</option>
                        <option value="linh kiện">Linh kiện</option>
                      </select>
                    </div>
                  </div>

              {/* COMPONENT TYPE BUTTONS (IF LINH KIỆN) */}
              {productEditDraft.category === 'linh kiện' && (
                <div style={{ marginTop: '8px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '8px' }}>LOẠI LINH KIỆN *</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['CPU', 'Mainboard', 'VGA', 'RAM', 'Nguồn', 'Vỏ Case', 'Tản Nhiệt', 'Ổ Cứng'].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setProductEditDraft(prev => ({ ...prev, componentType: type }))}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: productEditDraft.componentType === type ? '1px solid var(--color-primary)' : (theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.2)'),
                          background: productEditDraft.componentType === type ? 'rgba(0,123,255,0.1)' : 'transparent',
                          color: productEditDraft.componentType === type ? 'var(--color-primary)' : textColor,
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* VARIANTS SECTION */}
              <div style={{ borderTop: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.06)', paddingTop: '16px', marginTop: '12px' }}>
                <span style={{ display: 'block', fontSize: '14px', fontWeight: '800', color: textColor, marginBottom: '16px' }}>
                  Các biến thể sản phẩm
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {(productEditDraft.variants || []).map((variant, index) => (
                    <div key={variant.id || index} style={{ border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.1)', padding: '16px', borderRadius: '8px', position: 'relative', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)' }}>
                      <h5 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-primary-dim)', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        Biến thể {index + 1}
                        {productEditDraft.variants.length > 1 && (
                          <button type="button" onClick={() => removeEditVariant(index)} className="btn btn-ghost" style={{ color: 'var(--color-error)' }}>
                            <X size={14} /> Xóa
                          </button>
                        )}
                      </h5>

                      <div style={{ display: 'grid', gap: '10px' }} className="grid-responsive-2col">
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Giá Bán (VND) *</label>
                          <input
                            type="number"
                            required
                            placeholder="Ví dụ: 15900000"
                            value={variant.price || ''}
                            onChange={(e) => updateEditVariant(index, 'price', e.target.value)}
                            className="form-input"
                            style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Tồn kho *</label>
                          <input
                            type="number"
                            required
                            placeholder="Ví dụ: 100"
                            value={variant.stockQuantity || ''}
                            onChange={(e) => updateEditVariant(index, 'stockQuantity', e.target.value)}
                            className="form-input"
                            style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Màu sắc (nếu có)</label>
                          <input
                            type="text"
                            placeholder="Ví dụ: Space Gray"
                            value={variant.color || ''}
                            onChange={(e) => updateEditVariant(index, 'color', e.target.value)}
                            className="form-input"
                            style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                          />
                        </div>
                      </div>

                      {/* SPECS */}
                      <div style={{ marginTop: '16px' }}>
                        <span style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--color-outline)', textTransform: 'uppercase', marginBottom: '8px' }}>
                          THÔNG SỐ KỸ THUẬT ({productEditDraft.category?.toUpperCase()})
                        </span>
                        
                        {productEditDraft.category === 'laptop' && (
                          <div style={{ display: 'grid', gap: '10px' }} className="grid-responsive-2col">
                            <input type="text" placeholder="CPU (ví dụ: Intel i7)" value={variant.cpu || ''} onChange={(e) => updateEditVariant(index, 'cpu', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                            <input type="text" placeholder="RAM (ví dụ: 16GB)" value={variant.ram || ''} onChange={(e) => updateEditVariant(index, 'ram', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                            <input type="text" placeholder="Ô Cứng (ví dụ: 512GB SSD)" value={variant.storage || ''} onChange={(e) => updateEditVariant(index, 'storage', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                            <input type="text" placeholder="VGA / GPU (ví dụ: RTX 4060)" value={variant.gpu || ''} onChange={(e) => updateEditVariant(index, 'gpu', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                          </div>
                        )}

                        {productEditDraft.category === 'điện thoại' && (
                          <div style={{ display: 'grid', gap: '10px' }} className="grid-responsive-2col">
                            <input type="text" placeholder="Màn hình" value={variant.screen || ''} onChange={(e) => updateEditVariant(index, 'screen', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                            <input type="text" placeholder="SoC (Chip)" value={variant.soc || ''} onChange={(e) => updateEditVariant(index, 'soc', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                            <input type="text" placeholder="RAM" value={variant.ram || ''} onChange={(e) => updateEditVariant(index, 'ram', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                            <input type="text" placeholder="Pin" value={variant.battery || ''} onChange={(e) => updateEditVariant(index, 'battery', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                          </div>
                        )}

                        {productEditDraft.category === 'gaming gear' && (
                          <div style={{ display: 'grid', gap: '10px' }} className="grid-responsive-2col">
                            <input type="text" placeholder="Loại (Chuột/Phím...)" value={variant.gearType || ''} onChange={(e) => updateEditVariant(index, 'gearType', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                            <input type="text" placeholder="Kết nối (Có dây/Không dây)" value={variant.connectivity || ''} onChange={(e) => updateEditVariant(index, 'connectivity', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                            <input type="text" placeholder="Switch (Nếu là bàn phím)" value={variant.switchType || ''} onChange={(e) => updateEditVariant(index, 'switchType', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                          </div>
                        )}

                        {productEditDraft.category === 'linh kiện' && (
                          <div style={{ display: 'grid', gap: '10px' }} className="grid-responsive-2col">
                            {['CPU', 'Mainboard'].includes(productEditDraft.componentType) && <input type="text" placeholder="Socket" value={variant.socket || ''} onChange={(e) => updateEditVariant(index, 'socket', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />}
                            {['CPU', 'Nguồn'].includes(productEditDraft.componentType) && <input type="text" placeholder="Công suất (W)" value={variant.wattage || ''} onChange={(e) => updateEditVariant(index, 'wattage', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />}
                            {['RAM'].includes(productEditDraft.componentType) && (
                               <>
                                 <input type="text" placeholder="Dung lượng RAM" value={variant.ramCapacity || ''} onChange={(e) => updateEditVariant(index, 'ramCapacity', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                                 <input type="text" placeholder="Tốc độ RAM (MHz)" value={variant.ramSpeed || ''} onChange={(e) => updateEditVariant(index, 'ramSpeed', e.target.value)} className="form-input" style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }} />
                               </>
                            )}
                            {/* ... more fields as needed ... */}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  <button type="button" onClick={addEditVariant} className="btn btn-ghost" style={{ alignSelf: 'flex-start', color: 'var(--color-primary-dim)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>+</span> Thêm biến thể
                  </button>
                </div>
              </div>

              {/* COMMON FIELDS (Tags, Image) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Mã Tags (cách nhau bằng dấu phẩy)</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Gaming, RTX4060, Intel"
                    value={productEditDraft.tags ? (Array.isArray(productEditDraft.tags) ? productEditDraft.tags.join(', ') : productEditDraft.tags) : ''}
                    onChange={(e) => setProductEditDraft(prev => ({ ...prev, tags: e.target.value.split(',').map(t => t.trim()) }))}
                    className="form-input"
                    style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Đường dẫn ảnh sản phẩm</label>
                  <input
                    type="text"
                    value={productEditDraft.image || ''}
                    onChange={(e) => setProductEditDraft(prev => ({ ...prev, image: e.target.value }))}
                    className="form-input"
                    style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                  />
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => props.handleUpdateProduct ? props.handleUpdateProduct(productEditDraft.id, productEditDraft) : setProductConfirmModal(true)}
                  >
                    HOÀN TẤT CHỈNH SỬA
                  </button>
                </div>
              </div>

                </div>
              )}

            </div>
          </div>
        </div>
      )}
      {selectedOrder && (
        <div  className="modal-overlay" onClick={() => setSelectedOrder(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1000 }}>
          <div  className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '600px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden', zIndex: 1001, background: theme === 'light' ? '#ffffff' : undefined, border: theme === 'light' ? '1px solid #cbd5e1' : undefined }}>
            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '800', color: textColor }}>Chi tiết đơn hàng {selectedOrder.id}</h4>
              <button onClick={() => setSelectedOrder(null)} className="btn btn-ghost" style={{ padding: '4px', borderRadius: '50%' }}>
                <X size={18} color={theme === 'light' ? '#334155' : 'white'} />
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '70vh', overflowY: 'auto' }}>
              {/* Customer Info */}
              <div style={{ background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: 'var(--rounded)', border: theme === 'light' ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.04)' }}>
                <h5 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-primary-dim)', textTransform: 'uppercase', marginBottom: '6px' }}>Thông tin giao nhận</h5>
                <p style={{ fontSize: '13px', color: textColor, lineHeight: '1.6' }}>
                  Khách hàng: <strong>{selectedOrder.customerName}</strong><br />
                  SĐT: {selectedOrder.phone} | Email: {selectedOrder.email}<br />
                  Phương thức thanh toán: {selectedOrder.paymentMethod}
                </p>
              </div>

              {/* Items List */}
              <div>
                <h5 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-primary-dim)', textTransform: 'uppercase', marginBottom: '8px' }}>Sản phẩm đã mua</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedOrder.items.map((it, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderBottom: theme === 'light' ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.04)', paddingBottom: '6px' }}>
                      <span style={{ color: textColor }}>{it.name} (x{it.quantity})</span>
                      <strong style={{ color: 'var(--color-secondary-dim)' }}>{formatVND(it.price * it.quantity)}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total & Status action */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: theme === 'light' ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Tổng thanh toán:</span>
                  <span style={{ display: 'block', fontSize: '18px', fontWeight: '800', color: 'var(--color-secondary-dim)' }}>{formatVND(selectedOrder.total)}</span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {selectedOrder.status === 'PENDING' && (
                    <button onClick={() => updateOrderStatus(selectedOrder.id, 'PROCESSING')} className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '12px' }}>
                      Duyệt đơn
                    </button>
                  )}
                  {selectedOrder.status === 'PROCESSING' && (
                    <button onClick={() => updateOrderStatus(selectedOrder.id, 'DELIVERED')} className="btn" style={{ padding: '8px 14px', fontSize: '12px', background: '#388e3c', color: 'var(--color-on-surface)' }}>
                      Đã giao hàng
                    </button>
                  )}
                  {['PENDING', 'PROCESSING'].includes(selectedOrder.status) && (
                    <button onClick={() => updateOrderStatus(selectedOrder.id, 'CANCELLED')} className="btn" style={{ padding: '8px 14px', fontSize: '12px', background: '#d32f2f', color: 'var(--color-on-surface)' }}>
                      Hủy đơn
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {productConfirmModal && (
        <div  className="modal-overlay" onClick={() => setProductConfirmModal(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1100 }}>
          <div  className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '380px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden', zIndex: 1101, background: theme === 'light' ? '#ffffff' : undefined, border: theme === 'light' ? '1px solid #cbd5e1' : undefined }}>
            <div style={{ padding: '16px 20px', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '800', color: textColor }}>Xác nhận thay đổi sản phẩm</h4>
              <button onClick={() => setProductConfirmModal(false)} className="btn btn-ghost" style={{ padding: '4px', borderRadius: '50%' }}>
                <X size={18} color={theme === 'light' ? '#334155' : 'white'} />
              </button>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <p style={{ fontSize: '13px', color: textColor, lineHeight: '1.6' }}>
                Bạn có muốn **Lưu** các thay đổi đã thực hiện cho sản phẩm này trực tiếp vào hệ thống, hay **Hoàn tác** để khôi phục giá trị cũ?
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  
                  style={{ flex: 1, padding: '10px', fontSize: '13px', fontWeight: '700' }}
                  className="btn btn-secondary" onClick={() => {
                    setStoreProducts(prev => prev.map(p => p.id === productEditDraft.id ? productEditDraft : p));
                    setDetailedItem(productEditDraft);
                    setProductConfirmModal(false);
                  }}
                >
                  Lưu
                </button>
                <button
                  
                  style={{ flex: 1, padding: '10px', fontSize: '13px' }}
                  className="btn btn-outline" onClick={() => {
                    setProductEditDraft(JSON.parse(JSON.stringify(detailedItem)));
                    setProductConfirmModal(false);
                  }}
                >
                  Hoàn tác
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

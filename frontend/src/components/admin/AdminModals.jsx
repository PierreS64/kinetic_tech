import React from 'react';
import { X, Check } from 'lucide-react';

export default function AdminModals(props) {
  const { theme, detailedItem, setDetailedItem, handleCloseDetailedModal, textColor, productEditDraft, setProductEditDraft, handleInputBlurOrEnter, selectedOrder, setSelectedOrder, formatVND, updateOrderStatus, priceConfirmModal, setPriceConfirmModal, updateProductPrice, productConfirmModal, setProductConfirmModal, setStoreProducts } = props;

  return (
    <>
      {detailedItem && (
        <div className="modal-overlay" onClick={handleCloseDetailedModal} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1000 }}>
          <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '600px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden', zIndex: 1001, background: theme === 'light' ? '#ffffff' : undefined, border: theme === 'light' ? '1px solid #cbd5e1' : undefined }}>

            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '800', color: textColor }}>
                {detailedItem.type === 'product' && `Chỉnh sửa sản phẩm: ${detailedItem.name} (${detailedItem.id})`}
                {detailedItem.type === 'warranty' && `Chi tiết yêu cầu bảo hành ${detailedItem.id}`}
                {detailedItem.type === 'tradein' && `Chi tiết yêu cầu Trade-in ${detailedItem.id}`}
                {detailedItem.type === 'feedback' && `Ý kiến đóng góp ${detailedItem.id}`}
              </h4>
              <button onClick={handleCloseDetailedModal} className="btn btn-ghost" style={{ padding: '4px', borderRadius: '50%' }}>
                <X size={18} color={theme === 'light' ? '#334155' : 'white'} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '20px', maxHeight: '70vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* 1. WARRANTY DETAILED VIEW */}
              {detailedItem.type === 'warranty' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
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
                    <p style={{ fontSize: '13px', color: textColor, background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '4px', border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.05)', marginTop: '4px', lineHeight: '1.5' }}>
                      {detailedItem.issue}
                    </p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Ngày tạo yêu cầu:</span>
                      <strong style={{ display: 'block', color: textColor }}>{detailedItem.dateCreated}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Trạng thái hiện tại:</span>
                      <span className="status-badge" style={{
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
                      }}>
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
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
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
                    <p style={{ fontSize: '13px', color: textColor, background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '4px', border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.05)', marginTop: '4px', lineHeight: '1.5' }}>
                      {detailedItem.conditionDesc}
                    </p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
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
                    <span className="status-badge" style={{
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
                    }}>
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
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
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
                    <p style={{ fontSize: '13px', color: textColor, background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '4px', border: theme === 'light' ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.05)', marginTop: '4px', lineHeight: '1.6' }}>
                      {detailedItem.content}
                    </p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Thời gian gửi:</span>
                      <strong style={{ display: 'block', color: textColor }}>{detailedItem.date}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Trạng thái:</span>
                      <span className="status-badge" style={{
                        display: 'inline-block',
                        marginTop: '4px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        background: detailedItem.status === 'processed' ? (theme === 'light' ? '#4caf50' : 'rgba(76,175,80,0.15)') : (theme === 'light' ? '#ff9800' : 'rgba(253,139,0,0.15)'),
                        color: '#ffffff',
                        padding: '4px 8px',
                        borderRadius: '4px'
                      }}>
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
                      onBlur={handleInputBlurOrEnter}
                      onKeyDown={(e) => e.key === 'Enter' && handleInputBlurOrEnter(e)}
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

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Danh Mục *</label>
                      <select
                        value={productEditDraft.category || ''}
                        onChange={(e) => setProductEditDraft(prev => ({ ...prev, category: e.target.value }))}
                        onBlur={handleInputBlurOrEnter}
                        onKeyDown={(e) => e.key === 'Enter' && handleInputBlurOrEnter(e)}
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

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Tình Trạng Kho</label>
                      <select
                        value={productEditDraft.inStock ? 'true' : 'false'}
                        onChange={(e) => setProductEditDraft(prev => ({ ...prev, inStock: e.target.value === 'true' }))}
                        onBlur={handleInputBlurOrEnter}
                        onKeyDown={(e) => e.key === 'Enter' && handleInputBlurOrEnter(e)}
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
                        value={productEditDraft.price || ''}
                        onChange={(e) => setProductEditDraft(prev => ({ ...prev, price: Number(e.target.value) || 0 }))}
                        onBlur={handleInputBlurOrEnter}
                        onKeyDown={(e) => e.key === 'Enter' && handleInputBlurOrEnter(e)}
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

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Giá Cũ (Gốc)</label>
                      <input
                        type="number"
                        value={productEditDraft.oldPrice || ''}
                        onChange={(e) => setProductEditDraft(prev => ({ ...prev, oldPrice: Number(e.target.value) || 0 }))}
                        onBlur={handleInputBlurOrEnter}
                        onKeyDown={(e) => e.key === 'Enter' && handleInputBlurOrEnter(e)}
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
                  </div>

                  <div>
                    <span style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: 'var(--color-primary-dim)', marginBottom: '8px' }}>Thông số cấu hình kỹ thuật</span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '10px', color: 'var(--color-outline)', marginBottom: '2px' }}>CPU</label>
                        <input
                          type="text"
                          value={(productEditDraft.specs && productEditDraft.specs.cpu) || ''}
                          onChange={(e) => setProductEditDraft(prev => ({ ...prev, specs: { ...prev.specs, cpu: e.target.value } }))}
                          onBlur={handleInputBlurOrEnter}
                          onKeyDown={(e) => e.key === 'Enter' && handleInputBlurOrEnter(e)}
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
                      <div>
                        <label style={{ display: 'block', fontSize: '10px', color: 'var(--color-outline)', marginBottom: '2px' }}>RAM</label>
                        <input
                          type="text"
                          value={(productEditDraft.specs && productEditDraft.specs.ram) || ''}
                          onChange={(e) => setProductEditDraft(prev => ({ ...prev, specs: { ...prev.specs, ram: e.target.value } }))}
                          onBlur={handleInputBlurOrEnter}
                          onKeyDown={(e) => e.key === 'Enter' && handleInputBlurOrEnter(e)}
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
                      <div>
                        <label style={{ display: 'block', fontSize: '10px', color: 'var(--color-outline)', marginBottom: '2px' }}>Ổ Cứng</label>
                        <input
                          type="text"
                          value={(productEditDraft.specs && productEditDraft.specs.storage) || ''}
                          onChange={(e) => setProductEditDraft(prev => ({ ...prev, specs: { ...prev.specs, storage: e.target.value } }))}
                          onBlur={handleInputBlurOrEnter}
                          onKeyDown={(e) => e.key === 'Enter' && handleInputBlurOrEnter(e)}
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
                      <div>
                        <label style={{ display: 'block', fontSize: '10px', color: 'var(--color-outline)', marginBottom: '2px' }}>VGA / GPU</label>
                        <input
                          type="text"
                          value={(productEditDraft.specs && productEditDraft.specs.gpu) || ''}
                          onChange={(e) => setProductEditDraft(prev => ({ ...prev, specs: { ...prev.specs, gpu: e.target.value } }))}
                          onBlur={handleInputBlurOrEnter}
                          onKeyDown={(e) => e.key === 'Enter' && handleInputBlurOrEnter(e)}
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
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Mã Tags (cách nhau bằng dấu phẩy)</label>
                    <input
                      type="text"
                      value={productEditDraft.tags ? (Array.isArray(productEditDraft.tags) ? productEditDraft.tags.join(', ') : productEditDraft.tags) : ''}
                      onChange={(e) => setProductEditDraft(prev => ({ ...prev, tags: e.target.value.split(',').map(t => t.trim()) }))}
                      onBlur={handleInputBlurOrEnter}
                      onKeyDown={(e) => e.key === 'Enter' && handleInputBlurOrEnter(e)}
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

                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Đường dẫn ảnh sản phẩm</label>
                    <input
                      type="text"
                      value={productEditDraft.image || ''}
                      onChange={(e) => setProductEditDraft(prev => ({ ...prev, image: e.target.value }))}
                      onBlur={handleInputBlurOrEnter}
                      onKeyDown={(e) => e.key === 'Enter' && handleInputBlurOrEnter(e)}
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
                </div>
              )}

            </div>
          </div>
        </div>
      )}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1000 }}>
          <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '600px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden', zIndex: 1001, background: theme === 'light' ? '#ffffff' : undefined, border: theme === 'light' ? '1px solid #cbd5e1' : undefined }}>
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
                  {selectedOrder.status === 'pending' && (
                    <button onClick={() => updateOrderStatus(selectedOrder.id, 'processing')} className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '12px' }}>
                      Duyệt đơn
                    </button>
                  )}
                  {selectedOrder.status === 'processing' && (
                    <button onClick={() => updateOrderStatus(selectedOrder.id, 'completed')} className="btn" style={{ padding: '8px 14px', fontSize: '12px', background: '#388e3c', color: 'white' }}>
                      Đã giao hàng
                    </button>
                  )}
                  {['pending', 'processing'].includes(selectedOrder.status) && (
                    <button onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')} className="btn" style={{ padding: '8px 14px', fontSize: '12px', background: '#d32f2f', color: 'white' }}>
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
        <div className="modal-overlay" onClick={() => setProductConfirmModal(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1100 }}>
          <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '380px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden', zIndex: 1101, background: theme === 'light' ? '#ffffff' : undefined, border: theme === 'light' ? '1px solid #cbd5e1' : undefined }}>
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
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '10px', fontSize: '13px', fontWeight: '700' }}
                  onClick={() => {
                    setStoreProducts(prev => prev.map(p => p.id === productEditDraft.id ? productEditDraft : p));
                    setDetailedItem(productEditDraft);
                    setProductConfirmModal(false);
                  }}
                >
                  Lưu
                </button>
                <button
                  className="btn btn-outline"
                  style={{ flex: 1, padding: '10px', fontSize: '13px' }}
                  onClick={() => {
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

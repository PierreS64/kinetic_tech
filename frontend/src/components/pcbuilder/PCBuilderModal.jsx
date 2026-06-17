import React from 'react';
import { createPortal } from 'react-dom';
import { X, Filter, Search, Check, AlertTriangle } from 'lucide-react';

export default function PCBuilderModal(props) {
  const { activeModalCat, setActiveModalCat, categories, selectedParts, handleSelectPart, modalSearchQuery, setModalSearchQuery, filterPriceMin, setFilterPriceMin, filterPriceMax, setFilterPriceMax, filterSelectedBrand, setFilterSelectedBrand, filterSelectedColor, setFilterSelectedColor, filterSocket, filterRamType, formatVND, activeCatDetails, filteredModalParts, checkPartCompatibilityError } = props;

  return (
    <>
        <div className="modal-overlay">
          {/* Glass Modal Box */}
          <div className="glass-panel-glow-blue builder-modal" style={{ width: '100%', maxWidth: '850px', height: '85vh' }}>
            {/* Modal Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(10, 25, 47, 0.8)'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'white' }}>
                CHỌN LINH KIỆN: {activeCatDetails?.name}
              </h3>
              <button
                onClick={() => setActiveModalCat(null)}
                className="btn btn-ghost"
                style={{ padding: '6px', borderRadius: '50%' }}
              >
                <X size={20} color="white" />
              </button>
            </div>

            {/* Modal Two-Column Content Layout (Left Filter Sidebar, Right Product List) */}
            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', flex: 1, overflow: 'hidden' }} className="builder-modal-grid">

              {/* Left Column: Detailed Filter Sidebar */}
              <aside style={{
                background: 'rgba(5, 13, 24, 0.4)',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                overflowY: 'auto'
              }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--color-primary-dim)', display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <Filter size={12} /> Bộ lọc tìm kiếm
                </span>

                {/* Price range [Min, Max] */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', color: 'var(--color-outline)', fontWeight: '600' }}>Khoảng Giá (VND)</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <input
                      type="number"
                      placeholder="Min VND"
                      value={filterPriceMin}
                      onChange={(e) => setFilterPriceMin(Number(e.target.value) || 0)}
                      className="form-input"
                      style={{ padding: '6px 8px', fontSize: '11px', textAlign: 'center' }}
                    />
                    <input
                      type="number"
                      placeholder="Max VND"
                      value={filterPriceMax}
                      onChange={(e) => setFilterPriceMax(Number(e.target.value) || 0)}
                      className="form-input"
                      style={{ padding: '6px 8px', fontSize: '11px', textAlign: 'center' }}
                    />
                  </div>
                </div>

                {/* Brand Selection */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', color: 'var(--color-outline)', fontWeight: '600' }}>Thương Hiệu</label>
                  <select
                    value={filterSelectedBrand}
                    onChange={(e) => setFilterSelectedBrand(e.target.value)}
                    className="form-input"
                    style={{ padding: '6px 8px', fontSize: '12px', background: 'var(--color-surface-container-lowest)' }}
                  >
                    <option value="all">Tất cả hãng</option>
                    {['ASUS', 'Intel', 'AMD', 'MSI', 'Gigabyte', 'Corsair', 'Kingston', 'Samsung', 'Crucial', 'Cooler Master', 'Lian Li', 'Montech', 'SAMA', 'Jonsbo', 'Deepcool', 'Thermalright', 'GALAX'].map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Color Selection (Full White / Black) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', color: 'var(--color-outline)', fontWeight: '600' }}>Màu sắc (Color)</label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => setFilterSelectedColor('all')}
                      className="btn"
                      style={{ flex: 1, padding: '6px 0', fontSize: '11px', background: filterSelectedColor === 'all' ? 'var(--color-primary)' : 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'white' }}
                    >
                      Tất cả
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilterSelectedColor('Đen')}
                      className="btn"
                      style={{ flex: 1, padding: '6px 0', fontSize: '11px', background: filterSelectedColor === 'Đen' ? 'var(--color-primary)' : 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'white' }}
                    >
                      Đen
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilterSelectedColor('Trắng')}
                      className="btn"
                      style={{ flex: 1, padding: '6px 0', fontSize: '11px', background: filterSelectedColor === 'Trắng' ? 'var(--color-primary)' : 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: 'white' }}
                    >
                      Trắng
                    </button>
                  </div>
                </div>

                {/* Socket and RAM status read-only hints */}
                {(activeModalCat === 'cpu' || activeModalCat === 'motherboard') && selectedParts.cpu && selectedParts.motherboard && (
                  <div style={{ padding: '10px', background: 'rgba(76,175,80,0.08)', border: '1px solid rgba(76,175,80,0.2)', borderRadius: '4px', fontSize: '11px', color: '#81c784', lineHeight: '1.4' }}>
                    Khóa Socket: <strong>{selectedParts.cpu?.socket || selectedParts.motherboard?.socket}</strong>
                  </div>
                )}
                {activeModalCat === 'ram' && selectedParts.motherboard && (
                  <div style={{ padding: '10px', background: 'rgba(76,175,80,0.08)', border: '1px solid rgba(76,175,80,0.2)', borderRadius: '4px', fontSize: '11px', color: '#81c784', lineHeight: '1.4' }}>
                    Khóa Loại RAM: <strong>{selectedParts.motherboard?.ramType}</strong>
                  </div>
                )}

                {/* Reset Filters button */}
                <button
                  type="button"
                  onClick={() => {
                    setFilterPriceMin(0);
                    setFilterPriceMax(80000000);
                    setFilterSelectedColor('all');
                    setFilterSelectedBrand('all');
                    setModalSearchQuery('');
                  }}
                  className="btn btn-outline"
                  style={{ width: '100%', padding: '8px', fontSize: '11px', marginTop: 'auto' }}
                >
                  Xóa bộ lọc
                </button>
              </aside>

              {/* Right Column: Search Box & Product List */}
              <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Search Header */}
                <div style={{
                  padding: '12px 20px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                  background: 'rgba(5, 13, 24, 0.2)',
                  position: 'relative'
                }}>
                  <input
                    type="text"
                    placeholder="Gõ tìm nhanh linh kiện..."
                    value={modalSearchQuery}
                    onChange={(e) => setModalSearchQuery(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '38px', fontSize: '13px' }}
                  />
                  <Search size={16} style={{
                    position: 'absolute',
                    left: '32px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--color-outline)'
                  }} />
                </div>

                {/* Product List Scroll Container */}
                <div style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  background: 'rgba(17, 20, 21, 0.2)'
                }}>
                  {filteredModalParts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-outline)', fontSize: '13px' }}>
                      Không tìm thấy linh kiện nào phù hợp bộ lọc của bạn.
                    </div>
                  ) : (
                    filteredModalParts.map((part) => {
                      const isCurrentSelected = selectedParts[activeModalCat]?.id === part.id;
                      const compatibilityError = checkPartCompatibilityError(activeModalCat, part);

                      return (
                        <div
                          key={part.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '14px',
                            background: isCurrentSelected ? 'rgba(0, 123, 255, 0.06)' : 'rgba(255, 255, 255, 0.01)',
                            borderRadius: 'var(--rounded-md)',
                            border: `1px solid ${isCurrentSelected ? 'rgba(0, 123, 255, 0.25)' : compatibilityError ? 'rgba(211, 47, 47, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`,
                            transition: 'var(--transition-smooth)',
                            gap: '16px'
                          }}
                        >
                          {/* Image Preview */}
                          <img
                            src={part.image}
                            alt={part.name}
                            style={{
                              width: '56px',
                              height: '56px',
                              borderRadius: 'var(--rounded-sm)',
                              objectFit: 'cover',
                              background: 'rgba(255,255,255,0.02)',
                              border: '1px solid rgba(255,255,255,0.06)',
                              flexShrink: 0
                            }}
                          />

                          {/* Detail Text */}
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'white', lineHeight: '1.4' }}>
                                {part.name}
                              </h4>
                              {part.color && (
                                <span className="spec-chip" style={{ fontSize: '9px', padding: '1px 5px', textTransform: 'uppercase' }}>
                                  Màu: {part.color}
                                </span>
                              )}
                            </div>

                            <p style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
                              <strong>Thông số:</strong> {part.specs}
                            </p>

                            {/* Technical Specs Tags */}
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                              {part.socket && (
                                <span className="spec-chip spec-chip-primary">Socket: {part.socket}</span>
                              )}
                              {part.ramType && (
                                <span className="spec-chip">Hỗ trợ RAM: {part.ramType}</span>
                              )}
                              {part.length && (
                                <span className="spec-chip">Chiều dài: {part.length}mm</span>
                              )}
                              {part.height && (
                                <span className="spec-chip">Chiều cao: {part.height}mm</span>
                              )}
                              {part.radiatorSize > 0 && (
                                <span className="spec-chip" style={{ color: 'var(--color-primary-dim)' }}>Radiator AIO: {part.radiatorSize}mm</span>
                              )}
                              {part.maxGpuLength && (
                                <span className="spec-chip" style={{ color: '#81c784', borderColor: 'rgba(76,175,80,0.2)' }}>GPU Tối Đa: {part.maxGpuLength}mm</span>
                              )}
                              {part.maxCpuCoolerHeight && (
                                <span className="spec-chip" style={{ color: '#81c784', borderColor: 'rgba(76,175,80,0.2)' }}>Tản Khí Tối Đa: {part.maxCpuCoolerHeight}mm</span>
                              )}
                            </div>

                            {/* Inline Compatibility warning */}
                            {compatibilityError && (
                              <div style={{
                                color: '#ffb4ab',
                                fontSize: '11px',
                                marginTop: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                background: 'rgba(147, 0, 10, 0.1)',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                border: '1px solid rgba(147, 0, 10, 0.2)',
                                width: 'fit-content'
                              }}>
                                <AlertTriangle size={12} />
                                <span>{compatibilityError}</span>
                              </div>
                            )}
                          </div>

                          {/* Price & Selection */}
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
                            <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--color-secondary-dim)' }}>
                              {formatVND(part.price)}
                            </span>
                            <button
                              onClick={() => handleSelectPart(activeModalCat, part)}
                              className={`btn ${isCurrentSelected ? 'btn-primary' : compatibilityError ? 'btn-outline' : 'btn-outline'}`}
                              style={{
                                padding: '6px 14px',
                                fontSize: '11px',
                                borderRadius: 'var(--rounded-sm)',
                                borderColor: isCurrentSelected ? 'transparent' : compatibilityError ? 'rgba(211,47,47,0.4)' : 'rgba(255,255,255,0.1)',
                                color: isCurrentSelected ? 'white' : compatibilityError ? '#ffdad6' : 'white',
                                background: isCurrentSelected ? 'var(--color-primary)' : compatibilityError ? 'rgba(211,47,47,0.05)' : 'rgba(255,255,255,0.02)'
                              }}
                            >
                              {isCurrentSelected ? (
                                <>
                                  <Check size={12} />
                                  <span>Đã chọn</span>
                                </>
                              ) : compatibilityError ? (
                                <span>Cảnh Báo Vẫn Chọn</span>
                              ) : (
                                <span>Chọn</span>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>,
    </>
  );
}

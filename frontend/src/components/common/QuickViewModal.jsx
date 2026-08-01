import React, { useRef, useState, useEffect } from 'react';
import { X, ShoppingCart, ArrowLeft, ArrowRight } from 'lucide-react';

export default function QuickViewModal({ 
  selectedProduct, 
  onClose, 
  onViewDetails, 
  onAddToCart, 
  onBuyNow, 
  theme, 
  storeProducts 
}) {
  const relatedScrollRef = useRef(null);
  const [showRelatedLeftArrow, setShowRelatedLeftArrow] = useState(false);

  const handleRelatedScroll = () => {
    if (relatedScrollRef.current) {
      setShowRelatedLeftArrow(relatedScrollRef.current.scrollLeft > 5);
    }
  };

  useEffect(() => {
    const el = relatedScrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleRelatedScroll);
      handleRelatedScroll();
      return () => {
        el.removeEventListener('scroll', handleRelatedScroll);
      };
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  let description = '';
  if (selectedProduct.category === 'laptop') {
    description = `Laptop ${selectedProduct.name} sở hữu hiệu năng mạnh mẽ đột phá với CPU và GPU thế hệ mới nhất, mang lại trải nghiệm mượt mà cho cả tác vụ gaming đồ họa nặng lẫn công việc thiết kế chuyên nghiệp. Màn hình tần số quét cao giúp giảm thiểu tối đa hiện tượng xé hình, mang lại hình ảnh sắc nét đến từng chi tiết.`;
  } else if (selectedProduct.category === 'điện thoại') {
    description = `Điện thoại ${selectedProduct.name} mang ngôn ngữ thiết kế sang trọng, thời thượng. Được trang bị hệ thống camera siêu sắc nét cùng bộ xử lý tối tân và dung lượng pin bền bỉ, chiếc điện thoại này sẵn sàng đáp ứng mọi nhu cầu giải trí và làm việc cường độ cao trong ngày.`;
  } else if (selectedProduct.category === 'gaming gear') {
    description = `Sản phẩm gaming gear ${selectedProduct.name} cao cấp mang đến trải nghiệm điều khiển chính xác tuyệt đối và cảm giác bấm/nghe vượt trội. Đây là lựa chọn hoàn hảo của các tuyển thủ eSports chuyên nghiệp để nâng tầm khả năng thi đấu.`;
  } else {
    description = `Linh kiện máy tính ${selectedProduct.name} chính hãng đạt tiêu chuẩn chất lượng cao, cung cấp hiệu năng vượt trội và độ bền bỉ đáng tin cậy. Đóng vai trò then chốt giúp tối ưu hóa sức mạnh phần cứng cho hệ thống PC của bạn.`;
  }

  const promoCodes = [
    { code: 'KINETIC5', desc: 'Giảm 5% cho đơn hàng' },
    { code: 'FREESHIP', desc: 'Miễn phí vận chuyển' },
    { code: 'HELLO', desc: 'Giảm 500K khách mới' }
  ];

  const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const discount = 0;
  const related = storeProducts.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id);

  return (
    <div 
      style={{ zIndex: 102, display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
      className="modal-overlay" 
      onClick={onClose}
    >
      <div 
        className="glass-panel animate-fade-in-up" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          width: '90%', 
          maxWidth: '850px', 
          borderRadius: 'var(--rounded-lg)', 
          overflow: 'hidden',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8)',
          border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Modal Header */}
        <div style={{ padding: '16px 24px', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Chi tiết sản phẩm</h3>
          <button 
            onClick={onClose} 
            className="btn btn-ghost" 
            style={{ padding: '6px', borderRadius: '50%', minWidth: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={20} color={theme === 'light' ? '#334155' : 'white'} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) 1.2fr', gap: '28px' }} className="catalog-layout">
            {/* Left: Product Image */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: theme === 'light' ? '#f1f5f9' : 'var(--color-surface-container-lowest)', border: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--rounded-md)', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '280px' }}>
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=400';
                  }}
                />
              </div>
              
              {/* Specs block */}
              {selectedProduct.specs && (
                <div style={{ background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: 'var(--rounded-md)', border: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.04)' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-primary-dim)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.5px' }}>
                    Thông Số Kỹ Thuật
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {Object.entries(selectedProduct.specs).map(([key, val]) => (
                      <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                        <span style={{ fontWeight: '600', textTransform: 'uppercase', color: theme === 'light' ? '#94a3b8' : 'rgba(255,255,255,0.4)' }}>{key}:</span>
                        <span style={{ color: theme === 'light' ? '#0f172a' : 'white', textAlign: 'right', fontWeight: '500' }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Info & CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span className={`status-badge ${selectedProduct.inStock ? 'status-badge-stock' : ''}`} style={{ background: selectedProduct.inStock ? '' : '#373a3b', color: selectedProduct.inStock ? '' : '#c1c6d7', marginBottom: '8px' }}>
                  {selectedProduct.inStock ? 'Còn hàng' : 'Hết hàng'}
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: '800', lineHeight: '1.4', color: theme === 'light' ? '#0f172a' : 'white', marginBottom: '6px' }}>
                  {selectedProduct.name}
                </h2>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
                  <span style={{ color: '#ffb77d', fontWeight: 'bold' }}>★ {selectedProduct.rating || 5}</span>
                  <span style={{ color: theme === 'light' ? '#475569' : 'var(--color-on-surface-variant)' }}>({selectedProduct.reviews || 0} đánh giá)</span>
                  <span style={{ color: theme === 'light' ? '#94a3b8' : 'inherit' }}>|</span>
                  <span style={{ color: theme === 'light' ? '#475569' : 'inherit' }}>Mã SP: {selectedProduct.id.toUpperCase()}</span>
                </div>
              </div>

              {/* Price Block */}
              <div style={{ background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)', padding: '14px 18px', borderRadius: 'var(--rounded-md)', border: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-secondary-dim)' }}>
                  {formatVND(selectedProduct.price)}
                </span>
              </div>

              {/* Vouchers and Promo Description Section */}
              <div>
                <h4 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-secondary-dim)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>
                  Khuyến Mãi & Voucher Áp Dụng
                </h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                  {promoCodes.map((p) => (
                    <div 
                      key={p.code} 
                      onClick={() => {
                        navigator.clipboard.writeText(p.code);
                        alert(`Đã sao chép mã khuyến mãi: ${p.code}`);
                      }}
                      className="glass-panel"
                      style={{ 
                        padding: '6px 12px', 
                        borderRadius: 'var(--rounded-sm)', 
                        fontSize: '11px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        gap: '8px', 
                        cursor: 'pointer',
                        border: '1px dashed rgba(253, 139, 0, 0.4)',
                        transition: 'all 0.2s',
                        userSelect: 'none'
                      }}
                      title="Click để sao chép"
                    >
                      <span style={{ color: 'var(--color-secondary-dim)', fontWeight: 'bold' }}>{p.code}</span>
                      <span style={{ color: theme === 'light' ? '#64748b' : 'rgba(255,255,255,0.5)', fontSize: '10px' }}>({p.desc})</span>
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', lineHeight: '1.6' }}>
                  {description}
                </p>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'grid', gap: '12px', marginTop: 'auto', paddingTop: '10px' }} className="grid-responsive-2col">
                <button 
                  onClick={() => onAddToCart(selectedProduct)}
                  disabled={!selectedProduct.inStock}
                  className="btn btn-outline"
                  style={{ padding: '12px', fontSize: '13px', fontWeight: '700' }}
                >
                  <ShoppingCart size={16} />
                  Thêm Vào Giỏ Hàng
                </button>
                <button 
                  onClick={() => onBuyNow(selectedProduct)}
                  disabled={!selectedProduct.inStock}
                  className="btn btn-secondary"
                  style={{ padding: '12px', fontSize: '13px', fontWeight: '700' }}
                >
                  Mua Ngay
                </button>
                <button 
                  onClick={() => onViewDetails(selectedProduct)}
                  className="btn btn-ghost"
                  style={{ gridColumn: 'span 2', padding: '10px', fontSize: '13px', color: 'var(--color-primary-dim)', textDecoration: 'underline' }}
                >
                  Xem chi tiết -&gt;
                </button>
              </div>
            </div>
          </div>

          {/* Related Products horizontal scroll carousel */}
          {related.length > 0 && (
            <div style={{ borderTop: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.06)', paddingTop: '20px', position: 'relative' }}>
              <h4 style={{ fontSize: '13px', fontWeight: '800', color: theme === 'light' ? '#0f172a' : 'white', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.5px' }}>
                Sản phẩm nổi bật cùng loại
              </h4>
              
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                {/* Slide Left button */}
                {showRelatedLeftArrow && (
                  <button 
                    onClick={() => {
                      if (relatedScrollRef.current) {
                        const itemWidth = relatedScrollRef.current.children[0]?.offsetWidth || 0;
                        relatedScrollRef.current.scrollBy({ left: -(itemWidth + 16), behavior: 'smooth' });
                      }
                    }}
                    className="btn btn-ghost"
                    style={{
                      position: 'absolute',
                      left: '-16px',
                      zIndex: 10,
                      background: 'rgba(21, 24, 25, 0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0
                    }}
                  >
                    <ArrowLeft size={16} color="white" />
                  </button>
                )}

                {/* Slider Scroll container */}
                <div 
                  ref={relatedScrollRef}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    overflowX: 'auto',
                    scrollBehavior: 'smooth',
                    scrollSnapType: 'x mandatory',
                    padding: '4px 0 16px',
                    width: '100%',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}
                  className="no-scrollbar"
                >
                  {related.map((prod) => (
                    <div 
                      key={prod.id}
                      onClick={() => onViewDetails(prod)}
                      style={{
                        background: 'var(--color-surface-container-low)',
                        border: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.06)',
                        borderRadius: 'var(--rounded)',
                        padding: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      className="list-hover-effect category-scroll-item"
                    >
                      <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'var(--color-surface-container-lowest)', borderRadius: '4px' }}>
                        <img src={prod.image} alt={prod.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                      </div>
                      <h5 style={{ fontSize: '11px', fontWeight: '600', color: theme === 'light' ? '#0f172a' : 'white', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '32px', lineHeight: '1.4' }}>
                        {prod.name}
                      </h5>
                      <strong style={{ fontSize: '12px', color: 'var(--color-secondary-dim)' }}>
                        {formatVND(prod.price)}
                      </strong>
                    </div>
                  ))}
                </div>

                {/* Slide Right button */}
                <button 
                  onClick={() => {
                    if (relatedScrollRef.current) {
                      const itemWidth = relatedScrollRef.current.children[0]?.offsetWidth || 0;
                      relatedScrollRef.current.scrollBy({ left: itemWidth + 16, behavior: 'smooth' });
                    }
                  }}
                  className="btn btn-ghost"
                  style={{
                    position: 'absolute',
                    right: '-16px',
                    zIndex: 10,
                    background: 'rgba(21, 24, 25, 0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0
                  }}
                >
                  <ArrowRight size={16} color="white" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

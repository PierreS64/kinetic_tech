import React from 'react';
import { ArrowLeft, ShoppingCart, Shield, Truck, RotateCcw } from 'lucide-react';

export default function ProductDetail({ product, onBack, onAddToCart, onBuyNow, theme }) {
  if (!product) return null;

  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px', animation: 'fadeIn 0.3s' }}>
      <button 
        onClick={onBack}
        className="btn btn-ghost" 
        style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: theme === 'light' ? '#475569' : 'rgba(255,255,255,0.7)' }}
      >
        <ArrowLeft size={16} /> Quay lại
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', background: 'var(--color-surface-container)', padding: '32px', borderRadius: 'var(--rounded-lg)', border: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.04)' }}>
        {/* Left: Image */}
        <div style={{ background: 'var(--color-surface-container-low)', borderRadius: 'var(--rounded)', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
        </div>

        {/* Right: Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <span className={`status-badge ${product.inStock ? 'status-badge-stock' : ''}`} style={{ marginBottom: '12px' }}>
              {product.inStock ? 'Còn hàng' : 'Hết hàng'}
            </span>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: theme === 'light' ? '#0f172a' : 'white', lineHeight: '1.3', marginBottom: '12px' }}>
              {product.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
              <span style={{ color: '#ffb77d', fontWeight: 'bold' }}>★ {product.rating}</span>
              <span>({product.reviews} đánh giá)</span>
              <span>|</span>
              <span>Thương hiệu: <strong style={{ color: 'var(--color-primary-dim)' }}>{product.specs?.Brand || 'Khác'}</strong></span>
            </div>
          </div>

          <div style={{ background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: 'var(--rounded-md)', border: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'baseline', gap: '16px' }}>
            <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--color-secondary-dim)' }}>
              {formatVND(product.price)}
            </span>
            {product.oldPrice && (
              <>
                <span style={{ fontSize: '18px', textDecoration: 'line-through', color: 'var(--color-outline)' }}>
                  {formatVND(product.oldPrice)}
                </span>
                <span className="status-badge status-badge-sale" style={{ fontSize: '12px', padding: '2px 8px' }}>
                  Tiết kiệm {discount}%
                </span>
              </>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: theme === 'light' ? '#1e293b' : '#f8fafc' }}>Thông Số Kỹ Thuật Chi Tiết</h3>
            <table className="kinetic-table" style={{ fontSize: '14px' }}>
              <tbody>
                {Object.entries(product.specs || {}).map(([key, val]) => (
                  <tr key={key}>
                    <td style={{ width: '30%', fontWeight: '600', color: 'var(--color-on-surface-variant)' }}>{key}</td>
                    <td style={{ color: theme === 'light' ? '#0f172a' : 'white' }}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <button 
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
              className="btn btn-outline"
              style={{ flex: 1, padding: '16px', fontSize: '15px', fontWeight: '700' }}
            >
              <ShoppingCart size={20} />
              Thêm Vào Giỏ Hàng
            </button>
            <button 
              onClick={() => onBuyNow(product)}
              disabled={!product.inStock}
              className="btn btn-secondary"
              style={{ flex: 1, padding: '16px', fontSize: '15px', fontWeight: '700' }}
            >
              Mua Ngay
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-on-surface-variant)', fontSize: '13px' }}>
              <Shield size={20} color="var(--color-primary-dim)" />
              <span>Bảo hành chính hãng 24-36 tháng</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-on-surface-variant)', fontSize: '13px' }}>
              <Truck size={20} color="var(--color-primary-dim)" />
              <span>Giao hàng miễn phí toàn quốc</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-on-surface-variant)', fontSize: '13px' }}>
              <RotateCcw size={20} color="var(--color-primary-dim)" />
              <span>Đổi trả 1-1 trong 15 ngày đầu</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

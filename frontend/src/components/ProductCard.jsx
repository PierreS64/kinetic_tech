import React from 'react';
import { Star, ShoppingCart, CreditCard, Heart } from 'lucide-react';

export default function ProductCard({ product, onAddToCart, onBuyNow, isLiked = false, onToggleLike, onViewDetails }) {
  const { id, name, price, oldPrice, image, specs, rating, reviews, tags, inStock } = product;

  // Format currency to VND
  const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  return (
    <div className="product-card" onClick={() => onViewDetails && onViewDetails(product)} style={{ width: '100%', minWidth: '0', boxSizing: 'border-box', height: '100%', cursor: 'pointer' }}>
      {/* Stock Status Badge */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        zIndex: 5,
        opacity: 0.75
      }}>
        {inStock ? (
          <span className="status-badge status-badge-stock" style={{ background: '#4caf50', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>Còn hàng</span>
        ) : (
          <span className="status-badge" style={{ background: '#757575', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>Hết hàng</span>
        )}
      </div>

      {/* Heart / Favorite Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          if (onToggleLike) onToggleLike(id);
        }}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 5,
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(10px)',
          border: isLiked ? '1px solid rgba(255, 90, 58, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          outline: 'none'
        }}
        className="favorite-btn"
        title={isLiked ? "Bỏ yêu thích" : "Yêu thích"}
      >
        <Heart size={15} fill={isLiked ? '#ff5a3a' : 'none'} color={isLiked ? '#ff5a3a' : '#64748b'} />
      </button>

      {/* Image Container */}
      <div className="product-card-image-container" onClick={() => onViewDetails && onViewDetails(product)} style={{ cursor: 'pointer' }}>
        <img 
          src={image} 
          alt={name} 
          className="product-card-image"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=400';
          }}
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Tags */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {tags.map((tag, idx) => (
            <span key={idx} className="spec-chip">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 
          onClick={() => onViewDetails && onViewDetails(product)}
          style={{
            fontSize: '15px',
            fontWeight: '600',
            lineHeight: '1.4',
            color: '#ffffff',
            minHeight: '42px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            cursor: 'pointer'
          }}
        >
          {name}
        </h3>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ display: 'flex', color: '#ffb77d' }}>
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                fill={i < Math.floor(rating) ? '#ffb77d' : 'none'} 
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', lineHeight: '1.8' }}>
            ({reviews} đánh giá)
          </span>
        </div>

        {/* Technical Specs List */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          padding: '10px',
          borderRadius: 'var(--rounded-sm)',
          fontSize: '14px',
          color: 'var(--color-on-surface-variant)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          lineHeight: '1.8',
          marginTop: '4px',
          border: '1px solid rgba(255, 255, 255, 0.04)'
        }}>
          {Object.entries(specs).map(([key, val]) => (
            <div key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: '600', textTransform: 'uppercase', color: 'var(--color-outline)' }}>{key}:</span>
              <span style={{ textAlign: 'right', color: 'var(--color-on-surface)', maxWidth: '75%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Price Row */}
        <div style={{ marginTop: 'auto', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {oldPrice && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontSize: '12px',
                textDecoration: 'line-through',
                color: 'var(--color-outline)'
              }}>
                {formatVND(oldPrice)}
              </span>
              {discount > 0 && (
                <span className="status-badge status-badge-sale" style={{ fontSize: '10px', padding: '1px 4px', textTransform: 'none' }}>
                  -{discount}%
                </span>
              )}
            </div>
          )}
          <span style={{
            fontSize: '18px',
            fontWeight: '700',
            color: 'var(--color-secondary-dim)',
            display: 'block'
          }}>
            {formatVND(price)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginTop: '12px',
        width: '100%',
        flexDirection: 'row'
      }}>
        <button
          onClick={(e) => { e.stopPropagation(); onBuyNow(product); }}
          className="btn btn-secondary"
          disabled={!inStock}
          style={{
            flex: 1,
            padding: '8px 10px',
            fontSize: '12px',
            opacity: inStock ? 1 : 0.5,
            cursor: inStock ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <CreditCard size={14} color="white" />
          <b style={{ color: '#ffffff', fontWeight: '600' }}>Mua Ngay</b>
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
          className="btn btn-outline"
          disabled={!inStock}
          style={{
            padding: '8px 12px',
            fontSize: '14px',
            opacity: inStock ? 1 : 0.5,
            cursor: inStock ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
            minWidth: '44px'
          }}
          title="Thêm vào giỏ hàng"
        >
          <ShoppingCart size={16} />
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>+</span>
        </button>
      </div>
    </div>
  );
}

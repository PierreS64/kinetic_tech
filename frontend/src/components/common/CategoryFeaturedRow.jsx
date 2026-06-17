import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ProductCard from '../common/ProductCard';

export default function CategoryFeaturedRow({ categoryName, categoryProducts, onAddToCart, onBuyNow, likedProductIds, onToggleLike, onViewDetails, theme }) {
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const handleScroll = () => {
    if (rowRef.current) {
      setShowLeftArrow(rowRef.current.scrollLeft > 5);
    }
  };

  useEffect(() => {
    const el = rowRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => {
      if (el) {
        el.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div style={{ marginBottom: '40px', position: 'relative' }} className="reveal-on-scroll ">
      <h3 style={{ fontSize: '16px', fontWeight: '800', fontFamily: 'Montserrat', color: theme === 'light' ? '#0f172a' : '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>
        <span style={{ width: '4px', height: '16px', background: 'var(--color-primary)', borderRadius: '2px', display: 'inline-block' }} />
        {categoryName.toUpperCase()} NỔI BẬT & BÁN CHẠY
      </h3>

      <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        {/* Scroll Left Button */}
        {showLeftArrow && (
          <button 
            type="button"
            onClick={() => {
              if (rowRef.current) {
                const itemWidth = rowRef.current.children[0]?.offsetWidth || 0;
                rowRef.current.scrollBy({ left: -(itemWidth + 20), behavior: 'smooth' });
              }
            }}
            className="btn btn-ghost category-scroll-btn"
            style={{
              position: 'absolute',
              left: '-16px',
              zIndex: 10,
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0
            }}
          >
            <ArrowLeft size={18} />
          </button>
        )}

        {/* Horizontal scroll list */}
        <div 
          ref={rowRef}
          style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory',
            padding: '8px 0 20px',
            width: '100%',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          className="no-scrollbar"
        >
          {categoryProducts.map((product) => (
            <div key={product.id} style={{ flex: '0 0 calc(25% - 15px)', minWidth: 'calc(25% - 15px)', maxWidth: 'calc(25% - 15px)', scrollSnapAlign: 'start' }} >
              <ProductCard 
                product={product} 
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
                isLiked={likedProductIds.includes(product.id)}
                onToggleLike={onToggleLike}
                onViewDetails={onViewDetails}
              />
            </div>
          ))}
        </div>

        {/* Scroll Right Button */}
        <button 
          type="button"
          onClick={() => {
            if (rowRef.current) {
              const itemWidth = rowRef.current.children[0]?.offsetWidth || 0;
              rowRef.current.scrollBy({ left: itemWidth + 20, behavior: 'smooth' });
            }
          }}
          className="btn btn-ghost category-scroll-btn"
          style={{
            position: 'absolute',
            right: '-16px',
            zIndex: 10,
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0
          }}
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

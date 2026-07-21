import React, { useState, useEffect, useRef } from 'react';
import HeroCarousel from './HeroCarousel';
import CategoryFeaturedRow from '../../components/common/CategoryFeaturedRow';
import { Sparkles, Shield, Truck, RotateCcw } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [isBenefitsRevealed, setIsBenefitsRevealed] = useState(false);
  const benefitsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsBenefitsRevealed(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (benefitsRef.current) observer.observe(benefitsRef.current);
    return () => observer.disconnect();
  }, []);

  const { storeProducts, setSelectedProduct, setAiOpen } = useAppContext();
  const navigate = useNavigate();
  
  const handleCarouselCta = (slideIndex) => {
    if (slideIndex === 0) navigate('/laptop');
    else if (slideIndex === 1) navigate('/pc-builder');
    else setAiOpen(true);
  };

  const categories = [
    { id: 'laptop', name: 'Laptop', path: '/laptop' },
    { id: 'điện thoại', name: 'Điện Thoại', path: '/phone' },
    { id: 'gaming gear', name: 'Gaming Gear', path: '/gear' },
    { id: 'linh kiện', name: 'Linh Kiện & PC', path: '/components' }
  ];

  return (
    <>
      <HeroCarousel onCtaClick={handleCarouselCta} products={storeProducts} onViewDetails={setSelectedProduct} />
      <div style={{ marginTop: '40px' }} className="container">
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'Montserrat', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={22} color="var(--color-primary-dim)" />
            SẢN PHẨM NỔI BẬT
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
            Khám phá cấu hình phần cứng mới nhất được khuyên dùng bởi chuyên gia.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
          {categories.map((cat) => {
            const catProducts = storeProducts.filter(p => p.category === cat.id);
            const sortedProducts = [...catProducts].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
            if (sortedProducts.length === 0) return null;
            return <CategoryFeaturedRow key={cat.id} categoryName={cat.name} categoryProducts={sortedProducts} onViewDetails={setSelectedProduct} />;
          })}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '60px', padding: '30px 20px', borderRadius: 'var(--rounded-lg)' }} ref={benefitsRef} className={`reveal-on-scroll brand-benefits-section ${isBenefitsRevealed ? 'revealed' : ''}`}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <Shield size={24} color="var(--color-primary-dim)" />
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700' }}>100% Chính Hãng</h4>
              <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>Sản phẩm nhập khẩu chính ngạch, hóa đơn đỏ đầy đủ.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <Truck size={24} color="var(--color-secondary-dim)" />
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700' }}>Giao Hàng Siêu Tốc</h4>
              <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>Hỗ trợ giao nhanh hoả tốc 2h khu vực nội đô.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <RotateCcw size={24} color="var(--color-primary-dim)" />
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700' }}>Đổi Trả Dễ Dàng</h4>
              <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>Đổi trả 1-đổi-1 trong vòng 15 ngày nếu lỗi nhà sản xuất.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

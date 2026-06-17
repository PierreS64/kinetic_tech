import React, { useState, useEffect, useRef } from 'react';
import '../styles/components/hero-carousel.css';
import { ArrowLeft, ArrowRight, Flame } from 'lucide-react';
import ProductCard from './ProductCard';

const bannerSlides = [
  {
    id: 1,
    title: 'SIÊU PHẨM WORKSTATION & GAMING',
    subtitle: 'Nâng tầm hiệu năng đồ họa và lập trình chuyên nghiệp cùng ASUS ROG Strix và RTX 40-Series.',
    discount: 'Ưu đãi lên tới 15%',
    cta: 'Khám phá ngay',
    gradient: 'linear-gradient(135deg, rgba(10, 25, 47, 0.95) 0%, rgba(0, 123, 255, 0.45) 100%)',
    lightGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(226, 232, 240, 0.85) 55%, rgba(255, 255, 255, 0.55) 100%)',
    bgImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200',
    lightImage: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 2,
    title: 'XÂY DỰNG CẤU HÌNH PC MƠ ƯỚC',
    subtitle: 'Công cụ tính toán công suất tự động, kiểm tra Socket tương thích thông minh giúp việc tự ráp máy dễ dàng hơn bao giờ hết.',
    discount: 'Miễn phí lắp đặt toàn quốc',
    cta: 'Ráp máy ngay',
    gradient: 'linear-gradient(135deg, rgba(10, 25, 47, 0.95) 0%, rgba(253, 139, 0, 0.45) 100%)',
    lightGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 241, 232, 0.86) 55%, rgba(255, 255, 255, 0.6) 100%)',
    bgImage: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=1200',
    lightImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 3,
    title: 'TRỢ LÝ CỐ VẤN AI THÔNG MINH',
    subtitle: 'Chat ngay với Cố vấn AI để nhận đề xuất cấu hình PC, laptop học tập, văn phòng phù hợp nhất với ví tiền của bạn.',
    discount: 'Tư vấn trực tuyến 24/7',
    cta: 'Chat với AI',
    gradient: 'linear-gradient(135deg, rgba(10, 25, 47, 0.95) 0%, rgba(131, 145, 173, 0.45) 100%)',
    lightGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(232, 238, 248, 0.86) 55%, rgba(255, 255, 255, 0.6) 100%)',
    bgImage: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&q=80&w=1200',
    lightImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200'
  }
];

export default function HeroCarousel({ onCtaClick, theme, products = [], onAddToCart, onBuyNow, onViewDetails, likedProductIds = [], onToggleLike }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const saleScrollRef = useRef(null);
  const [showSaleLeftArrow, setShowSaleLeftArrow] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 30
  });

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 3, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-play slides
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % bannerSlides.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, []);

  // Scroll arrow logic
  const handleSaleScroll = () => {
    if (saleScrollRef.current) {
      setShowSaleLeftArrow(saleScrollRef.current.scrollLeft > 5);
    }
  };

  useEffect(() => {
    const el = saleScrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleSaleScroll);
      handleSaleScroll();
    }
    return () => {
      if (el) {
        el.removeEventListener('scroll', handleSaleScroll);
      }
    };
  }, [products]);

  const handlePrev = () => {
    setCurrentSlide(prev => (prev === 0 ? bannerSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % bannerSlides.length);
  };

  const isLight = theme === 'light';
  const slide = bannerSlides[currentSlide];
  const slideImage = isLight && slide.lightImage ? slide.lightImage : slide.bgImage;
  const slideGradient = isLight && slide.lightGradient ? slide.lightGradient : slide.gradient;
  const titleShadow = isLight ? '0 1px 2px rgba(15, 23, 42, 0.15)' : '0 2px 10px rgba(0, 0, 0, 0.5)';
  const bodyShadow = isLight ? '0 1px 2px rgba(15, 23, 42, 0.12)' : '0 1px 4px rgba(0, 0, 0, 0.4)';
  const controlBg = isLight ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.4)';
  const controlBorder = isLight ? '1px solid rgba(15, 23, 42, 0.12)' : '1px solid rgba(255, 255, 255, 0.1)';
  const controlIconColor = isLight ? '#0f172a' : 'white';
  const indicatorInactive = isLight ? 'rgba(15, 23, 42, 0.2)' : 'rgba(255, 255, 255, 0.3)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', margin: 0, width: '100%' }} className="animate-fade-in-up">
      {/* Full-width Dynamic Slide Banner (Decreased height) */}
      <div
        style={{
          position: 'relative',
          height: '370px',
          width: '100%',
          overflow: 'hidden',
          backgroundImage: `url(${slideImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: 'none',
          borderRadius: 0,
          boxShadow: 'none'
        }}
      >
        {/* Banner Overlay Gradient */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: slideGradient,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          color: isLight ? '#0f172a' : 'white'
        }} className="banner-content">
          <div className="container" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="banner-badge" style={{
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              color: isLight ? '#b45309' : 'var(--color-secondary-dim)',
              background: isLight ? 'rgba(255, 255, 255, 0.14)' : 'rgba(253, 139, 0, 0.1)',
              border: isLight ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(253, 139, 0, 0.25)',
              padding: '3px 10px',
              borderRadius: 'var(--rounded-full)',
              alignSelf: 'flex-start',
              marginBottom: '12px'
            }}>
              {slide.discount}
            </span>
            <h1 style={{
              fontFamily: 'Montserrat',
              fontSize: '32px',
              fontWeight: 800,
              lineHeight: '1.2',
              maxWidth: '650px',
              marginBottom: '12px',
              color: isLight ? '#0f172a' : '#ffffff',
              textShadow: titleShadow
            }}>
              {slide.title}
            </h1>
            <p style={{
              fontFamily: 'Inter',
              fontSize: '14px',
              color: isLight ? '#475569' : 'var(--color-on-surface-variant)',
              maxWidth: '550px',
              lineHeight: '1.6',
              marginBottom: '16px',
              textShadow: bodyShadow
            }}>
              {slide.subtitle}
            </p>
            <button
              onClick={() => onCtaClick(currentSlide)}
              className="btn btn-primary"
              style={{ alignSelf: 'flex-start', padding: '10px 24px', fontSize: '14px' }}
            >
              {slide.cta}
            </button>
          </div>
        </div>

        {/* Carousel controls */}
        <button
          onClick={handlePrev}
          className="btn btn-ghost"
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 3,
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            background: controlBg,
            border: controlBorder,
            padding: 0
          }}
        >
          <ArrowLeft size={18} color={controlIconColor} />
        </button>
        <button
          onClick={handleNext}
          className="btn btn-ghost"
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 3,
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            background: controlBg,
            border: controlBorder,
            padding: 0
          }}
        >
          <ArrowRight size={18} color={controlIconColor} />
        </button>

        {/* Slide Indicators */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 3
        }}>
          {bannerSlides.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: currentSlide === idx ? '20px' : '8px',
                height: '8px',
                borderRadius: 'var(--rounded-full)',
                background: currentSlide === idx ? 'var(--color-primary)' : indicatorInactive,
                cursor: 'pointer'
              }}
            />
          ))}
        </div>
      </div>

      {/* Countdown Flash Sale Section (Enlarged & Top-centered title) */}
      <div className="container" style={{ marginTop: '20px' }}>
        <div
          id="flash-sale-box"
          className="glass-panel"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            padding: '32px 24px',
            borderRadius: 'var(--rounded-md)',
            overflow: 'hidden'
          }}
        >
          {/* Header Block: Centered Title & Countdown */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            borderBottom: isLight ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid rgba(255, 255, 255, 0.05)',
            paddingBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                background: 'rgba(253, 139, 0, 0.15)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Flame size={24} color="var(--color-secondary)" />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'Montserrat', display: 'flex', alignItems: 'center', gap: '8px', margin: 0, textTransform: 'uppercase' }}>
                DEALS CHỚP NHOÁNG
                <b style={{
                  background: 'red',
                  color: 'white',
                  fontSize: '12px',
                  padding: '2px 8px',
                  borderRadius: 'var(--rounded-sm)',
                  animation: 'pulse 1.5s infinite'
                }}>HOT</b>
              </h2>
            </div>

            {/* Countdown Ticker */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-on-surface-variant)' }}>Kết thúc sau:</span>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <div className="countdown-box">{String(timeLeft.hours).padStart(2, '0')}</div>
                <span className="countdown-separator">:</span>
                <div className="countdown-box">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <span className="countdown-separator">:</span>
                <div className="countdown-box">{String(timeLeft.seconds).padStart(2, '0')}</div>
              </div>
            </div>
          </div>

          {/* Product Row Block with Standard Product Cards */}
          <div style={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
            {(() => {
              const saleProducts = products.filter(p => p.oldPrice && p.oldPrice > p.price);

              if (saleProducts.length === 0) return null;

              return (
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                  {/* Slide Left button (Dynamically shown/hidden) */}
                  {showSaleLeftArrow && (
                    <button
                      type="button"
                      onClick={() => {
                        if (saleScrollRef.current) {
                          const itemWidth = saleScrollRef.current.children[0]?.offsetWidth || 0;
                          saleScrollRef.current.scrollBy({ left: -(itemWidth + 20), behavior: 'smooth' });
                        }
                      }}
                      className="btn btn-ghost"
                      style={{
                        position: 'absolute',
                        left: '-8px',
                        zIndex: 10,
                        background: 'rgba(21, 24, 25, 0.9)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 0
                      }}
                    >
                      <ArrowLeft size={18} color="white" />
                    </button>
                  )}

                  {/* Slider Scroll container */}
                  <div
                    ref={saleScrollRef}
                    style={{
                      display: 'flex',
                      gap: '20px',
                      overflowX: 'auto',
                      scrollBehavior: 'smooth',
                      scrollSnapType: 'x mandatory',
                      padding: '10px 4px 20px',
                      width: '100%',
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none'
                    }}
                    className="no-scrollbar"
                  >
                    {saleProducts.map((prod) => (
                      <div key={prod.id} style={{ flex: '0 0 calc(25% - 15px)', minWidth: 'calc(25% - 15px)', maxWidth: 'calc(25% - 15px)', scrollSnapAlign: 'start' }}>
                        <ProductCard
                          product={prod}
                          onAddToCart={onAddToCart}
                          onBuyNow={onBuyNow}
                          isLiked={likedProductIds.includes(prod.id)}
                          onToggleLike={onToggleLike}
                          onViewDetails={onViewDetails}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Slide Right button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (saleScrollRef.current) {
                        const itemWidth = saleScrollRef.current.children[0]?.offsetWidth || 0;
                        saleScrollRef.current.scrollBy({ left: itemWidth + 20, behavior: 'smooth' });
                      }
                    }}
                    className="btn btn-ghost"
                    style={{
                      position: 'absolute',
                      right: '-8px',
                      zIndex: 10,
                      background: 'rgba(21, 24, 25, 0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '50%',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0
                    }}
                  >
                    <ArrowRight size={18} color="white" />
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      <style>{`
        #flash-sale-box {
          border-left: 4px solid var(--color-secondary) !important;
          background: linear-gradient(135deg, rgba(253, 139, 0, 0.05) 0%, rgba(15, 23, 42, 0.4) 100%) !important;
          box-shadow: 0 8px 32px 0 rgba(253, 139, 0, 0.1) !important;
        }

        body.light-theme #flash-sale-box {
          border-left: 4px solid #fd8b00 !important;
          background: linear-gradient(135deg, #fffdf8 0%, #fff0e0 100%) !important;
          box-shadow: 0 10px 40px rgba(253, 139, 0, 0.2) !important;
        }

        .countdown-box {
          background: var(--color-surface-bright);
          color: #ffffff;
          font-weight: 800;
          font-size: 16px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--rounded);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.05);
        }
        .countdown-separator {
          color: #ffffff;
          font-weight: 700;
          font-size: 18px;
        }
        body.light-theme .countdown-box {
          background: #ffffff;
          color: #0f172a;
          box-shadow: 0 6px 16px rgba(15, 23, 42, 0.12);
          border: 1px solid rgba(15, 23, 42, 0.12);
        }
        body.light-theme .countdown-separator {
          color: #0f172a;
        }
        @media (max-width: 899px) {
          .deals-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 768px) {
          .banner-content {
            padding: 24px 0 !important;
          }
          .banner-content h1 {
            font-size: 26px !important;
          }
          .banner-content p {
            font-size: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Flame, Tag } from 'lucide-react';

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
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };
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
      {/* Full-width Dynamic Slide Banner */}
      <div 
        style={{
          position: 'relative',
          height: '460px',
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
              fontSize: '12px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: isLight ? '#b45309' : 'var(--color-secondary-dim)',
              background: isLight ? 'rgba(255, 255, 255, 0.14)' : 'rgba(253, 139, 0, 0.1)',
              border: isLight ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(253, 139, 0, 0.25)',
              padding: '4px 12px',
              borderRadius: 'var(--rounded-full)',
              alignSelf: 'flex-start',
              marginBottom: '16px'
            }}>
              {slide.discount}
            </span>
            <h1 style={{
              fontFamily: 'Montserrat',
              fontSize: '38px',
              fontWeight: 800,
              lineHeight: '1.2',
              maxWidth: '650px',
              marginBottom: '16px',
              color: isLight ? '#0f172a' : '#ffffff',
              textShadow: titleShadow
            }}>
              {slide.title}
            </h1>
            <p style={{
              fontFamily: 'Inter',
              fontSize: '16px',
              color: isLight ? '#475569' : 'var(--color-on-surface-variant)',
              maxWidth: '550px',
              lineHeight: '1.6',
              marginBottom: '24px',
              textShadow: bodyShadow
            }}>
              {slide.subtitle}
            </p>
            <button 
              onClick={() => onCtaClick(currentSlide)}
              className="btn btn-primary"
              style={{ alignSelf: 'flex-start', padding: '12px 28px', fontSize: '15px' }}
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
            width: '44px',
            height: '44px',
            background: controlBg,
            border: controlBorder,
            padding: 0
          }}
        >
          <ArrowLeft size={20} color={controlIconColor} />
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
            width: '44px',
            height: '44px',
            background: controlBg,
            border: controlBorder,
            padding: 0
          }}
        >
          <ArrowRight size={20} color={controlIconColor} />
        </button>

        {/* Slide Indicators */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
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
                width: currentSlide === idx ? '24px' : '8px',
                height: '8px',
                borderRadius: 'var(--rounded-full)',
                background: currentSlide === idx ? 'var(--color-primary)' : indicatorInactive
              }}
            />
          ))}
        </div>
      </div>

      {/* Countdown Flash Sale Banner wrapped in full-width container */}
      <div className="container">
        <div 
          className="glass-panel deals-grid" 
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 2.5fr',
            gap: '24px',
            padding: '24px',
            borderRadius: 'var(--rounded-md)',
            borderLeft: '4px solid var(--color-secondary)',
            alignItems: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Left Block: Countdown Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                background: 'rgba(253, 139, 0, 0.15)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Flame size={22} color="var(--color-secondary)" />
              </div>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'Montserrat', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                  DEALS CHỚP NHOÁNG
                  <span style={{
                    background: 'red',
                    color: 'white',
                    fontSize: '11px',
                    padding: '2px 6px',
                    borderRadius: 'var(--rounded-sm)',
                    animation: 'pulse 1.5s infinite'
                  }}>HOT</span>
                </h2>
                <span style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>Khuyến mãi cực hạn, mua ngay kẻo lỡ!</span>
              </div>
            </div>

            {/* Countdown Ticker */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-on-surface-variant)' }}>Kết thúc:</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div className="countdown-box">{String(timeLeft.hours).padStart(2, '0')}</div>
                <span className="countdown-separator">:</span>
                <div className="countdown-box">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <span className="countdown-separator">:</span>
                <div className="countdown-box">{String(timeLeft.seconds).padStart(2, '0')}</div>
              </div>
            </div>
          </div>

          {/* Right Block: Horizontal Scroll Row of on-sale products */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            {(() => {
              const saleScrollRef = React.createRef();
              const saleProducts = products.filter(p => p.oldPrice && p.oldPrice > p.price);
              
              if (saleProducts.length === 0) return null;

              const formatVND = (value) => {
                return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
              };

              return (
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                  {/* Slide Left button */}
                  <button 
                    type="button"
                    onClick={() => {
                      if (saleScrollRef.current) {
                        saleScrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
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
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0
                    }}
                  >
                    <ArrowLeft size={14} color="white" />
                  </button>

                  {/* Slider Scroll container */}
                  <div 
                    ref={saleScrollRef}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      overflowX: 'auto',
                      scrollBehavior: 'smooth',
                      padding: '4px 0 10px',
                      width: '100%',
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none'
                    }}
                    className="no-scrollbar"
                  >
                    {saleProducts.map((prod) => {
                      const discount = Math.round(((prod.oldPrice - prod.price) / prod.oldPrice) * 100);
                      return (
                        <div 
                          key={prod.id}
                          onClick={() => onViewDetails && onViewDetails(prod)}
                          style={{
                            flex: '0 0 160px',
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: 'var(--rounded)',
                            padding: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            position: 'relative'
                          }}
                          className="list-hover-effect"
                        >
                          {/* Sale Badge */}
                          <span 
                            className="status-badge status-badge-sale" 
                            style={{ 
                              position: 'absolute', 
                              top: '6px', 
                              left: '6px', 
                              fontSize: '9px', 
                              padding: '1px 4px', 
                              zIndex: 2,
                              textTransform: 'none'
                            }}
                          >
                            -{discount}%
                          </span>
                          
                          {/* Product Image */}
                          <div style={{ height: '75px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '4px', background: 'var(--color-surface-container-lowest)' }}>
                            <img src={prod.image} alt={prod.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                          </div>

                          {/* Product Name */}
                          <h5 style={{ fontSize: '11px', fontWeight: '600', color: 'white', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '32px', lineHeight: '1.3' }}>
                            {prod.name}
                          </h5>

                          {/* Prices */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                            <span style={{ fontSize: '10px', textDecoration: 'line-through', color: 'var(--color-outline)' }}>
                              {formatVND(prod.oldPrice)}
                            </span>
                            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-secondary-dim)' }}>
                              {formatVND(prod.price)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Slide Right button */}
                  <button 
                    type="button"
                    onClick={() => {
                      if (saleScrollRef.current) {
                        saleScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
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
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0
                    }}
                  >
                    <ArrowRight size={14} color="white" />
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      <style>{`
        .countdown-box {
          background: var(--color-surface-bright);
          color: #ffffff;
          font-weight: 800;
          font-size: 16px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justifyContent: center;
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

import React, { useState, useEffect, useRef } from 'react';
import './aboutUs.css';
import {
  Cpu,
  Terminal,
  Layers,
  ShieldCheck,
  Sparkles,
  Zap,
  Monitor,
  Activity,
  User,
  Heart,
  ChevronDown,
  ArrowRight,
  Flame,
  Database,
  HardDrive,
  Wind,
  Linkedin,
  Github,
  Twitter
} from 'lucide-react';

// ScrollReveal helper using IntersectionObserver for storytelling elements
function ScrollReveal({ children, delay = 0, duration = 800, direction = 'up', distance = '30px' }) {
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(entry.target); // Animate once
      }
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isIntersecting) return 'translate(0, 0)';
    switch (direction) {
      case 'up': return `translateY(${distance})`;
      case 'down': return `translateY(-${distance})`;
      case 'left': return `translateX(${distance})`;
      case 'right': return `translateX(-${distance})`;
      case 'none': return 'none';
      default: return `translateY(${distance})`;
    }
  };

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${isIntersecting ? 'revealed' : ''}`}
      style={{
        opacity: isIntersecting ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
}

export default function AboutUs({ theme, setActiveView }) {
  const isLight = theme === 'light';
  const [bootStep, setBootStep] = useState(0);
  const [isBooted, setIsBooted] = useState(false);
  const terminalEndRef = useRef(null);

  // Mouse Drag-to-Scroll State for Horizontal Timeline
  const timelineRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const bootLines = [
    'Initializing Kinetic OS kernel v4.26...',
    'Checking hardware resources: OK',
    'CPU: AMD Ryzen 7 7800X3D (8 Cores, 16 Threads) - 100% HEALTH',
    'GPU: NVIDIA GeForce RTX 4080 Super OC (16GB GDDR6X) - OPTIMAL',
    'System Memory: 32GB DDR5 6000MHz - DUAL CHANNEL DETECTED',
    'Establishing connection to Kinetic secure network...',
    'Connecting to [main.kinetic.tech]... Success.',
    'Loading core organizational databases...',
    'Syncing brand values: [QUALITY], [CUSTOMER_FIRST], [INNOVATION]',
    'Starting AI Assistant module...',
    'System initialization successful. Launching Kinetic About Us Portal...'
  ];

  // Boot sequence effect
  useEffect(() => {
    if (bootStep < bootLines.length) {
      const delay = bootStep === 0 ? 300 : Math.random() * 200 + 80;
      const timer = setTimeout(() => {
        setBootStep(prev => prev + 1);
      }, delay);
      return () => setTimeout(() => clearTimeout(timer), delay + 50);
    } else {
      const timer = setTimeout(() => {
        setIsBooted(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [bootStep]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [bootStep]);

  // Drag-to-Scroll Handlers
  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed multiplier
    timelineRef.current.scrollLeft = scrollLeft - walk;
  };

  // 11 milestones representing PC components with short story content
  const milestones = [
    {
      year: '2016',
      title: 'Khởi nguồn đam mê',
      icon: <Cpu size={16} />,
      desc: 'Những lập trình viên và game thủ sáng lập bắt đầu phác thảo ý tưởng về một thương hiệu PC hiệu năng cao, tối ưu phần cứng.'
    },
    {
      year: '2017',
      title: 'Kiến tạo nền móng',
      icon: <Layers size={16} />,
      desc: 'Chính thức thành lập nhóm nghiên cứu chuyên sâu về sơ đồ mạch nguồn, BIOS và hiệu năng lưu thông gió của hệ thống.'
    },
    {
      year: '2018',
      title: 'Tối ưu tốc độ',
      icon: <Activity size={16} />,
      desc: 'Rút ngắn thời gian kiểm thử cấu hình và tối ưu hóa phản hồi khách hàng đa nhiệm mượt mà.'
    },
    {
      year: '2019',
      title: 'Trực quan nghệ thuật',
      icon: <Monitor size={16} />,
      desc: 'Ra mắt các bộ máy tản nhiệt nước custom nghệ thuật đầu tiên, định hình xu hướng cá nhân hóa cấu hình.'
    },
    {
      year: '2020',
      title: 'Số hóa vận hành',
      icon: <Zap size={16} />,
      desc: 'Áp dụng tự động hóa quy trình quản lý kho bãi, tăng tốc độ lắp ráp và giao hàng nhanh chóng.'
    },
    {
      year: '2021',
      title: 'Kho tàng tri thức',
      icon: <Database size={16} />,
      desc: 'Xây dựng cơ sở dữ liệu khổng lồ về các giải pháp tối ưu hóa hệ điều hành và khắc phục sự cố phần cứng.'
    },
    {
      year: '2022',
      title: 'Giữ vững điềm tĩnh',
      icon: <Wind size={16} />,
      desc: 'Duy trì sự ổn định của chuỗi cung ứng linh kiện và dịch vụ chăm sóc khách hàng trước mọi biến động lớn.'
    },
    {
      year: '2023',
      title: 'Nguồn lực dồi dào',
      icon: <Flame size={16} />,
      desc: 'Nâng cấp trang thiết bị kỹ thuật hiện đại và mở rộng nguồn cung linh kiện cao cấp nhập khẩu chính hãng.'
    },
    {
      year: '2024',
      title: 'Bộ khung bảo vệ',
      icon: <ShieldCheck size={16} />,
      desc: 'Hoàn thiện quy chuẩn đóng gói chuyên nghiệp và chính sách bảo hành 1-đổi-1 an tâm hàng đầu thị trường.'
    },
    {
      year: '2025',
      title: 'Cửa sổ tương tác',
      icon: <Monitor size={16} />,
      desc: 'Tích hợp Trợ lý cố vấn AI thông minh giúp người dùng tự thiết kế cấu hình máy tính trực quan, chính xác.'
    },
    {
      year: '2026',
      title: 'Hệ sinh thái trọn vẹn',
      icon: <Sparkles size={16} />,
      desc: 'Hoàn thiện chuỗi trải nghiệm trọn gói từ phần cứng high-end đến các thiết bị gaming gear chuyên nghiệp trọn đời.'
    }
  ];

  const team = [
    {
      name: 'Hàn Minh Tùng',
      role: 'Designer, FE Dev & Cloud Architecture',
      desc: '',
      socials: {}
    },
    {
      name: 'Nguyễn Thuận Phong',
      role: 'BE & DB',
      desc: '',
      socials: {}
    },
    {
      name: 'Nguyễn Tiến Thành',
      role: 'DB & BE',
      desc: '',
      socials: {}
    },
    {
      name: 'Nguyễn Thị Minh Anh',
      role: 'Tester, FE Dev & Designer',
      desc: '',
      socials: {}
    }
  ];

  const partners = [
    { name: 'ASUS ROG', logo: 'https://img.icons8.com/color/96/asus.png' },
    { name: 'Intel', logo: 'https://img.icons8.com/color/96/intel-logo.png' },
    { name: 'AMD', logo: 'https://img.icons8.com/color/96/amd.png' },
    { name: 'NVIDIA', logo: 'https://img.icons8.com/color/96/nvidia.png' },
    { name: 'Apple', logo: 'https://img.icons8.com/ios-filled/100/ffffff/mac-os.png' },
    { name: 'Corsair', logo: 'https://img.icons8.com/color/96/corsair.png' }
  ];

  if (!isBooted) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: '#040711',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: '"Fira Code", "Courier New", monospace',
        overflow: 'hidden'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '720px',
          background: 'rgba(10, 15, 30, 0.9)',
          border: '1px solid #007BFF',
          boxShadow: '0 0 30px rgba(0, 123, 255, 0.25)',
          borderRadius: 'var(--rounded-md)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '420px'
        }}>
          <div style={{
            background: '#070a16',
            padding: '10px 16px',
            borderBottom: '1px solid rgba(0, 123, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={14} color="#007BFF" />
              <span style={{ fontSize: '11px', color: '#adc7ff', fontWeight: 'bold' }}>SYSTEM COMMAND TERMINAL</span>
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }} />
            </div>
          </div>

          <div style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            fontSize: '12px',
            color: '#39ff14',
            lineHeight: '1.5',
            textAlign: 'left'
          }}>
            {bootLines.slice(0, bootStep).map((line, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: '#007BFF', userSelect: 'none' }}>{'>'}</span>
                <span>{line}</span>
              </div>
            ))}
            {bootStep < bootLines.length && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ color: '#007BFF' }}>{'>'}</span>
                <span style={{ width: '8px', height: '14px', background: '#39ff14', animation: 'blink 0.8s infinite' }} />
              </div>
            )}
            <div ref={terminalEndRef} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '80vh', padding: '0 0 60px' }} className="animate-fade-in-up">

      {/* Cinematic Hero Section */}
      <div
        className="about-hero"
        style={{
          backgroundImage: isLight
            ? `linear-gradient(to bottom, rgba(0, 51, 62, 0.45), rgba(255, 255, 255, 0.98)), url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80')`
            : `linear-gradient(to bottom, rgba(4, 7, 17, 0.45), rgba(4, 7, 17, 0.98)), url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80')`
        }}
      >
        <div className="about-hero-container">
          <ScrollReveal direction="down">
            <b className="about-eyebrow">HÀNH TRÌNH KINETIC TECH</b>
            <h1 className="about-title" style={{ color: isLight ? 'var(--color-on-surface)' : 'white' }}>Kiến tạo <em>cỗ máy</em><br />nâng tầm trải nghiệm</h1>
            <p className="about-subtitle">Chúng tôi tin rằng mọi cỗ máy đều là một tác phẩm nghệ thuật công nghệ, là người bạn đồng hành chắp cánh ước mơ.</p>
          </ScrollReveal>

          <div className="scroll-indicator">
            <span className="mouse-icon" style={{ borderColor: isLight ? 'rgba(15, 23, 42, 0.35)' : 'rgba(255, 255, 255, 0.45)' }}>
              <span className="mouse-wheel"></span>
            </span>
            <span className="scroll-text" style={{ color: isLight ? 'var(--color-outline)' : 'rgba(255, 255, 255, 0.55)' }}>Cuộn để khám phá câu chuyện</span>
          </div>
        </div>
      </div>

      {/* About Manifesto Section */}
      <div className="about-manifesto section-padding">
        <div className="manifesto-wrap">
          <ScrollReveal direction="up">
            <h2 className="kinetic-title">
              <span>Không chỉ là phần cứng.</span>
              <span className="text-gradient">Đó là bạn đồng hành,</span>
              <span>nơi chắp cánh những ý tưởng lớn.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={200}>
            <p className="manifesto-desc">
              Kinetic Tech được thành lập từ tình yêu công nghệ mãnh liệt của những lập trình viên và game thủ chuyên nghiệp. Chúng tôi thấu hiểu cảm giác hào hứng khi khởi động cỗ máy mơ ước đầu tiên, và cả sự bực bội khi hệ thống giật lag. Mỗi cấu hình tại Kinetic đều được thiết kế để mang đến hiệu năng tối thượng cùng dịch vụ an tâm trọn đời.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Bento Grid Section (Core Values) */}
      <div className="about-bento section-padding">
        <div className="bento-container">
          <ScrollReveal direction="up">
            <h2 className="section-title text-center" style={{ textTransform: 'uppercase', marginBottom: '3rem' }}>Giá trị cốt lõi</h2>
          </ScrollReveal>

          <div className="bento-grid">
            {/* Cell 1: Vision */}
            <ScrollReveal direction="up" delay={100}>
              <div className="bento-cell cell-large">
                <div className="bento-icon-header">
                  <div className="bento-icon"><Sparkles size={22} style={{ color: 'var(--color-primary-dim)' }} /></div>
                  <span className="bento-tag">TẦM NHÌN</span>
                </div>
                <div className="bento-content">
                  <h3>Trở thành điểm đến PC High-End số 1</h3>
                  <p>Tiên phong ứng dụng các giải pháp tản nhiệt nước custom nghệ thuật và cá nhân hóa cấu hình hiệu năng cao theo yêu cầu độc bản.</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Cell 2: Performance */}
            <ScrollReveal direction="up" delay={200}>
              <div className="bento-cell cell-medium">
                <div className="bento-icon-header">
                  <div className="bento-icon"><Cpu size={22} style={{ color: 'var(--color-primary-dim)' }} /></div>
                  <span className="bento-tag">HIỆU NĂNG</span>
                </div>
                <div className="bento-content">
                  <h3>Hiệu Năng Tối Thượng</h3>
                  <p>Không thỏa hiệp về tốc độ. Tuyển chọn linh kiện nghiêm ngặt, tối ưu cấu hình BIOS giúp giải phóng tối đa sức mạnh phần cứng.</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Cell 3: Trust */}
            <ScrollReveal direction="up" delay={300}>
              <div className="bento-cell cell-medium">
                <div className="bento-icon-header">
                  <div className="bento-icon"><ShieldCheck size={22} style={{ color: 'var(--color-secondary-dim)' }} /></div>
                  <span className="bento-tag">AN TÂM</span>
                </div>
                <div className="bento-content">
                  <h3>An Tâm Tuyệt Đối</h3>
                  <p>100% linh kiện chính hãng. Quy chuẩn lắp ráp nghiêm ngặt đi kèm chính sách bảo hành 1-đổi-1 chủ động siêu tốc trọn đời.</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Cell 4: Community */}
            <ScrollReveal direction="up" delay={400}>
              <div className="bento-cell cell-wide">
                <div className="bento-icon-header">
                  <div className="bento-icon"><User size={22} style={{ color: 'var(--color-primary-dim)' }} /></div>
                  <span className="bento-tag">CỘNG ĐỒNG</span>
                </div>
                <div className="bento-content bento-community-content">
                  <div className="community-text">
                    <h3>Sát cánh & Đồng hành</h3>
                    <p>Chúng tôi xây dựng không gian chia sẻ kinh nghiệm ép xung và tối ưu hóa hệ thống máy tính cho anh em công nghệ.</p>
                  </div>
                  <div className="bento-stats">
                    <div className="stat-item">
                      <span className="stat-num stat-blue">10K+</span>
                      <span className="stat-lbl">Khách hàng</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-num stat-orange">99%</span>
                      <span className="stat-lbl">Hài lòng</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Timeline Section */}
      <div className="about-timeline-section section-padding">
        <div className="timeline-section-container">
          <ScrollReveal direction="up">
            <h2 className="section-title text-center" style={{ textTransform: 'uppercase' }}>Hành trình phát triển</h2>
          </ScrollReveal>

          <div
            className="timeline-container"
            ref={timelineRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            <div className="timeline-track">
              {milestones.map((item, idx) => (
                <div className="timeline-item" key={idx}>
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-dot"></div>
                  <div className="timeline-card glass-panel">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <div className="timeline-card-icon" style={{ color: 'var(--color-primary)' }}>
                        {item.icon}
                      </div>
                      <h4>{item.title}</h4>
                    </div>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="about-team section-padding">
        <div className="team-section-container">
          <ScrollReveal direction="up">
            <h2 className="section-title text-center" style={{ textTransform: 'uppercase', marginBottom: '3rem' }}>Đội ngũ sáng lập</h2>
          </ScrollReveal>

          <div className="team-grid">
            {team.map((member, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 150}>
                <div className="team-card">
                  {member.img && (
                    <div className="team-img-wrapper">
                      <img src={member.img} alt={member.name} />
                    </div>
                  )}
                  <div className="team-info">
                    <h4>{member.name}</h4>
                    <span>{member.role}</span>
                    {member.desc && <p>{member.desc}</p>}
                    {member.socials && Object.keys(member.socials).length > 0 && (
                      <div className="team-socials">
                        {member.socials.linkedin && (
                          <a href={member.socials.linkedin} target="_blank" rel="noreferrer">
                            <Linkedin size={18} />
                          </a>
                        )}
                        {member.socials.github && (
                          <a href={member.socials.github} target="_blank" rel="noreferrer">
                            <Github size={18} />
                          </a>
                        )}
                        {member.socials.twitter && (
                          <a href={member.socials.twitter} target="_blank" rel="noreferrer">
                            <Twitter size={18} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Partners Showcase */}
      <div className="about-partners section-padding">
        <div className="partners-section-container" style={{ textAlign: 'center' }}>
          <ScrollReveal direction="up">
            <h3 style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'Montserrat', color: 'var(--color-on-background)', marginBottom: '30px', textTransform: 'uppercase' }}>
              Đối tác tin cậy
            </h3>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={150}>
            <div className="partners-grid-layout">
              {partners.map((partner, idx) => (
                <div key={idx} className="partner-logo-box">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="partner-logo-pic"
                    style={{
                      height: '36px',
                      objectFit: 'contain',
                      filter: theme === 'light' ? 'grayscale(0.7) contrast(1.1)' : 'grayscale(1) brightness(0.8)',
                      transition: 'all 0.3s ease'
                    }}
                  />
                  <span>{partner.name}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Action CTA Block */}
      <div className="about-cta-wrapper section-padding">
        <ScrollReveal direction="up">
          <div
            className="glass-panel-glow-orange text-center"
            style={{
              borderRadius: 'var(--rounded-lg)',
              padding: '40px 30px',
              border: '1px solid rgba(253, 139, 0, 0.25)',
              background: theme === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(21, 24, 25, 0.75)'
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: '900', color: 'var(--color-on-background)', fontFamily: 'Montserrat' }}>
              Bạn đã sẵn sàng để nâng cấp cấu hình của mình?
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginTop: '8px', marginBottom: '24px' }}>
              Hãy cùng các chuyên gia hàng đầu thiết kế cỗ máy tối thượng ngay hôm nay.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px' }}>
              <button
                onClick={() => setActiveView('deals')}
                className="btn btn-secondary"
                style={{ padding: '12px 24px', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Flame size={15} />
                Khám Phá Sản Phẩm
              </button>
              <button
                onClick={() => setActiveView('pc-builder')}
                className="btn btn-outline"
                style={{ padding: '12px 24px', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Cpu size={15} />
                Build PC Cùng Chuyên Gia
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Combined Embedded CSS Style block matching nhaxanh effects */}

    </div>
  );
}

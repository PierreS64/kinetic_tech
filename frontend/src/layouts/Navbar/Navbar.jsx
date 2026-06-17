import React, { useState, useMemo, useCallback, useLayoutEffect, useEffect, useRef } from 'react';
import './navbar.css';
import { 
  ShoppingCart, 
  Search, 
  Cpu, 
  Bot, 
  Laptop, 
  Smartphone, 
  Keyboard, 
  Flame, 
  Menu, 
  X, 
  ChevronDown, 
  List, 
  User, 
  LogOut,
  HelpCircle,
  Sun,
  Moon,
  Shield,
  RotateCcw
} from 'lucide-react';

export default function Navbar({ 
  activeView, 
  setActiveView, 
  cartItemsCount, 
  toggleCart, 
  searchQuery, 
  setSearchQuery,
  currentUser,
  onLogout,
  theme,
  toggleTheme
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [supportDropdownOpen, setSupportDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [mobileSupportOpen, setMobileSupportOpen] = useState(false);
  const isLight = theme === 'light';

  const categories = useMemo(() => [
    { id: 'laptop', label: 'Laptop', icon: Laptop },
    { id: 'điện thoại', label: 'Điện Thoại', icon: Smartphone },
    { id: 'gaming gear', label: 'Gaming Gear', icon: Keyboard },
    { id: 'linh kiện', label: 'Linh Kiện', icon: Cpu },
  ], []);

  const supportItems = useMemo(() => [
    { id: 'warranty', label: 'Tra Cứu Bảo Hành', desc: 'Đăng ký & kích hoạt trực tuyến' },
    { id: 'order-tracking', label: 'Theo Dõi Đơn Hàng', desc: 'Tra cứu trạng thái vận chuyển 24/7' },
    { id: 'support-ticket', label: 'Ticket Kỹ Thuật', desc: 'Hỗ trợ kỹ thuật phần cứng 24/7' },
    { id: 'about-us', label: 'Về Chúng Tôi', desc: 'Tìm hiểu về Kinetic Tech Store' }
  ], []);

  const navButtonRefs = useRef([]);
  const [navIndicator, setNavIndicator] = useState({ left: 0, width: 0, top: 0, height: 0, opacity: 0 });

  const updateIndicator = useCallback(() => {
    const isCategoryView = ['laptop', 'điện thoại', 'gaming gear', 'linh kiện'].includes(activeView);
    const isSupportView = ['warranty', 'order-tracking', 'support-ticket', 'about-us'].includes(activeView);
    const isTradeInView = activeView === 'trade-in';
    const activeIndex = isCategoryView ? 0 : 
                       isTradeInView ? 1 :
                       isSupportView ? 2 : -1;
                       
    const activeButton = navButtonRefs.current[activeIndex];
    const navList = activeButton?.closest('ul');

    if (activeIndex === -1 || !activeButton || !navList) {
      setNavIndicator((prev) => (prev.opacity === 0 ? prev : { ...prev, opacity: 0 }));
      return;
    }

    const listRect = navList.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    const nextIndicator = {
      left: buttonRect.left - listRect.left,
      width: buttonRect.width,
      top: buttonRect.top - listRect.top,
      height: buttonRect.height,
      opacity: 1
    };

    setNavIndicator((prev) => {
      const isSame =
        prev.left === nextIndicator.left &&
        prev.width === nextIndicator.width &&
        prev.top === nextIndicator.top &&
        prev.height === nextIndicator.height &&
        prev.opacity === nextIndicator.opacity;

      return isSame ? prev : nextIndicator;
    });
  }, [activeView]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [activeView, updateIndicator]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  const handleNavClick = (viewId) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 90,
      width: '100%',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px',
        gap: '24px'
      }}>
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('deals')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            background: isLight
              ? 'linear-gradient(135deg, #1d4ed8, #f59e0b)'
              : 'linear-gradient(135deg, #007BFF, #fd8b00)',
            width: '40px',
            height: '40px',
            borderRadius: 'var(--rounded-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: isLight ? '1px solid rgba(29, 78, 216, 0.25)' : '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: isLight
              ? '0 10px 20px rgba(29, 78, 216, 0.18)'
              : '0 0 15px rgba(0, 123, 255, 0.3)'
          }}>
            <Cpu size={22} color="white" />
          </div>
          <div>
            <span className="brand-logo-text" style={{
              fontFamily: 'Montserrat',
              fontWeight: 800,
              fontSize: '20px',
              letterSpacing: '-0.5px',
              background: theme === 'light' ? 'linear-gradient(90deg, #091e42, #0052cc)' : 'linear-gradient(90deg, #ffffff, #adc7ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>KINETIC</span>
            <span className="brand-logo-subtext" style={{
              fontFamily: 'Montserrat',
              fontWeight: 700,
              fontSize: '14px',
              letterSpacing: '1px',
              color: 'var(--color-secondary)',
              display: 'block',
              marginTop: '-5px'
            }}>TECH</span>
          </div>
        </div>

        {/* Desktop Navigation with Dropdowns */}
        <nav style={{ display: 'none', position: 'relative' }} className="desktop-nav">
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            gap: '12px',
            position: 'relative',
            alignItems: 'center'
          }}>
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: navIndicator.left,
                top: navIndicator.top,
                width: navIndicator.width,
                height: navIndicator.height,
                background: 'rgba(0, 123, 255, 0.15)',
                border: '1px solid rgba(0, 123, 255, 0.3)',
                borderRadius: 'var(--rounded-md)',
                transition: 'all 260ms ease',
                opacity: navIndicator.opacity,
                pointerEvents: 'none'
              }}
            />
            
            {/* Categories Dropdown Button */}
            <li 
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              style={{ position: 'relative' }}
            >
              <button
                ref={(element) => {
                  navButtonRefs.current[0] = element;
                }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="btn btn-ghost"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  zIndex: 1,
                  color: ['laptop', 'điện thoại', 'gaming gear', 'linh kiện'].includes(activeView) ? 'var(--color-active-nav-text, #ffffff)' : 'var(--color-on-surface-variant)',
                  background: 'transparent',
                  border: '1px solid transparent',
                  padding: '8px 14px',
                  borderRadius: 'var(--rounded-md)'
                }}
              >
                <List size={16} color={['laptop', 'điện thoại', 'gaming gear', 'linh kiện'].includes(activeView) ? 'var(--color-primary-dim)' : 'currentColor'} />
                Danh Mục
                <ChevronDown size={12} style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {/* Dropdown Menu Wrapper (Gaps hover bridge) */}
              {dropdownOpen && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    paddingTop: '8px',
                    width: '200px',
                    zIndex: 100
                  }}
                >
                  <div className="glass-panel animate-fade-in-up global-dropdown-menu">
                    {categories.map((cat) => {
                      const CatIcon = cat.icon;
                      const isCatActive = activeView === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            handleNavClick(cat.id);
                            setDropdownOpen(false);
                          }}
                          className={`btn btn-ghost global-dropdown-item ${isCatActive ? 'active' : ''}`}
                        >
                          <CatIcon size={14} color={isCatActive ? 'var(--color-primary-dim)' : 'currentColor'} />
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </li>

            {/* Trade-In Link */}
            <li>
              <button
                ref={(element) => {
                  navButtonRefs.current[1] = element;
                }}
                onClick={() => handleNavClick('trade-in')}
                className="btn btn-ghost"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  zIndex: 1,
                  color: activeView === 'trade-in' ? 'var(--color-active-nav-text, #ffffff)' : 'var(--color-on-surface-variant)',
                  background: 'transparent',
                  border: '1px solid transparent',
                  padding: '8px 14px',
                  borderRadius: 'var(--rounded-md)'
                }}
              >
                <RotateCcw size={16} color={activeView === 'trade-in' ? 'var(--color-primary-dim)' : 'currentColor'} />
                Thu cũ đổi mới
              </button>
            </li>

            {/* Services & Support Dropdown Button */}
            <li 
              onMouseEnter={() => setSupportDropdownOpen(true)}
              onMouseLeave={() => setSupportDropdownOpen(false)}
              style={{ position: 'relative' }}
            >
              <button
                ref={(element) => {
                  navButtonRefs.current[2] = element;
                }}
                onClick={() => setSupportDropdownOpen(!supportDropdownOpen)}
                className="btn btn-ghost"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  zIndex: 1,
                  color: ['warranty', 'order-tracking', 'support-ticket', 'about-us'].includes(activeView) ? 'var(--color-active-nav-text, #ffffff)' : 'var(--color-on-surface-variant)',
                  background: 'transparent',
                  border: '1px solid transparent',
                  padding: '8px 14px',
                  borderRadius: 'var(--rounded-md)'
                }}
              >
                <HelpCircle size={16} color={['warranty', 'order-tracking', 'support-ticket', 'about-us'].includes(activeView) ? 'var(--color-primary-dim)' : 'currentColor'} />
                Hỗ Trợ
                <ChevronDown size={12} style={{ transform: supportDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {/* Support Dropdown Menu Wrapper (Gaps hover bridge) */}
              {supportDropdownOpen && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    paddingTop: '8px',
                    width: '240px',
                    zIndex: 100
                  }}
                >
                  <div className="glass-panel animate-fade-in-up global-dropdown-menu">
                    {supportItems.map((item) => {
                      const isItemActive = activeView === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            handleNavClick(item.id);
                            setSupportDropdownOpen(false);
                          }}
                          className={`btn btn-ghost global-dropdown-item multi-line ${isItemActive ? 'active' : ''}`}
                        >
                          <span className="dropdown-title">{item.label}</span>
                          <span className="dropdown-desc">{item.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </li>
          </ul>
        </nav>

        {/* Search Bar */}
        <div style={{
          position: 'relative',
          flex: '1',
          maxWidth: '220px',
          display: 'none',
          margin: '0 10px'
        }} className="desktop-search">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{
              paddingLeft: '34px',
              fontSize: '12px',
              paddingTop: '8px',
              paddingBottom: '8px'
            }}
          />
          <Search size={14} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--color-outline)'
          }} />
        </div>

        {/* CTA Tools (Theme, PC Builder, AI, User Account, Cart) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost"
            style={{
              padding: '8px',
              borderRadius: 'var(--rounded-md)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(255, 255, 255, 0.03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              cursor: 'pointer',
              color: 'var(--color-on-surface)'
            }}
            title={theme === 'light' ? 'Chuyển sang Chế độ tối' : 'Chuyển sang Chế độ sáng'}
          >
            {theme === 'light' ? <Moon size={16} color="#fd8b00" /> : <Sun size={16} color="#ffb300" />}
          </button>

          {/* Custom PC Builder */}
          <button
            onClick={() => handleNavClick('pc-builder')}
            className={`btn ${activeView === 'pc-builder' ? 'btn-primary' : 'btn-outline'}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              whiteSpace: 'nowrap',
              padding: '8px 12px',
              borderRadius: 'var(--rounded-md)'
            }}
          >
            <Cpu size={15} />
            <b className="hide-mobile" style={{ whiteSpace: 'nowrap' }}>Tự Build PC</b>
            <span className="show-mobile">Build PC</span>
          </button>

          {/* User Profile dropdown */}
          <div 
            onMouseEnter={() => currentUser && setUserDropdownOpen(true)}
            onMouseLeave={() => currentUser && setUserDropdownOpen(false)}
            style={{ position: 'relative' }}
          >
            {currentUser ? (
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="btn btn-ghost"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  padding: '8px 10px',
                  borderRadius: 'var(--rounded-md)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: 'white'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '11px'
                }}>
                  {currentUser.fullName.charAt(0).toUpperCase()}
                </div>
                <span className="hide-mobile" style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentUser.fullName.split(' ').pop()}
                </span>
                <ChevronDown size={14} />
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('login')}
                className={`btn ${activeView === 'login' ? 'btn-primary' : 'btn-outline'}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  padding: '8px 12px',
                  borderRadius: 'var(--rounded-md)',
                }}
              >
                <User size={14} />
                <b className="hide-mobile">Đăng Nhập</b>
                <b className="show-mobile">Login</b>
              </button>
            )}

            {/* Dropdown Options for Logged In User */}
            {currentUser && userDropdownOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  paddingTop: '8px',
                  width: '180px',
                  zIndex: 100
                }}
              >
                <div className="glass-panel animate-fade-in-up global-dropdown-menu">
                  <div style={{ 
                    padding: '8px 12px', 
                    fontSize: '11px', 
                    color: 'var(--color-outline)', 
                    borderBottom: '1px solid rgba(255,255,255,0.06)', 
                    marginBottom: '4px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {currentUser.fullName}
                  </div>
                  <button
                    onClick={() => {
                      setActiveView('account');
                      setUserDropdownOpen(false);
                    }}
                    className="btn btn-ghost global-dropdown-item"
                  >
                    <User size={14} />
                    Tài khoản của tôi
                  </button>
                  {currentUser.username === 'admin' && (
                    <button
                      onClick={() => {
                        setActiveView('admin');
                        setUserDropdownOpen(false);
                      }}
                      className="btn btn-ghost global-dropdown-item item-primary"
                    >
                      <Shield size={14} />
                      Trang quản lý
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onLogout();
                      setUserDropdownOpen(false);
                      setActiveView('deals');
                    }}
                    className="btn btn-ghost global-dropdown-item item-danger"
                  >
                    <LogOut size={14} />
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-ghost show-mobile-menu-btn"
            style={{
              padding: '8px',
              display: 'flex'
            }}
          >
            {mobileMenuOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="glass-panel animate-fade-in-up" style={{
          position: 'absolute',
          top: '72px',
          left: 0,
          width: '100%',
          padding: '20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 89
        }}>
          {/* User Account Info on Mobile */}
          <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '16px', marginBottom: '8px' }}>
            {currentUser ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 8px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '13px'
                  }}>
                    {currentUser.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: 'white' }}>{currentUser.fullName}</h4>
                    <p style={{ fontSize: '11px', color: 'var(--color-outline)' }}>{currentUser.email}</p>
                  </div>
                </div>
                {currentUser.username === 'admin' && (
                  <button
                    onClick={() => {
                      setActiveView('admin');
                      setMobileMenuOpen(false);
                    }}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <Shield size={14} />
                    Trang quản lý (Admin)
                  </button>
                )}
                <button
                  onClick={() => {
                    setActiveView('account');
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--color-primary)' }}
                >
                  <User size={14} />
                  Tài khoản của tôi
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                    setActiveView('deals');
                  }}
                  className="btn btn-outline"
                  style={{ width: '100%', padding: '10px', color: 'var(--color-error)', borderColor: 'rgba(255, 76, 76, 0.3)' }}
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('login')}
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px' }}
              >
                Đăng nhập / Đăng ký
              </button>
            )}
          </div>

          {/* Mobile Search */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '34px' }}
            />
            <Search size={14} style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-outline)'
            }} />
          </div>

          {/* Navigation Links */}
          <ul style={{
            display: 'flex',
            flexDirection: 'column',
            listStyle: 'none',
            gap: '8px'
          }}>
            {/* Mobile Dropdown for Categories */}
            <li>
              <button
                onClick={() => {
                  setMobileDropdownOpen(!mobileDropdownOpen);
                  setMobileSupportOpen(false);
                }}
                className="btn btn-ghost"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  color: ['laptop', 'điện thoại', 'gaming gear', 'linh kiện'].includes(activeView) ? '#ffffff' : 'var(--color-on-surface-variant)',
                  background: ['laptop', 'điện thoại', 'gaming gear', 'linh kiện'].includes(activeView) ? 'rgba(0, 123, 255, 0.05)' : 'transparent',
                  padding: '12px 16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <List size={18} />
                  Danh Mục Sản Phẩm
                </div>
                <ChevronDown size={16} style={{ transform: mobileDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {mobileDropdownOpen && (
                <ul style={{
                  listStyle: 'none',
                  paddingLeft: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  marginTop: '4px'
                }}>
                  {categories.map((cat) => {
                    const CatIcon = cat.icon;
                    const isActive = activeView === cat.id;
                    return (
                      <li key={cat.id}>
                        <button
                          onClick={() => handleNavClick(cat.id)}
                          className={`btn btn-ghost global-dropdown-item ${isActive ? 'active' : ''}`}
                        >
                          <CatIcon size={14} color={isActive ? 'var(--color-primary-dim)' : 'currentColor'} />
                          {cat.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>

            {/* Mobile Trade-In Link */}
            <li>
              <button
                onClick={() => handleNavClick('trade-in')}
                className="btn btn-ghost"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: '12px',
                  color: activeView === 'trade-in' ? '#ffffff' : 'var(--color-on-surface-variant)',
                  background: activeView === 'trade-in' ? 'rgba(0, 123, 255, 0.05)' : 'transparent',
                  padding: '12px 16px'
                }}
              >
                <RotateCcw size={18} color={activeView === 'trade-in' ? 'var(--color-primary-dim)' : 'currentColor'} />
                Thu Cũ Đổi Mới
              </button>
            </li>

            {/* Mobile Dropdown for Support & Services */}
            <li>
              <button
                onClick={() => {
                  setMobileSupportOpen(!mobileSupportOpen);
                  setMobileDropdownOpen(false);
                }}
                className="btn btn-ghost"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  color: ['warranty', 'order-tracking', 'support-ticket', 'about-us'].includes(activeView) ? '#ffffff' : 'var(--color-on-surface-variant)',
                  background: ['warranty', 'order-tracking', 'support-ticket', 'about-us'].includes(activeView) ? 'rgba(0, 123, 255, 0.05)' : 'transparent',
                  padding: '12px 16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <HelpCircle size={18} />
                  Hỗ Trợ Dịch Vụ
                </div>
                <ChevronDown size={16} style={{ transform: mobileSupportOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {mobileSupportOpen && (
                <ul style={{
                  listStyle: 'none',
                  paddingLeft: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  marginTop: '4px'
                }}>
                  {supportItems.map((item) => {
                    const isActive = activeView === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => handleNavClick(item.id)}
                          className={`btn btn-ghost global-dropdown-item multi-line ${isActive ? 'active' : ''}`}
                        >
                          <span className="dropdown-title">{item.label}</span>
                          <span className="dropdown-desc">{item.desc}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          </ul>
        </div>
      )}

      {/* Embedded CSS rules for media queries responsive layout inside JS */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: block !important;
          }
          .desktop-search {
            display: block !important;
          }
          .show-mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 1023px) {
          .hide-mobile {
            display: none !important;
          }
        }
        @media (min-width: 1024px) {
          .show-mobile {
            display: none !important;
          }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      `}</style>
    </header>
  );
}

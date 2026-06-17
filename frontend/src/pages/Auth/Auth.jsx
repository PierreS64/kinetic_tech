import React, { useState } from 'react';
import { User, Mail, Lock, Phone, ArrowRight, UserPlus, LogIn, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Auth({ onLoginSuccess, initialTab = 'login', onBackToHome }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'login' or 'register'
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('Vui lòng điền đầy đủ Tên đăng nhập và Mật khẩu.');
      return;
    }

    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      const username = formData.username.trim().toLowerCase();
      const password = formData.password;

      if (username === 'admin' && password === 'admin123') {
        const mockUser = {
          username: 'admin',
          fullName: 'Quản Trị Viên (Admin)',
          email: 'admin@kinetic.vn',
          phone: '0987654321',
          role: 'admin'
        };
        setSuccessMsg('Đăng nhập thành công với quyền Admin! Chào mừng quay trở lại.');
        setTimeout(() => {
          onLoginSuccess(mockUser);
        }, 1200);
      } else if (username === 'guest' && password === 'guest123') {
        const mockUser = {
          username: 'guest',
          fullName: 'Khách Hàng KINETIC',
          email: 'guest@kinetic.vn',
          phone: '0987654321',
          role: 'guest'
        };
        setSuccessMsg('Đăng nhập thành công! Chào mừng quay trở lại.');
        setTimeout(() => {
          onLoginSuccess(mockUser);
        }, 1200);
      } else {
        setError('Tên đăng nhập hoặc Mật khẩu không đúng. Thử admin/admin123 hoặc guest/guest123.');
      }
    }, 1200);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, fullName, phone } = formData;

    if (!email || !password || !confirmPassword || !fullName || !phone) {
      setError('Vui lòng điền đầy đủ tất cả các trường.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải dài ít nhất 6 ký tự.');
      return;
    }

    setLoading(true);
    // Simulate API registration
    setTimeout(() => {
      setLoading(false);
      const mockUser = {
        username: email.split('@')[0],
        fullName: fullName,
        email: email,
        phone: phone
      };
      setSuccessMsg('Tạo tài khoản thành công! Tự động đăng nhập...');
      setTimeout(() => {
        onLoginSuccess(mockUser);
      }, 1500);
    }, 1200);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      padding: '20px',
      position: 'relative'
    }}>
      {/* Background ambient glowing shapes */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '25%',
        width: '300px',
        height: '300px',
        background: 'rgba(0, 123, 255, 0.15)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '25%',
        width: '300px',
        height: '300px',
        background: 'rgba(253, 139, 0, 0.1)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div 
        className="glass-panel-glow-blue animate-fade-in-up" 
        style={{
          width: '100%',
          maxWidth: '460px',
          borderRadius: 'var(--rounded-lg)',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Header Tab toggles */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(0, 0, 0, 0.2)'
        }}>
          <button
            onClick={() => {
              setActiveTab('login');
              setError('');
              setSuccessMsg('');
            }}
            style={{
              flex: 1,
              padding: '16px',
              background: activeTab === 'login' ? 'transparent' : 'rgba(0,0,0,0.1)',
              border: 'none',
              color: activeTab === 'login' ? 'white' : 'var(--color-on-surface-variant)',
              fontWeight: '700',
              fontSize: '15px',
              cursor: 'pointer',
              borderBottom: activeTab === 'login' ? '2px solid var(--color-primary)' : 'none',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <LogIn size={16} />
            ĐĂNG NHẬP
          </button>
          <button
            onClick={() => {
              setActiveTab('register');
              setError('');
              setSuccessMsg('');
            }}
            style={{
              flex: 1,
              padding: '16px',
              background: activeTab === 'register' ? 'transparent' : 'rgba(0,0,0,0.1)',
              border: 'none',
              color: activeTab === 'register' ? 'white' : 'var(--color-on-surface-variant)',
              fontWeight: '700',
              fontSize: '15px',
              cursor: 'pointer',
              borderBottom: activeTab === 'register' ? '2px solid var(--color-primary)' : 'none',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <UserPlus size={16} />
            ĐĂNG KÝ
          </button>
        </div>

        {/* Content body */}
        <div style={{ padding: '32px 28px' }}>
          
          {/* Logo & Welcome text */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '0.5px' }}>
              {activeTab === 'login' ? 'KINETIC TECH SIGN IN' : 'CREATE KINETIC ACCOUNT'}
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '6px' }}>
              {activeTab === 'login' 
                ? 'Đăng nhập để lưu cấu hình PC và nhận ưu đãi riêng biệt.' 
                : 'Đăng ký tài khoản để bắt đầu trải nghiệm mua sắm hi-end.'}
            </p>
          </div>

          {successMsg ? (
            /* Success Feedback */
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 10px',
              textAlign: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(76, 175, 80, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(76, 175, 80, 0.3)'
              }}>
                <CheckCircle2 size={32} color="#81c784" />
              </div>
              <div>
                <h4 style={{ color: '#81c784', fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>
                  Thao Tác Thành Công!
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
                  {successMsg}
                </p>
              </div>
            </div>
          ) : (
            /* Forms */
            <form onSubmit={activeTab === 'login' ? handleLogin : handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Error messages */}
              {error && (
                <div style={{
                  background: 'rgba(255, 76, 76, 0.1)',
                  border: '1px solid rgba(255, 76, 76, 0.3)',
                  borderRadius: 'var(--rounded)',
                  padding: '10px 14px',
                  color: '#ff8a8a',
                  fontSize: '12px',
                  lineHeight: '1.4'
                }}>
                  {error}
                </div>
              )}

              {activeTab === 'login' ? (
                /* Login fields */
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>Tên đăng nhập hoặc Email</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        name="username"
                        placeholder="Nhập tên đăng nhập hoặc email..."
                        value={formData.username}
                        onChange={handleInputChange}
                        className="form-input"
                        style={{ paddingLeft: '38px', fontSize: '13px' }}
                      />
                      <User size={16} style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--color-outline)'
                      }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>Mật khẩu</label>
                      <span style={{ fontSize: '11px', color: 'var(--color-primary-dim)', cursor: 'pointer' }}>Quên mật khẩu?</span>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="password"
                        name="password"
                        placeholder="Nhập mật khẩu..."
                        value={formData.password}
                        onChange={handleInputChange}
                        className="form-input"
                        style={{ paddingLeft: '38px', fontSize: '13px' }}
                      />
                      <Lock size={16} style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--color-outline)'
                      }} />
                    </div>
                  </div>
                </>
              ) : (
                /* Register fields */
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>Họ và tên</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Họ và tên của bạn..."
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="form-input"
                        style={{ paddingLeft: '38px', fontSize: '13px' }}
                      />
                      <User size={16} style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--color-outline)'
                      }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>Địa chỉ Email</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="email"
                        name="email"
                        placeholder="example@gmail.com..."
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        style={{ paddingLeft: '38px', fontSize: '13px' }}
                      />
                      <Mail size={16} style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--color-outline)'
                      }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>Số điện thoại</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="0987xxxxxx..."
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-input"
                        style={{ paddingLeft: '38px', fontSize: '13px' }}
                      />
                      <Phone size={16} style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--color-outline)'
                      }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>Mật khẩu</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="password"
                        name="password"
                        placeholder="Tối thiểu 6 ký tự..."
                        value={formData.password}
                        onChange={handleInputChange}
                        className="form-input"
                        style={{ paddingLeft: '38px', fontSize: '13px' }}
                      />
                      <Lock size={16} style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--color-outline)'
                      }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>Xác nhận mật khẩu</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Nhập lại mật khẩu..."
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="form-input"
                        style={{ paddingLeft: '38px', fontSize: '13px' }}
                      />
                      <Lock size={16} style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--color-outline)'
                      }} />
                    </div>
                  </div>
                </>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '12px',
                  marginTop: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {loading ? (
                  <b>Đang xử lý...</b>
                ) : (
                  <>
                    <b>{activeTab === 'login' ? 'ĐĂNG NHẬP NGAY' : 'TẠO TÀI KHOẢN'}</b>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              {/* Security Shield badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                color: 'var(--color-outline)',
                fontSize: '11px',
                marginTop: '6px'
              }}>
                <ShieldCheck size={14} color="#81c784" />
                <span>Bảo mật kết nối SSL mã hóa 256-bit</span>
              </div>
            </form>
          )}

          {/* Guest go back to home */}
          {!successMsg && (
            <div style={{
              textAlign: 'center',
              marginTop: '20px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              paddingTop: '16px'
            }}>
              <span 
                onClick={onBackToHome}
                style={{
                  fontSize: '12px',
                  color: 'var(--color-outline)',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Quay lại trang chủ (Xem cửa hàng)
              </span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

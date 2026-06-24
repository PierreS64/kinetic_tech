import React, { useState } from 'react';
import { User, Mail, Lock, Phone, ArrowRight, UserPlus, LogIn, CheckCircle2, ShieldCheck, Facebook } from 'lucide-react';
import api from '../../utils/api';

export default function Auth({ onLoginSuccess, initialTab = 'login', onBackToHome }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'login' or 'register'
  const [activeReview, setActiveReview] = useState(0);
  const [fade, setFade] = useState(true);
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

  const reviews = [
    {
      text: "Từ khi mua PC tại Kinetic, hiệu suất công việc của tôi tăng lên rõ rệt. Dịch vụ chăm sóc khách hàng cực kỳ tận tâm.",
      author: "Hoàng Nam",
      role: "Designer tại Studio X",
      avatar: "H",
      color: "var(--color-primary)"
    },
    {
      text: "Giao diện cấu hình PC quá thông minh. Tôi không rành phần cứng nhưng vẫn build được bộ máy ưng ý với giá rất tốt.",
      author: "Thu Trà",
      role: "Content Creator",
      avatar: "T",
      color: "var(--color-secondary)"
    },
    {
      text: "Giao hàng thần tốc, đóng gói cực kỳ cẩn thận. Chắc chắn sẽ quay lại ủng hộ Kinetic Tech dài dài.",
      author: "Minh Quân",
      role: "Gamer",
      avatar: "M",
      color: "#10b981"
    },
    {
      text: "Chính sách bảo hành tận nơi rất tiện lợi. PC bị lỗi RAM và được kỹ thuật viên đến thay mới ngay trong ngày.",
      author: "Lê Đức",
      role: "Software Engineer",
      avatar: "L",
      color: "#8b5cf6"
    },
    {
      text: "Dịch vụ thu cũ đổi mới giá rất hợp lý. Nhờ vậy mình nâng cấp được dàn máy mới tiết kiệm được khá nhiều chi phí.",
      author: "Bích Ngọc",
      role: "Video Editor",
      avatar: "B",
      color: "#ec4899"
    },
    {
      text: "Đội ngũ tư vấn nhiệt tình, không chèo kéo linh kiện đắt tiền mà tư vấn đúng với nhu cầu thực tế. Tuyệt vời!",
      author: "Tiến Đạt",
      role: "Sinh viên",
      avatar: "D",
      color: "#0ea5e9"
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActiveReview((prev) => (prev + 1) % reviews.length);
        setFade(true);
      }, 400); // Wait for fade out
    }, 7000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('Vui lòng điền đầy đủ Tên đăng nhập và Mật khẩu.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/login', {
        email: formData.username.trim().toLowerCase(),
        password: formData.password
      });
      setSuccessMsg('Đăng nhập thành công! Chào mừng quay trở lại.');
      setTimeout(() => { onLoginSuccess(response.data.user, response.data.access_token); }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Tên đăng nhập hoặc Mật khẩu không đúng.');
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
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
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,20}$/;
    if (!passwordRegex.test(password)) {
      setError('Mật khẩu phải từ 6-20 ký tự, gồm ít nhất 1 chữ hoa, 1 chữ thường và 1 ký tự đặc biệt');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/register', { email, password, fullName, phone });
      
      const loginRes = await api.post('/auth/login', { email, password });
      
      setSuccessMsg('Tạo tài khoản thành công! Tự động đăng nhập...');
      setTimeout(() => { onLoginSuccess(loginRes.data.user, loginRes.data.access_token); }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi tạo tài khoản.');
      setLoading(false);
    }
  };

  // Shared input style
  const inputContainerStyle = {
    display: 'flex', flexDirection: 'column', gap: '8px'
  };
  const labelStyle = {
    fontSize: '13px', fontWeight: '600', color: 'var(--color-on-surface)'
  };
  const inputWrapperStyle = {
    position: 'relative', display: 'flex', alignItems: 'center'
  };
  const iconStyle = {
    position: 'absolute', left: '16px', color: 'var(--color-outline)'
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '85vh',
      padding: '24px 16px',
    }}>

      {/* Split-screen container */}
      <div className="animate-fade-in-up" style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        maxWidth: '1100px',
        backgroundColor: 'var(--color-surface-container)',
        borderRadius: 'var(--rounded-xl)',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>

        {/* Left Side: Form Area */}
        <div style={{
          flex: '1 1 50%',
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}>
          {/* Back button */}
          {!successMsg && (
            <button
              onClick={onBackToHome}
              style={{
                background: 'none', border: 'none', color: 'var(--color-outline)',
                fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                marginBottom: '40px', alignSelf: 'flex-start', fontWeight: '500'
              }}
            >
              ← Quay lại trang chủ
            </button>
          )}

          <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>

            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--color-on-surface)', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                {activeTab === 'login' ? 'Chào mừng trở lại' : 'Tạo tài khoản'}
              </h2>
              <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '14px', lineHeight: '1.5' }}>
                {activeTab === 'login'
                  ? 'Vui lòng đăng nhập để tiếp tục trải nghiệm tại Kinetic.'
                  : 'Tham gia cùng Kinetic để trải nghiệm không gian công nghệ đỉnh cao.'}
              </p>
            </div>

            {/* Social Logins */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
              <button 
                onClick={(e) => { e.preventDefault(); window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/google`; }}
                style={{
                flex: 1, height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: 'var(--color-surface)', border: '1px solid var(--color-outline-variant)',
                borderRadius: 'var(--rounded-md)', color: 'var(--color-on-surface)', fontWeight: '600', cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                Google
              </button>
              <button 
                onClick={(e) => { e.preventDefault(); window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/facebook`; }}
                style={{
                flex: 1, height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: 'var(--color-surface)', border: '1px solid var(--color-outline-variant)',
                borderRadius: 'var(--rounded-md)', color: 'var(--color-on-surface)', fontWeight: '600', cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                <Facebook size={18} color="#1877F2" fill="#1877F2" />
                Facebook
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-outline-variant)' }} />
              <span style={{ fontSize: '12px', color: 'var(--color-outline)', textTransform: 'uppercase', letterSpacing: '1px' }}>hoặc</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-outline-variant)' }} />
            </div>

            {successMsg ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <CheckCircle2 size={48} color="#81c784" style={{ margin: '0 auto 16px' }} />
                <h4 style={{ color: '#81c784', fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Thành Công!</h4>
                <p style={{ color: 'var(--color-on-surface-variant)' }}>{successMsg}</p>
              </div>
            ) : (
              <form onSubmit={activeTab === 'login' ? handleLogin : handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {error && (
                  <div style={{ background: 'rgba(255, 76, 76, 0.1)', border: '1px solid rgba(255, 76, 76, 0.3)', borderRadius: 'var(--rounded)', padding: '12px', color: '#ff8a8a', fontSize: '13px' }}>
                    {error}
                  </div>
                )}

                {activeTab === 'login' ? (
                  <>
                    <div style={inputContainerStyle}>
                      <label style={labelStyle}>Tên đăng nhập hoặc Email</label>
                      <div style={inputWrapperStyle}>
                        <User size={18} style={iconStyle} />
                        <input
                          type="text" name="username" placeholder="Nhập tên đăng nhập hoặc email"
                          value={formData.username} onChange={handleInputChange}
                          className="form-input" style={{ paddingLeft: '44px', height: '48px', width: '100%' }}
                        />
                      </div>
                    </div>

                    <div style={inputContainerStyle}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label style={labelStyle}>Mật khẩu</label>
                        <span style={{ fontSize: '12px', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: '500' }}>Quên mật khẩu?</span>
                      </div>
                      <div style={inputWrapperStyle}>
                        <Lock size={18} style={iconStyle} />
                        <input
                          type="password" name="password" placeholder="Nhập mật khẩu"
                          value={formData.password} onChange={handleInputChange}
                          className="form-input" style={{ paddingLeft: '44px', height: '48px', width: '100%' }}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={inputContainerStyle}>
                      <label style={labelStyle}>Họ và tên</label>
                      <div style={inputWrapperStyle}>
                        <User size={18} style={iconStyle} />
                        <input
                          type="text" name="fullName" placeholder="VD: Nguyễn Văn A"
                          value={formData.fullName} onChange={handleInputChange}
                          className="form-input" style={{ paddingLeft: '44px', height: '48px', width: '100%' }}
                        />
                      </div>
                    </div>

                    <div style={inputContainerStyle}>
                      <label style={labelStyle}>Địa chỉ Email</label>
                      <div style={inputWrapperStyle}>
                        <Mail size={18} style={iconStyle} />
                        <input
                          type="email" name="email" placeholder="example@gmail.com"
                          value={formData.email} onChange={handleInputChange}
                          className="form-input" style={{ paddingLeft: '44px', height: '48px', width: '100%' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                      <div style={{ ...inputContainerStyle, flex: 1 }}>
                        <label style={labelStyle}>Mật khẩu</label>
                        <div style={inputWrapperStyle}>
                          <Lock size={18} style={iconStyle} />
                          <input
                            type="password" name="password" placeholder="Tối thiểu 6 ký tự"
                            value={formData.password} onChange={handleInputChange}
                            className="form-input" style={{ paddingLeft: '44px', height: '48px', width: '100%' }}
                          />
                        </div>
                      </div>

                      <div style={{ ...inputContainerStyle, flex: 1 }}>
                        <label style={labelStyle}>Xác nhận MK</label>
                        <div style={inputWrapperStyle}>
                          <Lock size={18} style={iconStyle} />
                          <input
                            type="password" name="confirmPassword" placeholder="Nhập lại"
                            value={formData.confirmPassword} onChange={handleInputChange}
                            className="form-input" style={{ paddingLeft: '44px', height: '48px', width: '100%' }}
                          />
                        </div>
                      </div>
                    </div>

                    <div style={inputContainerStyle}>
                      <label style={labelStyle}>Số điện thoại</label>
                      <div style={inputWrapperStyle}>
                        <Phone size={18} style={iconStyle} />
                        <input
                          type="tel" name="phone" placeholder="0987xxxxxx"
                          value={formData.phone} onChange={handleInputChange}
                          className="form-input" style={{ paddingLeft: '44px', height: '48px', width: '100%' }}
                        />
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit" disabled={loading}
                  style={{
                    width: '100%', height: '48px', marginTop: '8px', background: 'var(--color-primary)',
                    color: 'white', border: 'none', borderRadius: 'var(--rounded-md)', fontWeight: '600',
                    fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? 'Đang xử lý...' : (activeTab === 'login' ? 'ĐĂNG NHẬP NGAY' : 'TẠO TÀI KHOẢN')}
                </button>
              </form>
            )}

            <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
              {activeTab === 'login' ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
              <span
                onClick={() => { setActiveTab(activeTab === 'login' ? 'register' : 'login'); setError(''); }}
                style={{ color: 'var(--color-primary)', fontWeight: '600', cursor: 'pointer' }}
              >
                {activeTab === 'login' ? 'Đăng ký ngay' : 'Đăng nhập'}
              </span>
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'var(--color-outline)', fontSize: '12px', marginTop: '24px' }}>
              <ShieldCheck size={14} />
              <span>Bảo mật kết nối SSL mã hóa 256-bit</span>
            </div>

          </div>
        </div>

        {/* Right Side: Visual/Branding (Hidden on mobile via generic inline-style logic / flex-wrap handles some of it, but in real CSS we use media queries. For inline, we'll let flex handle it or use a min-width wrapper) */}
        <div style={{
          flex: '1 1 50%',
          minHeight: '400px',
          position: 'relative',
          backgroundColor: 'var(--color-surface)',
          borderLeft: '1px solid rgba(255,255,255,0.05)',
          overflow: 'hidden'
        }}>
          {/* Using a tech/pc hardware placeholder image */}
          <img
            src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=1200&auto=format&fit=crop"
            alt="PC Hardware"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, var(--color-surface-container) 0%, transparent 100%)',
          }} />

          <div style={{ position: 'absolute', bottom: '48px', left: '48px', right: '48px' }}>
            <div style={{
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(12px)',
              padding: '24px',
              borderRadius: 'var(--rounded-lg)',
              border: '1px solid rgba(255,255,255,0.1)',
              opacity: fade ? 1 : 0,
              transform: fade ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              <p style={{ color: 'white', fontSize: '16px', fontStyle: 'italic', lineHeight: '1.5', marginBottom: '16px', minHeight: '48px' }}>
                "{reviews[activeReview].text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: reviews[activeReview].color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                  {reviews[activeReview].avatar}
                </div>
                <div>
                  <p style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>{reviews[activeReview].author}</p>
                  <p style={{ color: 'var(--color-outline)', fontSize: '12px' }}>{reviews[activeReview].role}</p>
                </div>
              </div>
            </div>

            {/* Dots indicator */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
              {reviews.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => { setFade(false); setTimeout(() => { setActiveReview(idx); setFade(true); }, 400); }}
                  style={{
                    width: activeReview === idx ? '24px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    background: activeReview === idx ? 'white' : 'rgba(255,255,255,0.3)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

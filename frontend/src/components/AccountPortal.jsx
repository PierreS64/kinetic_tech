import React, { useState, useMemo } from 'react';
import { 
  User, 
  ShoppingBag, 
  ShieldCheck, 
  RotateCcw, 
  Settings, 
  FileText, 
  MessageSquare, 
  Lock, 
  Edit3, 
  ChevronRight, 
  Tag, 
  Heart, 
  Info,
  Calendar,
  Key,
  CheckCircle2,
  X,
  AlertTriangle,
  Send,
  HelpCircle
} from 'lucide-react';

export default function AccountPortal({ 
  currentUser, 
  setActiveView, 
  theme, 
  likedProductIds = [], 
  onToggleLike,
  products = [],
  orders = [],
  onAddOrder,
  tradeins = [],
  onAddTradeIn,
  feedbacks = [],
  onAddFeedback,
  onUpdateProfile,
  onAddSupportTicket
}) {
  const [activeTab, setActiveTab] = useState('overview'); // overview, orders, warranty, tradein, profile, policy, feedback
  
  // Selected order details modal state
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Support request form state (for orders page support button)
  const [supportProduct, setSupportProduct] = useState(null);
  const [supportOrderId, setSupportOrderId] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportUrgency, setSupportUrgency] = useState('Thường');
  const [supportSuccess, setSupportSuccess] = useState(false);

  // Feedback form state
  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [feedbackContent, setFeedbackContent] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  // Profile update form state
  const [profileForm, setProfileForm] = useState({
    fullName: currentUser?.fullName || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '144 Xuân Thủy, Cầu Giấy, Hà Nội'
  });
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Password change form state
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  // 1. Filter orders for current logged in user
  const userOrders = useMemo(() => {
    if (!currentUser) return [];
    return orders.filter(o => 
      o.customerName === currentUser.fullName || 
      o.email === currentUser.email
    );
  }, [orders, currentUser]);

  // Get 3 most recent orders
  const recentOrders = useMemo(() => {
    return userOrders.slice(0, 3);
  }, [userOrders]);

  // 2. Filter trade-ins for current logged in user
  const userTradeins = useMemo(() => {
    if (!currentUser) return [];
    return tradeins.filter(t => 
      t.customerName === currentUser.fullName || 
      t.email === currentUser.email
    );
  }, [tradeins, currentUser]);

  // 3. Get liked products list
  const favoriteProducts = useMemo(() => {
    return products.filter(p => likedProductIds.includes(p.id));
  }, [products, likedProductIds]);

  // 4. Warranty lookup: Automatically syncs and lists tech products successfully purchased
  // Tech products are from orders with status 'completed'
  const warrantyProducts = useMemo(() => {
    const completedOrders = userOrders.filter(o => o.status === 'completed');
    const items = [];
    
    completedOrders.forEach(order => {
      order.items.forEach(item => {
        // Parse purchase date to calculate expiration date (+12 months)
        // Order date can be "2026-06-02 18:30" or other format. Let's extract date.
        const orderDateStr = order.date.split(' ')[0]; // "2026-06-02"
        let orderDate = new Date();
        if (orderDateStr.includes('-')) {
          orderDate = new Date(orderDateStr);
        } else if (orderDateStr.includes('/')) {
          const parts = orderDateStr.split('/');
          // DD/MM/YYYY
          orderDate = new Date(parts[2], parts[1] - 1, parts[0]);
        }
        
        const expDate = new Date(orderDate);
        expDate.setMonth(expDate.getMonth() + 12);
        
        // Formatted dates
        const purchaseDateFormatted = orderDate.toLocaleDateString('vi-VN');
        const expDateFormatted = expDate.toLocaleDateString('vi-VN');
        
        // Status Check: Compare with current local date (June 4, 2026)
        // Hardcode a check for June 2026 context, or let JS evaluate
        const today = new Date();
        const isUnderWarranty = expDate > today;

        // Find specs or IMEI
        // Generate a pseudo-random IMEI/Serial
        const serialSeed = (item.id + order.id).replace(/[^a-zA-Z0-9]/g, '');
        const serial = `SN-${serialSeed.toUpperCase().slice(0, 8)}-${order.id.slice(-4)}`;

        items.push({
          orderId: order.id,
          productId: item.id,
          name: item.name,
          purchaseDate: purchaseDateFormatted,
          expirationDate: expDateFormatted,
          serial: serial,
          isUnderWarranty: isUnderWarranty
        });
      });
    });
    
    return items;
  }, [userOrders]);

  // Standard Voucher list
  const vouchers = [
    { code: 'KINETIC5', label: 'Giảm 5%', desc: 'Giảm 5% cho tất cả đơn hàng linh kiện và gear.', exp: 'HSD: 30/06/2026' },
    { code: 'FREESHIP', label: 'Freeship', desc: 'Miễn phí vận chuyển cho hóa đơn từ 15 triệu.', exp: 'HSD: 15/07/2026' },
    { code: 'HELLO', label: 'Giảm 500K', desc: 'Tặng ngay 500.000đ cho khách hàng mới đăng ký.', exp: 'HSD: 31/12/2026' }
  ];

  const handleCopyVoucher = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Đã sao chép mã voucher: ${code}`);
  };

  // Submit Feedback
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackTitle.trim() || !feedbackContent.trim()) {
      alert('Vui lòng nhập đầy đủ Tiêu đề và Nội dung.');
      return;
    }

    const newFeedback = {
      id: 'FB-' + Math.floor(1000 + Math.random() * 9000),
      title: feedbackTitle,
      content: feedbackContent,
      email: currentUser?.email || 'guest@kinetic.vn',
      fullName: currentUser?.fullName || 'Khách Hàng KINETIC',
      date: new Date().toLocaleString('vi-VN'),
      status: 'pending'
    };

    onAddFeedback(newFeedback);
    setFeedbackSuccess(true);
    setFeedbackTitle('');
    setFeedbackContent('');

    setTimeout(() => {
      setFeedbackSuccess(false);
    }, 4000);
  };

  // Submit Support Ticket from Purchase History detail
  const handleSupportRequestSubmit = (e) => {
    e.preventDefault();
    if (!supportMessage.trim()) {
      alert('Vui lòng nhập nội dung mô tả sự cố.');
      return;
    }

    const newTicket = {
      id: 'TK-' + Math.floor(1000 + Math.random() * 9000),
      customerName: currentUser?.fullName || 'Khách Hàng KINETIC',
      subject: `Yêu cầu hỗ trợ: ${supportProduct.name} (Đơn hàng: ${supportOrderId})`,
      category: 'Lỗi Kỹ Thuật Phần Cứng',
      urgency: supportUrgency,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      messages: [
        {
          sender: 'user',
          text: `Thiết bị gặp sự cố: ${supportProduct.name}. Đơn mua hàng: ${supportOrderId}.\nChi tiết sự cố: ${supportMessage}`,
          time: new Date().toLocaleString('vi-VN')
        }
      ]
    };

    onAddSupportTicket(newTicket);
    setSupportSuccess(true);
    setSupportMessage('');

    setTimeout(() => {
      setSupportSuccess(false);
      setSupportProduct(null);
    }, 3000);
  };

  // Submit Profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (!profileForm.fullName || !profileForm.phone) {
      alert('Vui lòng điền đầy đủ Họ tên và Số điện thoại.');
      return;
    }

    onUpdateProfile({
      ...currentUser,
      fullName: profileForm.fullName,
      phone: profileForm.phone,
      address: profileForm.address
    });

    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  // Submit Password update
  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError('Vui lòng nhập đầy đủ các trường mật khẩu.');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Mật khẩu mới nhập lại không khớp.');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError('Mật khẩu mới phải dài ít nhất 6 ký tự.');
      return;
    }

    // Simulate password change
    setPasswordSuccess(true);
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  if (!currentUser) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div className="glass-panel" style={{ maxWidth: '500px', margin: '0 auto', padding: '40px 30px', borderRadius: 'var(--rounded-lg)' }}>
          <AlertTriangle size={48} color="var(--color-secondary)" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px' }}>Bạn chưa đăng nhập!</h3>
          <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginBottom: '24px', lineHeight: '1.6' }}>
            Vui lòng đăng nhập hoặc tạo tài khoản để có thể quản lý thông tin, theo dõi lịch sử mua hàng, bảo hành và gửi hỗ trợ kỹ thuật trực tiếp.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button onClick={() => setActiveView('login')} className="btn btn-primary" style={{ padding: '10px 20px' }}>
              Đăng Nhập Ngay
            </button>
            <button onClick={() => setActiveView('deals')} className="btn btn-outline" style={{ padding: '10px 20px' }}>
              Quay Lại Trang Chủ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px 0 60px' }}>
      <div className="container">
        
        {/* Welcome Header */}
        <div style={{ marginBottom: '32px' }} className="animate-fade-in-up">
          <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-primary-dim)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Trang cá nhân khách hàng
          </span>
          <h2 style={{ fontSize: '26px', fontWeight: '800', fontFamily: 'Montserrat', marginTop: '6px' }}>
            Xin chào, {currentUser.fullName}!
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
            Quản lý tài khoản của bạn, tra cứu dịch vụ bảo hành và theo dõi các đơn hàng hi-end đã đặt.
          </p>
        </div>

        {/* Portal Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '30px', alignItems: 'start' }} className="catalog-layout">
          
          {/* Left Navigation Sidebar */}
          <aside className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ padding: '6px 12px', fontSize: '10px', color: 'var(--color-outline)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Bảng Điều Khiển
            </div>
            
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`btn`} 
              style={{
                justifyContent: 'flex-start',
                fontSize: '13px',
                padding: '10px 12px',
                background: activeTab === 'overview' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'overview' ? 'white' : 'var(--color-on-surface-variant)',
                transition: 'all 0.2s ease'
              }}
            >
              <User size={16} />
              Tổng quan tài khoản
            </button>

            <button 
              onClick={() => setActiveTab('orders')} 
              className={`btn`} 
              style={{
                justifyContent: 'flex-start',
                fontSize: '13px',
                padding: '10px 12px',
                background: activeTab === 'orders' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'orders' ? 'white' : 'var(--color-on-surface-variant)',
                transition: 'all 0.2s ease'
              }}
            >
              <ShoppingBag size={16} />
              Lịch sử mua hàng ({userOrders.length})
            </button>

            <button 
              onClick={() => setActiveTab('warranty')} 
              className={`btn`} 
              style={{
                justifyContent: 'flex-start',
                fontSize: '13px',
                padding: '10px 12px',
                background: activeTab === 'warranty' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'warranty' ? 'white' : 'var(--color-on-surface-variant)',
                transition: 'all 0.2s ease'
              }}
            >
              <ShieldCheck size={16} />
              Tra cứu bảo hành ({warrantyProducts.length})
            </button>

            <button 
              onClick={() => setActiveTab('tradein')} 
              className={`btn`} 
              style={{
                justifyContent: 'flex-start',
                fontSize: '13px',
                padding: '10px 12px',
                background: activeTab === 'tradein' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'tradein' ? 'white' : 'var(--color-on-surface-variant)',
                transition: 'all 0.2s ease'
              }}
            >
              <RotateCcw size={16} />
              Lịch sử thu cũ ({userTradeins.length})
            </button>

            <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)', margin: '8px 0' }} />
            
            <div style={{ padding: '6px 12px', fontSize: '10px', color: 'var(--color-outline)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Thông Tin & Đóng Góp
            </div>

            <button 
              onClick={() => setActiveTab('profile')} 
              className={`btn`} 
              style={{
                justifyContent: 'flex-start',
                fontSize: '13px',
                padding: '10px 12px',
                background: activeTab === 'profile' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'profile' ? 'white' : 'var(--color-on-surface-variant)',
                transition: 'all 0.2s ease'
              }}
            >
              <Settings size={16} />
              Thông tin tài khoản
            </button>

            <button 
              onClick={() => setActiveTab('policy')} 
              className={`btn`} 
              style={{
                justifyContent: 'flex-start',
                fontSize: '13px',
                padding: '10px 12px',
                background: activeTab === 'policy' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'policy' ? 'white' : 'var(--color-on-surface-variant)',
                transition: 'all 0.2s ease'
              }}
            >
              <FileText size={16} />
              Chính sách bảo hành
            </button>

            <button 
              onClick={() => setActiveTab('feedback')} 
              className={`btn`} 
              style={{
                justifyContent: 'flex-start',
                fontSize: '13px',
                padding: '10px 12px',
                background: activeTab === 'feedback' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'feedback' ? 'white' : 'var(--color-on-surface-variant)',
                transition: 'all 0.2s ease'
              }}
            >
              <MessageSquare size={16} />
              Góp ý - Phản hồi
            </button>
          </aside>

          {/* Right Content Work Area */}
          <main style={{ minHeight: '500px' }} className="animate-fade-in-up">
            
            {/* SUB-VIEW 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Valued Trade-In Notification Alert */}
                {(() => {
                  const valuedTradeIns = userTradeins.filter(t => t.status === 'valued');
                  if (valuedTradeIns.length === 0) return null;

                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {valuedTradeIns.map(trade => (
                        <div 
                          key={trade.id}
                          className="glass-panel-glow-orange animate-fade-in-up"
                          style={{
                            borderRadius: 'var(--rounded-md)',
                            padding: '16px 20px',
                            borderLeft: '4px solid var(--color-secondary)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '12px',
                            position: 'relative'
                          }}
                        >
                          <div>
                            <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--color-secondary-dim)', textTransform: 'uppercase', display: 'block', letterSpacing: '0.5px' }}>
                              🔔 BÁO GIÁ THU CŨ MỚI (YÊU CẦU: {trade.id})
                            </span>
                            <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'white', marginTop: '6px' }}>
                              {trade.oldDevice}
                            </h4>
                            <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
                              Định giá thu mua đề nghị: <strong style={{ color: 'var(--color-secondary-dim)', fontSize: '15px' }}>{formatVND(trade.offeredPrice)}</strong>
                            </p>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', display: 'block', marginTop: '4px' }}>
                              Dùng cấn trừ nâng cấp lên đời: <strong style={{ color: 'white' }}>{trade.targetDevice}</strong>
                            </span>
                          </div>

                          <button 
                            onClick={() => setActiveTab('tradein')}
                            className="btn btn-secondary" 
                            style={{ padding: '8px 14px', fontSize: '12px' }}
                          >
                            Xem Chi Tiết Lịch Hẹn
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                })()}
                
                {/* Promo Banner Section - Rich Custom Design */}
                <div 
                  className="glass-panel-glow-orange" 
                  style={{
                    borderRadius: 'var(--rounded-lg)',
                    padding: '30px',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px',
                    border: '1px solid rgba(253, 139, 0, 0.25)'
                  }}
                >
                  {/* Decorative background circle */}
                  <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    background: 'rgba(253, 139, 0, 0.1)',
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                    zIndex: 0
                  }} />

                  <div style={{ flex: '1 1 350px', zIndex: 1 }}>
                    <span style={{ fontSize: '10px', fontWeight: '800', background: 'rgba(253, 139, 0, 0.2)', color: 'var(--color-secondary-dim)', padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase' }}>
                      Ưu đãi đặc quyền
                    </span>
                    <h3 style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'Montserrat', marginTop: '12px' }}>
                      CHIẾN DỊCH HÈ SIÊU NHIỆT - LÊN ĐỜI HI-END LAPTOP
                    </h3>
                    <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '8px', lineHeight: '1.6' }}>
                      Áp dụng đặc quyền trả góp 0%, tặng gói vệ sinh bảo dưỡng laptop trọn đời trị giá <strong style={{ color: 'white' }}>1.500.000đ</strong> và voucher giảm giá trực tiếp tới <strong style={{ color: 'var(--color-secondary-dim)' }}>2.000.000đ</strong> khi mua các dòng Asus ROG Strix 2026.
                    </p>
                    <button 
                      onClick={() => setActiveView('laptop')}
                      className="btn btn-secondary" 
                      style={{ marginTop: '16px', padding: '8px 16px', fontSize: '12px' }}
                    >
                      Khám phá ngay
                      <ChevronRight size={14} />
                    </button>
                  </div>
                  
                  {/* Graphic Display Image */}
                  <div style={{ flex: '1 1 180px', display: 'flex', justifyContent: 'center', zIndex: 1 }}>
                    <img 
                      src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=300"
                      alt="ASUS ROG Strix Promo"
                      style={{
                        width: '100%',
                        maxWidth: '220px',
                        height: 'auto',
                        borderRadius: 'var(--rounded)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        transform: 'rotate(-3deg)'
                      }}
                    />
                  </div>
                </div>

                {/* Dashboard Sub-grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="overview-subgrid">
                  
                  {/* Left sub-column: Recent 3 Orders */}
                  <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '20px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px' }}>
                      <ShoppingBag size={16} color="var(--color-primary-dim)" />
                      Đơn hàng gần đây nhất
                    </h4>

                    {recentOrders.length === 0 ? (
                      <div style={{ padding: '30px 10px', textAlign: 'center', color: 'var(--color-outline)' }}>
                        <p style={{ fontSize: '12px' }}>Bạn chưa có đơn đặt hàng nào.</p>
                        <button onClick={() => setActiveView('deals')} className="btn btn-ghost" style={{ fontSize: '12px', marginTop: '10px', color: 'var(--color-primary-dim)' }}>
                          Khám phá sản phẩm
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {recentOrders.map(order => (
                          <div 
                            key={order.id} 
                            onClick={() => { setSelectedOrder(order); setActiveTab('orders'); }}
                            style={{
                              background: 'rgba(255, 255, 255, 0.02)',
                              border: '1px solid rgba(255, 255, 255, 0.04)',
                              borderRadius: 'var(--rounded)',
                              padding: '12px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            className="list-hover-effect"
                          >
                            <div>
                              <strong style={{ fontSize: '12px', color: 'white', display: 'block' }}>{order.id}</strong>
                              <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>{order.date.split(' ')[0]}</span>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <span style={{ fontWeight: '700', fontSize: '12px', color: 'var(--color-secondary-dim)', display: 'block' }}>{formatVND(order.total)}</span>
                              <span style={{ 
                                fontSize: '9px',
                                background: 
                                  order.status === 'completed' ? 'rgba(76,175,80,0.12)' : 
                                  order.status === 'cancelled' ? 'rgba(255,76,76,0.12)' :
                                  order.status === 'processing' ? 'rgba(0,123,255,0.12)' : 'rgba(253,139,0,0.12)',
                                color: 
                                  order.status === 'completed' ? '#81c784' : 
                                  order.status === 'cancelled' ? '#ffb4ab' :
                                  order.status === 'processing' ? '#adc7ff' : '#ffb77d',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontWeight: '700'
                              }}>
                                {order.status === 'completed' ? 'Đã giao' : order.status === 'cancelled' ? 'Đã hủy' : order.status === 'processing' ? 'Đang xử lý' : 'Chờ duyệt'}
                              </span>
                            </div>
                          </div>
                        ))}
                        <button 
                          onClick={() => setActiveTab('orders')}
                          className="btn btn-ghost" 
                          style={{ width: '100%', fontSize: '12px', padding: '6px', color: 'var(--color-primary-dim)' }}
                        >
                          Xem tất cả đơn hàng
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right sub-column: Current Vouchers */}
                  <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '20px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px' }}>
                      <Tag size={16} color="var(--color-secondary-dim)" />
                      Mã giảm giá hiện có
                    </h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {vouchers.map(v => (
                        <div 
                          key={v.code} 
                          style={{
                            background: 'rgba(253, 139, 0, 0.03)',
                            border: '1px dashed rgba(253, 139, 0, 0.25)',
                            borderRadius: 'var(--rounded)',
                            padding: '10px 12px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontFamily: 'monospace', fontWeight: '800', fontSize: '13px', color: 'white', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>
                                {v.code}
                              </span>
                              <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--color-secondary-dim)' }}>
                                {v.label}
                              </span>
                            </div>
                            <span style={{ fontSize: '11px', color: 'var(--color-outline)', display: 'block', marginTop: '4px' }}>{v.desc}</span>
                          </div>
                          <button 
                            onClick={() => handleCopyVoucher(v.code)}
                            className="btn btn-outline" 
                            style={{ padding: '4px 8px', fontSize: '10px', height: 'fit-content' }}
                          >
                            Sao chép
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Favorites Row (Loved Products) */}
                <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '20px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px' }}>
                    <Heart size={16} color="var(--color-error)" fill="var(--color-error)" />
                    Sản phẩm bạn yêu thích ({favoriteProducts.length})
                  </h4>

                  {favoriteProducts.length === 0 ? (
                    <div style={{ padding: '40px 10px', textAlign: 'center', color: 'var(--color-outline)' }}>
                      <Heart size={32} color="rgba(255,255,255,0.1)" style={{ marginBottom: '12px' }} />
                      <p style={{ fontSize: '12px' }}>Danh sách yêu thích trống.</p>
                      <button onClick={() => setActiveView('deals')} className="btn btn-primary" style={{ fontSize: '12px', marginTop: '14px', padding: '8px 16px' }}>
                        Đi mua sắm ngay
                      </button>
                    </div>
                  ) : (
                    <div 
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '16px'
                      }}
                    >
                      {favoriteProducts.map(prod => (
                        <div 
                          key={prod.id}
                          style={{
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.04)',
                            borderRadius: 'var(--rounded)',
                            padding: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            position: 'relative'
                          }}
                        >
                          {/* Heart toggle on top-right */}
                          <button 
                            onClick={() => onToggleLike(prod.id)}
                            style={{
                              position: 'absolute',
                              top: '8px',
                              right: '8px',
                              background: 'rgba(0,0,0,0.4)',
                              border: 'none',
                              borderRadius: '50%',
                              width: '26px',
                              height: '26px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              color: 'var(--color-error)'
                            }}
                          >
                            <X size={12} />
                          </button>

                          <div style={{ height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '4px' }}>
                            <img src={prod.image} alt={prod.name} style={{ height: '100%', objectFit: 'contain' }} />
                          </div>

                          <h5 style={{ fontSize: '12px', fontWeight: '600', color: 'white', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '34px', lineHeight: '1.4' }}>
                            {prod.name}
                          </h5>

                          <strong style={{ fontSize: '13px', color: 'var(--color-secondary-dim)' }}>
                            {formatVND(prod.price)}
                          </strong>

                          <button 
                            onClick={() => {
                              // Switch view to details or buy now
                              // Simulating purchase by redirecting to deals
                              setActiveView(prod.category);
                            }}
                            className="btn btn-primary" 
                            style={{ padding: '6px 10px', fontSize: '10px', width: '100%', marginTop: 'auto' }}
                          >
                            Xem chi tiết
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* SUB-VIEW 2: PURCHASE HISTORY */}
            {activeTab === 'orders' && (
              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px' }}>
                  Lịch Sử Đơn Hàng Của Bạn
                </h3>

                {userOrders.length === 0 ? (
                  <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--color-outline)' }}>
                    <ShoppingBag size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
                    <p style={{ fontSize: '13px' }}>Bạn chưa đặt bất kỳ đơn hàng nào từ hệ thống Kinetic Tech.</p>
                    <button onClick={() => setActiveView('deals')} className="btn btn-primary" style={{ marginTop: '20px', padding: '10px 20px' }}>
                      Xem các sản phẩm hot
                    </button>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }} className="zebra-table">
                      <thead>
                        <tr style={{ background: 'var(--color-surface-container-high)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                          <th style={{ padding: '12px 16px', fontWeight: '700' }}>Mã Đơn Hàng</th>
                          <th style={{ padding: '12px 16px', fontWeight: '700' }}>Ngày Mua</th>
                          <th style={{ padding: '12px 16px', fontWeight: '700' }}>Tổng Thanh Toán</th>
                          <th style={{ padding: '12px 16px', fontWeight: '700' }}>Trạng Thái</th>
                          <th style={{ padding: '12px 16px', fontWeight: '700', textAlign: 'center' }}>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userOrders.map(order => (
                          <tr key={order.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <td style={{ fontWeight: '700', color: 'var(--color-primary-dim)', padding: '12px 16px' }}>{order.id}</td>
                            <td style={{ padding: '12px 16px' }}>{order.date}</td>
                            <td style={{ fontWeight: '800', color: 'var(--color-secondary-dim)', padding: '12px 16px' }}>{formatVND(order.total)}</td>
                            <td style={{ padding: '12px 16px' }}>
                              <span className="status-badge" style={{
                                fontSize: '10px',
                                background: 
                                  order.status === 'completed' ? 'rgba(76,175,80,0.15)' : 
                                  order.status === 'cancelled' ? 'rgba(255,76,76,0.15)' :
                                  order.status === 'processing' ? 'rgba(0,123,255,0.15)' : 'rgba(253,139,0,0.15)',
                                color: 
                                  order.status === 'completed' ? '#81c784' : 
                                  order.status === 'cancelled' ? '#ffb4ab' :
                                  order.status === 'processing' ? '#adc7ff' : '#ffb77d',
                                padding: '2px 8px'
                              }}>
                                {order.status === 'completed' && 'Đã hoàn thành'}
                                {order.status === 'cancelled' && 'Đã hủy'}
                                {order.status === 'processing' && 'Đang xử lý'}
                                {order.status === 'pending' && 'Chờ duyệt'}
                              </span>
                            </td>
                            <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                              <button 
                                onClick={() => setSelectedOrder(order)} 
                                className="btn btn-outline" 
                                style={{ padding: '6px 12px', fontSize: '11px' }}
                              >
                                Xem chi tiết
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Sub-Modal / Expanding Window for Order details & Request Support */}
                {selectedOrder && (
                  <div className="modal-overlay" style={{ zIndex: 101 }} onClick={() => setSelectedOrder(null)}>
                    <div 
                      className="glass-panel animate-fade-in-up" 
                      onClick={(e) => e.stopPropagation()} 
                      style={{ width: '100%', maxWidth: '650px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden' }}
                    >
                      {/* Modal Header */}
                      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                        <div>
                          <h4 style={{ fontSize: '16px', fontWeight: '800' }}>Chi tiết đơn hàng {selectedOrder.id}</h4>
                          <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Ngày đặt: {selectedOrder.date}</span>
                        </div>
                        <button onClick={() => setSelectedOrder(null)} className="btn btn-ghost" style={{ padding: '4px', borderRadius: '50%' }}>
                          <X size={18} color="white" />
                        </button>
                      </div>

                      {/* Modal Content */}
                      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '75vh', overflowY: 'auto' }}>
                        
                        {/* Transaction summary */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', padding: '14px', borderRadius: 'var(--rounded)' }}>
                          <div>
                            <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-outline)', fontWeight: '800', display: 'block', marginBottom: '4px' }}>Địa chỉ giao hàng</span>
                            <span style={{ fontSize: '12px', color: 'white', lineHeight: '1.5' }}>
                              Người nhận: {selectedOrder.customerName}<br />
                              SĐT: {selectedOrder.phone}<br />
                              Địa chỉ: {selectedOrder.address || 'Hà Nội'}
                            </span>
                          </div>
                          <div>
                            <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-outline)', fontWeight: '800', display: 'block', marginBottom: '4px' }}>Thanh toán</span>
                            <span style={{ fontSize: '12px', color: 'white', lineHeight: '1.5' }}>
                              Phương thức: {selectedOrder.paymentMethod}<br />
                              Trạng thái: <strong style={{ color: 'white' }}>{selectedOrder.status === 'completed' ? 'Đã thanh toán' : 'Chờ xác thực'}</strong>
                            </span>
                          </div>
                        </div>

                        {/* Order Tracking Progress Stepper */}
                        <div style={{ padding: '10px 0 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                          <h5 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-primary-dim)', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '0.5px' }}>
                            HÀNH TRÌNH ĐƠN HÀNG
                          </h5>
                          {selectedOrder.status === 'cancelled' ? (
                            <div style={{ padding: '12px', background: 'rgba(255,76,76,0.1)', border: '1px solid rgba(255,76,76,0.2)', borderRadius: '4px', color: '#ffb4ab', fontSize: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <span>✖</span>
                              <span>Đơn hàng này đã bị hủy. Vui lòng liên hệ hotline để biết thêm chi tiết.</span>
                            </div>
                          ) : (
                            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginTop: '10px' }}>
                              {/* Background Line */}
                              <div style={{ position: 'absolute', top: '15px', left: '8%', right: '8%', height: '2px', background: 'rgba(255,255,255,0.06)', zIndex: 0 }} />
                              {/* Active Line */}
                              <div style={{ 
                                position: 'absolute', 
                                top: '15px', 
                                left: '8%', 
                                width: selectedOrder.status === 'completed' ? '84%' : selectedOrder.status === 'processing' ? '42%' : '0%', 
                                height: '2px', 
                                background: 'var(--color-primary)', 
                                zIndex: 0,
                                transition: 'width 0.4s ease'
                              }} />
                              
                              {/* Step 1 */}
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, width: '20%' }}>
                                <div style={{
                                  width: '32px', height: '32px', borderRadius: '50%',
                                  background: 'var(--color-primary)', color: 'white',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold',
                                  boxShadow: '0 0 10px rgba(0, 123, 255, 0.4)'
                                }}>1</div>
                                <span style={{ fontSize: '11px', fontWeight: '700', color: 'white', marginTop: '6px' }}>Đã đặt đơn</span>
                              </div>

                              {/* Step 2 */}
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, width: '20%' }}>
                                <div style={{
                                  width: '32px', height: '32px', borderRadius: '50%',
                                  background: ['processing', 'completed'].includes(selectedOrder.status) ? 'var(--color-primary)' : 'var(--color-surface-container-highest)',
                                  color: ['processing', 'completed'].includes(selectedOrder.status) ? 'white' : 'var(--color-outline)',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold',
                                  boxShadow: ['processing', 'completed'].includes(selectedOrder.status) ? '0 0 10px rgba(0, 123, 255, 0.4)' : 'none'
                                }}>2</div>
                                <span style={{ fontSize: '11px', fontWeight: '700', color: ['processing', 'completed'].includes(selectedOrder.status) ? 'white' : 'var(--color-outline)', marginTop: '6px' }}>Đã xác nhận</span>
                              </div>

                              {/* Step 3 */}
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, width: '20%' }}>
                                <div style={{
                                  width: '32px', height: '32px', borderRadius: '50%',
                                  background: selectedOrder.status === 'completed' ? 'var(--color-primary)' : selectedOrder.status === 'processing' ? 'var(--color-surface-bright)' : 'var(--color-surface-container-highest)',
                                  color: selectedOrder.status === 'completed' ? 'white' : selectedOrder.status === 'processing' ? 'var(--color-secondary)' : 'var(--color-outline)',
                                  border: selectedOrder.status === 'processing' ? '1px dashed var(--color-secondary)' : 'none',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold',
                                  boxShadow: selectedOrder.status === 'completed' ? '0 0 10px rgba(0, 123, 255, 0.4)' : selectedOrder.status === 'processing' ? '0 0 10px rgba(253, 139, 0, 0.2)' : 'none'
                                }}>3</div>
                                <span style={{ fontSize: '11px', fontWeight: '700', color: ['processing', 'completed'].includes(selectedOrder.status) ? 'white' : 'var(--color-outline)', marginTop: '6px' }}>Đang giao</span>
                              </div>

                              {/* Step 4 */}
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, width: '20%' }}>
                                <div style={{
                                  width: '32px', height: '32px', borderRadius: '50%',
                                  background: selectedOrder.status === 'completed' ? 'rgba(76, 175, 80, 0.15)' : 'var(--color-surface-container-highest)',
                                  color: selectedOrder.status === 'completed' ? '#81c784' : 'var(--color-outline)',
                                  border: selectedOrder.status === 'completed' ? '1px solid rgba(76, 175, 80, 0.3)' : 'none',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold',
                                  boxShadow: selectedOrder.status === 'completed' ? '0 0 10px rgba(76, 175, 80, 0.3)' : 'none'
                                }}>4</div>
                                <span style={{ fontSize: '11px', fontWeight: '700', color: selectedOrder.status === 'completed' ? '#81c784' : 'var(--color-outline)', marginTop: '6px' }}>Thành công</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Product list with integrated Technical support request */}
                        <div>
                          <h5 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-primary-dim)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.5px' }}>
                            Danh sách sản phẩm mua
                          </h5>
                          
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {selectedOrder.items.map((item, idx) => (
                              <div 
                                key={idx} 
                                style={{
                                  background: 'rgba(255,255,255,0.02)',
                                  border: '1px solid rgba(255,255,255,0.04)',
                                  borderRadius: 'var(--rounded)',
                                  padding: '12px',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  gap: '16px'
                                }}
                              >
                                <div style={{ flex: 1 }}>
                                  <span style={{ fontWeight: '600', fontSize: '13px', color: 'white', display: 'block' }}>{item.name}</span>
                                  <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)' }}>
                                    Số lượng: {item.quantity} | Đơn giá: {formatVND(item.price)}
                                  </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                  <strong style={{ fontSize: '13px', color: 'var(--color-secondary-dim)' }}>
                                    {formatVND(item.price * item.quantity)}
                                  </strong>
                                  
                                  {/* Request support button */}
                                  <button
                                    onClick={() => {
                                      setSupportProduct(item);
                                      setSupportOrderId(selectedOrder.id);
                                    }}
                                    className="btn btn-outline"
                                    style={{
                                      padding: '6px 10px',
                                      fontSize: '11px',
                                      borderColor: 'rgba(255,76,76,0.3)',
                                      color: 'var(--color-error)'
                                    }}
                                  >
                                    Yêu cầu hỗ trợ
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Order billing total */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                          <span style={{ fontSize: '12px', color: 'var(--color-outline)' }}>Tổng thanh toán hóa đơn:</span>
                          <strong style={{ fontSize: '20px', color: 'var(--color-secondary-dim)', fontWeight: '800' }}>
                            {formatVND(selectedOrder.total)}
                          </strong>
                        </div>

                        {/* Triggered Support request popup inline inside modal */}
                        {supportProduct && (
                          <div 
                            style={{ 
                              background: 'rgba(255, 76, 76, 0.02)', 
                              border: '1px solid rgba(255, 76, 76, 0.15)', 
                              padding: '16px', 
                              borderRadius: 'var(--rounded)',
                              marginTop: '10px'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                              <h5 style={{ fontSize: '12px', fontWeight: '800', color: 'var(--color-error)' }}>
                                YÊU CẦU HỖ TRỢ KỸ THUẬT: {supportProduct.name}
                              </h5>
                              <button onClick={() => setSupportProduct(null)} className="btn btn-ghost" style={{ padding: '2px', borderRadius: '50%' }}>
                                <X size={14} color="var(--color-error)" />
                              </button>
                            </div>
                            
                            {supportSuccess ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#81c784', fontSize: '12px', padding: '10px 0' }}>
                                <CheckCircle2 size={16} />
                                <span>Gửi yêu cầu hỗ trợ thành công! Kỹ thuật viên sẽ phản hồi bạn trong mục Support Ticket hoặc SMS.</span>
                              </div>
                            ) : (
                              <form onSubmit={handleSupportRequestSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                  <div>
                                    <label style={{ fontSize: '11px', color: 'var(--color-outline)', display: 'block', marginBottom: '4px' }}>Mức độ khẩn cấp</label>
                                    <select 
                                      value={supportUrgency} 
                                      onChange={(e) => setSupportUrgency(e.target.value)}
                                      className="form-input"
                                      style={{ padding: '8px', fontSize: '12px' }}
                                    >
                                      <option value="Thường">Thường (Xử lý trong 24h)</option>
                                      <option value="Gấp">Gấp (Xử lý trong 2-4h)</option>
                                      <option value="Rất Gấp">Rất Gấp (Yêu cầu gọi lại ngay)</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label style={{ fontSize: '11px', color: 'var(--color-outline)', display: 'block', marginBottom: '4px' }}>Loại sự cố</label>
                                    <input type="text" value="Báo lỗi phần cứng thiết bị" disabled className="form-input" style={{ padding: '8px', fontSize: '12px', opacity: 0.7 }} />
                                  </div>
                                </div>
                                <div>
                                  <label style={{ fontSize: '11px', color: 'var(--color-outline)', display: 'block', marginBottom: '4px' }}>Nội dung báo lỗi / Mô tả sự cố chi tiết</label>
                                  <textarea
                                    value={supportMessage}
                                    onChange={(e) => setSupportMessage(e.target.value)}
                                    placeholder="Vui lòng mô tả chi tiết lỗi gặp phải (ví dụ: máy không lên nguồn, màn hình bị sọc xanh, phím kẹt...). Nhập thông tin để shop tiếp nhận nhanh nhất..."
                                    rows="3"
                                    className="form-input"
                                    style={{ fontSize: '12px', padding: '10px' }}
                                  />
                                </div>
                                <button type="submit" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '12px', alignSelf: 'flex-end' }}>
                                  Gửi Yêu Cầu Hỗ Trợ
                                </button>
                              </form>
                            )}
                          </div>
                        )}
                        
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SUB-VIEW 3: WARRANTY LOOKUP */}
            {activeTab === 'warranty' && (
              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px' }}>
                  Thiết Bị Công Nghệ Đã Mua & Trạng Thái Bảo Hành
                </h3>

                <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginBottom: '20px', lineHeight: '1.6' }}>
                  Hệ thống tự động đồng bộ tất cả các sản phẩm công nghệ bạn đã mua thành công tại cửa hàng Kinetic Tech. Thời gian bảo hành mặc định là 12 tháng kể từ ngày mua.
                </p>

                {warrantyProducts.length === 0 ? (
                  <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--color-outline)' }}>
                    <ShieldCheck size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
                    <p style={{ fontSize: '13px' }}>Không tìm thấy sản phẩm công nghệ nào có bảo hành. Chỉ các đơn hàng đã giao thành công mới được kích hoạt bảo hành điện tử.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {warrantyProducts.map((prod, idx) => (
                      <div 
                        key={idx}
                        style={{
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                          borderRadius: 'var(--rounded)',
                          padding: '16px',
                          display: 'flex',
                          flexWrap: 'wrap',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '16px'
                        }}
                      >
                        <div style={{ flex: '1 1 300px' }}>
                          <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'white' }}>{prod.name}</h4>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', marginTop: '10px', fontSize: '12px', color: 'var(--color-on-surface-variant)' }}>
                            <div>
                              <span style={{ color: 'var(--color-outline)' }}>Mã Serial/IMEI:</span>
                              <strong style={{ display: 'block', color: 'white', fontFamily: 'monospace', fontSize: '13px', marginTop: '2px' }}>{prod.serial}</strong>
                            </div>
                            <div>
                              <span style={{ color: 'var(--color-outline)' }}>Ngày hết hạn bảo hành:</span>
                              <strong style={{ display: 'block', color: 'white', marginTop: '2px' }}>{prod.expirationDate}</strong>
                            </div>
                            <div>
                              <span style={{ color: 'var(--color-outline)' }}>Ngày mua:</span>
                              <span style={{ display: 'block', color: 'white', marginTop: '2px' }}>{prod.purchaseDate}</span>
                            </div>
                            <div>
                              <span style={{ color: 'var(--color-outline)' }}>Đơn hàng:</span>
                              <span style={{ display: 'block', color: 'var(--color-primary-dim)', marginTop: '2px', fontWeight: '700' }}>#{prod.orderId}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                          <span style={{
                            fontSize: '12px',
                            fontWeight: '800',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            background: prod.isUnderWarranty ? 'rgba(76, 175, 80, 0.15)' : 'rgba(255, 76, 76, 0.15)',
                            color: prod.isUnderWarranty ? '#81c784' : '#ffb4ab',
                            border: prod.isUnderWarranty ? '1px solid rgba(76, 175, 80, 0.3)' : '1px solid rgba(255, 76, 76, 0.3)'
                          }}>
                            {prod.isUnderWarranty ? 'Còn bảo hành' : 'Hết hạn'}
                          </span>
                          
                          <button 
                            onClick={() => {
                              setSelectedOrder(orders.find(o => o.id === prod.orderId));
                              setActiveTab('orders');
                            }}
                            className="btn btn-outline" 
                            style={{ padding: '6px 12px', fontSize: '11px' }}
                          >
                            Hỗ trợ sửa chữa
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SUB-VIEW 4: TRADE-IN HISTORY */}
            {activeTab === 'tradein' && (
              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px' }}>
                  Lịch Sử Đăng Ký Thu Cũ Đổi Mới
                </h3>

                <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginBottom: '20px' }}>
                  Danh sách các thiết bị công nghệ cũ bạn đã gửi định giá để nâng cấp lên các sản phẩm mới của cửa hàng.
                </p>

                {userTradeins.length === 0 ? (
                  <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--color-outline)' }}>
                    <RotateCcw size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
                    <p style={{ fontSize: '13px' }}>Bạn chưa có yêu cầu thu cũ đổi mới nào.</p>
                    <button onClick={() => setActiveView('trade-in')} className="btn btn-primary" style={{ marginTop: '20px', padding: '10px 20px' }}>
                      Định giá máy cũ ngay
                    </button>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }} className="zebra-table">
                      <thead>
                        <tr style={{ background: 'var(--color-surface-container-high)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                          <th style={{ padding: '12px 16px', fontWeight: '700' }}>Tên Máy Cũ</th>
                          <th style={{ padding: '12px 16px', fontWeight: '700' }}>Tự Đánh Giá</th>
                          <th style={{ padding: '12px 16px', fontWeight: '700' }}>Giá Định Sơ Bộ</th>
                          <th style={{ padding: '12px 16px', fontWeight: '700' }}>Trạng Thái</th>
                          <th style={{ padding: '12px 16px', fontWeight: '700' }}>Ngày gửi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userTradeins.map(trade => (
                          <tr key={trade.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                            <td style={{ fontWeight: '700', color: 'white', padding: '12px 16px' }}>
                              {trade.oldDevice}
                            </td>
                            <td style={{ padding: '12px 16px', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={trade.conditionDesc}>
                              {trade.conditionDesc}
                            </td>
                            <td style={{ fontWeight: '800', color: 'var(--color-secondary-dim)', padding: '12px 16px' }}>
                              {trade.offeredPrice > 0 ? formatVND(trade.offeredPrice) : 'Chờ định giá'}
                            </td>
                            <td style={{ padding: '12px 16px' }}>
                              <span className="status-badge" style={{
                                fontSize: '10px',
                                background: 
                                  trade.status === 'completed' || trade.status === 'Đã thu mua' ? 'rgba(76,175,80,0.15)' : 
                                  trade.status === 'cancelled' || trade.status === 'Đã hủy' ? 'rgba(255,76,76,0.15)' :
                                  'rgba(253,139,0,0.15)',
                                color: 
                                  trade.status === 'completed' || trade.status === 'Đã thu mua' ? '#81c784' : 
                                  trade.status === 'cancelled' || trade.status === 'Đã hủy' ? '#ffb4ab' :
                                  '#ffb77d',
                                padding: '2px 8px'
                              }}>
                                {trade.status === 'completed' && 'Đã thu mua'}
                                {trade.status === 'valued' && 'Đã định giá'}
                                {trade.status === 'pending' && 'Chờ duyệt'}
                                {trade.status === 'cancelled' && 'Đã hủy'}
                                {trade.status === 'Đã thu mua' && 'Đã thu mua'}
                                {trade.status === 'Chờ duyệt' && 'Chờ duyệt'}
                                {trade.status === 'Đã hủy' && 'Đã hủy'}
                              </span>
                            </td>
                            <td style={{ padding: '12px 16px', color: 'var(--color-outline)' }}>{trade.dateCreated}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* SUB-VIEW 5: PROFILE INFO */}
            {activeTab === 'profile' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Profile Edit */}
                <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px' }}>
                    Chỉnh Sửa Thông Tin Cá Nhân
                  </h3>
                  
                  {profileSuccess && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#81c784', background: 'rgba(76,175,80,0.1)', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
                      <CheckCircle2 size={16} />
                      <span>Cập nhật thông tin tài khoản thành công!</span>
                    </div>
                  )}

                  <form onSubmit={handleProfileUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="overview-subgrid">
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-outline)', marginBottom: '6px', fontWeight: '600' }}>Họ và tên</label>
                        <input
                          type="text"
                          value={profileForm.fullName}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, fullName: e.target.value }))}
                          className="form-input"
                          style={{ padding: '10px' }}
                          required
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-outline)', marginBottom: '6px', fontWeight: '600' }}>Số điện thoại</label>
                        <input
                          type="text"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="form-input"
                          style={{ padding: '10px' }}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-outline)', marginBottom: '6px', fontWeight: '600' }}>Địa chỉ nhận hàng mặc định</label>
                      <textarea
                        value={profileForm.address}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, address: e.target.value }))}
                        className="form-input"
                        style={{ padding: '10px' }}
                        rows="3"
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px', alignSelf: 'flex-start' }}>
                      Lưu Thay Đổi
                    </button>
                  </form>
                </div>

                {/* Change Password */}
                <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Lock size={18} color="var(--color-primary-dim)" />
                    Đổi Mật Khẩu Bảo Mật
                  </h3>

                  {passwordError && (
                    <div style={{ background: 'rgba(255,76,76,0.1)', border: '1px solid rgba(255,76,76,0.3)', color: '#ffb4ab', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
                      {passwordError}
                    </div>
                  )}

                  {passwordSuccess && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#81c784', background: 'rgba(76,175,80,0.1)', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
                      <CheckCircle2 size={16} />
                      <span>Đổi mật khẩu bảo mật thành công! Mật khẩu mới đã được kích hoạt.</span>
                    </div>
                  )}

                  <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-outline)', marginBottom: '6px', fontWeight: '600' }}>Mật khẩu cũ</label>
                      <input
                        type="password"
                        value={passwordForm.oldPassword}
                        onChange={(e) => setPasswordForm(prev => ({ ...prev, oldPassword: e.target.value }))}
                        className="form-input"
                        placeholder="••••••••"
                        style={{ padding: '10px' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="overview-subgrid">
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-outline)', marginBottom: '6px', fontWeight: '600' }}>Mật khẩu mới</label>
                        <input
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="form-input"
                          placeholder="Tối thiểu 6 ký tự"
                          style={{ padding: '10px' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-outline)', marginBottom: '6px', fontWeight: '600' }}>Nhập lại mật khẩu mới</label>
                        <input
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="form-input"
                          placeholder="Trùng khớp mật khẩu trên"
                          style={{ padding: '10px' }}
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn btn-secondary" style={{ padding: '10px 20px', alignSelf: 'flex-start' }}>
                      Xác Nhận Đổi Mật Khẩu
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* SUB-VIEW 6: WARRANTY POLICY (STATIC HTML TEXT) */}
            {activeTab === 'policy' && (
              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px' }}>
                  Chính Sách & Quy Định Bảo Hành Cửa Hàng
                </h3>

                <div className="static-policy-content" style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'white', marginBottom: '6px' }}>1. Quy định đổi trả trong 7 ngày đầu</h4>
                    <p>
                      Mọi thiết bị phần cứng (Laptop, CPU, RAM, VGA, Gaming Gear) bán ra tại Kinetic Tech đều được hỗ trợ chính sách đổi trả 1-đổi-1 hoàn toàn miễn phí trong vòng 7 ngày đầu tiên kể từ khi bàn giao thiết bị, nếu phát sinh lỗi phần cứng từ nhà sản xuất. Sản phẩm đổi trả phải còn nguyên hộp, nguyên tem bảo hành của hãng và không móp méo trầy xước vật lý.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'white', marginBottom: '6px' }}>2. Điều kiện bảo hành tiêu chuẩn</h4>
                    <p>
                      Các linh kiện máy tính, màn hình và thiết bị di động được bảo hành miễn phí theo đúng thời gian cam kết của hãng sản xuất (thông thường từ 12 - 36 tháng). Tem bảo hành và số Serial Number trên sản phẩm phải còn nguyên vẹn, không có dấu hiệu tẩy xóa, sửa đổi hay rách vỡ.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-error)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <AlertTriangle size={14} />
                      3. Các trường hợp từ chối bảo hành
                    </h4>
                    <ul style={{ paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <li>Thiết bị có dấu hiệu rơi rớt va chạm, móp méo, nứt vỡ vật lý hoặc hư hại do ngoại lực tác động.</li>
                      <li>Thiết bị bị ẩm ướt, dính nước, vào chất lỏng hoặc bảo quản trong môi trường nhiệt độ ẩm mốc vượt tiêu chuẩn kỹ thuật.</li>
                      <li>Có dấu hiệu chập cháy linh kiện bên trong do cấp sai nguồn điện, sét đánh, thiên tai hoặc côn trùng xâm nhập.</li>
                      <li>Sản phẩm đã bị tháo gỡ tự ý can thiệp phần cứng hoặc mang đi sửa chữa tại các trung tâm không thuộc ủy quyền của Kinetic Tech.</li>
                      <li>Lỗi phát sinh do cài đặt phần mềm độc hại, virus hoặc tự ý ép xung (overclock) vượt giới hạn khuyến cáo của hãng dẫn tới cháy hỏng chip.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'white', marginBottom: '6px' }}>4. Thời gian tiếp nhận và xử lý sự cố</h4>
                    <p>
                      Kinetic Tech nhận bảo hành trực tiếp từ 09:00 đến 17:00 tất cả các ngày trong tuần tại khu vực kỹ thuật. Thời gian kiểm định và khắc phục trung bình từ 3 - 5 ngày làm việc. Đối với các sản phẩm cao cấp cần gửi bảo hành hãng tại nước ngoài, thời gian xử lý có thể kéo dài từ 2 - 3 tuần (sẽ có máy backup tương đương cho khách hàng sử dụng trong lúc chờ đợi).
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-VIEW 7: FEEDBACK (GÓP Ý PHẢN HỒI) */}
            {activeTab === 'feedback' && (
              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px' }}>
                  Góp Ý - Phản Hồi Về Dịch Vụ
                </h3>

                <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginBottom: '20px', lineHeight: '1.6' }}>
                  Mọi ý kiến đóng góp của bạn là động lực giúp Kinetic Tech nâng cao chất lượng dịch vụ chăm sóc khách hàng và trải nghiệm mua sắm hi-end. Dữ liệu góp ý sau khi gửi sẽ được lưu trữ trực tiếp vào hệ thống quản lý để ban giám đốc tiếp nhận xử lý.
                </p>

                {feedbackSuccess ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: 'rgba(76, 175, 80, 0.15)',
                      border: '2px solid #81c784',
                      color: '#81c784',
                      marginBottom: '16px'
                    }}>
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'white', marginBottom: '8px' }}>Gửi góp ý thành công!</h4>
                    <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', maxWidth: '400px', margin: '0 auto' }}>
                      Cảm ơn bạn đã dành thời gian phản hồi. Đội ngũ quản trị viên đã ghi nhận và sẽ phản hồi qua email/SĐT đăng ký của bạn nếu cần thiết.
                    </p>
                    <button onClick={() => setFeedbackSuccess(false)} className="btn btn-outline" style={{ marginTop: '20px', padding: '8px 16px', fontSize: '12px' }}>
                      Gửi thêm góp ý khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFeedbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-outline)', marginBottom: '6px', fontWeight: '600' }}>Tiêu đề góp ý</label>
                      <input
                        type="text"
                        value={feedbackTitle}
                        onChange={(e) => setFeedbackTitle(e.target.value)}
                        placeholder="Ví dụ: Đóng góp về thái độ phục vụ, đề xuất mặt hàng mới..."
                        className="form-input"
                        style={{ padding: '10px' }}
                        required
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', color: 'var(--color-outline)', marginBottom: '6px', fontWeight: '600' }}>Nội dung chi tiết</label>
                      <textarea
                        value={feedbackContent}
                        onChange={(e) => setFeedbackContent(e.target.value)}
                        placeholder="Vui lòng viết rõ các ý kiến đóng góp, đề xuất nâng cấp dịch vụ hoặc phản ánh trải nghiệm mua sắm của bạn tại Kinetic Tech..."
                        className="form-input"
                        style={{ padding: '10px' }}
                        rows="6"
                        required
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      style={{ padding: '10px 24px', alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <Send size={14} />
                      Gửi Góp Ý
                    </button>
                  </form>
                )}
              </div>
            )}
            
          </main>
        </div>

      </div>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import OverviewTab from './OverviewTab';
import OrdersTab from './OrdersTab';
import WarrantyTab from './WarrantyTab';
import TradeInTab from './TradeInTab';
import ProfileTab from './ProfileTab';
import PolicyTab from './PolicyTab';
import FeedbackTab from './FeedbackTab';
import { createPortal } from 'react-dom';
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
        const orderDateStr = order.date.split(' ')[0]; // "2026-06-02"
        let orderDate = new Date();
        if (orderDateStr.includes('-')) {
          orderDate = new Date(orderDateStr);
        } else if (orderDateStr.includes('/')) {
          const parts = orderDateStr.split('/');
          orderDate = new Date(parts[2], parts[1] - 1, parts[0]);
        }
        
        const expDate = new Date(orderDate);
        expDate.setMonth(expDate.getMonth() + 12);
        
        // Formatted dates
        const purchaseDateFormatted = orderDate.toLocaleDateString('vi-VN');
        const expDateFormatted = expDate.toLocaleDateString('vi-VN');
        
        const today = new Date();
        const isUnderWarranty = expDate > today;

        // Find specs or IMEI
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

  const tabProps = {
    currentUser, setActiveView, theme, likedProductIds, onToggleLike, products, orders, onAddOrder, tradeins, onAddTradeIn, feedbacks, onAddFeedback, onUpdateProfile, onAddSupportTicket,
    activeTab, setActiveTab, selectedOrder, setSelectedOrder, supportProduct, setSupportProduct, supportOrderId, setSupportOrderId, supportMessage, setSupportMessage, supportUrgency, setSupportUrgency, supportSuccess, setSupportSuccess,
    feedbackTitle, setFeedbackTitle, feedbackContent, setFeedbackContent, feedbackSuccess, setFeedbackSuccess, profileForm, setProfileForm, profileSuccess, setProfileSuccess, passwordForm, setPasswordForm, passwordError, setPasswordError, passwordSuccess, setPasswordSuccess,
    formatVND, userOrders, recentOrders, userTradeins, favoriteProducts, warrantyProducts, vouchers, handleCopyVoucher, handleFeedbackSubmit, handleSupportRequestSubmit, handleProfileUpdate, handlePasswordChange
  };

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
            {activeTab === 'overview' && <OverviewTab {...tabProps} />}
            {activeTab === 'orders' && <OrdersTab {...tabProps} />}
            {activeTab === 'warranty' && <WarrantyTab {...tabProps} />}
            {activeTab === 'tradein' && <TradeInTab {...tabProps} />}
            {activeTab === 'profile' && <ProfileTab {...tabProps} />}
            {activeTab === 'policy' && <PolicyTab {...tabProps} />}
            {activeTab === 'feedback' && <FeedbackTab {...tabProps} />}
            
            {/* SUB-VIEW 1: OVERVIEW */}

            {/* SUB-VIEW 2: PURCHASE HISTORY */}

            {/* SUB-VIEW 3: WARRANTY LOOKUP */}

            {/* MAIN PORTAL TABS CONTINUED FOR TRADE-IN, PROFILE, POLICY, FEEDBACK */}



            
          </main>
        </div>

      </div>
    </div>
  );
}
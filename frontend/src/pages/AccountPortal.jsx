import React, { useState, useMemo } from 'react';
import OverviewTab from '../components/account/OverviewTab';
import OrdersTab from '../components/account/OrdersTab';
import WarrantyTab from '../components/account/WarrantyTab';
import TradeInTab from '../components/account/TradeInTab';
import ProfileTab from '../components/account/ProfileTab';
import PolicyTab from '../components/account/PolicyTab';
import FeedbackTab from '../components/account/FeedbackTab';
import { createPortal } from 'react-dom';
import api from '../utils/api';
import { useAppContext } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
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
  setActiveView, onToggleLike, products = [], onAddOrder, onAddTradeIn, onAddFeedback, onAddSupportTicket
}) {
  const { theme, likedProductIds = [], orders = [], tradeins = [], feedbacks = [], handleToggleLike, setSelectedDetailProduct } = useAppContext();
  const { currentUser, handleUpdateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState(() => {
    try {
      return localStorage.getItem('kinetic_account_tab') || 'overview';
    } catch {
      return 'overview';
    }
  });

  const { setOrders } = useAppContext();
  const [fetchedTradeins, setFetchedTradeins] = useState([]);
  const [fetchedFeedbacks, setFetchedFeedbacks] = useState([]);
  const [fetchedVouchers, setFetchedVouchers] = useState([]);

  React.useEffect(() => {
    if (currentUser) {
      api.get('/orders')
        .then(res => {
          if (res.data) setOrders(res.data);
        })
        .catch(err => console.error('Failed to fetch user orders', err));

      api.get('/trade-in/my-requests')
        .then(res => {
          if (res.data) setFetchedTradeins(res.data);
        })
        .catch(err => console.error('Failed to fetch trade-ins', err));

      api.get('/feedback/my-feedbacks')
        .then(res => {
          if (res.data) setFetchedFeedbacks(res.data);
        })
        .catch(err => console.error('Failed to fetch feedbacks', err));
        
      api.get('/coupons')
        .then(res => {
          if (res.data) {
            const mappedVouchers = res.data.map(c => ({
              code: c.code,
              label: c.discountPercentage ? `Giảm ${c.discountPercentage}%` : `Giảm ${new Intl.NumberFormat('vi-VN').format(c.discountAmount)}đ`,
              desc: `Khuyến mãi cho đơn hàng hợp lệ`,
              exp: `HSD: ${new Date(c.validUntil).toLocaleDateString('vi-VN')}`
            }));
            setFetchedVouchers(mappedVouchers);
          }
        })
        .catch(err => console.error('Failed to fetch coupons', err));
    }
  }, [currentUser, setOrders]);

  React.useEffect(() => {
    try {
      localStorage.setItem('kinetic_account_tab', activeTab);
    } catch (e) {
      console.error('Failed to save account tab', e);
    }
  }, [activeTab]);
  
  // Selected order details modal state
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Support request form state (for orders page support button)
  const [supportProduct, setSupportProduct] = useState(null);
  const [supportOrderId, setSupportOrderId] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportUrgency, setSupportUrgency] = useState('Thường');
  const [supportType, setSupportType] = useState('Báo lỗi phần cứng thiết bị');
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

  // 1. Map API orders to the format expected by the frontend
  const userOrders = useMemo(() => {
    if (!currentUser) return [];
    return orders.map(o => ({
      ...o,
      id: o.id,
      date: o.date || new Date(o.createdAt).toLocaleString('vi-VN'),
      total: o.total || o.totalAmount || 0,
      status: (o.status || 'pending').toUpperCase(),
      customerName: o.User?.fullName || currentUser?.fullName || 'Khách hàng',
      phone: o.User?.phoneNumber || o.User?.phone || currentUser?.phoneNumber || currentUser?.phone || 'Chưa cập nhật',
      address: o.shippingAddress || o.UserAddress?.address || currentUser?.address || 'Hà Nội',
      paymentMethod: o.paymentMethod || 'COD',
      items: o.items || (o.OrderItem ? o.OrderItem.map(oi => ({
        id: oi.productVariantId || oi.id,
        productId: oi.ProductVariant?.productId || oi.ProductVariant?.Product?.id,
        name: oi.ProductVariant?.Product?.name || 'Linh kiện PC',
        quantity: oi.quantity,
        price: oi.price,
        image: oi.ProductVariant?.Product?.ProductImage?.[0]?.url || ''
      })) : [])
    }));
  }, [orders, currentUser]);

  // Get 3 most recent orders
  const recentOrders = useMemo(() => {
    return userOrders.slice(0, 3);
  }, [userOrders]);

  // 2. Filter trade-ins for current logged in user
  const userTradeins = useMemo(() => {
    if (!currentUser) return [];
    return fetchedTradeins.length > 0 ? fetchedTradeins : tradeins;
  }, [fetchedTradeins, tradeins, currentUser]);

  const userFeedbacks = useMemo(() => {
    if (!currentUser) return [];
    return fetchedFeedbacks.length > 0 ? fetchedFeedbacks : feedbacks;
  }, [fetchedFeedbacks, feedbacks, currentUser]);

  // 3. Get liked products list
  const favoriteProducts = useMemo(() => {
    return products.filter(p => likedProductIds.includes(p.id));
  }, [products, likedProductIds]);

  // 4. Warranty lookup: Automatically syncs and lists tech products successfully purchased
  // Tech products are from orders with status 'completed'
  const warrantyProducts = useMemo(() => {
    const completedOrders = userOrders.filter(o => o.status === 'DELIVERED');
    const items = [];
    
    completedOrders.forEach(order => {
      order.items.forEach(item => {
        let orderDate = new Date();
        if (order.createdAt) {
          orderDate = new Date(order.createdAt);
        } else if (order.date) {
          const datePart = order.date.split(' ').find(p => p.includes('/'));
          if (datePart) {
            const parts = datePart.replace(',', '').split('/');
            if (parts.length === 3) orderDate = new Date(parts[2], parts[1] - 1, parts[0]);
          }
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
          productId: item.productId || item.id,
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

  // Standard Voucher list from API
  const vouchers = fetchedVouchers;

  const handleCopyVoucher = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Đã sao chép mã voucher: ${code}`);
  };

  // Submit Feedback
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackTitle.trim() || !feedbackContent.trim()) {
      alert('Vui lòng nhập đầy đủ tiêu đề và nội dung góp ý.');
      return;
    }

    try {
      await api.post('/feedback', {
        title: feedbackTitle,
        content: feedbackContent
      });
      if (onAddFeedback) onAddFeedback();
      setFeedbackSuccess(true);
      setFeedbackTitle('');
      setFeedbackContent('');
      setTimeout(() => {
        setFeedbackSuccess(false);
      }, 4000);
    } catch (err) {
      alert(err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  // Submit Support Ticket from Purchase History detail
  const handleSupportRequestSubmit = async (e) => {
    e.preventDefault();
    if (!supportMessage.trim()) {
      alert('Vui lòng nhập nội dung mô tả sự cố.');
      return;
    }

    try {
      let userDeviceId = undefined;
      let finalDescription = `Thiết bị: ${supportProduct?.name || 'Không xác định'} (Đơn hàng: ${supportOrderId || 'N/A'})\nLoại sự cố: ${supportType}\nChi tiết sự cố: ${supportMessage}`;
      
      // If submitted from Warranty Tab, it has a serial number
      if (supportProduct?.serial) {
        // For warranties, don't include device name in description since it's linked via UserDevice
        finalDescription = `Loại sự cố: ${supportType}\nChi tiết sự cố: ${supportMessage}`;
        
        const parseDate = (dateStr) => {
          if (!dateStr) return new Date().toISOString();
          const parts = dateStr.split('/');
          if (parts.length === 3) {
            return new Date(parts[2], parts[1] - 1, parts[0]).toISOString();
          }
          return new Date(dateStr).toISOString();
        };

        try {
          const deviceResponse = await api.post('/user-devices', {
            productId: supportProduct.productId || supportProduct.id,
            serialNumber: supportProduct.serial,
            purchaseDate: parseDate(supportProduct.purchaseDate),
            warrantyExpiryDate: parseDate(supportProduct.expirationDate)
          });
          userDeviceId = deviceResponse.data.id;
        } catch (deviceErr) {
          if (deviceErr.response?.status === 400 || deviceErr.response?.data?.message?.includes('Serial')) {
             try {
               const existingDevice = await api.get(`/user-devices/warranty/${supportProduct.serial}`);
               userDeviceId = existingDevice.data.id;
             } catch (fetchErr) {
               console.error("Could not fetch existing device", fetchErr);
             }
          } else {
             throw deviceErr;
          }
        }
      }

      const response = await api.post('/tickets', {
        description: finalDescription,
        severity: supportUrgency === 'high' ? 'HIGH' : supportUrgency === 'medium' ? 'MEDIUM' : 'LOW',
        userDeviceId: userDeviceId
      });
      
      // Update global tickets state
      if (onAddSupportTicket) {
        onAddSupportTicket(response.data);
      }
      
      setSupportSuccess(true);
      setSupportMessage('');

      setTimeout(() => {
        setSupportSuccess(false);
        setSupportProduct(null);
      }, 3000);
    } catch (err) {
      alert(err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  // Submit Profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!profileForm.fullName || !profileForm.phone) {
      alert('Vui lòng điền đầy đủ Họ tên và Số điện thoại.');
      return;
    }

    try {
      const response = await api.patch(`/users/${currentUser.id}`, {
        fullName: profileForm.fullName,
        phone: profileForm.phone,
        address: profileForm.address
      });

      // Update global user state
      handleUpdateProfile({
        ...currentUser,
        ...response.data
      });

      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err) {
      alert(err.response?.data?.message || 'Lỗi khi cập nhật hồ sơ.');
    }
  };

  // Submit Password update
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError('');
    if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError('Vui lòng điền đầy đủ các trường.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Mật khẩu mới không khớp.');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError('Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }

    try {
      await api.patch(`/users/${currentUser.id}/password`, {
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword
      });

      setPasswordSuccess(true);
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Có lỗi xảy ra khi đổi mật khẩu.');
    }
  };

  if (!currentUser) {
    return (
      <div  style={{ padding: '60px 20px', textAlign: 'center' }} className="container">
        <div  style={{ maxWidth: '500px', margin: '0 auto', padding: '40px 30px', borderRadius: 'var(--rounded-lg)' }} className="glass-panel">
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
    currentUser, setActiveView, theme, likedProductIds, onToggleLike: handleToggleLike, products, orders, onAddOrder, tradeins: userTradeins, onAddTradeIn, feedbacks: userFeedbacks, onAddFeedback, onUpdateProfile: handleUpdateProfile, onAddSupportTicket,
    activeTab, setActiveTab, selectedOrder, setSelectedOrder, supportProduct, setSupportProduct, supportOrderId, setSupportOrderId, supportMessage, setSupportMessage, supportUrgency, setSupportUrgency, supportType, setSupportType, supportSuccess, setSupportSuccess,
    feedbackTitle, setFeedbackTitle, feedbackContent, setFeedbackContent, feedbackSuccess, setFeedbackSuccess, profileForm, setProfileForm, profileSuccess, setProfileSuccess, passwordForm, setPasswordForm, passwordError, setPasswordError, passwordSuccess, setPasswordSuccess,
    formatVND, userOrders, recentOrders, userTradeins, favoriteProducts, warrantyProducts, vouchers, handleCopyVoucher, handleFeedbackSubmit, handleSupportRequestSubmit, handleProfileUpdate, handlePasswordChange
  };

  return (
    <div style={{ padding: '20px 0 60px' }}>
      <div  className="container">
        
        {/* Welcome Header */}
        <div style={{ marginBottom: '32px' }}  className="animate-fade-in-up">
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
        <div style={{ display: 'grid', gap: '30px', alignItems: 'start' }}   className="grid-responsive-sidebar catalog-layout">
          
          {/* Left Navigation Sidebar */}
          <aside  style={{ borderRadius: 'var(--rounded-lg)', padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }} className="glass-panel">
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
          <main style={{ minHeight: '500px' }}  className="animate-fade-in-up">
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

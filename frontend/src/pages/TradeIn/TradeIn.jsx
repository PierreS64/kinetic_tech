import React, { useState } from 'react';
import api from '../../utils/api';
import { useAppContext } from '../../contexts/AppContext';
import { 
  Cpu,
  Laptop, 
  Smartphone, 
  ChevronRight, 
  Calculator, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  Monitor,
  Camera,
  RotateCcw
} from 'lucide-react';

const COMPONENT_TYPES = [
  { id: 'cpu', label: 'CPU (Vi xử lý)' },
  { id: 'vga', label: 'VGA (Card đồ họa)' },
  { id: 'main', label: 'Mainboard (Bo mạch chủ)' },
  { id: 'ram', label: 'RAM (Bộ nhớ trong)' },
  { id: 'ssd_hdd', label: 'Ổ cứng SSD/HDD' },
  { id: 'psu', label: 'Nguồn máy tính (PSU)' },
  { id: 'case', label: 'Vỏ case máy tính' },
  { id: 'cooler', label: 'Tản nhiệt (Khí / AIO)' },
  { id: 'laptop', label: 'Laptop' },
  { id: 'phone', label: 'Điện thoại di động' },
  { id: 'pc_set', label: 'Trọn bộ máy tính PC' },
  { id: 'other', label: 'Linh kiện / Thiết bị khác' }
];

export default function TradeIn({ currentUser, onAddTradeIn }) {
  const { storeProducts } = useAppContext();
  const [deviceType, setDeviceType] = useState('vga');
  const [modelName, setModelName] = useState('');
  const [usageTime, setUsageTime] = useState('');
  const [notes, setNotes] = useState('');
  const [attachedImage, setAttachedImage] = useState(null);
  
  const [bookingDone, setBookingDone] = useState(false);
  const [bookingCode, setBookingCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    targetDevice: 'Laptop ASUS ROG Strix G16 (2024)',
    appointmentDate: '',
    storeLocation: 'Kinetic Cầu Giấy, Hà Nội'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Limit file size to 2MB to prevent localStorage crashes
      if (file.size > 2 * 1024 * 1024) {
        alert('Dung lượng ảnh quá lớn! Vui lòng chọn ảnh nhỏ hơn 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!modelName.trim()) {
      alert('Vui lòng nhập tên model thiết bị cũ của bạn.');
      return;
    }
    if (!usageTime.trim()) {
      alert('Vui lòng nhập thời gian sử dụng / bảo hành.');
      return;
    }
    if (!formData.fullName || !formData.phone || !formData.appointmentDate) {
      alert('Vui lòng nhập đầy đủ thông tin liên hệ và lịch hẹn.');
      return;
    }

    setSubmitting(true);
    try {
      const typeObj = COMPONENT_TYPES.find(t => t.id === deviceType);
      const typeLabel = typeObj ? typeObj.label : 'Linh kiện';
      
      const payload = {
        deviceName: `${typeLabel}: ${modelName}`,
        condition: `Sử dụng: ${usageTime}\nMô tả: ${notes || 'Không có mô tả thêm'}\nNâng cấp lên: ${formData.targetDevice}\nLịch hẹn: ${formData.appointmentDate} tại ${formData.storeLocation}.`
      };
      
      // Call backend API
      const response = await api.post('/trade-in', payload);
      
      const tradeInRecord = response.data;
      setBookingCode(tradeInRecord.id.substring(0, 8).toUpperCase()); // Show short UUID
      setBookingDone(true);

      if (onAddTradeIn) {
        onAddTradeIn(tradeInRecord);
      }
    } catch (error) {
      console.error('Error submitting trade-in:', error);
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại!');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setModelName('');
    setUsageTime('');
    setNotes('');
    setAttachedImage(null);
    setBookingDone(false);
    setBookingCode('');
    setFormData({
      fullName: currentUser?.fullName || '',
      phone: currentUser?.phone || '',
      email: currentUser?.email || '',
      targetDevice: 'Laptop ASUS ROG Strix G16 (2024)',
      appointmentDate: '',
      storeLocation: 'Kinetic Cầu Giấy, Hà Nội'
    });
  };

  return (
    <div className="container" style={{ minHeight: '80vh', paddingBottom: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Intro Banner */}
      <div 
         
        style={{
          borderRadius: 'var(--rounded-lg)',
          padding: '40px 30px',
          textAlign: 'center',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden'
        }}
       className="glass-panel-glow-orange animate-fade-in-up">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span  style={{ padding: '4px 12px', fontSize: '12px', borderRadius: 'var(--rounded-full)', marginBottom: '12px' }} className="spec-chip-primary">
            DỊCH VỤ THU CŨ ĐỔI MỚI HI-END
          </span>
          <h2 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'Montserrat', marginTop: '12px' }}>
            YÊU CẦU THẨM ĐỊNH LINH KIỆN & THIẾT BỊ
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', marginTop: '8px', maxWidth: '700px', margin: '8px auto 0', lineHeight: '1.6' }}>
            Hãy gửi yêu cầu thẩm định trực tuyến cho thiết bị hoặc linh kiện cũ của bạn. Đội ngũ chuyên gia của <strong style={{ color: 'var(--color-secondary-dim)' }}>Kinetic Tech</strong> sẽ xem xét tình trạng thực tế qua hình ảnh và báo giá thu bù tốt nhất trực tiếp lên tài khoản của bạn trong 15-30 phút!
          </p>
        </div>
      </div>

      {bookingDone ? (
        /* Success Booking State */
        <div 
          
          style={{
            maxWidth: '650px',
            margin: '0 auto',
            padding: '40px 30px',
            borderRadius: 'var(--rounded-lg)',
            border: '1px solid rgba(253, 139, 0, 0.3)',
            textAlign: 'center'
          }}
         className="glass-panel animate-fade-in-up">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(253, 139, 0, 0.15)',
            border: '2px solid var(--color-secondary)',
            marginBottom: '20px'
          }}>
            <ShieldCheck size={36} color="var(--color-secondary)" />
          </div>
          <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--color-on-surface)' }}>ĐĂNG KÝ THẨM ĐỊNH THÀNH CÔNG!</h3>
          <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginTop: '8px' }}>
            Mã số yêu cầu thẩm định của bạn: <strong style={{ color: 'var(--color-on-surface)', fontSize: '16px' }}>{bookingCode}</strong>
          </p>
          
          <div style={{
            background: 'rgba(0,0,0,0.15)',
            padding: '24px',
            borderRadius: 'var(--rounded-md)',
            margin: '24px 0',
            textAlign: 'left',
            fontSize: '13px',
            border: '1px solid rgba(255,255,255,0.04)',
            lineHeight: '1.6'
          }}>
            <p style={{ marginBottom: '8px' }}><strong>Họ tên khách hàng:</strong> {formData.fullName}</p>
            <p style={{ marginBottom: '8px' }}><strong>Số điện thoại:</strong> {formData.phone}</p>
            <p style={{ marginBottom: '8px' }}><strong>Thiết bị cũ gửi thẩm định:</strong> {COMPONENT_TYPES.find(t => t.id === deviceType)?.label}: {modelName}</p>
            <p style={{ marginBottom: '8px' }}><strong>Sản phẩm đăng ký lên đời:</strong> {formData.targetDevice}</p>
            <p style={{ marginBottom: '8px' }}><strong>Thời gian sử dụng:</strong> {usageTime}</p>
            <p style={{ marginBottom: '8px' }}><strong>Địa điểm tiếp nhận thẩm định:</strong> {formData.storeLocation}</p>
            <p style={{ marginBottom: '8px' }}><strong>Trạng thái yêu cầu:</strong> <span  style={{ background: 'rgba(253,139,0,0.15)', color: '#ffb77d', fontSize: '10px' }} className="status-badge">Chờ thẩm định</span></p>
          </div>
          
          <p style={{ fontSize: '12px', color: 'var(--color-outline)', lineHeight: '1.6', marginBottom: '24px' }}>
            Yêu cầu của bạn đã được chuyển tới phòng thẩm định kỹ thuật của Kinetic. Chúng tôi sẽ xem xét cấu hình, thời gian sử dụng và hình ảnh đính kèm để định giá thu mua tốt nhất. Kết quả báo giá (Trade-in Value) sẽ hiển thị trong trang quản lý tài khoản của bạn (Mục **Tổng quan**) sau ít phút.
          </p>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handleReset}  style={{ flex: 1 }} className="btn btn-outline">Gửi yêu cầu thiết bị khác</button>
            <button onClick={() => window.print()} className="btn btn-ghost" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>In phiếu biên nhận</button>
          </div>
        </div>
      ) : (
        /* Trade-In Assessment Form View */
        <form onSubmit={handleSubmit} style={{
          display: 'grid', gap: '30px'
        }}   className="grid-responsive-2col catalog-layout">
          
          {/* Column 1: Equipment Details */}
          <div  style={{ padding: '28px', borderRadius: 'var(--rounded-md)', display: 'flex', flexDirection: 'column', gap: '20px' }} className="glass-panel">
            <h3 style={{ fontSize: '16px', fontWeight: '800', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calculator size={18} color="var(--color-primary-dim)" />
              1. THÔNG TIN THIẾT BỊ / LINH KIỆN CŨ
            </h3>

            {/* Select Device Type */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-on-surface)' }}>Chọn nhóm linh kiện / thiết bị *</label>
              <select
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
                className="form-input"
                style={{ fontSize: '13px', background: 'var(--color-surface-container-lowest)' }}
              >
                {COMPONENT_TYPES.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Model Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-on-surface)' }}>Tên Model / Mã sản phẩm chính xác *</label>
              <input 
                type="text"
                required
                placeholder="Ví dụ: RTX 3060 Ti Gaming X 8G, Core i5-12400F, v.v."
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                className="form-input"
                style={{ fontSize: '13px' }}
              />
            </div>

            {/* Usage Time / Warranty Status */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-on-surface)' }}>Thời gian đã sử dụng / Tình trạng bảo hành *</label>
              <input 
                type="text"
                required
                placeholder="Ví dụ: Đã dùng 15 tháng, còn bảo hành 21 tháng tại Kinetic/chính hãng"
                value={usageTime}
                onChange={(e) => setUsageTime(e.target.value)}
                className="form-input"
                style={{ fontSize: '13px' }}
              />
            </div>

            {/* Detail notes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-on-surface)' }}>Mô tả chi tiết tình trạng ngoại quan & hoạt động (Không bắt buộc)</label>
              <textarea 
                rows="3"
                placeholder="Ví dụ: Hàng dùng phòng điều hòa, không rỉ sét, quạt chạy êm không ồn, còn nguyên box hóa đơn..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="form-input"
                style={{ fontSize: '13px', resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>

            {/* Image upload preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-on-surface)' }}>Hình ảnh thực tế của linh kiện (Khuyên dùng - Ảnh rõ nét giúp thẩm định nhanh & giá tốt nhất) *</label>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <input 
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  id="trade-in-file-upload-new"
                />
                <label 
                  htmlFor="trade-in-file-upload-new"
                  
                  style={{ fontSize: '12px', padding: '12px 20px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                 className="btn btn-outline">
                  <Camera size={16} /> Tải ảnh thực tế
                </label>
                {attachedImage ? (
                  <div style={{ position: 'relative', width: '70px', height: '70px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'visible' }}>
                    <img 
                      src={attachedImage} 
                      alt="Preview" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }}
                    />
                    <button
                      type="button"
                      onClick={() => setAttachedImage(null)}
                      style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        background: 'var(--color-error)',
                        color: 'var(--color-on-surface)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        fontSize: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: '1'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>Chưa chọn tệp ảnh</span>
                )}
              </div>
            </div>
          </div>

          {/* Column 2: Upgrade Product & Appointment Contact info */}
          <div  style={{ padding: '28px', borderRadius: 'var(--rounded-md)', display: 'flex', flexDirection: 'column', gap: '20px' }} className="glass-panel">
            <h3 style={{ fontSize: '16px', fontWeight: '800', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} color="var(--color-primary-dim)" />
              2. THÔNG TIN KHÁCH HÀNG & LỊCH HẸN
            </h3>

            {/* Target Upgrade Device */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-on-surface)' }}>Chọn sản phẩm muốn lên đời nâng cấp *</label>
              <select
                name="targetDevice"
                value={formData.targetDevice}
                onChange={handleInputChange}
                style={{ fontSize: '13px', background: 'var(--color-surface-container-lowest)' }}
               className="form-input">
                <option value="">-- Chọn sản phẩm muốn nâng cấp lên --</option>
                {/* Sản phẩm thực từ cửa hàng */}
                {storeProducts && storeProducts.slice(0, 30).map(p => (
                  <option key={p.id} value={p.name}>
                    {p.name} {p.price ? `(${p.price.toLocaleString('vi-VN')}₫)` : ''}
                  </option>
                ))}
                {/* Option bổ sung */}
                <option value="Cấu hình PC Custom (Theo yêu cầu)">🔧 Lên đời PC Custom / Tự ráp linh kiện mới</option>
              </select>
            </div>

            {/* Customer Personal Details */}
            <div style={{ display: 'grid', gap: '16px' }}  className="grid-responsive-2col">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-on-surface)' }}>Họ và tên *</label>
                <input 
                  type="text"
                  name="fullName"
                  required
                  placeholder="Họ tên của bạn..."
                  value={formData.fullName}
                  onChange={handleInputChange}
                  
                  style={{ fontSize: '13px' }}
                 className="form-input" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-on-surface)' }}>Số điện thoại liên hệ *</label>
                <input 
                  type="tel"
                  name="phone"
                  required
                  placeholder="Số điện thoại..."
                  value={formData.phone}
                  onChange={handleInputChange}
                  
                  style={{ fontSize: '13px' }}
                 className="form-input" />
              </div>
            </div>

            {/* Receipt Date & Store Address */}
            <div style={{ display: 'grid', gap: '16px' }}  className="grid-responsive-1_2fr">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-on-surface)' }}>Ngày mang máy thẩm định *</label>
                <input 
                  type="date"
                  name="appointmentDate"
                  required
                  value={formData.appointmentDate}
                  onChange={handleInputChange}
                  
                  style={{ fontSize: '13px' }}
                 className="form-input" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-on-surface)' }}>Địa điểm tiếp nhận thẩm định *</label>
                <select
                  name="storeLocation"
                  value={formData.storeLocation}
                  onChange={handleInputChange}
                  
                  style={{ fontSize: '13px', background: 'var(--color-surface-container-lowest)' }}
                 className="form-input">
                  <option value="Kinetic Cầu Giấy, Hà Nội">Kinetic Cầu Giấy - 12 Chùa Hà, HN</option>
                  <option value="Kinetic Đống Đa, Hà Nội">Kinetic Đống Đa - 85 Thái Hà, HN</option>
                  <option value="Thu mua tận nhà (Nội thành HN)">Thu mua tận nơi (Kỹ thuật tới nhà)</option>
                </select>
              </div>
            </div>

            {/* Address if home collection */}
            {formData.storeLocation.includes('tận nhà') && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}  className="animate-fade-in-up">
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-on-surface)' }}>Địa chỉ nhà riêng nhận linh kiện cũ *</label>
                <input 
                  type="text"
                  name="email"
                  required
                  placeholder="Nhập số nhà, ngõ ngách, tên đường..."
                  value={formData.email}
                  onChange={handleInputChange}
                  
                  style={{ fontSize: '13px' }}
                 className="form-input" />
              </div>
            )}

            {/* Tech explanation info card */}
            <div style={{
              background: 'rgba(253, 139, 0, 0.05)',
              border: '1px solid rgba(253, 139, 0, 0.15)',
              padding: '16px',
              borderRadius: 'var(--rounded)',
              fontSize: '11px',
              color: 'var(--color-on-surface-variant)',
              lineHeight: '1.5',
              marginTop: '10px'
            }}>
              <span style={{ color: 'var(--color-on-surface)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <Sparkles size={13} color="var(--color-secondary)" /> QUY TRÌNH THẨM ĐỊNH & BÁO GIÁ
              </span>
              1. Khách hàng gửi form yêu cầu (Kèm đầy đủ ảnh thực tế rõ ràng).<br/>
              2. Kỹ thuật viên Kinetic tiếp nhận hồ sơ, kiểm định model & đánh giá sơ bộ linh kiện.<br/>
              3. Hệ thống phản hồi mức giá thu đổi (Trade-in Value) trực tiếp vào trang **Quản lý tài khoản** của bạn sau 15-30 phút.<br/>
              4. Khách hàng mang linh kiện đến cửa hàng đối chiếu và cấn trừ thanh toán nâng cấp.
            </div>

            {currentUser?.role === 'ADMIN' ? (
              <div style={{
                width: '100%',
                padding: '14px',
                fontSize: '14px',
                fontWeight: '700',
                textAlign: 'center',
                borderRadius: 'var(--rounded-md)',
                background: 'rgba(255, 0, 0, 0.1)',
                border: '1px solid rgba(255, 0, 0, 0.3)',
                color: '#ffb4ab',
                marginTop: '12px'
              }}>
                Tài khoản quản trị không thể tạo yêu cầu thu cũ đổi mới.
              </div>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '14px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '12px'
                }}
               className="btn btn-secondary">
                {submitting ? 'ĐANG GỬI YÊU CẦU...' : 'GỬI YÊU CẦU THẨM ĐỊNH ONLINE'}
                <ArrowRight size={16} />
              </button>
            )}
          </div>

        </form>
      )}

    </div>
  );
}

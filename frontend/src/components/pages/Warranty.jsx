import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Settings, 
  Wrench, 
  Calendar, 
  User, 
  Info,
  CheckCircle,
  Truck,
  Activity,
  AlertCircle
} from 'lucide-react';

const MOCK_WARRANTIES = {
  'SN-ROG-AZOTH': {
    productName: 'Bàn phím cơ ASUS ROG Azoth Wireless',
    purchaseDate: '15/08/2025',
    warrantyMonths: 24,
    status: 'active', // 'active', 'expired'
    remainingMonths: 14,
    invoiceId: 'INV-48291',
    history: [
      { date: '15/08/2025', desc: 'Mua mới & Kích hoạt bảo hành điện tử chính hãng.' },
      { date: '10/01/2026', desc: 'Bảo dưỡng vệ sinh phím, lube lại switch cơ học miễn phí.' }
    ]
  },
  'SN-IPHONE15': {
    productName: 'iPhone 15 Pro Max 256GB Titanium',
    purchaseDate: '01/08/2025',
    warrantyMonths: 12,
    status: 'active',
    remainingMonths: 2,
    invoiceId: 'INV-39847',
    history: [
      { date: '01/08/2025', desc: 'Mua mới tại đại lý Kinetic Tech Cầu Giấy.' }
    ]
  },
  'SN-RYZEN7': {
    productName: 'CPU AMD Ryzen 7 7800X3D (AM5)',
    purchaseDate: '10/10/2025',
    warrantyMonths: 36,
    status: 'active',
    remainingMonths: 28,
    invoiceId: 'INV-59028',
    history: [
      { date: '10/10/2025', desc: 'Mua lẻ lắp ráp kèm bộ PC Custom.' }
    ]
  },
  'SN-ASUS-ROG': {
    productName: 'Laptop ASUS ROG Strix G16 (2024)',
    purchaseDate: '12/04/2024',
    warrantyMonths: 24,
    status: 'expired',
    remainingMonths: 0,
    invoiceId: 'INV-20947',
    history: [
      { date: '12/04/2024', desc: 'Mua mới & Kích hoạt bảo hành chính hãng ASUS Việt Nam.' },
      { date: '15/04/2026', desc: 'Bảo hành hết hạn.' }
    ]
  }
};

const MOCK_REPAIR_CASES = {
  'RC-83742': {
    id: 'RC-83742',
    productName: 'Card Màn Hình ASUS ROG Strix RTX 4080 Super',
    reportedIssue: 'Quạt tản nhiệt số 2 phát ra tiếng kêu to và quay không đều khi đạt nhiệt độ > 70 độ.',
    statusStep: 3, // 1: Received, 2: Inspected, 3: Under Repair, 4: Ready
    receivedDate: '28/05/2026',
    estimatedDate: '06/06/2026',
    technician: 'Lê Thế Dân (Chuyên viên Đồ họa & GPU)',
    updates: [
      { date: '28/05/2026 10:00', desc: 'Nhận thiết bị lỗi tại Kinetic Cầu Giấy.' },
      { date: '29/05/2026 14:30', desc: 'Kỹ thuật viên kiểm tra phát hiện vỡ trục bạc đạn quạt số 2. Đã đặt linh kiện quạt chính hãng thay thế.' },
      { date: '01/06/2026 11:00', desc: 'Bắt đầu tháo rã thay mới cụm quạt tản và tra lại keo gốm tản nhiệt MX-6.' }
    ]
  }
};

export default function Warranty() {
  const [activeTab, setActiveTab] = useState('lookup'); // 'lookup', 'activate', 'repair'
  const [searchSn, setSearchSn] = useState('');
  const [warrantyResult, setWarrantyResult] = useState(null);
  const [searchError, setSearchError] = useState('');

  const [searchRepairId, setSearchRepairId] = useState('');
  const [repairResult, setRepairResult] = useState(null);
  const [repairError, setRepairError] = useState('');

  const [activationForm, setActivationForm] = useState({
    sn: '',
    fullName: '',
    phone: '',
    email: '',
    invoiceId: ''
  });
  const [activationSuccess, setActivationSuccess] = useState(false);
  const [activating, setActivating] = useState(false);

  const handleSnSearch = (e) => {
    e.preventDefault();
    setSearchError('');
    setWarrantyResult(null);
    
    const sn = searchSn.trim().toUpperCase();
    if (!sn) return;

    if (MOCK_WARRANTIES[sn]) {
      setWarrantyResult({
        sn,
        ...MOCK_WARRANTIES[sn]
      });
    } else {
      setSearchError('Không tìm thấy thông tin bảo hành cho Serial Number này. Vui lòng kiểm tra lại hoặc liên hệ hotline.');
    }
  };

  const handleRepairSearch = (e) => {
    e.preventDefault();
    setRepairError('');
    setRepairResult(null);

    const rc = searchRepairId.trim().toUpperCase();
    if (!rc) return;

    if (MOCK_REPAIR_CASES[rc]) {
      setRepairResult(MOCK_REPAIR_CASES[rc]);
    } else {
      setRepairError('Mã số phiếu sửa chữa không tồn tại. Vui lòng kiểm tra lại.');
    }
  };

  const handleActivate = (e) => {
    e.preventDefault();
    if (!activationForm.sn || !activationForm.fullName || !activationForm.phone) {
      alert('Vui lòng nhập đầy đủ các trường thông tin bắt buộc.');
      return;
    }

    setActivating(true);
    setTimeout(() => {
      setActivating(false);
      setActivationSuccess(true);
    }, 1500);
  };

  const handleResetActivation = () => {
    setActivationForm({ sn: '', fullName: '', phone: '', email: '', invoiceId: '' });
    setActivationSuccess(false);
  };

  return (
    <div style={{ minHeight: '80vh' }}>
      
      {/* Search Type Tabs */}
      <div 
        className="glass-panel" 
        style={{
          borderRadius: 'var(--rounded-md)',
          padding: '4px',
          display: 'flex',
          marginBottom: '32px',
          maxWidth: '600px',
          margin: '0 auto 32px'
        }}
      >
        <button
          onClick={() => {
            setActiveTab('lookup');
            setWarrantyResult(null);
            setSearchError('');
          }}
          className={`btn ${activeTab === 'lookup' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ flex: 1, padding: '10px', fontSize: '13px' }}
        >
          Tra Cứu Bảo Hành
        </button>
        <button
          onClick={() => {
            setActiveTab('activate');
            setActivationSuccess(false);
          }}
          className={`btn ${activeTab === 'activate' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ flex: 1, padding: '10px', fontSize: '13px' }}
        >
          Kích Hoạt Điện Tử
        </button>
        <button
          onClick={() => {
            setActiveTab('repair');
            setRepairResult(null);
            setRepairError('');
          }}
          className={`btn ${activeTab === 'repair' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ flex: 1, padding: '10px', fontSize: '13px' }}
        >
          Tiến Độ Sửa Chữa
        </button>
      </div>

      {activeTab === 'lookup' && (
        /* WARRANTY LOOKUP TAB */
        <div style={{ maxWidth: '680px', margin: '0 auto' }} className="animate-fade-in-up">
          <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--rounded-md)', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="var(--color-primary-dim)" />
              TRA CỨU BẢO HÀNH ĐIỆN TỬ
            </h3>
            
            <form onSubmit={handleSnSearch} style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text"
                placeholder="Nhập Serial Number (Ví dụ: SN-ROG-AZOTH, SN-RYZEN7...)"
                value={searchSn}
                onChange={(e) => setSearchSn(e.target.value)}
                className="form-input"
                style={{ fontSize: '13px' }}
              />
              <button type="submit" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                <Search size={15} /> Tìm kiếm
              </button>
            </form>

            <div style={{ marginTop: '12px', fontSize: '11px', color: 'var(--color-outline)' }}>
              💡 Thử các S/N mẫu: <strong style={{ color: 'var(--color-primary-dim)', cursor: 'pointer' }} onClick={() => setSearchSn('SN-ROG-AZOTH')}>SN-ROG-AZOTH</strong>, <strong style={{ color: 'var(--color-primary-dim)', cursor: 'pointer' }} onClick={() => setSearchSn('SN-RYZEN7')}>SN-RYZEN7</strong> hoặc <strong style={{ color: 'var(--color-primary-dim)', cursor: 'pointer' }} onClick={() => setSearchSn('SN-ASUS-ROG')}>SN-ASUS-ROG</strong> (hết hạn).
            </div>
          </div>

          {searchError && (
            <div className="glass-panel animate-fade-in-up" style={{ padding: '20px', borderRadius: 'var(--rounded-md)', border: '1px solid rgba(255, 76, 76, 0.25)', display: 'flex', gap: '10px', color: '#ff8a8a', fontSize: '13px' }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <p>{searchError}</p>
            </div>
          )}

          {warrantyResult && (
            <div className="glass-panel animate-fade-in-up" style={{ padding: '30px', borderRadius: 'var(--rounded-md)', border: `1px solid ${warrantyResult.status === 'active' ? 'rgba(76, 175, 80, 0.25)' : 'rgba(255, 76, 76, 0.25)'}` }}>
              {/* Product header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '16px', marginBottom: '20px' }}>
                <div>
                  <span className="spec-chip-primary" style={{ fontSize: '11px' }}>S/N: {warrantyResult.sn}</span>
                  <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'white', marginTop: '6px' }}>{warrantyResult.productName}</h4>
                  <span style={{ fontSize: '12px', color: 'var(--color-outline)', display: 'block', marginTop: '4px' }}>Hóa đơn: {warrantyResult.invoiceId}</span>
                </div>

                <div>
                  {warrantyResult.status === 'active' ? (
                    <span className="status-badge status-badge-stock">Còn hạn bảo hành</span>
                  ) : (
                    <span className="status-badge" style={{ background: '#93000a', color: '#ffdad6', border: '1px solid #ffb4ab' }}>Hết hạn bảo hành</span>
                  )}
                </div>
              </div>

              {/* Specs and dates */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px', marginBottom: '24px' }}>
                <div>
                  <span style={{ color: 'var(--color-outline)' }}>Ngày mua hàng:</span>
                  <p style={{ color: 'white', fontWeight: '600', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} /> {warrantyResult.purchaseDate}
                  </p>
                </div>
                <div>
                  <span style={{ color: 'var(--color-outline)' }}>Thời hạn bảo hành:</span>
                  <p style={{ color: 'white', fontWeight: '600', marginTop: '2px' }}>
                    {warrantyResult.warrantyMonths} Tháng {warrantyResult.status === 'active' && `(Còn ${warrantyResult.remainingMonths} tháng)`}
                  </p>
                </div>
              </div>

              {/* History timeline */}
              <div>
                <h5 style={{ fontSize: '12px', color: 'var(--color-outline)', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>
                  LỊCH SỬ DỊCH VỤ / SỬA CHỮA
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', paddingLeft: '20px' }}>
                  {/* Vertical bar line */}
                  <div style={{ position: 'absolute', left: '4px', top: '4px', bottom: '4px', width: '2px', background: 'rgba(255,255,255,0.06)' }} />
                  
                  {warrantyResult.history.map((hist, i) => (
                    <div key={i} style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', left: '-20px', top: '3px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-primary)', border: '2px solid var(--color-background)' }} />
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)', display: 'block' }}>{hist.date}</span>
                      <p style={{ fontSize: '12px', color: 'white', marginTop: '2px' }}>{hist.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'activate' && (
        /* WARRANTY ACTIVATION TAB */
        <div style={{ maxWidth: '600px', margin: '0 auto' }} className="animate-fade-in-up">
          {activationSuccess ? (
            <div className="glass-panel" style={{ padding: '40px 30px', borderRadius: 'var(--rounded-lg)', textAlign: 'center', border: '1px solid rgba(76, 175, 80, 0.3)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyInters: 'center', width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(76, 175, 80, 0.15)', border: '2px solid #81c784', justifyContent: 'center', marginBottom: '16px' }}>
                <CheckCircle size={30} color="#81c784" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'white' }}>KÍCH HOẠT BẢO HÀNH THÀNH CÔNG!</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginTop: '8px', lineHeight: '1.5' }}>
                Cảm ơn {activationForm.fullName}. Thiết bị có Serial Number <strong>{activationForm.sn}</strong> đã được kích hoạt bảo hành điện tử chính hãng từ ngày hôm nay. Hóa đơn và thời gian bảo hành đã được đồng bộ lên hệ thống Kinetic Tech.
              </p>
              <button onClick={handleResetActivation} className="btn btn-outline" style={{ marginTop: '24px', width: '100%', padding: '12px' }}>
                Kích hoạt thiết bị khác
              </button>
            </div>
          ) : (
            <div className="glass-panel" style={{ padding: '30px', borderRadius: 'var(--rounded-md)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="var(--color-primary-dim)" />
                KÍCH HOẠT BẢO HÀNH ĐIỆN TỬ MỚI
              </h3>

              <form onSubmit={handleActivate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>Serial Number (S/N) sản phẩm *</label>
                  <input 
                    type="text"
                    required
                    placeholder="In trên vỏ hộp hoặc tem thiết bị (Vd: SN-XXXX)..."
                    value={activationForm.sn}
                    onChange={(e) => setActivationForm(prev => ({ ...prev, sn: e.target.value }))}
                    className="form-input"
                    style={{ fontSize: '13px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>Họ và tên chủ sở hữu *</label>
                    <input 
                      type="text"
                      required
                      placeholder="Họ tên người mua hàng..."
                      value={activationForm.fullName}
                      onChange={(e) => setActivationForm(prev => ({ ...prev, fullName: e.target.value }))}
                      className="form-input"
                      style={{ fontSize: '13px' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>Số điện thoại liên kết *</label>
                    <input 
                      type="tel"
                      required
                      placeholder="Dùng để tra cứu sau này..."
                      value={activationForm.phone}
                      onChange={(e) => setActivationForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="form-input"
                      style={{ fontSize: '13px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>Địa chỉ Email (Nhận thông báo)</label>
                    <input 
                      type="email"
                      placeholder="example@gmail.com..."
                      value={activationForm.email}
                      onChange={(e) => setActivationForm(prev => ({ ...prev, email: e.target.value }))}
                      className="form-input"
                      style={{ fontSize: '13px' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>Mã số hóa đơn mua hàng (Nếu có)</label>
                    <input 
                      type="text"
                      placeholder="INV-XXXXX..."
                      value={activationForm.invoiceId}
                      onChange={(e) => setActivationForm(prev => ({ ...prev, invoiceId: e.target.value }))}
                      className="form-input"
                      style={{ fontSize: '13px' }}
                    />
                  </div>
                </div>

                <button type="submit" disabled={activating} className="btn btn-secondary" style={{ width: '100%', padding: '12px', fontWeight: '700', marginTop: '10px' }}>
                  {activating ? 'Đang kích hoạt...' : 'KÍCH HOẠT BẢO HÀNH ĐIỆN TỬ'}
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {activeTab === 'repair' && (
        /* REPAIR TRACKING TAB */
        <div style={{ maxWidth: '680px', margin: '0 auto' }} className="animate-fade-in-up">
          <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--rounded-md)', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wrench size={18} color="var(--color-primary-dim)" />
              KIỂM TRA TIẾN ĐỘ SỬA CHỮA / BẢO HÀNH
            </h3>
            
            <form onSubmit={handleRepairSearch} style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text"
                placeholder="Nhập mã phiếu sửa chữa (Ví dụ: RC-83742...)"
                value={searchRepairId}
                onChange={(e) => setSearchRepairId(e.target.value)}
                className="form-input"
                style={{ fontSize: '13px' }}
              />
              <button type="submit" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                <Search size={15} /> Kiểm tra
              </button>
            </form>

            <div style={{ marginTop: '12px', fontSize: '11px', color: 'var(--color-outline)' }}>
              💡 Phiếu sửa chữa mẫu: <strong style={{ color: 'var(--color-primary-dim)', cursor: 'pointer' }} onClick={() => setSearchRepairId('RC-83742')}>RC-83742</strong>
            </div>
          </div>

          {repairError && (
            <div className="glass-panel animate-fade-in-up" style={{ padding: '20px', borderRadius: 'var(--rounded-md)', border: '1px solid rgba(255, 76, 76, 0.25)', display: 'flex', gap: '10px', color: '#ff8a8a', fontSize: '13px' }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <p>{repairError}</p>
            </div>
          )}

          {repairResult && (
            <div className="glass-panel animate-fade-in-up" style={{ padding: '30px', borderRadius: 'var(--rounded-md)' }}>
              
              {/* Header card */}
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '16px', marginBottom: '24px' }}>
                <span className="spec-chip-primary" style={{ fontSize: '11px' }}>Phiếu nhận sửa chữa: {repairResult.id}</span>
                <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'white', marginTop: '6px' }}>{repairResult.productName}</h4>
                <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '6px', lineHeight: '1.4' }}>
                  <strong>Lỗi báo cáo:</strong> {repairResult.reportedIssue}
                </p>
              </div>

              {/* Progress step tracking wizard */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '8px',
                position: 'relative',
                marginBottom: '30px',
                paddingBottom: '10px'
              }}>
                {[
                  { step: 1, label: 'Nhận máy', icon: CheckCircle },
                  { step: 2, label: 'Kiểm tra', icon: Activity },
                  { step: 3, label: 'Sửa chữa', icon: Wrench },
                  { step: 4, label: 'Bàn giao', icon: Truck }
                ].map((item) => {
                  const isCompleted = repairResult.statusStep > item.step;
                  const isCurrent = repairResult.statusStep === item.step;
                  const StepIcon = item.icon;
                  const itemColor = isCompleted ? '#81c784' : isCurrent ? 'var(--color-primary-dim)' : 'var(--color-outline-variant)';

                  return (
                    <div key={item.step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '6px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: isCompleted ? 'rgba(76, 175, 80, 0.15)' : isCurrent ? 'var(--color-primary-container)' : 'rgba(255,255,255,0.02)',
                        border: `2px solid ${itemColor}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: itemColor
                      }}>
                        <StepIcon size={16} />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: isCurrent ? 'bold' : 'normal', color: isCurrent ? 'white' : 'var(--color-outline)' }}>
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Meta information */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                fontSize: '13px',
                background: 'rgba(0,0,0,0.15)',
                padding: '16px',
                borderRadius: 'var(--rounded-md)',
                marginBottom: '24px',
                border: '1px solid rgba(255,255,255,0.04)'
              }}>
                <div>
                  <span style={{ color: 'var(--color-outline)', display: 'block', marginBottom: '2px' }}>Kỹ thuật viên phụ trách:</span>
                  <span style={{ color: 'white', fontWeight: '600' }}>{repairResult.technician}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--color-outline)', display: 'block', marginBottom: '2px' }}>Hẹn trả máy dự kiến:</span>
                  <span style={{ color: 'var(--color-secondary-dim)', fontWeight: '600' }}>{repairResult.estimatedDate}</span>
                </div>
              </div>

              {/* Update Logs */}
              <div>
                <h5 style={{ fontSize: '12px', color: 'var(--color-outline)', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px' }}>
                  TIẾN TRÌNH CHI TIẾT
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', paddingLeft: '20px' }}>
                  <div style={{ position: 'absolute', left: '4px', top: '4px', bottom: '4px', width: '2px', background: 'rgba(255,255,255,0.06)' }} />
                  
                  {repairResult.updates.map((up, i) => (
                    <div key={i} style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', left: '-20px', top: '3px', width: '10px', height: '10px', borderRadius: '50%', background: i === 0 ? 'var(--color-primary)' : 'var(--color-outline)', border: '2px solid var(--color-background)' }} />
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)', display: 'block' }}>{up.date}</span>
                      <p style={{ fontSize: '12px', color: 'white', marginTop: '2px' }}>{up.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      )}

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../../utils/api';

export default function Appointments({ theme, currentUser }) {
  const [appointments, setAppointments] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    technicianId: '',
    date: todayStr,
    timeSlot: '09:00 - 10:00',
    type: 'IN_STORE'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const timeSlots = [
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '13:30 - 14:30',
    '14:30 - 15:30',
    '15:30 - 16:30',
    '16:30 - 17:30'
  ];

  const fetchAppointments = async () => {
    if (!currentUser) return;
    try {
      const res = await api.get('/appointments/my-appointments');
      setAppointments(res.data);
    } catch (err) {
      console.error('Lỗi khi tải danh sách lịch hẹn:', err);
    }
  };

  const fetchTechnicians = async () => {
    try {
      const res = await api.get('/users/technicians');
      setTechnicians(res.data);
      if (res.data.length > 0) {
        setFormData(prev => ({ ...prev, technicianId: res.data[0].id }));
      }
    } catch (err) {
      console.error('Lỗi khi tải danh sách kỹ thuật viên:', err);
    }
  };

  useEffect(() => {
    fetchTechnicians();
    fetchAppointments();
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setError('Vui lòng đăng nhập để đặt lịch sửa chữa.');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await api.post('/appointments', formData);
      setSuccess(true);
      fetchAppointments();
      setFormData(prev => ({
        ...prev,
        date: todayStr,
        timeSlot: '09:00 - 10:00'
      }));
    } catch (err) {
      setError('Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isLight = theme === 'light';

  return (
    <div className="animate-fade-in-up">
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'Montserrat' }}>ĐẶT LỊCH SỬA CHỮA</h2>
        <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
          Đặt lịch bảo trì, sửa chữa thiết bị tại nhà hoặc tại cửa hàng Kinetic Tech.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        
        {/* Form Đặt Lịch */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--rounded-lg)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px' }}>
            Tạo Lịch Hẹn Mới
          </h3>

          {error && (
            <div style={{ background: 'rgba(255, 76, 76, 0.1)', color: '#ffb4ab', padding: '12px', borderRadius: 'var(--rounded)', marginBottom: '16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}

          {success && (
            <div style={{ background: 'rgba(76, 175, 80, 0.1)', color: '#81c784', padding: '12px', borderRadius: 'var(--rounded)', marginBottom: '16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={16} /> Đặt lịch thành công! Kỹ thuật viên sẽ liên hệ với bạn sớm nhất.
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Hình thức */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: 'var(--color-on-surface-variant)' }}>
                Hình thức sửa chữa
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  className={`btn ${formData.type === 'IN_STORE' ? 'btn-primary' : 'btn-outline'}`}
                  style={{ flex: 1, padding: '10px' }}
                  onClick={() => setFormData({ ...formData, type: 'IN_STORE' })}
                >
                  <MapPin size={16} style={{ marginRight: '6px' }} /> Tại cửa hàng
                </button>
                <button
                  type="button"
                  className={`btn ${formData.type === 'AT_HOME' ? 'btn-primary' : 'btn-outline'}`}
                  style={{ flex: 1, padding: '10px' }}
                  onClick={() => setFormData({ ...formData, type: 'AT_HOME' })}
                >
                  <User size={16} style={{ marginRight: '6px' }} /> Tại nhà
                </button>
              </div>
            </div>

            {/* Kỹ thuật viên */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: 'var(--color-on-surface-variant)' }}>
                Chọn Kỹ thuật viên
              </label>
              <select 
                className="form-input" 
                name="technicianId" 
                value={formData.technicianId} 
                onChange={handleChange}
                required
              >
                {technicians.length === 0 ? (
                  <option value="">Đang tải danh sách...</option>
                ) : (
                  technicians.map(tech => (
                    <option key={tech.id} value={tech.id}>{tech.fullName}</option>
                  ))
                )}
              </select>
            </div>

            {/* Ngày hẹn */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: 'var(--color-on-surface-variant)' }}>
                Ngày hẹn
              </label>
              <input 
                type="date" 
                className="form-input" 
                name="date" 
                value={formData.date} 
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            {/* Khung giờ */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: 'var(--color-on-surface-variant)' }}>
                Khung giờ
              </label>
              <select 
                className="form-input" 
                name="timeSlot" 
                value={formData.timeSlot} 
                onChange={handleChange}
                required
              >
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '10px', padding: '12px' }} disabled={loading || !currentUser}>
              {loading ? 'Đang xử lý...' : 'Xác Nhận Đặt Lịch'}
            </button>
          </form>
        </div>

        {/* Danh sách lịch hẹn */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--rounded-lg)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px' }}>
            Lịch Hẹn Của Bạn
          </h3>

          {!currentUser ? (
            <div style={{ textAlign: 'center', color: 'var(--color-outline)', padding: '40px 0' }}>
              <User size={32} style={{ margin: '0 auto 10px', opacity: 0.5 }} />
              <p>Vui lòng đăng nhập để xem lịch hẹn.</p>
            </div>
          ) : appointments.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--color-outline)', padding: '40px 0' }}>
              <Calendar size={32} style={{ margin: '0 auto 10px', opacity: 0.5 }} />
              <p>Bạn chưa có lịch hẹn nào.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {appointments.map(app => (
                <div key={app.id} style={{ 
                  background: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.03)', 
                  border: isLight ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0.08)', 
                  padding: '16px', 
                  borderRadius: 'var(--rounded-md)' 
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                      {app.type === 'IN_STORE' ? 'Mang máy tới cửa hàng' : 'Sửa chữa tại nhà'}
                    </span>
                    <span className="status-badge" style={{
                      fontSize: '10px',
                      background: app.status === 'PENDING' ? 'rgba(253,139,0,0.15)' : 
                                  app.status === 'CONFIRMED' ? 'rgba(0,123,255,0.15)' : 
                                  app.status === 'COMPLETED' ? 'rgba(76,175,80,0.15)' : 'rgba(255,76,76,0.15)',
                      color: app.status === 'PENDING' ? '#ffb77d' : 
                             app.status === 'CONFIRMED' ? '#adc7ff' : 
                             app.status === 'COMPLETED' ? '#81c784' : '#ffb4ab',
                      padding: '2px 8px'
                    }}>
                      {app.status === 'PENDING' ? 'Chờ xác nhận' : 
                       app.status === 'CONFIRMED' ? 'Đã xác nhận' : 
                       app.status === 'COMPLETED' ? 'Hoàn thành' : 'Đã hủy'}
                    </span>
                  </div>
                  
                  <div style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} color="var(--color-primary-dim)" />
                      Ngày hẹn: {new Date(app.date).toLocaleDateString('vi-VN')}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={14} color="var(--color-secondary-dim)" />
                      Khung giờ: {app.timeSlot}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={14} color="var(--color-outline)" />
                      KTV: {app.User_Appointment_technicianIdToUser?.fullName || 'N/A'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

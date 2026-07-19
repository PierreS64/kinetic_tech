import React from 'react';
import { Calendar, User, Clock, MapPin, Search } from 'lucide-react';

export default function AppointmentsTab({ appointments, updateAppointmentStatus, theme, textColor }) {
  return (
    <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', color: textColor }}>
        Quản Lý Lịch Hẹn Sửa Chữa
      </h3>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }} className="zebra-table">
          <thead>
            <tr style={{ background: 'var(--color-surface-container-high)' }}>
              <th style={{ padding: '12px 16px', fontWeight: '700', color: textColor }}>Khách Hàng</th>
              <th style={{ padding: '12px 16px', fontWeight: '700', color: textColor }}>Thời Gian (Ngày & Giờ)</th>
              <th style={{ padding: '12px 16px', fontWeight: '700', color: textColor }}>Hình Thức</th>
              <th style={{ padding: '12px 16px', fontWeight: '700', color: textColor }}>Kỹ Thuật Viên</th>
              <th style={{ padding: '12px 16px', fontWeight: '700', color: textColor }}>Trạng Thái</th>
              <th style={{ padding: '12px 16px', fontWeight: '700', color: textColor, textAlign: 'center' }}>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', color: 'var(--color-outline)', padding: '30px' }}>
                  Không có lịch hẹn nào.
                </td>
              </tr>
            ) : (
              appointments && appointments.map((apt, index) => (
                <tr key={apt.id || index} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <strong style={{ color: textColor, display: 'block' }}>{apt.User_Appointment_customerIdToUser?.fullName || 'Khách hàng'}</strong>
                  </td>
                  <td style={{ padding: '12px 16px', color: textColor }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} color="var(--color-outline)" />
                      {new Date(apt.date).toLocaleDateString('vi-VN')}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', fontSize: '12px', color: 'var(--color-outline)' }}>
                      <Clock size={12} />
                      {apt.timeSlot}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', color: textColor }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={14} color={apt.type === 'IN_STORE' ? 'var(--color-primary)' : 'var(--color-secondary)'} />
                      {apt.type === 'IN_STORE' ? 'Tại cửa hàng' : 'Tại nhà'}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', color: textColor }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={14} color="var(--color-outline)" />
                      {apt.User_Appointment_technicianIdToUser?.fullName || 'Chưa phân công'}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span className="status-badge" style={{
                      fontSize: '10px',
                      fontWeight: 'bold',
                      background: apt.status === 'COMPLETED' ? (theme === 'light' ? '#4caf50' : 'rgba(76,175,80,0.15)') :
                                  apt.status === 'CONFIRMED' ? (theme === 'light' ? '#2196f3' : 'rgba(0,123,255,0.15)') :
                                  apt.status === 'CANCELLED' ? (theme === 'light' ? '#f44336' : 'rgba(244,67,54,0.15)') :
                                  (theme === 'light' ? '#ff9800' : 'rgba(253,139,0,0.15)'),
                      color: apt.status === 'CANCELLED' && theme !== 'light' ? '#ef5350' : '#ffffff',
                      border: theme === 'light' ? 'none' : '1px solid currentColor',
                      padding: '4px 8px',
                      borderRadius: '4px'
                    }}>
                      {apt.status === 'PENDING' && 'Chờ xác nhận'}
                      {apt.status === 'CONFIRMED' && 'Đã xác nhận'}
                      {apt.status === 'COMPLETED' && 'Hoàn thành'}
                      {apt.status === 'CANCELLED' && 'Đã hủy'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                      {apt.status === 'PENDING' && (
                        <>
                          <button onClick={() => updateAppointmentStatus(apt.id, 'CONFIRMED')} className="btn btn-primary" style={{ padding: '4px 6px', fontSize: '10px' }}>
                            Xác nhận
                          </button>
                          <button onClick={() => updateAppointmentStatus(apt.id, 'CANCELLED')} className="btn btn-outline" style={{ padding: '4px 6px', fontSize: '10px', color: 'var(--color-error)' }}>
                            Hủy
                          </button>
                        </>
                      )}
                      {apt.status === 'CONFIRMED' && (
                        <button onClick={() => updateAppointmentStatus(apt.id, 'COMPLETED')} className="btn" style={{ padding: '4px 6px', fontSize: '10px', background: '#388e3c', color: 'white' }}>
                          Đã hoàn thành
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

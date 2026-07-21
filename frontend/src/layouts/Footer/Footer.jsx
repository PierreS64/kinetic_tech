import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      background: 'var(--color-surface-container-lowest)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '40px 0',
      marginTop: 'auto'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '30px',
        fontSize: '13px',
        color: 'var(--color-on-surface-variant)'
      }} className="container">
        <div>
          <h4 style={{ color: 'white', fontWeight: '700', fontSize: '14px', marginBottom: '16px' }}>KINETIC TECH</h4>
          <p style={{ lineHeight: '1.6' }}>Hệ thống cửa hàng bán lẻ linh kiện máy tính, laptop hi-end hàng đầu Việt Nam.</p>
        </div>
        <div>
          <h4 style={{ color: 'white', fontWeight: '700', fontSize: '14px', marginBottom: '16px' }}>HỖ TRỢ KHÁCH HÀNG</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer', padding: 0 }}>
            <li>Hướng dẫn mua hàng online</li>
            <li>Chính sách bảo hành đổi trả</li>
            <li>Phương thức thanh toán</li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: 'white', fontWeight: '700', fontSize: '14px', marginBottom: '16px' }}>LIÊN HỆ</h4>
          <p style={{ lineHeight: '1.6' }}>
            Email: hotro@kinetictech.vn<br />
            Hotline: 1900 1234 (8:00 - 21:00)<br />
            Địa chỉ: Cầu Giấy, Hà Nội
          </p>
        </div>
        <div>
          <h4 style={{ color: 'white', fontWeight: '700', fontSize: '14px', marginBottom: '16px' }}>THÔNG TIN PHÁP LÝ</h4>
          <p style={{ lineHeight: '1.6' }}>
            <strong>Kinetic Tech Store</strong><br />
            GPĐKKD số: 0101234567 do Sở KH&ĐT Hà Nội cấp ngày 01/01/2026.<br />
            Mã số thuế: 0101234567<br />
            Đại diện doanh nghiệp: Nguyễn Văn A
          </p>
        </div>
      </div>
      <div style={{
        marginTop: '30px',
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        paddingTop: '20px',
        textAlign: 'center',
        fontSize: '11px',
        color: 'rgba(255,255,255,0.3)'
      }} className="container">
        © 2026 Kinetic Tech Store. All Rights Reserved. Built with Premium React & Vanilla CSS.
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Plus, Trash2, X, Tag } from 'lucide-react';

export default function VouchersTab(props) {
  const { 
    theme, 
    vouchers, 
    isAddingVoucher, 
    setIsAddingVoucher, 
    newVoucher, 
    setNewVoucher, 
    handleAddVoucher, 
    handleDeleteVoucher,
    formatVND,
    textColor
  } = props;

  return (
    <div  style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }} className="glass-panel">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Quản Lý Mã Giảm Giá (Voucher)</h3>

        <button
          onClick={() => setIsAddingVoucher(true)}
          className="btn btn-secondary"
          style={{ padding: '8px 14px', fontSize: '12px' }}
        >
          <Plus size={14} />
          Thêm Voucher mới
        </button>
      </div>

      {isAddingVoucher && (
        <div  className="modal-overlay" onClick={() => setIsAddingVoucher(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1000 }}>
          <div  className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '440px', borderRadius: 'var(--rounded-lg)', overflow: 'hidden', zIndex: 1001, background: theme === 'light' ? '#ffffff' : undefined, border: theme === 'light' ? '1px solid #cbd5e1' : undefined }}>
            <div style={{ padding: '16px 20px', borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '800', color: textColor }}>Tạo Voucher mới</h4>
              <button onClick={() => setIsAddingVoucher(false)} className="btn btn-ghost" style={{ padding: '4px', borderRadius: '50%' }}>
                <X size={18} color={theme === 'light' ? '#334155' : 'white'} />
              </button>
            </div>

            <form onSubmit={handleAddVoucher} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Mã Voucher (Code) *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: KINETIC10, FREESHIP..."
                  value={newVoucher.name}
                  onChange={(e) => setNewVoucher(prev => ({ ...prev, name: e.target.value.toUpperCase() }))}
                  className="form-input"
                  style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined, textTransform: 'uppercase' }}
                />
              </div>

              <div style={{ display: 'grid', gap: '12px' }}  className="grid-responsive-2col">
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Loại giảm giá</label>
                  <select
                    value={newVoucher.discountType}
                    onChange={(e) => setNewVoucher(prev => ({ ...prev, discountType: e.target.value }))}
                    className="form-input"
                    style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                  >
                    <option value="percent">Giảm theo %</option>
                    <option value="cash">Giảm tiền mặt (VNĐ)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Mức giảm *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="Ví dụ: 10 hoặc 50000"
                    value={newVoucher.discountValue}
                    onChange={(e) => setNewVoucher(prev => ({ ...prev, discountValue: e.target.value }))}
                    className="form-input"
                    style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gap: '12px' }}  className="grid-responsive-2col">
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Ngày bắt đầu</label>
                  <input
                    type="date"
                    value={newVoucher.startDate}
                    onChange={(e) => setNewVoucher(prev => ({ ...prev, startDate: e.target.value }))}
                    className="form-input"
                    style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: theme === 'light' ? '#475569' : 'var(--color-outline)', marginBottom: '4px' }}>Ngày kết thúc</label>
                  <input
                    type="date"
                    value={newVoucher.endDate}
                    onChange={(e) => setNewVoucher(prev => ({ ...prev, endDate: e.target.value }))}
                    className="form-input"
                    style={{ border: theme === 'light' ? '1px solid #cbd5e1' : undefined, color: textColor, background: theme === 'light' ? '#ffffff' : undefined }}
                  />
                </div>
              </div>

              <button type="submit"  style={{ width: '100%', padding: '10px', marginTop: '10px', fontWeight: '700' }} className="btn btn-secondary">
                TẠO VOUCHER
              </button>
            </form>
          </div>
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}  className="zebra-table">
          <thead>
            <tr style={{ background: 'var(--color-surface-container-high)' }}>
              <th style={{ padding: '12px', fontWeight: '700', color: textColor }}>Mã Voucher</th>
              <th style={{ padding: '12px', fontWeight: '700', color: textColor }}>Mức giảm</th>
              <th style={{ padding: '12px', fontWeight: '700', color: textColor }}>Thời hạn</th>
              <th style={{ padding: '12px', fontWeight: '700', color: textColor, textAlign: 'right' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: 'var(--color-outline)' }}>
                  Chưa có Voucher nào. Hãy tạo Voucher mới.
                </td>
              </tr>
            ) : (
              vouchers.map(voucher => (
                <tr key={voucher.id} style={{ borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px', color: textColor, fontWeight: '700' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Tag size={14} color="var(--color-primary-dim)" />
                      {voucher.name}
                    </div>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--color-secondary-dim)', fontWeight: '600' }}>
                    {voucher.discountPercent ? `Giảm ${voucher.discountPercent}%` : `Giảm ${formatVND(voucher.discountAmount)}`}
                  </td>
                  <td style={{ padding: '12px', color: 'var(--color-on-surface-variant)', fontSize: '13px' }}>
                    {voucher.startDate} - {voucher.endDate}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <button
                      onClick={() => handleDeleteVoucher(voucher.id)}
                      className="btn btn-ghost"
                      style={{ padding: '6px', color: 'var(--color-error)' }}
                      title="Xóa voucher"
                    >
                      <Trash2 size={16} />
                    </button>
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

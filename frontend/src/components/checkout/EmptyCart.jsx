import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function EmptyCart({ setActiveView }) {
    return (
      <div className="container animate-fade-in-up" style={{ paddingTop: '60px', maxWidth: '480px' }}>
        <div 
          className="glass-panel" 
          style={{
            padding: '40px 30px',
            borderRadius: 'var(--rounded-lg)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <ShoppingBag size={48} color="var(--color-outline)" />
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'white' }}>Giỏ hàng của bạn đang trống!</h3>
          <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', lineHeight: '1.5' }}>
            Vui lòng chọn sản phẩm và thêm vào giỏ hàng trước khi tiến hành thanh toán.
          </p>
          <button 
            onClick={() => setActiveView('deals')}
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px' }}
          >
            Quay lại cửa hàng
          </button>
        </div>
      </div>
    );
}

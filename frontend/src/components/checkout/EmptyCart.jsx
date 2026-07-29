import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EmptyCart({ setActiveView }) {
  const navigate = useNavigate();
    return (
      <div  style={{ paddingTop: '60px', maxWidth: '480px' }} className="container animate-fade-in-up">
        <div 
           
          style={{
            padding: '40px 30px',
            borderRadius: 'var(--rounded-lg)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}
         className="glass-panel">
          <ShoppingBag size={48} color="var(--color-outline)" />
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-on-surface)' }}>Giỏ hàng của bạn đang trống!</h3>
          <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', lineHeight: '1.5' }}>
            Vui lòng chọn sản phẩm và thêm vào giỏ hàng trước khi tiến hành thanh toán.
          </p>
          <button 
            onClick={() => { if (setActiveView) { setActiveView('deals'); } else { navigate('/'); } }}
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px' }}
          >
            Quay lại cửa hàng
          </button>
        </div>
      </div>
    );
}

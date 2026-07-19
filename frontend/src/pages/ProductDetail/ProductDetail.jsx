import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingCart, Shield, Truck, RotateCcw, Star, MessageCircle, Heart } from 'lucide-react';
import api from '../../utils/api';
import { useAppContext } from '../../contexts/AppContext';
import { useCart } from '../../contexts/CartContext';
import { X } from 'lucide-react';


export default function ProductDetail({ product, onClose }) {
  if (!product) return null;
  const { theme, likedProductIds, handleToggleLike } = useAppContext();
  const { handleAddToCart, handleBuyNow } = useCart();
  const isLiked = likedProductIds.includes(product.id);
  const onToggleLike = () => handleToggleLike(product.id);
  const onAddToCart = () => handleAddToCart(product);
  const onBuyNow = async () => {
    await handleBuyNow(product);
    if (onClose) onClose();
  };


  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    if (product && product.id) {
      fetchReviews();
    }
  }, [product]);

  const fetchReviews = async () => {
    setLoadingReviews(true);
    api.get(`/reviews/product/${product.id}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error('Error fetching reviews:', err))
      .finally(() => setLoadingReviews(false));
  };

  const handleCreateReview = async (e) => {
    e.preventDefault();
    if (!newReview.comment) {
      alert('Vui lòng nhập nội dung đánh giá!');
      return;
    }
    setSubmittingReview(true);
    try {
      const formData = new FormData();
      formData.append('productId', product.id);
      formData.append('rating', newReview.rating);
      formData.append('comment', newReview.comment);

      await api.post('/reviews', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Đã gửi đánh giá thành công!');
      setNewReview({ rating: 5, comment: '' });
      fetchReviews();
    } catch (err) {
      alert(err.response?.data?.message || 'Bạn cần mua hàng thành công để được đánh giá!');
    } finally {
      setSubmittingReview(false);
    }
  };

  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', animation: 'fadeIn 0.2s' }} onClick={onClose}>
    <div style={{ maxWidth: '1200px', width: '100%', maxHeight: '90vh', overflowY: 'auto', margin: '0 auto', padding: '24px', backgroundColor: theme === 'light' ? '#f8fafc' : '#020617', borderRadius: '12px', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
      <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, background: 'none', border: 'none', cursor: 'pointer', color: theme === 'light' ? '#0f172a' : 'white' }}>
        <X size={24} />
      </button>
      <button 
        onClick={onClose}
         
        style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: theme === 'light' ? '#475569' : 'rgba(255,255,255,0.7)' }}
       className="btn btn-ghost">
        <ArrowLeft size={16} /> Quay lại
      </button>

      <div style={{ display: 'grid', gap: '48px', background: 'var(--color-surface-container)', padding: '32px', borderRadius: 'var(--rounded-lg)', border: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.04)' }}  className="grid-responsive-2col">
        {/* Left: Image */}
        <div style={{ background: 'var(--color-surface-container-low)', borderRadius: 'var(--rounded)', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} 
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=400';
            }}
          />
        </div>

        {/* Right: Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <span className={`status-badge ${product.inStock ? 'status-badge-stock' : ''}`} style={{ marginBottom: '12px' }}>
              {product.inStock ? 'Còn hàng' : 'Hết hàng'}
            </span>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: theme === 'light' ? '#0f172a' : 'white', lineHeight: '1.3', marginBottom: '12px' }}>
              {product.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
              <span style={{ color: '#ffb77d', fontWeight: 'bold' }}>★ {product.rating}</span>
              <span>({product.reviews} đánh giá)</span>
              <span>|</span>
              <span>Thương hiệu: <strong style={{ color: 'var(--color-primary-dim)' }}>{product.specs?.Brand || 'Khác'}</strong></span>
            </div>
          </div>

          <div style={{ background: theme === 'light' ? '#f8fafc' : 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: 'var(--rounded-md)', border: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'baseline', gap: '16px' }}>
            <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--color-secondary-dim)' }}>
              {formatVND(product.price)}
            </span>
            {product.oldPrice && (
              <>
                <span style={{ fontSize: '18px', textDecoration: 'line-through', color: 'var(--color-outline)' }}>
                  {formatVND(product.oldPrice)}
                </span>
                <span  style={{ fontSize: '12px', padding: '2px 8px' }} className="status-badge status-badge-sale">
                  Tiết kiệm {discount}%
                </span>
              </>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: theme === 'light' ? '#1e293b' : '#f8fafc' }}>Thông Số Kỹ Thuật Chi Tiết</h3>
            <table  style={{ fontSize: '14px' }} className="kinetic-table">
              <tbody>
                {Object.entries(product.specs || {}).map(([key, val]) => (
                  <tr key={key}>
                    <td style={{ width: '30%', fontWeight: '600', color: 'var(--color-on-surface-variant)' }}>{key}</td>
                    <td style={{ color: theme === 'light' ? '#0f172a' : 'white' }}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <button 
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
              className="btn btn-outline"
              style={{ flex: 1, padding: '16px', fontSize: '15px', fontWeight: '700' }}
            >
              <ShoppingCart size={20} />
              Thêm Vào Giỏ Hàng
            </button>
            <button 
              onClick={() => onBuyNow(product)}
              disabled={!product.inStock}
              className="btn btn-secondary"
              style={{ flex: 1, padding: '16px', fontSize: '15px', fontWeight: '700' }}
            >
              Mua Ngay
            </button>
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onToggleLike) onToggleLike(product.id);
              }}
              className="btn"
              style={{ 
                padding: '0 20px', 
                border: isLiked ? '1px solid rgba(255, 90, 58, 0.4)' : '1px solid var(--color-outline)', 
                background: isLiked ? 'rgba(255, 90, 58, 0.1)' : 'transparent',
                borderRadius: 'var(--rounded-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title={isLiked ? "Bỏ yêu thích" : "Yêu thích"}
            >
              <Heart style={{ pointerEvents: 'none' }} size={24} fill={isLiked ? "#ff5a3a" : "none"} color={isLiked ? "#ff5a3a" : "var(--color-outline)"} />
            </button>
          </div>

          <div style={{ display: 'grid', gap: '12px', marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}  className="grid-responsive-2col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-on-surface-variant)', fontSize: '13px' }}>
              <Shield size={20} color="var(--color-primary-dim)" />
              <span>Bảo hành chính hãng 24-36 tháng</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-on-surface-variant)', fontSize: '13px' }}>
              <Truck size={20} color="var(--color-primary-dim)" />
              <span>Giao hàng miễn phí toàn quốc</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-on-surface-variant)', fontSize: '13px' }}>
              <RotateCcw size={20} color="var(--color-primary-dim)" />
              <span>Đổi trả 1-1 trong 15 ngày đầu</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div style={{ marginTop: '48px', background: 'var(--color-surface-container)', padding: '32px', borderRadius: 'var(--rounded-lg)', border: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.04)' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: theme === 'light' ? '#0f172a' : 'white' }}>
          <MessageCircle size={24} color="var(--color-primary-dim)" /> 
          Đánh giá từ người dùng
        </h3>

        {loadingReviews ? (
          <p style={{ color: 'var(--color-outline)' }}>Đang tải đánh giá...</p>
        ) : reviews.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', background: 'var(--color-surface-container-low)', borderRadius: 'var(--rounded-md)', color: 'var(--color-on-surface-variant)' }}>
            Chưa có đánh giá nào cho sản phẩm này.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {reviews.map(rev => (
              <div key={rev.id} style={{ padding: '16px', background: 'var(--color-surface-container-low)', borderRadius: 'var(--rounded-md)', border: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '700', color: theme === 'light' ? '#1e293b' : 'white' }}>{rev.User?.fullName || 'Khách hàng'}</span>
                  <span style={{ fontSize: '12px', color: 'var(--color-outline)' }}>{new Date(rev.createdAt).toLocaleDateString('vi-VN')}</span>
                </div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < rev.rating ? '#ffb77d' : 'transparent'} color={i < rev.rating ? '#ffb77d' : 'var(--color-outline)'} />
                  ))}
                </div>
                <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)', lineHeight: '1.5' }}>{rev.comment}</p>
                {rev.imageUrls && rev.imageUrls.length > 0 && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    {rev.imageUrls.map((img, i) => (
                      <img key={i} src={img} alt="review" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '32px', borderTop: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.04)', paddingTop: '32px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: theme === 'light' ? '#0f172a' : 'white' }}>Viết Đánh Giá Của Bạn</h4>
          <form onSubmit={handleCreateReview} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>Chất lượng sản phẩm:</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <Star 
                    key={star} 
                    size={24} 
                    fill={star <= newReview.rating ? '#ffb77d' : 'transparent'} 
                    color={star <= newReview.rating ? '#ffb77d' : 'var(--color-outline)'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                  />
                ))}
              </div>
            </div>
            <div>
              <textarea 
                
                rows="4" 
                placeholder="Chia sẻ cảm nhận của bạn về sản phẩm này..."
                value={newReview.comment}
                className="form-input" onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              />
            </div>
            <button type="submit"  disabled={submittingReview} style={{ alignSelf: 'flex-start', padding: '12px 24px' }} className="btn btn-primary">
              {submittingReview ? 'Đang gửi...' : 'Gửi Đánh Giá'}
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

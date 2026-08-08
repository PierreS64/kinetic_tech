import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, ShoppingCart, ShoppingBag, Loader2, X, Sparkles, Package, Shield, Receipt, Tag, Wrench, Zap } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

// ─── Markdown renderer ─────────────────────────────────────────────────────
function renderMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    .replace(/^### (.+)$/gm, '<strong style="font-size:14px;display:block;margin-top:8px">$1</strong>')
    .replace(/^## (.+)$/gm, '<strong style="font-size:15px;display:block;margin-top:8px">$1</strong>')
    .replace(/^[•\-\*] (.+)$/gm, '<li style="margin-left:16px;list-style:disc">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li style="margin-left:16px;list-style:decimal">$1</li>')
    .replace(/`(.*?)`/g, '<code style="background:rgba(0,0,0,0.15);padding:2px 6px;border-radius:4px;font-family:monospace">$1</code>')
    .replace(/\n/g, '<br/>');
}

// ─── Regex Parser for SKU & Link Cleaning ─────────────────────────────────
function parseAIResponse(rawText) {
  if (!rawText) return { textToDisplay: '', extractedSkus: [] };
  const skus = [];
  const regex = /\[(.*?)\]\(sku:(.*?)\)/g;

  const cleanTextForUI = rawText.replace(regex, (match, productName, sku) => {
    if (sku && !skus.includes(sku)) {
      skus.push(sku);
    }
    return `**${productName}**`;
  });

  return {
    textToDisplay: cleanTextForUI,
    extractedSkus: skus,
  };
}

// ─── Product Card Component ────────────────────────────────────────────────
function ProductCard({ product, onAddToCart, theme, navigate }) {
  const fmt = (v) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v);
  return (
    <div style={{
      background: theme === 'light' ? 'rgba(255,255,255,0.9)' : 'rgba(10,25,47,0.8)',
      border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.08)',
      borderRadius: '12px',
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    }}
      onClick={() => navigate(`/product/${product.slug || product.id}`)}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,123,255,0.4)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)'}
    >
      {product.image && (
        <img src={product.image} alt={product.name}
          style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-on-surface)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {product.name}
        </div>
        <div style={{ fontSize: '11px', color: 'var(--color-primary-dim)', fontWeight: '700' }}>
          {fmt(product.price)}
        </div>
        <div style={{ fontSize: '10px', color: product.inStock ? '#4caf50' : '#f44336' }}>
          {product.inStock ? '✓ Còn hàng' : '✗ Hết hàng'}
        </div>
      </div>
      {onAddToCart && product.inStock && (
        <button
          onClick={e => { e.stopPropagation(); onAddToCart(product); }}
          className="btn btn-primary"
          style={{ padding: '5px 10px', fontSize: '11px', borderRadius: '8px', flexShrink: 0 }}
        >
          <ShoppingCart size={12} />
        </button>
      )}
    </div>
  );
}

// ─── Order Status Card ─────────────────────────────────────────────────────
function OrderCard({ order, theme }) {
  const fmt = (v) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v);
  const STATUS_COLOR = {
    'PENDING': '#ff9800', 'CONFIRMED': '#2196f3',
    'SHIPPING': '#9c27b0', 'DELIVERED': '#4caf50', 'CANCELLED': '#f44336'
  };
  const statusLabel = order.status?.replace('⏳ ', '').replace('✅ ', '').replace('🚚 ', '').replace('📦 ', '').replace('❌ ', '');
  return (
    <div style={{
      background: theme === 'light' ? 'rgba(255,255,255,0.9)' : 'rgba(10,25,47,0.8)',
      border: `1px solid ${STATUS_COLOR[statusLabel] || 'rgba(255,255,255,0.08)'}33`,
      borderLeft: `3px solid ${STATUS_COLOR[statusLabel] || '#666'}`,
      borderRadius: '10px',
      padding: '10px 12px',
      fontSize: '12px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: '700', color: 'var(--color-on-surface)' }}>
          #{order.id?.slice(-6).toUpperCase()}
        </span>
        <span style={{ color: STATUS_COLOR[statusLabel] || '#666', fontWeight: '600', fontSize: '11px' }}>
          {order.status}
        </span>
      </div>
      <div style={{ color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
        {order.items?.map(i => i.product).filter(Boolean).join(', ').substring(0, 60)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
        <span style={{ color: 'var(--color-outline)', fontSize: '11px' }}>{order.createdAt}</span>
        <span style={{ color: 'var(--color-primary-dim)', fontWeight: '700' }}>{fmt(order.totalAmount)}</span>
      </div>
    </div>
  );
}

// ─── Warranty Card ─────────────────────────────────────────────────────────
function WarrantyCard({ warranty, theme }) {
  const urgent = warranty.daysLeft < 30;
  const expired = warranty.expired;
  return (
    <div style={{
      background: theme === 'light' ? 'rgba(255,255,255,0.9)' : 'rgba(10,25,47,0.8)',
      border: `1px solid ${expired ? '#f44336' : urgent ? '#ff9800' : '#4caf50'}33`,
      borderLeft: `3px solid ${expired ? '#f44336' : urgent ? '#ff9800' : '#4caf50'}`,
      borderRadius: '10px',
      padding: '10px 12px',
      fontSize: '12px',
    }}>
      <div style={{ fontWeight: '700', color: 'var(--color-on-surface)' }}>{warranty.device}</div>
      <div style={{ color: 'var(--color-outline)', marginTop: '2px', fontSize: '11px' }}>
        S/N: {warranty.serialNumber}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', alignItems: 'center' }}>
        <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>
          HSD: {warranty.endDate}
        </span>
        <span style={{
          fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '6px',
          background: expired ? '#f4433622' : urgent ? '#ff980022' : '#4caf5022',
          color: expired ? '#f44336' : urgent ? '#ff9800' : '#4caf50'
        }}>
          {expired ? 'Hết hạn' : `Còn ${warranty.daysLeft} ngày`}
        </span>
      </div>
    </div>
  );
}

// ─── Coupon Card ───────────────────────────────────────────────────────────
function CouponCard({ coupon, theme }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{
      background: theme === 'light' ? 'rgba(253,139,0,0.06)' : 'rgba(253,139,0,0.08)',
      border: '1px dashed rgba(253,139,0,0.4)',
      borderRadius: '10px',
      padding: '10px 14px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '12px',
    }}>
      <div>
        <div style={{ fontWeight: '800', color: 'var(--color-secondary-dim)', fontSize: '14px', fontFamily: 'monospace', letterSpacing: '1px' }}>
          {coupon.code}
        </div>
        <div style={{ color: 'var(--color-on-surface-variant)', marginTop: '2px' }}>
          {coupon.description}
        </div>
        <div style={{ color: 'var(--color-outline)', fontSize: '11px', marginTop: '2px' }}>
          HSD: {coupon.expiresAt}
        </div>
      </div>
      <button onClick={copy} className="btn btn-outline" style={{ padding: '5px 12px', fontSize: '11px' }}>
        {copied ? '✓ Copied' : 'Copy'}
      </button>
    </div>
  );
}

// ─── Main AIAdvisor Component ──────────────────────────────────────────────
export default function AIAdvisor({ onAddToCart, onClose }) {
  const { theme, showToast } = useAppContext();
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();
  const isLight = theme === 'light';

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [addingCartId, setAddingCartId] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const isLight_ = isLight;
  
  const [isAdmin, setIsAdmin] = useState(false);
  const adminPresetQuestions = [
    { text: 'Tổng quan hôm nay', icon: '⚡' },
    { text: 'Doanh thu tháng này?', icon: '📈' },
    { text: 'Sản phẩm bán chạy nhất?', icon: '📊' },
    { text: 'Tickets đang mở?', icon: '🎫' },
    { text: 'Lịch hẹn hôm nay?', icon: '📅' },
  ];

  useEffect(() => {
    const userDataStr = localStorage.getItem('kinetic_user');
    const user = userDataStr ? JSON.parse(userDataStr) : null;

    if (!user) {
      setMessages([{
        id: 'welcome-unauth',
        sender: 'ai',
        text: 'Xin chào! Tôi là **Trợ Lý AI Kinetic Tech**. Vui lòng **đăng nhập** để tôi có thể tra cứu đơn hàng, bảo hành và tư vấn cá nhân hóa cho bạn nhé! 🤖',
        time: new Date(),
      }]);
    } else {
      if (user.role === 'ADMIN' || user.role === 'STAFF') {
        setIsAdmin(true);
        setMessages([{
          id: 'welcome',
          sender: 'ai',
          text: `Xin chào Quản trị viên **${user.fullName || 'bạn'}**! 👋 Tôi là **Trợ Lý AI Quản Trị**.\n\nTôi có thể giúp bạn phân tích số liệu kinh doanh, quản lý ticket và lịch hẹn nhanh chóng.`,
          time: new Date(),
        }]);
      } else {
        setMessages([{
          id: 'welcome',
          sender: 'ai',
          text: `Xin chào **${user.fullName || 'bạn'}**! 👋 Tôi là **Trợ Lý AI Kinetic Tech**.\n\nTôi có thể:\n- 🔍 Tư vấn sản phẩm phù hợp ngân sách\n- 📦 Kiểm tra trạng thái đơn hàng\n- 🛡️ Tra cứu thông tin bảo hành\n- 🎮 Gợi ý build PC gaming\n- 🏷️ Tìm mã giảm giá\n\nBạn cần tôi giúp gì hôm nay?`,
          time: new Date(),
        }]);
      }
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleBulkAddToCart = async (skus, msgId) => {
    setAddingCartId(msgId);
    
    // 1. Optimistic UI: Save current cart and fake the items immediately
    const prevCart = [...cartItems];
    const mockItems = skus.map((sku, index) => ({
      id: `mock-${msgId}-${index}`,
      cartItemId: `mock-${msgId}-${index}`,
      name: 'Đang tải linh kiện...',
      price: 0,
      quantity: 1,
      image: 'https://via.placeholder.com/44',
      variantId: sku
    }));
    
    setCartItems([...prevCart, ...mockItems]);
    
    // Show immediate success feedback
    const msg = `Đang thêm ${skus.length} linh kiện vào giỏ hàng...`;
    if (showToast) showToast(msg, 'success');

    try {
      const res = await api.post('/cart/add-bulk', { items: skus });
      if (res.data?.success || res.status === 200 || res.status === 201) {
        if (onAddToCart) onAddToCart();
      }
    } catch (err) {
      console.error('Lỗi khi thêm vào giỏ hàng:', err);
      // Rollback optimistic update
      setCartItems(prevCart);
      const errMsg = 'Có lỗi xảy ra khi thêm linh kiện vào giỏ hàng.';
      if (showToast) showToast(errMsg, 'error');
      else alert(errMsg);
    } finally {
      setAddingCartId(null);
    }
  };

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userDataStr = localStorage.getItem('kinetic_user');
    if (!userDataStr) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'ai',
        text: 'Bạn cần **đăng nhập** để sử dụng tính năng tư vấn AI cá nhân hóa! 🔐',
        time: new Date(),
      }]);
      return;
    }

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Build history (last 6 turns max)
    const historyToSend = conversationHistory.slice(-12);

    try {
      const { data } = await api.post('/ai-agent/chat', {
        message: text,
        history: historyToSend,
      });

      const { reply, toolsUsed = [] } = data;

      // Parse structured data from reply if tools were used
      let parsedCards = null;
      if (toolsUsed.length > 0) {
        try {
          // Try to extract JSON data blocks from the response if backend sends them
        } catch (_) { }
      }

      // Build AI message
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        time: new Date(),
        toolsUsed,
      };

      setMessages(prev => [...prev, aiMsg]);

      // Update conversation history
      setConversationHistory(prev => [
        ...prev,
        { role: 'user', content: text },
        { role: 'assistant', content: reply },
      ]);
    } catch (err) {
      const errorMsg = err.response?.status === 403
        ? '❌ Tài khoản của bạn không có quyền sử dụng tính năng này.'
        : '❌ Xin lỗi, AI Agent đang gặp sự cố. Vui lòng thử lại!';

      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: errorMsg,
        time: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const fmt = (v) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v);

  const TOOL_BADGES = {
    search_products: { label: 'Tìm sản phẩm', color: '#2196f3', icon: <Package size={10} /> },
    get_order_status: { label: 'Đơn hàng', color: '#9c27b0', icon: <Receipt size={10} /> },
    check_warranty: { label: 'Bảo hành', color: '#4caf50', icon: <Shield size={10} /> },
    suggest_pc_build: { label: 'Build PC', color: '#ff5722', icon: <Zap size={10} /> },
    get_active_coupons: { label: 'Mã giảm giá', color: '#ff9800', icon: <Tag size={10} /> },
    create_support_ticket: { label: 'Tạo Ticket', color: '#607d8b', icon: <Wrench size={10} /> },
    get_my_appointments: { label: 'Lịch hẹn', color: '#00bcd4', icon: <Sparkles size={10} /> },
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: onClose ? '100%' : '600px',
      borderRadius: 'var(--rounded-lg)',
      overflow: 'hidden',
      maxWidth: onClose ? '100%' : '820px',
      margin: '0 auto',
      border: isLight ? '1px solid rgba(0, 123, 255, 0.2)' : '1px solid rgba(0, 123, 255, 0.15)',
    }} className="glass-panel">

      {/* ── Header ────────────────────────────────────────────────────── */}
      <div style={{
        background: isLight
          ? 'linear-gradient(90deg, var(--color-surface-container-high) 0%, rgba(0,123,255,0.12) 100%)'
          : 'linear-gradient(90deg, rgba(5,15,35,0.98) 0%, rgba(0,123,255,0.18) 100%)',
        padding: '14px 20px',
        borderBottom: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(0,123,255,0.25), rgba(0,200,255,0.15))',
            width: '40px', height: '40px', borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid rgba(0,123,255,0.3)',
          }}>
            <Sparkles size={20} color="var(--color-primary-dim)" />
          </div>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--color-on-surface)', margin: 0 }}>
              TRỢ LÝ AI KINETIC TECH
            </h3>
            <span style={{ fontSize: '11px', color: '#4caf50', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4caf50', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              AI Agent đang hoạt động
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

          {onClose && (
            <button type="button" onClick={onClose}
              style={{ padding: '6px', borderRadius: '50%', minWidth: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              className="btn btn-ghost">
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* ── Messages Area ─────────────────────────────────────────────── */}
      <div style={{
        flex: 1, padding: '16px', overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: '14px',
        background: isLight ? 'rgba(241,245,249,0.6)' : 'rgba(3,8,20,0.25)',
      }}>
        {messages.map((msg) => {
          const isAI = msg.sender === 'ai';
          return (
            <div key={msg.id} style={{
              display: 'flex', gap: '10px',
              alignSelf: isAI ? 'flex-start' : 'flex-end',
              flexDirection: isAI ? 'row' : 'row-reverse',
              maxWidth: '88%',
            }}>
              {/* Avatar */}
              <div style={{
                background: isAI ? 'linear-gradient(135deg, rgba(0,123,255,0.2), rgba(0,200,255,0.1))' : 'rgba(253,139,0,0.15)',
                width: '32px', height: '32px', borderRadius: isAI ? '10px' : '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, border: `1px solid ${isAI ? 'rgba(0,123,255,0.2)' : 'rgba(253,139,0,0.2)'}`,
              }}>
                {isAI ? <Sparkles size={15} color="var(--color-primary-dim)" /> : <User size={15} color="var(--color-secondary-dim)" />}
              </div>

              {/* Bubble */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                {/* Tool badges */}
                {isAI && msg.toolsUsed && msg.toolsUsed.length > 0 && (
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {[...new Set(msg.toolsUsed)].map((tool) => {
                      const badge = TOOL_BADGES[tool];
                      if (!badge) return null;
                      return (
                        <span key={tool} style={{
                          display: 'inline-flex', alignItems: 'center', gap: '3px',
                          background: `${badge.color}18`, color: badge.color,
                          border: `1px solid ${badge.color}33`,
                          borderRadius: '20px', padding: '2px 8px', fontSize: '10px', fontWeight: '600',
                        }}>
                          {badge.icon} {badge.label}
                        </span>
                      );
                    })}
                  </div>
                )}

                <div style={{
                  background: isAI
                    ? (isLight ? 'rgba(255,255,255,0.95)' : 'rgba(10,20,40,0.9)')
                    : 'linear-gradient(135deg, rgba(253,139,0,0.15), rgba(255,80,0,0.08))',
                  padding: '12px 16px',
                  borderRadius: isAI ? '2px 14px 14px 14px' : '14px 2px 14px 14px',
                  border: isAI
                    ? (isLight ? '1px solid rgba(0,0,0,0.07)' : '1px solid rgba(255,255,255,0.07)')
                    : '1px solid rgba(253,139,0,0.25)',
                  fontSize: '13px', lineHeight: '1.7',
                  color: 'var(--color-on-surface)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}>
                  {isAI ? (
                    (() => {
                      const { textToDisplay, extractedSkus } = parseAIResponse(msg.text);
                      return (
                        <>
                          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(textToDisplay) }} />
                          {extractedSkus.length > 0 && (
                            <button
                              disabled={addingCartId === msg.id}
                              onClick={() => handleBulkAddToCart(extractedSkus, msg.id)}
                              style={{
                                marginTop: '10px',
                                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '8px 14px',
                                fontSize: '12px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                boxShadow: '0 2px 6px rgba(34,197,94,0.3)',
                                opacity: addingCartId === msg.id ? 0.7 : 1,
                              }}
                            >
                              {addingCartId === msg.id ? (
                                <>
                                  <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Đang thêm vào giỏ...
                                </>
                              ) : (
                                <>
                                  <ShoppingBag size={14} /> Thêm {extractedSkus.length} linh kiện vào giỏ hàng
                                </>
                              )}
                            </button>
                          )}
                        </>
                      );
                    })()
                  ) : (
                    msg.text
                  )}
                </div>

                <span style={{ fontSize: '10px', color: 'var(--color-outline)', paddingLeft: isAI ? '4px' : '0', paddingRight: isAI ? '0' : '4px', alignSelf: isAI ? 'flex-start' : 'flex-end' }}>
                  {msg.time?.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div style={{ display: 'flex', gap: '10px', alignSelf: 'flex-start' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(0,123,255,0.2), rgba(0,200,255,0.1))',
              width: '32px', height: '32px', borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(0,123,255,0.2)',
            }}>
              <Sparkles size={15} color="var(--color-primary-dim)" />
            </div>
            <div style={{
              background: isLight ? 'rgba(255,255,255,0.95)' : 'rgba(10,20,40,0.9)',
              padding: '12px 16px',
              borderRadius: '2px 14px 14px 14px',
              border: isLight ? '1px solid rgba(0,0,0,0.07)' : '1px solid rgba(255,255,255,0.07)',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <Loader2 size={14} color="var(--color-primary-dim)" style={{ animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: '12px', color: 'var(--color-outline)' }}>AI đang phân tích dữ liệu...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Preset Questions ──────────────────────────────────────────── */}
      {isAdmin && messages.length <= 1 && !isTyping && (
        <div style={{
          padding: '10px 16px',
          display: 'flex', gap: '6px', flexWrap: 'wrap',
          background: isLight ? 'rgba(241,245,249,0.8)' : 'rgba(5,13,30,0.6)',
          borderTop: isLight ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.04)',
        }}>
          {adminPresetQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q.text)}
              className="btn btn-outline"
              style={{
                padding: '5px 12px', fontSize: '11px', borderRadius: '20px',
                background: 'rgba(0,123,255,0.05)', borderColor: 'rgba(0,123,255,0.2)',
                color: 'var(--color-on-surface)',
              }}
            >
              {q.icon} {q.text}
            </button>
          ))}
        </div>
      )}


      {/* ── Input Bar ────────────────────────────────────────────────── */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
        style={{
          padding: '12px 16px',
          background: isLight ? 'rgba(255,255,255,0.9)' : 'var(--color-surface-container-low)',
          borderTop: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.06)',
          display: 'flex', gap: '10px', alignItems: 'center',
        }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Hỏi AI về sản phẩm, đơn hàng, bảo hành..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isTyping}
          className="form-input"
          style={{ flex: 1, fontSize: '13px' }}
        />
        <button
          type="submit"
          disabled={isTyping || !input.trim()}
          className="btn btn-primary"
          style={{ padding: '10px 18px', borderRadius: '12px', flexShrink: 0 }}
        >
          {isTyping ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={16} />}
        </button>
      </form>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

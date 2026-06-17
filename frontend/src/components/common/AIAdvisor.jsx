import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, ShoppingCart, Loader2, X } from 'lucide-react';
import { products } from '../../utils/mockData.js';

export default function AIAdvisor({ onAddToCart, theme, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Xin chào! Tôi là Trợ Lý Cố Vấn AI của Kinetic Tech. Tôi có thể giúp bạn đề xuất cấu hình PC, tư vấn chọn mua laptop hoặc phụ kiện gaming phù hợp với nhu cầu và túi tiền. Hãy chọn câu hỏi gợi ý bên dưới hoặc nhắn trực tiếp nhé!',
      time: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const presetQuestions = [
    { text: 'Laptop lập trình & đồ họa dưới 40 triệu?', category: 'work' },
    { text: 'Tư vấn chuột & bàn phím cơ đỉnh nhất?', category: 'gear' },
    { text: 'Cấu hình PC chơi game tối ưu nhất?', category: 'gaming_pc' }
  ];

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 1 || isTyping) {
      scrollToBottom();
    }
  }, [messages, isTyping]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    // User Message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      let aiResponseText = '';
      let recommendedProducts = [];

      const normalizedText = text.toLowerCase();

      if (normalizedText.includes('laptop') || normalizedText.includes('lập trình') || normalizedText.includes('đồ họa') || normalizedText.includes('40 triệu')) {
        // Recommend Laptop M3 or ROG Strix
        const matched = products.filter(p => p.category === 'laptop');
        recommendedProducts = matched;
        aiResponseText = 'Dựa trên nhu cầu làm việc chuyên nghiệp, lập trình và đồ họa dưới 40 triệu, tôi đề xuất 2 mẫu máy hàng đầu hiện nay. MacBook Pro 14" M3 cực kỳ tiết kiệm pin, màn hình siêu đẹp thích hợp lập trình viên. Trong khi đó ASUS ROG Strix G16 có cấu hình i7 cực mạnh cùng RTX 4060 cân tốt mọi tác vụ đồ họa 3D và dựng video nặng.';
      } else if (normalizedText.includes('chuột') || normalizedText.includes('bàn phím') || normalizedText.includes('gear') || normalizedText.includes('đỉnh')) {
        // Recommend ROG Azoth or Logitech Superlight 2
        const matched = products.filter(p => p.category === 'gaming gear');
        recommendedProducts = matched;
        aiResponseText = 'Đối với gaming gear phân khúc hi-end, combo tuyệt vời nhất hiện tại là Bàn phím cơ ASUS ROG Azoth (gasket-mount, switch pre-lubed mượt mà, màn hình OLED) đi cùng chuột siêu nhẹ Logitech G Pro X Superlight 2 (chỉ 60g, cảm biến HERO 2 siêu chính xác). Đây là vũ khí tối thượng cho các game thủ chuyên nghiệp.';
      } else if (normalizedText.includes('pc') || normalizedText.includes('cấu hình') || normalizedText.includes('ráp') || normalizedText.includes('chơi game')) {
        aiResponseText = 'Để chơi game mượt mà nhất trong phân khúc tầm trung - cao cấp, tôi đề xuất bạn kết hợp CPU AMD Ryzen 7 7800X3D (vua chơi game hiện tại) cùng card đồ họa ASUS RTX 4080 Super OC. Hệ thống này đảm bảo FPS cực cao ở độ phân giải 2K/4K và hỗ trợ Ray Tracing đỉnh cao.';
        // Match a component (VGA/CPU)
        recommendedProducts = products.filter(p => p.category === 'linh kiện').slice(0, 2);
      } else {
        aiResponseText = 'Xin lỗi, tôi chưa hiểu rõ nhu cầu của bạn lắm. Bạn có thể cho tôi biết ngân sách dự kiến (ví dụ: dưới 20 triệu, khoảng 30 triệu) và mục đích sử dụng chính (chơi game, lập trình, học tập văn phòng) được không?';
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiResponseText,
        recommendations: recommendedProducts,
        time: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <div className="glass-panel" style={{
      display: 'flex',
      flexDirection: 'column',
      height: onClose ? '100%' : '600px',
      borderRadius: 'var(--rounded-lg)',
      overflow: 'hidden',
      maxWidth: onClose ? '100%' : '800px',
      margin: '0 auto',
      border: theme === 'light' ? '1px solid rgba(0, 123, 255, 0.25)' : '1px solid rgba(0, 123, 255, 0.15)'
    }}>
      {/* Header */}
      <div style={{
        background: theme === 'light' ? 'linear-gradient(90deg, var(--color-surface-container-high) 0%, rgba(0, 123, 255, 0.15) 100%)' : 'linear-gradient(90deg, rgba(10, 25, 47, 0.95) 0%, rgba(0, 123, 255, 0.2) 100%)',
        padding: '16px 20px',
        borderBottom: theme === 'light' ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'rgba(0, 123, 255, 0.2)',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(0, 123, 255, 0.4)'
          }}>
            <Bot size={22} color="var(--color-primary-dim)" />
          </div>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--color-on-surface)' }}>CỐ VẤN KỸ THUẬT AI</h3>
            <span style={{ fontSize: '11px', color: theme === 'light' ? '#2e7d32' : '#81c784', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: theme === 'light' ? '#2e7d32' : '#81c784', display: 'inline-block' }} />
              Đang hoạt động trực tuyến
            </span>
          </div>
        </div>
        {onClose && (
          <button 
            type="button"
            onClick={onClose}
            className="btn btn-ghost"
            style={{ padding: '6px', borderRadius: '50%', minWidth: '32px', height: '32px', display: 'flex', alignItems: 'center', justify: 'center' }}
            title="Đóng chat"
          >
            <X size={18} color="white" />
          </button>
        )}
      </div>

      {/* Message Screen */}
      <div style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        background: theme === 'light' ? 'rgba(241, 245, 249, 0.6)' : 'rgba(5, 13, 24, 0.2)'
      }}>
        {messages.map((msg) => {
          const isAI = msg.sender === 'ai';
          return (
            <div 
              key={msg.id}
              style={{
                display: 'flex',
                gap: '10px',
                alignSelf: isAI ? 'flex-start' : 'flex-end',
                flexDirection: isAI ? 'row' : 'row-reverse',
                maxWidth: '85%'
              }}
            >
              {/* Sender Icon */}
              <div style={{
                background: isAI ? 'rgba(0, 123, 255, 0.15)' : 'rgba(253, 139, 0, 0.15)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: `1px solid ${isAI ? 'rgba(0,123,255,0.2)' : 'rgba(253,139,0,0.2)'}`
              }}>
                {isAI ? <Bot size={16} color="var(--color-primary-dim)" /> : <User size={16} color="var(--color-secondary-dim)" />}
              </div>

              {/* Message Bubble */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{
                  background: isAI ? 'var(--color-surface-container-high)' : 'rgba(253, 139, 0, 0.1)',
                  padding: '12px 16px',
                  borderRadius: isAI ? '0 12px 12px 12px' : '12px 0 12px 12px',
                  border: isAI ? (theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.06)') : '1px solid rgba(253,139,0,0.2)',
                  fontSize: '13px',
                  lineHeight: '1.5',
                  color: 'var(--color-on-surface)'
                }}>
                  {msg.text}
                </div>

                {/* Recommendations in Bubble */}
                {isAI && msg.recommendations && msg.recommendations.length > 0 && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    marginTop: '8px'
                  }}>
                    {msg.recommendations.map((prod) => (
                      <div 
                        key={prod.id} 
                        style={{
                          background: 'var(--color-surface-container-lowest)',
                          border: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)',
                          borderRadius: 'var(--rounded)',
                          padding: '8px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '10px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <img 
                            src={prod.image} 
                            alt={prod.name} 
                            style={{ width: '36px', height: '36px', borderRadius: '4px', objectFit: 'cover' }}
                          />
                          <div>
                            <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-on-surface)', display: 'block', maxWidth: onClose ? '110px' : '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {prod.name}
                            </span>
                            <span style={{ fontSize: '11px', color: 'var(--color-secondary-dim)' }}>
                              {formatVND(prod.price)}
                            </span>
                          </div>
                        </div>

                        <button 
                          onClick={() => onAddToCart(prod)}
                          className="btn btn-primary"
                          style={{ padding: '4px 10px', fontSize: '11px', borderRadius: 'var(--rounded-sm)' }}
                        >
                          <ShoppingCart size={12} />
                          <span>Thêm</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div style={{ display: 'flex', gap: '10px', alignSelf: 'flex-start' }}>
            <div style={{
              background: 'rgba(0, 123, 255, 0.15)',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Loader2 size={16} color="var(--color-primary-dim)" style={{ animation: 'spin 1s linear infinite' }} />
            </div>
            <div style={{
              background: 'var(--color-surface-container-high)',
              padding: '10px 16px',
              borderRadius: '0 12px 12px 12px',
              border: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.06)',
              fontSize: '13px',
              color: 'var(--color-outline)'
            }}>
              AI đang phân tích cấu hình...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Preset Chips */}
      <div style={{
        padding: '8px 16px',
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        background: 'rgba(0,0,0,0.1)',
        borderTop: '1px solid rgba(255, 255, 255, 0.04)'
      }}>
        {presetQuestions.map((q, idx) => (
          <button 
            key={idx}
            onClick={() => handleSend(q.text)}
            className="btn btn-outline"
            style={{
              padding: '6px 12px',
              fontSize: '11px',
              borderRadius: 'var(--rounded-full)',
              background: 'rgba(255,255,255,0.02)',
              borderColor: 'rgba(255,255,255,0.08)'
            }}
          >
            {q.text}
          </button>
        ))}
      </div>

      {/* Input Tray */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        style={{
          padding: '12px 16px',
          background: 'var(--color-surface-container-low)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          gap: '10px'
        }}
      >
        <input 
          type="text"
          placeholder="Nhập câu hỏi của bạn tại đây..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="form-input"
          style={{ flex: 1 }}
        />
        <button 
          type="submit"
          className="btn btn-primary"
          style={{ padding: '10px 18px' }}
        >
          <Send size={16} />
        </button>
      </form>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

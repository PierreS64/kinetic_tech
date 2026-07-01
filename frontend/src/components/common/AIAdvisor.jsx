import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, ShoppingCart, Loader2, X } from 'lucide-react';
import { io } from 'socket.io-client';

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
  
  // Socket and Session refs
  const socketRef = useRef(null);
  const sessionIdRef = useRef(null);

  const presetQuestions = [
    { text: 'Laptop lập trình & đồ họa dưới 40 triệu?', category: 'work' },
    { text: 'Tư vấn chuột & bàn phím cơ đỉnh nhất?', category: 'gear' },
    { text: 'Cấu hình PC chơi game tối ưu nhất?', category: 'gaming_pc' }
  ];

  useEffect(() => {
    // Lấy UserID từ localStorage (yêu cầu Auth)
    const userDataStr = localStorage.getItem('kinetic_user');
    const userId = userDataStr ? JSON.parse(userDataStr).id : null;

    if (!userId) {
      setMessages([{
        id: 1,
        sender: 'ai',
        text: 'Xin chào! Bạn cần đăng nhập tài khoản trước khi có thể sử dụng Trợ Lý Cố Vấn AI để lưu trữ lịch sử tư vấn. Vui lòng đăng nhập nhé!',
        time: new Date()
      }]);
      return;
    }

    // Khởi tạo Socket.io client kết nối tới Backend (Cổng 5000)
    socketRef.current = io('http://localhost:5000');

    socketRef.current.emit('join_chat', { userId });

    socketRef.current.on('session_data', (session) => {
      sessionIdRef.current = session.id;
      if (session.ChatMessage && session.ChatMessage.length > 0) {
        // Khôi phục lịch sử chat từ DB
        const history = session.ChatMessage.map(msg => ({
          id: msg.id,
          sender: msg.senderType === 'CUSTOMER' ? 'user' : 'ai',
          text: msg.content,
          time: new Date(msg.createdAt)
        }));
        setMessages(history);
      }
    });

    socketRef.current.on('new_message', (msg) => {
      // Nhận tin nhắn mới (AI hoặc do tab khác nhắn)
      setMessages(prev => {
        // Kiểm tra xem tin nhắn đã có chưa (để tránh lặp tin nhắn do tự mình gửi)
        const exists = prev.find(m => m.id === msg.id);
        if (exists) return prev;

        return [...prev, {
          id: msg.id,
          sender: msg.senderType === 'CUSTOMER' ? 'user' : 'ai',
          text: msg.content,
          time: new Date(msg.createdAt)
        }];
      });
      setIsTyping(false);
    });

    socketRef.current.on('handover_triggered', (data) => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'ai',
        text: `⚠️ ${data.message}`,
        time: new Date()
      }]);
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text) => {
    if (!text.trim() || !sessionIdRef.current) return;

    // Hiển thị tin nhắn người dùng ngay lập tức
    const userMsg = {
      id: Date.now().toString(), // ID tạm thời
      sender: 'user',
      text: text,
      time: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Gửi sự kiện cho Backend xử lý (lưu DB & gọi AI)
    socketRef.current.emit('send_message', {
      sessionId: sessionIdRef.current,
      content: text
    });
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

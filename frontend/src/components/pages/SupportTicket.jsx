import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  User, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  Plus, 
  ArrowLeft,
  Server,
  Wrench,
  ShoppingBag,
  Info
} from 'lucide-react';

const INITIAL_TICKETS = [
  {
    id: 'TK-8947',
    subject: 'Tư vấn nâng cấp RAM và SSD cho Asus TUF A15',
    category: 'Cấu hình PC & Laptop',
    status: 'replied', // 'pending', 'replied', 'closed'
    urgency: 'Thường',
    date: '10/05/2026',
    messages: [
      {
        sender: 'user',
        text: 'Chào Kinetic, mình đang dùng Asus TUF Gaming A15 (2022) có RAM 8GB và SSD 512GB. Máy dạo này chạy mấy game AAA hơi giật và hết dung lượng. Mình muốn nâng cấp thêm RAM lên 16GB và lắp thêm 1 ổ SSD 1TB nữa. Bên mình có linh kiện phù hợp và hỗ trợ lắp ráp luôn không?',
        time: '10/05/2026 09:30'
      },
      {
        sender: 'agent',
        agentName: 'Đức Minh (Kỹ thuật viên Laptop)',
        text: 'Chào bạn, Laptop Asus TUF Gaming A15 (2022) của bạn hỗ trợ tối đa 32GB RAM DDR5 (hoặc DDR4 tuỳ phiên bản máy cụ thể của bạn) và có sẵn 2 khe M.2 PCIe Gen 4 để nâng cấp SSD. Bên mình đang có sẵn RAM Corsair Vengeance DDR5 Bus 4800MHz giá 1.290.000đ và SSD Crucial P3 Plus 1TB giá 1.890.000đ rất phù hợp với máy bạn. Khi mua linh kiện bên mình hỗ trợ lắp đặt vệ sinh máy miễn phí tại chỗ luôn bạn nhé. Bạn có thể mang máy qua bất cứ chi nhánh nào của Kinetic Tech!',
        time: '10/05/2026 10:15'
      }
    ]
  },
  {
    id: 'TK-5039',
    subject: 'Máy tính bị sập nguồn khi chạy phần mềm dựng phim DaVinci Resolve',
    category: 'Lỗi Kỹ Thuật Phần Cứng',
    status: 'pending',
    urgency: 'Gấp',
    date: '02/06/2026',
    messages: [
      {
        sender: 'user',
        text: 'Mình vừa mua bộ máy PC build bên cửa hàng được 1 tháng. Dạo này cứ bật render video trong DaVinci Resolve hoặc chơi game Cyberpunk 2077 khoảng 15 phút là máy bị sập nguồn đột ngột, đèn trên mainboard báo đỏ LED CPU. Mình nghi là do tản nhiệt hoặc nguồn công suất không đủ. Nhờ kỹ thuật hỗ trợ kiểm tra giúp.',
        time: '02/06/2026 14:00'
      }
    ]
  }
];

export default function SupportTicket({ theme }) {
  const isLight = theme === 'light';
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [activeTicketId, setActiveTicketId] = useState(null); // ID of expanded ticket
  const [isCreating, setIsCreating] = useState(false); // is creating a new ticket
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: 'Lỗi Kỹ Thuật Phần Cứng',
    urgency: 'Thường',
    description: ''
  });
  const [replyText, setReplyText] = useState('');
  const [simulatingReply, setSimulatingReply] = useState(false);

  const activeTicket = tickets.find(t => t.id === activeTicketId) || null;

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newTicket.subject || !newTicket.description) {
      alert('Vui lòng điền tiêu đề và nội dung chi tiết.');
      return;
    }

    const ticketId = 'TK-' + Math.floor(1000 + Math.random() * 9000);
    const dateToday = new Date().toLocaleDateString('vi-VN');
    const timeToday = dateToday + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

    const created = {
      id: ticketId,
      subject: newTicket.subject,
      category: newTicket.category,
      status: 'pending',
      urgency: newTicket.urgency,
      date: dateToday,
      messages: [
        {
          sender: 'user',
          text: newTicket.description,
          time: timeToday
        }
      ]
    };

    setTickets(prev => [created, ...prev]);
    setNewTicket({
      subject: '',
      category: 'Lỗi Kỹ Thuật Phần Cứng',
      urgency: 'Thường',
      description: ''
    });
    setIsCreating(false);
    setActiveTicketId(ticketId); // open the newly created ticket
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const timeToday = new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      sender: 'user',
      text: replyText,
      time: timeToday
    };

    // Append user message
    setTickets(prev => prev.map(t => {
      if (t.id === activeTicketId) {
        return {
          ...t,
          status: 'pending',
          messages: [...t.messages, userMsg]
        };
      }
      return t;
    }));

    const messageSent = replyText;
    setReplyText('');
    setSimulatingReply(true);

    // Simulate Agent Reply
    setTimeout(() => {
      setSimulatingReply(false);
      
      let agentReplyText = 'Cảm ơn bạn đã phản hồi thông tin. Chuyên viên kỹ thuật Kinetic Tech đang xem xét trường hợp của bạn và sẽ liên hệ trực tiếp qua số điện thoại đăng ký trong ít phút nữa để xử lý tận nơi.';
      
      if (messageSent.toLowerCase().includes('ram') || messageSent.toLowerCase().includes('nâng cấp')) {
        agentReplyText = 'Kỹ thuật viên đã tiếp nhận thông tin yêu cầu nâng cấp của bạn. RAM và SSD của dòng máy bạn đều sẵn hàng và có thể lắp đặt lấy ngay sau 15-20 phút thẩm định trực tiếp tại quầy kỹ thuật.';
      } else if (messageSent.toLowerCase().includes('sập nguồn') || messageSent.toLowerCase().includes('nóng') || messageSent.toLowerCase().includes('lỗi')) {
        agentReplyText = 'Lỗi sập nguồn đột ngột khi render nặng thường liên quan đến tản nhiệt CPU bị lắp lỏng hoặc nguồn PSU sụt áp. Bạn vui lòng mang cả thùng máy qua cửa hàng gần nhất hoặc cung cấp SĐT để bên mình cử nhân viên kỹ thuật qua nhà hỗ trợ kiểm tra linh kiện trực tiếp nhé!';
      }

      const agentMsg = {
        sender: 'agent',
        agentName: 'Hồng Quân (Trưởng Bộ Phận Kỹ Thuật)',
        text: agentReplyText,
        time: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };

      setTickets(prev => prev.map(t => {
        if (t.id === activeTicketId) {
          return {
            ...t,
            status: 'replied',
            messages: [...t.messages, agentMsg]
          };
        }
        return t;
      }));
    }, 2000);
  };

  const getStatusBadge = (status) => {
    if (status === 'pending') {
      return (
        <span className="status-badge" style={{ background: 'rgb(253, 139, 0)', color: '#ffffff', border: '1px solid rgba(253, 139, 0, 0.3)', textTransform: 'none' }}>
          Đang chờ xử lý
        </span>
      );
    }
    if (status === 'replied') {
      return (
        <span className="status-badge" style={{ background: 'rgb(76, 175, 79)', color: '#ffffff', border: '1px solid rgba(76, 175, 80, 0.3)', textTransform: 'none' }}>
          Đã trả lời
        </span>
      );
    }
    return (
      <span className="status-badge" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--color-outline)', border: '1px solid rgba(255,255,255,0.1)', textTransform: 'none' }}>
        Đã đóng
      </span>
    );
  };

  const getUrgencyColor = (urgency) => {
    if (urgency === 'Rất gấp') return '#ffb4ab';
    if (urgency === 'Gấp') return '#ffb77d';
    return 'var(--color-outline)';
  };

  return (
    <div style={{ minHeight: '80vh' }}>
      
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'Montserrat' }}>TICKET HỖ TRỢ KỸ THUẬT</h2>
          <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginTop: '4px' }}>
            Kết nối trực tiếp với đội ngũ chuyên viên phần cứng và kỹ sư hệ thống của Kinetic Tech.
          </p>
        </div>

        {!isCreating && !activeTicketId && (
          <button 
            onClick={() => setIsCreating(true)}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={16} /> Tạo Ticket Mới
          </button>
        )}
      </div>

      {isCreating ? (
        /* Create Ticket Form */
        <div className="glass-panel animate-fade-in-up" style={{ padding: '30px', borderRadius: 'var(--rounded-lg)', maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255,255,255,0.08)', paddingBottom: '14px', marginBottom: '20px' }}>
            <button onClick={() => setIsCreating(false)} className="btn btn-ghost" style={{ padding: '6px', borderRadius: '50%' }}>
              <ArrowLeft size={18} color={isLight ? 'var(--color-on-surface)' : 'white'} />
            </button>
            <h3 style={{ fontSize: '18px', fontWeight: '800' }}>TẠO YÊU CẦU TRỢ GIÚP MỚI</h3>
          </div>

          <form onSubmit={handleCreateTicket} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: isLight ? 'var(--color-on-surface)' : 'white' }}>Tiêu đề tóm tắt lỗi / yêu cầu *</label>
              <input 
                type="text"
                placeholder="Ví dụ: Lỗi sập nguồn khi cắm VGA mới mua, cần tư vấn lắp ráp tản AIO..."
                value={newTicket.subject}
                onChange={(e) => setNewTicket(prev => ({ ...prev, subject: e.target.value }))}
                required
                className="form-input"
                style={{ fontSize: '13px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: isLight ? 'var(--color-on-surface)' : 'white' }}>Danh mục hỗ trợ *</label>
                <select
                  value={newTicket.category}
                  onChange={(e) => setNewTicket(prev => ({ ...prev, category: e.target.value }))}
                  className="form-input"
                  style={{ fontSize: '13px', background: 'var(--color-surface-container-lowest)' }}
                >
                  <option value="Lỗi Kỹ Thuật Phần Cứng">Lỗi Kỹ Thuật Phần Cứng (Main, GPU, RAM, Nguồn...)</option>
                  <option value="Cấu hình PC & Laptop">Cấu hình PC & Laptop (Tư vấn nâng cấp, kiểm tra độ tương thích)</option>
                  <option value="Bảo hành & Sửa chữa">Bảo hành & Sửa chữa (Gửi bảo hành, đổi trả hàng)</option>
                  <option value="Hỗ trợ Giao hàng / Thanh toán">Hỗ trợ Giao hàng / Mua hàng online</option>
                  <option value="Khác">Lỗi khác...</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: isLight ? 'var(--color-on-surface)' : 'white' }}>Mức độ khẩn cấp *</label>
                <select
                  value={newTicket.urgency}
                  onChange={(e) => setNewTicket(prev => ({ ...prev, urgency: e.target.value }))}
                  className="form-input"
                  style={{ fontSize: '13px', background: 'var(--color-surface-container-lowest)' }}
                >
                  <option value="Thường">Thường (Xử lý trong vòng 2 - 4 tiếng)</option>
                  <option value="Gấp">Gấp (Xử lý trong vòng 1 - 2 tiếng)</option>
                  <option value="Rất gấp">Rất gấp (Ưu tiên xử lý lập tức)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: isLight ? 'var(--color-on-surface)' : 'white' }}>Nội dung mô tả chi tiết vấn đề bạn đang gặp phải *</label>
              <textarea 
                placeholder="Vui lòng cung cấp mã đơn hàng (nếu có), cấu hình máy hiện tại và mô tả rõ các bước dẫn tới lỗi..."
                rows="6"
                required
                value={newTicket.description}
                onChange={(e) => setNewTicket(prev => ({ ...prev, description: e.target.value }))}
                className="form-input"
                style={{ fontSize: '13px', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
              <button type="button" onClick={() => setIsCreating(false)} className="btn btn-outline" style={{ flex: 1 }}>Hủy bỏ</button>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Gửi Ticket Yêu Cầu</button>
            </div>
          </form>
        </div>
      ) : activeTicket ? (
        /* Detailed Ticket Conversation Thread */
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px' }} className="catalog-layout">
          
          {/* Ticket Meta Sidebar */}
          <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--rounded-md)', height: 'fit-content' }}>
            <button 
              onClick={() => setActiveTicketId(null)}
              className="btn btn-ghost"
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-start', padding: '8px', borderBottom: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255,255,255,0.06)', marginBottom: '16px', borderRadius: '0' }}
            >
              <ArrowLeft size={16} /> Quay lại danh sách
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
              <div>
                <span style={{ color: 'var(--color-outline)', display: 'block', marginBottom: '4px' }}>Mã Ticket:</span>
                <span style={{ color: isLight ? 'var(--color-on-surface)' : 'white', fontWeight: 'bold' }}>#{activeTicket.id}</span>
              </div>
              <div>
                <span style={{ color: 'var(--color-outline)', display: 'block', marginBottom: '4px' }}>Trạng thái:</span>
                <div>{getStatusBadge(activeTicket.status)}</div>
              </div>
              <div>
                <span style={{ color: 'var(--color-outline)', display: 'block', marginBottom: '4px' }}>Danh mục:</span>
                <span style={{ color: isLight ? 'var(--color-on-surface)' : 'white', fontWeight: '600' }}>{activeTicket.category}</span>
              </div>
              <div>
                <span style={{ color: 'var(--color-outline)', display: 'block', marginBottom: '4px' }}>Độ khẩn cấp:</span>
                <span style={{ color: getUrgencyColor(activeTicket.urgency), fontWeight: '700' }}>{activeTicket.urgency}</span>
              </div>
              <div>
                <span style={{ color: 'var(--color-outline)', display: 'block', marginBottom: '4px' }}>Ngày tạo:</span>
                <span style={{ color: isLight ? 'var(--color-on-surface)' : 'white' }}>{activeTicket.date}</span>
              </div>
              <div style={{ borderTop: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255,255,255,0.06)', paddingTop: '16px', fontSize: '11px', color: 'var(--color-outline)', lineHeight: '1.4' }}>
                <Info size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
                Thời gian làm việc hỗ trợ kỹ thuật từ 8h00 đến 21h30 hàng ngày.
              </div>
            </div>
          </div>

          {/* Ticket Messages Thread */}
          <div className="glass-panel" style={{ borderRadius: 'var(--rounded-md)', display: 'flex', flexDirection: 'column', height: '620px', overflow: 'hidden' }}>
            
            {/* Header info */}
            <div style={{ padding: '16px 20px', borderBottom: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255,255,255,0.08)', background: isLight ? 'rgba(0,0,0,0.03)' : 'rgba(0,0,0,0.15)' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: isLight ? 'var(--color-on-surface)' : 'white' }}>{activeTicket.subject}</h3>
            </div>

            {/* Messages box list */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {activeTicket.messages.map((msg, index) => {
                const isUser = msg.sender === 'user';
                return (
                  <div 
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: isUser ? 'flex-end' : 'flex-start',
                      width: '100%'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      maxWidth: '80%'
                    }}>
                      {/* Name tag */}
                      <span style={{
                        fontSize: '10px',
                        color: 'var(--color-outline)',
                        textAlign: isUser ? 'right' : 'left',
                        padding: '0 4px',
                        fontWeight: '600'
                      }}>
                        {isUser ? 'Bạn' : msg.agentName} • {msg.time}
                      </span>
                      
                      {/* Content block */}
                      <div style={{
                        padding: '12px 16px',
                        borderRadius: 'var(--rounded-md)',
                        fontSize: '13px',
                        lineHeight: '1.5',
                        background: isUser ? 'var(--color-primary-container)' : (isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255,255,255,0.04)'),
                        border: `1px solid ${isUser ? 'rgba(0,123,255,0.2)' : (isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)')}`,
                        color: isUser ? 'var(--color-on-primary-container)' : (isLight ? 'var(--color-on-surface)' : 'white'),
                        whiteSpace: 'pre-wrap'
                      }}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Simulating agent reply animation dot */}
              {simulatingReply && (
                <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--color-outline)' }}>Kỹ thuật viên đang soạn câu trả lời...</span>
                    <div style={{
                      padding: '12px 20px',
                      borderRadius: 'var(--rounded-md)',
                      background: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
                      border: isLight ? '1px solid rgba(0,0,0,0.04)' : '1px solid rgba(255,255,255,0.04)',
                      display: 'flex',
                      gap: '4px',
                      alignItems: 'center',
                      width: 'fit-content'
                    }}>
                      <span className="dot-blink" style={{ animationDelay: '0s' }}>•</span>
                      <span className="dot-blink" style={{ animationDelay: '0.2s' }}>•</span>
                      <span className="dot-blink" style={{ animationDelay: '0.4s' }}>•</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Message input Form */}
            <form 
              onSubmit={handleSendReply}
              style={{
                padding: '16px',
                borderTop: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255,255,255,0.08)',
                background: 'var(--color-surface-container-lowest)',
                display: 'flex',
                gap: '12px'
              }}
            >
              <input 
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Nhập nội dung tin nhắn gửi kỹ thuật..."
                className="form-input"
                style={{ fontSize: '13px' }}
              />
              <button 
                type="submit"
                disabled={!replyText.trim() || simulatingReply}
                className="btn btn-secondary"
                style={{ padding: '10px 20px' }}
              >
                <Send size={15} /> Gửi
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Support Ticket Dashboard Grid List */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {tickets.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              border: isLight ? '1px dashed rgba(0, 0, 0, 0.15)' : '1px dashed rgba(255,255,255,0.08)',
              borderRadius: 'var(--rounded-md)',
              color: 'var(--color-outline)'
            }}>
              <MessageSquare size={40} style={{ marginBottom: '12px' }} />
              <p>Bạn chưa tạo bất kỳ ticket hỗ trợ nào.</p>
              <button onClick={() => setIsCreating(true)} className="btn btn-primary" style={{ marginTop: '16px' }}>
                Tạo Ticket Ngay
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {tickets.map(ticket => (
                <div 
                  key={ticket.id}
                  onClick={() => setActiveTicketId(ticket.id)}
                  className="glass-panel"
                  style={{
                    padding: '20px',
                    borderRadius: 'var(--rounded-md)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255,255,255,0.05)',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255,255,255,0.05)'}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--color-primary-dim)' }}>
                        #{ticket.id}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>
                        {ticket.category}
                      </span>
                      <span style={{ fontSize: '11px', color: getUrgencyColor(ticket.urgency), fontWeight: '600' }}>
                        [{ticket.urgency}]
                      </span>
                    </div>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: isLight ? 'var(--color-on-surface)' : 'white',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {ticket.subject}
                    </h4>
                    <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>
                      Cập nhật: {ticket.messages[ticket.messages.length - 1].time}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {getStatusBadge(ticket.status)}
                    <span style={{ color: 'var(--color-outline)', fontSize: '12px' }}>→</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* FAQs section */}
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px' }}>CÁC CÂU HỎI THƯỜNG GẶP (FAQs)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {[
                { q: 'Thời gian bảo hành linh kiện máy tính là bao lâu?', a: 'Các dòng linh kiện chính hãng như CPU, VGA, RAM, SSD thông thường có thời gian bảo hành từ 36 tháng đến 60 tháng tùy nhà sản xuất.' },
                { q: 'Lắp ráp PC có tính thêm chi phí lắp đặt không?', a: 'Kinetic Tech hỗ trợ cài đặt hệ điều hành bản quyền, kiểm tra tương thích và lắp ráp thùng PC hoàn toàn MIỄN PHÍ khi khách hàng mua đủ linh kiện.' },
                { q: 'Khi máy tính bị lỗi tôi có phải tự mang ra cửa hàng không?', a: 'Với các bộ máy PC ráp nguyên chiếc tại Kinetic Tech, bên mình hỗ trợ bảo hành tận nhà miễn phí trong 12 tháng đầu khu vực nội thành.' }
              ].map((faq, i) => (
                <div key={i} className="glass-panel" style={{ padding: '16px', borderRadius: 'var(--rounded)' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: '700', color: isLight ? 'var(--color-on-surface)' : 'white', display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                    <HelpCircle size={15} color="var(--color-primary-dim)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    {faq.q}
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--color-on-surface-variant)', marginTop: '8px', lineHeight: '1.5' }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      <style>{`
        .dot-blink {
          font-size: 24px;
          line-height: 0;
          color: var(--color-primary-dim);
          animation: blink 1.4s infinite both;
        }
        @keyframes blink {
          0% { opacity: .2; }
          20% { opacity: 1; }
          100% { opacity: .2; }
        }
      `}</style>

    </div>
  );
}

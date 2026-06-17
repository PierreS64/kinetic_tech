import React from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight, ShoppingBag, Tag, Heart, X, ShieldCheck, RotateCcw, CheckCircle2, Lock, Send, HelpCircle } from 'lucide-react';

export default function PolicyTab(props) {
  const { currentUser, setActiveView, theme, likedProductIds, onToggleLike, products, orders, onAddOrder, tradeins, onAddTradeIn, feedbacks, onAddFeedback, onUpdateProfile, onAddSupportTicket, activeTab, setActiveTab, selectedOrder, setSelectedOrder, supportProduct, setSupportProduct, supportOrderId, setSupportOrderId, supportMessage, setSupportMessage, supportUrgency, setSupportUrgency, supportSuccess, setSupportSuccess, feedbackTitle, setFeedbackTitle, feedbackContent, setFeedbackContent, feedbackSuccess, setFeedbackSuccess, profileForm, setProfileForm, profileSuccess, setProfileSuccess, passwordForm, setPasswordForm, passwordError, setPasswordError, passwordSuccess, setPasswordSuccess, formatVND, userOrders, recentOrders, userTradeins, favoriteProducts, warrantyProducts, vouchers, handleCopyVoucher, handleFeedbackSubmit, handleSupportRequestSubmit, handleProfileUpdate, handlePasswordChange } = props;

  return (

              <div className="glass-panel" style={{ borderRadius: 'var(--rounded-lg)', padding: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px' }}>
                  Chính Sách & Quy Định Bảo Hành Cửa Hàng
                </h3>

                <div className="static-policy-content" style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'white', marginBottom: '6px' }}>1. Quy định đổi trả trong 7 ngày đầu</h4>
                    <p>
                      Mọi thiết bị phần cứng (Laptop, CPU, RAM, VGA, Gaming Gear) bán ra tại Kinetic Tech đều được hỗ trợ chính sách đổi trả 1-đổi-1 hoàn toàn miễn phí trong vòng 7 ngày đầu tiên kể từ khi bàn giao thiết bị, nếu phát sinh lỗi phần cứng từ nhà sản xuất. Sản phẩm đổi trả phải còn nguyên hộp, nguyên tem bảo hành của hãng và không móp méo trầy xước vật lý.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'white', marginBottom: '6px' }}>2. Điều kiện bảo hành tiêu chuẩn</h4>
                    <p>
                      Các linh kiện máy tính, màn hình và thiết bị di động được bảo hành miễn phí theo đúng thời gian cam kết của hãng sản xuất (thông thường từ 12 - 36 tháng). Tem bảo hành và số Serial Number trên sản phẩm phải còn nguyên vẹn, không có dấu hiệu tẩy xóa, sửa đổi hay rách vỡ.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-error)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <AlertTriangle size={14} />
                      3. Các trường hợp từ chối bảo hành
                    </h4>
                    <ul style={{ paddingLeft: '20px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <li>Thiết bị có dấu hiệu rơi rớt va chạm, móp méo, nứt vỡ vật lý hoặc hư hại do ngoại lực tác động.</li>
                      <li>Thiết bị bị ẩm ướt, dính nước, vào chất lỏng hoặc bảo quản trong môi trường nhiệt độ ẩm mốc vượt tiêu chuẩn kỹ thuật.</li>
                      <li>Có dấu hiệu chập cháy linh kiện bên trong do cấp sai nguồn điện, sét đánh, thiên tai hoặc côn trùng xâm nhập.</li>
                      <li>Sản phẩm đã bị tháo gỡ tự ý can thiệp phần cứng hoặc mang đi sửa chữa tại các trung tâm không thuộc ủy quyền của Kinetic Tech.</li>
                      <li>Lỗi phát sinh do cài đặt phần mềm độc hại, virus hoặc tự ý ép xung (overclock) vượt giới hạn khuyến cáo của hãng dẫn tới cháy hỏng chip.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'white', marginBottom: '6px' }}>4. Thời gian tiếp nhận và xử lý sự cố</h4>
                    <p>
                      Kinetic Tech nhận bảo hành trực tiếp từ 09:00 đến 17:00 tất cả các ngày trong tuần tại khu vực kỹ thuật. Thời gian kiểm định và khắc phục trung bình từ 3 - 5 ngày làm việc. Đối với các sản phẩm cao cấp cần gửi bảo hành hãng tại nước ngoài, thời gian xử lý có thể kéo dài từ 2 - 3 tuần (sẽ có máy backup tương đương cho khách hàng sử dụng trong lúc chờ đợi).
                    </p>
                  </div>
                </div>
              </div>
            );
}

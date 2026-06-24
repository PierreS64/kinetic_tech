# Kinetic Tech - Hệ thống Thương mại Điện tử & Nền tảng Hỗ Trợ Kỹ Thuật Trực Tuyến Tích Hợp AI

**Platform:** ![Web](https://img.shields.io/badge/Platform-Web-blue)
**Frontend:** ![React](https://img.shields.io/badge/Frontend-React.js-cyan) ![TailwindCSS](https://img.shields.io/badge/UI-Tailwind_CSS-38bdf8)
**Backend:** ![NestJS](https://img.shields.io/badge/Backend-NestJS-red) ![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)
**Database:** ![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791)
**AI Integrated:** ![OpenAI API](https://img.shields.io/badge/AI-OpenAI_API-orange)
**Payment:** ![PayOS](https://img.shields.io/badge/Payment-PayOS-green)
**Status:** ![In Development](https://img.shields.io/badge/Status-In_Development-orange)

## 📌 Tổng Quan Dự Án
**Kinetic Tech** là một hệ thống nền tảng hiện đại, kết hợp đột phá giữa **Thương mại điện tử (E-commerce)** chuyên biệt cho các sản phẩm công nghệ và **Nền tảng hỗ trợ kỹ thuật trực tuyến (Online Technical Support)** sau mua hàng[cite: 1]. 

Điểm nhấn khác biệt của hệ thống là việc ứng dụng **Trí tuệ nhân tạo (AI Chatbot qua LLM API)** đóng vai trò tư vấn viên và giải quyết sự cố tự động cấp độ 1, kết hợp hệ thống **Real-time Live Chat & Ticketing** xử lý bài toán điều phối, kết nối khách hàng với đội ngũ kỹ thuật viên con người một cách tối ưu.

---

## 🏛️ Kiến Trúc Hệ Thống & Tech Stack

Hệ thống được xây dựng theo mô hình phân tách rõ ràng giữa **Frontend (Client-side)** và **Backend (Server-side)** nhằm tối ưu hiệu năng, tăng khả năng mở rộng và bảo trì.

### 1. Frontend (Giao diện người dùng)
*   **React.js:** Thư viện core xây dựng Single Page Application (SPA) mượt mà, kiến trúc Component-based giúp tái sử dụng mã nguồn cao.
*   **Tailwind CSS:** Framework CSS hỗ trợ xây dựng giao diện Responsive, tối ưu hiển thị đồng bộ trên mọi thiết bị (Mobile, Tablet, Desktop).
*   **Socket.io-client:** Đảm bảo kết nối WebSocket thời gian thực phía Client phục vụ cho phân hệ Live Chat.
*   **Redux Toolkit / Zustand:** Quản lý trạng thái toàn cục của ứng dụng (Giỏ hàng, phiên đăng nhập, danh sách tin nhắn).

### 2. Backend (Máy chủ dịch vụ)
*   **NestJS (Node.js Framework):** Framework hướng đối tượng sử dụng **TypeScript**, cấu trúc chia theo Module (`AuthModule`, `ProductModule`, `ChatModule`...) giúp mã nguồn tường minh và dễ làm việc nhóm.
*   **@nestjs/websockets (Socket.io):** Xử lý luồng dữ liệu song công thời gian thực cho Live Chat và phân phối Ticket.
*   **Prisma ORM:** Công cụ tương tác, truy vấn cơ sở dữ liệu mạnh mẽ, an toàn tuyệt đối về kiểu dữ liệu (Type-safe).

### 3. Cơ sở dữ liệu & Dịch vụ tích hợp bên thứ ba (Third-party APIs)
*   **PostgreSQL:** Hệ quản trị cơ sở dữ liệu quan hệ mạnh mẽ, đảm bảo tính toàn vẹn dữ liệu đơn hàng và giao dịch (ACID).
*   **Gemini API / OpenAI API:** Mô hình ngôn ngữ lớn (LLM) cung cấp trí tuệ nhân tạo cho Chatbot AI phục vụ tư vấn và gỡ lỗi tự động.
*   **PayOS API:** Cổng thanh toán trực tuyến thế hệ mới, hỗ trợ tự động tạo mã QR Code (VietQR) và đồng bộ trạng thái đơn hàng qua Webhook khi chuyển khoản thành công.
*   **Cloudinary API:** Lưu trữ đám mây, tối ưu dung lượng hình ảnh sản phẩm và tệp tin phương tiện (ảnh/video báo lỗi) do khách hàng tải lên.

---

## ⚙️ Các Phân Hệ Tính Năng Chính

### 1. Phân hệ Thương mại Điện tử
*   **Quản lý sản phẩm nâng cao:** Bộ lọc thông số kỹ thuật thông minh (RAM, CPU, Dung lượng, Thương hiệu). Quản lý biến thể đa tầng (Màu sắc, cấu hình chi tiết) gắn liền với tồn kho thời gian thực.
*   **Giỏ hàng & Đặt hàng:** Áp dụng mã giảm giá tự động, tính toán phí vận chuyển trực quan.
*   **Thanh toán thông minh:** Tích hợp cổng **PayOS** quét mã VietQR chuyển khoản nhanh 24/7 và hình thức thanh toán COD.
*   **Hành trình Đơn hàng:** Khách hàng dễ dàng theo dõi trạng thái đơn hàng (Chờ xác nhận -> Đang xử lý -> Đang giao -> Đã giao -> Đã hủy).

### 2. Phân hệ Trợ lý ảo Chatbot AI & Hỗ trợ kỹ thuật trực tuyến
*   **Trợ lý ảo Chatbot AI (Tích hợp LLM API):** Tự động trả lời, hướng dẫn xử lý các lỗi phần mềm cơ bản dựa trên dữ liệu từ Cơ sở tri thức (Knowledge Base) và Chính sách bảo hành của Kinetic Tech.
*   **Cơ chế Handover:** Khi AI gặp câu hỏi phức tạp hoặc theo yêu cầu từ khách, hệ thống tự động kích hoạt Socket.io chuyển tiếp phiên chat kèm toàn bộ lịch sử trò chuyện sang hàng đợi của Kỹ thuật viên phù hợp.
*   **Hệ thống Ticket hỗ trợ (Ticketing System):** Khách hàng tạo ticket báo lỗi dựa trên sản phẩm đã mua, đính kèm hình ảnh/video minh họa qua Cloudinary, phân loại mức độ nghiêm trọng (Thấp, Trung bình, Cao).
*   **Live Chat Real-time:** Kênh trò chuyện song công trực tiếp giữa Kỹ thuật viên và Khách hàng qua Socket.io.
*   **Đặt lịch sửa chữa:** Đặt lịch mang thiết bị tới trung tâm hoặc kỹ thuật viên tới nhà theo thời gian thực (tránh trùng lịch hẹn).

### 3. Phân hệ Quản lý Tài khoản Khách hàng
*   **Trang Tổng quan (Overview):** Tóm tắt 3 đơn hàng gần nhất, thẻ voucher hiện có, sản phẩm yêu thích và banner khuyến mãi.
*   **Bảo hành điện tử (Warranty Lookup):** Tự động kích hoạt và hiển thị thời hạn bảo hành qua Số Serial/IMEI của sản phẩm công nghệ đã mua.
*   **Thu cũ đổi mới (Trade-in):** Cho phép khách hàng đăng ký thanh lý máy cũ, tự đánh giá ngoại hình và nhận định giá sơ bộ từ hệ thống.

### 4. Phân hệ Quản trị & Điều hành (Admin & Analytics)
*   **Phân quyền hệ thống (RBAC):** Quản lý tài khoản nghiêm ngặt theo vai trò (Admin, Kỹ thuật viên, Khách hàng).
*   **Biểu đồ Thống kê (Dashboard Analytics):** Thống kê doanh thu bán hàng; Đo lường hiệu suất xử lý Ticket của kỹ thuật viên (thời gian phản hồi, tỉ lệ đóng ticket); Thống kê chỉ số hài lòng của khách hàng (CSAT).

---

## 📅 Kế Hoạch Triển Khai (Mô hình Frontend-First)
Dự án được triển khai cuốn chiếu theo mô hình Giao diện chạy trước để kiểm thử trải nghiệm người dùng, sau đó phát triển lõi xử lý và cơ sở dữ liệu.

*   **Tuần 1 (25/05 – 31/05/2026):** Thiết kế Wireframe/Mockup hệ thống trên Figma; Khởi tạo khung Frontend (React.js); Nghiên cứu Prompt Engineering cho LLM API.
*   **Tuần 2 & 3 (01/06 – 16/06/2026):** **Hoàn thiện 100% giao diện Frontend** (Trang chủ TMĐT, Dashboard Khách hàng, Dashboard Kỹ thuật viên, Hộp chatbox) sử dụng dữ liệu giả lập (Mock Data).
*   **Tuần 4 & 5 (17/06 – 05/07/2026):** **Bắt đầu Backend & Database.** Thiết kế sơ đồ ERD, tạo DB PostgreSQL; Lập trình khung API NestJS (Auth JWT, Module Product, Cart, Order, Customer Profile); Tích hợp cổng PayOS.
*   **Tuần 6 (06/07 – 12/07/2026):** Cấu hình Real-time Socket.io trên Backend; Tích hợp LLM API cho Chatbot AI; Kết nối API Upload ảnh Cloudinary; Đồng bộ kết nối Frontend - Backend dữ liệu thật.
*   **Tuần 7 (13/07 – 20/07/2026):** Kiểm thử End-to-End toàn diện; Tối ưu hóa Database Index; Nghiệm thu sản phẩm, sửa lỗi hệ thống (Bug log) và hoàn thiện quyển báo cáo đồ án.
*   **Mốc hoàn thiện cuối cùng:** **20/07/2026**

---

## 👥 Thành Viên Nhóm Thực Hiện
1.  **Nguyễn Thị Minh Anh** – Thiết kế UI/UX (Figma) / Lập trình Frontend (React.js) / Tester
2.  **Hàn Minh Tùng** – Tích hợp Trí tuệ nhân tạo (LLM API) / Lập trình Frontend (React.js)
3.  **Nguyễn Thuận Phong** – Leader / Kiến trúc Backend (NestJS) / Hệ thống Real-time / Tester
4.  **Nguyễn Tiến Thành** – Thiết kế Cơ sở dữ liệu (PostgreSQL) / Lập trình Backend (NestJS)

---
*Dự án thuộc học phần Đồ án Chuyên ngành - Bản quyền thiết kế và phát triển bởi đội ngũ Kinetic Tech.*
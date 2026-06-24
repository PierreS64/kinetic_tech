-- KINETIC TECH DATABASE INITIALIZATION
-- Vui lòng chạy toàn bộ đoạn script này trong Query Tool của pgAdmin

-- 1. Tạo các kiểu ENUM (Kiểu dữ liệu liệt kê)
CREATE TYPE "Role" AS ENUM ('ADMIN', 'TECHNICIAN', 'CUSTOMER');
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');
CREATE TYPE "PaymentMethod" AS ENUM ('COD', 'PAYOS');
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED');
CREATE TYPE "TradeInStatus" AS ENUM ('PENDING', 'APPROVED', 'PURCHASED', 'CANCELLED');
CREATE TYPE "Severity" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
CREATE TYPE "TicketStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');
CREATE TYPE "ChatSessionStatus" AS ENUM ('AI_HANDLING', 'WAITING_FOR_TECH', 'TECHNICIAN_HANDLING', 'CLOSED');
CREATE TYPE "SenderType" AS ENUM ('CUSTOMER', 'AI', 'TECHNICIAN');
CREATE TYPE "AppointmentType" AS ENUM ('IN_STORE', 'AT_HOME');
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');
CREATE TYPE "CouponType" AS ENUM ('ORDER_DISCOUNT', 'PRODUCT_DISCOUNT');

-- 2. Bảng: Người Dùng (User)
CREATE TABLE "User" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "fullName" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(20) UNIQUE,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "Role" DEFAULT 'CUSTOMER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3) NULL -- Xóa mềm
);

-- 2.1 Bảng: Sổ địa chỉ người dùng (UserAddress)
CREATE TABLE "UserAddress" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "address" TEXT NOT NULL,
    "isDefault" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Bảng: Danh mục (Category)
CREATE TABLE "Category" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "deletedAt" TIMESTAMP(3) NULL -- Xóa mềm
);

-- 4. Bảng: Sản phẩm (Product)
CREATE TABLE "Product" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "categoryId" UUID NOT NULL REFERENCES "Category"("id") ON DELETE RESTRICT,
    "brand" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3) NULL -- Xóa mềm
);

-- 4.1 Bảng: Hình ảnh Sản phẩm (ProductImage)
CREATE TABLE "ProductImage" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "productId" UUID NOT NULL REFERENCES "Product"("id") ON DELETE CASCADE,
    "imageUrl" TEXT NOT NULL,
    "isThumbnail" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4.2 Bảng: Thuộc tính kỹ thuật (Attribute) - Ví dụ: RAM, CPU, GPU, Display
CREATE TABLE "Attribute" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL UNIQUE
);

-- 4.3 Bảng: Giá trị thuộc tính của sản phẩm (ProductAttributeValue) - Ví dụ: RAM 16GB, Core i7
CREATE TABLE "ProductAttributeValue" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "productId" UUID NOT NULL REFERENCES "Product"("id") ON DELETE CASCADE,
    "attributeId" UUID NOT NULL REFERENCES "Attribute"("id") ON DELETE CASCADE,
    "value" VARCHAR(255) NOT NULL
);

-- 5. Bảng: Biến thể Sản phẩm (ProductVariant)
CREATE TABLE "ProductVariant" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "productId" UUID NOT NULL REFERENCES "Product"("id") ON DELETE CASCADE,
    "color" VARCHAR(100),
    "price" DOUBLE PRECISION NOT NULL,
    "stockQuantity" INT NOT NULL DEFAULT 0,
    "deletedAt" TIMESTAMP(3) NULL -- Xóa mềm
);

-- 6. Bảng: Đánh giá & Bình luận (Review)
CREATE TABLE "Review" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "productId" UUID NOT NULL REFERENCES "Product"("id") ON DELETE CASCADE,
    "rating" INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    "comment" TEXT,
    "imageUrls" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 7. Bảng: Mã giảm giá (Coupon)
CREATE TABLE "Coupon" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code" VARCHAR(50) UNIQUE NOT NULL,
    "type" "CouponType" DEFAULT 'ORDER_DISCOUNT',
    "discountAmount" DOUBLE PRECISION,
    "discountPercentage" DOUBLE PRECISION,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validUntil" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "deletedAt" TIMESTAMP(3) NULL -- Xóa mềm
);

-- 7.1 Bảng: Mã giảm giá áp dụng cho sản phẩm cụ thể (CouponProduct)
CREATE TABLE "CouponProduct" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "couponId" UUID NOT NULL REFERENCES "Coupon"("id") ON DELETE CASCADE,
    "productId" UUID NOT NULL REFERENCES "Product"("id") ON DELETE CASCADE
);

-- 8. Bảng: Giỏ hàng (Cart)
CREATE TABLE "Cart" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL UNIQUE REFERENCES "User"("id") ON DELETE CASCADE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 8.1 Bảng: Chi tiết Giỏ hàng (CartItem)
CREATE TABLE "CartItem" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "cartId" UUID NOT NULL REFERENCES "Cart"("id") ON DELETE CASCADE,
    "productVariantId" UUID NOT NULL REFERENCES "ProductVariant"("id") ON DELETE CASCADE,
    "quantity" INT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 9. Bảng: Đơn hàng (Order)
CREATE TABLE "Order" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE RESTRICT,
    "userAddressId" UUID REFERENCES "UserAddress"("id") ON DELETE SET NULL,
    "couponId" UUID REFERENCES "Coupon"("id") ON DELETE SET NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "status" "OrderStatus" DEFAULT 'PENDING',
    "paymentMethod" "PaymentMethod" NOT NULL,
    "paymentStatus" "PaymentStatus" DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 9.1 Bảng: Chi tiết Đơn hàng (OrderItem)
CREATE TABLE "OrderItem" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "orderId" UUID NOT NULL REFERENCES "Order"("id") ON DELETE CASCADE,
    "productVariantId" UUID NOT NULL REFERENCES "ProductVariant"("id") ON DELETE RESTRICT,
    "quantity" INT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL
);

-- 9.2 Bảng: Lịch sử Giao dịch (Transaction - PayOS Log)
CREATE TABLE "Transaction" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "orderId" UUID NOT NULL REFERENCES "Order"("id") ON DELETE CASCADE,
    "gatewayTransactionId" VARCHAR(255),
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 10. Bảng: Sản phẩm Yêu thích (Favorite)
CREATE TABLE "Favorite" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "productId" UUID NOT NULL REFERENCES "Product"("id") ON DELETE CASCADE
);

-- 11. Bảng: Thiết bị của Khách hàng - Bảo hành (UserDevice)
CREATE TABLE "UserDevice" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "productId" UUID NOT NULL REFERENCES "Product"("id") ON DELETE RESTRICT,
    "serialNumber" VARCHAR(100) UNIQUE NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,
    "warrantyExpiryDate" TIMESTAMP(3) NOT NULL
);

-- 12. Bảng: Yêu cầu Thu cũ đổi mới (TradeIn)
CREATE TABLE "TradeIn" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "deviceName" VARCHAR(255) NOT NULL,
    "condition" TEXT NOT NULL,
    "estimatedValue" DOUBLE PRECISION,
    "status" "TradeInStatus" DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 13. Bảng: Góp ý - Phản hồi (Feedback)
CREATE TABLE "Feedback" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 14. Bảng: Ticket Hỗ trợ Kỹ thuật (Ticket)
CREATE TABLE "Ticket" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "customerId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "technicianId" UUID REFERENCES "User"("id") ON DELETE SET NULL,
    "userDeviceId" UUID REFERENCES "UserDevice"("id") ON DELETE SET NULL,
    "description" TEXT NOT NULL,
    "imageUrls" TEXT[], 
    "severity" "Severity" DEFAULT 'LOW',
    "status" "TicketStatus" DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 15. Bảng: Phiên Chat Hỗ trợ (ChatSession)
CREATE TABLE "ChatSession" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "customerId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "technicianId" UUID REFERENCES "User"("id") ON DELETE SET NULL,
    "status" "ChatSessionStatus" DEFAULT 'AI_HANDLING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 16. Bảng: Tin nhắn Chat (ChatMessage)
CREATE TABLE "ChatMessage" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "chatSessionId" UUID NOT NULL REFERENCES "ChatSession"("id") ON DELETE CASCADE,
    "senderType" "SenderType" NOT NULL,
    "content" TEXT NOT NULL,
    "attachments" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 17. Bảng: Lịch hẹn Sửa chữa (Appointment)
CREATE TABLE "Appointment" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "customerId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "technicianId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "date" TIMESTAMP(3) NOT NULL,
    "timeSlot" VARCHAR(50) NOT NULL,
    "type" "AppointmentType" NOT NULL,
    "status" "AppointmentStatus" DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 18. Bảng: Cơ sở tri thức (KnowledgeBase)
CREATE TABLE "KnowledgeBase" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 19. Bảng: Banner quảng cáo (Banner)
CREATE TABLE "Banner" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "imageUrl" TEXT NOT NULL,
    "linkUrl" TEXT,
    "isActive" BOOLEAN DEFAULT true
);

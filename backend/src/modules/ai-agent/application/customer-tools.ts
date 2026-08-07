import { PrismaService } from '../../core/prisma/application/prisma.service';

// ─── Tool Definitions for OpenAI Function Calling ───────────────────────────

export const CUSTOMER_TOOLS: any[] = [
  {
    type: 'function',
    function: {
      name: 'search_products',
      description:
        'Tìm kiếm sản phẩm theo tên, danh mục, thương hiệu hoặc ngân sách. Dùng khi khách hỏi về sản phẩm, giá cả, tồn kho.',
      parameters: {
        type: 'object',
        properties: {
          keyword: { type: 'string', description: 'Từ khóa tìm kiếm sản phẩm' },
          categoryName: { type: 'string', description: 'Tên danh mục (Laptop, Gaming Gear, Phụ kiện...)' },
          brand: { type: 'string', description: 'Thương hiệu (Apple, Asus, MSI...)' },
          maxPrice: { type: 'number', description: 'Giá tối đa (VND)' },
          minPrice: { type: 'number', description: 'Giá tối thiểu (VND)' },
          limit: { type: 'number', description: 'Số lượng kết quả tối đa (mặc định 5)' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_product_details',
      description:
        'Lấy thông tin chi tiết một sản phẩm cụ thể bao gồm giá, tồn kho, thông số kỹ thuật.',
      parameters: {
        type: 'object',
        properties: {
          productId: { type: 'string', description: 'ID của sản phẩm' },
        },
        required: ['productId'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_order_status',
      description:
        'Kiểm tra trạng thái đơn hàng của khách hàng hiện tại. Có thể lọc theo trạng thái.',
      parameters: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            description: 'Lọc theo trạng thái: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED',
          },
          limit: { type: 'number', description: 'Số đơn hàng gần nhất (mặc định 3)' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'check_warranty',
      description:
        'Kiểm tra thông tin bảo hành thiết bị của khách hàng qua UserDevice (ngày hết hạn bảo hành).',
      parameters: {
        type: 'object',
        properties: {
          deviceId: {
            type: 'string',
            description: 'ID thiết bị cụ thể (nếu không có sẽ trả về tất cả)',
          },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'suggest_products',
      description:
        'Gợi ý sản phẩm phù hợp theo ngân sách và mục đích sử dụng (gaming, lập trình, đồ họa, văn phòng...)',
      parameters: {
        type: 'object',
        properties: {
          budget: { type: 'number', description: 'Ngân sách tối đa (VND)' },
          purpose: {
            type: 'string',
            description: 'Mục đích: gaming, coding, design, office',
          },
          categoryName: { type: 'string', description: 'Danh mục ưu tiên (Laptop, Gaming Gear...)' },
        },
        required: ['budget'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'suggest_pc_build',
      description:
        'Gợi ý cấu hình xây dựng PC (PC build) gồm các linh kiện (CPU, Mainboard, RAM, VGA, SSD, Nguồn, Case) phù hợp với tổng ngân sách.',
      parameters: {
        type: 'object',
        properties: {
          budget: { type: 'number', description: 'Tổng ngân sách (VND) cho toàn bộ PC' },
          purpose: {
            type: 'string',
            description: 'Mục đích: gaming, coding, design, office',
          },
        },
        required: ['budget'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_support_ticket',
      description:
        'Tạo yêu cầu hỗ trợ kỹ thuật cho khách hàng khi có vấn đề cần nhân viên can thiệp.',
      parameters: {
        type: 'object',
        properties: {
          description: { type: 'string', description: 'Mô tả chi tiết vấn đề cần hỗ trợ' },
          severity: {
            type: 'string',
            description: 'Mức độ nghiêm trọng: LOW, MEDIUM, HIGH',
          },
        },
        required: ['description'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_active_coupons',
      description: 'Lấy danh sách mã giảm giá đang có hiệu lực mà khách hàng có thể sử dụng.',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_my_appointments',
      description: 'Lấy danh sách lịch hẹn sửa chữa / tư vấn của khách hàng.',
      parameters: {
        type: 'object',
        properties: {
          upcoming: {
            type: 'boolean',
            description: 'true = chỉ lịch hẹn sắp tới (từ hôm nay), false = tất cả',
          },
        },
      },
    },
  },
];

// ─── Tool Executor ─────────────────────────────────────────────────────────

export async function executeCustomerTool(
  toolName: string,
  args: Record<string, any>,
  userId: string,
  prisma: PrismaService,
): Promise<any> {
  switch (toolName) {
    // ── search_products ────────────────────────────────────────────────────
    case 'search_products': {
      const limit = args.limit || 5;
      const products = await prisma.product.findMany({
        where: {
          deletedAt: null,
          ...(args.keyword && {
            OR: [
              { name: { contains: args.keyword, mode: 'insensitive' } },
              { brand: { contains: args.keyword, mode: 'insensitive' } },
              { description: { contains: args.keyword, mode: 'insensitive' } },
            ],
          }),
          ...(args.brand && { brand: { contains: args.brand, mode: 'insensitive' } }),
          ...(args.categoryName && {
            Category: { name: { contains: args.categoryName, mode: 'insensitive' } },
          }),
          ProductVariant: {
            some: {
              deletedAt: null,
              ...(args.maxPrice && { price: { lte: args.maxPrice } }),
              ...(args.minPrice && { price: { gte: args.minPrice } }),
            },
          },
        },
        include: {
          Category: true,
          ProductImage: { take: 1 },
          ProductVariant: {
            where: { deletedAt: null },
            orderBy: { price: 'asc' },
            take: 1,
          },
        },
        take: limit,
      });

      if (products.length === 0) {
        return { found: 0, message: 'Không tìm thấy sản phẩm phù hợp.' };
      }

      return {
        found: products.length,
        products: products.map((p) => ({
          id: p.id,
          name: p.name,
          brand: p.brand,
          category: p.Category?.name,
          price: p.ProductVariant[0]?.price ?? 0,
          stockQuantity: p.ProductVariant[0]?.stockQuantity ?? 0,
          inStock: (p.ProductVariant[0]?.stockQuantity ?? 0) > 0,
          image: p.ProductImage[0]?.imageUrl,
        })),
      };
    }

    // ── get_product_details ────────────────────────────────────────────────
    case 'get_product_details': {
      const product = await prisma.product.findUnique({
        where: { id: args.productId },
        include: {
          Category: true,
          ProductImage: true,
          ProductVariant: { where: { deletedAt: null } },
        },
      });
      if (!product) return { error: 'Sản phẩm không tồn tại.' };
      return {
        id: product.id,
        name: product.name,
        brand: product.brand,
        category: product.Category?.name,
        description: product.description?.substring(0, 300),
        variants: product.ProductVariant.map((v) => ({
          color: v.color,
          price: v.price,
          stock: v.stockQuantity,
        })),
        images: product.ProductImage.map((i) => i.imageUrl).slice(0, 3),
      };
    }

    // ── get_order_status ───────────────────────────────────────────────────
    case 'get_order_status': {
      const limit = args.limit || 3;
      const orders = await prisma.order.findMany({
        where: {
          userId,
          ...(args.status && { status: args.status as any }),
        },
        include: {
          OrderItem: {
            include: {
              ProductVariant: { include: { Product: { select: { name: true } } } },
            },
            take: 3,
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });

      if (orders.length === 0) return { found: 0, message: 'Bạn chưa có đơn hàng nào.' };

      const STATUS_LABELS: Record<string, string> = {
        PENDING: '⏳ Chờ xác nhận',
        PROCESSING: '🔄 Đang xử lý',
        SHIPPED: '🚚 Đang giao hàng',
        DELIVERED: '📦 Đã giao hàng',
        CANCELLED: '❌ Đã hủy',
      };

      return {
        found: orders.length,
        orders: orders.map((o) => ({
          id: o.id,
          status: STATUS_LABELS[o.status as string] ?? o.status,
          totalAmount: o.totalAmount,
          paymentMethod: o.paymentMethod,
          createdAt: o.createdAt.toISOString().split('T')[0],
          items: o.OrderItem.map((i) => ({
            product: i.ProductVariant?.Product?.name,
            quantity: i.quantity,
            price: i.price,
          })),
        })),
      };
    }

    // ── check_warranty ─────────────────────────────────────────────────────
    case 'check_warranty': {
      const devices = await prisma.userDevice.findMany({
        where: {
          userId,
          ...(args.deviceId && { id: args.deviceId }),
        },
        include: {
          Product: { select: { name: true, brand: true } },
        },
        orderBy: { warrantyExpiryDate: 'asc' },
      });

      if (devices.length === 0) {
        return { found: 0, message: 'Không tìm thấy thiết bị đã đăng ký bảo hành.' };
      }

      const now = new Date();
      return {
        found: devices.length,
        devices: devices.map((d) => {
          const daysLeft = Math.ceil(
            (new Date(d.warrantyExpiryDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
          );
          return {
            id: d.id,
            deviceName: d.Product?.name ?? 'Không xác định',
            brand: d.Product?.brand,
            serialNumber: d.serialNumber,
            purchaseDate: d.purchaseDate.toISOString().split('T')[0],
            warrantyExpiryDate: d.warrantyExpiryDate.toISOString().split('T')[0],
            daysLeft: Math.max(daysLeft, 0),
            expired: daysLeft <= 0,
            expiringSoon: daysLeft > 0 && daysLeft <= 30,
          };
        }),
      };
    }

    // ── suggest_products ───────────────────────────────────────────────────
    case 'suggest_products': {
      const budget = args.budget;

      const products = await prisma.product.findMany({
        where: {
          deletedAt: null,
          ...(args.categoryName && {
            Category: { name: { contains: args.categoryName, mode: 'insensitive' } },
          }),
          ProductVariant: {
            some: {
              deletedAt: null,
              price: { lte: budget },
              stockQuantity: { gt: 0 },
            },
          },
        },
        include: {
          Category: true,
          ProductImage: { take: 1 },
          ProductVariant: {
            where: { deletedAt: null, price: { lte: budget }, stockQuantity: { gt: 0 } },
            orderBy: { price: 'desc' },
            take: 1,
          },
        },
        take: 5,
      });

      if (products.length === 0) {
        return { found: 0, message: `Không tìm thấy sản phẩm phù hợp với ngân sách ${budget.toLocaleString('vi-VN')} VND.` };
      }

      return {
        budget,
        purpose: args.purpose || 'general',
        found: products.length,
        suggestions: products.map((p) => ({
          id: p.id,
          name: p.name,
          brand: p.brand,
          category: p.Category?.name,
          price: p.ProductVariant[0]?.price,
          inStock: true,
          image: p.ProductImage[0]?.imageUrl,
        })),
      };
    }

    // ── suggest_pc_build ───────────────────────────────────────────────────
    case 'suggest_pc_build': {
      const budget = args.budget;
      
      // Allocation (approximate)
      const alloc = {
        cpu: budget * 0.20,
        gpu: budget * 0.35,
        mb: budget * 0.15,
        ram: budget * 0.10,
        ssd: budget * 0.08,
        psu: budget * 0.07,
        case: budget * 0.05
      };

      const fetchComponent = async (keywords: string[], maxPrice: number) => {
        const products = await prisma.product.findMany({
          where: {
            deletedAt: null,
            OR: keywords.map(kw => ({ name: { contains: kw, mode: 'insensitive' } })),
            ProductVariant: {
              some: { deletedAt: null, price: { lte: maxPrice }, stockQuantity: { gt: 0 } },
            },
          },
          include: {
            ProductVariant: {
              where: { deletedAt: null, price: { lte: maxPrice }, stockQuantity: { gt: 0 } },
              orderBy: { price: 'desc' },
              take: 1,
            },
          },
          take: 1,
        });
        return products.length > 0 ? products[0] : null;
      };

      const [cpu, gpu, mb, ram, ssd, psu, pcCase] = await Promise.all([
        fetchComponent(['cpu', 'ryzen', 'core i'], alloc.cpu),
        fetchComponent(['card màn hình', 'rtx', 'rx ', 'vga'], alloc.gpu),
        fetchComponent(['mainboard', 'bo mạch chủ', 'b650', 'b760', 'z790'], alloc.mb),
        fetchComponent(['ram', 'corsair', 'ddr5', 'ddr4'], alloc.ram),
        fetchComponent(['ssd', 'nvme', 'ổ cứng'], alloc.ssd),
        fetchComponent(['nguồn', 'psu'], alloc.psu),
        fetchComponent(['vỏ máy tính', 'case'], alloc.case),
      ]);

      const build: any[] = [];
      let total = 0;

      if (cpu) { build.push({ component: 'CPU', id: cpu.id, sku: cpu.ProductVariant[0]?.id || cpu.id, name: cpu.name, price: cpu.ProductVariant[0].price }); total += cpu.ProductVariant[0].price; }
      if (gpu) { build.push({ component: 'VGA', id: gpu.id, sku: gpu.ProductVariant[0]?.id || gpu.id, name: gpu.name, price: gpu.ProductVariant[0].price }); total += gpu.ProductVariant[0].price; }
      if (mb) { build.push({ component: 'Mainboard', id: mb.id, sku: mb.ProductVariant[0]?.id || mb.id, name: mb.name, price: mb.ProductVariant[0].price }); total += mb.ProductVariant[0].price; }
      if (ram) { build.push({ component: 'RAM', id: ram.id, sku: ram.ProductVariant[0]?.id || ram.id, name: ram.name, price: ram.ProductVariant[0].price }); total += ram.ProductVariant[0].price; }
      if (ssd) { build.push({ component: 'SSD', id: ssd.id, sku: ssd.ProductVariant[0]?.id || ssd.id, name: ssd.name, price: ssd.ProductVariant[0].price }); total += ssd.ProductVariant[0].price; }
      if (psu) { build.push({ component: 'Nguồn (PSU)', id: psu.id, sku: psu.ProductVariant[0]?.id || psu.id, name: psu.name, price: psu.ProductVariant[0].price }); total += psu.ProductVariant[0].price; }
      if (pcCase) { build.push({ component: 'Vỏ Case', id: pcCase.id, sku: pcCase.ProductVariant[0]?.id || pcCase.id, name: pcCase.name, price: pcCase.ProductVariant[0].price }); total += pcCase.ProductVariant[0].price; }

      if (build.length === 0) {
        return { found: 0, message: `Không thể cấu hình PC trong tầm giá ${budget.toLocaleString('vi-VN')} VND. Bạn có thể tăng ngân sách.` };
      }

      return {
        budget,
        totalCost: total,
        componentsFound: build.length,
        build: build
      };
    }

    // ── create_support_ticket ──────────────────────────────────────────────
    case 'create_support_ticket': {
      const ticket = await prisma.ticket.create({
        data: {
          customerId: userId,
          description: args.description,
          severity: args.severity || 'MEDIUM',
          status: 'OPEN',
          imageUrls: [],
        },
      });
      return {
        success: true,
        ticketId: ticket.id,
        message: `✅ Ticket hỗ trợ đã được tạo! Mã: #${ticket.id.slice(-6).toUpperCase()}. Kỹ thuật viên sẽ liên hệ bạn sớm.`,
      };
    }

    // ── get_active_coupons ─────────────────────────────────────────────────
    case 'get_active_coupons': {
      const now = new Date();
      const coupons = await prisma.coupon.findMany({
        where: {
          isActive: true,
          deletedAt: null,
          validFrom: { lte: now },
          validUntil: { gt: now },
        },
        orderBy: { discountPercentage: 'desc' },
        take: 5,
      });

      if (coupons.length === 0) return { found: 0, message: 'Hiện không có mã giảm giá nào đang hoạt động.' };

      return {
        found: coupons.length,
        coupons: coupons.map((c) => ({
          code: c.code,
          type: c.type,
          discountAmount: c.discountAmount,
          discountPercentage: c.discountPercentage,
          validUntil: c.validUntil.toISOString().split('T')[0],
          description: c.discountPercentage
            ? `Giảm ${c.discountPercentage}% cho đơn hàng`
            : `Giảm ${c.discountAmount?.toLocaleString('vi-VN')} VND`,
        })),
      };
    }

    // ── get_my_appointments ────────────────────────────────────────────────
    case 'get_my_appointments': {
      const now = new Date();
      const appointments = await prisma.appointment.findMany({
        where: {
          customerId: userId,
          ...(args.upcoming && { date: { gte: now } }),
        },
        include: {
          User_Appointment_technicianIdToUser: {
            select: { fullName: true },
          },
        },
        orderBy: { date: 'asc' },
        take: 5,
      });

      if (appointments.length === 0)
        return { found: 0, message: 'Bạn chưa có lịch hẹn nào.' };

      return {
        found: appointments.length,
        appointments: appointments.map((a) => ({
          id: a.id,
          type: a.type,
          date: a.date.toISOString().split('T')[0],
          timeSlot: a.timeSlot,
          technician: a.User_Appointment_technicianIdToUser?.fullName ?? 'Chưa phân công',
          status: a.status,
        })),
      };
    }

    default:
      return { error: `Tool "${toolName}" không được hỗ trợ.` };
  }
}

import { PrismaService } from '../../core/prisma/application/prisma.service';

// ─── Tool Definitions for OpenAI Function Calling ───────────────────────────

export const ADMIN_TOOLS: any[] = [
  {
    type: 'function',
    function: {
      name: 'get_revenue_stats',
      description:
        'Lấy thống kê doanh thu theo khoảng thời gian. Dùng khi admin hỏi về doanh thu, lợi nhuận, tổng tiền.',
      parameters: {
        type: 'object',
        properties: {
          period: {
            type: 'string',
            description: 'Khoảng thời gian: today, week, month, year',
          },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_top_products',
      description: 'Lấy danh sách sản phẩm bán chạy nhất theo doanh số.',
      parameters: {
        type: 'object',
        properties: {
          limit: { type: 'number', description: 'Số lượng sản phẩm (mặc định 5)' },
          period: {
            type: 'string',
            description: 'Khoảng thời gian: week, month, year, all',
          },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_low_stock_products',
      description: 'Lấy danh sách sản phẩm sắp hết hàng (tồn kho thấp).',
      parameters: {
        type: 'object',
        properties: {
          threshold: {
            type: 'number',
            description: 'Ngưỡng tồn kho cảnh báo (mặc định 5)',
          },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_ticket_stats',
      description: 'Thống kê support tickets: đang mở, đang xử lý, đã giải quyết.',
      parameters: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            description: 'Lọc theo trạng thái: OPEN, IN_PROGRESS, RESOLVED, CLOSED',
          },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_appointment_stats',
      description: 'Thống kê lịch hẹn sửa chữa theo ngày/tuần.',
      parameters: {
        type: 'object',
        properties: {
          period: {
            type: 'string',
            description: 'Khoảng thời gian: today, week, month',
          },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_review_summary',
      description:
        'Tổng hợp đánh giá sản phẩm. Tìm sản phẩm bị đánh giá thấp nhiều nhất.',
      parameters: {
        type: 'object',
        properties: {
          limit: { type: 'number', description: 'Số kết quả trả về (mặc định 5)' },
          lowRatingOnly: {
            type: 'boolean',
            description: 'true = chỉ lấy đánh giá thấp (1-2 sao)',
          },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'search_orders',
      description: 'Tìm kiếm đơn hàng theo tên khách hàng hoặc trạng thái.',
      parameters: {
        type: 'object',
        properties: {
          customerName: { type: 'string', description: 'Tên hoặc email khách hàng' },
          status: {
            type: 'string',
            description: 'Trạng thái đơn hàng: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED',
          },
          limit: { type: 'number', description: 'Số kết quả tối đa (mặc định 10)' },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_tradein_stats',
      description: 'Thống kê các yêu cầu trade-in theo trạng thái.',
      parameters: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            description: 'Lọc trạng thái: PENDING, APPROVED, PURCHASED, CANCELLED',
          },
        },
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_overview_dashboard',
      description:
        'Lấy tổng quan dashboard: đơn hàng hôm nay, doanh thu tháng, ticket mở, lịch hẹn, cảnh báo kho.',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  },
];

// ─── Helper ────────────────────────────────────────────────────────────────

function getPeriodDates(period: string): { start: Date; end: Date } {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const start = new Date(now);

  switch (period) {
    case 'today':
      start.setHours(0, 0, 0, 0);
      break;
    case 'week':
      start.setDate(now.getDate() - 7);
      start.setHours(0, 0, 0, 0);
      break;
    case 'month':
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      break;
    case 'year':
      start.setMonth(0, 1);
      start.setHours(0, 0, 0, 0);
      break;
    default:
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
  }

  return { start, end };
}

// ─── Tool Executor ─────────────────────────────────────────────────────────

export async function executeAdminTool(
  toolName: string,
  args: Record<string, any>,
  prisma: PrismaService,
): Promise<any> {
  switch (toolName) {
    // ── get_revenue_stats ──────────────────────────────────────────────────
    case 'get_revenue_stats': {
      const { start, end } = getPeriodDates(args.period || 'month');

      const orders = await prisma.order.findMany({
        where: {
          status: { in: ['PROCESSING', 'SHIPPED', 'DELIVERED'] as any[] },
          createdAt: { gte: start, lte: end },
        },
        select: { totalAmount: true, status: true, createdAt: true },
      });

      const totalRevenue = orders.reduce((s, o) => s + (o.totalAmount ?? 0), 0);
      const deliveredRevenue = orders
        .filter((o) => o.status === 'DELIVERED')
        .reduce((s, o) => s + (o.totalAmount ?? 0), 0);

      const cancelledCount = await prisma.order.count({
        where: { status: 'CANCELLED' as any, createdAt: { gte: start, lte: end } },
      });
      const pendingCount = await prisma.order.count({
        where: { status: 'PENDING' as any, createdAt: { gte: start, lte: end } },
      });

      return {
        period: args.period || 'month',
        dateRange: `${start.toISOString().split('T')[0]} → ${end.toISOString().split('T')[0]}`,
        totalConfirmedOrders: orders.length,
        cancelledOrders: cancelledCount,
        pendingOrders: pendingCount,
        totalRevenue,
        deliveredRevenue,
        avgOrderValue: orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0,
      };
    }

    // ── get_top_products ───────────────────────────────────────────────────
    case 'get_top_products': {
      const limit = args.limit || 5;
      const { start } = getPeriodDates(args.period === 'all' ? 'year' : (args.period || 'month'));

      const topItems = await prisma.orderItem.groupBy({
        by: ['productVariantId'],
        _sum: { quantity: true },
        where: {
          Order: {
            status: { in: ['PROCESSING', 'SHIPPED', 'DELIVERED'] as any[] },
            ...(args.period !== 'all' && { createdAt: { gte: start } }),
          },
        },
        orderBy: { _sum: { quantity: 'desc' } },
        take: limit,
      });

      const variantIds = topItems.map((i) => i.productVariantId);
      const variants = await prisma.productVariant.findMany({
        where: { id: { in: variantIds } },
        include: { Product: { include: { ProductImage: { take: 1 } } } },
      });

      return {
        period: args.period || 'month',
        topProducts: topItems.map((item, idx) => {
          const variant = variants.find((v) => v.id === item.productVariantId);
          return {
            rank: idx + 1,
            product: variant?.Product?.name ?? 'Unknown',
            color: variant?.color,
            totalSold: item._sum.quantity ?? 0,
            price: variant?.price,
            image: variant?.Product?.ProductImage?.[0]?.imageUrl,
          };
        }),
      };
    }

    // ── get_low_stock_products ─────────────────────────────────────────────
    case 'get_low_stock_products': {
      const threshold = args.threshold ?? 5;
      const lowStockVariants = await prisma.productVariant.findMany({
        where: { stockQuantity: { lte: threshold }, deletedAt: null },
        include: { Product: { include: { Category: true } } },
        orderBy: { stockQuantity: 'asc' },
        take: 10,
      });

      return {
        threshold,
        found: lowStockVariants.length,
        products: lowStockVariants.map((v) => ({
          product: v.Product?.name,
          color: v.color,
          category: v.Product?.Category?.name,
          stockQuantity: v.stockQuantity,
          price: v.price,
          outOfStock: v.stockQuantity === 0,
        })),
      };
    }

    // ── get_ticket_stats ───────────────────────────────────────────────────
    case 'get_ticket_stats': {
      const [open, inProgress, resolved, closed] = await Promise.all([
        prisma.ticket.count({ where: { status: 'OPEN' as any } }),
        prisma.ticket.count({ where: { status: 'IN_PROGRESS' as any } }),
        prisma.ticket.count({ where: { status: 'RESOLVED' as any } }),
        prisma.ticket.count({ where: { status: 'CLOSED' as any } }),
      ]);

      const recentTickets = await prisma.ticket.findMany({
        where: args.status ? { status: args.status as any } : {},
        include: {
          User_Ticket_customerIdToUser: { select: { fullName: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      });

      return {
        summary: { open, inProgress, resolved, closed, total: open + inProgress + resolved + closed },
        recentTickets: recentTickets.map((t) => ({
          id: t.id.slice(-6).toUpperCase(),
          description: t.description?.substring(0, 80),
          severity: t.severity,
          status: t.status,
          customer: t.User_Ticket_customerIdToUser?.fullName ?? t.User_Ticket_customerIdToUser?.email,
          createdAt: t.createdAt.toISOString().split('T')[0],
        })),
      };
    }

    // ── get_appointment_stats ──────────────────────────────────────────────
    case 'get_appointment_stats': {
      const { start, end } = getPeriodDates(args.period || 'today');

      const appointments = await prisma.appointment.findMany({
        where: { date: { gte: start, lte: end } },
        include: {
          User_Appointment_customerIdToUser: { select: { fullName: true } },
          User_Appointment_technicianIdToUser: { select: { fullName: true } },
        },
        orderBy: { date: 'asc' },
      });

      const byStatus = appointments.reduce(
        (acc, a) => {
          const s = a.status ?? 'PENDING';
          acc[s] = (acc[s] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

      return {
        period: args.period || 'today',
        total: appointments.length,
        byStatus,
        upcoming: appointments.slice(0, 5).map((a) => ({
          type: a.type,
          date: a.date.toISOString().split('T')[0],
          timeSlot: a.timeSlot,
          customer: a.User_Appointment_customerIdToUser?.fullName,
          technician: a.User_Appointment_technicianIdToUser?.fullName ?? 'Chưa phân công',
          status: a.status,
        })),
      };
    }

    // ── get_review_summary ─────────────────────────────────────────────────
    case 'get_review_summary': {
      const limit = args.limit || 5;

      const avgRatings = await prisma.review.groupBy({
        by: ['productId'],
        _avg: { rating: true },
        _count: { id: true },
        where: args.lowRatingOnly ? { rating: { lte: 2 } } : {},
        orderBy: { _avg: { rating: 'asc' } },
        take: limit,
      });

      const productIds = avgRatings.map((r) => r.productId);
      const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, name: true },
      });

      const recentReviews = await prisma.review.findMany({
        where: args.lowRatingOnly ? { rating: { lte: 2 } } : {},
        include: {
          Product: { select: { name: true } },
          User: { select: { fullName: true } },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });

      return {
        mode: args.lowRatingOnly ? 'low_ratings_only' : 'all',
        worstRatedProducts: avgRatings.map((r) => ({
          product: products.find((p) => p.id === r.productId)?.name ?? 'Unknown',
          avgRating: r._avg.rating?.toFixed(1),
          reviewCount: r._count.id,
        })),
        recentReviews: recentReviews.map((r) => ({
          product: r.Product?.name,
          customer: r.User?.fullName,
          rating: r.rating,
          comment: r.comment?.substring(0, 100),
          date: r.createdAt.toISOString().split('T')[0],
        })),
      };
    }

    // ── search_orders ──────────────────────────────────────────────────────
    case 'search_orders': {
      const limit = args.limit || 10;
      const orders = await prisma.order.findMany({
        where: {
          ...(args.status && { status: args.status as any }),
          ...(args.customerName && {
            User: {
              OR: [
                { fullName: { contains: args.customerName, mode: 'insensitive' } },
                { email: { contains: args.customerName, mode: 'insensitive' } },
              ],
            },
          }),
        },
        include: {
          User: { select: { fullName: true, email: true } },
          OrderItem: {
            take: 2,
            include: {
              ProductVariant: { include: { Product: { select: { name: true } } } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });

      if (orders.length === 0) return { found: 0, message: 'Không tìm thấy đơn hàng phù hợp.' };

      return {
        found: orders.length,
        orders: orders.map((o) => ({
          id: o.id.slice(-8).toUpperCase(),
          customer: o.User?.fullName ?? o.User?.email,
          status: o.status,
          paymentStatus: o.paymentStatus,
          totalAmount: o.totalAmount,
          itemsPreview: o.OrderItem.map((i) => i.ProductVariant?.Product?.name).filter(Boolean),
          createdAt: o.createdAt.toISOString().split('T')[0],
        })),
      };
    }

    // ── get_tradein_stats ──────────────────────────────────────────────────
    case 'get_tradein_stats': {
      const [pending, approved, purchased, cancelled] = await Promise.all([
        prisma.tradeIn.count({ where: { status: 'PENDING' as any } }),
        prisma.tradeIn.count({ where: { status: 'APPROVED' as any } }),
        prisma.tradeIn.count({ where: { status: 'PURCHASED' as any } }),
        prisma.tradeIn.count({ where: { status: 'CANCELLED' as any } }),
      ]);

      const recent = await prisma.tradeIn.findMany({
        where: args.status ? { status: args.status as any } : {},
        include: { User: { select: { fullName: true } } },
        orderBy: { createdAt: 'desc' },
        take: 5,
      });

      return {
        summary: { pending, approved, purchased, cancelled, total: pending + approved + purchased + cancelled },
        recent: recent.map((t) => ({
          id: t.id.slice(-6).toUpperCase(),
          customer: t.User?.fullName,
          deviceName: t.deviceName,
          condition: t.condition,
          estimatedValue: t.estimatedValue,
          status: t.status,
          createdAt: t.createdAt.toISOString().split('T')[0],
        })),
      };
    }

    // ── get_overview_dashboard ─────────────────────────────────────────────
    case 'get_overview_dashboard': {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);

      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);

      const [todayOrders, openTickets, todayAppointments, lowStockCount, monthOrders] =
        await Promise.all([
          prisma.order.findMany({
            where: { createdAt: { gte: todayStart, lte: todayEnd } },
            select: { totalAmount: true, status: true },
          }),
          prisma.ticket.count({ where: { status: { in: ['OPEN', 'IN_PROGRESS'] as any[] } } }),
          prisma.appointment.count({ where: { date: { gte: todayStart, lte: todayEnd } } }),
          prisma.productVariant.count({ where: { stockQuantity: { lte: 5 }, deletedAt: null } }),
          prisma.order.findMany({
            where: {
              status: { in: ['PROCESSING', 'SHIPPED', 'DELIVERED'] as any[] },
              createdAt: { gte: monthStart },
            },
            select: { totalAmount: true },
          }),
        ]);

      const todayRevenue = todayOrders
        .filter((o) =>
          (['PROCESSING', 'SHIPPED', 'DELIVERED'] as string[]).includes(o.status as string),
        )
        .reduce((s, o) => s + (o.totalAmount ?? 0), 0);

      const monthRevenue = monthOrders.reduce((s, o) => s + (o.totalAmount ?? 0), 0);

      return {
        today: {
          date: new Date().toLocaleDateString('vi-VN'),
          newOrders: todayOrders.length,
          revenue: todayRevenue,
          appointments: todayAppointments,
        },
        currentMonth: {
          revenue: monthRevenue,
          confirmedOrders: monthOrders.length,
        },
        alerts: {
          openTickets,
          lowStockProducts: lowStockCount,
        },
      };
    }

    default:
      return { error: `Tool "${toolName}" không được hỗ trợ.` };
  }
}

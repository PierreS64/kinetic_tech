import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { AgentService } from '../application/agent.service';
import { AuthGuard } from '@nestjs/passport';

class ChatDto {
  message: string;
  history?: Array<{ role: string; content: string }>;
  isTestMode?: boolean;
}

@Controller('ai-agent')
@UseGuards(AuthGuard('jwt'))
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  /**
   * Unified AI Agent Chat endpoint
   * POST /ai-agent/chat
   */
  @Post('chat')
  async chat(@Request() req, @Body() dto: ChatDto) {
    const { role, id: userId } = req.user;

    if ((role === 'ADMIN' || role === 'STAFF') && !dto.isTestMode) {
      const { reply, toolsUsed } = await this.agentService.runAdminAgent(
        userId,
        dto.message,
        dto.history ?? [],
      );
      return { reply, toolsUsed, role: 'admin' };
    } else {
      const { reply, toolsUsed } = await this.agentService.runCustomerAgent(
        userId,
        dto.message,
        dto.history ?? [],
      );
      return { reply, toolsUsed, role: 'customer' };
    }
  }

  /**
   * Get available tools info
   * GET /ai-agent/tools
   */
  @Get('tools')
  getTools(@Request() req) {
    const { role } = req.user;
    if (role === 'ADMIN' || role === 'STAFF') {
      return {
        agentType: 'admin',
        capabilities: [
          'Báo cáo doanh thu theo ngày/tuần/tháng/năm',
          'Top sản phẩm bán chạy nhất',
          'Cảnh báo hàng tồn kho thấp',
          'Thống kê ticket hỗ trợ đang mở',
          'Lịch hẹn sửa chữa hôm nay',
          'Tổng hợp feedback/review khách hàng',
          'Tìm kiếm đơn hàng theo tên khách',
          'Thống kê trade-in',
          'Tổng quan dashboard',
        ],
      };
    }
    return {
      agentType: 'customer',
      capabilities: [
        'Tư vấn sản phẩm theo nhu cầu và ngân sách',
        'Kiểm tra trạng thái đơn hàng',
        'Tra cứu thông tin bảo hành',
        'Gợi ý build PC theo budget',
        'Tìm mã giảm giá hiện hành',
        'Xem lịch hẹn sửa chữa',
        'Tạo ticket hỗ trợ kỹ thuật',
      ],
    };
  }
}

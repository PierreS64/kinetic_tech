import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/application/prisma.service';
import OpenAI from 'openai';
import { CUSTOMER_TOOLS, executeCustomerTool } from './customer-tools';
import { ADMIN_TOOLS, executeAdminTool } from './admin-tools';

const CUSTOMER_SYSTEM_PROMPT = `Bạn là trợ lý AI thông minh của Kinetic Tech - cửa hàng chuyên laptop, gaming gear và phụ kiện công nghệ cao cấp.

Nhiệm vụ của bạn:
1. Tư vấn sản phẩm phù hợp với nhu cầu và ngân sách khách hàng
2. Kiểm tra thông tin đơn hàng, bảo hành của khách
3. Gợi ý build PC/setup gaming tối ưu
4. Giải đáp thắc mắc kỹ thuật về sản phẩm
5. Hỗ trợ tạo ticket khi có vấn đề cần can thiệp của nhân viên

Nguyên tắc:
- Luôn dùng tiếng Việt, thân thiện và chuyên nghiệp
- Khi cần thông tin từ database (sản phẩm, đơn hàng, bảo hành...) HÃY gọi tools thay vì đoán mò
- Khi giới thiệu hoặc đề xuất một linh kiện/sản phẩm PC cụ thể, bạn BẮT BUỘC phải bọc tên linh kiện và mã sản phẩm (variantId/id) theo đúng định dạng Markdown sau: [Tên hiển thị linh kiện](sku:MÃ_SẢN_PHẨM). Ví dụ đúng: [AMD Ryzen 5 5600X](sku:CPU-AMD-5600X). Tuyệt đối KHÔNG sử dụng định dạng nào khác để hiển thị mã sản phẩm và KHÔNG dùng markdown hiển thị ảnh.
- Định dạng số tiền theo kiểu Việt Nam (1.500.000 ₫)
- Nếu không giải quyết được vấn đề, đề xuất tạo ticket hỗ trợ`;

const ADMIN_SYSTEM_PROMPT = `Bạn là trợ lý phân tích AI dành cho quản lý của Kinetic Tech.

Nhiệm vụ của bạn:
1. Trả lời các câu hỏi về doanh thu, đơn hàng, kho hàng
2. Phân tích xu hướng bán hàng và gợi ý tối ưu
3. Tổng hợp tình trạng ticket hỗ trợ và lịch hẹn
4. Cảnh báo về tình trạng hàng tồn kho thấp
5. Tìm kiếm và báo cáo về đơn hàng cụ thể

Nguyên tắc:
- Luôn dùng tiếng Việt, súc tích và chính xác với số liệu
- Khi cần dữ liệu thực từ database, HÃY gọi tools ngay
- Trình bày số liệu rõ ràng, có thể dùng bảng hoặc danh sách
- Đưa ra nhận xét phân tích ngắn gọn sau mỗi số liệu
- Định dạng tiền tệ theo chuẩn Việt Nam`;

@Injectable()
export class AgentService {
  private openai: OpenAI;
  private readonly logger = new Logger(AgentService.name);

  constructor(private prisma: PrismaService) {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  /**
   * Runs the customer AI agent with function calling loop
   */
  async runCustomerAgent(
    userId: string,
    message: string,
    conversationHistory: Array<{ role: string; content: string }> = [],
  ): Promise<{ reply: string; toolsUsed: string[] }> {
    const messages: any[] = [
      { role: 'system', content: CUSTOMER_SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: message },
    ];

    const toolsUsed: string[] = [];

    try {
      // Agentic loop — max 5 iterations to prevent infinite loops
      for (let i = 0; i < 5; i++) {
        const response = await this.openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages,
          tools: CUSTOMER_TOOLS,
          tool_choice: 'auto',
        });

        const choice = response.choices[0];

        // If AI decides to call a tool
        if (choice.finish_reason === 'tool_calls' && choice.message.tool_calls) {
          messages.push(choice.message);

          for (const toolCall of choice.message.tool_calls) {
            const tc = toolCall as any;
            const toolName = tc.function.name;
            const toolArgs = JSON.parse(tc.function.arguments || '{}');
            toolsUsed.push(toolName);

            this.logger.log(`Customer Agent calling tool: ${toolName}`, toolArgs);

            const toolResult = await executeCustomerTool(toolName, toolArgs, userId, this.prisma);

            messages.push({
              role: 'tool',
              tool_call_id: toolCall.id,
              content: JSON.stringify(toolResult),
            });
          }

          // Continue the loop to let AI process tool results
          continue;
        }

        // AI has a final response
        const reply = choice.message?.content ?? 'Xin lỗi, tôi không thể xử lý yêu cầu này.';
        return { reply, toolsUsed };
      }

      return { reply: 'Xin lỗi, tôi mất quá nhiều bước để xử lý. Vui lòng thử lại.', toolsUsed };
    } catch (err) {
      this.logger.error('Customer Agent error', err);
      return { reply: 'Xin lỗi, có lỗi kết nối AI. Vui lòng thử lại sau.', toolsUsed };
    }
  }

  /**
   * Runs the admin AI agent with function calling loop
   */
  async runAdminAgent(
    adminId: string,
    message: string,
    conversationHistory: Array<{ role: string; content: string }> = [],
  ): Promise<{ reply: string; toolsUsed: string[] }> {
    const messages: any[] = [
      { role: 'system', content: ADMIN_SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: message },
    ];

    const toolsUsed: string[] = [];

    try {
      for (let i = 0; i < 5; i++) {
        const response = await this.openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages,
          tools: ADMIN_TOOLS,
          tool_choice: 'auto',
        });

        const choice = response.choices[0];

        if (choice.finish_reason === 'tool_calls' && choice.message.tool_calls) {
          messages.push(choice.message);

          for (const toolCall of choice.message.tool_calls) {
            const tc = toolCall as any;
            const toolName = tc.function.name;
            const toolArgs = JSON.parse(tc.function.arguments || '{}');
            toolsUsed.push(toolName);

            this.logger.log(`Admin Agent calling tool: ${toolName}`, toolArgs);

            const toolResult = await executeAdminTool(toolName, toolArgs, this.prisma);

            messages.push({
              role: 'tool',
              tool_call_id: toolCall.id,
              content: JSON.stringify(toolResult),
            });
          }

          continue;
        }

        const reply = choice.message?.content ?? 'Không thể xử lý yêu cầu này.';
        return { reply, toolsUsed };
      }

      return { reply: 'Quá nhiều bước xử lý. Vui lòng thử lại.', toolsUsed };
    } catch (err) {
      this.logger.error('Admin Agent error', err);
      return { reply: 'Lỗi kết nối AI. Vui lòng thử lại sau.', toolsUsed };
    }
  }
}

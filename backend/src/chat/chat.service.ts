import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import OpenAI from 'openai';
import { ChatSessionStatus, SenderType } from '@prisma/client';

@Injectable()
export class ChatService {
  private openai: OpenAI;
  private readonly logger = new Logger(ChatService.name);

  constructor(private prisma: PrismaService) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async getOrCreateSession(userId: string) {
    // Find active AI or waiting session
    let session = await this.prisma.chatSession.findFirst({
      where: {
        customerId: userId,
        status: { in: [ChatSessionStatus.AI_HANDLING, ChatSessionStatus.WAITING_FOR_TECH] }
      },
      include: { ChatMessage: { orderBy: { createdAt: 'asc' } } }
    });

    if (!session) {
      session = await this.prisma.chatSession.create({
        data: { customerId: userId, status: ChatSessionStatus.AI_HANDLING },
        include: { ChatMessage: true }
      });
    }

    return session;
  }

  async saveMessage(sessionId: string, senderType: SenderType, content: string) {
    return this.prisma.chatMessage.create({
      data: {
        chatSessionId: sessionId,
        senderType,
        content
      }
    });
  }

  async getAiResponse(sessionId: string, userMessage: string): Promise<{ text: string, handover: boolean }> {
    const session = await this.prisma.chatSession.findUnique({
      where: { id: sessionId },
      include: { ChatMessage: { orderBy: { createdAt: 'asc' } } }
    });

    if (!session) {
      return { text: 'Phiên chat không tồn tại.', handover: false };
    }

    const messages: any[] = [
      {
        role: 'system',
        content: `Bạn là trợ lý ảo hỗ trợ kỹ thuật của Kinetic Tech. Nhiệm vụ của bạn là giải đáp các thắc mắc về kỹ thuật.
        Nếu khách hàng có vẻ cáu gắt, phàn nàn, hoặc bạn không thể giải quyết được vấn đề phức tạp, hoặc khách hàng yêu cầu gặp trực tiếp kỹ thuật viên, bạn PHẢI xin lỗi và khuyên họ kết nối với kỹ thuật viên. 
        Nếu bạn quyết định họ cần gặp kỹ thuật viên, hãy kết thúc câu trả lời của bạn bằng đoạn text chính xác này: [HANDOVER].`
      }
    ];

    for (const msg of session.ChatMessage) {
      messages.push({
        role: msg.senderType === SenderType.CUSTOMER ? 'user' : 'assistant',
        content: msg.content
      });
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages,
      });

      let reply = response.choices[0]?.message?.content || 'Xin lỗi, tôi đang gặp lỗi kết nối.';
      let handover = false;

      if (reply.includes('[HANDOVER]')) {
        handover = true;
        reply = reply.replace('[HANDOVER]', '').trim();
      }

      return { text: reply, handover };
    } catch (error) {
      this.logger.error('OpenAI Error', error);
      return { text: 'Xin lỗi, tôi đang gặp lỗi kết nối AI.', handover: false };
    }
  }

  async setSessionWaiting(sessionId: string) {
    await this.prisma.chatSession.update({
      where: { id: sessionId },
      data: { status: ChatSessionStatus.WAITING_FOR_TECH }
    });
  }
}

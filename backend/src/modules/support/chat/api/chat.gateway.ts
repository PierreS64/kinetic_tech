import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from '../application/chat.service';
import { Server, Socket } from 'socket.io';
import { SenderType } from '@prisma/client';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('join_chat')
  async handleJoinChat(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const session = await this.chatService.getOrCreateSession(data.userId);
    client.join(session.id);
    client.emit('session_data', session);
  }

  @SubscribeMessage('send_message')
  async handleMessage(
    @MessageBody() data: { sessionId: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    // 1. Save user message
    const userMsg = await this.chatService.saveMessage(
      data.sessionId,
      SenderType.CUSTOMER,
      data.content,
    );

    // Broadcast user message to room (in case they have multiple tabs open or for tech to see)
    // Dùng client.broadcast.to để không gửi ngược lại chính sender, tránh lặp tin nhắn
    client.broadcast.to(data.sessionId).emit('new_message', userMsg);

    // 2. Call OpenAI for AI Response
    const aiResponse = await this.chatService.getAiResponse(
      data.sessionId,
      data.content,
    );

    // 3. Save AI response
    let finalAiText = aiResponse.text;
    if (aiResponse.handover) {
      finalAiText +=
        '\n\n⚠️ Để trao đổi trực tiếp với Kỹ thuật viên, vui lòng liên hệ Hotline: 1900 1234, Email: hotro@kinetictech.vn, hoặc tạo Yêu cầu hỗ trợ (Ticket) tại mục Hỗ trợ.';
    }
    const aiMsg = await this.chatService.saveMessage(
      data.sessionId,
      SenderType.AI,
      finalAiText,
    );

    // 4. Send AI response back to user
    this.server.to(data.sessionId).emit('new_message', aiMsg);
  }
}

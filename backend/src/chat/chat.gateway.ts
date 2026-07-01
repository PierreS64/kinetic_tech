import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
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
  async handleJoinChat(@MessageBody() data: { userId: string }, @ConnectedSocket() client: Socket) {
    const session = await this.chatService.getOrCreateSession(data.userId);
    client.join(session.id);
    client.emit('session_data', session);
  }

  @SubscribeMessage('send_message')
  async handleMessage(@MessageBody() data: { sessionId: string; content: string }, @ConnectedSocket() client: Socket) {
    // 1. Save user message
    const userMsg = await this.chatService.saveMessage(data.sessionId, SenderType.CUSTOMER, data.content);
    
    // Broadcast user message to room (in case they have multiple tabs open or for tech to see)
    this.server.to(data.sessionId).emit('new_message', userMsg);

    // 2. Call OpenAI for AI Response
    const aiResponse = await this.chatService.getAiResponse(data.sessionId, data.content);

    // 3. Save AI response
    const aiMsg = await this.chatService.saveMessage(data.sessionId, SenderType.AI, aiResponse.text);

    // 4. Send AI response back to user
    this.server.to(data.sessionId).emit('new_message', aiMsg);

    // 5. Check handover condition
    if (aiResponse.handover) {
      await this.chatService.setSessionWaiting(data.sessionId);
      this.server.to(data.sessionId).emit('handover_triggered', {
        message: 'Phiên chat đã được chuyển cho kỹ thuật viên. Vui lòng chờ trong giây lát.'
      });
    }
  }
}

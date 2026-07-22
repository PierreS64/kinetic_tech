import { Module } from '@nestjs/common';
import { ChatService } from './application/chat.service';
import { ChatGateway } from './api/chat.gateway';

@Module({
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}

import { Module } from '@nestjs/common';
import { AgentService } from './application/agent.service';
import { AgentController } from './api/agent.controller';
import { PrismaModule } from '../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AgentService],
  controllers: [AgentController],
  exports: [AgentService],
})
export class AiAgentModule {}

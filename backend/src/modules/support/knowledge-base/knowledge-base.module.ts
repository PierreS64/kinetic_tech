import { Module } from '@nestjs/common';
import { KnowledgeBaseService } from './application/knowledge-base.service';
import { KnowledgeBaseController } from './api/knowledge-base.controller';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [KnowledgeBaseController],
  providers: [KnowledgeBaseService],
})
export class KnowledgeBaseModule {}

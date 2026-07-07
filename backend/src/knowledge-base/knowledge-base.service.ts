import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateKnowledgeBaseDto } from './dto/knowledge-base.dto';

@Injectable()
export class KnowledgeBaseService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateKnowledgeBaseDto) {
    return this.prisma.knowledgeBase.create({
      data: dto
    });
  }

  async findAll() {
    return this.prisma.knowledgeBase.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async findByCategory(category: string) {
    return this.prisma.knowledgeBase.findMany({
      where: { category }
    });
  }
}

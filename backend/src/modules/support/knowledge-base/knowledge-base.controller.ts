import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { KnowledgeBaseService } from './knowledge-base.service';
import { CreateKnowledgeBaseDto } from './dto/knowledge-base.dto';

@Controller('knowledge-base')
export class KnowledgeBaseController {
  constructor(private readonly knowledgeBaseService: KnowledgeBaseService) {}

  @Post()
  create(@Body() dto: CreateKnowledgeBaseDto) {
    return this.knowledgeBaseService.create(dto);
  }

  @Get()
  findAll() {
    return this.knowledgeBaseService.findAll();
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.knowledgeBaseService.findByCategory(category);
  }
}

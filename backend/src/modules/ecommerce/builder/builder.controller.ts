import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BuilderService } from './builder.service';
import { ComponentType } from '@prisma/client';

@Controller('builder')
export class BuilderController {
  constructor(private readonly builderService: BuilderService) {}

  @Get('components/:type')
  getComponentsByType(@Param('type') type: ComponentType) {
    return this.builderService.getComponentsByType(type);
  }

  @Post('check-compatibility')
  checkCompatibility(@Body('productIds') productIds: string[]) {
    return this.builderService.checkCompatibility(productIds);
  }
}

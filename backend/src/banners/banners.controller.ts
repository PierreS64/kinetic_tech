import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BannersService } from './banners.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body('linkUrl') linkUrl: string, @UploadedFile() file: Express.Multer.File) {
    return this.bannersService.create(linkUrl, file);
  }

  @Get()
  findAllActive() {
    return this.bannersService.findAllActive();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannersService.remove(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Delete,
  Param,
  ForbiddenException,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateFeedbackDto } from './dto/feedback.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Request() req, @Body() dto: CreateFeedbackDto) {
    if (req.user.role === 'ADMIN') {
      throw new ForbiddenException(
        'Tài khoản quản trị không thể thực hiện chức năng này.',
      );
    }
    return this.feedbackService.create(req.user.id, dto);
  }

  @Get('my-feedbacks')
  @UseGuards(AuthGuard('jwt'))
  getMyFeedbacks(@Request() req) {
    return this.feedbackService.getMyFeedbacks(req.user.id);
  }

  @Get()
  findAll() {
    return this.feedbackService.findAll();
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: string) {
    return this.feedbackService.delete(id);
  }
}

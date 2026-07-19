import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateFavoriteDto } from './dto/favorite.dto';

@Controller('favorites')
@UseGuards(AuthGuard('jwt'))
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('toggle')
  toggleFavorite(@Request() req, @Body() dto: CreateFavoriteDto) {
    return this.favoritesService.toggleFavorite(req.user.id, dto);
  }

  @Get()
  getMyFavorites(@Request() req) {
    return this.favoritesService.getMyFavorites(req.user.id);
  }
}

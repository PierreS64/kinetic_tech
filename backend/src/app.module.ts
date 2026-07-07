import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { VariantsModule } from './variants/variants.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { ChatModule } from './chat/chat.module';
import { PaymentModule } from './payment/payment.module';
import { TicketsModule } from './tickets/tickets.module';
import { UserDevicesModule } from './user-devices/user-devices.module';
import { TradeInModule } from './trade-in/trade-in.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CouponsModule } from './coupons/coupons.module';
import { FeedbackModule } from './feedback/feedback.module';
import { FavoritesModule } from './favorites/favorites.module';
import { KnowledgeBaseModule } from './knowledge-base/knowledge-base.module';
import { BannersModule } from './banners/banners.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, CategoriesModule, ProductsModule, VariantsModule, CloudinaryModule, CartModule, OrdersModule, ChatModule, PaymentModule, TicketsModule, UserDevicesModule, TradeInModule, AppointmentsModule, ReviewsModule, CouponsModule, FeedbackModule, FavoritesModule, KnowledgeBaseModule, BannersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/core/prisma/prisma.module';
import { UsersModule } from './modules/core/users/users.module';
import { AuthModule } from './modules/core/auth/auth.module';
import { CategoriesModule } from './modules/ecommerce/categories/categories.module';
import { ProductsModule } from './modules/ecommerce/products/products.module';
import { VariantsModule } from './modules/ecommerce/variants/variants.module';
import { CloudinaryModule } from './modules/core/cloudinary/cloudinary.module';
import { CartModule } from './modules/ecommerce/cart/cart.module';
import { OrdersModule } from './modules/ecommerce/orders/orders.module';
import { ChatModule } from './modules/support/chat/chat.module';
import { PaymentModule } from './modules/ecommerce/payment/payment.module';
import { TicketsModule } from './modules/support/tickets/tickets.module';
import { UserDevicesModule } from './modules/core/user-devices/user-devices.module';
import { TradeInModule } from './modules/support/trade-in/trade-in.module';
import { AppointmentsModule } from './modules/support/appointments/appointments.module';
import { ReviewsModule } from './modules/support/reviews/reviews.module';
import { CouponsModule } from './modules/ecommerce/coupons/coupons.module';
import { FeedbackModule } from './modules/support/feedback/feedback.module';
import { FavoritesModule } from './modules/core/favorites/favorites.module';
import { KnowledgeBaseModule } from './modules/support/knowledge-base/knowledge-base.module';
import { BannersModule } from './modules/core/banners/banners.module';
import { WarrantiesModule } from './modules/support/warranties/warranties.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    VariantsModule,
    CloudinaryModule,
    CartModule,
    OrdersModule,
    ChatModule,
    PaymentModule,
    TicketsModule,
    UserDevicesModule,
    TradeInModule,
    AppointmentsModule,
    ReviewsModule,
    CouponsModule,
    FeedbackModule,
    FavoritesModule,
    KnowledgeBaseModule,
    BannersModule,
    WarrantiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

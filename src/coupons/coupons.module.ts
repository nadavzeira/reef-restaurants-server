import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Storefront } from 'src/storefronts/entities/storefront.entity';

import { CouponsResolver } from './coupons.resolver';
import { CouponsService } from './coupons.service';
import { Coupon } from './entities/coupon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon, Storefront, Order])],
  exports: [CouponsService],
  providers: [CouponsResolver, CouponsService],
})
export class CouponsModule {}

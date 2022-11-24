import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
import { Storefront } from 'src/storefronts/entities/storefront.entity';

import { Order } from './entities/order.entity';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Storefront, MenuItem, Coupon])],
  exports: [OrdersService],
  providers: [OrdersResolver, OrdersService],
})
export class OrdersModule {}

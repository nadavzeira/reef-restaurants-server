import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponsModule } from 'src/coupons/coupons.module';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
import { MenuItemsModule } from 'src/menu-items/menu-items.module';
import { Storefront } from 'src/storefronts/entities/storefront.entity';

import { Order } from './entities/order.entity';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Storefront, MenuItem, Coupon]),
    MenuItemsModule,
    CouponsModule,
  ],
  exports: [OrdersService],
  providers: [OrdersResolver, OrdersService],
})
export class OrdersModule {}

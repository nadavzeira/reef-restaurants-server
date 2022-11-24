import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
import { MenuItemsModule } from 'src/menu-items/menu-items.module';
import { OrdersModule } from 'src/orders/orders.module';

import { Storefront } from './entities/storefront.entity';
import { StorefrontsResolver } from './storefronts.resolver';
import { StorefrontsService } from './storefronts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Storefront, MenuItem, Coupon]),
    OrdersModule,
    MenuItemsModule,
  ],
  providers: [StorefrontsResolver, StorefrontsService],
})
export class StorefrontsModule {}

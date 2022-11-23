import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';

import { Storefront } from './entities/storefront.entity';
import { StorefrontsResolver } from './storefronts.resolver';
import { StorefrontsService } from './storefronts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Storefront, MenuItem, Coupon])],
  providers: [StorefrontsResolver, StorefrontsService],
})
export class StorefrontsModule {}

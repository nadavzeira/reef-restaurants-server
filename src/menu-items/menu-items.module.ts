import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Storefront } from 'src/storefronts/entities/storefront.entity';

import { MenuItem } from './entities/menu-item.entity';
import { MenuItemsResolver } from './menu-items.resolver';
import { MenuItemsService } from './menu-items.service';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItem, Storefront, Order])],
  providers: [MenuItemsResolver, MenuItemsService],
})
export class MenuItemsModule {}

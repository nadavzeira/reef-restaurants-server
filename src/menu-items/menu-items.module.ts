import { Module } from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';
import { MenuItemsResolver } from './menu-items.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem } from './entities/menu-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItem])],
  providers: [MenuItemsResolver, MenuItemsService],
})
export class MenuItemsModule {}

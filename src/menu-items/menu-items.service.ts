import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guid } from 'guid-typescript';
import { Order } from 'src/orders/entities/order.entity';
import { ArrayContains, Repository } from 'typeorm';

import { CreateMenuItemInput } from './dto/create-menu-item.input';
import { UpdateMenuItemInput } from './dto/update-menu-item.input';
import { MenuItem } from './entities/menu-item.entity';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(MenuItem)
    private readonly menuItemRepository: Repository<MenuItem>,
  ) {}
  async create(createMenuItemInput: CreateMenuItemInput): Promise<MenuItem> {
    const menuItem = this.menuItemRepository.create(createMenuItemInput);

    return await this.menuItemRepository.save(menuItem);
  }

  async findOne(id: Guid): Promise<MenuItem> {
    const menuItem = await this.menuItemRepository.findOneBy({
      id: id.toString(),
    });

    if (!menuItem) {
      throw new NotFoundException(`MenuItem #${id} not found`);
    }

    return menuItem;
  }

  async findAll(): Promise<Array<MenuItem>> {
    return await this.menuItemRepository.find();
  }

  async update(
    menuItemId: Guid,
    updateMenuItemInput: UpdateMenuItemInput,
  ): Promise<MenuItem> {
    const menuItem = await this.menuItemRepository.preload({
      id: menuItemId,
      ...updateMenuItemInput,
    });

    if (!menuItem) {
      throw new NotFoundException(`MenuItem #${menuItemId} not found`);
    }

    return this.menuItemRepository.save(menuItem);
  }

  async remove(menuItemId: Guid): Promise<MenuItem> {
    const menuItem = await this.findOne(menuItemId);

    await this.menuItemRepository.remove(menuItem);

    return menuItem;
  }

  async findAllByStorefront(id: Guid): Promise<Array<MenuItem>> {
    const menuItems = await this.menuItemRepository.find({
      where: {
        storefront: {
          id: id.toString(),
        },
      },
    });

    if (!menuItems) {
      throw new NotFoundException(`No menu items found for storefront #${id}`);
    }

    return menuItems;
  }

  async findAllByOrder(order: Order): Promise<Array<MenuItem>> {
    const menuItems = await this.menuItemRepository.find({
      where: {
        orders: ArrayContains([order]),
      },
    });

    if (!menuItems) {
      throw new NotFoundException(`No menu items found for order #${order.id}`);
    }

    return menuItems;
  }
}

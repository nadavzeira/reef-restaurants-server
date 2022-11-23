import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async findOne(id: string): Promise<MenuItem> {
    const menuItem = await this.menuItemRepository.findOneBy({ id });

    if (!menuItem) {
      throw new NotFoundException(`MenuItem #${id} not found`);
    }

    return menuItem;
  }

  async findAll(): Promise<Array<MenuItem>> {
    return await this.menuItemRepository.find();
  }

  async update(
    menuItemId: string,
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

  async remove(menuItemId: string): Promise<MenuItem> {
    const menuItem = await this.findOne(menuItemId);

    await this.menuItemRepository.remove(menuItem);

    return menuItem;
  }
}

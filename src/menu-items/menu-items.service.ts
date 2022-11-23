import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuItemInput } from './dto/create-menu-item.input';
import { MenuItem } from './entities/menu-item.entity';
import { UpdateMenuItemInput } from './dto/update-menu-item.input';

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

  async findOne(menuItemId: string): Promise<MenuItem> {
    const menuItem = await this.menuItemRepository.findOne({
      where: { id: menuItemId },
    });

    if (!menuItem) {
      throw new NotFoundException(`MenuItem #${menuItemId} not found`);
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

    return {
      id: menuItemId,
      name: '',
      price: 0,
    };
  }
}
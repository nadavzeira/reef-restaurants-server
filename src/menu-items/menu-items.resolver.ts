import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateMenuItemInput } from './dto/create-menu-item.input';
import { UpdateMenuItemInput } from './dto/update-menu-item.input';
import { MenuItem } from './entities/menu-item.entity';
import { MenuItemsService } from './menu-items.service';

@Resolver(() => MenuItem)
export class MenuItemsResolver {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @Mutation(() => MenuItem)
  createMenuItem(
    @Args('createMenuItemInput') createMenuItemInput: CreateMenuItemInput,
  ) {
    return this.menuItemsService.create(createMenuItemInput);
  }

  @Query(() => [MenuItem], { name: 'menuItems' })
  findAll() {
    return this.menuItemsService.findAll();
  }

  @Query(() => MenuItem, { name: 'menuItem' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.menuItemsService.findOne(id);
  }

  @Mutation(() => MenuItem)
  updateMenuItem(
    @Args('updateMenuItemInput') updateMenuItemInput: UpdateMenuItemInput,
  ) {
    return this.menuItemsService.update(
      updateMenuItemInput.id,
      updateMenuItemInput,
    );
  }

  @Mutation(() => MenuItem)
  removeMenuItem(@Args('id', { type: () => String }) id: string) {
    return this.menuItemsService.remove(id);
  }

  @Query(() => [MenuItem], { name: 'menuItemsByStorefront' })
  findStorefrontMenu(
    @Args('storefrontId', { type: () => String }) storefrontId: string,
  ) {
    return this.menuItemsService.findStorefrontMenu(storefrontId);
  }
}

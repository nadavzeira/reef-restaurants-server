import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Guid } from 'guid-typescript';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
import { MenuItemsService } from 'src/menu-items/menu-items.service';
import { Order } from 'src/orders/entities/order.entity';
import { OrdersService } from 'src/orders/orders.service';

import { CreateStorefrontInput } from './dto/create-storefront.input';
import { UpdateStorefrontInput } from './dto/update-storefront.input';
import { Storefront } from './entities/storefront.entity';
import { StorefrontsService } from './storefronts.service';

@Resolver(() => Storefront)
export class StorefrontsResolver {
  constructor(
    private readonly storefrontsService: StorefrontsService,
    private readonly ordersService: OrdersService,
    private readonly menuItemsService: MenuItemsService,
  ) {}

  @Mutation(() => Storefront)
  createStorefront(
    @Args('createStorefrontInput') createStorefrontInput: CreateStorefrontInput,
  ) {
    return this.storefrontsService.create(createStorefrontInput);
  }

  @Query(() => [Storefront], { name: 'storefronts' })
  findAll() {
    return this.storefrontsService.findAll();
  }

  @Query(() => Storefront, { name: 'storefront' })
  findOne(@Args('id', { type: () => String }) id: Guid) {
    return this.storefrontsService.findOne(id);
  }

  @Mutation(() => Storefront)
  updateStorefront(
    @Args('updateStorefrontInput') updateStorefrontInput: UpdateStorefrontInput,
  ) {
    return this.storefrontsService.update(
      updateStorefrontInput.id,
      updateStorefrontInput,
    );
  }

  @Mutation(() => Storefront)
  removeStorefront(@Args('id', { type: () => String }) id: Guid) {
    return this.storefrontsService.remove(id);
  }

  @Query(() => [Storefront], { name: 'storefrontsByZipCode' })
  findByZipCode(@Args('zipCode', { type: () => Int }) zipCode: number) {
    const storefronts = this.storefrontsService.findAllByZipCode(zipCode);

    return storefronts;
  }

  @ResolveField(() => [Order], { description: "The storefront's orders" })
  orders(@Parent() { id }: Storefront) {
    return this.ordersService.findAllByStorefront(id);
  }

  @ResolveField(() => [MenuItem], { description: "The storefront's menu" })
  menu(@Parent() { id }: Storefront) {
    return this.menuItemsService.findStorefrontMenu(id);
  }
}

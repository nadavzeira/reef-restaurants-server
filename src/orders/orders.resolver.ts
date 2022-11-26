import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Guid } from 'guid-typescript';
import { CouponsService } from 'src/coupons/coupons.service';
import { Coupon } from 'src/coupons/entities/coupon.entity';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
import { MenuItemsService } from 'src/menu-items/menu-items.service';

import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly menuItemsService: MenuItemsService,
    private readonly couponsService: CouponsService,
  ) {}

  @Mutation(() => Order)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.ordersService.create(createOrderInput);
  }

  @Query(() => [Order], { name: 'orders' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args('id', { type: () => String }) id: Guid) {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.ordersService.update(updateOrderInput.id, updateOrderInput);
  }

  @Mutation(() => Order)
  removeOrder(@Args('id', { type: () => String }) id: Guid) {
    return this.ordersService.remove(id);
  }

  @ResolveField(() => [MenuItem], { description: "The order's items" })
  items(@Parent() order: Order) {
    return this.menuItemsService.findAllByOrder(order);
  }

  @ResolveField(() => [Coupon], { description: "The order's coupons" })
  coupons(@Parent() { id }: Order) {
    return this.couponsService.findAllByOrder(id);
  }
}

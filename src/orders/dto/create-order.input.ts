import { Field, InputType } from '@nestjs/graphql';
import { Guid } from 'guid-typescript';
// import { Coupon } from 'src/coupons/entities/coupon.entity';
// import { MenuItem } from 'src/menu-items/entities/menu-item.entity';

@InputType()
export class CreateOrderInput {
  @Field(() => String, { description: "The order's customer name" })
  customerName: string;

  @Field(() => String, { description: "The order's customer address" })
  customerAddress: string;

  @Field(() => String, { description: "The order's storefront id" })
  storefrontId: Guid;

  // @Field(() => [MenuItem], { description: "The order's items" })
  // menuItems: MenuItem[];

  // @Field(() => [Coupon], { description: "The order's coupons" })
  // coupons: Coupon[];
}

import { Field, InputType } from '@nestjs/graphql';
import { Guid } from 'guid-typescript';
import { CouponInput } from 'src/coupons/entities/coupon-input.entity';
import { MenuItemInput } from 'src/menu-items/entities/menu-item-input.entity';

@InputType()
export class CreateOrderInput {
  @Field(() => String, { description: "The order's customer name" })
  customerName: string;

  @Field(() => String, { description: "The order's customer address" })
  customerAddress: string;

  @Field(() => StorefrontInput, { description: "The order's storefront" })
  storefront: StorefrontInput;

  @Field(() => [MenuItemInput], { description: "The order's items" })
  items: MenuItemInput[];

  @Field(() => [CouponInput], { description: "The order's coupons" })
  coupons: CouponInput[];
}

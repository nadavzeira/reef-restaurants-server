import { Field, InputType, Int } from '@nestjs/graphql';
import { CouponInput } from 'src/coupons/entities/coupon-input.entity';
import { MenuItemInput } from 'src/menu-items/entities/menu-item-input.entity';

@InputType()
export class CreateStorefrontInput {
  @Field(() => String, { description: "The storefront's name" })
  name: string;

  @Field(() => String, { description: "The storefront's address" })
  address: string;

  @Field(() => [Int] /* TODO: Fix type*/, {
    description: 'An image of the storefront',
  })
  image: Uint8Array;

  @Field(() => [Int], {
    description: "A list of zipcodes in the storefront's coverage area",
  })
  zipCodes: number[];

  @Field(() => [MenuItemInput], { description: "The storefront's menu" })
  menu: MenuItemInput[];

  @Field(() => [CouponInput], {
    description: "The storefront's supported coupons",
  })
  coupons: CouponInput[];
}

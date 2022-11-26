import { Field, InputType, Int } from '@nestjs/graphql';

import { CouponType } from '../entities/coupon.entity';

@InputType()
export class CreateCouponInput {
  @Field(() => String /* TODO: Fix type*/, { description: "The coupon's type" })
  type: CouponType;

  @Field(() => Int, { description: "The coupon's discount" })
  discount: number;
}

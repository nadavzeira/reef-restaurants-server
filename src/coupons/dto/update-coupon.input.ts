import { Field, InputType, PartialType } from '@nestjs/graphql';

import { CreateCouponInput } from './create-coupon.input';

@InputType()
export class UpdateCouponInput extends PartialType(CreateCouponInput) {
  @Field(() => String)
  id: string;
}

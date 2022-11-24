import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Guid } from 'guid-typescript';

import { CreateCouponInput } from './create-coupon.input';

@InputType()
export class UpdateCouponInput extends PartialType(CreateCouponInput) {
  @Field(() => String)
  id: Guid;
}

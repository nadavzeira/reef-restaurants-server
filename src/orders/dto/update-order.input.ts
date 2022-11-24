import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Guid } from 'guid-typescript';

import { CreateOrderInput } from './create-order.input';

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
  @Field(() => String)
  id: Guid;
}

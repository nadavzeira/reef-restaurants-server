import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Guid } from 'guid-typescript';

import { CreateStorefrontInput } from './create-storefront.input';

@InputType()
export class UpdateStorefrontInput extends PartialType(CreateStorefrontInput) {
  @Field(() => String)
  id: Guid;
}

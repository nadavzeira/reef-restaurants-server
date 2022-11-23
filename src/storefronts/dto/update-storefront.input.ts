import { Field, InputType, PartialType } from '@nestjs/graphql';

import { CreateStorefrontInput } from './create-storefront.input';

@InputType()
export class UpdateStorefrontInput extends PartialType(CreateStorefrontInput) {
  @Field(() => String)
  id: string;
}

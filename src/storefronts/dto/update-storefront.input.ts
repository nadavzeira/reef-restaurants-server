import { CreateStorefrontInput } from './create-storefront.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStorefrontInput extends PartialType(CreateStorefrontInput) {
  @Field(() => Int)
  id: number;
}

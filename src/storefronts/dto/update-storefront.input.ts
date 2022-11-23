import { CreateStorefrontInput } from './create-storefront.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStorefrontInput extends PartialType(CreateStorefrontInput) {
  @Field(() => String)
  id: string;
}

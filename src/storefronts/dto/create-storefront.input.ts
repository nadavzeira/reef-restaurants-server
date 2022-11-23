import { InputType, Int, Field } from '@nestjs/graphql';
import { Base64, imageTypes } from '../entities/storefrontTypes';

@InputType()
export class CreateStorefrontInput {
  @Field(() => String, { description: "The storefront's name" })
  name: string;
  @Field(() => String, { description: "The storefront's address" })
  address: string;
  @Field(() => String /* TODO: Fix type*/, {
    description: 'An image of the storefront',
  })
  image: Base64<imageTypes>;
  @Field(() => [Int], {
    description: "A list of zipcodes in the storefront's coverage area",
  })
  zipCodes: number[];
}

import { Field, InputType, Int } from '@nestjs/graphql';

import { Base64, imageTypes } from '../entities/storefrontModels';

@InputType()
export class CreateStorefrontInput {
  @Field(() => String, { description: "The storefront's name" })
  name: string;

  @Field(() => String, { description: "The storefront's address" })
  address: string;

  @Field(() => [Int] /* TODO: Fix type*/, {
    description: 'An image of the storefront',
  })
  image: Uint8Array

  @Field(() => [Int], {
    description: "A list of zipcodes in the storefront's coverage area",
  })
  zipCodes: number[];
}
